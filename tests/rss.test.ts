import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { parseRssXml, extractEpisodeNumber, isNonEpisodeTitle } from "../src/rss.js";

const FIXTURE = readFileSync(resolve(import.meta.dirname, "fixtures/rss.xml"), "utf8");

describe("parseRssXml", () => {
  it("parses all episodes from the fixture", async () => {
    const eps = await parseRssXml(FIXTURE, "https://exitfive.com/podcast");
    expect(eps.length).toBeGreaterThan(300);
  });

  it("finds episode 346 with the correct metadata", async () => {
    const eps = await parseRssXml(FIXTURE, "https://exitfive.com/podcast");
    const ep346 = eps.find((e) => e.episode.episode_number === 346);
    expect(ep346).toBeDefined();
    expect(ep346!.episode.title).toContain("Drew Pinta");
    expect(ep346!.episode.rss_guid).toBe("9c59b8e3-454a-4bef-8c1f-6c4658daff65");
    expect(ep346!.episode.date).toBe("2026-04-13");
    expect(ep346!.episode.episode_url).toBe(
      "https://exitfive.com/podcast/inside-ramps-marketing-creative-bets-measurement-and-ai-agents-with-drew-pinta"
    );
    expect(ep346!.transcript_url).toBe(
      "https://share.transistor.fm/s/1677f657/transcript.txt"
    );
    expect(ep346!.description_html).toContain("Drew Pinta");
  });
});

describe("extractEpisodeNumber", () => {
  it("prefers itunes:episode when present", () => {
    expect(extractEpisodeNumber({ itunes: { episode: "346" }, title: "anything" })).toBe(346);
  });

  it("falls back to #NNN pattern in title", () => {
    expect(extractEpisodeNumber({ title: "Some Episode #142 - whatever" })).toBe(142);
  });

  it("returns null when unparsable", () => {
    expect(extractEpisodeNumber({ title: "An episode with no number" })).toBeNull();
  });
});

describe("isNonEpisodeTitle", () => {
  it("flags hiring posts", () => {
    expect(isNonEpisodeTitle("We're Hiring for Content Marketing at Exit Five (Details Here)")).toBe(true);
  });

  it("flags announcement posts", () => {
    expect(isNonEpisodeTitle("Announcing the Ultimate Roast of B2B Websites")).toBe(true);
  });

  it("flags 'new from exit five' promo posts", () => {
    expect(isNonEpisodeTitle("New from Exit Five: Announcing the Ultimate Roast of B2B Websites")).toBe(true);
  });

  it("does NOT flag regular main episodes with guests in parens", () => {
    expect(
      isNonEpisodeTitle(
        "Inside Ramp's Marketing: Creative Bets, Measurement, and AI Agents (with Drew Pinta)"
      )
    ).toBe(false);
  });

  it("does NOT flag episodes that happen to mention 'announcing' mid-title", () => {
    expect(isNonEpisodeTitle("#200: How We Ran a Big Announcement Campaign")).toBe(false);
  });
});

describe("parseRssXml drops non-episode promo items", () => {
  const promoXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Test</title>
    <item>
      <title>#200: Real Episode on LinkedIn Ads</title>
      <itunes:episode>200</itunes:episode>
      <guid>real-200</guid>
      <pubDate>Mon, 01 Jan 2024 00:00:00 +0000</pubDate>
    </item>
    <item>
      <title>We're Hiring for Content Marketing at Exit Five</title>
      <itunes:episode>201</itunes:episode>
      <guid>hiring-201</guid>
      <pubDate>Mon, 02 Jan 2024 00:00:00 +0000</pubDate>
    </item>
    <item>
      <title>Announcing the Ultimate Roast of B2B Websites</title>
      <itunes:episode>202</itunes:episode>
      <guid>announce-202</guid>
      <pubDate>Mon, 03 Jan 2024 00:00:00 +0000</pubDate>
    </item>
  </channel>
</rss>`;

  it("returns only the real episode, skipping promo items", async () => {
    const result = await parseRssXml(promoXml, "https://exitfive.com/podcast");
    expect(result).toHaveLength(1);
    expect(result[0]!.episode.episode_number).toBe(200);
    expect(result[0]!.episode.title).toContain("Real Episode");
  });
});
