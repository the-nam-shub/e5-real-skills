import {
  readdirSync,
  readFileSync,
  writeFileSync,
  renameSync,
  mkdirSync,
  existsSync,
  copyFileSync,
  statSync,
} from "node:fs";
import { resolve, dirname } from "node:path";
import { parse as parseYaml } from "yaml";
import { simpleGit, type SimpleGit } from "simple-git";
import type {
  CategoryIndex,
  DisagreementsFile,
  DisagreementsIndex,
  ManifestEpisode,
} from "./types.js";

export interface PublishOptions {
  dryRun?: boolean;
  episodesThisRun?: ManifestEpisode[];
}

export interface PublishResult {
  copied_disagreements: string[];
  copied_analyses: string[];
  readme_path: string;
  staged_files: string[];
  commit?: {
    hash: string;
    message: string;
    pushed: boolean;
    push_error?: string;
  };
  changed: boolean;
}

function atomicWriteText(path: string, contents: string): void {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, contents);
  renameSync(tmp, path);
}

function copyIfChanged(src: string, dest: string): boolean {
  const srcContent = readFileSync(src);
  if (existsSync(dest)) {
    const existing = readFileSync(dest);
    if (srcContent.equals(existing)) return false;
  }
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  return true;
}

function mirrorDir(
  srcDir: string,
  destDir: string,
  filter: (name: string) => boolean
): string[] {
  if (!existsSync(srcDir)) return [];
  mkdirSync(destDir, { recursive: true });
  const copied: string[] = [];
  for (const name of readdirSync(srcDir)) {
    if (!filter(name)) continue;
    const src = resolve(srcDir, name);
    if (!statSync(src).isFile()) continue;
    const dest = resolve(destDir, name);
    if (copyIfChanged(src, dest)) copied.push(name);
  }
  return copied;
}

interface SkillRow {
  category: string;
  practice_count: number;
  episode_count: number;
  last_updated: string;
}

interface DisagreementRow {
  title: string;
  category: string;
  support_summary: string;
  total_supporters: number;
  margin: number;
}

function readSkillFrontmatter(skillPath: string): Record<string, unknown> | null {
  try {
    const raw = readFileSync(skillPath, "utf8");
    const m = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!m) return null;
    const parsed = parseYaml(m[1]!);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

export function collectSkillRows(
  skillsDir: string,
  categoryIndex: CategoryIndex
): SkillRow[] {
  if (!existsSync(skillsDir)) return [];
  const rows: SkillRow[] = [];
  for (const category of readdirSync(skillsDir).sort()) {
    const skillPath = resolve(skillsDir, category, "SKILL.md");
    if (!existsSync(skillPath)) continue;
    const fm = readSkillFrontmatter(skillPath);
    const indexed = categoryIndex.categories[category];
    const lastUpdated =
      (fm && typeof fm["version"] === "string" ? (fm["version"] as string) : "") ||
      statSync(skillPath).mtime.toISOString().slice(0, 10);
    rows.push({
      category,
      practice_count: indexed?.practice_count ?? 0,
      episode_count: indexed?.episode_sources.length ?? 0,
      last_updated: lastUpdated,
    });
  }
  return rows;
}

function humanCategory(slug: string): string {
  return slug
    .split("-")
    .map((p) => (p.length === 0 ? p : p[0]!.toUpperCase() + p.slice(1)))
    .join(" ");
}

export function collectDisagreementRows(
  dataDir: string
): DisagreementRow[] {
  const dir = resolve(dataDir, "disagreements");
  if (!existsSync(dir)) return [];
  const rows: DisagreementRow[] = [];
  for (const name of readdirSync(dir).sort()) {
    if (!name.endsWith(".json") || name === "_index.json") continue;
    const abs = resolve(dir, name);
    const file = JSON.parse(readFileSync(abs, "utf8")) as DisagreementsFile;
    for (const d of file.disagreements) {
      const counts = d.positions.map((p) => p.supporters?.length ?? 0);
      const total = counts.reduce((a, b) => a + b, 0);
      const margin = counts.length >= 2 ? Math.max(...counts) - Math.min(...counts) : 0;
      rows.push({
        title: d.title,
        category: file.category,
        support_summary: d.support_summary,
        total_supporters: total,
        margin,
      });
    }
  }
  return rows;
}

const README_DISAGREEMENT_LIMIT = 10;
const README_DISAGREEMENT_MIN_SUPPORT = 3;

export function rankDisagreementsForReadme(
  rows: DisagreementRow[]
): DisagreementRow[] {
  return rows
    .filter((r) => r.total_supporters >= README_DISAGREEMENT_MIN_SUPPORT)
    .sort((a, b) => {
      if (b.total_supporters !== a.total_supporters) {
        return b.total_supporters - a.total_supporters;
      }
      return b.margin - a.margin;
    })
    .slice(0, README_DISAGREEMENT_LIMIT);
}

function renderSkillsTable(rows: SkillRow[]): string {
  if (rows.length === 0) return "_No skills compiled yet._";
  const header =
    "| Skill | Practices | Episodes | Last Updated |\n|-------|-----------|----------|--------------|";
  const body = rows
    .map(
      (r) =>
        `| [${humanCategory(r.category)}](./skills/${r.category}/SKILL.md) | ${r.practice_count} | ${r.episode_count} | ${r.last_updated} |`
    )
    .join("\n");
  return `${header}\n${body}`;
}

function renderDisagreementsTable(rows: DisagreementRow[]): string {
  if (rows.length === 0) {
    return "_No disagreements surfaced yet. When the corpus grows, cross-episode disagreements between guests will appear here._";
  }
  const header =
    "| Debate | Category | Support |\n|--------|----------|---------|";
  const body = rows
    .map(
      (r) =>
        `| ${r.title} | ${humanCategory(r.category)} | ${r.support_summary} |`
    )
    .join("\n");
  return `${header}\n${body}`;
}

export interface ReadmeInputs {
  skillRows: SkillRow[];
  disagreementRows: DisagreementRow[];
}

export function renderReadme(inputs: ReadmeInputs): string {
  return `# Exit Five B2B Marketing Skills for Claude

Claude skill files grounded in actual best practices from [The Dave Gerhardt Show (Exit Five)](https://exitfive.com/podcast) — not general knowledge, not AI-generated fluff.

Every recommendation in these skills traces back to a specific guest, a specific episode, and a specific thing they said. If a topic isn't covered, it's because no guest has addressed it yet.

## How to Use

1. Fork this repo
2. Copy any \`SKILL.md\` file into your Claude Project's skill directory
3. Claude will automatically apply the skill when relevant to your task

## Available Skills

${renderSkillsTable(inputs.skillRows)}

## Where the Experts Disagree

Not every best practice is settled. When podcast guests give directly conflicting advice on the same question, we track it, including how many guests support each position. A "6 vs 1" disagreement tells you different things than a "3 vs 3" one.

**Top ${README_DISAGREEMENT_LIMIT} debates by guest engagement** (ranked by total supporters across positions, with lopsided debates breaking ties):

${renderDisagreementsTable(rankDisagreementsForReadme(inputs.disagreementRows))}

Disagreements surface only when they reproduce across two independent Agent 4 runs on the same practice set — a stability filter that favors fewer, more trustworthy findings over exhaustive coverage.

Browse all ${inputs.disagreementRows.length} disagreements in [\`/disagreements\`](./disagreements/).

## Per-Episode Analysis

Every processed episode produces a short analytical write-up covering what it added to the knowledge base: new practices extracted, which skills were updated, and any disagreements it surfaced or reinforced.

See [\`/episode-analyses\`](./episode-analyses/) for all analyses.

## How It Works

This repo is maintained by an automated pipeline that:
1. Monitors the Exit Five podcast RSS feed for new episodes
2. Pulls transcripts directly from the \`podcast:transcript\` URL in the RSS
3. Uses Claude Haiku to identify specific, actionable best practices (not vague advice)
4. Detects genuine disagreements between experts across episodes, with support counts
5. Compiles practices into skill files, organized by marketing function
6. Generates a per-episode analysis explaining what each new episode contributed
7. Publishes updates after each new episode

Every practice requires a specificity score of 3+ (out of 5) to be included. Generic advice like "know your audience" gets filtered out. What remains is the stuff you can actually do on Monday morning.

## Attribution

All content is sourced from publicly available podcast transcripts. Every practice is attributed to the guest who shared it. This project is not affiliated with Exit Five.
`;
}

function buildCommitMessage(episodes: ManifestEpisode[]): string {
  if (episodes.length === 0) return "Update skills inventory";
  if (episodes.length === 1) {
    const e = episodes[0]!;
    return `Update skills from Episode #${e.episode_number} (${e.title})`;
  }
  const numbers = episodes
    .map((e) => `#${e.episode_number}`)
    .sort((a, b) => {
      const na = Number(a.replace("#", ""));
      const nb = Number(b.replace("#", ""));
      return nb - na;
    })
    .join(", ");
  return `Update skills from new Exit Five episodes: ${numbers}`;
}

async function stageAndCommit(
  git: SimpleGit,
  repoRoot: string,
  message: string,
  pathsToStage: string[]
): Promise<{ hash: string; staged: string[] } | null> {
  // Add each path, ignoring nonexistent ones.
  const existing = pathsToStage.filter((p) => existsSync(resolve(repoRoot, p)));
  if (existing.length === 0) return null;
  await git.add(existing);
  const status = await git.status();
  const staged = [
    ...status.created,
    ...status.modified,
    ...status.renamed.map((r) => r.to),
    ...status.deleted,
  ].filter((f) =>
    existing.some((prefix) => f === prefix || f.startsWith(prefix.endsWith("/") ? prefix : `${prefix}/`))
  );
  if (status.staged.length === 0) return { hash: "", staged: [] };
  const summary = await git.commit(message);
  return { hash: summary.commit, staged };
}

function planMirror(
  srcDir: string,
  destDir: string,
  filter: (name: string) => boolean
): string[] {
  if (!existsSync(srcDir)) return [];
  const plan: string[] = [];
  for (const name of readdirSync(srcDir)) {
    if (!filter(name)) continue;
    const src = resolve(srcDir, name);
    if (!statSync(src).isFile()) continue;
    const dest = resolve(destDir, name);
    const srcContent = readFileSync(src);
    if (existsSync(dest) && readFileSync(dest).equals(srcContent)) continue;
    plan.push(name);
  }
  return plan;
}

export async function publish(
  config: {
    data_dir: string;
    skills_dir: string;
  },
  opts: PublishOptions = {}
): Promise<PublishResult> {
  const repoRoot = process.cwd();
  const { data_dir, skills_dir } = config;

  const disagreementsSrc = resolve(data_dir, "disagreements");
  const disagreementsDest = resolve(repoRoot, "disagreements");
  const analysesSrc = resolve(data_dir, "episode-analyses");
  const analysesDest = resolve(repoRoot, "episode-analyses");

  // Build README inputs from the current state (safe to read even in dry-run).
  const categoryIndexPath = resolve(data_dir, "category_index.json");
  const categoryIndex: CategoryIndex = existsSync(categoryIndexPath)
    ? (JSON.parse(readFileSync(categoryIndexPath, "utf8")) as CategoryIndex)
    : { categories: {}, last_updated: new Date(0).toISOString() };
  const skillRows = collectSkillRows(skills_dir, categoryIndex);
  const disagreementRows = collectDisagreementRows(data_dir);
  const readmePath = resolve(repoRoot, "README.md");
  const readme = renderReadme({ skillRows, disagreementRows });
  const currentReadme = existsSync(readmePath) ? readFileSync(readmePath, "utf8") : "";
  const readmeChanged = currentReadme !== readme;

  if (opts.dryRun) {
    const plannedDisagreements = planMirror(disagreementsSrc, disagreementsDest, (n) =>
      n.endsWith(".json")
    );
    const plannedAnalyses = planMirror(analysesSrc, analysesDest, (n) =>
      n.endsWith(".md")
    );
    return {
      copied_disagreements: plannedDisagreements,
      copied_analyses: plannedAnalyses,
      readme_path: readmePath,
      staged_files: [],
      changed:
        plannedDisagreements.length > 0 ||
        plannedAnalyses.length > 0 ||
        readmeChanged,
    };
  }

  // Non-dry-run path: actually mirror + write README.
  const copiedDisagreements = mirrorDir(disagreementsSrc, disagreementsDest, (n) =>
    n.endsWith(".json")
  );
  const copiedAnalyses = mirrorDir(analysesSrc, analysesDest, (n) =>
    n.endsWith(".md")
  );
  if (readmeChanged) atomicWriteText(readmePath, readme);

  const stagePaths = ["skills", "disagreements", "episode-analyses", "README.md"];

  const git = simpleGit({ baseDir: repoRoot });
  const message = buildCommitMessage(opts.episodesThisRun ?? []);

  let commitInfo: PublishResult["commit"];
  try {
    const committed = await stageAndCommit(git, repoRoot, message, stagePaths);
    if (!committed) {
      return {
        copied_disagreements: copiedDisagreements,
        copied_analyses: copiedAnalyses,
        readme_path: readmePath,
        staged_files: [],
        changed: false,
      };
    }
    if (committed.hash === "") {
      return {
        copied_disagreements: copiedDisagreements,
        copied_analyses: copiedAnalyses,
        readme_path: readmePath,
        staged_files: [],
        changed: false,
      };
    }
    commitInfo = { hash: committed.hash, message, pushed: false };

    try {
      await git.push();
      commitInfo.pushed = true;
    } catch (pushErr) {
      const msg = pushErr instanceof Error ? pushErr.message : String(pushErr);
      commitInfo.push_error = msg;
      console.error(
        `[publisher] git push FAILED (files are committed locally, not pushed): ${msg}`
      );
    }

    return {
      copied_disagreements: copiedDisagreements,
      copied_analyses: copiedAnalyses,
      readme_path: readmePath,
      staged_files: committed.staged,
      commit: commitInfo,
      changed: true,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[publisher] git operation FAILED: ${msg}`);
    throw err;
  }
}

export const __testing = {
  buildCommitMessage,
  humanCategory,
  renderSkillsTable,
  renderDisagreementsTable,
};
