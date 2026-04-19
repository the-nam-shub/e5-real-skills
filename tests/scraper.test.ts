import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  parseTranscriptText,
  buildFullText,
  extractShowNotes,
  extractTimestamps,
  extractGuestName,
  extractGuestTitle,
} from "../src/scraper.js";

const TRANSCRIPT = readFileSync(
  resolve(import.meta.dirname, "fixtures/transcript-346.txt"),
  "utf8"
);

const DESCRIPTION_HTML = `<p>#346 | Dave sits down with <a href="https://www.linkedin.com/in/drewpinta/">Drew Pinta</a>, Director of Growth Data at Ramp, to talk about measurement.</p><p><br><strong>Timestamps</strong></p><ul><li>(00:00) - - Intro</li><li>(04:25) - - Drew's background: from the Fed to growth data</li><li>(27:50) - - The 70/30 budget split</li></ul>`;

describe("parseTranscriptText", () => {
  it("parses Speaker [H:MM:SS]: Text format", () => {
    const lines = parseTranscriptText(TRANSCRIPT);
    expect(lines.length).toBeGreaterThan(100);
    expect(lines[0]).toEqual({
      speaker: "Dave",
      timestamp: "0:00:01",
      text: "You're listening to The Dave Gerhardt.",
    });
  });

  it("captures Drew's early lines", () => {
    const lines = parseTranscriptText(TRANSCRIPT);
    const drewFirst = lines.find((l) => l.speaker === "Drew");
    expect(drewFirst).toBeDefined();
    expect(drewFirst!.timestamp).toBe("0:02:44");
  });

  it("buildFullText joins lines with speaker prefix", () => {
    const lines = parseTranscriptText(TRANSCRIPT).slice(0, 2);
    const full = buildFullText(lines);
    expect(full).toContain("Dave: You're listening to The Dave Gerhardt.");
  });
});

describe("show notes + timestamps extraction", () => {
  it("strips HTML for show_notes", () => {
    const notes = extractShowNotes(DESCRIPTION_HTML);
    expect(notes).toContain("Drew Pinta");
    expect(notes).toContain("Director of Growth Data at Ramp");
    expect(notes).not.toContain("<a");
  });

  it("extracts (HH:MM) - Label items", () => {
    const ts = extractTimestamps(DESCRIPTION_HTML);
    expect(ts).toHaveLength(3);
    expect(ts[0]).toMatch(/^\(00:00\)/);
    expect(ts[2]).toContain("70/30 budget split");
  });
});

describe("guest extraction", () => {
  it("parses 'with <name>' at end of title", () => {
    expect(
      extractGuestName(
        "Inside Ramp's Marketing: Creative Bets, Measurement, and AI Agents (with Drew Pinta)"
      )
    ).toBe("Drew Pinta");
  });

  it("returns empty string when no pattern", () => {
    expect(extractGuestName("Solo episode with Dave")).toBe("");
  });

  it("extracts guest title from description text", () => {
    const desc = extractShowNotes(DESCRIPTION_HTML);
    const title = extractGuestTitle(desc, "Drew Pinta");
    expect(title.toLowerCase()).toContain("director of growth data at ramp");
  });
});
