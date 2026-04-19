import { writeFileSync, renameSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type {
  CategoryIndex,
  Config,
  Disagreement,
  DisagreementsFile,
  ReviewResult,
} from "./types.js";
import { writeSkill, reviseSkill } from "./agents/skill-writer.js";
import { reviewSkill, saveReview } from "./agents/reviewer.js";

export type CompileOutcome =
  | { status: "pass"; skillPath: string; cycles: number; reviews: ReviewResult[] }
  | {
      status: "review_stalled";
      skillPath: string;
      cycles: number;
      reviews: ReviewResult[];
    }
  | {
      status: "needs_rewrite";
      rejection: ReviewResult;
      cycles: number;
      reviews: ReviewResult[];
    };

function skillPath(skillsDir: string, category: string): string {
  return resolve(skillsDir, category, "SKILL.md");
}

function atomicWriteText(path: string, contents: string): void {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, contents);
  renameSync(tmp, path);
}

function loadDisagreements(dataDir: string, category: string): Disagreement[] {
  const path = resolve(dataDir, "disagreements", `${category}.json`);
  if (!existsSync(path)) return [];
  const file = JSON.parse(readFileSync(path, "utf8")) as DisagreementsFile;
  return file.disagreements ?? [];
}

export async function compileCategory(
  category: string,
  index: CategoryIndex,
  config: Config
): Promise<CompileOutcome> {
  const categoryData = index.categories[category];
  if (!categoryData || categoryData.practices.length === 0) {
    throw new Error(`Category "${category}" has no practices in the index`);
  }
  const disagreements = loadDisagreements(config.data_dir, category);
  const input = { category, categoryData, disagreements };

  const reviews: ReviewResult[] = [];
  const maxCycles = config.max_revision_cycles;
  let draft = await writeSkill(input, config);
  let cycles = 0;

  while (true) {
    cycles += 1;
    const review = await reviewSkill(
      {
        category,
        skillMarkdown: draft,
        sourcePractices: categoryData.practices,
        disagreements,
      },
      config
    );
    reviews.push(review);
    saveReview(config.data_dir, category, {
      category,
      review_date: new Date().toISOString(),
      review_model: config.review_model,
      revision_cycle: cycles,
      ...review,
    });

    if (review.verdict === "pass") {
      const out = skillPath(config.skills_dir, category);
      atomicWriteText(out, draft);
      return { status: "pass", skillPath: out, cycles, reviews };
    }
    if (review.verdict === "reject") {
      return { status: "needs_rewrite", rejection: review, cycles, reviews };
    }
    if (cycles > maxCycles) {
      const out = skillPath(config.skills_dir, category);
      atomicWriteText(out, draft);
      return { status: "review_stalled", skillPath: out, cycles, reviews };
    }
    draft = await reviseSkill(
      { ...input, previousSkillMarkdown: draft, issues: review.issues },
      config
    );
  }
}
