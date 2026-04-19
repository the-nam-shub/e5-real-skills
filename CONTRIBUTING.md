# Contributing

This repo's contents — `skills/`, `disagreements/`, and `episode-analyses/` — are produced by an automated pipeline that ingests new Exit Five podcast episodes on a schedule (see `.github/workflows/update-skills.yml`). The pipeline source lives in `src/`.

Please do not hand-edit files under `skills/`, `disagreements/`, or `episode-analyses/` — those edits will be overwritten on the next automated run. If you want to change what gets published, open an issue or PR against the pipeline code instead.

If you spot a miscategorized practice, a missing disagreement, or a factually wrong attribution, open an issue. The easiest fix is usually a prompt or threshold tweak in the relevant agent under `src/agents/`.
