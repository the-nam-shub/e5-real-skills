#!/usr/bin/env node
import { Command } from "commander";
import { mkdirSync, writeFileSync, renameSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { loadConfig, loadEnvFile } from "./config.js";
import { fetchRssEpisodes } from "./rss.js";
import { scrapeEpisode, delay } from "./scraper.js";
import {
  readManifest,
  writeManifest,
  upsertEpisode,
  setStatus,
  findNewEpisodes,
  getEpisode,
} from "./manifest.js";
import type { Manifest, ManifestEpisode } from "./types.js";

loadEnvFile();

const program = new Command();
program.name("e5-skills").description("Exit Five skills pipeline").version("0.1.0");

function ensureDataDirs(dataDir: string): void {
  for (const sub of [
    "",
    "transcripts",
    "practices",
    "reviews",
    "disagreements",
    "episode-analyses",
  ]) {
    mkdirSync(resolve(dataDir, sub), { recursive: true });
  }
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, JSON.stringify(value, null, 2));
  renameSync(tmp, path);
}

async function scrapeAndSave(
  rssEpisodes: Awaited<ReturnType<typeof fetchRssEpisodes>>,
  manifest: Manifest,
  dataDir: string,
  target: ManifestEpisode
): Promise<Manifest> {
  const match = rssEpisodes.find(
    (r) => r.episode.episode_number === target.episode_number
  );
  if (!match) {
    console.error(`Episode ${target.episode_number} not found in RSS feed`);
    return setStatus(manifest, target.episode_number, "scrape_failed");
  }
  if (!match.transcript_url) {
    console.warn(`Episode ${target.episode_number}: no transcript URL in RSS`);
    return setStatus(manifest, target.episode_number, "no_transcript");
  }
  try {
    const transcript = await scrapeEpisode(match);
    const transcriptPath = resolve(
      dataDir,
      "transcripts",
      `${target.episode_number}.json`
    );
    writeJson(transcriptPath, transcript);
    console.log(
      `Episode ${target.episode_number}: scraped ${transcript.transcript.length} lines → ${transcriptPath}`
    );
    return setStatus(manifest, target.episode_number, "new", {
      transcript_file: transcriptPath,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg === "no_transcript") {
      console.warn(`Episode ${target.episode_number}: transcript empty or missing`);
      return setStatus(manifest, target.episode_number, "no_transcript");
    }
    console.error(`Episode ${target.episode_number}: scrape failed - ${msg}`);
    return setStatus(manifest, target.episode_number, "scrape_failed");
  }
}

program
  .command("run")
  .description("Check for new episodes and process them end-to-end")
  .option("--dry-run", "Show what would change without writing files")
  .action(async (opts: { dryRun?: boolean }) => {
    const config = loadConfig();
    ensureDataDirs(config.data_dir);
    const { runPipeline, logSummary } = await import("./pipeline.js");
    const summary = await runPipeline(config, { dryRun: opts.dryRun });
    if (opts.dryRun) {
      console.log(`new episodes (>= #${config.min_episode_number}): ${summary.new_episodes.length}`);
      for (const e of summary.new_episodes.slice(0, 30)) {
        console.log(`  - #${e.episode_number} ${e.title}`);
      }
      if (summary.new_episodes.length > 30) {
        console.log(`  ... ${summary.new_episodes.length - 30} more`);
      }
      return;
    }
    logSummary(summary);
  });

program
  .command("process")
  .description("Process a single episode by number")
  .requiredOption("--episode <n>", "Episode number", (v) => Number(v))
  .action(async (opts: { episode: number }) => {
    const config = loadConfig();
    ensureDataDirs(config.data_dir);
    let manifest = readManifest(config.data_dir);
    const rssEpisodes = await fetchRssEpisodes(
      config.rss_feed_url,
      config.base_episode_url
    );
    const match = rssEpisodes.find((r) => r.episode.episode_number === opts.episode);
    if (!match) {
      console.error(`Episode ${opts.episode} not found in RSS feed`);
      process.exit(1);
    }
    manifest = upsertEpisode(manifest, match.episode);
    manifest = await scrapeAndSave(rssEpisodes, manifest, config.data_dir, match.episode);
    writeManifest(config.data_dir, manifest);

    // Phase 2: extraction
    if (getEpisode(manifest, opts.episode)?.status === "no_transcript") return;
    if (getEpisode(manifest, opts.episode)?.status === "scrape_failed") process.exit(2);

    const { runExtractor } = await import("./agents/extractor.js");
    try {
      const { practicesFile, path } = await runExtractor(
        opts.episode,
        config,
        manifest
      );
      console.log(
        `Extracted ${practicesFile.practices.length} practices → ${path}`
      );
      manifest = setStatus(
        readManifest(config.data_dir),
        opts.episode,
        practicesFile.practices.length === 0 ? "processed_no_practices" : "processed",
        {
          practices_file: path,
          processed_at: new Date().toISOString(),
        }
      );
      writeManifest(config.data_dir, manifest);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Extraction failed: ${msg}`);
      manifest = setStatus(
        readManifest(config.data_dir),
        opts.episode,
        "extraction_failed"
      );
      writeManifest(config.data_dir, manifest);
      process.exit(3);
    }
  });

program
  .command("status")
  .description("Show processing status")
  .action(() => {
    const config = loadConfig();
    const manifest = readManifest(config.data_dir);
    const counts = new Map<string, number>();
    for (const e of manifest.episodes) {
      counts.set(e.status, (counts.get(e.status) ?? 0) + 1);
    }
    console.log(`Last checked: ${manifest.last_checked}`);
    console.log(`Total tracked: ${manifest.episodes.length}`);
    for (const [status, n] of [...counts.entries()].sort()) {
      console.log(`  ${status.padEnd(28)} ${n}`);
    }
  });

program
  .command("compile")
  .description("Recompile skills from existing practice data")
  .option("--category <slug>", "Recompile a single category")
  .action(async (opts: { category?: string }) => {
    const config = loadConfig();
    ensureDataDirs(config.data_dir);
    const manifest = readManifest(config.data_dir);
    const { loadAllPracticeFiles, rebuildCategoryIndex, writeCategoryIndex } =
      await import("./category-index.js");
    const practiceFiles = loadAllPracticeFiles(config.data_dir, manifest);
    const index = rebuildCategoryIndex(practiceFiles, manifest);
    writeCategoryIndex(config.data_dir, index);
    const categories = opts.category
      ? [opts.category]
      : Object.keys(index.categories).sort();
    const { compileCategory } = await import("./compile.js");
    let failures = 0;
    for (const cat of categories) {
      if (!index.categories[cat] || index.categories[cat]!.practice_count === 0) {
        console.log(`skip ${cat}: no practices`);
        continue;
      }
      console.log(`compiling ${cat} (${index.categories[cat]!.practice_count} practices)...`);
      try {
        const result = await compileCategory(cat, index, config);
        if (result.status === "pass") {
          console.log(`  PASS   ${cat} → ${result.skillPath} (${result.cycles} review${result.cycles === 1 ? "" : "s"})`);
        } else if (result.status === "review_stalled") {
          console.log(
            `  STALL  ${cat} → ${result.skillPath} (${result.cycles} reviews, published best draft)`
          );
          failures += 1;
        } else {
          console.log(
            `  REJECT ${cat}: ${result.rejection.overall_assessment}`
          );
          for (const issue of result.rejection.issues) {
            console.log(`    [${issue.severity}] ${issue.criterion}: ${issue.problem}`);
          }
          failures += 1;
        }
      } catch (err) {
        console.error(`  ERROR  ${cat}: ${err instanceof Error ? err.message : String(err)}`);
        failures += 1;
      }
    }
    if (failures > 0) process.exitCode = 4;
  });

program
  .command("review")
  .description("Re-review an existing skill without recompiling")
  .requiredOption("--category <slug>", "Category slug")
  .action(async (opts: { category: string }) => {
    const config = loadConfig();
    ensureDataDirs(config.data_dir);
    const manifest = readManifest(config.data_dir);
    const { readFileSync } = await import("node:fs");
    const { loadAllPracticeFiles, rebuildCategoryIndex } = await import(
      "./category-index.js"
    );
    const { reviewSkill, saveReview } = await import("./agents/reviewer.js");
    const index = rebuildCategoryIndex(
      loadAllPracticeFiles(config.data_dir, manifest),
      manifest
    );
    const categoryData = index.categories[opts.category];
    if (!categoryData) {
      console.error(`Unknown category: ${opts.category}`);
      process.exit(1);
    }
    const skillMd = readFileSync(
      resolve(config.skills_dir, opts.category, "SKILL.md"),
      "utf8"
    );
    const result = await reviewSkill(
      {
        category: opts.category,
        skillMarkdown: skillMd,
        sourcePractices: categoryData.practices,
        disagreements: [],
      },
      config
    );
    const path = saveReview(config.data_dir, opts.category, {
      category: opts.category,
      review_date: new Date().toISOString(),
      review_model: config.review_model,
      revision_cycle: 0,
      ...result,
    });
    console.log(`${result.verdict.toUpperCase()}: ${result.overall_assessment}`);
    for (const issue of result.issues) {
      console.log(`  [${issue.severity}] ${issue.criterion}: ${issue.problem}`);
    }
    console.log(`→ ${path}`);
  });

program
  .command("review-log")
  .description("Show review history for a category")
  .requiredOption("--category <slug>", "Category slug")
  .action(async (opts: { category: string }) => {
    const config = loadConfig();
    const { listReviewsForCategory } = await import("./agents/reviewer.js");
    const files = listReviewsForCategory(config.data_dir, opts.category);
    if (files.length === 0) {
      console.log(`No reviews for category ${opts.category}`);
      return;
    }
    const { readFileSync } = await import("node:fs");
    for (const f of files) {
      const abs = resolve(config.data_dir, "reviews", f);
      const r = JSON.parse(readFileSync(abs, "utf8"));
      console.log(
        `${r.review_date}  cycle=${r.revision_cycle}  ${r.verdict.toUpperCase()}  ${r.overall_assessment}`
      );
    }
  });

program
  .command("disagreements")
  .description("Run disagreement analysis per category and rebuild the index")
  .option("--category <slug>", "Run for a single category")
  .option("--summary", "Print summary counts only")
  .action(async (opts: { category?: string; summary?: boolean }) => {
    const config = loadConfig();
    ensureDataDirs(config.data_dir);
    const { rebuildDisagreementsIndex } = await import(
      "./disagreements-index.js"
    );
    if (opts.summary) {
      const idx = rebuildDisagreementsIndex(config.data_dir);
      console.log(`Total disagreements: ${idx.total_disagreements}`);
      console.log(`Last updated: ${idx.last_updated}`);
      for (const [cat, n] of Object.entries(idx.by_category)) {
        console.log(`  ${cat.padEnd(35)} ${n}`);
      }
      return;
    }
    const manifest = readManifest(config.data_dir);
    const { loadAllPracticeFiles, rebuildCategoryIndex, writeCategoryIndex } =
      await import("./category-index.js");
    const index = rebuildCategoryIndex(
      loadAllPracticeFiles(config.data_dir, manifest),
      manifest
    );
    writeCategoryIndex(config.data_dir, index);
    const { meetsDisagreementThreshold, runDisagreementAnalyst } = await import(
      "./agents/disagreement-analyst.js"
    );
    const categories = opts.category
      ? [opts.category]
      : Object.keys(index.categories).sort();
    for (const cat of categories) {
      const data = index.categories[cat];
      if (!data) {
        console.log(`skip ${cat}: unknown category`);
        continue;
      }
      if (!meetsDisagreementThreshold(data, config)) {
        console.log(
          `skip ${cat}: below threshold (practices=${data.practice_count}, episodes=${data.episode_sources.length})`
        );
        continue;
      }
      console.log(
        `analyzing ${cat} (${data.practice_count} practices from ${data.episode_sources.length} episodes)...`
      );
      try {
        const { file, path } = await runDisagreementAnalyst(cat, data, config);
        console.log(
          `  ${file.disagreements.length} disagreement${file.disagreements.length === 1 ? "" : "s"} → ${path}`
        );
      } catch (err) {
        console.error(
          `  ERROR ${cat}: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }
    const idx = rebuildDisagreementsIndex(config.data_dir);
    console.log(`Disagreements index: ${idx.total_disagreements} total`);
  });

program
  .command("analyze")
  .description("Generate per-episode analysis markdown")
  .option("--episode <n>", "Analyze a single episode", (v) => Number(v))
  .option("--all", "Analyze every processed episode")
  .action(async (opts: { episode?: number; all?: boolean }) => {
    const config = loadConfig();
    ensureDataDirs(config.data_dir);
    const manifest = readManifest(config.data_dir);
    const { computeEpisodeDiff, loadDiffInputs } = await import("./skill-diff.js");
    const { runEpisodeAnalyst, loadTranscript, listProcessedEpisodes } = await import(
      "./agents/episode-analyst.js"
    );
    let episodes: number[] = [];
    if (opts.all) {
      episodes = listProcessedEpisodes(manifest);
    } else if (opts.episode !== undefined) {
      episodes = [opts.episode];
    } else {
      console.error("Specify --episode <n> or --all");
      process.exit(1);
    }
    let failures = 0;
    for (const ep of episodes) {
      try {
        const inputs = loadDiffInputs(config.data_dir, config.skills_dir, ep);
        const diff = computeEpisodeDiff({
          episodeNumber: ep,
          episodePractices: inputs.episodePractices,
          categoryIndex: inputs.categoryIndex,
          disagreementFiles: inputs.disagreementFiles,
          skillsDir: inputs.skillsDir,
        });
        const transcript = loadTranscript(config.data_dir, ep);
        const { path, frontmatter, body } = await runEpisodeAnalyst(
          { transcript, diff },
          config
        );
        const wc = body.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
        console.log(
          `#${ep} → ${path} (${wc} words, skills=${frontmatter.skills_updated.length}, new-dis=${frontmatter.new_disagreements}, reinf-dis=${frontmatter.reinforced_disagreements})`
        );
      } catch (err) {
        failures += 1;
        console.error(
          `#${ep} FAILED: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }
    if (failures > 0) process.exitCode = 5;
  });

program
  .command("backfill")
  .description("Scrape and process all available episodes")
  .option("--no-floor", "Attempt episodes below min_episode_number too")
  .option("--concurrency <n>", "Override max_parallel_extractions", (v) => Number(v))
  .option("--limit <n>", "Cap the number of episodes processed this run (chronological from oldest)", (v) => Number(v))
  .option("--no-publish", "Skip the publisher step at the end (local artifacts still written)")
  .option(
    "--extract-only",
    "Stop after stage 3 (extraction + label curation). Skips disagreements, compile, analyses, publish. Useful for chunked backfills — run the downstream commands (disagreements / compile / analyze --all) once at the end."
  )
  .option("--dry-run", "Show what would change without writing files")
  .action(async (opts: {
    noFloor?: boolean;
    concurrency?: number;
    limit?: number;
    publish?: boolean;
    extractOnly?: boolean;
    dryRun?: boolean;
  }) => {
    const config = loadConfig();
    ensureDataDirs(config.data_dir);
    const { runPipeline, logSummary } = await import("./pipeline.js");
    const summary = await runPipeline(config, {
      dryRun: opts.dryRun,
      backfill: true,
      noFloor: opts.noFloor,
      concurrency: opts.concurrency,
      limit: opts.limit,
      // commander inverts --no-publish: opts.publish is false when flag is present,
      // undefined (treated as true) otherwise.
      noPublish: opts.publish === false,
      extractOnly: opts.extractOnly,
    });
    if (opts.dryRun) {
      console.log(`backfill candidates: ${summary.new_episodes.length}`);
      for (const e of summary.new_episodes.slice(0, 50)) {
        console.log(`  - #${e.episode_number} ${e.title}`);
      }
      if (summary.new_episodes.length > 50) {
        console.log(`  ... ${summary.new_episodes.length - 50} more`);
      }
      return;
    }
    logSummary(summary);
  });

program.parseAsync(process.argv).catch((err) => {
  console.error(err);
  process.exit(1);
});
