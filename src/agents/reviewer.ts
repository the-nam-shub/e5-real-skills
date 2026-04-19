import { writeFileSync, renameSync, mkdirSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { complete, extractJsonObject } from "../anthropic.js";
import type {
  CategoryIndexEntry,
  Config,
  Disagreement,
  ReviewRecord,
  ReviewResult,
} from "../types.js";

const REVIEWER_SYSTEM_PROMPT = `You are a quality reviewer for Claude skill files. Your job is adversarial: find problems. You are not here to validate the writer's work. You are here to catch the specific failure modes that make skill files useless.

Review the skill file against these criteria:

1. MONDAY MORNING TEST
For each recommendation in the skill, ask: could a B2B marketer read this and do something differently at work on Monday? If the answer is "not really" or "only with a lot of interpretation," flag it. Be specific about what's missing.

Failure examples:
- "Focus on the problems your buyers actually have" (too vague to act on)
- "Use data to drive decisions" (universal advice, not a skill)
- "Build trust with your audience" (no mechanism described)

Pass examples:
- "Split your budget 70% proven channels / 30% experimental. The 70% funds the machine, the 30% funds bets that could become the next part of the 70%." (specific ratio, clear logic)
- "Run incrementality tests on brand spend by going dark in one geo for 4-6 weeks and measuring the pipeline delta against a control geo." (specific method, timeframe, measurement approach)

2. SOURCE CONTAMINATION CHECK
Compare the skill file against the source practices provided. Flag any recommendation that:
- Does not trace to at least one source practice
- Adds specificity or detail not present in any source practice
- Introduces frameworks, terminology, or advice that appears to come from general knowledge rather than the podcast transcripts

This is the most important check. The entire value proposition of this project is that skills contain ONLY what podcast guests actually said. Any general knowledge contamination destroys credibility.

3. ATTRIBUTION COMPLETENESS
Every specific recommendation should be attributed to a guest and episode number. Flag any unattributed claims. One-off missing attributions are a "revise" issue. Systematic missing attributions are a "reject" issue.

4. DISAGREEMENT HANDLING
Check whether the skill silently picks a side when source practices conflict. Disagreements should be surfaced transparently with attribution to all positions, support counts (e.g., "3 vs 1"), and any chronological trend. Flag any case where the skill presents a contested position as settled consensus, or where it hides the shape of the disagreement (e.g., presenting a 5-vs-1 disagreement as if the positions had equal weight).

5. SKILL DIFFERENTIATION TEST
Would Claude produce meaningfully different output with this skill loaded vs. without it? If the skill mostly restates things Claude would say anyway from general training, the skill isn't earning its place. Flag specific sections that fail this test.

A thin skill (few practices) is fine if each practice is specific and substantive — a single strong, specific practice from one episode still earns its place. What's not fine is a skill that's thin because its practices are vague, hedged, or barely differentiated from general knowledge. Reject for vagueness. Do not reject for brevity alone.

6. STRUCTURAL ISSUES
- Is the YAML frontmatter complete and valid?
- Does the Sources section list every contributing episode?
- Are sections organized logically, or are practices dumped without grouping?
- Is the "What NOT To Do" section grounded in specific anti-patterns from guests, or is it generic cautionary advice?

OUTPUT FORMAT:
Return a JSON object:
{
  "verdict": "pass" | "revise" | "reject",
  "overall_assessment": "1-2 sentence summary of the skill's quality",
  "issues": [
    {
      "criterion": "monday_morning_test" | "source_contamination" | "attribution" | "disagreement_handling" | "skill_differentiation" | "structural",
      "severity": "minor" | "major" | "critical",
      "location": "Quote or describe the specific section/line",
      "problem": "What's wrong",
      "suggested_fix": "How the writer should fix it"
    }
  ],
  "strengths": ["List 1-3 things the skill does well, if any"]
}

VERDICT CRITERIA:
- pass: No major or critical issues. Minor issues acceptable.
- revise: 1+ major issues OR 3+ minor issues. Writer should fix and resubmit.
- reject: 1+ critical issues (typically source contamination or systematic missing attribution). Writer must rewrite from scratch.

Be harsh. A skill that passes your review should be noticeably better than what Claude would produce from general knowledge. That's the only bar that matters.`;

export interface ReviewerInput {
  category: string;
  skillMarkdown: string;
  sourcePractices: CategoryIndexEntry[];
  disagreements: Disagreement[];
}

function buildReviewerUserMessage(input: ReviewerInput): string {
  return [
    `Category: ${input.category}`,
    "",
    "SOURCE PRACTICES (these were fed to the writer):",
    JSON.stringify(input.sourcePractices, null, 2),
    "",
    "DISAGREEMENTS (also fed to the writer):",
    JSON.stringify(input.disagreements, null, 2),
    "",
    "SKILL.md TO REVIEW:",
    input.skillMarkdown,
    "",
    "Return ONLY the JSON object described in your instructions.",
  ].join("\n");
}

function coerceReview(obj: Record<string, unknown>): ReviewResult {
  const verdict = obj.verdict;
  if (verdict !== "pass" && verdict !== "revise" && verdict !== "reject") {
    throw new Error(`Reviewer returned invalid verdict: ${String(verdict)}`);
  }
  const issues = Array.isArray(obj.issues) ? obj.issues : [];
  const strengths = Array.isArray(obj.strengths) ? (obj.strengths as string[]) : [];
  return {
    verdict,
    overall_assessment: String(obj.overall_assessment ?? ""),
    issues: issues as ReviewResult["issues"],
    strengths,
  };
}

export async function reviewSkill(
  input: ReviewerInput,
  config: Config
): Promise<ReviewResult> {
  const raw = await complete({
    model: config.review_model,
    system: REVIEWER_SYSTEM_PROMPT,
    user: buildReviewerUserMessage(input),
    max_tokens: 4096,
    temperature: 0,
  });
  const parsed = extractJsonObject(raw);
  return coerceReview(parsed);
}

export function saveReview(
  dataDir: string,
  category: string,
  record: ReviewRecord
): string {
  const timestamp = record.review_date.replace(/[:.]/g, "-");
  const path = resolve(dataDir, "reviews", `${category}-${timestamp}.json`);
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, JSON.stringify(record, null, 2));
  renameSync(tmp, path);
  return path;
}

export function listReviewsForCategory(
  dataDir: string,
  category: string
): string[] {
  const dir = resolve(dataDir, "reviews");
  try {
    return readdirSync(dir)
      .filter((f) => f.startsWith(`${category}-`) && f.endsWith(".json"))
      .sort();
  } catch {
    return [];
  }
}
