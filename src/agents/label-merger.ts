import { complete, extractJsonObject } from "../anthropic.js";
import type { Config, LabelsFile } from "../types.js";

const MERGER_SYSTEM_PROMPT = `You are auditing a B2B marketing skills library for redundant labels. You will be given every label in the library with its description, practice count, and episode count. Your job is to identify pairs of labels that are TRULY REDUNDANT — meaning one is a synonym or near-synonym of the other and merging them would not lose meaningful distinction.

BE STRICT. Only flag a merge when:
- The two labels describe substantively the same activity at substantively the same level of specificity
- A practitioner looking for guidance on this topic would not expect them to be separate skills
- The "keep" label is a superset or synonym of the "absorb" label's scope

DO NOT merge when:
- One is a sub-topic of the other (e.g., "paid-media" vs "linkedin-ads-tactics" — same family, different specificity — KEEP SEPARATE)
- They address related but distinct activities (e.g., "demand-generation" vs "paid-media-strategy" — overlapping but distinct — KEEP SEPARATE)
- They could plausibly contain different kinds of practices (e.g., "content-strategy" vs "content-distribution" — strategy vs execution — KEEP SEPARATE)
- You're "kind of" sure — being on the fence is a NO-merge signal

EXAMPLE OF A VALID MERGE: "conversion-optimization" and "website-conversion-optimization" — the latter is the former with a redundant "website-" prefix; same activity.

EXAMPLE OF AN INVALID MERGE (do not propose this): "copywriting-and-messaging" and "positioning-and-messaging" — both involve messaging but the former is about execution and the latter is strategic positioning.

OUTPUT FORMAT: return a JSON object with a "merges" array. Each entry specifies which label to KEEP (the one with broader or more canonical naming) and which to ABSORB (the redundant one to delete after moving its practices). Include a one-sentence rationale for each.

{
  "merges": [
    {
      "keep": "label-slug-to-keep",
      "absorb": "label-slug-to-absorb",
      "rationale": "one sentence explaining why these are the same activity"
    }
  ]
}

If nothing is truly redundant, return {"merges": []}. That is a valid, common answer. Do not manufacture merges to justify this call.`;

export interface MergePair {
  keep: string;
  absorb: string;
  rationale: string;
}

function buildUserMessage(labels: LabelsFile): string {
  const rows = Object.entries(labels.labels)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([slug, entry]) => ({
      label: slug,
      description: entry.description || "(no description)",
      practice_count: entry.practice_count,
      episode_count: entry.episode_sources.length,
    }));
  return [
    `LIBRARY — ${rows.length} labels total:`,
    JSON.stringify(rows, null, 2),
    "",
    'Return ONLY the JSON object { "merges": [...] }. Be strict: if nothing is truly redundant, return an empty array.',
  ].join("\n");
}

function validateMerges(
  output: Record<string, unknown>,
  existingLabels: Set<string>
): MergePair[] {
  if (!Array.isArray(output.merges)) {
    throw new Error("Merger output: 'merges' is not an array");
  }
  const result: MergePair[] = [];
  const seenAbsorb = new Set<string>();
  for (const m of output.merges as unknown[]) {
    if (!m || typeof m !== "object") continue;
    const r = m as Record<string, unknown>;
    const keep = typeof r.keep === "string" ? r.keep : "";
    const absorb = typeof r.absorb === "string" ? r.absorb : "";
    const rationale = typeof r.rationale === "string" ? r.rationale : "";
    if (!keep || !absorb) continue;
    if (keep === absorb) continue;
    if (!existingLabels.has(keep) || !existingLabels.has(absorb)) {
      console.warn(
        `[merger] skipping pair with unknown label: keep=${keep} absorb=${absorb}`
      );
      continue;
    }
    if (seenAbsorb.has(absorb)) {
      console.warn(`[merger] skipping duplicate absorb target: ${absorb}`);
      continue;
    }
    seenAbsorb.add(absorb);
    result.push({ keep, absorb, rationale });
  }
  return result;
}

export async function proposeMerges(
  labels: LabelsFile,
  config: Config
): Promise<MergePair[]> {
  const raw = await complete({
    model: config.curator_model,
    system: MERGER_SYSTEM_PROMPT,
    user: buildUserMessage(labels),
    max_tokens: 4096,
    temperature: 0,
  });
  const parsed = extractJsonObject(raw);
  return validateMerges(parsed, new Set(Object.keys(labels.labels)));
}
