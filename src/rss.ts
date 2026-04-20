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
    // Self-closing <podcast:transcript url="..." type="text/plain"/> tags show up
    // on rss-parser's customFields path as { $: { url, type } }. Only treat the
    // item as having a transcript when that shape is present. If the tag is
    // missing entirely, leave transcript_url null — the scraper will mark the
    // episode no_transcript and skip. Do NOT fall back to any cross-item regex
    // search; that previously assigned a nearby item's transcript URL to items
    // that had no tag, silently producing garbage extractions.
    let transcriptUrl: string | null = null;
    const tx = (raw as unknown as { podcast_transcript_url?: unknown }).podcast_transcript_url;
    if (typeof tx === "string" && tx.startsWith("http")) {
      transcriptUrl = tx;
    } else if (tx && typeof tx === "object" && "$" in (tx as object)) {
      const dollar = (tx as { $?: { url?: string } }).$;
      if (dollar?.url && dollar.url.startsWith("http")) transcriptUrl = dollar.url;
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
