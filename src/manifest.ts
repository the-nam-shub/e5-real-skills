import { readFileSync, writeFileSync, renameSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type { Manifest, ManifestEpisode, EpisodeStatus } from "./types.js";

export function manifestPath(dataDir: string): string {
  return resolve(dataDir, "manifest.json");
}

export function readManifest(dataDir: string): Manifest {
  const path = manifestPath(dataDir);
  if (!existsSync(path)) {
    return { episodes: [], last_checked: new Date(0).toISOString() };
  }
  const raw = readFileSync(path, "utf8");
  return JSON.parse(raw) as Manifest;
}

export function writeManifest(dataDir: string, manifest: Manifest): void {
  const path = manifestPath(dataDir);
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, JSON.stringify(manifest, null, 2));
  renameSync(tmp, path);
}

export function upsertEpisode(
  manifest: Manifest,
  episode: ManifestEpisode
): Manifest {
  const existingIdx = manifest.episodes.findIndex(
    (e) => e.episode_number === episode.episode_number
  );
  const nextEpisodes = [...manifest.episodes];
  if (existingIdx === -1) {
    nextEpisodes.push(episode);
  } else {
    const existing = nextEpisodes[existingIdx]!;
    nextEpisodes[existingIdx] = { ...existing, ...episode };
  }
  nextEpisodes.sort((a, b) => b.episode_number - a.episode_number);
  return { ...manifest, episodes: nextEpisodes };
}

export function setStatus(
  manifest: Manifest,
  episodeNumber: number,
  status: EpisodeStatus,
  extras: Partial<ManifestEpisode> = {}
): Manifest {
  const idx = manifest.episodes.findIndex((e) => e.episode_number === episodeNumber);
  if (idx === -1) return manifest;
  const nextEpisodes = [...manifest.episodes];
  const existing = nextEpisodes[idx]!;
  nextEpisodes[idx] = {
    ...existing,
    ...extras,
    status,
  };
  return { ...manifest, episodes: nextEpisodes };
}

export function getEpisode(
  manifest: Manifest,
  episodeNumber: number
): ManifestEpisode | undefined {
  return manifest.episodes.find((e) => e.episode_number === episodeNumber);
}

export function findNewEpisodes(
  manifest: Manifest,
  feedEpisodes: ManifestEpisode[],
  minEpisodeNumber: number
): ManifestEpisode[] {
  const known = new Set(manifest.episodes.map((e) => e.episode_number));
  return feedEpisodes.filter(
    (e) => !known.has(e.episode_number) && e.episode_number >= minEpisodeNumber
  );
}
