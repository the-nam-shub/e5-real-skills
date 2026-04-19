# Exit Five Skills Engine - Claude Code Spec

## What This Is

A CLI application that ingests every Exit Five podcast transcript, extracts specific and actionable B2B marketing best practices, and publishes them as Claude-compatible skill files in a public GitHub repository. Skills are automatically maintained as new episodes drop.

The core constraint: **skills contain ONLY practices sourced from transcripts. No general knowledge fill. No extrapolation.** If a topic has thin coverage across episodes, the skill stays thin until more episodes cover it. This is what separates this from every other "Claude skills pack" on GitHub.

**Scope for this build:** Pipeline and CLI only. A static marketing site will eventually consume `data/episode-analyses/` and `data/disagreements/` — maintain those output formats exactly as specified, but do not build the site or any site scaffolding as part of this work.

---

## Architecture Overview

```
RSS Feed (Transistor)
    │
    ▼
Episode Detector → Transcript Scraper → Transcript Store
    │
    ▼
Agent 1: Extractor (per-episode, pulls + scores + tags practices)
    │
    ▼
Practice Store → Deterministic merge into Category Index
    │
    ├───────────────────────────────────┐
    ▼                                   ▼
Agent 4: Disagreement Analyst       Agent 2: Skill Writer
(per-category, cross-episode)       (per-category, with disagreements as input)
    │                                   │
    ▼                                   ▼
Disagreement Store                  Agent 3: Skill Reviewer
    │                                (adversarial QA, max 2 revise cycles)
    │                                   │
    ▼                                   ▼
    └──────────► Agent 5: Episode Analyst
                 (per-episode, generates markdown post)
                     │
                     ▼
                 Episode Analysis Store
                     │
                     ▼
                 GitHub Publisher (skills + disagreements + analyses → public repo)
                     │
                     ▼
                 Website Build (static site generator pulls from repo)
```

### Agent Design Rationale

The pipeline uses five specialized agents rather than one general-purpose agent. Each agent has a distinct system prompt optimized for its task, and critically, no agent evaluates its own output.

- **Agent 1 (Extractor)** operates on a single transcript at a time. Its only job is determining whether something is specific enough to qualify as a practice. It never sees the skill files.
- **Agent 2 (Skill Writer)** operates on structured practice objects across many episodes. It never touches raw transcripts. This separation prevents it from inventing context that wasn't in the extraction. It receives disagreement data from Agent 4 so it can surface conflicts rather than trying to detect them itself.
- **Agent 3 (Skill Reviewer)** is adversarial. It reads the compiled skill with no knowledge of what the writer was "trying" to do. Its job is to catch the failure modes that self-review misses: practices that sound specific but aren't, general knowledge that leaked in, conflicts that got papered over.
- **Agent 4 (Disagreement Analyst)** runs independently from the skill pipeline. It compares practices across episodes within each category to find genuine expert disagreements and classifies their shape (direct opposition, consensus with dissent, split views, emerging shift, or benchmark spread). Its output is both a standalone data product and an input to the Skill Writer.
- **Agent 5 (Episode Analyst)** runs once per episode after everything else completes. It produces a publishable markdown post summarizing what the episode contributed: new practices, skill updates, and disagreement activity. This is the content engine feeding the website.

---

## Component Specs

### 1. Episode Detector

**Input:** RSS feed at `https://feeds.transistor.fm/exit-five-podcast`

**Behavior:**
- Parse the RSS XML feed to get the full episode list with titles, publish dates, and GUIDs
- Compare against a local manifest file (`data/manifest.json`) that tracks all known episodes and their processing status
- Flag any episodes present in the feed but absent from the manifest as "new"
- The RSS feed may not include direct links to the exitfive.com episode pages. If it doesn't, derive the episode URL slug from the episode title using the same slugification pattern the site uses (lowercase, hyphens, strip punctuation). The episode page URL pattern is: `https://exitfive.com/podcast/{slug}`
- If the RSS feed URL format changes or becomes unavailable, fall back to scraping the podcast listing page at `https://exitfive.com/podcast` with pagination via `?b8eb0976_page={n}` query param

**Output:** List of new episode objects: `{ title, date, rss_guid, episode_number, episode_url }`

**Manifest schema (`data/manifest.json`):**
```json
{
  "episodes": [
    {
      "episode_number": 346,
      "title": "Inside Ramp's Marketing: Creative Bets, Measurement, and AI Agents (with Drew Pinta)",
      "date": "2026-04-13",
      "rss_guid": "...",
      "episode_url": "https://exitfive.com/podcast/inside-ramps-marketing-creative-bets-measurement-and-ai-agents-with-drew-pinta",
      "transcript_file": "data/transcripts/346.json",
      "practices_file": "data/practices/346.json",
      "status": "processed",
      "processed_at": "2026-04-14T10:30:00Z"
    }
  ],
  "last_checked": "2026-04-16T08:00:00Z"
}
```

### 2. Transcript Scraper

**Input:** Episode URL (e.g., `https://exitfive.com/podcast/inside-ramps-marketing-creative-bets-measurement-and-ai-agents-with-drew-pinta`)

**Behavior:**
- Fetch the episode page HTML
- The transcript lives in an expandable section on the page under a "Transcription" heading. The site is Webflow-hosted. The transcript content is in the DOM but may be inside a collapsed accordion element. Inspect the raw HTML rather than relying on visible-text extraction to make sure you get it
- Parse speaker-attributed transcript lines. Format observed: `Speaker [H:MM:SS]: Text` (e.g., `Dave [0:00:01]: You're listening to...`)
- Also extract the show notes section (episode description, guest name, timestamps list) as metadata
- If the transcript is not present on the page (some older episodes may not have transcripts), mark the episode as `"status": "no_transcript"` in the manifest and skip it

**Output per episode (`data/transcripts/{episode_number}.json`):**
```json
{
  "episode_number": 346,
  "title": "...",
  "date": "2026-04-13",
  "guest": "Drew Pinta",
  "guest_title": "Director of Growth Data at Ramp",
  "episode_url": "...",
  "show_notes": "...",
  "timestamps": ["(00:00) - Intro", "(04:25) - Drew's background", "..."],
  "transcript": [
    {
      "speaker": "Dave",
      "timestamp": "0:00:01",
      "text": "You're listening to The Dave Gerhardt Show."
    },
    {
      "speaker": "Drew",
      "timestamp": "0:02:44",
      "text": "Yeah. For sure. So I lead the data function for all of growth..."
    }
  ],
  "full_text": "Dave: You're listening to... Drew: Yeah. For sure..."
}
```

**Rate limiting:** Add a 2-3 second delay between page fetches during bulk backfill. Be respectful of the site.

### 3. Agent 1: Extractor

This is the core differentiator. The extraction prompt must be precise enough to pull specific, implementable advice and reject vague platitudes. This agent operates on one transcript at a time and never sees skill files or other episodes' practices.

**Input:** One transcript JSON file

**Model:** Claude Haiku 4.5 (fast, cost-efficient for high-volume structured extraction across hundreds of episodes)

**System prompt for extraction:**

```
You are analyzing a B2B marketing podcast transcript to extract specific, actionable best practices.

WHAT COUNTS AS A BEST PRACTICE:
- A specific technique, framework, process, or approach that a marketer could implement
- Must include enough detail that someone could act on it without needing to listen to the episode
- Must come directly from what the guest or host said - not inferred or extrapolated
- Includes: specific metrics/benchmarks shared, named frameworks, step-by-step processes described, specific tools/channels recommended with context on how to use them, contrarian positions backed by evidence or experience

WHAT DOES NOT COUNT:
- Generic advice ("know your audience", "be authentic", "test and iterate")
- Opinions without supporting reasoning or evidence
- Observations about industry trends without actionable implications
- Self-promotion or product pitches by the guest
- Banter, anecdotes told purely for entertainment, or tangential stories that don't resolve into a transferable lesson

For each best practice extracted, provide:
1. practice_id: A unique slug (e.g., "ramp-70-30-budget-split")
2. title: A concise, descriptive title
3. description: 2-5 sentences capturing the specific practice with enough detail to implement
4. direct_evidence: The key quotes or paraphrased statements from the transcript that support this practice (include speaker name and approximate timestamp)
5. categories: 1-3 category tags from the taxonomy (see below)
6. specificity_score: Rate 1-5 how specific and implementable this practice is (1 = vague principle, 5 = step-by-step playbook). Only include practices scoring 3+.
7. guest_name: Who articulated this practice
8. guest_context: Their role/company (relevant for weighting credibility on topic)

HOST ATTRIBUTION:
Dave Gerhardt is the host of the Exit Five podcast, not a guest. When Dave articulates a practice (which he will, frequently — he is a B2B marketing practitioner and his views count as expert signal), attribute it correctly:
- guest_name: "Dave Gerhardt"
- guest_context: "Host of Exit Five podcast; former CMO"
Do NOT label Dave as "Guest on episode N" or similar. His role is host across the entire corpus, and that matters for how readers interpret his voice relative to one-off guest appearances. Capture his practices with the same rigor as any guest — same specificity threshold, same evidence requirements — but label him accurately.

CATEGORY TAXONOMY:
- positioning-and-messaging
- content-strategy
- demand-generation
- paid-media
- linkedin-marketing
- email-marketing
- website-optimization
- abm-account-based-marketing
- sales-marketing-alignment
- marketing-measurement
- brand-building
- product-marketing
- marketing-leadership
- career-development
- marketing-operations
- outbound-and-prospecting
- events-and-community
- ai-in-marketing
- creative-and-design
- customer-marketing

If a practice doesn't fit cleanly into any existing category, tag it as "uncategorized" for manual review. Do NOT invent new categories. The taxonomy is intentionally fixed to keep the skill library curated — adding new categories is a manual decision, not an extraction-time one.

OUTPUT FORMAT: Return a JSON array of practice objects. If the episode yields no practices meeting the 3+ specificity threshold, return an empty array. Do not pad the output with marginal practices to fill space.
```

**Output per episode (`data/practices/{episode_number}.json`):**
```json
{
  "episode_number": 346,
  "title": "...",
  "guest": "Drew Pinta",
  "extraction_date": "2026-04-14",
  "extraction_model": "claude-haiku-4-5-20251001",
  "practices": [
    {
      "practice_id": "ramp-70-30-budget-split",
      "title": "70/30 Budget Split Between Proven and Experimental Channels",
      "description": "Allocate roughly 70% of marketing budget to channels with proven, measurable ROI and 30% to experimental or hard-to-measure bets (brand, creative stunts, new channels). The 70% funds the machine. The 30% funds the bets that could become the next component of the 70%. This prevents the trap of only investing in what you can already measure, which systematically underinvests in brand and creative.",
      "direct_evidence": [
        {
          "speaker": "Drew",
          "approx_timestamp": "27:50",
          "content": "[paraphrased quote or key statement]"
        }
      ],
      "categories": ["marketing-measurement", "demand-generation"],
      "specificity_score": 4,
      "guest_name": "Drew Pinta",
      "guest_context": "Director of Growth Data at Ramp"
    }
  ]
}
```

### 4. Category Index

**Purpose:** Maintains a single aggregated index of all practices across all episodes, grouped by category.

**File: `data/category_index.json`**
```json
{
  "categories": {
    "positioning-and-messaging": {
      "practice_count": 14,
      "episode_sources": [97, 142, 203, 335, 344],
      "practices": [
        {
          "practice_id": "dunford-positioning-exercise",
          "episode_number": 97,
          "title": "...",
          "description": "...",
          "guest_name": "April Dunford",
          "episode_date": "2024-03-15",
          "specificity_score": 5
        }
      ]
    }
  },
  "last_updated": "2026-04-16T10:00:00Z"
}
```

**Rebuild logic:** After each new episode's practices are extracted, merge them into the category index. This is a deterministic data operation, not an AI call.

### 5. Agent 4: Disagreement Analyst

A dedicated agent that compares practices within each category to identify where experts actually disagree. "Contradiction" was the wrong mental model: real disagreements often aren't 1-on-1, they're majority-vs-minority, evenly split, or emerging shifts in the field. This agent captures the full shape of disagreement.

**Scope boundary:** Agent 4 detects *active disagreements between named positions*. Its `trend_note` field captures chronological patterns that exist *within* a disagreement (e.g., "all pro-gating voices are from 2024, all anti-gating from 2026"). It does NOT detect general topic evolution where no explicit disagreement exists — for example, the gradual disappearance of 2023-era SEO advice as guests shift to AI-search strategies without explicitly arguing against the old approach. That case is out of scope here and is handled by the future Agent 6 (Trend Analyst, see Component Spec 10). Keep Agent 4 focused on opposition, not drift.

**Two-pass intersection filtering (stability):** Agent 4's raw output is non-deterministic — a single run can surface genuine disagreements alongside run-dependent artifacts (a framing the model latched onto this time but might not surface next time). Because the product's value is rigor and attribution, the pipeline runs Agent 4 **twice in parallel on the same input** and keeps only disagreements reproduced across both runs.

Two disagreements from different runs are treated as "the same disagreement" if their supporter sets (matched by `guest_name` + `practice_id`, case-insensitive) overlap by at least 50% of the larger set's size. Matching is greedy: candidate pairs are sorted by intersection size desc, then paired uniquely.

When a pair matches, the runs are merged:
- Title, per-position `stance`, `position_id`, `context_dependency`, `trend_note`, and `why_it_matters` come from run A (the first run).
- Supporters are the union of both runs. Run-B-only supporters are placed in whichever run-A position already contains the most supporters from the same run-B position.
- `support_summary` is recomputed deterministically as the position supporter counts, sorted descending, joined with " vs " (e.g., "3 vs 1"). The model's prose summary is discarded because it came from one run's framing.

Disagreements that appear in only one run are dropped. The count is recorded in the output as `filtered_count` and logged to the terminal at INFO level with each dropped disagreement's title and supporters, so the filter is auditable rather than invisible. The output file also carries `analysis_runs: 2` so downstream readers know the filter was applied.

**Explicit trade-off:** this filter accepts potential under-reporting of subtle disagreements — real tensions that only one of the two runs surfaces will be dropped as "not stable enough." That is the intended behavior. A disagreement the system claims must survive the stability bar; one the system misses is recoverable on the next pipeline run as the corpus grows. False positives (manufactured or run-dependent tensions) are more corrosive to credibility than false negatives here.

**Input:** All practices for a single category from the category index (minimum 5 practices from 3+ episodes to be worth analyzing)

**Model:** Claude Sonnet

**Trigger:** Runs for any category that received new practices AND meets the minimum threshold. Also runnable manually across all categories via CLI.

**System prompt for disagreement analysis:**

```
You are analyzing a set of B2B marketing best practices extracted from different podcast episodes to identify genuine disagreements between experts.

Your job is to find cases where experts give directly conflicting advice on the same tactical question. Structure each disagreement by counting how many guests support each position, because that context matters: "6 experts agree, 1 disagrees" is a very different story than "3 vs 3."

WHAT COUNTS AS A DISAGREEMENT:
- Two or more guests give specific, concrete advice that conflicts on the same question.
- Guest A says to do X. Guest B says to NOT do X, or to do the opposite of X.
- Guest A recommends a specific approach. Guest B explicitly argues against that same approach.
- Guest A gives a specific number/benchmark. Guest B gives a meaningfully different number for the same metric.
- Guest A says a channel/tactic works. Guest B says it doesn't work.

WHAT DOES NOT COUNT:
- Different guests emphasizing different aspects of the same topic (complementary, not conflicting).
- Advice applying to different company stages or contexts (unless both guests are explicitly talking about the same context).
- One guest covering a topic and another not mentioning it.
- Terminology differences for the same underlying practice.
- Vague practices that could be interpreted as conflicting but aren't specific enough to actually conflict.

For each disagreement, group all supporting guests into positions. A "position" is a coherent stance. The same disagreement might have 2, 3, or occasionally more distinct positions.

For each disagreement identified, return:

1. disagreement_id: unique slug (e.g., "gated-vs-ungated-content")
2. title: Concise framing as a question (e.g., "Should you gate your best content?")
3. category: The category slug
4. positions: Array of position objects, each containing:
   - position_id: slug (e.g., "pro_gating")
   - stance: 2-3 sentence summary of this position
   - supporters: Array of guest objects, each with:
     - guest_name
     - guest_context (role/company; for Dave Gerhardt use "Host of Exit Five podcast; former CMO" — never label him as a guest)
     - episode_number
     - episode_date
     - evidence: What reasoning or data did this guest cite?
     - practice_id: Reference to the source practice
5. support_summary: Human-readable count describing the distribution (e.g., "6 vs 1", "3 vs 3", "4 vs 2 vs 1"). This captures the degree of disagreement. Dave Gerhardt counts as one supporter like any other expert voice — his views are not weighted differently from guests — but the stance he's taking should be clearly attributable to him as host in the supporters array, not misrepresented as a one-off guest position.
6. context_dependency: Does this disagreement dissolve if you account for different company stages, industries, or GTM motions? Be specific. If no, say "genuine disagreement regardless of context."
7. trend_note: If there's a chronological pattern where recent guests cluster on one side and older guests on the other, describe it specifically. Otherwise set to null. This is the only way a "field is shifting" signal gets captured.
8. why_it_matters: 1-2 sentences explaining why a B2B marketer should care about which side is right.

OUTPUT FORMAT: Return a JSON array of disagreement objects. If no genuine disagreements exist in this category, return an empty array. Do NOT manufacture tensions. An empty array is valid.
```

**Output (`data/disagreements/{category-slug}.json`):**
```json
{
  "category": "content-strategy",
  "analysis_date": "2026-04-16",
  "analysis_model": "claude-sonnet-4-6",
  "disagreements": [
    {
      "disagreement_id": "gated-vs-ungated-content",
      "title": "Should you gate your best content?",
      "category": "content-strategy",
      "positions": [
        {
          "position_id": "pro_gating",
          "stance": "Gate your highest-value content. Ungated content trains buyers to expect everything for free and gives you no signal on who's actually engaged.",
          "supporters": [
            {
              "guest_name": "...",
              "guest_context": "VP Marketing at ...",
              "episode_number": 178,
              "episode_date": "2024-11-05",
              "evidence": "Cited internal data showing gated whitepapers had 4x higher SQL conversion than ungated equivalents.",
              "practice_id": "..."
            },
            {
              "guest_name": "...",
              "guest_context": "CMO at ...",
              "episode_number": 215,
              "episode_date": "2025-02-18",
              "evidence": "Argued gating creates a qualification signal that outbound teams rely on.",
              "practice_id": "..."
            }
          ]
        },
        {
          "position_id": "anti_gating",
          "stance": "Ungated content outperforms gated 3:1 in pipeline contribution. Gating kills reach and produces low-quality leads who wanted the content, not your product.",
          "supporters": [
            {
              "guest_name": "...",
              "guest_context": "CMO at ...",
              "episode_number": 320,
              "episode_date": "2026-01-14",
              "evidence": "Ran a 6-month A/B test across all content assets. Ungated drove 3x more influenced pipeline despite generating fewer MQLs.",
              "practice_id": "..."
            },
            {
              "guest_name": "...",
              "guest_context": "Head of Demand at ...",
              "episode_number": 340,
              "episode_date": "2026-03-26",
              "evidence": "Pointed to industry-wide decline in gated conversion rates and the rise of LLM-based content discovery.",
              "practice_id": "..."
            }
          ]
        }
      ],
      "support_summary": "2 vs 2",
      "context_dependency": "May dissolve partially by company stage. Gating may make more sense for established companies with existing demand; ungating may benefit earlier companies building awareness. But multiple guests on both sides were discussing growth-stage B2B specifically.",
      "trend_note": "Pro-gating voices are all from 2024-early 2025. Anti-gating voices are all from 2026. Strong chronological shift.",
      "why_it_matters": "The gating decision affects top-of-funnel reach, lead quality, and the qualification signal your outbound team uses. Picking the wrong side for your stage can either starve your pipeline or flood it with tire-kickers."
    }
  ]
}
```

**Aggregated disagreements index (`data/disagreements/_index.json`):**
```json
{
  "total_disagreements": 23,
  "by_category": {
    "content-strategy": 4,
    "demand-generation": 6,
    "positioning-and-messaging": 3,
    "linkedin-marketing": 2,
    "marketing-measurement": 5,
    "paid-media": 3
  },
  "last_updated": "2026-04-16T10:00:00Z"
}
```

**Integration with skills:** The Skill Writer (Agent 2) receives both the practices AND the disagreement objects for a category. It references them in a "Where Experts Disagree" section rather than trying to detect conflicts on its own.

### 6. Agent 5: Episode Analyst

Generates a human-readable analysis after each new episode is processed. This is the content engine: every new episode produces a publishable markdown artifact suitable for the website.

**Input:**
- The newly processed episode's practices
- A diff of which skills were updated and what changed (added sections, revised practices, new attributions)
- Any new disagreements introduced by this episode
- Any existing disagreements where this episode added support to one side

**Model:** Claude Sonnet

**Trigger:** Runs once per episode, after Agents 1-4 have completed and skills have been recompiled.

**System prompt for episode analysis:**

```
You are writing a short analytical post about what a new Exit Five podcast episode contributed to a body of B2B marketing knowledge. This post will be published on a website that tracks the evolution of best practices across the podcast.

Your job is to answer three questions:
1. What new specific practices did this episode introduce?
2. Which existing skill files were updated as a result, and how?
3. Did this episode create any new disagreements with previous guests, or reinforce existing ones?

VOICE AND FORMAT:
- Clean analytical prose. Not hype. Not "takeaways" bullet lists. Not LinkedIn-style drama.
- Assume the reader is a B2B marketer who may or may not have listened to the episode.
- Lead with what's actually new. If the episode mostly restated existing consensus, say so directly.
- When covering disagreements, attribute both sides and surface the support counts. "Guest X joins Guest Y in arguing against Guest Z's position from episode #200" is the right level of specificity.
- Under 1000 words. Favor completeness over compression — these files are reference material for internal audit and archival purposes.
- No em dashes.

STRUCTURE:
# Episode #{N}: {Guest Name} on {Topic}

{1-2 sentence intro framing what the episode covered and whether it broke new ground.}

## New practices extracted
{Bulleted list of the most specific, implementable new practices. Skip marginal ones. If fewer than 3 strong practices, list what's there and stop.}

## Skills updated
{For each skill file that changed: 1-2 sentences on what was added, revised, or challenged.}

## Where this creates tension
{If this episode introduces new disagreements or reinforces existing ones, explain them with attribution. If not, say "No new disagreements surfaced in this episode" and move on.}

WHAT TO AVOID:
- "This episode was packed with insights" or similar filler
- Summarizing the whole episode narrative when you should be highlighting what's new
- Pretending there was a meaningful update when there wasn't
- Soft language like "some might argue" or "it could be said" — just attribute and state
```

**Output (`data/episode-analyses/{episode_number}.md`):** A complete markdown post ready for publication.

**Example frontmatter structure:**
```yaml
---
episode_number: 346
title: "Inside Ramp's Marketing: Creative Bets, Measurement, and AI Agents"
guest: Drew Pinta
guest_role: Director of Growth Data at Ramp
episode_date: 2026-04-13
episode_url: https://exitfive.com/podcast/inside-ramps-marketing-creative-bets-measurement-and-ai-agents-with-drew-pinta
skills_updated: [marketing-measurement, demand-generation, ai-in-marketing]
new_practices_count: 7
new_disagreements: 1
reinforced_disagreements: 2
---
```

### 7. Agent 2: Skill Writer

This is where practices become Claude skills. Each skill file is a standalone SKILL.md that follows the Claude skill format (YAML frontmatter + markdown body). The writer works exclusively from structured practice objects. It never sees raw transcripts.

**Input:** All practices in a given category from the category index + any disagreement objects for that category from `data/disagreements/{category-slug}.json`

**Model:** Claude Sonnet

**Trigger:** Runs for every category that received new practices from a newly processed episode

**System prompt for skill compilation:**

```
You are compiling B2B marketing best practices from the Exit Five podcast into a Claude skill file. The skill file will be used by marketers as instructions for Claude to help them execute a specific marketing function.

CRITICAL RULES:
1. ONLY use practices provided in the input. Do not add best practices from general knowledge. If the input practices don't cover an aspect of the topic, leave it uncovered. Gaps are honest. Filler is fraud.
2. You will receive pre-identified disagreement objects alongside the practices. When disagreements exist:
   a. Present all positions with full attribution (including all supporters and their evidence) in a "Where Experts Disagree" section
   b. Include the support_summary (e.g., "3 vs 1") so the reader can see the shape of the disagreement
   c. Include the trend_note and context_dependency from the disagreement data
   d. Do NOT silently pick a side. Do NOT present a contested position as settled consensus elsewhere in the skill.
   e. When a practice appears in the main body of the skill AND is part of a disagreement, include a cross-reference: "(Note: this is contested — see Where Experts Disagree)"
3. Attribute practices to their source: "(Source: [Guest Name], Episode #[N])". This is non-negotiable. Every specific recommendation traces back to who said it.
4. Write the skill as instructions that Claude should follow when helping a user with this marketing task. Use imperative voice. Be specific about what to do and what not to do.
5. Structure the skill with:
   - YAML frontmatter (name, description)
   - A brief overview explaining what this skill covers and its source material
   - Organized sections grouping related practices
   - A "Where Experts Disagree" section (if disagreement objects were provided for this category)
   - Specific do's and don'ts drawn from the practices
   - A "Sources" section at the bottom listing every episode and guest that contributed

FORMAT:
The output must be a valid SKILL.md file. See the structure spec below.

SKILL FILE STRUCTURE:
---
name: {category-slug}
description: "{One-line description of what this skill helps with and when to trigger it}"
version: "{date of last update, YYYY-MM-DD}"
episode_count: {number of episodes contributing practices}
---

# {Skill Title}

## Overview
{2-3 sentences. What this skill covers. Explicit statement that all practices are sourced from Exit Five podcast guests.}

## {Section 1 - grouped by sub-topic}
{Practices organized logically. Each specific recommendation attributed.}

## {Section 2}
...

## Where Experts Disagree
{Only include if disagreement objects were provided for this category. Present each disagreement with all positions attributed, the reasoning each guest gave, the support summary (e.g., "3 vs 1"), and any context dependency or chronological trend. This section should help the user make an informed choice rather than pretending consensus exists where it doesn't.}

## What NOT To Do
{Anti-patterns and mistakes called out by guests, with attribution.}

## Sources
{List of episodes and guests that contributed to this skill, with episode numbers and dates.}
```

**Output:** One SKILL.md file per category, written to `skills/{category-slug}/SKILL.md`

**Conflict handling example:**
If Guest A in Episode 200 says "always gate your best content" and Guest B in Episode 340 says "ungated content outperforms gated 3:1 in pipeline contribution," the skill file should present both positions with attribution and note the more recent stance. Do NOT silently pick one.

### 8. Agent 3: Skill Reviewer

An adversarial QA agent that reads compiled skill files and determines whether they meet the quality bar. This agent has no knowledge of the writer's intent or the raw transcripts. It evaluates the skill purely on whether the output would make a marketer better at the task.

**Input:** One compiled SKILL.md file + the list of source practices that were fed to the writer (for verification, not for rewriting)

**Model:** Claude Sonnet

**System prompt for review:**

```
You are a quality reviewer for Claude skill files. Your job is adversarial: find problems. You are not here to validate the writer's work. You are here to catch the specific failure modes that make skill files useless.

Review the skill file against these criteria:

1. MONDAY MORNING TEST
For each recommendation in the skill, ask: could a B2B marketer read this and do something differently at work on Monday? If the answer is "not really" or "only with a lot of interpretation," flag it. Be specific about what's missing.

Failure examples:
- "Focus on the problems your buyers actually have" (too vague to act on)
- "Use data to drive decisions" (universal advice, not a skill)
- "Build trust with your audience" (no mechanism described)

Pass examples:
- "Split your budget 70% proven channels / 30% experimental. The 70% funds the machine, the 30% funds bets that could become the next part of the 70%." (specific ratio, clear logic)
- "Run incrementality tests on brand spend by going dark in one geo for 4-6 weeks and measuring the pipeline delta against a control geo." (specific method, timeframe, measurement approach)

2. SOURCE CONTAMINATION CHECK
Compare the skill file against the source practices provided. Flag any recommendation that:
- Does not trace to at least one source practice
- Adds specificity or detail not present in any source practice
- Introduces frameworks, terminology, or advice that appears to come from general knowledge rather than the podcast transcripts

This is the most important check. The entire value proposition of this project is that skills contain ONLY what podcast guests actually said. Any general knowledge contamination destroys credibility.

3. ATTRIBUTION COMPLETENESS
Every specific recommendation should be attributed to a guest and episode number. Flag any unattributed claims. One-off missing attributions are a "revise" issue. Systematic missing attributions are a "reject" issue.

4. DISAGREEMENT HANDLING
Check whether the skill silently picks a side when source practices conflict. Disagreements should be surfaced transparently with attribution to all positions, support counts (e.g., "3 vs 1"), and any chronological trend. Flag any case where the skill presents a contested position as settled consensus, or where it hides the shape of the disagreement (e.g., presenting a 5-vs-1 disagreement as if the positions had equal weight).

5. SKILL DIFFERENTIATION TEST
Would Claude produce meaningfully different output with this skill loaded vs. without it? If the skill mostly restates things Claude would say anyway from general training, the skill isn't earning its place. Flag specific sections that fail this test.

A thin skill (few practices) is fine if each practice is specific and substantive — a single strong, specific practice from one episode still earns its place. What's not fine is a skill that's thin because its practices are vague, hedged, or barely differentiated from general knowledge. Reject for vagueness. Do not reject for brevity alone.

6. STRUCTURAL ISSUES
- Is the YAML frontmatter complete and valid?
- Does the Sources section list every contributing episode?
- Are sections organized logically, or are practices dumped without grouping?
- Is the "What NOT To Do" section grounded in specific anti-patterns from guests, or is it generic cautionary advice?

OUTPUT FORMAT:
Return a JSON object:
{
  "verdict": "pass" | "revise" | "reject",
  "overall_assessment": "1-2 sentence summary of the skill's quality",
  "issues": [
    {
      "criterion": "monday_morning_test" | "source_contamination" | "attribution" | "disagreement_handling" | "skill_differentiation" | "structural",
      "severity": "minor" | "major" | "critical",
      "location": "Quote or describe the specific section/line",
      "problem": "What's wrong",
      "suggested_fix": "How the writer should fix it"
    }
  ],
  "strengths": ["List 1-3 things the skill does well, if any"]
}

VERDICT CRITERIA:
- pass: No major or critical issues. Minor issues acceptable.
- revise: 1+ major issues OR 3+ minor issues. Writer should fix and resubmit.
- reject: 1+ critical issues (typically source contamination or systematic missing attribution). Writer must rewrite from scratch.

Be harsh. A skill that passes your review should be noticeably better than what Claude would produce from general knowledge. That's the only bar that matters.
```

**Output per review (`data/reviews/{category-slug}-{timestamp}.json`):**
```json
{
  "category": "marketing-measurement",
  "review_date": "2026-04-16T10:30:00Z",
  "review_model": "claude-sonnet-4-6",
  "revision_cycle": 1,
  "verdict": "revise",
  "overall_assessment": "Strong on measurement methodology practices from Drew Pinta. Two recommendations in the 'Building a Measurement Culture' section read as general advice not traceable to any source practice.",
  "issues": [
    {
      "criterion": "source_contamination",
      "severity": "major",
      "location": "Section: Building a Measurement Culture, paragraph 2",
      "problem": "The recommendation to 'establish a shared dashboard that both marketing and sales review weekly' does not trace to any source practice in the input. This appears to be general knowledge inserted by the writer.",
      "suggested_fix": "Remove this recommendation entirely, or find a source practice that supports it. Do not rephrase general knowledge to sound sourced."
    }
  ],
  "strengths": [
    "The 70/30 budget framework section is well-structured with clear attribution",
    "Conflict between Pinta and an earlier guest on attribution models is surfaced transparently"
  ]
}
```

**Revision loop:**

When the reviewer returns `"revise"`:
1. Feed the original source practices + the reviewer's issues back to Agent 2 (Skill Writer) with an additional instruction block:

```
The following skill file was reviewed and needs revision. Address each issue listed below. Do not add new content from general knowledge to fix gaps. If removing a flagged section leaves a gap, leave the gap. Rewrite only what is necessary to resolve the issues.

ISSUES:
{reviewer's issues array, formatted as readable text}
```

2. The writer produces a revised SKILL.md
3. The revised SKILL.md goes back to Agent 3 for re-review
4. **Maximum 2 revision cycles.** If the skill hasn't passed after 2 revisions, log it as `"review_stalled"` and publish the best version with a note in the commit message. Manual review needed.

When the reviewer returns `"reject"`:
1. Log the rejection with full review output
2. Mark the category as `"needs_rewrite"` in the category index
3. On the next pipeline run, the writer will recompile from scratch (not revise)

When the reviewer returns `"pass"`:
1. Write the SKILL.md to `skills/{category}/SKILL.md`
2. Save the review to `data/reviews/` for audit trail
3. Proceed to GitHub Publisher

### 9. Agent 6: Trend Analyst (Future, Not In MVP)

A planned future agent, deliberately out of scope for the initial build. Documented here so that Agent 4's scope is unambiguous and so the data model never needs retrofitting.

**Problem it solves:** Agent 4 captures active disagreements between named positions. It does not capture gradual topic evolution where the consensus quietly shifts without explicit argument — for example, SEO advice from 2023 becoming dormant as guests in 2026 discuss AI-search strategies instead. No one is arguing against the old approach; it has simply stopped being recommended. This is a different signal than disagreement and requires a different detector.

**Planned behavior (when built):**
- Input: all practices in a single category from the category index, sorted chronologically. Gate by a larger minimum than Agent 4 — likely 15+ practices spanning 18+ months of episode dates, tuned after backfill reveals actual distributions.
- Model: Claude Sonnet (same tier as other analysts).
- Output (`data/trends/{category}.json`): for each identified trend, a structured object with `trend_id`, `topic`, `early_period` (date range + characteristic practices + representative guests), `recent_period` (same structure), `shift_summary`, approximate `turning_point`, and `confidence` rating (strong/moderate/weak based on practice density and recency).

**Dependencies on existing architecture:** None. The current schemas already carry every field Agent 6 will need — `episode_date` is present on practice entries in the category index and on disagreement supporters, and `data/practices/{n}.json` files are keyed by episode number and reference the manifest's `date`. No schema migration is needed to add this agent later.

**Why deferred:** trend detection on a small corpus is noise, not signal. The decision to build Agent 6 should come after the initial backfill reveals which categories have enough temporal coverage to support meaningful drift analysis. Some categories (SEO, AI-in-marketing, paid media) are likely to have rich signal; others (positioning fundamentals, basic email hygiene) are topic-stable and will produce nothing interesting. Build this after Agent 6 has real data to validate against.

**Scope guardrail for the MVP:** do not stretch Agent 4's `trend_note` field to cover this case. If a chronological pattern exists without explicit opposition between positions, it belongs to the future Agent 6 and should be left undetected in the MVP.

### 10. GitHub Publisher

**Behavior:**
- The public repo contains three directories plus README: `skills/`, `disagreements/`, and `episode-analyses/`
- `data/` is the pipeline's working directory and stays local. It contains raw transcripts, extracted practices, the manifest, the category index, and review audit logs. Include `.gitignore` rules covering `data/transcripts/`, `data/practices/`, `data/reviews/`, `data/manifest.json`, `data/category_index.json`, `node_modules/`, and `.env`
- After skill compilation, the publisher:
  1. Copies `data/disagreements/*.json` → `disagreements/` (public root)
  2. Copies `data/episode-analyses/*.md` → `episode-analyses/` (public root)
  3. Updates the repo README with current skill inventory and disagreement summary tables
  4. Stages all changed files in `skills/`, `disagreements/`, `episode-analyses/`, and `README.md`
  5. Commits with a message like: `Update skills from Episode #346 (Drew Pinta - Ramp marketing measurement)`
  6. Pushes to main branch
- If multiple episodes process in a single run, batch them into one commit with a summary message listing all episodes covered

**Repo structure:**
```
e5-real-skills/
├── README.md
├── .gitignore
├── skills/
│   ├── positioning-and-messaging/
│   │   └── SKILL.md
│   ├── demand-generation/
│   │   └── SKILL.md
│   ├── linkedin-marketing/
│   │   └── SKILL.md
│   ├── marketing-measurement/
│   │   └── SKILL.md
│   └── ...
├── disagreements/
│   ├── README.md
│   ├── _index.json
│   ├── positioning-and-messaging.json
│   ├── content-strategy.json
│   ├── demand-generation.json
│   └── ...
├── episode-analyses/
│   ├── 346.md
│   ├── 345.md
│   ├── 344.md
│   └── ...
└── CONTRIBUTING.md
```

**README template:**

```markdown
# Exit Five B2B Marketing Skills for Claude

Claude skill files grounded in actual best practices from [The Dave Gerhardt Show (Exit Five)](https://exitfive.com/podcast) - not general knowledge, not AI-generated fluff.

Every recommendation in these skills traces back to a specific guest, a specific episode, and a specific thing they said. If a topic isn't covered, it's because no guest has addressed it yet.

## How to Use

1. Fork this repo
2. Copy any `SKILL.md` file into your Claude Project's skill directory
3. Claude will automatically apply the skill when relevant to your task

## Available Skills

| Skill | Practices | Episodes | Last Updated |
|-------|-----------|----------|--------------|
{auto-generated table}

## Where the Experts Disagree

Not every best practice is settled. When podcast guests give directly conflicting advice on the same question, we track it, including how many guests support each position. A "6 vs 1" disagreement tells you different things than a "3 vs 3" one.

| Debate | Category | Support | Type |
|--------|----------|---------|------|
{auto-generated table from disagreements index}

Browse the full disagreement data in [`/disagreements`](./disagreements/) or on the website.

## Per-Episode Analysis

Every new episode gets a short analytical write-up covering what it added to the knowledge base: new practices extracted, which skills were updated, and any disagreements it surfaced or reinforced.

See [`/episode-analyses`](./episode-analyses/) for all analyses, or visit the website for a browsable view.

## How It Works

This repo is maintained by an automated pipeline that:
1. Monitors the Exit Five podcast RSS feed for new episodes
2. Extracts transcripts from exitfive.com
3. Uses Claude to identify specific, actionable best practices (not vague advice)
4. Detects genuine disagreements between experts across episodes, with support counts
5. Compiles practices into skill files, organized by marketing function
6. Generates a per-episode analysis explaining what each new episode contributed
7. Publishes updates after each new episode

Every practice requires a specificity score of 3+ (out of 5) to be included. Generic advice like "know your audience" gets filtered out. What remains is the stuff you can actually do on Monday morning.

## Attribution

All content is sourced from publicly available podcast transcripts on exitfive.com. Every practice is attributed to the guest who shared it. This project is not affiliated with Exit Five.

Built by [Zack King](https://linkedin.com/in/gtm-with-zack) | [If You Build It](https://ifyoubuildit.co)
```

---

## CLI Commands

The app should expose these commands:

```bash
# Check for new episodes and process them end-to-end
e5-skills run

# Backfill: scrape and process all available episodes
e5-skills backfill

# Process a single episode by number
e5-skills process --episode 346

# Recompile all skills from existing practice data (no re-extraction)
e5-skills compile

# Recompile a single skill category
e5-skills compile --category positioning-and-messaging

# Re-review a specific skill without recompiling
e5-skills review --category positioning-and-messaging

# Run disagreement analysis across all eligible categories
e5-skills disagreements

# Run disagreement analysis for a single category
e5-skills disagreements --category positioning-and-messaging

# Show disagreements summary (counts by type and category)
e5-skills disagreements --summary

# Regenerate episode analysis for a specific episode
e5-skills analyze --episode 346

# Regenerate all episode analyses
e5-skills analyze --all

# Show processing status (includes review verdicts)
e5-skills status

# Show review history for a category
e5-skills review-log --category positioning-and-messaging

# Dry run: show what would change without writing files
e5-skills run --dry-run
```

---

## Tech Stack

- **Language:** TypeScript (Node.js)
- **HTTP/scraping:** `cheerio` for HTML parsing, native `fetch` for requests
- **RSS parsing:** `rss-parser` npm package
- **AI:** Anthropic SDK (`@anthropic-ai/sdk`). Model split: `claude-haiku-4-5-20251001` for Agent 1 (extraction, high-volume), `claude-sonnet-4-6` for Agents 2-5 (skill writing, review, disagreement analysis, episode analysis)
- **Git operations:** `simple-git` npm package
- **File storage:** Local filesystem JSON files in `data/` directory
- **No database.** This is a pipeline that runs periodically, not a server.

---

## Processing Pipeline (for `run` command)

```
1. Fetch RSS feed
2. Compare against manifest → identify new episodes above min_episode_number
3. For each new episode (parallel, up to max_parallel_extractions):
   a. Scrape transcript from episode page
   b. Save transcript to data/transcripts/{n}.json
   c. Run Agent 1: Extractor (Claude API call)
   d. Save practices to data/practices/{n}.json
4. Deterministic merge of all new practices into data/category_index.json (single-threaded, fast)
5. Update manifest status for each episode to "processed"
6. Identify which categories received new practices AND meet the disagreement analysis threshold (5+ practices from 3+ episodes)
7. For each affected category (parallel):
   a. Run Agent 4: Disagreement Analyst (Claude API call)
   b. Save disagreements to data/disagreements/{category}.json
8. Deterministic rebuild of data/disagreements/_index.json
9. For each affected category (parallel, up to max_parallel_skill_compilations):
   a. Run Agent 2: Skill Writer with practices + disagreements as input → draft SKILL.md
   b. Run Agent 3: Skill Reviewer → verdict
   c. If "revise": feed issues back to Agent 2, re-run Agent 3 (max 2 cycles, sequential within a single category)
   d. If "reject": log, mark category as needs_rewrite, skip publish
   e. If "pass": write SKILL.md to skills/{category}/SKILL.md
   f. Save review to data/reviews/ for audit trail
10. For each new episode (parallel):
    a. Compute skill diff (which skills were updated, what changed)
    b. Identify new or reinforced disagreements from this episode
    c. Run Agent 5: Episode Analyst (Claude API call)
    d. Save markdown post to data/episode-analyses/{n}.md
11. Update README skill inventory table (deterministic)
12. Git commit and push all changes to the public repo
13. Log summary: episodes processed, practices extracted, disagreements found, skills updated, review verdicts, analyses generated
```

### Parallelization

The pipeline has natural parallelization boundaries created by the data dependencies between stages. Respect the stage boundaries, parallelize aggressively within each stage.

**What can run in parallel:**

- **Step 3 (Episode extraction):** Each episode is independent. Process up to `max_parallel_extractions` at once (default: 5). The bottleneck is Anthropic API rate limits, not logic.
- **Step 7 (Disagreement analysis):** Each category is independent and has no shared state. Process all eligible categories in parallel.
- **Step 9 (Skill writing + review):** Each category is independent. Process up to `max_parallel_skill_compilations` at once (default: 3). Lower than extractions because each compilation can trigger multiple agents (writer + reviewer + possibly revision cycles), so the per-task API call count is higher.
- **Step 10 (Episode analyses):** Each episode is independent. All can run in parallel.

**What must be sequential:**

- **Step 3 within a single episode:** Scrape → extract → save. Agent 1 must complete before the episode is considered "processed."
- **Step 4 (Category index merge):** All extractions must complete before merge. The merge itself is deterministic and fast, no parallelization needed.
- **Step 9 within a single category:** Writer → reviewer → (possibly) writer → reviewer. Revision cycles require the previous output to exist.
- **Agent 5 depends on Agents 2 + 4:** Episode analyses must run after skill updates and disagreement analysis complete, because they report on what changed.

**For the initial backfill:**

The backfill has the most to gain from parallelism. 200 episodes processed sequentially could take hours. In parallel with `max_parallel_extractions: 5`, extraction completes in roughly 1/5 the wall-clock time. Set `max_parallel_extractions: 10` for backfill if your Anthropic tier allows it.

Watch for rate limits. The backfill CLI command should include a `--concurrency` flag that overrides the config, so the user can tune based on their API tier.

**Implementation hint:**

Use a simple concurrency pool like `p-limit` in Node. Avoid over-engineering with queue systems or worker threads for this workload. The pipeline is I/O-bound (API calls and scraping), not CPU-bound.

```typescript
import pLimit from 'p-limit';

const limit = pLimit(config.max_parallel_extractions);
const extractionResults = await Promise.all(
  newEpisodes.map(episode => limit(() => extractEpisode(episode)))
);
```

---

## Error Handling

- If transcript scraping fails for an episode, log the error, mark status as `"scrape_failed"` in manifest, continue to next episode
- If the Claude API call for extraction returns an empty array, that's valid (not all episodes yield extractable practices). Mark as `"processed_no_practices"`
- If any Claude API call fails (rate limit, network error), retry 3x with exponential backoff. If all retries fail, mark as `"extraction_failed"` or `"compilation_failed"` or `"review_failed"` and continue
- If the reviewer returns `"reject"` on a category, do NOT publish the skill. Mark it as `"needs_rewrite"` and log the full review. It will be recompiled from scratch on the next pipeline run
- If a skill stalls after 2 revision cycles (reviewer keeps returning `"revise"`), publish the best version with a commit message noting it did not pass full review. Log it as `"review_stalled"` for manual follow-up
- If the Git push fails, log the error but don't fail the run. The files are written locally and will be pushed on the next successful run
- If parallel tasks within a stage fail, isolate the failure: one failed episode extraction should not block the others. Collect failures into the run summary and continue

---

## Configuration

**Environment variables:**
```
ANTHROPIC_API_KEY=         # Required
GITHUB_TOKEN=              # Required for push (PAT with repo scope)
GITHUB_REPO=               # e.g., "the-nam-shub/e5-real-skills"
```

**Config file (`config.json`):**
```json
{
  "rss_feed_url": "https://feeds.transistor.fm/exit-five-podcast",
  "base_episode_url": "https://exitfive.com/podcast",
  "scrape_delay_ms": 2500,
  "min_episode_number": 150,
  "min_specificity_score": 3,
  "min_practices_for_disagreement_analysis": 5,
  "min_episodes_for_disagreement_analysis": 3,
  "extraction_model": "claude-haiku-4-5-20251001",
  "compilation_model": "claude-sonnet-4-6",
  "review_model": "claude-sonnet-4-6",
  "disagreement_model": "claude-sonnet-4-6",
  "analyst_model": "claude-sonnet-4-6",
  "max_revision_cycles": 2,
  "max_parallel_extractions": 5,
  "max_parallel_skill_compilations": 3,
  "data_dir": "./data",
  "skills_dir": "./skills"
}
```

---

## Scheduling

The app itself is a CLI tool, not a daemon. Schedule it externally:

- **Option A (simple):** Cron job running `e5-skills run` daily
- **Option B (GitHub Actions):** A scheduled workflow that runs the pipeline in CI and pushes results. Include a workflow file at `.github/workflows/update-skills.yml`

Recommend Option B for the public repo since it makes the automation visible and the pipeline transparent.

**GitHub Actions workflow:**
```yaml
name: Update Skills from Exit Five Podcast
on:
  schedule:
    - cron: '0 14 * * *'  # Daily at 2pm UTC (morning ET)
  workflow_dispatch: {}    # Manual trigger

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx e5-skills run
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "Auto-update skills from new Exit Five episodes"
```

---

## Backfill Strategy

The podcast has ~346 episodes as of April 2026, going back several years. Transcripts are not available for every episode — the site started reliably publishing transcripts at some point, and episodes before that cutoff will either lack transcripts entirely or have them in a different format. There's no reason to hammer the site attempting to scrape episodes that don't have transcripts.

**Determining the cutoff:**

Before running the full backfill, spot-check transcript availability by sampling episode pages at different points in the archive (e.g., episode 50, 100, 150, 200, 250, 300). Identify the earliest episode that reliably has a full transcript and use that as the backfill floor. Set it as `min_episode_number` in config.

As a starting assumption, **default to episode 150 as the backfill floor** and adjust based on the spot check. This captures roughly the last ~2 years of content, which is where the most relevant and current advice lives anyway. Advice from 2022 about paid ads or AI tooling has questionable applicability in 2026.

**Backfill procedure:**

1. Scrape the podcast listing page, paginating through all pages to collect every episode URL above `min_episode_number`
2. Attempt to scrape transcripts from each episode page
3. Episodes without transcripts get marked `"no_transcript"` and skipped (no retries)
4. Process all transcribed episodes through the extraction pipeline in parallel batches (see Parallelization section)
5. After all episodes are extracted, run disagreement analysis on every eligible category
6. Compile and review all skills
7. Generate episode analyses for each processed episode
8. Commit everything to the repo in a single batch

**Override for historical completeness:**

If the user explicitly wants to attempt the full archive including old episodes, expose a `--no-floor` flag on the backfill CLI command. Most older episodes will just come back marked `"no_transcript"` and be skipped, but the attempt is logged.

**Cost estimate for backfill:** Assume ~200 episodes have transcripts within the cutoff range. Average transcript is ~8,000 tokens. Extraction prompt + response adds ~2,000 tokens overhead. That's ~10,000 tokens per episode for extraction. For 200 episodes: ~2M input tokens + ~500K output tokens for extraction. Skill compilation across ~20 categories adds ~200K tokens. Reviewer adds ~150K tokens per pass, and with an average of ~1.5 passes per skill, that's roughly ~250K tokens for review. Revision cycles add another ~200K tokens for rewriting. Disagreement detection runs once per eligible category with all practices as input; assume ~400K tokens total. Episode analyses add ~1M tokens (200 episodes × ~5K tokens each). Ballpark total: $15-35 in API costs for the full backfill.

---

## What Success Looks Like

After backfill, the public repo should contain:
- 15-25 skill files covering the major B2B marketing functions
- Each skill backed by 5-30+ specific practices from named guests
- A disagreements dataset surfacing 15-30 genuine expert disagreements across categories, each with the full distribution of guest opinion (e.g., "6 vs 3 vs 1")
- Every recommendation traceable to a source episode
- A clear README that explains what this is and how to use it
- Automated daily updates that process new episodes within 24 hours of publication

The skills should be noticeably different from generic AI-generated marketing advice because they contain specific numbers, named frameworks, real examples, and attributed opinions rather than synthesized conventional wisdom. The disagreements dataset is a separate value layer: it shows where the field is actually unsettled, which is usually where the most interesting conversations happen.

