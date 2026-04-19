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

WHAT COUNTS AS A BEST PRACTICE:
- A specific technique, framework, process, or approach that a marketer could implement
- Must include enough detail that someone could act on it without needing to listen to the episode
- Must come directly from what the guest or host said - not inferred or extrapolated
- Includes: specific metrics/benchmarks shared, named frameworks, step-by-step processes described, specific tools/channels recommended with context on how to use them, contrarian positions backed by evidence or experience

WHAT DOES NOT COUNT:
- Generic advice ("know your audience", "be authentic", "test and iterate")
- Opinions without supporting reasoning or evidence
- Observations about industry trends without actionable implications
- Self-promotion or product pitches by the guest
- Banter, anecdotes told purely for entertainment, or tangential stories that don't resolve into a transferable lesson

For each best practice extracted, provide:
1. practice_id: A unique slug (e.g., "ramp-70-30-budget-split")
2. title: A concise, descriptive title
3. description: 2-5 sentences capturing the specific practice with enough detail to implement
4. direct_evidence: The key quotes or paraphrased statements from the transcript that support this practice (include speaker name and approximate timestamp)
5. categories: 1-3 category tags from the taxonomy (see below)
6. specificity_score: Rate 1-5 how specific and implementable this practice is (1 = vague principle, 5 = step-by-step playbook). Only include practices scoring 3+.
7. guest_name: Who articulated this practice
8. guest_context: Their role/company (relevant for weighting credibility on topic)

CATEGORY TAXONOMY:
- positioning-and-messaging
- content-strategy
- demand-generation
- paid-media
- linkedin-marketing
- email-marketing
- website-optimization
- abm-account-based-marketing
- sales-marketing-alignment
- marketing-measurement
- brand-building
- product-marketing
- marketing-leadership
- career-development
- marketing-operations
- outbound-and-prospecting
- events-and-community
- ai-in-marketing
- creative-and-design
- customer-marketing

If a practice doesn't fit cleanly into any existing category, tag it as "uncategorized" for manual review. Do NOT invent new categories. The taxonomy is intentionally fixed to keep the skill library curated — adding new categories is a manual decision, not an extraction-time one.

OUTPUT FORMAT: Return a JSON array of practice objects. If the episode yields no practices meeting the 3+ specificity threshold, return an empty array. Do not pad the output with marginal practices to fill space.`;

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

const SCHEMA_HINT = `
Each practice object MUST follow this exact JSON shape:
{
  "practice_id": "kebab-case-slug",
  "title": "string",
  "description": "string",
  "direct_evidence": [
    { "speaker": "string", "approx_timestamp": "MM:SS or H:MM:SS", "content": "quote or paraphrase" }
  ],
  "categories": ["category-slug", ...],
  "specificity_score": 3,
  "guest_name": "string",
  "guest_context": "string"
}
direct_evidence is an array of objects, not a string. Return ONLY the JSON array.`;

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

function validatePractice(p: unknown, idx: number): Practice {
  if (!p || typeof p !== "object" || Array.isArray(p)) {
    throw new Error(`Practice #${idx} is not an object`);
  }
  const r = p as Record<string, unknown>;
  const required: Array<keyof Practice> = [
    "practice_id",
    "title",
    "description",
    "direct_evidence",
    "categories",
    "specificity_score",
    "guest_name",
    "guest_context",
  ];
  for (const key of required) {
    if (!(key in r)) throw new Error(`Practice #${idx} missing field: ${key}`);
  }
  if (typeof r.specificity_score !== "number") {
    throw new Error(`Practice #${idx} specificity_score is not a number`);
  }
  if (!Array.isArray(r.categories)) {
    throw new Error(`Practice #${idx} categories is not an array`);
  }
  if (!Array.isArray(r.direct_evidence)) {
    throw new Error(`Practice #${idx} direct_evidence is not an array`);
  }
  return r as unknown as Practice;
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
    max_tokens: 8192,
    temperature: 0,
  });

  // Persist the raw model response for debuggability.
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
