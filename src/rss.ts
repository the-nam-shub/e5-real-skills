import Parser from "rss-parser";
import type { ManifestEpisode } from "./types.js";
import { episodeUrlFromTitle } from "./slug.js";

interface RssItem {
  title?: string;
  pubDate?: string;
  isoDate?: string;
  guid?: string;
  link?: string;
  content?: string;
  contentSnippet?: string;
  "content:encoded"?: string;
  itunes?: {
    episode?: string;
    summary?: string;
  };
}

export interface RssEpisode {
  episode: ManifestEpisode;
  transcript_url: string | null;
  description_html: string;
}

interface ExtendedFeedItem extends RssItem {
  podcast_transcript_url?: string;
}

const EPISODE_NUMBER_PATTERNS = [
  /#(\d{1,4})\b/,
  /^\s*(\d{1,4})[\s:–-]/,
  /\bepisode\s+(\d{1,4})\b/i,
  /\bep\.?\s*(\d{1,4})\b/i,
];

export function extractEpisodeNumber(item: RssItem): number | null {
  const fromTag = item.itunes?.episode;
  if (fromTag && /^\d+$/.test(fromTag.trim())) {
    return Number(fromTag.trim());
  }
  const title = item.title ?? "";
  for (const re of EPISODE_NUMBER_PATTERNS) {
    const m = title.match(re);
    if (m && m[1]) return Number(m[1]);
  }
  return null;
}

export function isoDate(item: RssItem): string {
  if (item.isoDate) return item.isoDate.slice(0, 10);
  if (item.pubDate) {
    const d = new Date(item.pubDate);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }
  return "";
}

function extractPodcastTranscriptUrl(rawXml: string, guid: string): string | null {
  if (!guid) return null;
  // Find the <item> block containing this guid, then look inside it for podcast:transcript
  const guidEsc = guid.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  const itemRe = new RegExp(
    `<item>([\\s\\S]*?<guid[^>]*>${guidEsc}</guid>[\\s\\S]*?)</item>`,
    "i"
  );
  const m = rawXml.match(itemRe);
  if (!m) return null;
  const block = m[1] ?? "";
  const txMatch = block.match(/<podcast:transcript[^>]*url="([^"]+)"[^>]*>/i);
  return txMatch?.[1] ?? null;
}

// Feed items whose titles match these patterns are promo/hiring/announcement
// posts that Transistor sometimes tags with a duplicate itunes:episode number.
// They are not main podcast episodes and should be skipped before they enter
// the manifest. See rss.test.ts for cases.
const NON_EPISODE_TITLE_PATTERNS: RegExp[] = [
  /^we'?re hiring\b/i,
  /^announcing\b/i,
  /^new from exit five:/i,
];

export function isNonEpisodeTitle(title: string): boolean {
  return NON_EPISODE_TITLE_PATTERNS.some((re) => re.test(title));
}

export function rssItemToEpisode(
  item: RssItem,
  baseEpisodeUrl: string
): ManifestEpisode | null {
  const title = (item.title ?? "").trim();
  if (!title) return null;
  if (isNonEpisodeTitle(title)) return null;
  const episodeNumber = extractEpisodeNumber(item);
  if (episodeNumber === null) return null;
  const episodeUrl = episodeUrlFromTitle(baseEpisodeUrl, title);
  return {
    episode_number: episodeNumber,
    title,
    date: isoDate(item),
    rss_guid: item.guid ?? "",
    episode_url: episodeUrl,
    status: "new",
  };
}

export async function parseRssXml(
  xml: string,
  baseEpisodeUrl: string
): Promise<RssEpisode[]> {
  const parser = new Parser<unknown, ExtendedFeedItem>({
    customFields: {
      item: [
        ["podcast:transcript", "podcast_transcript_url", { keepArray: false }],
      ],
    },
  });
  const feed = await parser.parseString(xml);
  const out: RssEpisode[] = [];
  for (const raw of feed.items as ExtendedFeedItem[]) {
    const episode = rssItemToEpisode(raw, baseEpisodeUrl);
    if (!episode) continue;
    // rss-parser returns attribute-only elements as { $: { url: ... } } or the attribute value
    // depending on parser quirks. Be defensive and fall back to raw regex.
    let transcriptUrl: string | null = null;
    const tx = (raw as unknown as { podcast_transcript_url?: unknown }).podcast_transcript_url;
    if (typeof tx === "string") transcriptUrl = tx;
    else if (tx && typeof tx === "object" && "$" in (tx as object)) {
      const dollar = (tx as { $?: { url?: string } }).$;
      if (dollar?.url) transcriptUrl = dollar.url;
    }
    if (!transcriptUrl) {
      transcriptUrl = extractPodcastTranscriptUrl(xml, episode.rss_guid);
    }
    const description =
      raw["content:encoded"] ?? raw.content ?? raw.itunes?.summary ?? "";
    out.push({ episode, transcript_url: transcriptUrl, description_html: description });
  }
  return out;
}

export async function fetchRssEpisodes(
  rssUrl: string,
  baseEpisodeUrl: string
): Promise<RssEpisode[]> {
  const res = await fetch(rssUrl);
  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status} ${res.statusText}`);
  const xml = await res.text();
  return parseRssXml(xml, baseEpisodeUrl);
}
