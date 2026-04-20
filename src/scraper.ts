import * as cheerio from "cheerio";
import type { RssEpisode } from "./rss.js";
import type { TranscriptFile, TranscriptLine } from "./types.js";

// Transistor emits transcripts in at least three line layouts we've observed
// across the Exit Five archive. Each regex captures speaker (group 1),
// timestamp (group 2), and optional same-line text (group 3).
//
//  A: "Speaker [H:MM:SS]: Text"           - recent (2024-2026 episodes)
//  B: "Speaker [H:MM:SS]:" then \n then "Text..." - mid-era; dialogue on next line(s)
//  C: "Speaker: [H:MM:SS] Text"            - older episodes; colon precedes timestamp
//
// Pattern A and B share the same header regex — B just has an empty text capture.
const LINE_RE_A_OR_B = /^([A-Za-z][A-Za-z0-9 .'-]*?)\s*\[(\d{1,2}:\d{2}:\d{2})\]:\s*(.*)$/;
const LINE_RE_C = /^([A-Za-z][A-Za-z0-9 .'-]*?):\s*\[(\d{1,2}:\d{2}:\d{2})\]\s*(.*)$/;

interface PartialLine {
  speaker: string;
  timestamp: string;
  textParts: string[];
}

function commit(lines: TranscriptLine[], partial: PartialLine | null): void {
  if (!partial) return;
  const text = partial.textParts.join(" ").replace(/\s+/g, " ").trim();
  if (text.length === 0) return;
  lines.push({ speaker: partial.speaker, timestamp: partial.timestamp, text });
}

export function parseTranscriptText(text: string): TranscriptLine[] {
  const lines: TranscriptLine[] = [];
  let current: PartialLine | null = null;
  for (const raw of text.split(/\r?\n/)) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const m = trimmed.match(LINE_RE_A_OR_B) ?? trimmed.match(LINE_RE_C);
    if (m) {
      // Start of a new speaker block: commit any in-progress block first.
      commit(lines, current);
      const sameLineText = (m[3] ?? "").trim();
      current = {
        speaker: m[1]!.trim(),
        timestamp: m[2]!,
        textParts: sameLineText ? [sameLineText] : [],
      };
    } else if (current) {
      // Continuation line: append to the current block's text.
      current.textParts.push(trimmed);
    }
    // Lines that don't match a header and have no current block (e.g., the
    // stray "Peep\n===" prefix seen on some old transcripts) are silently
    // dropped.
  }
  commit(lines, current);
  return lines;
}

export function buildFullText(lines: TranscriptLine[]): string {
  return lines.map((l) => `${l.speaker}: ${l.text}`).join(" ");
}

export function extractShowNotes(descriptionHtml: string): string {
  if (!descriptionHtml) return "";
  const $ = cheerio.load(descriptionHtml);
  const text = $.root().text().replace(/\s+/g, " ").trim();
  return text;
}

export function extractTimestamps(descriptionHtml: string): string[] {
  if (!descriptionHtml) return [];
  const $ = cheerio.load(descriptionHtml);
  const items: string[] = [];
  $("li").each((_, el) => {
    const t = $(el).text().replace(/\s+/g, " ").trim();
    if (/^\(\d{1,2}:\d{2}(:\d{2})?\)/.test(t)) {
      items.push(t.replace(/\s*-\s*-\s*/, " - "));
    }
  });
  return items;
}

export function extractGuestName(title: string): string {
  const m = title.match(/\bwith\s+([^)]+?)\s*\)\s*$/i);
  if (m && m[1]) return m[1].trim();
  const alt = title.match(/\(with\s+([^)]+?)\)/i);
  if (alt && alt[1]) return alt[1].trim();
  return "";
}

export function extractGuestTitle(descriptionText: string, guestName: string): string {
  if (!guestName || !descriptionText) return "";
  const escaped = guestName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  // Match: "<name>, <title>" or "<name>  <role>" following the name.
  const re = new RegExp(`${escaped}[^.,]{0,3}[,\\-]\\s*([^.]+?)(?:\\.|\\s*$)`, "i");
  const m = descriptionText.match(re);
  if (m && m[1]) {
    const candidate = m[1].trim();
    // Heuristic: role strings usually contain "at", or capitalized role words
    if (/\b(at|of|for)\b/i.test(candidate) || /^[A-Z]/.test(candidate)) {
      return candidate.replace(/\s+/g, " ").slice(0, 200);
    }
  }
  return "";
}

export async function fetchTranscriptText(transcriptUrl: string): Promise<string> {
  const res = await fetch(transcriptUrl);
  if (!res.ok) {
    throw new Error(`Transcript fetch failed: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

export async function scrapeEpisode(item: RssEpisode): Promise<TranscriptFile> {
  const { episode, transcript_url, description_html } = item;
  if (!transcript_url) {
    throw new Error("no_transcript");
  }
  const raw = await fetchTranscriptText(transcript_url);
  const transcript = parseTranscriptText(raw);
  if (transcript.length === 0) {
    throw new Error("no_transcript");
  }
  const show_notes = extractShowNotes(description_html);
  const timestamps = extractTimestamps(description_html);
  const guest = extractGuestName(episode.title);
  const guest_title = extractGuestTitle(show_notes, guest);
  return {
    episode_number: episode.episode_number,
    title: episode.title,
    date: episode.date,
    guest,
    guest_title,
    episode_url: episode.episode_url,
    show_notes,
    timestamps,
    transcript,
    full_text: buildFullText(transcript),
  };
}

export async function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
