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
import { runLabelCurator } from "./agents/label-curator.js";
import {
  loadAllPracticeFiles,
  rebuildCategoryIndex,
  writeCategoryIndex,
  meetsSkillPromotionThreshold,
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
import { getUsage, estimateCost } from "./anthropic.js";

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
  /** Cap the number of episodes processed this run (applied after chronological sort). */
  limit?: number;
  /** Skip the publisher step at the end. Local artifacts still get written. */
  noPublish?: boolean;
}

export interface RunSummary {
  new_episodes: ManifestEpisode[];
  scraped: number;
  extracted: { episode: number; practice_count: number }[];
  curated: { episode: number; new_labels: string[] }[];
  scrape_failed: number[];
  no_transcript: number[];
  extraction_failed: number[];
  curation_failed: number[];
  affected_labels: string[];
  promoted_labels: string[];
  below_threshold_labels: string[];
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

function affectedLabelsFor(
  practicesFiles: PracticesFile[]
): string[] {
  const out = new Set<string>();
  for (const f of practicesFiles) {
    for (const p of f.practices) {
      const labels = p.assigned_labels.length > 0 ? p.assigned_labels : p.proposed_labels;
      for (const c of labels) out.add(c);
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
    curated: [],
    scrape_failed: [],
    no_transcript: [],
    extraction_failed: [],
    curation_failed: [],
    affected_labels: [],
    promoted_labels: [],
    below_threshold_labels: [],
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
  // Chronological ordering (oldest first) is required: the label library is
  // incremental, and the curator's decisions depend on what it has seen so far.
  newEpisodes.sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? -1 : 1;
    return a.episode_number - b.episode_number;
  });
  // Dedupe by episode_number. Transistor occasionally tags two different items
  // with the same itunes:episode value; the chronological sort above means the
  // earliest one wins. Warn loudly on each skip so the drop is auditable.
  {
    const seen = new Set<number>();
    const deduped: ManifestEpisode[] = [];
    for (const e of newEpisodes) {
      if (seen.has(e.episode_number)) {
        console.warn(
          `[pipeline] duplicate episode_number ${e.episode_number}: dropping later item "${e.title.slice(0, 80)}"`
        );
        continue;
      }
      seen.add(e.episode_number);
      deduped.push(e);
    }
    newEpisodes = deduped;
  }
  if (opts.limit !== undefined && opts.limit > 0) {
    // Apply the limit only to episodes that have a transcript URL, so that a
    // limit of N yields N actual extractions instead of burning the cap on
    // older items that will resolve to no_transcript. Episodes without a
    // transcript URL are still included in newEpisodes so the pipeline marks
    // them appropriately — we just don't count them against the cap.
    const rssByNumber = new Map(
      rssEpisodes.map((r) => [r.episode.episode_number, r])
    );
    let kept = 0;
    newEpisodes = newEpisodes.filter((e) => {
      const rssEntry = rssByNumber.get(e.episode_number);
      if (!rssEntry?.transcript_url) return false;
      if (kept >= opts.limit!) return false;
      kept += 1;
      return true;
    });
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

  // --- Step 3: scrape + extract + curate (SEQUENTIAL across episodes) ---
  // The label library is incremental; each episode sees the labels that
  // existed when it ran. Running in parallel would let later episodes see
  // labels created by earlier ones only by race timing, distorting the curator.
  for (let idx = 0; idx < newEpisodes.length; idx++) {
    const ep = newEpisodes[idx]!;
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
      continue;
    }
    const { outcome, err } = await scrapeOne(rssEntry, config);
    if (outcome === "no_transcript") {
      summary.no_transcript.push(ep.episode_number);
      manifest = setStatus(
        readManifest(config.data_dir),
        ep.episode_number,
        "no_transcript"
      );
      writeManifest(config.data_dir, manifest);
      continue;
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
      continue;
    }
    summary.scraped += 1;

    // Agent 1: extraction.
    let practiceCount = 0;
    try {
      const { practicesFile, path } = await runExtractor(
        ep.episode_number,
        config,
        manifest
      );
      practiceCount = practicesFile.practices.length;
      summary.extracted.push({
        episode: ep.episode_number,
        practice_count: practiceCount,
      });
      manifest = setStatus(
        readManifest(config.data_dir),
        ep.episode_number,
        practiceCount === 0 ? "processed_no_practices" : "new",
        {
          practices_file: path,
          transcript_file: resolve(
            config.data_dir,
            "transcripts",
            `${ep.episode_number}.json`
          ),
        }
      );
      writeManifest(config.data_dir, manifest);
    } catch (agentErr) {
      const msg = agentErr instanceof Error ? agentErr.message : String(agentErr);
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
      continue;
    }

    if (practiceCount === 0) {
      // Nothing to curate; keep the processed_no_practices status.
      continue;
    }

    // Agent 1.5: label curation. Updates practices/{n}.json with assigned_labels
    // and appends to data/labels.json.
    try {
      const curatorResult = await runLabelCurator(
        ep.episode_number,
        config,
        ep.date
      );
      summary.curated.push({
        episode: ep.episode_number,
        new_labels: curatorResult.newLabels,
      });
      if (curatorResult.splitCandidates.length > 0) {
        for (const s of curatorResult.splitCandidates) {
          console.log(
            `[pipeline] ep ${ep.episode_number} split candidate: ${s.existing_label} — ${s.reason}`
          );
        }
      }
      manifest = setStatus(
        readManifest(config.data_dir),
        ep.episode_number,
        "processed",
        { processed_at: new Date().toISOString() }
      );
      writeManifest(config.data_dir, manifest);
    } catch (curErr) {
      const msg = curErr instanceof Error ? curErr.message : String(curErr);
      console.error(
        `[pipeline] ep ${ep.episode_number} label curation failed: ${msg}`
      );
      summary.curation_failed.push(ep.episode_number);
      manifest = setStatus(
        readManifest(config.data_dir),
        ep.episode_number,
        "curation_failed"
      );
      writeManifest(config.data_dir, manifest);
    }
  }

  // --- Step 4 + 5: rebuild category index from ALL processed episodes ---
  manifest = readManifest(config.data_dir);
  manifest = { ...manifest, last_checked: new Date().toISOString() };
  writeManifest(config.data_dir, manifest);

  const practiceFiles = loadAllPracticeFiles(config.data_dir, manifest);
  const index = rebuildCategoryIndex(practiceFiles, manifest);
  writeCategoryIndex(config.data_dir, index);

  // Labels touched by THIS run's newly-extracted episodes.
  const thisRunPractices = newEpisodes
    .map((e) =>
      practiceFiles.find((pf) => pf.episode_number === e.episode_number)
    )
    .filter((pf): pf is PracticesFile => Boolean(pf));
  summary.affected_labels = affectedLabelsFor(thisRunPractices);

  // --- Step 6: promotion-threshold gate ---
  // Labels below the skill promotion threshold stay as tags; no SKILL.md is
  // compiled for them. This keeps the skills library curated.
  const promoted: string[] = [];
  const belowThreshold: string[] = [];
  for (const lbl of summary.affected_labels) {
    const data = index.categories[lbl];
    if (
      data &&
      meetsSkillPromotionThreshold(data, config.min_practices_for_skill_promotion)
    ) {
      promoted.push(lbl);
    } else {
      belowThreshold.push(lbl);
    }
  }
  summary.promoted_labels = promoted;
  summary.below_threshold_labels = belowThreshold;

  // --- Step 7 + 8: disagreements on promoted labels (same threshold) ---
  const disagreementLimit = pLimit(config.max_parallel_skill_compilations);
  const eligibleCategories = promoted.filter((cat) => {
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

  // --- Step 9: compile + review promoted labels only ---
  const compileLimit = pLimit(config.max_parallel_skill_compilations);
  await Promise.all(
    promoted.map((cat) =>
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
  if (opts.noPublish) {
    console.log("[pipeline] skipping publish step (--no-publish)");
  } else {
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
  }

  return summary;
}

export function logSummary(summary: RunSummary): void {
  console.log("\n=== run summary ===");
  console.log(`new episodes:           ${summary.new_episodes.length}`);
  console.log(`scraped:                ${summary.scraped}`);
  console.log(`extracted:              ${summary.extracted.length}`);
  console.log(`curated:                ${summary.curated.length}`);
  console.log(`scrape_failed:          ${summary.scrape_failed.length}`);
  console.log(`no_transcript:          ${summary.no_transcript.length}`);
  console.log(`extraction_failed:      ${summary.extraction_failed.length}`);
  console.log(`curation_failed:        ${summary.curation_failed.length}`);
  console.log(`affected labels:        ${summary.affected_labels.length}`);
  console.log(`promoted (>= threshold):${summary.promoted_labels.length}`);
  console.log(`below threshold:        ${summary.below_threshold_labels.length}`);
  console.log(`skills compiled:`);
  for (const s of summary.skills_compiled) {
    console.log(
      `  ${s.status.padEnd(16)} ${s.category.padEnd(32)} cycles=${s.cycles}${
        s.error ? " err=" + s.error.slice(0, 80) : ""
      }`
    );
  }
  console.log(`episode analyses:       ${summary.episode_analyses.length}`);

  const usage = getUsage();
  const perModel = Object.entries(usage);
  if (perModel.length > 0) {
    const cost = estimateCost(usage);
    console.log(`api usage (this process):`);
    for (const [model, u] of perModel) {
      console.log(
        `  ${model.padEnd(32)} calls=${u.call_count} in=${u.input_tokens} out=${u.output_tokens}`
      );
    }
    console.log(`  total cost estimate:        $${cost.total_usd.toFixed(4)}`);
  }

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
