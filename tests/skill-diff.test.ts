import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { computeEpisodeDiff } from "../src/skill-diff.js";
import type {
  CategoryIndex,
  Disagreement,
  DisagreementsFile,
  Practice,
  PracticesFile,
} from "../src/types.js";

function practice(
  id: string,
  labels: string[],
  guest: string,
  score = 4
): Practice {
  return {
    practice_id: id,
    title: `Title ${id}`,
    description: `Description ${id}`,
    direct_evidence: [
      { speaker: guest, approx_timestamp: "10:00", content: "quote" },
    ],
    proposed_labels: labels,
    assigned_labels: labels,
    specificity_score: score,
    guest_name: guest,
    guest_context: `${guest} context`,
  };
}

function practicesFile(
  n: number,
  practices: Practice[]
): PracticesFile {
  return {
    episode_number: n,
    title: `Episode ${n}`,
    guest: practices[0]?.guest_name ?? "",
    extraction_date: "2026-04-19",
    extraction_model: "claude-haiku-4-5-20251001",
    practices,
  };
}

function emptyIndex(): CategoryIndex {
  return { categories: {}, last_updated: "" };
}

function disagreementFile(cat: string, disagreements: Disagreement[]): DisagreementsFile {
  return {
    category: cat,
    analysis_date: "2026-04-19",
    analysis_model: "claude-sonnet-4-6",
    analysis_runs: 2,
    filtered_count: 0,
    disagreements,
  };
}

function disagreement(
  id: string,
  positions: Array<{
    id: string;
    supporters: Array<{ guest: string; practice: string; ep: number }>;
  }>
): Disagreement {
  return {
    disagreement_id: id,
    title: `Title ${id}`,
    category: "c",
    positions: positions.map((p) => ({
      position_id: p.id,
      stance: `stance ${p.id}`,
      supporters: p.supporters.map((s) => ({
        guest_name: s.guest,
        guest_context: "role",
        episode_number: s.ep,
        episode_date: "2026-01-01",
        evidence: "e",
        practice_id: s.practice,
      })),
    })),
    support_summary: "",
    context_dependency: "",
    trend_note: null,
    why_it_matters: "",
  };
}

let skillsDir: string;

beforeEach(() => {
  skillsDir = mkdtempSync(resolve(tmpdir(), "e5-skills-"));
});
afterEach(() => rmSync(skillsDir, { recursive: true, force: true }));

function seedSkill(category: string): void {
  mkdirSync(resolve(skillsDir, category), { recursive: true });
  writeFileSync(
    resolve(skillsDir, category, "SKILL.md"),
    "---\nname: " + category + "\ndescription: ''\n---\n"
  );
}

describe("computeEpisodeDiff: skills_updated", () => {
  it("groups new practices by category in alphabetical order", () => {
    const ep = practicesFile(346, [
      practice("p1", ["demand-generation"], "Drew"),
      practice("p2", ["ai-in-marketing", "marketing-measurement"], "Drew"),
      practice("p3", ["marketing-measurement"], "Drew"),
    ]);
    const diff = computeEpisodeDiff({
      episodeNumber: 346,
      episodePractices: ep,
      categoryIndex: emptyIndex(),
      disagreementFiles: [],
      skillsDir,
    });
    expect(diff.skills_updated.map((s) => s.category)).toEqual([
      "ai-in-marketing",
      "demand-generation",
      "marketing-measurement",
    ]);
    expect(
      diff.skills_updated.find((s) => s.category === "marketing-measurement")!
        .added_practices.map((p) => p.practice_id)
    ).toEqual(["p2", "p3"]);
  });

  it("marks skill_file_exists only when SKILL.md is present", () => {
    seedSkill("ai-in-marketing");
    const ep = practicesFile(346, [
      practice("p1", ["ai-in-marketing"], "Drew"),
      practice("p2", ["demand-generation"], "Drew"),
    ]);
    const diff = computeEpisodeDiff({
      episodeNumber: 346,
      episodePractices: ep,
      categoryIndex: emptyIndex(),
      disagreementFiles: [],
      skillsDir,
    });
    const ai = diff.skills_updated.find((s) => s.category === "ai-in-marketing")!;
    const dg = diff.skills_updated.find((s) => s.category === "demand-generation")!;
    expect(ai.skill_file_exists).toBe(true);
    expect(dg.skill_file_exists).toBe(false);
  });

  it("reports total_practices_in_category from the category index", () => {
    const ep = practicesFile(346, [practice("p1", ["ai-in-marketing"], "Drew")]);
    const index: CategoryIndex = {
      categories: {
        "ai-in-marketing": {
          practice_count: 5,
          episode_sources: [346],
          practices: [],
        },
      },
      last_updated: "",
    };
    const diff = computeEpisodeDiff({
      episodeNumber: 346,
      episodePractices: ep,
      categoryIndex: index,
      disagreementFiles: [],
      skillsDir,
    });
    expect(diff.skills_updated[0]!.total_practices_in_category).toBe(5);
  });
});

describe("computeEpisodeDiff: disagreements classification", () => {
  it("classifies a disagreement with all supporters from this episode as 'new'", () => {
    const d = disagreement("d1", [
      { id: "a", supporters: [{ guest: "Drew", practice: "p-drew", ep: 346 }] },
      { id: "b", supporters: [{ guest: "Dave", practice: "p-dave", ep: 346 }] },
    ]);
    const diff = computeEpisodeDiff({
      episodeNumber: 346,
      episodePractices: practicesFile(346, []),
      categoryIndex: emptyIndex(),
      disagreementFiles: [disagreementFile("c", [d])],
      skillsDir,
    });
    expect(diff.new_disagreements).toHaveLength(1);
    expect(diff.new_disagreements[0]!.disagreement_id).toBe("d1");
    expect(diff.reinforced_disagreements).toHaveLength(0);
  });

  it("classifies a disagreement with mixed-episode supporters as 'reinforced'", () => {
    const d = disagreement("d1", [
      {
        id: "a",
        supporters: [
          { guest: "Drew", practice: "p-drew", ep: 346 },
          { guest: "Past", practice: "p-past", ep: 200 },
        ],
      },
      { id: "b", supporters: [{ guest: "Earlier", practice: "p-earlier", ep: 100 }] },
    ]);
    const diff = computeEpisodeDiff({
      episodeNumber: 346,
      episodePractices: practicesFile(346, []),
      categoryIndex: emptyIndex(),
      disagreementFiles: [disagreementFile("c", [d])],
      skillsDir,
    });
    expect(diff.new_disagreements).toHaveLength(0);
    expect(diff.reinforced_disagreements).toHaveLength(1);
    const r = diff.reinforced_disagreements[0]!;
    expect(r.disagreement.disagreement_id).toBe("d1");
    expect(r.position_reinforced.position_id).toBe("a");
    expect(r.new_supporter.guest_name).toBe("Drew");
    expect(r.new_supporter.practice_id).toBe("p-drew");
  });

  it("ignores disagreements with no supporters from this episode", () => {
    const d = disagreement("d1", [
      { id: "a", supporters: [{ guest: "A", practice: "p-a", ep: 100 }] },
      { id: "b", supporters: [{ guest: "B", practice: "p-b", ep: 200 }] },
    ]);
    const diff = computeEpisodeDiff({
      episodeNumber: 346,
      episodePractices: practicesFile(346, []),
      categoryIndex: emptyIndex(),
      disagreementFiles: [disagreementFile("c", [d])],
      skillsDir,
    });
    expect(diff.new_disagreements).toHaveLength(0);
    expect(diff.reinforced_disagreements).toHaveLength(0);
  });

  it("only surfaces disagreements from the files provided (filtered-out ones cannot appear)", () => {
    // Simulate: a disagreement that was dropped during Agent 4's intersection filter
    // would simply not appear in the DisagreementsFile passed in.
    const kept = disagreement("kept", [
      { id: "a", supporters: [{ guest: "A", practice: "p-a", ep: 346 }] },
      { id: "b", supporters: [{ guest: "B", practice: "p-b", ep: 346 }] },
    ]);
    const diff = computeEpisodeDiff({
      episodeNumber: 346,
      episodePractices: practicesFile(346, []),
      categoryIndex: emptyIndex(),
      disagreementFiles: [disagreementFile("c", [kept])],
      skillsDir,
    });
    expect(diff.new_disagreements.map((d) => d.disagreement_id)).toEqual(["kept"]);
  });
});
