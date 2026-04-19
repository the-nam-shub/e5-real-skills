import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { parseRssXml, extractEpisodeNumber } from "../src/rss.js";

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
