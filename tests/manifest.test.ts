import { mkdtempSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  readManifest,
  writeManifest,
  upsertEpisode,
  setStatus,
  findNewEpisodes,
  manifestPath,
} from "../src/manifest.js";
import type { Manifest, ManifestEpisode } from "../src/types.js";

let dataDir: string;

beforeEach(() => {
  dataDir = mkdtempSync(resolve(tmpdir(), "e5-manifest-"));
});

afterEach(() => {
  rmSync(dataDir, { recursive: true, force: true });
});

function sampleEpisode(n: number, overrides: Partial<ManifestEpisode> = {}): ManifestEpisode {
  return {
    episode_number: n,
    title: `Episode ${n}`,
    date: "2026-01-01",
    rss_guid: `guid-${n}`,
    episode_url: `https://exitfive.com/podcast/episode-${n}`,
    status: "new",
    ...overrides,
  };
}

describe("manifest read/write", () => {
  it("returns an empty manifest when file does not exist", () => {
    const m = readManifest(dataDir);
    expect(m.episodes).toEqual([]);
  });

  it("atomic write: file contents equal what was written", () => {
    const m: Manifest = {
      episodes: [sampleEpisode(100)],
      last_checked: "2026-04-18T00:00:00Z",
    };
    writeManifest(dataDir, m);
    const raw = readFileSync(manifestPath(dataDir), "utf8");
    expect(JSON.parse(raw)).toEqual(m);
  });

  it("round-trips via readManifest", () => {
    const m: Manifest = {
      episodes: [sampleEpisode(100), sampleEpisode(200)],
      last_checked: "2026-04-18T00:00:00Z",
    };
    writeManifest(dataDir, m);
    expect(readManifest(dataDir)).toEqual(m);
  });
});

describe("upsertEpisode", () => {
  it("adds a new episode and sorts by number desc", () => {
    let m: Manifest = { episodes: [], last_checked: "" };
    m = upsertEpisode(m, sampleEpisode(200));
    m = upsertEpisode(m, sampleEpisode(346));
    m = upsertEpisode(m, sampleEpisode(100));
    expect(m.episodes.map((e) => e.episode_number)).toEqual([346, 200, 100]);
  });

  it("merges into an existing episode rather than duplicating", () => {
    let m: Manifest = { episodes: [sampleEpisode(346)], last_checked: "" };
    m = upsertEpisode(m, sampleEpisode(346, { title: "New Title", status: "processed" }));
    expect(m.episodes).toHaveLength(1);
    expect(m.episodes[0]!.title).toBe("New Title");
    expect(m.episodes[0]!.status).toBe("processed");
  });
});

describe("setStatus", () => {
  it("updates status and extras for an existing episode", () => {
    let m: Manifest = { episodes: [sampleEpisode(346)], last_checked: "" };
    m = setStatus(m, 346, "processed", { processed_at: "2026-04-18T01:00:00Z" });
    expect(m.episodes[0]!.status).toBe("processed");
    expect(m.episodes[0]!.processed_at).toBe("2026-04-18T01:00:00Z");
  });

  it("is a no-op when the episode is unknown", () => {
    const before: Manifest = { episodes: [sampleEpisode(100)], last_checked: "" };
    const after = setStatus(before, 999, "processed");
    expect(after).toEqual(before);
  });
});

describe("findNewEpisodes", () => {
  it("returns feed episodes above the floor that are not in the manifest", () => {
    const manifest: Manifest = {
      episodes: [sampleEpisode(200), sampleEpisode(300)],
      last_checked: "",
    };
    const feed = [sampleEpisode(149), sampleEpisode(200), sampleEpisode(346)];
    const newEps = findNewEpisodes(manifest, feed, 150);
    expect(newEps.map((e) => e.episode_number)).toEqual([346]);
  });
});
