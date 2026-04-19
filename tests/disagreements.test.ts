import { mkdtempSync, rmSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { meetsDisagreementThreshold } from "../src/agents/disagreement-analyst.js";
import {
  buildDisagreementsIndex,
  rebuildDisagreementsIndex,
} from "../src/disagreements-index.js";
import type {
  CategoryIndexCategory,
  Config,
  DisagreementsFile,
} from "../src/types.js";

const BASE_CONFIG: Config = {
  rss_feed_url: "",
  base_episode_url: "",
  scrape_delay_ms: 0,
  min_episode_number: 150,
  min_specificity_score: 3,
  min_practices_for_disagreement_analysis: 5,
  min_episodes_for_disagreement_analysis: 3,
  extraction_model: "",
  compilation_model: "",
  review_model: "",
  disagreement_model: "",
  analyst_model: "",
  max_revision_cycles: 2,
  max_parallel_extractions: 5,
  max_parallel_skill_compilations: 3,
  data_dir: "",
  skills_dir: "",
};

function category(
  episodeToPracticeIds: Record<number, string[]>
): CategoryIndexCategory {
  const practices = Object.entries(episodeToPracticeIds).flatMap(
    ([ep, ids]) =>
      ids.map((id) => ({
        practice_id: id,
        episode_number: Number(ep),
        title: id,
        description: id,
        guest_name: "Guest",
        episode_date: "2026-01-01",
        specificity_score: 4,
      }))
  );
  return {
    practice_count: practices.length,
    episode_sources: [...new Set(practices.map((p) => p.episode_number))].sort(
      (a, b) => b - a
    ),
    practices,
  };
}

describe("meetsDisagreementThreshold", () => {
  it("fails when below practice count (4 practices from 3 episodes)", () => {
    const cat = category({ 100: ["a"], 200: ["b"], 300: ["c", "d"] });
    expect(meetsDisagreementThreshold(cat, BASE_CONFIG)).toBe(false);
  });

  it("fails when below episode count (5 practices from 2 episodes)", () => {
    const cat = category({ 100: ["a", "b", "c"], 200: ["d", "e"] });
    expect(meetsDisagreementThreshold(cat, BASE_CONFIG)).toBe(false);
  });

  it("passes at exactly 5 practices from 3 episodes", () => {
    const cat = category({
      100: ["a", "b"],
      200: ["c", "d"],
      300: ["e"],
    });
    expect(meetsDisagreementThreshold(cat, BASE_CONFIG)).toBe(true);
  });

  it("passes when both thresholds are exceeded", () => {
    const cat = category({
      100: ["a", "b"],
      200: ["c", "d"],
      300: ["e", "f"],
      400: ["g"],
    });
    expect(meetsDisagreementThreshold(cat, BASE_CONFIG)).toBe(true);
  });

  it("respects config overrides", () => {
    const cat = category({ 100: ["a", "b", "c", "d", "e"] });
    const tight: Config = {
      ...BASE_CONFIG,
      min_episodes_for_disagreement_analysis: 1,
    };
    expect(meetsDisagreementThreshold(cat, tight)).toBe(true);
  });
});

describe("buildDisagreementsIndex", () => {
  function file(
    cat: string,
    n: number
  ): DisagreementsFile {
    return {
      category: cat,
      analysis_date: "2026-04-19",
      analysis_model: "claude-sonnet-4-6",
      disagreements: Array.from({ length: n }, (_, i) => ({
        disagreement_id: `${cat}-${i}`,
        title: `D${i}`,
        category: cat,
        positions: [],
        support_summary: "1 vs 1",
        context_dependency: "",
        trend_note: null,
        why_it_matters: "",
      })),
    };
  }

  it("sums disagreements across files, sorting categories by count desc then slug asc", () => {
    const idx = buildDisagreementsIndex([
      file("content-strategy", 4),
      file("demand-generation", 6),
      file("positioning-and-messaging", 3),
      file("linkedin-marketing", 3),
    ]);
    expect(idx.total_disagreements).toBe(16);
    expect(Object.keys(idx.by_category)).toEqual([
      "demand-generation",
      "content-strategy",
      "linkedin-marketing",
      "positioning-and-messaging",
    ]);
    expect(idx.by_category["demand-generation"]).toBe(6);
  });

  it("omits categories with zero disagreements", () => {
    const idx = buildDisagreementsIndex([
      file("demand-generation", 2),
      file("email-marketing", 0),
    ]);
    expect(idx.total_disagreements).toBe(2);
    expect("email-marketing" in idx.by_category).toBe(false);
  });

  it("returns an empty index for empty input", () => {
    const idx = buildDisagreementsIndex([]);
    expect(idx.total_disagreements).toBe(0);
    expect(idx.by_category).toEqual({});
  });
});

describe("rebuildDisagreementsIndex (filesystem)", () => {
  let dir: string;
  beforeEach(() => {
    dir = mkdtempSync(resolve(tmpdir(), "e5-disagreements-"));
    mkdirSync(resolve(dir, "disagreements"), { recursive: true });
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it("reads category JSON files and writes _index.json ignoring itself", () => {
    const write = (cat: string, n: number) =>
      writeFileSync(
        resolve(dir, "disagreements", `${cat}.json`),
        JSON.stringify({
          category: cat,
          analysis_date: "2026-04-19",
          analysis_model: "claude-sonnet-4-6",
          disagreements: Array.from({ length: n }, (_, i) => ({
            disagreement_id: `${cat}-${i}`,
            title: "t",
            category: cat,
            positions: [],
            support_summary: "",
            context_dependency: "",
            trend_note: null,
            why_it_matters: "",
          })),
        })
      );
    write("demand-generation", 2);
    write("content-strategy", 3);
    // Seed a previous _index.json to confirm it's not double-counted.
    writeFileSync(
      resolve(dir, "disagreements", "_index.json"),
      JSON.stringify({ total_disagreements: 999, by_category: {}, last_updated: "" })
    );
    const idx = rebuildDisagreementsIndex(dir);
    expect(idx.total_disagreements).toBe(5);
    expect(idx.by_category).toEqual({
      "content-strategy": 3,
      "demand-generation": 2,
    });
    const onDisk = JSON.parse(
      readFileSync(resolve(dir, "disagreements", "_index.json"), "utf8")
    );
    expect(onDisk.total_disagreements).toBe(5);
  });
});
