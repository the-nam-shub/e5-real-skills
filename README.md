# Exit Five B2B Marketing Skills for Claude

Claude skill files grounded in actual best practices from [The Dave Gerhardt Show (Exit Five)](https://exitfive.com/podcast) — not general knowledge, not AI-generated fluff.

Every recommendation in these skills traces back to a specific guest, a specific episode, and a specific thing they said. If a topic isn't covered, it's because no guest has addressed it yet.

## How to Use

1. Fork this repo
2. Copy any `SKILL.md` file into your Claude Project's skill directory
3. Claude will automatically apply the skill when relevant to your task

## Available Skills

_No skills compiled yet._

## Where the Experts Disagree

Not every best practice is settled. When podcast guests give directly conflicting advice on the same question, we track it, including how many guests support each position. A "6 vs 1" disagreement tells you different things than a "3 vs 3" one.

_No disagreements surfaced yet. When the corpus grows, cross-episode disagreements between guests will appear here._

Disagreements surface only when they reproduce across two independent Agent 4 runs on the same practice set — a stability filter that favors fewer, more trustworthy findings over exhaustive coverage.

Browse the full disagreement data in [`/disagreements`](./disagreements/).

## Per-Episode Analysis

Every processed episode produces a short analytical write-up covering what it added to the knowledge base: new practices extracted, which skills were updated, and any disagreements it surfaced or reinforced.

See [`/episode-analyses`](./episode-analyses/) for all analyses.

## How It Works

This repo is maintained by an automated pipeline that:
1. Monitors the Exit Five podcast RSS feed for new episodes
2. Pulls transcripts directly from the `podcast:transcript` URL in the RSS
3. Uses Claude Haiku to identify specific, actionable best practices (not vague advice)
4. Detects genuine disagreements between experts across episodes, with support counts
5. Compiles practices into skill files, organized by marketing function
6. Generates a per-episode analysis explaining what each new episode contributed
7. Publishes updates after each new episode

Every practice requires a specificity score of 3+ (out of 5) to be included. Generic advice like "know your audience" gets filtered out. What remains is the stuff you can actually do on Monday morning.

## Attribution

All content is sourced from publicly available podcast transcripts. Every practice is attributed to the guest who shared it. This project is not affiliated with Exit Five.
