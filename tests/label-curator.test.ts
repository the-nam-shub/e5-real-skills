import { describe, expect, it } from "vitest";
import { __testing } from "../src/agents/label-curator.js";
import type {
  CuratorPracticeAssignment,
  LabelsFile,
  Practice,
  PracticesFile,
} from "../src/types.js";

const { validateCuratorOutput, applyAssignmentsToPractices, assertCuratorIntegrity } =
  __testing;

function practice(id: string, proposed: string[]): Practice {
  return {
    practice_id: id,
    title: id,
    description: id,
    direct_evidence: [],
    proposed_labels: proposed,
    assigned_labels: [],
    specificity_score: 4,
    guest_name: "Guest",
    guest_context: "Role",
  };
}

function practicesFile(practices: Practice[]): PracticesFile {
  return {
    episode_number: 346,
    title: "Ep",
    guest: "Guest",
    extraction_date: "2026-04-13",
    extraction_model: "claude-haiku-4-5-20251001",
    practices,
  };
}

function emptyLabels(): LabelsFile {
  return { labels: {}, last_updated: "" };
}

describe("validateCuratorOutput", () => {
  it("normalizes + dedupes assigned_labels, preserves new_labels and split_candidates", () => {
    const obj = {
      practice_assignments: [
        { practice_id: "p1", assigned_labels: ["Content-Strategy", "content-strategy", "paid-media"] },
      ],
      new_labels: [
        { label: "Content-Strategy", description: "d", first_introduced_by_practice_id: "p1" },
      ],
      split_candidates: [
        { existing_label: "Content-Strategy", reason: "too broad" },
      ],
    };
    const out = validateCuratorOutput(obj, new Set(["p1"]));
    expect(out.practice_assignments).toEqual([
      { practice_id: "p1", assigned_labels: ["content-strategy", "paid-media"] },
    ]);
    expect(out.new_labels[0]!.label).toBe("content-strategy");
    expect(out.split_candidates[0]!.existing_label).toBe("content-strategy");
  });

  it("tolerates missing practice_ids; caller falls back to proposed_labels", () => {
    // Missing practice_ids no longer throw here; runLabelCurator fills them
    // in from proposed_labels and logs a warning.
    const out = validateCuratorOutput(
      { practice_assignments: [] },
      new Set(["p1", "p2"])
    );
    expect(out.practice_assignments).toEqual([]);
  });

  it("throws when assigned_labels is not an array", () => {
    expect(() =>
      validateCuratorOutput(
        {
          practice_assignments: [{ practice_id: "p1", assigned_labels: "content-strategy" }],
        },
        new Set(["p1"])
      )
    ).toThrow(/assigned_labels not array/);
  });

  it("throws when an assignment has no valid labels after normalization", () => {
    expect(() =>
      validateCuratorOutput(
        { practice_assignments: [{ practice_id: "p1", assigned_labels: ["!!!"] }] },
        new Set(["p1"])
      )
    ).toThrow(/no valid assigned_labels/);
  });

  it("tolerates missing new_labels and split_candidates fields", () => {
    const out = validateCuratorOutput(
      {
        practice_assignments: [
          { practice_id: "p1", assigned_labels: ["content-strategy"] },
        ],
      },
      new Set(["p1"])
    );
    expect(out.new_labels).toEqual([]);
    expect(out.split_candidates).toEqual([]);
  });
});

describe("applyAssignmentsToPractices", () => {
  it("populates assigned_labels per practice, preserves proposed_labels", () => {
    const file = practicesFile([
      practice("p1", ["content-strategy"]),
      practice("p2", ["paid-media"]),
    ]);
    const assignments: CuratorPracticeAssignment[] = [
      { practice_id: "p1", assigned_labels: ["content-strategy"] },
      { practice_id: "p2", assigned_labels: ["paid-media", "demand-generation"] },
    ];
    const result = applyAssignmentsToPractices(file, assignments);
    expect(result.practices[0]!.proposed_labels).toEqual(["content-strategy"]);
    expect(result.practices[0]!.assigned_labels).toEqual(["content-strategy"]);
    expect(result.practices[1]!.assigned_labels).toEqual([
      "paid-media",
      "demand-generation",
    ]);
  });

  it("leaves practices without matching assignments with empty assigned_labels", () => {
    const file = practicesFile([practice("p1", ["x"])]);
    const result = applyAssignmentsToPractices(file, []);
    expect(result.practices[0]!.assigned_labels).toEqual([]);
  });
});

describe("assertCuratorIntegrity", () => {
  it("accepts assignments that use only existing + newly-declared labels", () => {
    const existing: LabelsFile = {
      labels: {
        "content-strategy": {
          description: "",
          practice_count: 1,
          episode_sources: [],
          first_introduced_episode: 0,
          first_introduced_date: "",
          last_practice_added_date: "",
        },
      },
      last_updated: "",
    };
    expect(() =>
      assertCuratorIntegrity(
        {
          practice_assignments: [
            {
              practice_id: "p1",
              assigned_labels: ["content-strategy", "paid-media"],
            },
          ],
          new_labels: [
            {
              label: "paid-media",
              description: "d",
              first_introduced_by_practice_id: "p1",
            },
          ],
          split_candidates: [],
        },
        existing
      )
    ).not.toThrow();
  });

  it("rejects an assignment that uses an undeclared label", () => {
    expect(() =>
      assertCuratorIntegrity(
        {
          practice_assignments: [
            { practice_id: "p1", assigned_labels: ["surprise-label"] },
          ],
          new_labels: [],
          split_candidates: [],
        },
        emptyLabels()
      )
    ).toThrow(/unknown label/);
  });

  it("rejects an assignment with zero labels", () => {
    expect(() =>
      assertCuratorIntegrity(
        {
          practice_assignments: [{ practice_id: "p1", assigned_labels: [] }],
          new_labels: [],
          split_candidates: [],
        },
        emptyLabels()
      )
    ).toThrow(/no assigned labels/);
  });
});
