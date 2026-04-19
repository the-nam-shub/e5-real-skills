import { readFileSync, writeFileSync, renameSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { complete, extractJsonArray } from "../anthropic.js";
import type {
  Config,
  Manifest,
  Practice,
  PracticesFile,
  TranscriptFile,
} from "../types.js";

const EXTRACTOR_SYSTEM_PROMPT = `You are analyzing a B2B marketing podcast transcript to extract specific, actionable best practices.

The intended use: these practices become Claude skill files that help marketers execute specific tasks — e.g., "what's the right way to measure LinkedIn ad performance," "how do I structure a brand awareness survey," "how do I set up an incrementality test." Skills built from these practices are execution manuals, not general marketing guidance or thought leadership. Extract accordingly: favor practices a marketer could walk away from the page and do, and reject content that only helps a marketer think about marketing.

WHAT COUNTS AS A BEST PRACTICE:
- A specific technique, framework, process, or approach that a marketer could implement
- Must include enough detail that someone could act on it without needing to listen to the episode
- Must come directly from what the guest or host said - not inferred or extrapolated
- Includes: specific metrics/benchmarks shared, named frameworks, step-by-step processes described, specific tools/channels recommended with context on how to use them, contrarian positions backed by evidence or experience

WHAT DOES NOT COUNT:
- Generic advice ("know your audience", "be authentic", "test and iterate")
- Opinions without supporting reasoning or evidence
- Observations about industry trends without actionable implications
- Predictions or forecasts about the future of marketing or the industry (e.g., "X% of marketing will be automated," "Channel Y is dead," "the bear case is..."), even when stated with specific numbers or strong personal conviction. A forecast is not a practice unless the guest also describes a concrete mechanism the listener can execute today that stands independent of whether the forecast is correct.
- Posture or mindset recommendations ("shift into builder mode," "embrace the change," "reinvent yourself," "get ahead of it") without a specific mechanism. Strong imperative phrasing, personal anecdote, and contrarian confidence are not substitutes for a mechanism a marketer can execute on Monday.
- Self-promotion or product pitches by the guest
- Banter, anecdotes told purely for entertainment, or tangential stories that don't resolve into a transferable lesson

CONCRETE REJECTED FRAMINGS (reject any practice whose substance resembles these — do not extract variants either):
- "Expect N% of marketing to be automated; reinvent your role / shift from execution to higher-leverage work." This is a forecast wrapped in generic career advice. The 80% is a vibes number, not a measurement. "Reinvent your role" is posture, not a mechanism. Reject.
- "Marketers are better positioned than engineers in the AI era because AI produces median/average output and marketing requires creativity and taste." This is a philosophical claim about the structure of the AI era. It tells a marketer nothing about what to do on Monday. Reject.
- "Acknowledge that [macro trend] and proactively [mindset shift]." Any practice whose core imperative is acknowledge / accept / embrace / reinvent / shift into X mindset, without a specific first step, tool, metric, or procedure. Reject.

These are not exhaustive. Apply the same test to analogous framings: if the practice's "action" boils down to updating one's beliefs or self-positioning about the industry, it is posture, not a practice.

For each best practice extracted, provide:
1. practice_id: A unique slug (e.g., "ramp-70-30-budget-split")
2. title: A concise, descriptive title
3. description: 2-5 sentences capturing the specific practice with enough detail to implement
4. direct_evidence: The key quotes or paraphrased statements from the transcript that support this practice (include speaker name and approximate timestamp)
5. proposed_labels: 1-3 descriptive labels (lowercase, hyphenated slugs) that capture what marketing topic this practice is about. Use established marketing terminology where it exists. Good examples: "positioning-and-messaging", "paid-media", "ai-content-strategy", "sales-enablement", "event-marketing". Avoid over-specific or one-off labels ("drew-pinta-ramp-budget-framework" is too narrow). Prefer labels that could plausibly apply to practices from other episodes on the same topic.
6. specificity_score: Rate 1-5 how specific and implementable this practice is (1 = vague principle, 5 = step-by-step playbook). Only include practices scoring 3+.
7. guest_name: Who articulated this practice
8. guest_context: Their role/company (relevant for weighting credibility on topic)

HOST ATTRIBUTION:
Dave Gerhardt is the host of the Exit Five podcast, not a guest. When Dave articulates a practice (which he will, frequently — he is a B2B marketing practitioner and his views count as expert signal), attribute it correctly:
- guest_name: "Dave Gerhardt"
- guest_context: "Host of Exit Five podcast; former CMO"
Do NOT label Dave as "Guest on episode N" or similar. His role is host across the entire corpus, and that matters for how readers interpret his voice relative to one-off guest appearances. Capture his practices with the same rigor as any guest — same specificity threshold, same evidence requirements — but label him accurately.

LABEL GUIDANCE:
The library's taxonomy is emergent — it grows based on what practices actually appear across the corpus. You are proposing labels; a downstream curator reconciles your proposals against the existing library. Your job is to label accurately, not to predict what the curator will accept.

- Prefer broad, well-established marketing categories when they fit (e.g., "demand-generation", "content-strategy", "positioning-and-messaging")
- Use more specific labels when the practice is about something genuinely distinct that wouldn't fit under a broader category (e.g., "ai-search-optimization" for practices specifically about optimizing content for LLM-based search, rather than bundling into generic "seo")
- When a practice spans multiple topics (e.g., using AI to generate paid-media creative), tag both (["paid-media", "ai-in-marketing"])
- Do not invent labels that describe the guest, episode, or specific product/company. Labels should describe the marketing topic, not the source.

OUTPUT FORMAT: Return a JSON array of practice objects. If the episode yields no practices meeting the 3+ specificity threshold, return an empty array. Do not pad the output with marginal practices to fill space.`;

const SCHEMA_HINT = `
Each practice object MUST follow this exact JSON shape:
{
  "practice_id": "kebab-case-slug",
  "title": "string",
  "description": "string",
  "direct_evidence": [
    { "speaker": "string", "approx_timestamp": "MM:SS or H:MM:SS", "content": "quote or paraphrase" }
  ],
  "proposed_labels": ["lowercase-hyphenated-label", ...],
  "specificity_score": 3,
  "guest_name": "string",
  "guest_context": "string"
}
direct_evidence is an array of objects, not a string. proposed_labels is an array of 1-3 lowercase-hyphenated slugs. Return ONLY the JSON array.`;

function transcriptPath(dataDir: string, episodeNumber: number): string {
  return resolve(dataDir, "transcripts", `${episodeNumber}.json`);
}

function practicesPath(dataDir: string, episodeNumber: number): string {
  return resolve(dataDir, "practices", `${episodeNumber}.json`);
}

function atomicWriteJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, JSON.stringify(value, null, 2));
  renameSync(tmp, path);
}

function buildUserMessage(transcript: TranscriptFile): string {
  const header = [
    `Episode #${transcript.episode_number}: ${transcript.title}`,
    `Date: ${transcript.date}`,
    transcript.guest ? `Guest: ${transcript.guest}` : "",
    transcript.guest_title ? `Guest role: ${transcript.guest_title}` : "",
    transcript.show_notes ? `\nShow notes:\n${transcript.show_notes}` : "",
    transcript.timestamps.length ? `\nTimestamps:\n${transcript.timestamps.join("\n")}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const lines = transcript.transcript
    .map((l) => `${l.speaker} [${l.timestamp}]: ${l.text}`)
    .join("\n");
  return `${header}\n\nTranscript:\n${lines}\n${SCHEMA_HINT}`;
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

function validatePractice(p: unknown, idx: number): Practice {
  if (!p || typeof p !== "object" || Array.isArray(p)) {
    throw new Error(`Practice #${idx} is not an object`);
  }
  const r = p as Record<string, unknown>;
  const required = [
    "practice_id",
    "title",
    "description",
    "direct_evidence",
    "proposed_labels",
    "specificity_score",
    "guest_name",
    "guest_context",
  ] as const;
  for (const key of required) {
    if (!(key in r)) throw new Error(`Practice #${idx} missing field: ${key}`);
  }
  if (typeof r.specificity_score !== "number") {
    throw new Error(`Practice #${idx} specificity_score is not a number`);
  }
  if (!Array.isArray(r.proposed_labels)) {
    throw new Error(`Practice #${idx} proposed_labels is not an array`);
  }
  if (!Array.isArray(r.direct_evidence)) {
    throw new Error(`Practice #${idx} direct_evidence is not an array`);
  }
  const proposed = (r.proposed_labels as unknown[])
    .filter((v): v is string => typeof v === "string")
    .map((v) => normalizeLabel(v))
    .filter((v) => v.length > 0);
  if (proposed.length === 0) {
    throw new Error(`Practice #${idx} has no valid proposed_labels after normalization`);
  }
  return {
    practice_id: String(r.practice_id),
    title: String(r.title),
    description: String(r.description),
    direct_evidence: r.direct_evidence as Practice["direct_evidence"],
    proposed_labels: [...new Set(proposed)].slice(0, 3),
    assigned_labels: [],
    specificity_score: r.specificity_score,
    guest_name: String(r.guest_name),
    guest_context: String(r.guest_context),
  };
}

export async function runExtractor(
  episodeNumber: number,
  config: Config,
  _manifest: Manifest
): Promise<{ practicesFile: PracticesFile; path: string }> {
  const transcriptFile = resolve(transcriptPath(config.data_dir, episodeNumber));
  const transcript = JSON.parse(readFileSync(transcriptFile, "utf8")) as TranscriptFile;

  const raw = await complete({
    model: config.extraction_model,
    system: EXTRACTOR_SYSTEM_PROMPT,
    user: buildUserMessage(transcript),
    max_tokens: 16384,
    temperature: 0,
  });

  const rawPath = resolve(config.data_dir, "practices", `${episodeNumber}.raw.txt`);
  mkdirSync(dirname(rawPath), { recursive: true });
  writeFileSync(rawPath, raw);

  const parsed = extractJsonArray(raw);
  const practices: Practice[] = parsed
    .map((p, i) => validatePractice(p, i))
    .filter((p) => p.specificity_score >= config.min_specificity_score);

  const practicesFile: PracticesFile = {
    episode_number: transcript.episode_number,
    title: transcript.title,
    guest: transcript.guest,
    extraction_date: new Date().toISOString().slice(0, 10),
    extraction_model: config.extraction_model,
    practices,
  };

  const outPath = practicesPath(config.data_dir, episodeNumber);
  atomicWriteJson(outPath, practicesFile);
  return { practicesFile, path: outPath };
}
