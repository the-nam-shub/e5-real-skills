import { readFileSync, writeFileSync, renameSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { complete, extractJsonObject } from "../anthropic.js";
import {
  readLabels,
  writeLabels,
  applyEpisodeToLabels,
} from "../labels-store.js";
import type {
  Config,
  CuratorNewLabel,
  CuratorOutput,
  CuratorPracticeAssignment,
  CuratorSplitCandidate,
  LabelEntry,
  LabelsFile,
  PracticesFile,
} from "../types.js";

const CURATOR_SYSTEM_PROMPT = `You are curating the taxonomy for a B2B marketing skills library. Each practice in a podcast episode has been tagged with proposed labels. Your job is to decide for each proposed label whether it matches an existing label in the library (use the existing one) or describes a genuinely distinct topic (create a new label).

Bias moderately toward using existing labels. When fit is reasonably clean (roughly 70%+ semantic overlap with an existing label's description and example practices), use the existing label. Only create a new label when the proposed topic is genuinely distinct — a different enough concept that lumping it into an existing category would mislead readers.

WHEN TO REUSE AN EXISTING LABEL:
- The proposed label is a phrasing variant of an existing label (e.g., existing "content-strategy" + proposed "content-marketing" → use existing)
- The proposed label describes a narrower version of an existing label, but not narrow enough to warrant its own skill (e.g., existing "paid-media" + proposed "meta-ads-strategy" → use existing, unless the library already has strong signal that paid-media should split by platform)
- The proposed label describes a slightly different angle on the same topic (e.g., existing "brand-building" + proposed "brand-positioning" → use existing)

WHEN TO CREATE A NEW LABEL:
- The proposed topic has no reasonable home in existing labels
- The proposed topic is distinct enough that a reader would expect separate treatment (e.g., existing library lacks "ai-search-optimization"; the practice is specifically about optimizing content for LLM-based search, which is a meaningfully different activity than traditional SEO)
- Multiple practices across episodes have been getting clustered under a broad label, and a narrower label would better serve the emerging topic. In this case, also flag the existing label for potential future split.

NEVER:
- Create labels that describe the guest, episode, or company (e.g., "ramp-growth-strategy"). Labels describe the marketing topic, not the source.
- Create labels with fewer than 3 words of content value (e.g., "marketing", "growth", "strategy" alone are too broad)
- Collapse genuinely distinct topics to force library size down

OUTPUT FORMAT:
For each practice in the input, return the practice_id plus the final assigned_labels array. Also return any new labels that should be added to labels.json with a short description and which practice first introduced them.

{
  "practice_assignments": [
    { "practice_id": "...", "assigned_labels": ["...", "..."] }
  ],
  "new_labels": [
    { "label": "ai-search-optimization", "description": "Optimizing content for citation in LLM-based search results (ChatGPT, Perplexity, Google AI Overviews). Distinct from traditional SEO in that it prioritizes frontier knowledge, expert quotes, and structured answerability over keyword ranking.", "first_introduced_by_practice_id": "..." }
  ],
  "split_candidates": [
    { "existing_label": "...", "reason": "..." }
  ]
}`;

function practicesPath(dataDir: string, episodeNumber: number): string {
  return resolve(dataDir, "practices", `${episodeNumber}.json`);
}

function atomicWriteJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, JSON.stringify(value, null, 2));
  renameSync(tmp, path);
}

function normalizeLabel(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildUserMessage(
  practicesFile: PracticesFile,
  labels: LabelsFile
): string {
  const labelEntries = Object.entries(labels.labels)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([slug, entry]) => ({
      label: slug,
      description: entry.description,
      practice_count: entry.practice_count,
      episode_count: entry.episode_sources.length,
    }));
  const practicesForReview = practicesFile.practices.map((p) => ({
    practice_id: p.practice_id,
    title: p.title,
    description: p.description,
    proposed_labels: p.proposed_labels,
    guest_name: p.guest_name,
  }));
  return [
    `Episode #${practicesFile.episode_number}: ${practicesFile.title}`,
    "",
    "CURRENT LABEL LIBRARY (labels.json):",
    labelEntries.length === 0
      ? "  (empty — this is the first episode being processed; every proposed label is by definition new)"
      : JSON.stringify(labelEntries, null, 2),
    "",
    "PRACTICES FROM THIS EPISODE:",
    JSON.stringify(practicesForReview, null, 2),
    "",
    "For each practice, assign 1-3 labels by either reusing an existing library label (preferred when fit is clean) or introducing a new one (only when genuinely distinct). Every new label you introduce must appear in new_labels with a description. Return ONLY the JSON object described in your instructions.",
  ].join("\n");
}

function validateCuratorOutput(
  obj: Record<string, unknown>,
  proposedPracticeIds: Set<string>
): CuratorOutput {
  if (!Array.isArray(obj.practice_assignments)) {
    throw new Error("Curator output: practice_assignments is not an array");
  }
  const assignments: CuratorPracticeAssignment[] = [];
  for (const a of obj.practice_assignments as unknown[]) {
    if (!a || typeof a !== "object" || Array.isArray(a)) {
      throw new Error("Curator output: non-object in practice_assignments");
    }
    const r = a as Record<string, unknown>;
    const id = typeof r.practice_id === "string" ? r.practice_id : "";
    if (!id) throw new Error("Curator output: practice_assignment missing practice_id");
    if (!Array.isArray(r.assigned_labels)) {
      throw new Error(`Curator output: practice ${id} assigned_labels not array`);
    }
    const labels = (r.assigned_labels as unknown[])
      .filter((v): v is string => typeof v === "string")
      .map(normalizeLabel)
      .filter((v) => v.length > 0);
    if (labels.length === 0) {
      throw new Error(`Curator output: practice ${id} has no valid assigned_labels`);
    }
    assignments.push({ practice_id: id, assigned_labels: [...new Set(labels)] });
  }

  // Missing practices are reported by the caller, which can fall back to
  // proposed_labels rather than blowing up the whole episode. Strict failure
  // here would lose real extractions over one dropped row.
  const assignedIds = new Set(assignments.map((a) => a.practice_id));
  const missing = [...proposedPracticeIds].filter((id) => !assignedIds.has(id));
  if (missing.length > 0) {
    (obj as { __missing?: string[] }).__missing = missing;
  }

  const rawNew = Array.isArray(obj.new_labels) ? (obj.new_labels as unknown[]) : [];
  const new_labels: CuratorNewLabel[] = [];
  for (const n of rawNew) {
    if (!n || typeof n !== "object" || Array.isArray(n)) continue;
    const r = n as Record<string, unknown>;
    const slug = typeof r.label === "string" ? normalizeLabel(r.label) : "";
    if (!slug) continue;
    new_labels.push({
      label: slug,
      description: typeof r.description === "string" ? r.description : "",
      first_introduced_by_practice_id:
        typeof r.first_introduced_by_practice_id === "string"
          ? r.first_introduced_by_practice_id
          : "",
    });
  }

  const rawSplit = Array.isArray(obj.split_candidates)
    ? (obj.split_candidates as unknown[])
    : [];
  const split_candidates: CuratorSplitCandidate[] = [];
  for (const s of rawSplit) {
    if (!s || typeof s !== "object" || Array.isArray(s)) continue;
    const r = s as Record<string, unknown>;
    if (typeof r.existing_label !== "string" || typeof r.reason !== "string") continue;
    split_candidates.push({
      existing_label: normalizeLabel(r.existing_label),
      reason: r.reason,
    });
  }

  return { practice_assignments: assignments, new_labels, split_candidates };
}

/**
 * Apply a curator's assignments back into the practices file so assigned_labels
 * is populated on each practice. Preserves proposed_labels untouched.
 */
function applyAssignmentsToPractices(
  file: PracticesFile,
  assignments: CuratorPracticeAssignment[]
): PracticesFile {
  const byId = new Map(assignments.map((a) => [a.practice_id, a.assigned_labels]));
  return {
    ...file,
    practices: file.practices.map((p) => ({
      ...p,
      assigned_labels: byId.get(p.practice_id) ?? [],
    })),
  };
}

/**
 * Verifies every practice ends up with at least one assigned label, and that
 * every label the curator used either already existed in labels.json or is
 * declared in new_labels. Prevents silent label drift.
 */
function assertCuratorIntegrity(
  output: CuratorOutput,
  existingLabels: LabelsFile
): void {
  const declared = new Set<string>([
    ...Object.keys(existingLabels.labels),
    ...output.new_labels.map((nl) => nl.label),
  ]);
  for (const a of output.practice_assignments) {
    if (a.assigned_labels.length === 0) {
      throw new Error(
        `Curator: practice ${a.practice_id} has no assigned labels`
      );
    }
    for (const lbl of a.assigned_labels) {
      if (!declared.has(lbl)) {
        throw new Error(
          `Curator: practice ${a.practice_id} assigned unknown label "${lbl}" that is not in existing library and not declared in new_labels`
        );
      }
    }
  }
}

export async function runLabelCurator(
  episodeNumber: number,
  config: Config,
  episodeDate: string
): Promise<{
  practicesFile: PracticesFile;
  labels: LabelsFile;
  newLabels: string[];
  splitCandidates: CuratorSplitCandidate[];
}> {
  const pPath = practicesPath(config.data_dir, episodeNumber);
  const practicesFile = JSON.parse(readFileSync(pPath, "utf8")) as PracticesFile;
  if (practicesFile.practices.length === 0) {
    // Nothing to curate; leave labels.json untouched.
    return {
      practicesFile,
      labels: readLabels(config.data_dir),
      newLabels: [],
      splitCandidates: [],
    };
  }

  const labelsBefore = readLabels(config.data_dir);
  const proposedIds = new Set(practicesFile.practices.map((p) => p.practice_id));

  const raw = await complete({
    model: config.curator_model,
    system: CURATOR_SYSTEM_PROMPT,
    user: buildUserMessage(practicesFile, labelsBefore),
    max_tokens: 8192,
    temperature: 0,
  });

  const rawPath = resolve(config.data_dir, "practices", `${episodeNumber}.curator.raw.txt`);
  mkdirSync(dirname(rawPath), { recursive: true });
  writeFileSync(rawPath, raw);

  const parsed = extractJsonObject(raw);
  const output = validateCuratorOutput(parsed, proposedIds);

  // Fill in any practices the curator omitted by falling back to the
  // extractor's proposed_labels. This preserves signal rather than crashing
  // when the curator drops a row. Also register any fallback labels that
  // aren't in the library as implicit new labels with empty descriptions.
  const assignedIds = new Set(output.practice_assignments.map((a) => a.practice_id));
  const knownLabels = new Set<string>([
    ...Object.keys(labelsBefore.labels),
    ...output.new_labels.map((nl) => nl.label),
  ]);
  for (const p of practicesFile.practices) {
    if (assignedIds.has(p.practice_id)) continue;
    const fallback = [...new Set(p.proposed_labels)].slice(0, 3);
    if (fallback.length === 0) {
      throw new Error(
        `Curator: practice ${p.practice_id} missing from output and has no proposed_labels to fall back on`
      );
    }
    console.warn(
      `[curator] ep ${episodeNumber}: practice ${p.practice_id} missing from curator output; using proposed_labels fallback: ${fallback.join(", ")}`
    );
    output.practice_assignments.push({
      practice_id: p.practice_id,
      assigned_labels: fallback,
    });
    for (const lbl of fallback) {
      if (!knownLabels.has(lbl)) {
        output.new_labels.push({
          label: lbl,
          description: "",
          first_introduced_by_practice_id: p.practice_id,
        });
        knownLabels.add(lbl);
      }
    }
  }

  assertCuratorIntegrity(output, labelsBefore);

  const updatedFile = applyAssignmentsToPractices(
    practicesFile,
    output.practice_assignments
  );
  atomicWriteJson(pPath, updatedFile);

  const labelsAfter = applyEpisodeToLabels(labelsBefore, {
    episodeNumber,
    episodeDate,
    assignments: output.practice_assignments,
    newLabels: output.new_labels,
  });
  writeLabels(config.data_dir, labelsAfter);

  return {
    practicesFile: updatedFile,
    labels: labelsAfter,
    newLabels: output.new_labels.map((nl) => nl.label),
    splitCandidates: output.split_candidates,
  };
}

export const __testing = {
  validateCuratorOutput,
  applyAssignmentsToPractices,
  assertCuratorIntegrity,
};

// Re-export LabelEntry type used in tests.
export type { LabelEntry };
