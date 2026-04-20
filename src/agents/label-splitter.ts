import { complete, extractJsonObject } from "../anthropic.js";
import type { CategoryIndexEntry, Config } from "../types.js";

const SPLITTER_SYSTEM_PROMPT = `You are curating a B2B marketing skills library. One label has accumulated too many practices to produce a coherent Claude skill file. A reader asking for guidance on this topic would face an overwhelming wall. Your job is to split it into 3–6 narrower sub-labels.

RULES:
- Each new sub-label must have AT LEAST 15 practices assigned to it. If a candidate sub-topic doesn't have 15 practices to support it, do NOT create it — leave those practices under the original label.
- Each sub-label must describe a DISTINCT marketing activity or topic that a practitioner would search for as a standalone skill.
- Sub-label names: lowercase-hyphenated, descriptive (good: "paid-media-channel-strategy", bad: "advanced-strategies", bad: "stuff-about-x"). Should be specific enough that their scope is clear from the name.
- Don't introduce concepts foreign to the original label's topic. If the mega-label is "content-strategy", every sub-label must still be about content strategy.
- Don't split so finely that each sub-label is weaker than a cohesive parent. 3–5 sub-labels is usually right; 6 is a ceiling.
- If a practice doesn't fit cleanly into any of your proposed sub-labels, mark its new_label as null and it stays in the original label. Don't force-fit.

You are splitting ONE label at a time. The label and all its practices are in the input. Output MUST be JSON with this shape:

{
  "split_rationale": "one or two sentences on how you're dividing this label and why these particular cuts",
  "new_labels": [
    {
      "label": "lowercase-hyphenated-slug",
      "description": "one-line description of what practices belong here",
      "estimated_practice_count": N
    }
  ],
  "practice_assignments": [
    { "practice_id": "...", "new_label": "lowercase-hyphenated-slug" },
    { "practice_id": "...", "new_label": null }
  ]
}

Every practice_id from the input MUST appear in practice_assignments (either with a new_label or null). Only propose new_labels that have at least 15 assignments — if fewer than 15 practices fit, don't create that sub-label, put those practices as null instead.`;

export interface SplitProposal {
  split_rationale: string;
  new_labels: Array<{
    label: string;
    description: string;
    estimated_practice_count: number;
  }>;
  practice_assignments: Array<{
    practice_id: string;
    new_label: string | null;
  }>;
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
  label: string,
  practices: CategoryIndexEntry[]
): string {
  return [
    `MEGA-LABEL TO SPLIT: "${label}"`,
    `PRACTICE COUNT: ${practices.length}`,
    "",
    "PRACTICES (each is a practice_id + title + description):",
    JSON.stringify(
      practices.map((p) => ({
        practice_id: p.practice_id,
        title: p.title,
        description: p.description,
      })),
      null,
      2
    ),
    "",
    'Return ONLY the JSON object described in your instructions. Every practice_id must appear exactly once in practice_assignments.',
  ].join("\n");
}

function validateProposal(
  raw: Record<string, unknown>,
  inputPracticeIds: Set<string>
): SplitProposal {
  const rationale =
    typeof raw.split_rationale === "string" ? raw.split_rationale : "";

  if (!Array.isArray(raw.new_labels)) {
    throw new Error("Splitter output: new_labels is not an array");
  }
  const new_labels: SplitProposal["new_labels"] = [];
  for (const n of raw.new_labels as unknown[]) {
    if (!n || typeof n !== "object") continue;
    const r = n as Record<string, unknown>;
    const slug = typeof r.label === "string" ? normalizeLabel(r.label) : "";
    if (!slug) continue;
    new_labels.push({
      label: slug,
      description: typeof r.description === "string" ? r.description : "",
      estimated_practice_count:
        typeof r.estimated_practice_count === "number"
          ? r.estimated_practice_count
          : 0,
    });
  }

  if (!Array.isArray(raw.practice_assignments)) {
    throw new Error("Splitter output: practice_assignments is not an array");
  }
  const practice_assignments: SplitProposal["practice_assignments"] = [];
  const allowedSublabels = new Set(new_labels.map((n) => n.label));
  for (const a of raw.practice_assignments as unknown[]) {
    if (!a || typeof a !== "object") continue;
    const r = a as Record<string, unknown>;
    const id = typeof r.practice_id === "string" ? r.practice_id : "";
    if (!id) continue;
    const rawLabel =
      typeof r.new_label === "string" ? normalizeLabel(r.new_label) : null;
    const new_label =
      rawLabel && allowedSublabels.has(rawLabel) ? rawLabel : null;
    practice_assignments.push({ practice_id: id, new_label });
  }

  // Check all input practices got an assignment — fall back to null for any missing.
  const assignedIds = new Set(practice_assignments.map((a) => a.practice_id));
  for (const id of inputPracticeIds) {
    if (!assignedIds.has(id)) {
      console.warn(
        `[splitter] practice ${id} missing from proposal; keeping in original label`
      );
      practice_assignments.push({ practice_id: id, new_label: null });
    }
  }

  // Enforce the ≥15 minimum per sub-label — if fewer than 15 practices ended up
  // assigned to a proposed sub-label, collapse them back to the original label.
  const countsBySublabel = new Map<string, number>();
  for (const a of practice_assignments) {
    if (a.new_label) {
      countsBySublabel.set(
        a.new_label,
        (countsBySublabel.get(a.new_label) ?? 0) + 1
      );
    }
  }
  const keptSublabels = new Set(
    [...countsBySublabel.entries()].filter(([, n]) => n >= 15).map(([s]) => s)
  );
  if (keptSublabels.size !== countsBySublabel.size) {
    for (const a of practice_assignments) {
      if (a.new_label && !keptSublabels.has(a.new_label)) a.new_label = null;
    }
  }
  const finalNewLabels = new_labels.filter((n) => keptSublabels.has(n.label));

  return {
    split_rationale: rationale,
    new_labels: finalNewLabels,
    practice_assignments,
  };
}

export async function proposeSplit(
  label: string,
  practices: CategoryIndexEntry[],
  config: Config
): Promise<SplitProposal> {
  const raw = await complete({
    model: config.curator_model,
    system: SPLITTER_SYSTEM_PROMPT,
    user: buildUserMessage(label, practices),
    max_tokens: 16384,
    temperature: 0,
  });
  const parsed = extractJsonObject(raw);
  return validateProposal(parsed, new Set(practices.map((p) => p.practice_id)));
}
