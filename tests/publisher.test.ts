import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  renderReadme,
  __testing,
  collectSkillRows,
  collectDisagreementRows,
} from "../src/publisher.js";

const REPO_ROOT = resolve(import.meta.dirname, "..");
const GITIGNORE = readFileSync(resolve(REPO_ROOT, ".gitignore"), "utf8");

describe(".gitignore protection", () => {
  function isIgnored(entry: string): boolean {
    // An entry is considered ignored if the gitignore literally lists it,
    // or if a parent directory entry covers it.
    const lines = GITIGNORE.split("\n").map((l) => l.trim()).filter(Boolean);
    for (const line of lines) {
      if (line === entry) return true;
      // Directory entry covers descendants: `data/` covers `data/manifest.json`.
      if (line.endsWith("/") && entry.startsWith(line)) return true;
    }
    return false;
  }

  it("protects every secret/local-only path required by the spec", () => {
    for (const entry of [
      ".env",
      "node_modules/",
      "data/transcripts/",
      "data/practices/",
      "data/reviews/",
      "data/manifest.json",
      "data/category_index.json",
    ]) {
      expect(isIgnored(entry), `gitignore missing coverage for ${entry}`).toBe(true);
    }
  });

  it("does not ignore the public output directories", () => {
    const lines = GITIGNORE.split("\n").map((l) => l.trim());
    for (const publicPath of ["skills/", "disagreements/", "episode-analyses/", "README.md"]) {
      expect(lines).not.toContain(publicPath);
    }
  });
});

describe("humanCategory", () => {
  it("converts kebab-case to Title Case", () => {
    expect(__testing.humanCategory("marketing-measurement")).toBe("Marketing Measurement");
    expect(__testing.humanCategory("ai-in-marketing")).toBe("Ai In Marketing");
    expect(__testing.humanCategory("abm-account-based-marketing")).toBe(
      "Abm Account Based Marketing"
    );
  });
});

describe("renderSkillsTable", () => {
  it("renders a byte-stable table from rows", () => {
    const out = __testing.renderSkillsTable([
      {
        category: "ai-in-marketing",
        practice_count: 43,
        episode_count: 4,
        last_updated: "2026-04-19",
      },
      {
        category: "marketing-measurement",
        practice_count: 18,
        episode_count: 4,
        last_updated: "2026-04-18",
      },
    ]);
    expect(out).toContain("| Skill | Practices | Episodes | Last Updated |");
    expect(out).toContain("[Ai In Marketing](./skills/ai-in-marketing/SKILL.md)");
    expect(out).toContain("| 43 | 4 | 2026-04-19 |");
    expect(out).toContain("[Marketing Measurement](./skills/marketing-measurement/SKILL.md)");
  });

  it("returns a placeholder when there are no skills", () => {
    expect(__testing.renderSkillsTable([])).toContain("No skills compiled yet");
  });
});

describe("renderDisagreementsTable", () => {
  it("renders a table with category and support columns", () => {
    const out = __testing.renderDisagreementsTable([
      {
        title: "Will AI replace or enable marketers?",
        category: "ai-in-marketing",
        support_summary: "1 vs 1",
        total_supporters: 2,
        margin: 0,
      },
    ]);
    expect(out).toContain("| Debate | Category | Support |");
    expect(out).toContain("| Will AI replace or enable marketers? | Ai In Marketing | 1 vs 1 |");
  });

  it("returns a placeholder when no disagreements exist", () => {
    expect(__testing.renderDisagreementsTable([])).toContain(
      "No disagreements surfaced yet"
    );
  });
});

describe("renderReadme", () => {
  it("includes every expected section heading", () => {
    const md = renderReadme({
      skillRows: [
        {
          category: "ai-in-marketing",
          practice_count: 43,
          episode_count: 4,
          last_updated: "2026-04-19",
        },
      ],
      disagreementRows: [
        {
          title: "X?",
          category: "ai-in-marketing",
          support_summary: "3 vs 1",
          total_supporters: 4,
          margin: 2,
        },
      ],
      featuredDebateCount: 5,
    });
    expect(md).toMatch(/^# Exit Five B2B Marketing Skills for Claude/);
    expect(md).toContain("## How to Use");
    expect(md).toContain("## Available Skills");
    expect(md).toContain("## Where the Experts Disagree");
    expect(md).toContain("## Per-Episode Analysis");
    expect(md).toContain("## How It Works");
    expect(md).toContain("## Attribution");
    // Deterministic content: skill row appears
    expect(md).toContain("[Ai In Marketing](./skills/ai-in-marketing/SKILL.md)");
    // Featured debates link appears
    expect(md).toContain("[`FEATURED_DEBATES.md`](./FEATURED_DEBATES.md)");
    expect(md).toContain("**5 notable debates**");
  });

  it("produces byte-stable output for the same inputs", () => {
    const inputs = {
      skillRows: [
        {
          category: "a",
          practice_count: 1,
          episode_count: 1,
          last_updated: "2026-01-01",
        },
      ],
      disagreementRows: [],
      featuredDebateCount: 0,
    };
    expect(renderReadme(inputs)).toBe(renderReadme(inputs));
  });
});

describe("buildCommitMessage", () => {
  it("produces a single-episode message with title", () => {
    expect(
      __testing.buildCommitMessage([
        {
          episode_number: 346,
          title: "Inside Ramp",
          date: "2026-04-13",
          rss_guid: "g",
          episode_url: "u",
          status: "processed",
        },
      ])
    ).toBe("Update skills from Episode #346 (Inside Ramp)");
  });

  it("produces a multi-episode message sorted desc", () => {
    const msg = __testing.buildCommitMessage([
      {
        episode_number: 341,
        title: "a",
        date: "",
        rss_guid: "",
        episode_url: "",
        status: "processed",
      },
      {
        episode_number: 346,
        title: "b",
        date: "",
        rss_guid: "",
        episode_url: "",
        status: "processed",
      },
      {
        episode_number: 345,
        title: "c",
        date: "",
        rss_guid: "",
        episode_url: "",
        status: "processed",
      },
    ]);
    expect(msg).toBe("Update skills from new Exit Five episodes: #346, #345, #341");
  });

  it("handles an empty episode list", () => {
    expect(__testing.buildCommitMessage([])).toBe("Update skills inventory");
  });
});

describe("collectSkillRows (filesystem-backed)", () => {
  it("returns an empty array when skills dir does not exist", () => {
    expect(
      collectSkillRows(resolve(REPO_ROOT, ".does-not-exist"), {
        categories: {},
        last_updated: "",
      })
    ).toEqual([]);
  });
});

describe("collectDisagreementRows (filesystem-backed)", () => {
  it("returns an empty array when disagreements dir does not exist", () => {
    expect(collectDisagreementRows(resolve(REPO_ROOT, ".does-not-exist"))).toEqual(
      []
    );
  });
});
