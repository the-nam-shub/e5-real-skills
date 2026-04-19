import { writeFileSync, renameSync, mkdirSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { stringify as stringifyYaml, parse as parseYaml } from "yaml";
import { complete } from "../anthropic.js";
import type {
  Config,
  Manifest,
  TranscriptFile,
} from "../types.js";
import type { EpisodeDiff } from "../skill-diff.js";

const EPISODE_ANALYST_SYSTEM_PROMPT = `You are writing a short analytical post about what a new Exit Five podcast episode contributed to a body of B2B marketing knowledge. This post will be published on a website that tracks the evolution of best practices across the podcast.

Your job is to answer three questions:
1. What new specific practices did this episode introduce?
2. Which existing skill files were updated as a result, and how?
3. Did this episode create any new disagreements with previous guests, or reinforce existing ones?

VOICE AND FORMAT:
- Clean analytical prose. Not hype. Not "takeaways" bullet lists. Not LinkedIn-style drama.
- Assume the reader is a B2B marketer who may or may not have listened to the episode.
- Lead with what's actually new. If the episode mostly restated existing consensus, say so directly.
- When covering disagreements, attribute both sides and surface the support counts. "Guest X joins Guest Y in arguing against Guest Z's position from episode #200" is the right level of specificity.
- Under 1000 words. Favor completeness over compression — these files are reference material for internal audit and archival purposes.
- No em dashes.

STRUCTURE:
# Episode #{N}: {Guest Name} on {Topic}

{1-2 sentence intro framing what the episode covered and whether it broke new ground.}

## New practices extracted
{Bulleted list of the most specific, implementable new practices. Skip marginal ones. If fewer than 3 strong practices, list what's there and stop.}

## Skills updated
{For each skill file that changed: 1-2 sentences on what was added, revised, or challenged.}

## Where this creates tension
{If this episode introduces new disagreements or reinforces existing ones, explain them with attribution. If not, say "No new disagreements surfaced in this episode" and move on.}

WHAT TO AVOID:
- "This episode was packed with insights" or similar filler
- Summarizing the whole episode narrative when you should be highlighting what's new
- Pretending there was a meaningful update when there wasn't
- Soft language like "some might argue" or "it could be said" — just attribute and state`;

export interface EpisodeAnalystInput {
  transcript: TranscriptFile;
  diff: EpisodeDiff;
}

interface FrontmatterValues {
  episode_number: number;
  title: string;
  guest: string;
  guest_role: string;
  episode_date: string;
  episode_url: string;
  skills_updated: string[];
  new_practices_count: number;
  new_disagreements: number;
  reinforced_disagreements: number;
}

function sanitizeGuestName(raw: string | undefined, diff: EpisodeDiff): string {
  const cleaned = (raw ?? "").trim();
  const isClean =
    cleaned.length > 0 &&
    cleaned.length <= 60 &&
    !/[()!?"]/.test(cleaned) &&
    /^[A-Za-z][A-Za-z .'-]*$/.test(cleaned);
  if (isClean) return cleaned;
  // Fallback: derive the dominant non-host guest_name from this episode's practices.
  const counts = new Map<string, number>();
  for (const su of diff.skills_updated) {
    for (const p of su.added_practices) {
      const name = (p.guest_name ?? "").trim();
      if (!name) continue;
      if (/dave\s+gerhardt/i.test(name)) continue;
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return "";
  if (sorted.length === 1) return sorted[0]![0]!;
  const [top, second] = sorted;
  if (top && second && top[1] >= second[1] * 2) return top[0];
  return "multiple guests";
}

function sanitizeGuestRole(
  raw: string | undefined,
  guestName: string,
  diff: EpisodeDiff
): string {
  const cleaned = (raw ?? "").trim();
  // The scraped guest_title often runs into a full sentence; keep just the role clause.
  if (cleaned.length > 0 && cleaned.length <= 100 && !/\. /.test(cleaned)) {
    const atClause = cleaned.match(/^[^,.]{0,120}\bat\s+[^,.]{1,60}/);
    if (atClause) return atClause[0].trim();
  }
  // Fallback: look up guest_context on a practice attributed to this guest.
  if (guestName && guestName !== "multiple guests") {
    for (const su of diff.skills_updated) {
      for (const p of su.added_practices) {
        if (p.guest_name === guestName && p.guest_context) {
          return p.guest_context.trim().slice(0, 120);
        }
      }
    }
  }
  return "";
}

export function buildFrontmatter(
  transcript: TranscriptFile,
  diff: EpisodeDiff
): FrontmatterValues {
  const guest = sanitizeGuestName(transcript.guest, diff);
  const guest_role = sanitizeGuestRole(transcript.guest_title, guest, diff);
  const skills = diff.skills_updated
    .filter((s) => s.skill_file_exists)
    .map((s) => s.category)
    .sort();
  const newPracticesCount = diff.skills_updated.reduce((acc, s) => {
    for (const p of s.added_practices) acc.add(p.practice_id);
    return acc;
  }, new Set<string>()).size;
  return {
    episode_number: transcript.episode_number,
    title: transcript.title,
    guest,
    guest_role,
    episode_date: transcript.date,
    episode_url: transcript.episode_url,
    skills_updated: skills,
    new_practices_count: newPracticesCount,
    new_disagreements: diff.new_disagreements.length,
    reinforced_disagreements: diff.reinforced_disagreements.length,
  };
}

function buildUserMessage(input: EpisodeAnalystInput, fm: FrontmatterValues): string {
  const { diff, transcript } = input;
  const practices = diff.skills_updated.flatMap((s) => s.added_practices);
  const seen = new Set<string>();
  const deduped = practices.filter((p) => {
    if (seen.has(p.practice_id)) return false;
    seen.add(p.practice_id);
    return true;
  });
  return [
    `Episode #${transcript.episode_number}: ${transcript.title}`,
    `Guest: ${fm.guest || "(unknown / panel)"}`,
    fm.guest_role ? `Guest role: ${fm.guest_role}` : "",
    `Date: ${transcript.date}`,
    "",
    "=== NEW PRACTICES EXTRACTED (from this episode) ===",
    JSON.stringify(deduped, null, 2),
    "",
    "=== SKILLS TOUCHED (those with an existing SKILL.md are 'updated'; others are new categories) ===",
    JSON.stringify(
      diff.skills_updated.map((s) => ({
        category: s.category,
        new_practice_ids: s.added_practices.map((p) => p.practice_id),
        total_practices_in_category_now: s.total_practices_in_category,
        skill_file_exists: s.skill_file_exists,
      })),
      null,
      2
    ),
    "",
    "=== NEW DISAGREEMENTS (all supporters come from this episode) ===",
    JSON.stringify(diff.new_disagreements, null, 2),
    "",
    "=== REINFORCED DISAGREEMENTS (this episode added a supporter to an existing disagreement) ===",
    JSON.stringify(diff.reinforced_disagreements, null, 2),
    "",
    "HARD CONSTRAINTS:",
    "- Body must be under 1000 words. Favor completeness over compression — these files are reference material.",
    "- No em dashes (U+2014). Use a comma, semicolon, or parenthesis instead.",
    "- Do NOT quote transcript text verbatim; summarize each practice in your own analytical voice using the descriptions provided.",
    "- Structure ends after the '## Where this creates tension' section. Do NOT include a '## Verdict' heading.",
    "- If skills_updated is empty, say the episode has not yet been compiled into skills. Do not invent updates.",
    "- If new_disagreements and reinforced_disagreements are both empty, explicitly say 'No new disagreements surfaced in this episode.'",
    "Return ONLY the markdown body (no frontmatter block). Start with the `# Episode #{N}: ...` heading.",
  ]
    .filter(Boolean)
    .join("\n");
}

function countWords(text: string): number {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w)).length;
}

const EM_DASH = "\u2014";

function stripFenceIfAny(raw: string): string {
  const trimmed = raw.trim();
  const fence = trimmed.match(/^```(?:markdown|md)?\s*([\s\S]*?)```\s*$/);
  return (fence ? fence[1]! : trimmed).trim();
}

export const MAX_BODY_WORDS = 1000;

export function validateAnalysisBody(body: string, episodeNumber: number): void {
  if (body.includes(EM_DASH)) {
    const snippet = body.slice(
      Math.max(0, body.indexOf(EM_DASH) - 40),
      body.indexOf(EM_DASH) + 40
    );
    throw new Error(
      `Episode #${episodeNumber}: analysis body contains em dash (U+2014) near "${snippet}"`
    );
  }
  if (/^##\s+Verdict\b/m.test(body)) {
    throw new Error(
      `Episode #${episodeNumber}: analysis body contains a "## Verdict" heading (removed from spec)`
    );
  }
  const words = countWords(body);
  if (words > MAX_BODY_WORDS) {
    throw new Error(
      `Episode #${episodeNumber}: analysis body is ${words} words (max ${MAX_BODY_WORDS})`
    );
  }
  if (!/^# Episode #/m.test(body.split("\n", 1)[0] ?? "")) {
    throw new Error(
      `Episode #${episodeNumber}: analysis body must begin with "# Episode #..." heading`
    );
  }
}

export function bodyWordCount(body: string): number {
  return countWords(body);
}

export function assembleMarkdown(
  fm: FrontmatterValues,
  body: string
): string {
  const yaml = stringifyYaml(fm, { lineWidth: 0 }).trimEnd();
  return `---\n${yaml}\n---\n\n${body.trim()}\n`;
}

export function validateAssembledFile(markdown: string, episodeNumber: number): void {
  const m = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!m) {
    throw new Error(`Episode #${episodeNumber}: assembled file missing frontmatter`);
  }
  const parsed = parseYaml(m[1]!);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`Episode #${episodeNumber}: frontmatter did not parse to an object`);
  }
  const fm = parsed as Record<string, unknown>;
  const required = [
    "episode_number",
    "title",
    "guest",
    "guest_role",
    "episode_date",
    "episode_url",
    "skills_updated",
    "new_practices_count",
    "new_disagreements",
    "reinforced_disagreements",
  ];
  for (const key of required) {
    if (!(key in fm)) {
      throw new Error(
        `Episode #${episodeNumber}: frontmatter missing required field "${key}"`
      );
    }
  }
  if (!Array.isArray(fm.skills_updated)) {
    throw new Error(
      `Episode #${episodeNumber}: skills_updated must be a YAML array`
    );
  }
}

function analysisPath(dataDir: string, episodeNumber: number): string {
  return resolve(dataDir, "episode-analyses", `${episodeNumber}.md`);
}

function atomicWriteText(path: string, contents: string): void {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, contents);
  renameSync(tmp, path);
}

async function generateBody(
  system: string,
  user: string,
  config: Config
): Promise<string> {
  const raw = await complete({
    model: config.analyst_model,
    system,
    user,
    max_tokens: 3072,
    temperature: 0,
  });
  return stripFenceIfAny(raw);
}

export async function runEpisodeAnalyst(
  input: EpisodeAnalystInput,
  config: Config
): Promise<{
  path: string;
  frontmatter: FrontmatterValues;
  body: string;
  retried: boolean;
}> {
  const fm = buildFrontmatter(input.transcript, input.diff);
  const userMessage = buildUserMessage(input, fm);

  let body = await generateBody(EPISODE_ANALYST_SYSTEM_PROMPT, userMessage, config);
  let retried = false;

  // One-shot retry when the first draft exceeds the word cap. Other violations
  // (em dash, "## Verdict" heading, missing title) still fail hard.
  const words = bodyWordCount(body);
  if (words > MAX_BODY_WORDS) {
    retried = true;
    const retryUser = [
      userMessage,
      "",
      "=== PREVIOUS DRAFT (too long) ===",
      body,
      "",
      `The previous draft is ${words} words. Rewrite it to be under 950 words while preserving every specific practice, attribution, disagreement, and cross-reference. Do not drop content that's grounded in the diff; cut general framing, repetition, and filler instead. Same structure (no "## Verdict" section). No em dashes.`,
    ].join("\n");
    body = await generateBody(EPISODE_ANALYST_SYSTEM_PROMPT, retryUser, config);
  }

  validateAnalysisBody(body, input.transcript.episode_number);
  const assembled = assembleMarkdown(fm, body);
  validateAssembledFile(assembled, input.transcript.episode_number);
  const path = analysisPath(config.data_dir, input.transcript.episode_number);
  atomicWriteText(path, assembled);
  return { path, frontmatter: fm, body, retried };
}

export function loadTranscript(dataDir: string, episodeNumber: number): TranscriptFile {
  const p = resolve(dataDir, "transcripts", `${episodeNumber}.json`);
  return JSON.parse(readFileSync(p, "utf8")) as TranscriptFile;
}

export function listProcessedEpisodes(manifest: Manifest): number[] {
  return manifest.episodes
    .filter(
      (e) => e.status === "processed" || e.status === "processed_no_practices"
    )
    .map((e) => e.episode_number)
    .sort((a, b) => b - a);
}
