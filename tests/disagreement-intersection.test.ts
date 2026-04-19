import { describe, expect, it } from "vitest";
import {
  disagreementsMatch,
  pairMatches,
  mergeMatchedDisagreements,
  supporterKey,
} from "../src/agents/disagreement-analyst.js";
import type { Disagreement, DisagreementSupporter } from "../src/types.js";

function supporter(
  guest: string,
  practice: string,
  episode = 300,
  date = "2026-01-01"
): DisagreementSupporter {
  return {
    guest_name: guest,
    guest_context: "Role",
    episode_number: episode,
    episode_date: date,
    evidence: `evidence for ${practice}`,
    practice_id: practice,
  };
}

function disagreement(
  id: string,
  positions: Array<{ id: string; stance: string; supporters: DisagreementSupporter[] }>
): Disagreement {
  return {
    disagreement_id: id,
    title: `Title for ${id}`,
    category: "test",
    positions: positions.map((p) => ({
      position_id: p.id,
      stance: p.stance,
      supporters: p.supporters,
    })),
    support_summary: positions.map((p) => p.supporters.length).join(" vs "),
    context_dependency: "",
    trend_note: null,
    why_it_matters: "",
  };
}

describe("disagreementsMatch", () => {
  it("matches when intersection == max(|A|,|B|) (identical supporters)", () => {
    const a = disagreement("d1", [
      { id: "x", stance: "x", supporters: [supporter("Dave", "p-a"), supporter("Drew", "p-b")] },
      { id: "y", stance: "y", supporters: [supporter("Adina", "p-c")] },
    ]);
    const b = disagreement("d1b", [
      { id: "x2", stance: "x2", supporters: [supporter("Dave", "p-a"), supporter("Drew", "p-b")] },
      { id: "y2", stance: "y2", supporters: [supporter("Adina", "p-c")] },
    ]);
    expect(disagreementsMatch(a, b)).toBe(true);
  });

  it("matches at exactly 50% of max size", () => {
    // A has 4 supporters, B has 4 supporters, intersection = 2 → 2 >= 0.5 * 4 → match.
    const common = [supporter("A", "pa"), supporter("B", "pb")];
    const a = disagreement("a", [
      { id: "p1", stance: "", supporters: [...common] },
      { id: "p2", stance: "", supporters: [supporter("C", "pc"), supporter("D", "pd")] },
    ]);
    const b = disagreement("b", [
      { id: "p1", stance: "", supporters: [...common] },
      { id: "p2", stance: "", supporters: [supporter("E", "pe"), supporter("F", "pf")] },
    ]);
    expect(disagreementsMatch(a, b)).toBe(true);
  });

  it("fails below 50% of max size (3 shared out of 8 max)", () => {
    const common = [supporter("A", "pa"), supporter("B", "pb"), supporter("C", "pc")];
    const a = disagreement("a", [
      { id: "p1", stance: "", supporters: [...common] },
      {
        id: "p2",
        stance: "",
        supporters: [
          supporter("D", "pd"),
          supporter("E", "pe"),
          supporter("F", "pf"),
          supporter("G", "pg"),
          supporter("H", "ph"),
        ],
      },
    ]);
    const b = disagreement("b", [
      { id: "p1", stance: "", supporters: [...common] },
      {
        id: "p2",
        stance: "",
        supporters: [
          supporter("X", "px"),
          supporter("Y", "py"),
          supporter("Z", "pz"),
          supporter("W", "pw"),
          supporter("V", "pv"),
        ],
      },
    ]);
    expect(disagreementsMatch(a, b)).toBe(false);
  });

  it("matches supporter identity by guest_name + practice_id case-insensitively", () => {
    const a = disagreement("a", [
      { id: "p1", stance: "", supporters: [supporter("Dave Gerhardt", "practice-1")] },
      { id: "p2", stance: "", supporters: [supporter("Drew", "practice-2")] },
    ]);
    const b = disagreement("b", [
      { id: "p1", stance: "", supporters: [supporter("dave gerhardt", "PRACTICE-1")] },
      { id: "p2", stance: "", supporters: [supporter("drew", "practice-2")] },
    ]);
    expect(disagreementsMatch(a, b)).toBe(true);
  });

  it("does not match disjoint supporter sets", () => {
    const a = disagreement("a", [
      { id: "p1", stance: "", supporters: [supporter("A", "pa")] },
      { id: "p2", stance: "", supporters: [supporter("B", "pb")] },
    ]);
    const b = disagreement("b", [
      { id: "p1", stance: "", supporters: [supporter("C", "pc")] },
      { id: "p2", stance: "", supporters: [supporter("D", "pd")] },
    ]);
    expect(disagreementsMatch(a, b)).toBe(false);
  });
});

describe("pairMatches greedy assignment", () => {
  it("pairs each disagreement at most once, preferring the highest overlap", () => {
    const share = supporter("Common", "p-common");
    const bigShare = [share, supporter("Also", "p-also")];
    const runA = [
      disagreement("A1", [
        { id: "x", stance: "", supporters: [...bigShare] },
        { id: "y", stance: "", supporters: [supporter("A1-only", "p-a1")] },
      ]),
      disagreement("A2", [
        { id: "x", stance: "", supporters: [share] },
        { id: "y", stance: "", supporters: [supporter("A2-only", "p-a2")] },
      ]),
    ];
    const runB = [
      disagreement("B1", [
        { id: "x", stance: "", supporters: [...bigShare] },
        { id: "y", stance: "", supporters: [supporter("B1-only", "p-b1")] },
      ]),
    ];
    const { pairs, onlyA, onlyB } = pairMatches(runA, runB);
    expect(pairs).toHaveLength(1);
    expect(pairs[0]!.a.disagreement_id).toBe("A1");
    expect(pairs[0]!.b.disagreement_id).toBe("B1");
    expect(onlyA.map((d) => d.disagreement_id)).toEqual(["A2"]);
    expect(onlyB).toHaveLength(0);
  });

  it("reports all unmatched disagreements when runs don't overlap", () => {
    const runA = [
      disagreement("A1", [
        { id: "x", stance: "", supporters: [supporter("X", "px")] },
        { id: "y", stance: "", supporters: [supporter("Y", "py")] },
      ]),
    ];
    const runB = [
      disagreement("B1", [
        { id: "x", stance: "", supporters: [supporter("P", "pp")] },
        { id: "y", stance: "", supporters: [supporter("Q", "pq")] },
      ]),
    ];
    const { pairs, onlyA, onlyB } = pairMatches(runA, runB);
    expect(pairs).toHaveLength(0);
    expect(onlyA).toHaveLength(1);
    expect(onlyB).toHaveLength(1);
  });
});

describe("mergeMatchedDisagreements", () => {
  it("preserves run-A's title, position stances, and position_ids", () => {
    const a = disagreement("topic", [
      {
        id: "pro",
        stance: "run A pro stance",
        supporters: [supporter("Dave", "p-dave-a")],
      },
      {
        id: "con",
        stance: "run A con stance",
        supporters: [supporter("Drew", "p-drew-a")],
      },
    ]);
    const b = disagreement("topic-b", [
      {
        id: "pro-b",
        stance: "run B different wording",
        supporters: [supporter("Dave", "p-dave-a"), supporter("Adina", "p-adina")],
      },
      {
        id: "con-b",
        stance: "run B con",
        supporters: [supporter("Drew", "p-drew-a")],
      },
    ]);
    const merged = mergeMatchedDisagreements(a, b);
    expect(merged.title).toBe(a.title);
    expect(merged.positions.map((p) => p.position_id)).toEqual(["pro", "con"]);
    expect(merged.positions[0]!.stance).toBe("run A pro stance");
  });

  it("unions supporters, placing run-B-only supporters in the best-matching run-A position", () => {
    const a = disagreement("topic", [
      {
        id: "pro",
        stance: "",
        supporters: [supporter("Dave", "p-1"), supporter("Adina", "p-2")],
      },
      {
        id: "con",
        stance: "",
        supporters: [supporter("Drew", "p-3")],
      },
    ]);
    const b = disagreement("topic-b", [
      {
        id: "pro-b",
        stance: "",
        supporters: [
          supporter("Dave", "p-1"),
          supporter("Adina", "p-2"),
          supporter("Liz", "p-liz"),
        ],
      },
      {
        id: "con-b",
        stance: "",
        supporters: [supporter("Drew", "p-3"), supporter("Vicente", "p-vicente")],
      },
    ]);
    const merged = mergeMatchedDisagreements(a, b);
    const proIds = merged.positions[0]!.supporters.map((s) => s.practice_id).sort();
    const conIds = merged.positions[1]!.supporters.map((s) => s.practice_id).sort();
    expect(proIds).toEqual(["p-1", "p-2", "p-liz"]);
    expect(conIds).toEqual(["p-3", "p-vicente"]);
  });

  it("does not duplicate supporters that appear in both runs", () => {
    const a = disagreement("topic", [
      { id: "pro", stance: "", supporters: [supporter("Dave", "p-1")] },
      { id: "con", stance: "", supporters: [supporter("Drew", "p-2")] },
    ]);
    const b = disagreement("topic-b", [
      { id: "pro", stance: "", supporters: [supporter("Dave", "p-1")] },
      { id: "con", stance: "", supporters: [supporter("Drew", "p-2")] },
    ]);
    const merged = mergeMatchedDisagreements(a, b);
    const ids = merged.positions.flatMap((p) =>
      p.supporters.map((s) => supporterKey(s))
    );
    expect(new Set(ids).size).toBe(ids.length);
    expect(merged.positions[0]!.supporters).toHaveLength(1);
    expect(merged.positions[1]!.supporters).toHaveLength(1);
  });

  it("recomputes support_summary as counts sorted desc joined by ' vs '", () => {
    const a = disagreement("topic", [
      {
        id: "pro",
        stance: "",
        supporters: [supporter("A", "pa"), supporter("B", "pb")],
      },
      {
        id: "con",
        stance: "",
        supporters: [supporter("C", "pc")],
      },
    ]);
    const b = disagreement("topic-b", [
      {
        id: "pro",
        stance: "",
        supporters: [supporter("A", "pa"), supporter("B", "pb"), supporter("D", "pd")],
      },
      {
        id: "con",
        stance: "",
        supporters: [supporter("C", "pc")],
      },
    ]);
    const merged = mergeMatchedDisagreements(a, b);
    // Pro=3, Con=1 → "3 vs 1"
    expect(merged.support_summary).toBe("3 vs 1");
  });
});
