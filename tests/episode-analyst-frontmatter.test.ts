import { describe, expect, it } from "vitest";
import { parse as parseYaml } from "yaml";
import {
  assembleMarkdown,
  buildFrontmatter,
  validateAnalysisBody,
  validateAssembledFile,
} from "../src/agents/episode-analyst.js";
import type { EpisodeDiff } from "../src/skill-diff.js";
import type { Practice, TranscriptFile } from "../src/types.js";

function practice(id: string, guest: string, context: string): Practice {
  return {
    practice_id: id,
    title: id,
    description: id,
    direct_evidence: [],
    categories: [],
    specificity_score: 4,
    guest_name: guest,
    guest_context: context,
  };
}

function transcript(overrides: Partial<TranscriptFile> = {}): TranscriptFile {
  return {
    episode_number: 346,
    title: "Inside Ramp's Marketing",
    date: "2026-04-13",
    guest: "Drew Pinta",
    guest_title: "Director of Growth Data at Ramp",
    episode_url: "https://exitfive.com/podcast/inside-ramps-marketing",
    show_notes: "",
    timestamps: [],
    transcript: [],
    full_text: "",
    ...overrides,
  };
}

function diff(overrides: Partial<EpisodeDiff> = {}): EpisodeDiff {
  return {
    episode_number: 346,
    skills_updated: [],
    new_disagreements: [],
    reinforced_disagreements: [],
    ...overrides,
  };
}

describe("buildFrontmatter", () => {
  it("produces a complete, sorted skills_updated list", () => {
    const fm = buildFrontmatter(
      transcript(),
      diff({
        skills_updated: [
          {
            category: "marketing-measurement",
            added_practices: [practice("p1", "Drew", "Ramp")],
            total_practices_in_category: 18,
            skill_file_exists: true,
          },
          {
            category: "ai-in-marketing",
            added_practices: [practice("p2", "Drew", "Ramp")],
            total_practices_in_category: 43,
            skill_file_exists: true,
          },
          {
            category: "career-development",
            added_practices: [practice("p3", "Drew", "Ramp")],
            total_practices_in_category: 1,
            skill_file_exists: false,
          },
        ],
      })
    );
    // career-development skipped because no SKILL.md exists
    expect(fm.skills_updated).toEqual(["ai-in-marketing", "marketing-measurement"]);
    expect(fm.new_practices_count).toBe(3);
  });

  it("sanitizes garbage guest names by deriving from practices", () => {
    const fm = buildFrontmatter(
      transcript({ guest: "AI (That's Not Slop!" }),
      diff({
        skills_updated: [
          {
            category: "ai-in-marketing",
            added_practices: [
              practice("a", "Adina Timar", "Content strategist"),
              practice("b", "Adina Timar", "Content strategist"),
              practice("c", "Eoin Clancy", "SEO lead"),
            ],
            total_practices_in_category: 3,
            skill_file_exists: false,
          },
        ],
      })
    );
    expect(fm.guest).toBe("Adina Timar");
  });

  it("returns 'multiple guests' when no single guest dominates", () => {
    const fm = buildFrontmatter(
      transcript({ guest: "" }),
      diff({
        skills_updated: [
          {
            category: "demand-generation",
            added_practices: [
              practice("a", "Jeremy Chung", "demand-gen marketer"),
              practice("b", "Meesh", "demand-gen marketer"),
              practice("c", "Kayti Sullivan", "demand-gen marketer"),
              practice("d", "Malak Saleh", "demand-gen marketer"),
              practice("e", "Chris", "demand-gen marketer"),
            ],
            total_practices_in_category: 5,
            skill_file_exists: false,
          },
        ],
      })
    );
    expect(fm.guest).toBe("multiple guests");
  });

  it("excludes Dave Gerhardt from guest-derivation fallback", () => {
    const fm = buildFrontmatter(
      transcript({ guest: "AI!" }),
      diff({
        skills_updated: [
          {
            category: "ai-in-marketing",
            added_practices: [
              practice("a", "Dave Gerhardt", "Host of Exit Five podcast; former CMO"),
              practice("b", "Dave Gerhardt", "Host of Exit Five podcast; former CMO"),
              practice("c", "Adina Timar", "Content strategist"),
            ],
            total_practices_in_category: 3,
            skill_file_exists: false,
          },
        ],
      })
    );
    expect(fm.guest).toBe("Adina Timar");
  });

  it("counts new_practices_count uniquely even when a practice spans multiple categories", () => {
    const shared = practice("shared", "Drew", "Ramp");
    const fm = buildFrontmatter(
      transcript(),
      diff({
        skills_updated: [
          {
            category: "a",
            added_practices: [shared, practice("p1", "Drew", "Ramp")],
            total_practices_in_category: 2,
            skill_file_exists: false,
          },
          {
            category: "b",
            added_practices: [shared, practice("p2", "Drew", "Ramp")],
            total_practices_in_category: 2,
            skill_file_exists: false,
          },
        ],
      })
    );
    // shared is counted once: p1, p2, shared → 3 unique
    expect(fm.new_practices_count).toBe(3);
  });
});

describe("validateAnalysisBody", () => {
  it("rejects an em dash anywhere in the body", () => {
    const body = "# Episode #346: Drew on measurement\n\nThis has an em \u2014 dash.";
    expect(() => validateAnalysisBody(body, 346)).toThrow(/em dash/);
  });

  it("rejects bodies over 1000 words", () => {
    // Heading contributes 5 alphanumeric words; add 1100 more to clearly exceed 1000.
    const body =
      "# Episode #346: Drew on measurement\n\n" + "word ".repeat(1100).trim();
    expect(() => validateAnalysisBody(body, 346)).toThrow(/1105 words/);
  });

  it("accepts a body just under the 1000-word limit", () => {
    const body =
      "# Episode #346: Drew on measurement\n\n" + "word ".repeat(950).trim();
    expect(() => validateAnalysisBody(body, 346)).not.toThrow();
  });

  it("rejects a body that contains a '## Verdict' heading", () => {
    const body =
      "# Episode #346: Drew on measurement\n\n" +
      "short prose\n\n" +
      "## Verdict\n\nincremental";
    expect(() => validateAnalysisBody(body, 346)).toThrow(/Verdict/);
  });

  it("requires the body to begin with '# Episode #' heading", () => {
    expect(() => validateAnalysisBody("## Oops\nbody", 346)).toThrow(/Episode #/);
  });

  it("accepts a clean body under 500 words", () => {
    const body =
      "# Episode #346: Drew on measurement\n\n" +
      "short analytical prose. ".repeat(50);
    expect(() => validateAnalysisBody(body, 346)).not.toThrow();
  });
});

describe("assembleMarkdown + validateAssembledFile", () => {
  it("produces valid YAML frontmatter that round-trips", () => {
    const fm = buildFrontmatter(
      transcript(),
      diff({
        skills_updated: [
          {
            category: "ai-in-marketing",
            added_practices: [practice("p1", "Drew", "Ramp")],
            total_practices_in_category: 1,
            skill_file_exists: true,
          },
        ],
      })
    );
    const assembled = assembleMarkdown(fm, "# Episode #346: Drew on AI\n\nBody.");
    validateAssembledFile(assembled, 346);
    const [, yamlBlock] = assembled.match(/^---\n([\s\S]*?)\n---/)!;
    const parsed = parseYaml(yamlBlock!) as Record<string, unknown>;
    expect(parsed.episode_number).toBe(346);
    expect(parsed.title).toBe("Inside Ramp's Marketing");
    expect(parsed.skills_updated).toEqual(["ai-in-marketing"]);
    expect(parsed.new_practices_count).toBe(1);
    expect(parsed.new_disagreements).toBe(0);
    expect(parsed.reinforced_disagreements).toBe(0);
    expect(parsed.episode_url).toBe(
      "https://exitfive.com/podcast/inside-ramps-marketing"
    );
  });

  it("fails validation when the frontmatter is missing", () => {
    expect(() =>
      validateAssembledFile("# Heading\nno frontmatter", 346)
    ).toThrow(/missing frontmatter/);
  });
});
