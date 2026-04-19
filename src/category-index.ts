import { readFileSync, writeFileSync, renameSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type {
  CategoryIndex,
  CategoryIndexCategory,
  CategoryIndexEntry,
  Manifest,
  PracticesFile,
} from "./types.js";

export function categoryIndexPath(dataDir: string): string {
  return resolve(dataDir, "category_index.json");
}

export function readCategoryIndex(dataDir: string): CategoryIndex {
  const path = categoryIndexPath(dataDir);
  if (!existsSync(path)) {
    return { categories: {}, last_updated: new Date(0).toISOString() };
  }
  return JSON.parse(readFileSync(path, "utf8")) as CategoryIndex;
}

export function writeCategoryIndex(dataDir: string, index: CategoryIndex): void {
  const path = categoryIndexPath(dataDir);
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, JSON.stringify(index, null, 2));
  renameSync(tmp, path);
}

function episodeDateFor(
  manifest: Manifest,
  episodeNumber: number
): string {
  return (
    manifest.episodes.find((e) => e.episode_number === episodeNumber)?.date ?? ""
  );
}

function toEntry(
  practiceFile: PracticesFile,
  practice: PracticesFile["practices"][number],
  manifest: Manifest
): CategoryIndexEntry {
  return {
    practice_id: practice.practice_id,
    episode_number: practiceFile.episode_number,
    title: practice.title,
    description: practice.description,
    guest_name: practice.guest_name,
    episode_date: episodeDateFor(manifest, practiceFile.episode_number),
    specificity_score: practice.specificity_score,
  };
}

function upsertCategory(
  category: CategoryIndexCategory | undefined,
  entry: CategoryIndexEntry
): CategoryIndexCategory {
  const base: CategoryIndexCategory = category ?? {
    practice_count: 0,
    episode_sources: [],
    practices: [],
  };
  const filtered = base.practices.filter(
    (p) =>
      !(
        p.practice_id === entry.practice_id &&
        p.episode_number === entry.episode_number
      )
  );
  filtered.push(entry);
  filtered.sort((a, b) => {
    if (a.episode_date !== b.episode_date) {
      return a.episode_date < b.episode_date ? 1 : -1;
    }
    return a.practice_id < b.practice_id ? -1 : 1;
  });
  const episodes = new Set(filtered.map((p) => p.episode_number));
  return {
    practice_count: filtered.length,
    episode_sources: [...episodes].sort((a, b) => b - a),
    practices: filtered,
  };
}

export function mergePracticesIntoIndex(
  index: CategoryIndex,
  practiceFiles: PracticesFile[],
  manifest: Manifest
): CategoryIndex {
  const next: CategoryIndex = {
    categories: { ...index.categories },
    last_updated: new Date().toISOString(),
  };
  for (const pf of practiceFiles) {
    for (const practice of pf.practices) {
      const entry = toEntry(pf, practice, manifest);
      for (const cat of practice.categories) {
        next.categories[cat] = upsertCategory(next.categories[cat], entry);
      }
    }
  }
  return next;
}

export function rebuildCategoryIndex(
  practiceFiles: PracticesFile[],
  manifest: Manifest
): CategoryIndex {
  return mergePracticesIntoIndex(
    { categories: {}, last_updated: new Date(0).toISOString() },
    practiceFiles,
    manifest
  );
}

export function loadAllPracticeFiles(dataDir: string, manifest: Manifest): PracticesFile[] {
  const files: PracticesFile[] = [];
  for (const ep of manifest.episodes) {
    if (!ep.practices_file) continue;
    const abs = resolve(ep.practices_file);
    if (!existsSync(abs)) continue;
    files.push(JSON.parse(readFileSync(abs, "utf8")) as PracticesFile);
  }
  return files;
}
