import { describe, expect, it } from "vitest";
import {
  mergePracticesIntoIndex,
  rebuildCategoryIndex,
} from "../src/category-index.js";
import type { CategoryIndex, Manifest, PracticesFile } from "../src/types.js";

function emptyIndex(): CategoryIndex {
  return { categories: {}, last_updated: new Date(0).toISOString() };
}

function practice(
  id: string,
  labels: string[],
  score = 4
): PracticesFile["practices"][number] {
  return {
    practice_id: id,
    title: `Title ${id}`,
    description: `Description ${id}`,
    direct_evidence: [
      { speaker: "Guest", approx_timestamp: "10:00", content: "quote" },
    ],
    proposed_labels: labels,
    assigned_labels: labels,
    specificity_score: score,
    guest_name: "Guest",
    guest_context: "Role",
  };
}

const MANIFEST: Manifest = {
  episodes: [
    {
      episode_number: 346,
      title: "Episode 346",
      date: "2026-04-13",
      rss_guid: "g346",
      episode_url: "u",
      status: "processed",
    },
    {
      episode_number: 300,
      title: "Episode 300",
      date: "2025-11-10",
      rss_guid: "g300",
      episode_url: "u",
      status: "processed",
    },
    {
      episode_number: 200,
      title: "Episode 200",
      date: "2024-08-01",
      rss_guid: "g200",
      episode_url: "u",
      status: "processed",
    },
  ],
  last_checked: "",
};

function fileFor(
  n: number,
  practices: PracticesFile["practices"]
): PracticesFile {
  return {
    episode_number: n,
    title: `Episode ${n}`,
    guest: "Guest",
    extraction_date: "2026-04-19",
    extraction_model: "claude-haiku-4-5-20251001",
    practices,
  };
}

describe("mergePracticesIntoIndex", () => {
  it("adds entries to each category listed on a practice", () => {
    const pf = fileFor(346, [
      practice("p-1", ["marketing-measurement", "brand-building"]),
    ]);
    const index = mergePracticesIntoIndex(emptyIndex(), [pf], MANIFEST);
    expect(index.categories["marketing-measurement"]!.practice_count).toBe(1);
    expect(index.categories["brand-building"]!.practice_count).toBe(1);
  });

  it("populates episode_date from the manifest", () => {
    const pf = fileFor(300, [practice("p-a", ["marketing-measurement"])]);
    const index = mergePracticesIntoIndex(emptyIndex(), [pf], MANIFEST);
    expect(
      index.categories["marketing-measurement"]!.practices[0]!.episode_date
    ).toBe("2025-11-10");
  });

  it("is idempotent: merging twice equals merging once (except last_updated)", () => {
    const pf = fileFor(346, [
      practice("p-1", ["marketing-measurement"]),
      practice("p-2", ["demand-generation"]),
    ]);
    const once = mergePracticesIntoIndex(emptyIndex(), [pf], MANIFEST);
    const twice = mergePracticesIntoIndex(once, [pf], MANIFEST);
    expect(twice.categories).toEqual(once.categories);
  });

  it("sorts practices by episode_date desc, then practice_id asc", () => {
    const pf1 = fileFor(200, [practice("b-old", ["marketing-measurement"])]);
    const pf2 = fileFor(346, [
      practice("a-new", ["marketing-measurement"]),
      practice("c-new", ["marketing-measurement"]),
    ]);
    const pf3 = fileFor(300, [practice("mid", ["marketing-measurement"])]);
    const index = mergePracticesIntoIndex(
      emptyIndex(),
      [pf1, pf2, pf3],
      MANIFEST
    );
    const ids = index.categories["marketing-measurement"]!.practices.map(
      (p) => p.practice_id
    );
    expect(ids).toEqual(["a-new", "c-new", "mid", "b-old"]);
  });

  it("tracks unique episode_sources and sorts them descending", () => {
    const pf1 = fileFor(200, [practice("x", ["demand-generation"])]);
    const pf2 = fileFor(346, [practice("y", ["demand-generation"])]);
    const pf3 = fileFor(300, [practice("z", ["demand-generation"])]);
    const index = mergePracticesIntoIndex(
      emptyIndex(),
      [pf1, pf2, pf3],
      MANIFEST
    );
    expect(index.categories["demand-generation"]!.episode_sources).toEqual([
      346, 300, 200,
    ]);
  });

  it("replaces an existing (practice_id, episode_number) pair rather than duplicating", () => {
    const pfFirst = fileFor(346, [
      practice("p-1", ["marketing-measurement"], 3),
    ]);
    const pfUpdated = fileFor(346, [
      practice("p-1", ["marketing-measurement"], 5),
    ]);
    const index1 = mergePracticesIntoIndex(emptyIndex(), [pfFirst], MANIFEST);
    const index2 = mergePracticesIntoIndex(index1, [pfUpdated], MANIFEST);
    const cat = index2.categories["marketing-measurement"]!;
    expect(cat.practice_count).toBe(1);
    expect(cat.practices[0]!.specificity_score).toBe(5);
  });

  it("rebuildCategoryIndex starts from empty state", () => {
    const pf1 = fileFor(346, [practice("p-1", ["marketing-measurement"])]);
    const pf2 = fileFor(300, [practice("p-2", ["marketing-measurement"])]);
    const stale = rebuildCategoryIndex([pf1], MANIFEST);
    // "Rebuild" with only pf2 should not preserve p-1 from stale:
    const fresh = rebuildCategoryIndex([pf2], MANIFEST);
    expect(fresh.categories["marketing-measurement"]!.practice_count).toBe(1);
    expect(
      fresh.categories["marketing-measurement"]!.practices[0]!.practice_id
    ).toBe("p-2");
    // Independence check
    expect(stale.categories["marketing-measurement"]!.practice_count).toBe(1);
  });
});
