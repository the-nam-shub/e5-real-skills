---
name: prompt-engineering-for-marketers
description: "Guidance on writing, structuring, and iterating AI prompts for marketing workflows — trigger when a user needs help crafting, refining, or systematizing prompts for any marketing task."
version: "2026-04-20"
episode_count: 7
---

# Prompt Engineering for Marketers

## Overview
This skill covers how B2B marketers can write better AI prompts, structure them for reuse, and build systems that improve output quality over time. All practices are sourced exclusively from Exit Five podcast guests across 7 episodes. No general best practices have been added beyond what guests explicitly recommended.

---

## Treat Prompting Like a Craft, Not a One-Shot Task

Approach prompt writing the way a copywriter approaches copy: with iteration, reference material, and deliberate practice.

- **Expect multiple iterations.** The first prompt will likely produce suboptimal or error-filled output. Plan to iterate many times — testing, identifying errors, and adjusting piece by piece. This is normal, not a sign of failure. For complex content workflows, expect 20–50+ revision cycles before output reaches usable quality. (Source: Dan, Episode #290; Kady Srinivasan, Episode #276)

- **Add quality control rules incrementally.** As you identify recurring errors in output (e.g., self-mentions, misspelled competitor names, wrong tone), add explicit rules to the prompt to address each one. Test after each addition. (Source: Dan, Episode #290)

- **Build a swipe file for prompts.** Maintain a running collection of examples, frameworks, design aesthetics, campaign structures, and communication styles that you encounter and admire. When you see something that works — a design, a framing, a structure — capture it and think about how to translate it into a prompt. The more specific reference material you can feed into a prompt (via images, descriptions, or direct references), the better the AI output. This trains your brain to recognize patterns and develop a "prompt muscle." (Source: Kieran Flanagan, Episodes #257 and #318)

---

## Structure Prompts for Reuse and Debuggability

Don't write monolithic prompts. Separate concerns so you can reuse, debug, and iterate on each component independently.

- **Use a three-part structure: system prompt + user prompt + assistant pairs.**
  - *System prompt:* Establish the AI's role and expertise (e.g., "You are an expert at analyzing sales conversations").
  - *User prompt:* Provide rich, pertinent context specific to your company — brand positioning, ICP, differentiators, campaign metadata. Include only what's relevant; don't dump everything in.
  - *Assistant pairs:* Show examples of the exact input/output format you want.
  
  This structure lets you reuse the system prompt across multiple tasks while varying the user context, and makes it easier to isolate what to fix when output is wrong. Example application: when analyzing sales transcripts, the system prompt defines the AI's analytical role; the user prompt provides brand context and ICP so the AI understands nuance (e.g., B2B vs. B2C distinctions); examples show the exact format for extracted insights. (Source: Eoin, Episode #290)

- **Use Claude Projects to store and reuse messaging briefs.** Create a detailed messaging brief inside Claude Projects that includes audience definition, unique mechanism, differentiators, and value propositions. Store it as a reusable project, then feed it campaign-specific context and have Claude fill out the brief for each new initiative. This ensures consistency across campaigns and reduces time spent rebuilding messaging strategy from scratch. (Source: Joe, Episode #312)

---

## Build a Reusable Prompt Library

Scale what works by systematizing successful prompts into reusable tools.

- **Train custom GPTs on prompt frameworks.** When you find a prompt or prompt methodology that produces strong results, extract the core learnings and create a custom GPT trained on that framework. Then use that GPT to generate new prompts for different marketing outcomes. For example: if you analyze a high-performing system prompt (such as a leaked prompt from a successful tool like Cursor), distill the underlying principles, train a custom GPT on those principles, and use it to craft prompts for your specific marketing needs. Build a library of these custom GPTs, each representing a different proven methodology. (Source: Kieran Flanagan, Episodes #257 and #318)

- **Use O3 to write prompts for other specialized AI tools.** When working with specialized tools (e.g., Genspark for presentations, Lovable for design), don't write the prompt directly inside that tool. Instead, give O3 the tool's technical documentation and ask it to generate an optimized prompt for your specific outcome. Then copy that prompt into the specialized tool. If the output still isn't right, feed the result back to O3 and ask it to instruct the tool on how to fix it. This leverages O3's reasoning capability to craft better prompts than you would write manually. (Source: Kieran Flanagan, Episodes #257 and #318)

---

## Configure AI to Challenge, Not Affirm

LLMs default toward agreement. Explicitly counteract this tendency when you need honest analysis.

- **Program custom AI assistants to challenge your thinking.** When building custom GPTs or AI assistants for your work, explicitly instruct them to poke holes in your ideas rather than affirm them. Example instructions: "Tell me all the reasons why I shouldn't do this" or "Tell me all the questions my CEO will ask about this proposal." This transforms AI from a yes-man into a sparring partner that surfaces gaps and weaknesses before they become problems. (Source: Ali Orlando Wert, Episode #307)

- **Use a "truth serum" prompt for candid feedback.** When you want honest, critical analysis of your work, use a prompt like: *"Take truth serum. Tell me like it is and don't hold back."* This can help override the LLM's tendency toward overly positive or agreeable responses. (Source: Tara Robertson, Episode #288)

---

## What NOT To Do

- **Don't abandon a workflow because the first prompt fails.** Poor initial output is expected. Abandoning the workflow at this stage means missing the value that comes from iteration. (Source: Dan, Episode #290)

- **Don't dump all available context into the user prompt.** Include only pertinent context. Overloading the prompt with irrelevant information degrades output quality and makes debugging harder. (Source: Eoin, Episode #290)

- **Don't write prompts directly in specialized AI tools when you can use a reasoning model first.** Writing prompts manually in tools like Genspark or Lovable without leveraging a reasoning model (like O3) to optimize them first leaves quality on the table. (Source: Kieran Flanagan, Episodes #257 and #318)

- **Don't treat AI as a validation machine.** If you only use AI to confirm ideas you already have, you're not getting its full value. Explicitly configure it to challenge you. (Source: Ali Orlando Wert, Episode #307)

- **Don't expect scale without upfront prompt investment.** Generating high-quality, personalized content at scale requires significant upfront effort in prompt design. Skipping this step produces low-quality output at high volume — which is worse than not scaling at all. (Source: Kady Srinivasan, Episode #276)

---

## Where Experts Disagree

No disagreements were identified among the contributing guests on this topic.

---

## Sources

| Episode | Guest | Date |
|---------|-------|------|
| Episode #257 | Kieran Flanagan | 2025-06-23 |
| Episode #276 | Kady Srinivasan | 2025-08-25 |
| Episode #288 | Tara Robertson | 2025-10-06 |
| Episode #290 | Dan | 2025-10-13 |
| Episode #290 | Eoin | 2025-10-13 |
| Episode #307 | Ali Orlando Wert | 2025-11-27 |
| Episode #312 | Joe | 2025-12-15 |
| Episode #318 | Kieran Flanagan | 2026-01-05 |