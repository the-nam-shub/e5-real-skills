import { readFileSync, writeFileSync, renameSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type {
  CuratorNewLabel,
  CuratorPracticeAssignment,
  LabelEntry,
  LabelsFile,
} from "./types.js";

export function labelsPath(dataDir: string): string {
  return resolve(dataDir, "labels.json");
}

export function readLabels(dataDir: string): LabelsFile {
  const path = labelsPath(dataDir);
  if (!existsSync(path)) {
    return { labels: {}, last_updated: new Date(0).toISOString() };
  }
  return JSON.parse(readFileSync(path, "utf8")) as LabelsFile;
}

export function writeLabels(dataDir: string, labels: LabelsFile): void {
  const path = labelsPath(dataDir);
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, JSON.stringify(labels, null, 2));
  renameSync(tmp, path);
}

/**
 * Apply a curator's output for one episode to the labels file.
 *
 * - Adds any brand-new labels the curator proposed, seeding
 *   first_introduced_{episode,date} and zero practice_count (incremented below).
 * - For every label actually assigned to any practice in this episode,
 *   increments practice_count by how many practices in this episode carry it,
 *   adds the episode to episode_sources, and updates last_practice_added_date.
 *
 * Pure function — does not touch disk.
 */
export function applyEpisodeToLabels(
  current: LabelsFile,
  input: {
    episodeNumber: number;
    episodeDate: string;
    assignments: CuratorPracticeAssignment[];
    newLabels: CuratorNewLabel[];
  }
): LabelsFile {
  const labels: Record<string, LabelEntry> = {};
  for (const [k, v] of Object.entries(current.labels)) {
    labels[k] = {
      ...v,
      episode_sources: [...v.episode_sources],
    };
  }

  // Seed new labels (if not already present).
  for (const nl of input.newLabels) {
    if (!labels[nl.label]) {
      labels[nl.label] = {
        description: nl.description,
        practice_count: 0,
        episode_sources: [],
        first_introduced_episode: input.episodeNumber,
        first_introduced_date: input.episodeDate,
        last_practice_added_date: input.episodeDate,
      };
    }
  }

  // Count per-label occurrences across practice_assignments for this episode.
  const perLabelPracticeCount = new Map<string, number>();
  for (const a of input.assignments) {
    for (const lbl of a.assigned_labels) {
      perLabelPracticeCount.set(lbl, (perLabelPracticeCount.get(lbl) ?? 0) + 1);
    }
  }

  for (const [label, count] of perLabelPracticeCount.entries()) {
    const entry = labels[label];
    if (!entry) {
      // The curator assigned a label that isn't in labels.json and isn't in new_labels.
      // This shouldn't happen if the curator follows the spec, but be defensive:
      // create a minimal entry so we don't drop practice counts on the floor.
      labels[label] = {
        description: "",
        practice_count: count,
        episode_sources: [input.episodeNumber],
        first_introduced_episode: input.episodeNumber,
        first_introduced_date: input.episodeDate,
        last_practice_added_date: input.episodeDate,
      };
      continue;
    }
    entry.practice_count += count;
    if (!entry.episode_sources.includes(input.episodeNumber)) {
      entry.episode_sources.push(input.episodeNumber);
      entry.episode_sources.sort((a, b) => b - a);
    }
    if (input.episodeDate > entry.last_practice_added_date) {
      entry.last_practice_added_date = input.episodeDate;
    }
  }

  return {
    labels,
    last_updated: new Date().toISOString(),
  };
}

export function meetsPromotionThreshold(
  label: LabelEntry,
  minPractices: number
): boolean {
  return label.practice_count >= minPractices;
}
