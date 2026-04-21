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
  Disagreement,
  DisagreementsFile,
  DisagreementsIndex,
  ManifestEpisode,
} from "./types.js";

interface FeaturedDebateRef {
  category: string;
  id: string;
}

interface FeaturedDebatesConfig {
  description?: string;
  debates: FeaturedDebateRef[];
}

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

export function loadFeaturedDebatesConfig(repoRoot: string): FeaturedDebatesConfig | null {
  const p = resolve(repoRoot, "featured_debates.json");
  if (!existsSync(p)) return null;
  const parsed = JSON.parse(readFileSync(p, "utf8")) as FeaturedDebatesConfig;
  if (!Array.isArray(parsed.debates)) return null;
  return parsed;
}

function loadDebateByRef(dataDir: string, ref: FeaturedDebateRef): Disagreement | null {
  const p = resolve(dataDir, "disagreements", `${ref.category}.json`);
  if (!existsSync(p)) return null;
  const file = JSON.parse(readFileSync(p, "utf8")) as DisagreementsFile;
  return file.disagreements.find((d) => d.disagreement_id === ref.id) ?? null;
}

function renderDebateSection(d: Disagreement, index: number): string {
  const anchor = d.disagreement_id;
  const categoryLink = `[\`${d.category}\`](./skills/${d.category}/SKILL.md#where-experts-disagree)`;
  // Dedupe supporters per position by (name, episode) — multiple practice cites
  // from the same guest in the same episode count as one voice.
  const dedupedPositions = d.positions.map((p) => {
    const names = p.supporters
      .map((s) => `${s.guest_name} (Ep #${s.episode_number})`)
      .filter((v, i, arr) => arr.indexOf(v) === i);
    return { stance: p.stance, names };
  });
  const supportSummary = dedupedPositions.map((p) => p.names.length).join(" vs ");
  const parts: string[] = [];
  parts.push(`## ${index}. ${d.title} {#${anchor}}`);
  parts.push(`**Support: ${supportSummary}** · From ${categoryLink}`);
  parts.push("");
  parts.push(`> ${d.why_it_matters}`);
  parts.push("");
  for (const p of dedupedPositions) {
    parts.push(`**${p.stance}**`);
    parts.push(`*Supporters (${p.names.length}):* ${p.names.join(", ")}`);
    parts.push("");
  }
  if (d.context_dependency) {
    parts.push(`**Context:** ${d.context_dependency}`);
    parts.push("");
  }
  return parts.join("\n");
}

export function renderFeaturedDebatesMarkdown(
  config: FeaturedDebatesConfig,
  dataDir: string
): { markdown: string; resolved: Disagreement[]; missing: FeaturedDebateRef[] } {
  const resolved: Disagreement[] = [];
  const missing: FeaturedDebateRef[] = [];
  for (const ref of config.debates) {
    const d = loadDebateByRef(dataDir, ref);
    if (d) resolved.push(d);
    else missing.push(ref);
  }
  const header = `# Featured Debates in B2B Marketing

A hand-picked set of genuine disagreements between Exit Five guests — moments where thoughtful practitioners give opposite advice on the same question.

Each debate here was selected from the full corpus in [\`/disagreements\`](./disagreements/). Every disagreement reproduced across two independent analyst runs on the same practice set (a stability filter), so these aren't one-off quotes taken out of context — they're patterns.

---

`;
  const body = resolved
    .map((d, i) => renderDebateSection(d, i + 1))
    .join("\n---\n\n");
  const footer = `
---

_Want every disagreement, not just the featured ones? See [\`/disagreements\`](./disagreements/) for the full structured data._
`;
  return { markdown: header + body + footer, resolved, missing };
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
  featuredDebateCount: number;
}

export function renderReadme(inputs: ReadmeInputs): string {
  return `# Exit Five B2B Marketing Skills for Claude

Claude skill files grounded in expert best practices from [The Dave Gerhardt Show (Exit Five)](https://exitfive.com/podcast), not superficial advice with a pretty wrapper.

Every recommendation in these skills traces back to a specific guest, a specific episode, and a specific "practice" they detailed. If a topic isn't covered, it's because no guest has addressed it yet.

## How to Use

1. Fork this repo
2. Copy any \`SKILL.md\` file into your Claude Project's skill directory
3. Claude will automatically apply the skill when relevant to your task

## Available Skills

${renderSkillsTable(inputs.skillRows)}

## Where the Experts Disagree

Not every best practice is settled. When podcast guests give directly conflicting advice on the same question, we track it, including how many guests support each position. A "6 vs 1" disagreement tells you different things than a "3 vs 3" one.

${inputs.featuredDebateCount > 0
  ? `**${inputs.featuredDebateCount} notable debates** are curated in [\`FEATURED_DEBATES.md\`](./FEATURED_DEBATES.md) — hand-picked for what's genuinely contested between thoughtful practitioners.`
  : `See [\`/disagreements\`](./disagreements/) for the full structured data.`}

All ${inputs.disagreementRows.length} disagreements are available as structured JSON in [\`/disagreements\`](./disagreements/). Disagreements surface only when they reproduce across two independent Agent 4 runs on the same practice set — a stability filter that favors fewer, more trustworthy findings over exhaustive coverage.

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

  // Featured debates — optional curated highlight file.
  const featuredConfig = loadFeaturedDebatesConfig(repoRoot);
  let featuredMarkdown: string | null = null;
  let featuredCount = 0;
  let featuredMissing: FeaturedDebateRef[] = [];
  if (featuredConfig && featuredConfig.debates.length > 0) {
    const rendered = renderFeaturedDebatesMarkdown(featuredConfig, data_dir);
    featuredMarkdown = rendered.markdown;
    featuredCount = rendered.resolved.length;
    featuredMissing = rendered.missing;
    if (featuredMissing.length > 0) {
      console.warn(
        `[publisher] ${featuredMissing.length} featured debate(s) in featured_debates.json not found: ` +
          featuredMissing.map((m) => `${m.category}/${m.id}`).join(", ")
      );
    }
  }
  const featuredDebatesPath = resolve(repoRoot, "FEATURED_DEBATES.md");
  const currentFeatured = existsSync(featuredDebatesPath)
    ? readFileSync(featuredDebatesPath, "utf8")
    : "";
  const featuredChanged = featuredMarkdown !== null && currentFeatured !== featuredMarkdown;

  const readmePath = resolve(repoRoot, "README.md");
  const readme = renderReadme({
    skillRows,
    disagreementRows,
    featuredDebateCount: featuredCount,
  });
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
        readmeChanged ||
        featuredChanged,
    };
  }

  // Non-dry-run path: actually mirror + write README + featured debates file.
  const copiedDisagreements = mirrorDir(disagreementsSrc, disagreementsDest, (n) =>
    n.endsWith(".json")
  );
  const copiedAnalyses = mirrorDir(analysesSrc, analysesDest, (n) =>
    n.endsWith(".md")
  );
  if (readmeChanged) atomicWriteText(readmePath, readme);
  if (featuredChanged && featuredMarkdown !== null) {
    atomicWriteText(featuredDebatesPath, featuredMarkdown);
  }

  const stagePaths = [
    "skills",
    "disagreements",
    "episode-analyses",
    "README.md",
    "FEATURED_DEBATES.md",
  ];

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
