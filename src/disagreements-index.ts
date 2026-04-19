import {
  readdirSync,
  readFileSync,
  writeFileSync,
  renameSync,
  mkdirSync,
  existsSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import type { DisagreementsFile, DisagreementsIndex } from "./types.js";

export function disagreementsIndexPath(dataDir: string): string {
  return resolve(dataDir, "disagreements", "_index.json");
}

function disagreementsDir(dataDir: string): string {
  return resolve(dataDir, "disagreements");
}

export function loadAllDisagreementFiles(dataDir: string): DisagreementsFile[] {
  const dir = disagreementsDir(dataDir);
  if (!existsSync(dir)) return [];
  const files: DisagreementsFile[] = [];
  for (const name of readdirSync(dir)) {
    if (name === "_index.json" || !name.endsWith(".json")) continue;
    const abs = resolve(dir, name);
    files.push(JSON.parse(readFileSync(abs, "utf8")) as DisagreementsFile);
  }
  return files;
}

export function buildDisagreementsIndex(
  files: DisagreementsFile[]
): DisagreementsIndex {
  const byCategory: Record<string, number> = {};
  let total = 0;
  for (const f of files) {
    const count = f.disagreements.length;
    if (count === 0) continue;
    byCategory[f.category] = (byCategory[f.category] ?? 0) + count;
    total += count;
  }
  // Stable key order: sort categories by count desc, then slug asc.
  const ordered: Record<string, number> = {};
  for (const [cat, n] of Object.entries(byCategory).sort((a, b) => {
    if (a[1] !== b[1]) return b[1] - a[1];
    return a[0] < b[0] ? -1 : 1;
  })) {
    ordered[cat] = n;
  }
  return {
    total_disagreements: total,
    by_category: ordered,
    last_updated: new Date().toISOString(),
  };
}

export function writeDisagreementsIndex(
  dataDir: string,
  index: DisagreementsIndex
): string {
  const path = disagreementsIndexPath(dataDir);
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, JSON.stringify(index, null, 2));
  renameSync(tmp, path);
  return path;
}

export function rebuildDisagreementsIndex(dataDir: string): DisagreementsIndex {
  const files = loadAllDisagreementFiles(dataDir);
  const index = buildDisagreementsIndex(files);
  writeDisagreementsIndex(dataDir, index);
  return index;
}
