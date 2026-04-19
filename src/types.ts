export const CATEGORIES = [
  "positioning-and-messaging",
  "content-strategy",
  "demand-generation",
  "paid-media",
  "linkedin-marketing",
  "email-marketing",
  "website-optimization",
  "abm-account-based-marketing",
  "sales-marketing-alignment",
  "marketing-measurement",
  "brand-building",
  "product-marketing",
  "marketing-leadership",
  "career-development",
  "marketing-operations",
  "outbound-and-prospecting",
  "events-and-community",
  "ai-in-marketing",
  "creative-and-design",
  "customer-marketing",
  "uncategorized",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type EpisodeStatus =
  | "new"
  | "scrape_failed"
  | "no_transcript"
  | "processed"
  | "processed_no_practices"
  | "extraction_failed"
  | "compilation_failed"
  | "review_failed"
  | "needs_rewrite"
  | "review_stalled";

export interface ManifestEpisode {
  episode_number: number;
  title: string;
  date: string;
  rss_guid: string;
  episode_url: string;
  transcript_file?: string;
  practices_file?: string;
  status: EpisodeStatus;
  processed_at?: string;
}

export interface Manifest {
  episodes: ManifestEpisode[];
  last_checked: string;
}

export interface TranscriptLine {
  speaker: string;
  timestamp: string;
  text: string;
}

export interface TranscriptFile {
  episode_number: number;
  title: string;
  date: string;
  guest: string;
  guest_title: string;
  episode_url: string;
  show_notes: string;
  timestamps: string[];
  transcript: TranscriptLine[];
  full_text: string;
}

export interface PracticeEvidence {
  speaker: string;
  approx_timestamp: string;
  content: string;
}

export interface Practice {
  practice_id: string;
  title: string;
  description: string;
  direct_evidence: PracticeEvidence[];
  categories: string[];
  specificity_score: number;
  guest_name: string;
  guest_context: string;
}

export interface PracticesFile {
  episode_number: number;
  title: string;
  guest: string;
  extraction_date: string;
  extraction_model: string;
  practices: Practice[];
}

export interface CategoryIndexEntry {
  practice_id: string;
  episode_number: number;
  title: string;
  description: string;
  guest_name: string;
  episode_date: string;
  specificity_score: number;
}

export interface CategoryIndexCategory {
  practice_count: number;
  episode_sources: number[];
  practices: CategoryIndexEntry[];
}

export interface CategoryIndex {
  categories: Record<string, CategoryIndexCategory>;
  last_updated: string;
}

export interface DisagreementSupporter {
  guest_name: string;
  guest_context: string;
  episode_number: number;
  episode_date: string;
  evidence: string;
  practice_id: string;
}

export interface DisagreementPosition {
  position_id: string;
  stance: string;
  supporters: DisagreementSupporter[];
}

export interface Disagreement {
  disagreement_id: string;
  title: string;
  category: string;
  positions: DisagreementPosition[];
  support_summary: string;
  context_dependency: string;
  trend_note: string | null;
  why_it_matters: string;
}

export interface DisagreementsFile {
  category: string;
  analysis_date: string;
  analysis_model: string;
  analysis_runs: number;
  filtered_count: number;
  disagreements: Disagreement[];
}

export interface DisagreementsIndex {
  total_disagreements: number;
  by_category: Record<string, number>;
  last_updated: string;
}

export interface ReviewIssue {
  criterion:
    | "monday_morning_test"
    | "source_contamination"
    | "attribution"
    | "disagreement_handling"
    | "skill_differentiation"
    | "structural";
  severity: "minor" | "major" | "critical";
  location: string;
  problem: string;
  suggested_fix: string;
}

export interface ReviewResult {
  verdict: "pass" | "revise" | "reject";
  overall_assessment: string;
  issues: ReviewIssue[];
  strengths: string[];
}

export interface ReviewRecord extends ReviewResult {
  category: string;
  review_date: string;
  review_model: string;
  revision_cycle: number;
}

export interface Config {
  rss_feed_url: string;
  base_episode_url: string;
  scrape_delay_ms: number;
  min_episode_number: number;
  min_specificity_score: number;
  min_practices_for_disagreement_analysis: number;
  min_episodes_for_disagreement_analysis: number;
  extraction_model: string;
  compilation_model: string;
  review_model: string;
  disagreement_model: string;
  analyst_model: string;
  max_revision_cycles: number;
  max_parallel_extractions: number;
  max_parallel_skill_compilations: number;
  data_dir: string;
  skills_dir: string;
}
