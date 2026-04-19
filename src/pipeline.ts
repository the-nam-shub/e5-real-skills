import pLimit from "p-limit";
import { resolve } from "node:path";
import { writeFileSync, renameSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { dirname } from "node:path";
import type {
  Config,
  Manifest,
  ManifestEpisode,
  PracticesFile,
  TranscriptFile,
} from "./types.js";
import {
  readManifest,
  writeManifest,
  upsertEpisode,
  setStatus,
  findNewEpisodes,
} from "./manifest.js";
import { fetchRssEpisodes, type RssEpisode } from "./rss.js";
import { scrapeEpisode, delay } from "./scraper.js";
import { runExtractor } from "./agents/extractor.js";
import {
  loadAllPracticeFiles,
  rebuildCategoryIndex,
  writeCategoryIndex,
} from "./category-index.js";
import {
  meetsDisagreementThreshold,
  runDisagreementAnalyst,
} from "./agents/disagreement-analyst.js";
import { rebuildDisagreementsIndex } from "./disagreements-index.js";
import { compileCategory } from "./compile.js";
import { computeEpisodeDiff, loadDiffInputs } from "./skill-diff.js";
import {
  runEpisodeAnalyst,
  loadTranscript,
} from "./agents/episode-analyst.js";
import { publish, type PublishResult } from "./publisher.js";

function writeJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, JSON.stringify(value, null, 2));
  renameSync(tmp, path);
}

export interface RunOptions {
  dryRun?: boolean;
  backfill?: boolean;
  noFloor?: boolean;
  concurrency?: number;
}

export interface RunSummary {
  new_episodes: ManifestEpisode[];
  scraped: number;
  extracted: { episode: number; practice_count: number }[];
  scrape_failed: number[];
  no_transcript: number[];
  extraction_failed: number[];
  affected_categories: string[];
  disagreements_per_category: Record<string, number>;
  disagreements_filtered: Record<string, number>;
  skills_compiled: Array<{
    category: string;
    status: "pass" | "review_stalled" | "needs_rewrite" | "error";
    cycles: number;
    error?: string;
  }>;
  episode_analyses: Array<{ episode: number; path: string; retried: boolean }>;
  publish?: PublishResult;
}

async function scrapeOne(
  rssEntry: RssEpisode,
  config: Config
): Promise<{ transcript?: TranscriptFile; outcome: "ok" | "no_transcript" | "scrape_failed"; err?: string }> {
  if (!rssEntry.transcript_url) {
    return { outcome: "no_transcript" };
  }
  try {
    const transcript = await scrapeEpisode(rssEntry);
    const transcriptPath = resolve(
      config.data_dir,
      "transcripts",
      `${rssEntry.episode.episode_number}.json`
    );
    writeJson(transcriptPath, transcript);
    return { transcript, outcome: "ok" };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg === "no_transcript") return { outcome: "no_transcript" };
    return { outcome: "scrape_failed", err: msg };
  }
}

function affectedCategoriesFor(
  practicesFiles: PracticesFile[]
): string[] {
  const out = new Set<string>();
  for (const f of practicesFiles) {
    for (const p of f.practices) {
      for (const c of p.categories) out.add(c);
    }
  }
  return [...out].sort();
}

export async function runPipeline(
  config: Config,
  opts: RunOptions = {}
): Promise<RunSummary> {
  const summary: RunSummary = {
    new_episodes: [],
    scraped: 0,
    extracted: [],
    scrape_failed: [],
    no_transcript: [],
    extraction_failed: [],
    affected_categories: [],
    disagreements_per_category: {},
    disagreements_filtered: {},
    skills_compiled: [],
    episode_analyses: [],
  };

  // --- Step 1 + 2: RSS + manifest diff ---
  let manifest = readManifest(config.data_dir);
  const rssEpisodes = await fetchRssEpisodes(
    config.rss_feed_url,
    config.base_episode_url
  );
  const feedAsManifest = rssEpisodes.map((r) => r.episode);

  let newEpisodes: ManifestEpisode[];
  if (opts.backfill) {
    const known = new Set(
      manifest.episodes
        .filter(
          (e) =>
            e.status === "processed" ||
            e.status === "processed_no_practices" ||
            e.status === "no_transcript"
        )
        .map((e) => e.episode_number)
    );
    const floor = opts.noFloor ? -Infinity : config.min_episode_number;
    newEpisodes = feedAsManifest.filter(
      (e) => !known.has(e.episode_number) && e.episode_number >= floor
    );
  } else {
    newEpisodes = findNewEpisodes(
      manifest,
      feedAsManifest,
      config.min_episode_number
    );
  }
  summary.new_episodes = newEpisodes;

  if (opts.dryRun) {
    manifest = { ...manifest, last_checked: new Date().toISOString() };
    writeManifest(config.data_dir, manifest);
    return summary;
  }

  // Upsert all new episodes into the manifest before starting.
  for (const e of newEpisodes) manifest = upsertEpisode(manifest, e);
  writeManifest(config.data_dir, manifest);

  // --- Step 3: scrape + extract (parallel, bounded) ---
  const extractionConcurrency = opts.concurrency ?? config.max_parallel_extractions;
  const extractLimit = pLimit(extractionConcurrency);
  const scrapedEpisodes: Array<{ episode: number; transcript: TranscriptFile }> = [];

  const scrapeTasks = newEpisodes.map((ep, idx) =>
    extractLimit(async () => {
      // Stagger to respect rate limits on the scrape endpoint.
      if (idx > 0) await delay(config.scrape_delay_ms);
      const rssEntry = rssEpisodes.find(
        (r) => r.episode.episode_number === ep.episode_number
      );
      if (!rssEntry) {
        summary.scrape_failed.push(ep.episode_number);
        manifest = setStatus(
          readManifest(config.data_dir),
          ep.episode_number,
          "scrape_failed"
        );
        writeManifest(config.data_dir, manifest);
        return;
      }
      const { transcript, outcome, err } = await scrapeOne(rssEntry, config);
      if (outcome === "no_transcript") {
        summary.no_transcript.push(ep.episode_number);
        manifest = setStatus(
          readManifest(config.data_dir),
          ep.episode_number,
          "no_transcript"
        );
        writeManifest(config.data_dir, manifest);
        return;
      }
      if (outcome === "scrape_failed") {
        console.error(
          `[pipeline] ep ${ep.episode_number} scrape failed: ${err ?? "unknown"}`
        );
        summary.scrape_failed.push(ep.episode_number);
        manifest = setStatus(
          readManifest(config.data_dir),
          ep.episode_number,
          "scrape_failed"
        );
        writeManifest(config.data_dir, manifest);
        return;
      }
      summary.scraped += 1;
      scrapedEpisodes.push({ episode: ep.episode_number, transcript: transcript! });

      // Immediately run Agent 1 on this episode.
      try {
        const { practicesFile, path } = await runExtractor(
          ep.episode_number,
          config,
          manifest
        );
        summary.extracted.push({
          episode: ep.episode_number,
          practice_count: practicesFile.practices.length,
        });
        manifest = setStatus(
          readManifest(config.data_dir),
          ep.episode_number,
          practicesFile.practices.length === 0
            ? "processed_no_practices"
            : "processed",
          {
            practices_file: path,
            processed_at: new Date().toISOString(),
            transcript_file: resolve(
              config.data_dir,
              "transcripts",
              `${ep.episode_number}.json`
            ),
          }
        );
        writeManifest(config.data_dir, manifest);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(
          `[pipeline] ep ${ep.episode_number} extraction failed: ${msg}`
        );
        summary.extraction_failed.push(ep.episode_number);
        manifest = setStatus(
          readManifest(config.data_dir),
          ep.episode_number,
          "extraction_failed"
        );
        writeManifest(config.data_dir, manifest);
      }
    })
  );
  await Promise.all(scrapeTasks);

  // --- Step 4 + 5: rebuild category index from ALL processed episodes ---
  manifest = readManifest(config.data_dir);
  manifest = { ...manifest, last_checked: new Date().toISOString() };
  writeManifest(config.data_dir, manifest);

  const practiceFiles = loadAllPracticeFiles(config.data_dir, manifest);
  const index = rebuildCategoryIndex(practiceFiles, manifest);
  writeCategoryIndex(config.data_dir, index);

  // Categories touched by THIS run's newly-extracted episodes.
  const thisRunPractices = newEpisodes
    .map((e) =>
      practiceFiles.find((pf) => pf.episode_number === e.episode_number)
    )
    .filter((pf): pf is PracticesFile => Boolean(pf));
  summary.affected_categories = affectedCategoriesFor(thisRunPractices);

  // --- Step 6 + 7 + 8: disagreements on eligible affected categories ---
  const disagreementLimit = pLimit(config.max_parallel_skill_compilations);
  const eligibleCategories = summary.affected_categories.filter((cat) => {
    const data = index.categories[cat];
    return data ? meetsDisagreementThreshold(data, config) : false;
  });
  await Promise.all(
    eligibleCategories.map((cat) =>
      disagreementLimit(async () => {
        const data = index.categories[cat]!;
        try {
          const { file } = await runDisagreementAnalyst(cat, data, config);
          summary.disagreements_per_category[cat] = file.disagreements.length;
          summary.disagreements_filtered[cat] = file.filtered_count;
        } catch (err) {
          console.error(
            `[pipeline] disagreement analysis failed for ${cat}: ${
              err instanceof Error ? err.message : String(err)
            }`
          );
        }
      })
    )
  );
  rebuildDisagreementsIndex(config.data_dir);

  // --- Step 9: compile + review affected categories ---
  const compileLimit = pLimit(config.max_parallel_skill_compilations);
  await Promise.all(
    summary.affected_categories.map((cat) =>
      compileLimit(async () => {
        try {
          const result = await compileCategory(cat, index, config);
          if (result.status === "pass") {
            summary.skills_compiled.push({
              category: cat,
              status: "pass",
              cycles: result.cycles,
            });
          } else if (result.status === "review_stalled") {
            summary.skills_compiled.push({
              category: cat,
              status: "review_stalled",
              cycles: result.cycles,
            });
            console.warn(
              `[pipeline] ${cat} review_stalled after ${result.cycles} cycles; published best draft`
            );
          } else {
            summary.skills_compiled.push({
              category: cat,
              status: "needs_rewrite",
              cycles: result.cycles,
              error: result.rejection.overall_assessment,
            });
            console.warn(
              `[pipeline] ${cat} rejected: ${result.rejection.overall_assessment}`
            );
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          summary.skills_compiled.push({
            category: cat,
            status: "error",
            cycles: 0,
            error: msg,
          });
          console.error(`[pipeline] ${cat} compile error: ${msg}`);
        }
      })
    )
  );

  // --- Step 10: episode analyses for each newly-processed episode ---
  const analystLimit = pLimit(config.max_parallel_skill_compilations);
  const processedThisRun = newEpisodes.filter((e) => {
    const entry = manifest.episodes.find(
      (m) => m.episode_number === e.episode_number
    );
    return entry?.status === "processed";
  });
  await Promise.all(
    processedThisRun.map((e) =>
      analystLimit(async () => {
        try {
          const inputs = loadDiffInputs(
            config.data_dir,
            config.skills_dir,
            e.episode_number
          );
          const diff = computeEpisodeDiff({
            episodeNumber: e.episode_number,
            episodePractices: inputs.episodePractices,
            categoryIndex: inputs.categoryIndex,
            disagreementFiles: inputs.disagreementFiles,
            skillsDir: inputs.skillsDir,
          });
          const transcript = loadTranscript(config.data_dir, e.episode_number);
          const { path, retried } = await runEpisodeAnalyst(
            { transcript, diff },
            config
          );
          summary.episode_analyses.push({
            episode: e.episode_number,
            path,
            retried,
          });
        } catch (err) {
          console.error(
            `[pipeline] episode analysis for #${e.episode_number} failed: ${
              err instanceof Error ? err.message : String(err)
            }`
          );
        }
      })
    )
  );

  // --- Step 11 + 12: publish ---
  try {
    summary.publish = await publish(
      { data_dir: config.data_dir, skills_dir: config.skills_dir },
      { episodesThisRun: processedThisRun }
    );
  } catch (err) {
    console.error(
      `[pipeline] publish failed: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  return summary;
}

export function logSummary(summary: RunSummary): void {
  console.log("\n=== run summary ===");
  console.log(`new episodes:           ${summary.new_episodes.length}`);
  console.log(`scraped:                ${summary.scraped}`);
  console.log(`extracted:              ${summary.extracted.length}`);
  console.log(`scrape_failed:          ${summary.scrape_failed.length}`);
  console.log(`no_transcript:          ${summary.no_transcript.length}`);
  console.log(`extraction_failed:      ${summary.extraction_failed.length}`);
  console.log(`affected categories:    ${summary.affected_categories.length}`);
  console.log(`skills compiled:`);
  for (const s of summary.skills_compiled) {
    console.log(
      `  ${s.status.padEnd(16)} ${s.category.padEnd(32)} cycles=${s.cycles}${
        s.error ? " err=" + s.error.slice(0, 80) : ""
      }`
    );
  }
  console.log(`episode analyses:       ${summary.episode_analyses.length}`);
  if (summary.publish) {
    console.log(
      `publish: changed=${summary.publish.changed} copied_disagreements=${summary.publish.copied_disagreements.length} copied_analyses=${summary.publish.copied_analyses.length}`
    );
    if (summary.publish.commit) {
      console.log(
        `  commit ${summary.publish.commit.hash.slice(0, 8)} pushed=${summary.publish.commit.pushed}${
          summary.publish.commit.push_error ? " push_error=" + summary.publish.commit.push_error : ""
        }`
      );
    }
  }
}
