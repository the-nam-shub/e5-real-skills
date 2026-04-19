import { writeFileSync, renameSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { complete, extractJsonArray } from "../anthropic.js";
import type {
  CategoryIndexCategory,
  Config,
  Disagreement,
  DisagreementPosition,
  DisagreementsFile,
} from "../types.js";

const DISAGREEMENT_SYSTEM_PROMPT = `You are analyzing a set of B2B marketing best practices extracted from different podcast episodes to identify genuine disagreements between experts.

Your job is to find cases where experts give directly conflicting advice on the same tactical question. Structure each disagreement by counting how many guests support each position, because that context matters: "6 experts agree, 1 disagrees" is a very different story than "3 vs 3."

WHAT COUNTS AS A DISAGREEMENT:
- Two or more guests give specific, concrete advice that conflicts on the same question.
- Guest A says to do X. Guest B says to NOT do X, or to do the opposite of X.
- Guest A recommends a specific approach. Guest B explicitly argues against that same approach.
- Guest A gives a specific number/benchmark. Guest B gives a meaningfully different number for the same metric.
- Guest A says a channel/tactic works. Guest B says it doesn't work.

WHAT DOES NOT COUNT:
- Different guests emphasizing different aspects of the same topic (complementary, not conflicting).
- Advice applying to different company stages or contexts (unless both guests are explicitly talking about the same context).
- One guest covering a topic and another not mentioning it.
- Terminology differences for the same underlying practice.
- Vague practices that could be interpreted as conflicting but aren't specific enough to actually conflict.

For each disagreement, group all supporting guests into positions. A "position" is a coherent stance. The same disagreement might have 2, 3, or occasionally more distinct positions.

For each disagreement identified, return:

1. disagreement_id: unique slug (e.g., "gated-vs-ungated-content")
2. title: Concise framing as a question (e.g., "Should you gate your best content?")
3. category: The category slug
4. positions: Array of position objects, each containing:
   - position_id: slug (e.g., "pro_gating")
   - stance: 2-3 sentence summary of this position
   - supporters: Array of guest objects, each with:
     - guest_name
     - guest_context (role/company; for Dave Gerhardt use "Host of Exit Five podcast; former CMO" — never label him as a guest)
     - episode_number
     - episode_date
     - evidence: What reasoning or data did this guest cite?
     - practice_id: Reference to the source practice
5. support_summary: Human-readable count describing the distribution (e.g., "6 vs 1", "3 vs 3", "4 vs 2 vs 1"). This captures the degree of disagreement. Dave Gerhardt counts as one supporter like any other expert voice — his views are not weighted differently from guests — but the stance he's taking should be clearly attributable to him as host in the supporters array, not misrepresented as a one-off guest position.
6. context_dependency: Does this disagreement dissolve if you account for different company stages, industries, or GTM motions? Be specific. If no, say "genuine disagreement regardless of context."
7. trend_note: If there's a chronological pattern where recent guests cluster on one side and older guests on the other, describe it specifically. Otherwise set to null. This is the only way a "field is shifting" signal gets captured.
8. why_it_matters: 1-2 sentences explaining why a B2B marketer should care about which side is right.

OUTPUT FORMAT: Return a JSON array of disagreement objects. If no genuine disagreements exist in this category, return an empty array. Do NOT manufacture tensions. An empty array is valid.`;

export function meetsDisagreementThreshold(
  categoryData: CategoryIndexCategory,
  config: Config
): boolean {
  const distinctEpisodes = new Set(categoryData.practices.map((p) => p.episode_number));
  return (
    categoryData.practice_count >= config.min_practices_for_disagreement_analysis &&
    distinctEpisodes.size >= config.min_episodes_for_disagreement_analysis
  );
}

function buildUserMessage(
  category: string,
  data: CategoryIndexCategory
): string {
  return [
    `Category: ${category}`,
    `Total practices: ${data.practice_count}`,
    `Episodes contributing: ${data.episode_sources.length}`,
    "",
    "PRACTICES (JSON, sorted by episode_date desc):",
    JSON.stringify(data.practices, null, 2),
    "",
    'Return ONLY the JSON array described in the instructions. Use `null` (not the string "null") for trend_note when no chronological pattern exists.',
  ].join("\n");
}

function validateDisagreement(d: unknown, idx: number): Disagreement {
  if (!d || typeof d !== "object" || Array.isArray(d)) {
    throw new Error(`Disagreement #${idx} is not an object`);
  }
  const r = d as Record<string, unknown>;
  for (const key of [
    "disagreement_id",
    "title",
    "category",
    "positions",
    "support_summary",
    "context_dependency",
    "why_it_matters",
  ] as const) {
    if (!(key in r)) throw new Error(`Disagreement #${idx} missing field: ${key}`);
  }
  if (!Array.isArray(r.positions)) {
    throw new Error(`Disagreement #${idx} positions is not an array`);
  }
  for (const p of r.positions as DisagreementPosition[]) {
    if (!p || typeof p !== "object" || Array.isArray(p)) {
      throw new Error(`Disagreement #${idx} has non-object position`);
    }
    if (!Array.isArray(p.supporters)) {
      throw new Error(`Disagreement #${idx} position missing supporters array`);
    }
  }
  if (!("trend_note" in r)) {
    (r as { trend_note: null }).trend_note = null;
  }
  return r as unknown as Disagreement;
}

function validateSupportCounts(d: Disagreement): void {
  // Sanity: every position has >= 1 supporter, and total supporters >= 2.
  const total = d.positions.reduce((n, p) => n + p.supporters.length, 0);
  if (d.positions.length < 2) {
    throw new Error(
      `Disagreement ${d.disagreement_id} must have at least 2 positions`
    );
  }
  for (const p of d.positions) {
    if (p.supporters.length < 1) {
      throw new Error(
        `Disagreement ${d.disagreement_id} position ${p.position_id} has no supporters`
      );
    }
  }
  if (total < 2) {
    throw new Error(
      `Disagreement ${d.disagreement_id} total supporters (${total}) < 2`
    );
  }
}

function disagreementsPath(dataDir: string, category: string): string {
  return resolve(dataDir, "disagreements", `${category}.json`);
}

function atomicWriteJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, JSON.stringify(value, null, 2));
  renameSync(tmp, path);
}

export async function runDisagreementAnalyst(
  category: string,
  data: CategoryIndexCategory,
  config: Config
): Promise<{ file: DisagreementsFile; path: string }> {
  const raw = await complete({
    model: config.disagreement_model,
    system: DISAGREEMENT_SYSTEM_PROMPT,
    user: buildUserMessage(category, data),
    max_tokens: 8192,
    temperature: 0,
  });
  const parsed = extractJsonArray(raw);
  const disagreements = parsed.map((d, i) => {
    const v = validateDisagreement(d, i);
    // Force category slug to match
    v.category = category;
    validateSupportCounts(v);
    return v;
  });

  const file: DisagreementsFile = {
    category,
    analysis_date: new Date().toISOString().slice(0, 10),
    analysis_model: config.disagreement_model,
    disagreements,
  };
  const path = disagreementsPath(config.data_dir, category);
  atomicWriteJson(path, file);
  return { file, path };
}
