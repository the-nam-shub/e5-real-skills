import { parse as parseYaml } from "yaml";
import { complete } from "../anthropic.js";
import type {
  CategoryIndexCategory,
  Config,
  Disagreement,
  ReviewIssue,
} from "../types.js";

const SKILL_WRITER_SYSTEM_PROMPT = `You are compiling B2B marketing best practices from the Exit Five podcast into a Claude skill file. The skill file will be used by marketers as instructions for Claude to help them execute a specific marketing function.

CRITICAL RULES:
1. ONLY use practices provided in the input. Do not add best practices from general knowledge. If the input practices don't cover an aspect of the topic, leave it uncovered. Gaps are honest. Filler is fraud.
2. You will receive pre-identified disagreement objects alongside the practices. When disagreements exist:
   a. Present all positions with full attribution (including all supporters and their evidence) in a "Where Experts Disagree" section
   b. Include the support_summary (e.g., "3 vs 1") so the reader can see the shape of the disagreement
   c. Include the trend_note and context_dependency from the disagreement data
   d. Do NOT silently pick a side. Do NOT present a contested position as settled consensus elsewhere in the skill.
   e. When a practice appears in the main body of the skill AND is part of a disagreement, include a cross-reference: "(Note: this is contested — see Where Experts Disagree)"
3. Attribute practices to their source: "(Source: [Guest Name], Episode #[N])". This is non-negotiable. Every specific recommendation traces back to who said it.
4. Write the skill as instructions that Claude should follow when helping a user with this marketing task. Use imperative voice. Be specific about what to do and what not to do.
5. Structure the skill with:
   - YAML frontmatter (name, description)
   - A brief overview explaining what this skill covers and its source material
   - Organized sections grouping related practices
   - A "Where Experts Disagree" section (if disagreement objects were provided for this category)
   - Specific do's and don'ts drawn from the practices
   - A "Sources" section at the bottom listing every episode and guest that contributed

FORMAT:
The output must be a valid SKILL.md file. See the structure spec below.

SKILL FILE STRUCTURE:
---
name: {category-slug}
description: "{One-line description of what this skill helps with and when to trigger it}"
version: "{date of last update, YYYY-MM-DD}"
episode_count: {number of episodes contributing practices}
---

# {Skill Title}

## Overview
{2-3 sentences. What this skill covers. Explicit statement that all practices are sourced from Exit Five podcast guests.}

## {Section 1 - grouped by sub-topic}
{Practices organized logically. Each specific recommendation attributed.}

## {Section 2}
...

## Where Experts Disagree
{Only include if disagreement objects were provided for this category. Present each disagreement with all positions attributed, the reasoning each guest gave, the support summary (e.g., "3 vs 1"), and any context dependency or chronological trend. This section should help the user make an informed choice rather than pretending consensus exists where it doesn't.}

## What NOT To Do
{Anti-patterns and mistakes called out by guests, with attribution.}

## Sources
{List of episodes and guests that contributed to this skill, with episode numbers and dates.}`;

const REVISION_INSTRUCTION_PREFIX = `The following skill file was reviewed and needs revision. Address each issue listed below. Do not add new content from general knowledge to fix gaps. If removing a flagged section leaves a gap, leave the gap. Rewrite only what is necessary to resolve the issues.

CRITICAL: When an issue is flagged with criterion \`monday_morning_test\` at severity \`major\` or \`critical\`, the correct response is to REMOVE the practice entirely from the skill file — do not rename it, reframe it, add a checklist around it, or rewrite it under a new heading. The underlying source practice is failing because its substance is posture, forecast, or philosophy, not because of its wording. Self-aware disclaimers ("this is a framing principle, not a workflow step") do not rescue a flagged practice; they confirm the problem. Cutting content makes the skill thinner, which is honest. Do not try to operationalize a flagged philosophical claim by inventing review mechanisms, "apply this lens" framings, or "when to invoke" criteria — these all fail the same test.

The same principle applies to source contamination issues flagged as major or critical: remove the contaminated content, do not rephrase it to sound more sourced.

ISSUES:
`;

const STALL_REMOVAL_INSTRUCTION = `This skill file has been through the maximum number of revision cycles and still has unresolved issues. Produce one final version that REMOVES the flagged content entirely instead of attempting another rewrite. Do not substitute general knowledge to fill the gaps left behind. A thinner, honest skill is the correct output here.

REMAINING ISSUES TO RESOLVE BY REMOVAL:
`;

export interface SkillWriterInput {
  category: string;
  categoryData: CategoryIndexCategory;
  disagreements: Disagreement[];
}

export interface SkillWriterRevisionInput extends SkillWriterInput {
  previousSkillMarkdown: string;
  issues: ReviewIssue[];
}

function buildPracticesPayload(input: SkillWriterInput): string {
  const lines: string[] = [];
  lines.push(`Category: ${input.category}`);
  lines.push(`Episodes contributing: ${input.categoryData.episode_sources.length}`);
  lines.push(`Total practices: ${input.categoryData.practice_count}`);
  lines.push(`Today's date: ${new Date().toISOString().slice(0, 10)}`);
  lines.push("");
  lines.push("PRACTICES (JSON):");
  lines.push(JSON.stringify(input.categoryData.practices, null, 2));
  lines.push("");
  lines.push("DISAGREEMENTS (JSON):");
  lines.push(JSON.stringify(input.disagreements, null, 2));
  return lines.join("\n");
}

export function extractFrontmatter(markdown: string): Record<string, unknown> {
  const m = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!m) throw new Error("SKILL.md missing YAML frontmatter");
  const parsed = parseYaml(m[1]!);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("SKILL.md frontmatter did not parse to an object");
  }
  return parsed as Record<string, unknown>;
}

export function validateSkillMarkdown(markdown: string, category: string): void {
  const trimmed = markdown.trim();
  if (!trimmed.startsWith("---")) {
    throw new Error("SKILL.md must start with YAML frontmatter");
  }
  const fm = extractFrontmatter(trimmed);
  if (fm.name !== category) {
    throw new Error(
      `SKILL.md frontmatter name "${String(fm.name)}" does not match category "${category}"`
    );
  }
  if (typeof fm.description !== "string" || !fm.description) {
    throw new Error("SKILL.md frontmatter missing description");
  }
}

function stripFence(raw: string): string {
  const trimmed = raw.trim();
  const fence = trimmed.match(/^```(?:markdown|md)?\s*([\s\S]*?)```\s*$/);
  return (fence ? fence[1]! : trimmed).trim();
}

export async function writeSkill(
  input: SkillWriterInput,
  config: Config
): Promise<string> {
  const raw = await complete({
    model: config.compilation_model,
    system: SKILL_WRITER_SYSTEM_PROMPT,
    user: buildPracticesPayload(input),
    max_tokens: 32000,
    temperature: 0,
  });
  const markdown = stripFence(raw);
  validateSkillMarkdown(markdown, input.category);
  return markdown;
}

export async function reviseSkill(
  input: SkillWriterRevisionInput,
  config: Config
): Promise<string> {
  const issuesText = input.issues
    .map(
      (i, idx) =>
        `${idx + 1}. [${i.severity}] ${i.criterion} @ ${i.location}\n   Problem: ${i.problem}\n   Suggested fix: ${i.suggested_fix}`
    )
    .join("\n\n");
  const user = [
    buildPracticesPayload(input),
    "",
    "PREVIOUS DRAFT:",
    input.previousSkillMarkdown,
    "",
    REVISION_INSTRUCTION_PREFIX + issuesText,
  ].join("\n");
  const raw = await complete({
    model: config.compilation_model,
    system: SKILL_WRITER_SYSTEM_PROMPT,
    user,
    max_tokens: 32000,
    temperature: 0,
  });
  const markdown = stripFence(raw);
  validateSkillMarkdown(markdown, input.category);
  return markdown;
}

/**
 * Called when the revision loop has stalled (max cycles exceeded, reviewer
 * still flagging). Asks the writer for one final pass with explicit
 * "remove, do not revise" instructions so the published draft isn't carrying
 * the same unresolved content under yet another heading.
 */
export async function reviseSkillRemovingFlagged(
  input: SkillWriterRevisionInput,
  config: Config
): Promise<string> {
  const issuesText = input.issues
    .map(
      (i, idx) =>
        `${idx + 1}. [${i.severity}] ${i.criterion} @ ${i.location}\n   Problem: ${i.problem}`
    )
    .join("\n\n");
  const user = [
    buildPracticesPayload(input),
    "",
    "PREVIOUS DRAFT (to be cut down, not reframed):",
    input.previousSkillMarkdown,
    "",
    STALL_REMOVAL_INSTRUCTION + issuesText,
  ].join("\n");
  const raw = await complete({
    model: config.compilation_model,
    system: SKILL_WRITER_SYSTEM_PROMPT,
    user,
    max_tokens: 32000,
    temperature: 0,
  });
  const markdown = stripFence(raw);
  validateSkillMarkdown(markdown, input.category);
  return markdown;
}
