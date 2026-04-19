import { describe, expect, it } from "vitest";
import {
  applyEpisodeToLabels,
  meetsPromotionThreshold,
} from "../src/labels-store.js";
import type { LabelsFile } from "../src/types.js";

function emptyLabels(): LabelsFile {
  return { labels: {}, last_updated: new Date(0).toISOString() };
}

describe("applyEpisodeToLabels", () => {
  it("seeds a new label with first_introduced fields and increments practice_count", () => {
    const result = applyEpisodeToLabels(emptyLabels(), {
      episodeNumber: 336,
      episodeDate: "2026-03-09",
      assignments: [
        { practice_id: "p1", assigned_labels: ["ai-content-strategy"] },
        { practice_id: "p2", assigned_labels: ["ai-content-strategy"] },
      ],
      newLabels: [
        {
          label: "ai-content-strategy",
          description: "AI for content",
          first_introduced_by_practice_id: "p1",
        },
      ],
    });
    const lbl = result.labels["ai-content-strategy"]!;
    expect(lbl.practice_count).toBe(2);
    expect(lbl.episode_sources).toEqual([336]);
    expect(lbl.first_introduced_episode).toBe(336);
    expect(lbl.first_introduced_date).toBe("2026-03-09");
    expect(lbl.last_practice_added_date).toBe("2026-03-09");
  });

  it("reuses an existing label without resetting first_introduced", () => {
    const base = applyEpisodeToLabels(emptyLabels(), {
      episodeNumber: 336,
      episodeDate: "2026-03-09",
      assignments: [{ practice_id: "p1", assigned_labels: ["content-strategy"] }],
      newLabels: [
        {
          label: "content-strategy",
          description: "Content",
          first_introduced_by_practice_id: "p1",
        },
      ],
    });
    const after = applyEpisodeToLabels(base, {
      episodeNumber: 341,
      episodeDate: "2026-03-28",
      assignments: [{ practice_id: "p2", assigned_labels: ["content-strategy"] }],
      newLabels: [],
    });
    const lbl = after.labels["content-strategy"]!;
    expect(lbl.first_introduced_episode).toBe(336);
    expect(lbl.first_introduced_date).toBe("2026-03-09");
    expect(lbl.last_practice_added_date).toBe("2026-03-28");
    expect(lbl.practice_count).toBe(2);
    expect(lbl.episode_sources).toEqual([341, 336]);
  });

  it("does not double-count an episode in episode_sources when it already appears", () => {
    const base = applyEpisodeToLabels(emptyLabels(), {
      episodeNumber: 346,
      episodeDate: "2026-04-13",
      assignments: [
        { practice_id: "p1", assigned_labels: ["marketing-measurement"] },
        { practice_id: "p2", assigned_labels: ["marketing-measurement"] },
      ],
      newLabels: [
        {
          label: "marketing-measurement",
          description: "",
          first_introduced_by_practice_id: "p1",
        },
      ],
    });
    expect(base.labels["marketing-measurement"]!.episode_sources).toEqual([346]);
    expect(base.labels["marketing-measurement"]!.practice_count).toBe(2);
  });

  it("preserves other labels untouched", () => {
    const base = applyEpisodeToLabels(emptyLabels(), {
      episodeNumber: 336,
      episodeDate: "2026-03-09",
      assignments: [{ practice_id: "p1", assigned_labels: ["content-strategy"] }],
      newLabels: [
        {
          label: "content-strategy",
          description: "Content",
          first_introduced_by_practice_id: "p1",
        },
      ],
    });
    const after = applyEpisodeToLabels(base, {
      episodeNumber: 341,
      episodeDate: "2026-03-28",
      assignments: [{ practice_id: "p2", assigned_labels: ["paid-media"] }],
      newLabels: [
        {
          label: "paid-media",
          description: "Paid",
          first_introduced_by_practice_id: "p2",
        },
      ],
    });
    expect(after.labels["content-strategy"]!.practice_count).toBe(1);
    expect(after.labels["paid-media"]!.practice_count).toBe(1);
  });

  it("is immutable: returns a fresh object, does not mutate input", () => {
    const before = emptyLabels();
    const snapshot = JSON.parse(JSON.stringify(before));
    applyEpisodeToLabels(before, {
      episodeNumber: 346,
      episodeDate: "2026-04-13",
      assignments: [{ practice_id: "p1", assigned_labels: ["x"] }],
      newLabels: [
        {
          label: "x",
          description: "",
          first_introduced_by_practice_id: "p1",
        },
      ],
    });
    expect(before).toEqual(snapshot);
  });
});

describe("meetsPromotionThreshold", () => {
  it("fails below the practice-count threshold", () => {
    expect(
      meetsPromotionThreshold(
        {
          description: "",
          practice_count: 4,
          episode_sources: [1, 2, 3],
          first_introduced_episode: 1,
          first_introduced_date: "",
          last_practice_added_date: "",
        },
        5
      )
    ).toBe(false);
  });

  it("passes at exactly the practice-count threshold", () => {
    expect(
      meetsPromotionThreshold(
        {
          description: "",
          practice_count: 5,
          episode_sources: [1, 2, 3],
          first_introduced_episode: 1,
          first_introduced_date: "",
          last_practice_added_date: "",
        },
        5
      )
    ).toBe(true);
  });

  it("passes on a single-episode label once it has enough practices", () => {
    // The episode minimum was removed; single-episode deep dives should promote.
    expect(
      meetsPromotionThreshold(
        {
          description: "",
          practice_count: 8,
          episode_sources: [345],
          first_introduced_episode: 345,
          first_introduced_date: "",
          last_practice_added_date: "",
        },
        5
      )
    ).toBe(true);
  });
});
