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
    let manifest = readManifest(config.data_dir);
    const rssEpisodes = await fetchRssEpisodes(
      config.rss_feed_url,
      config.base_episode_url
    );
    const feedAsManifest = rssEpisodes.map((r) => r.episode);
    const newEpisodes = findNewEpisodes(manifest, feedAsManifest, config.min_episode_number);
    console.log(`RSS feed: ${rssEpisodes.length} episodes`);
    console.log(`Manifest: ${manifest.episodes.length} known`);
    console.log(
      `New (>= ep ${config.min_episode_number}): ${newEpisodes.length}`
    );
    if (opts.dryRun) {
      for (const e of newEpisodes.slice(0, 20)) {
        console.log(`  - #${e.episode_number} ${e.title}`);
      }
      return;
    }
    for (const e of newEpisodes) {
      manifest = upsertEpisode(manifest, e);
    }
    for (const e of newEpisodes) {
      manifest = await scrapeAndSave(rssEpisodes, manifest, config.data_dir, e);
      writeManifest(config.data_dir, manifest);
      await delay(config.scrape_delay_ms);
    }
    manifest = { ...manifest, last_checked: new Date().toISOString() };
    writeManifest(config.data_dir, manifest);
    console.log("Phase 1: extraction, compilation, and publish NOT wired yet.");
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

// Placeholder commands (not implemented in Phase 1/2)
for (const [name, desc] of [
  ["backfill", "Scrape and process all available episodes"],
  ["compile", "Recompile skills from practice data"],
  ["review", "Re-review a specific skill"],
  ["disagreements", "Run disagreement analysis"],
  ["analyze", "Regenerate episode analysis"],
  ["review-log", "Show review history for a category"],
] as const) {
  program
    .command(name)
    .description(`${desc} (not implemented yet)`)
    .action(() => {
      console.error(`Command "${name}" is not implemented yet.`);
      process.exit(64);
    });
}

program.parseAsync(process.argv).catch((err) => {
  console.error(err);
  process.exit(1);
});
