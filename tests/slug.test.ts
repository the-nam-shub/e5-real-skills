import { describe, expect, it } from "vitest";
import { slugify, episodeUrlFromTitle } from "../src/slug.js";

describe("slugify", () => {
  it("lowercases, strips punctuation, hyphenates", () => {
    expect(
      slugify(
        "Inside Ramp's Marketing: Creative Bets, Measurement, and AI Agents (with Drew Pinta)"
      )
    ).toBe(
      "inside-ramps-marketing-creative-bets-measurement-and-ai-agents-with-drew-pinta"
    );
  });

  it("collapses multiple spaces and punctuation runs", () => {
    expect(slugify("Hello,   World!!!")).toBe("hello-world");
  });

  it("trims leading/trailing hyphens", () => {
    expect(slugify("-- weird --")).toBe("weird");
  });
});

describe("episodeUrlFromTitle", () => {
  it("joins base and slug", () => {
    expect(
      episodeUrlFromTitle(
        "https://exitfive.com/podcast",
        "Inside Ramp's Marketing: Creative Bets, Measurement, and AI Agents (with Drew Pinta)"
      )
    ).toBe(
      "https://exitfive.com/podcast/inside-ramps-marketing-creative-bets-measurement-and-ai-agents-with-drew-pinta"
    );
  });
});
