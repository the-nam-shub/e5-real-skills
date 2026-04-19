import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type {
  CategoryIndex,
  Disagreement,
  DisagreementPosition,
  DisagreementsFile,
  Practice,
  PracticesFile,
} from "./types.js";
import { loadAllDisagreementFiles } from "./disagreements-index.js";

export interface SkillUpdated {
  category: string;
  added_practices: Practice[];
  total_practices_in_category: number;
  skill_file_exists: boolean;
}

export interface ReinforcedDisagreement {
  disagreement: Disagreement;
  position_reinforced: {
    position_id: string;
    stance: string;
  };
  new_supporter: {
    guest_name: string;
    guest_context: string;
    practice_id: string;
    evidence: string;
  };
}

export interface EpisodeDiff {
  episode_number: number;
  skills_updated: SkillUpdated[];
  new_disagreements: Disagreement[];
  reinforced_disagreements: ReinforcedDisagreement[];
}

function practiceLabels(p: Practice): string[] {
  return p.assigned_labels.length > 0 ? p.assigned_labels : p.proposed_labels;
}

function skillFileExists(skillsDir: string, category: string): boolean {
  return existsSync(resolve(skillsDir, category, "SKILL.md"));
}

function classifyDisagreement(
  d: Disagreement,
  episodeNumber: number
): { kind: "new" | "reinforced" | "unaffected"; reinforcement?: ReinforcedDisagreement } {
  let fromEpisodeCount = 0;
  let fromOtherCount = 0;
  let reinforcingPosition: DisagreementPosition | undefined;
  let reinforcingSupporter: Disagreement["positions"][number]["supporters"][number] | undefined;
  for (const pos of d.positions) {
    for (const s of pos.supporters) {
      if (s.episode_number === episodeNumber) {
        fromEpisodeCount += 1;
        if (!reinforcingPosition) {
          reinforcingPosition = pos;
          reinforcingSupporter = s;
        }
      } else {
        fromOtherCount += 1;
      }
    }
  }
  if (fromEpisodeCount === 0) return { kind: "unaffected" };
  if (fromOtherCount === 0) return { kind: "new" };
  return {
    kind: "reinforced",
    reinforcement: {
      disagreement: d,
      position_reinforced: {
        position_id: reinforcingPosition!.position_id,
        stance: reinforcingPosition!.stance,
      },
      new_supporter: {
        guest_name: reinforcingSupporter!.guest_name,
        guest_context: reinforcingSupporter!.guest_context,
        practice_id: reinforcingSupporter!.practice_id,
        evidence: reinforcingSupporter!.evidence,
      },
    },
  };
}

export function computeEpisodeDiff(input: {
  episodeNumber: number;
  episodePractices: PracticesFile;
  categoryIndex: CategoryIndex;
  disagreementFiles: DisagreementsFile[];
  skillsDir: string;
}): EpisodeDiff {
  const { episodeNumber, episodePractices, categoryIndex, disagreementFiles, skillsDir } =
    input;

  // Group this episode's practices by assigned label (or proposed as fallback).
  const byCategory = new Map<string, Practice[]>();
  for (const p of episodePractices.practices) {
    for (const cat of practiceLabels(p)) {
      if (!byCategory.has(cat)) byCategory.set(cat, []);
      byCategory.get(cat)!.push(p);
    }
  }

  const skills_updated: SkillUpdated[] = [];
  for (const [category, added] of [...byCategory.entries()].sort((a, b) =>
    a[0] < b[0] ? -1 : 1
  )) {
    const total = categoryIndex.categories[category]?.practice_count ?? added.length;
    skills_updated.push({
      category,
      added_practices: added,
      total_practices_in_category: total,
      skill_file_exists: skillFileExists(skillsDir, category),
    });
  }

  const new_disagreements: Disagreement[] = [];
  const reinforced_disagreements: ReinforcedDisagreement[] = [];
  for (const file of disagreementFiles) {
    for (const d of file.disagreements) {
      const verdict = classifyDisagreement(d, episodeNumber);
      if (verdict.kind === "new") new_disagreements.push(d);
      else if (verdict.kind === "reinforced" && verdict.reinforcement)
        reinforced_disagreements.push(verdict.reinforcement);
    }
  }

  return {
    episode_number: episodeNumber,
    skills_updated,
    new_disagreements,
    reinforced_disagreements,
  };
}

export function loadDiffInputs(
  dataDir: string,
  skillsDir: string,
  episodeNumber: number
): {
  episodePractices: PracticesFile;
  categoryIndex: CategoryIndex;
  disagreementFiles: DisagreementsFile[];
  skillsDir: string;
} {
  const practicesPath = resolve(dataDir, "practices", `${episodeNumber}.json`);
  const episodePractices = JSON.parse(
    readFileSync(practicesPath, "utf8")
  ) as PracticesFile;
  const indexPath = resolve(dataDir, "category_index.json");
  const categoryIndex = JSON.parse(readFileSync(indexPath, "utf8")) as CategoryIndex;
  const disagreementFiles = loadAllDisagreementFiles(dataDir);
  return { episodePractices, categoryIndex, disagreementFiles, skillsDir };
}
