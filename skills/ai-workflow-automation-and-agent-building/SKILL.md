---
name: ai-workflow-automation-and-agent-building
description: "Guides marketers through building, structuring, and managing AI workflows and agents for marketing automation — trigger when a user wants to automate a marketing process, build an AI agent, design a prompt workflow, or scale content production with AI tools."
version: "2026-04-21"
episode_count: 18
---

# AI Workflow Automation and Agent Building for B2B Marketers

## Overview
This skill covers how B2B marketing teams can design, build, and manage AI-powered workflows and agents — from structuring prompts and decomposing complex processes into discrete steps, to deploying agents that interact with external systems and managing them at scale. All practices are sourced exclusively from Exit Five podcast guests across 18 episodes. Where guests disagree, those disagreements are surfaced explicitly rather than resolved.

---

## 1. Starting Right: Scope and Validation

**Start with one small, core workflow before trying to automate everything.**
Pick a single task that is central to your business and build automation for that first. Do not attempt to replicate complex, multi-step demos you've seen. Start simple — automating guest research for webinars, or extracting key questions from sales calls — and learn by doing. Once you master that workflow, expand to more complex automation. This prevents overwhelm and builds confidence. (Source: Eoin, Episode #290)

**Prove a tactic works manually before building automation around it.**
Before investing time and resources into building an AI workflow, first validate that the underlying tactic drives results when done manually. Example: run 10–15 webinars manually to confirm they generate pipeline before building a webinar automation workflow. Automation should scale what already works, not salvage a broken process. (Source: Dan, Episode #290)

*(Note: this validate-first principle is contested — see Where Experts Disagree)*

**Identify the right workflows to automate.**
Target workflows that are time-consuming, require specialized knowledge, or are highly repetitive — such as organizing data, screening applicants, creating decks, or preparing for interviews. Use AI to handle these tasks and free up time for creative and strategic work. (Source: Dave Gerhardt, Episode #279)

---

## 2. Workflow Architecture: How to Structure AI Workflows

**Decompose complex marketing workflows into atomic, single-purpose skills.**
Break down complex workflows into small, discrete, reusable pieces. For each skill, define clear inputs and outputs, write test cases (evals), and then chain them together into end-to-end agents. This makes each piece testable, reusable, and composable, enabling non-technical marketers to build sophisticated automation without writing code. (Source: Drew Pinta, Episode #346)

*(Note: this atomic decomposition approach is contested — see Where Experts Disagree)*

**Design each step in a workflow to do one thing well.**
When building multi-step AI workflows (e.g., in Clay, Zapier, or AirOps), break the workflow into discrete steps rather than trying to accomplish everything in a single large prompt. This makes the workflow easier to understand, debug, and refine. It also allows you to insert human checkpoints between steps to maintain quality control before moving to the next step. Example: instead of "generate a complete webinar package," break it into: (1) generate title options, (2) research guest, (3) generate agenda, (4) generate email copy. (Source: Dan, Episode #290)

*(Note: this single-purpose step approach is contested — see Where Experts Disagree)*

**Codify content processes as reusable, multi-step automated workflows rather than one-off prompts.**
Instead of manually prompting an AI for each piece of content, define your content creation process as a multi-step workflow and encode it into an AI tool (e.g., Copy.ai, custom automation). Example: transcript → extract key points → structure as blog post → maintain speaker voice → add quotes → translate to multiple languages. This allows you to run the entire workflow with one click, maintain consistency, preserve the original speaker's voice, and scale content production without requiring prompting expertise. (Source: Kyle Coleman, Episode #206)

*(Note: this one-click end-to-end approach is contested — see Where Experts Disagree)*

**Plan for multiple iterations when building a new AI workflow.**
The initial prompt will likely produce suboptimal or error-filled output. Rather than abandoning the workflow, plan to iterate on the prompt multiple times — testing and refining piece by piece. Add quality control rules (e.g., exclude self-mentions, spell competitor names consistently), test the output, identify errors, and adjust the prompt accordingly. This is a normal part of the process, not a sign of failure. (Source: Dan, Episode #290)

---

## 3. Prompt Engineering and Structuring

**Structure prompts using system prompt + user prompt + assistant pairs.**
When building AI workflows for marketing tasks, separate your prompt into three components: (1) **system prompt** — establish the AI's role and expertise (e.g., "You are an expert at analyzing sales conversations"); (2) **user prompt** — provide rich, pertinent context specific to your company (brand voice, ICP, positioning, sales metadata); (3) **assistant pairs** — show examples of desired input/output format. This structure allows you to reuse the system prompt across multiple tasks while varying the user context, and makes it easier to debug and iterate. (Source: Eoin, Episode #290)

*(Note: this direct prompt-engineering approach is contested — see Where Experts Disagree)*

**Use O3 to generate optimized prompts for other specialized AI tools.**
When using specialized AI tools (like Genspark for presentations, Lovable for design), don't write the prompt directly in that tool. Instead, use O3 with the tool's technical documentation to generate an optimized prompt, then copy and paste that prompt into the specialized tool. This leverages O3's reasoning capability to craft better prompts than you would write manually. If the output isn't quite right, feed the result back to O3 and ask it to tell the tool how to fix it. (Source: Kieran Flanagan, Episodes #318 and #257)

**Build a custom GPT library for prompt methodologies and frameworks.**
Create multiple custom GPTs, each trained on a different prompt methodology or framework that you've found to work well. When you discover a successful prompt or iterate on one that produces good results, extract the core learnings and train a custom GPT to replicate that approach. Then use that custom GPT to generate new prompts for different marketing outcomes. Example: extract learnings from a high-performing system prompt, distill those learnings, and train a custom GPT to apply them to marketing campaigns. This creates a reusable library of prompt patterns. (Source: Kieran Flanagan, Episodes #318 and #257)

*(Note: this build-prompt-expertise approach is contested — see Where Experts Disagree)*

**Use guided UI workflows to remove the prompt-engineering burden from end users.**
Rather than relying on users to write effective prompts from scratch, use AI tools with structured UI workflows that guide users through required inputs step-by-step (target audience, topic, content length, brand voice, supporting materials). These guided interfaces ask contextual follow-up questions and allow users to attach reference documents (product briefs, messaging guides, competitive briefs) before generation. This ensures consistent, high-quality inputs without requiring prompting expertise. (Source: Jessica Hreha, Episode #136)

*(Note: this guided-UI approach is contested — see Where Experts Disagree)*

**Build custom GPTs that embed proven content patterns and ask users clarifying questions.**
After identifying the key elements that make your best content successful, create a custom GPT that embeds those patterns. The GPT should ask users clarifying questions to extract information, then generate content following the proven formula. This turns your content best practices into a scalable tool that helps team members create higher-quality content with minimal effort. (Source: Matt Carnevale, Episode #155)

---

## 4. Specific Workflow Builds and Use Cases

**Build a repeatable webinar production workflow in Clay.**
Create a multi-step Clay workflow that automates webinar production by: (1) generating 5 webinar title options from a topic using brand context and audience pain points; (2) researching guest backgrounds via LinkedIn URLs to create guest summaries; (3) generating webinar agendas and host research notes; (4) creating email subject lines and body copy for pre-webinar promotion. The workflow outputs a Google Doc with all materials ready for human review and refinement. Use consistent context and examples in each step, and allow human checkpoints between steps to maintain quality control. (Source: Dan, Episode #290)

**Build an AI-powered content research engine to identify content gaps and competitive opportunities.**
Create a custom AI agent that runs queries across multiple LLMs (Claude, ChatGPT, Perplexity), analyzes their responses, scrapes citations, stores results in a database, and compares your content against competitors and knowledge bases. The agent identifies content gaps, suggests new topics, and helps with content writing. This unlocks organic reach and inbound demand by revealing what competitors are missing and where you can rank better. (Source: Jennifer Delevante-Moulen, Episode #288)

**Set up an automated content monitoring and summarization workflow.**
Build an automated workflow that monitors industry news and competitor content by scraping RSS feeds from selected websites every 15 minutes. Use AI to check relevance against your defined topics, extract full article content via tools like Gina AI, summarize with Claude, and send results to Slack. Feed this curated content into custom GPTs trained on expert insights to generate content ideas, identify trends, and create unique angles. This enables real-time content ideation based on current market events rather than static keyword research. The workflow can be built in 2–5 hours using tools like Make or Zapier. (Source: Ugi Djuric, Episode #278)

**Automate subject matter expert quote sourcing with AI and Slack.**
Build a workflow that identifies quote opportunities in existing articles using AI, frames strategic questions, matches them to relevant subject matter experts from a knowledge base, and routes requests via Slack for expert responses. The workflow should: scrape article content, identify 5 quote opportunities per article with context and priority levels, search a knowledge base to rank the top 3 relevant experts, and tag them in a dedicated Slack channel where they claim and answer questions. This automates the operational overhead of sourcing expert quotes at scale without automating the quality creation itself. (Source: Connor Beaulieu, Episode #336)

**Build an end-to-end AI agent to automate vertical go-to-market expansion.**
Create an agent that replicates the manual process of launching a go-to-market effort for a new vertical. The agent should research the vertical (pain points, companies, search behavior), generate SEO content at scale, create sales materials, and develop channel-specific marketing strategies — all triggered by a single input. This enables scaling from one vertical to dozens with minimal additional headcount. (Source: Drew Pinta, Episode #346)

**Use AI to extract quotes and automate social media graphic creation.**
Upload your content (blog posts, transcripts, etc.) to Claude or ChatGPT and ask it to generate a spreadsheet of quotes. Take that spreadsheet and upload it to Canva with automation enabled so that Canva automatically populates each quote into a template. This creates dozens of social media graphics from a single piece of content in minutes, dramatically increasing distribution without manual design work. (Source: Ross Simmonds, Episode #200)

**Build interactive ROI calculators with Lovable (no-code AI app builder).**
Use Lovable to create interactive ROI calculators that sales teams can run live on discovery calls. Write a detailed prompt describing the calculator logic, inputs, and outputs (e.g., cost of current state, efficiency gains, annual savings). Include industry benchmarks and helpful text to guide users who may not know baseline metrics. Structure as a multi-step form that generates a downloadable PDF with stakeholder-ready results. Iterate on the prompt using Lovable's chat feature to refine design and functionality without needing developers or designers. (Source: Jessica Lytle, Episode #278)

**Use Lovable to build internal marketing tools and dashboards.**
Beyond landing pages and interactive content, use Lovable to build internal software tools that solve marketing team operational problems. Example: build a custom tool to automate newsletter workflow tasks that previously took 3+ hours per week. This eliminates dependency on engineering resources and allows marketing teams to ship their own solutions quickly. Applicable to any repetitive internal process: data synthesis, workflow automation, team coordination tools. (Source: Jess Lytle, Episode #319)

**Use AI to match event attendees for breakout groups based on pain points.**
When running an event, collect pain point data from attendees during registration. Use ChatGPT to analyze all responses and automatically match attendees with similar pain points into breakout groups. This creates more relevant and valuable breakout sessions without manual curation. (Source: Dave Gerhardt, Episode #288)

---

## 5. Knowledge Management and Centralization

**Build a custom GPT with company knowledge and history to onboard new team members.**
Create a custom ChatGPT instance loaded with your company's institutional knowledge: ICP, pain points, company history, best-performing campaigns, best-performing emails, best and worst customers, and key strategic decisions. Use this to onboard new team members by giving them access to a searchable brain of company knowledge. New hires can ask the AI about past experiments, customer insights, or strategic context without waiting for a manager to explain everything. (Source: Dave Gerhardt, Episode #288)

**Centralize product and brand knowledge in Claude for consistent team output.**
Build a comprehensive knowledge base in Claude (or similar LLM) that contains all product information, brand guidelines, customer insights, and messaging frameworks. Train your team to use this centralized brain for content creation and marketing tasks. This ensures consistency across outputs, enables faster content generation, and allows the team to scale content production without losing brand coherence. (Source: Justin Johnson, Episode #271)

**Build an organization-wide Claude skill for on-brand design self-service.**
Create a Claude skill that encodes your brand guidelines, visual styles, and tone into reusable instructions. Input your brand guide and design playbook into Claude Enterprise (or team space), then use the skill creator to build instructions for repeatable design tasks (infographics, sales decks, dashboards). Store the skill's markdown instructions in Notion and set up a Claude-Notion integration so the skill pulls live data. Establish a governance process: team members submit skill change requests through Notion, your design team vets and approves changes, and one-off requests are handled separately. This enables non-designers to self-serve on-brand creative while keeping designers focused on foundational work. (Source: Liz, Episode #345)

---

## 6. System Architecture: Connecting Tools and Enabling Agents

**Use MCP servers to enable LLMs to access and act on tool data.**
MCP (Model Context Protocol) servers are instruction sets that tell LLMs how to interact with external tools and pull data with proper context. Instead of relying on basic API integrations, set up MCP servers so that when you ask an LLM to retrieve data (e.g., "give me all recent activity on this contact"), the LLM knows exactly how to fetch and structure that information. This enables more powerful agent workflows where LLMs can take actions across multiple connected systems. (Source: Dan Guenet, Episode #271)

**Wire multiple systems together to enable AI agents to act across platforms.**
Set up proper integrations and MCP servers so that AI agents can pull data from multiple sources (CRM, email, ads platform, etc.), synthesize that data, and take actions across systems based on a single prompt. Example: an agent that monitors all LinkedIn campaigns daily, identifies underperforming ones, and can pause or reallocate budget if given permission. This requires proper system architecture and data flow setup. (Source: John Short, Episode #271)

**Connect Claude to Gamma via MCP for automated content generation workflows.**
Set up an MCP connection between Claude (where your product knowledge is stored) and Gamma (presentation/content tool) so that content can flow automatically from your centralized knowledge base into polished, formatted outputs. This reduces manual steps in content creation and enables faster testing and iteration of marketing materials. (Source: Justin Johnson, Episode #271)

**Use Claude Code to rapidly prototype custom workflows and applications.**
Leverage Claude's code generation capabilities to quickly build custom applications and workflows without traditional development overhead. Example: building a fully customizable onboarding workflow for customers instead of using off-the-shelf form tools. This allows non-engineers to prototype and deploy solutions faster, reducing time-to-revenue and enabling faster iteration on customer-facing processes. (Source: Justin Johnson, Episode #271)

**Clean or standardize input data before feeding it into AI analysis workflows.**
Sales transcripts from tools like Fathom or Gong may contain transcription errors, inconsistent spelling of competitor names, or other quality issues. Before feeding transcripts into an AI workflow for analysis, consider adding a cleaning step that standardizes competitor names, fixes common transcription errors, or removes irrelevant sections. Alternatively, handle some of this in the prompt itself by specifying how to spell competitor names or what to exclude. The cleaner your input data, the better your AI output will be. (Source: Dan, Episode #290)

---

## 7. Guardrails, Risk Management, and Agent Oversight

**Classify AI agent workflows by risk level and implement guardrails accordingly.**
Classify agent workflows into risk tiers: low-risk (internal work like creative generation) can run freely; high-risk (external interactions like sending emails or managing ad accounts) require guardrails. For high-risk workflows, route interactions through internal middleware that enforces constraints — for example, preventing duplicate emails to the same person, or rate-limiting API calls. This prevents costly mistakes like account lockdowns or customer spam. (Source: Drew Pinta, Episode #346)

**Create dedicated AI agent management roles to maintain quality standards.**
When deploying AI agents for sales and marketing functions, hire dedicated people to manage and coach those agents daily. These roles (e.g., "AI marketing operations" or "go-to-market engineer") are responsible for ensuring agents are trained, receiving feedback, targeting the right leads, and maintaining a high bar for output quality. Agents should not be set-and-forget; they require active management to prevent degradation of quality and to continuously improve performance. (Source: Maura Rivera, Episode #301)

**Create leaderboards to benchmark AI agent performance against human performance.**
Set up competitive benchmarks (leaderboards) that compare AI agent pipeline generation against human SDR/BDR performance. This creates healthy competition, maintains quality standards, and provides data-driven evidence of whether agents are actually outperforming humans. Use this as a forcing function to ensure agents are continuously improved rather than treated as a solved problem. (Source: Maura Rivera, Episode #301)

**Deploy inbound AI agents to follow up with all leads across email and website.**
Deploy an inbound AI agent to handle all website conversations and follow-up across multiple channels (email, website chat). The agent should follow up with leads pre- and post-event, re-engage old leads that showed past interest, and work opportunities that were previously lost. This creates 24/7 coverage and significantly increases pipeline by ensuring no lead falls through the cracks due to manual follow-up gaps. (Source: Maura Rivera, Episode #301)

**Use AI agents to structure communication while preserving implicit context.**
Build AI agents that help people communicate in more structured ways. These tools can take unstructured thoughts or implicit knowledge (things you know about people's priorities that aren't written down anywhere) and quickly format them into clear, concise communication. This is more useful than simple summarization because it preserves the context and insight that only you have, while applying structure and clarity. (Source: Molly Sands, Episode #264)

---

## 8. Agency and Organizational Strategy

**Agencies should evolve to build customized agentic workflows for clients.**
As AI automates traditional agency services (design, copywriting, video production), agencies should pivot to building customized agentic workflows for clients. Instead of delivering a one-off service, agencies should instrument autonomous agents tailored to each client's specific needs and integrate them into the client's workflows. This creates ongoing value and differentiation that is harder to commoditize. (Source: Kieran Flanagan, Episodes #318 and #257)

**Adopt an AI-first approach to automate repetitive marketing tasks and accelerate campaign execution.**
Make it an imperative for the marketing team to use AI to automate tasks that don't require human creativity, freeing up time for higher-value work. Specific use cases include: generating campaign assets from prompts (copy, design, video), identifying and enriching ICP data, enabling prospecting at scale, and accelerating time-to-launch for campaigns. The vision is reducing campaign execution time by 95% through AI-powered asset generation while maintaining brand consistency via digital brand vaults that LLMs can access. (Source: Gurdeep Dhillon, Episode #203)

---

## Where Experts Disagree

### Disagreement 1: Should AI workflows be broken into small discrete steps or handled in fewer, larger end-to-end prompts?

**Support summary: 2 vs 1**

**Position A — Break workflows into atomic, single-purpose steps (2 supporters)**

Drew Pinta (Episode #346) advocates decomposing workflows into "atomic skills" with defined inputs, outputs, and test cases (evals), then chaining them into agents. The emphasis is on reusability and testability of each discrete piece. Dan (Episode #290) explicitly recommends breaking workflows into single-purpose steps rather than one large end-to-end prompt, using the example of webinar production: instead of "generate a complete webinar package," break it into title generation, guest research, agenda, and email copy as separate steps. Both argue this makes workflows easier to debug, test independently, and refine, and allows human checkpoints between steps.

**Position B — Encode the full process into a one-click end-to-end workflow (1 supporter)**

Kyle Coleman (Episode #206) recommends encoding the full content creation process (transcript → extract key points → structure as blog → maintain voice → add quotes → translate) into a tool like Copy.ai so it runs with one click. The emphasis is on removing prompting friction entirely, not on inserting human checkpoints between steps.

**Context dependency:** The atomic/step-by-step approach is more appropriate when workflows are being built and refined (iteration phase), while the one-click end-to-end approach suits mature, validated workflows. However, Dan and Drew explicitly argue for discrete steps even in production workflows for debuggability, while Kyle argues for collapsing steps into a single automated run — making this a genuine tactical disagreement about workflow architecture even for established processes.

**Trend note:** The two more recent guests (Drew Pinta, Episode #346, April 2026; Dan, Episode #290, October 2025) both advocate for atomic step decomposition, while the earlier guest (Kyle Coleman, Episode #206, December 2024) favors end-to-end one-click workflows. This may reflect a maturing understanding of agentic workflow design favoring modularity over convenience.

---

### Disagreement 2: Should end users write their own prompts or be guided through structured UI workflows?

**Support summary: 4 vs 2**

**Position A — Build prompt engineering expertise and libraries directly (4 supporters)**

Kieran Flanagan (Episodes #318 and #257) recommends building a library of custom GPTs trained on different prompt methodologies, and using O3 to generate optimized prompts for specialized tools. He frames prompt engineering as a skill to be systematized and owned, not abstracted away. Eoin (Episode #290) recommends structuring prompts using system prompt + user prompt + assistant pairs, treating prompt architecture as a skill marketers should learn and apply directly. Dan (Episode #290) explicitly states that the first prompt will produce poor results and that multiple iterations are normal and expected, framing prompt refinement as a skill practitioners must develop rather than something to be abstracted away.

**Position B — Use guided UI workflows to remove the prompt-engineering burden from end users (2 supporters)**

Jessica Hreha (Episode #136) explicitly recommends guided UI workflows over freeform prompting, arguing that structured interfaces asking contextual follow-up questions produce better results without requiring users to know how to prompt well. Matt Carnevale (Episode #155) recommended building custom GPTs that embed proven content patterns and ask users clarifying questions, turning best practices into a scalable tool that requires minimal prompting expertise from team members.

**Context dependency:** Guided UIs may be more appropriate for large teams where most members are not power users, while prompt library building suits power users or marketing ops specialists. However, both sets of guests are speaking to B2B marketing practitioners generally, making this a genuine disagreement about the right default approach.

**Trend note:** The guided UI position comes from the earliest episodes (136, April 2024; 155, July 2024). All more recent guests (2025–2026) favor building prompt expertise directly. This may reflect a field shift as marketers have become more comfortable with AI tools and prompt engineering has become more accessible.

---

### Disagreement 3: Should you prove a tactic works manually before automating it, or use automation to discover what works?

**Support summary: 3 vs 1**

**Position A — Automate to scale discovery and expansion (3 supporters)**

Drew Pinta (Episode #346) describes building an end-to-end AI agent that researches new verticals, generates SEO content at scale, and creates sales materials — all triggered by a single input. The agent enables scaling from one vertical to dozens, implying automation is used to explore and expand rather than only to replicate proven manual work. Jennifer Delevante-Moulen (Episode #288) recommends building an AI content research engine that runs queries across multiple LLMs, identifies content gaps, and suggests new topics — using automation as the discovery mechanism itself rather than validating content topics manually first. Gurdeep Dhillon (Episode #203) framed AI-first automation as a strategic imperative for marketing teams, with the vision of reducing campaign execution time by 95% through AI-powered asset generation, without mentioning manual validation as a prerequisite.

**Position B — Validate manually before automating (1 supporter)**

Dan (Episode #290) explicitly states: run 10–15 webinars manually first to confirm they generate pipeline before building automation. He frames automation as a tool to do more of what already works, not a way to test whether something works.

**Context dependency:** Dan's validate-first advice applies most clearly to high-investment workflows (like webinar production) where building automation is costly. The automate-to-discover approach may be more appropriate for lower-cost content or research tasks where running many experiments in parallel is feasible. However, the underlying philosophical disagreement — whether automation should follow or precede validation — is genuine.

---

## What NOT To Do

**Don't treat AI agents as set-and-forget systems.**
Agents require active daily management to prevent degradation of quality. Without dedicated oversight, agents will drift in targeting, output quality, and performance. Hire dedicated roles to manage and coach agents continuously. (Source: Maura Rivera, Episode #301)

**Don't try to automate everything at once.**
Attempting to replicate complex, multi-step automation examples from advanced demos before mastering a single workflow leads to overwhelm and failure. Start with one small, core workflow. (Source: Eoin, Episode #290)

**Don't run high-risk agent workflows (external emails, ad account management) without guardrails.**
Without middleware constraints, agents can send duplicate emails to the same person, trigger API rate limits, or lock down ad accounts. Classify workflows by risk level and implement appropriate constraints before deploying externally. (Source: Drew Pinta, Episode #346)

**Don't feed dirty input data into AI analysis workflows without a cleaning step.**
Transcription errors, inconsistent competitor name spellings, and irrelevant sections in sales transcripts will degrade AI output quality. Add a cleaning or standardization step before analysis, or handle it explicitly in the prompt. (Source: Dan, Episode #290)

**Don't abandon a workflow after the first prompt produces poor results.**
Suboptimal initial output is normal and expected. Plan for multiple iterations. Abandoning after one attempt means missing the compounding improvement that comes from iterative refinement. (Source: Dan, Episode #290)

**Don't write prompts directly in specialized AI tools without leveraging a reasoning model first.**
Writing prompts directly in tools like Genspark or Lovable without using O3 (or equivalent) to generate an optimized prompt first produces lower-quality outputs than the tool is capable of. (Source: Kieran Flanagan, Episodes #318 and #257)

**Don't build automation around a tactic that hasn't been validated (in high-investment contexts).**
Automating a broken or unproven process wastes engineering and operational resources. In contexts where building automation is costly, confirm the tactic works manually first. (Source: Dan, Episode #290) *(Note: this is contested — see Where Experts Disagree)*

---

## Sources

| Episode | Guest | Date |
|---------|-------|------|
| Episode #136 | Jessica Hreha | April 29, 2024 |
| Episode #155 | Matt Carnevale | July 4, 2024 |
| Episode #200 | Ross Simmonds | December 9, 2024 |
| Episode #203 | Gurdeep Dhillon | December 19, 2024 |
| Episode #206 | Kyle Coleman | December 30, 2024 |
| Episode #257 | Kieran Flanagan | June 23, 2025 |
| Episode #264 | Molly Sands | July 14, 2025 |
| Episode #271 | Justin Johnson, John Short, Dan Guenet | August 7, 2025 |
| Episode #278 | Ugi Djuric, Jessica Lytle | September 1, 2025 |
| Episode #279 | Dave Gerhardt | September 4, 2025 |
| Episode #288 | Jennifer Delevante-Moulen, Dave Gerhardt | October 6, 2025 |
| Episode #290 | Dan, Eoin | October 13, 2025 |
| Episode #301 | Maura Rivera | November 6, 2025 |
| Episode #318 | Kieran Flanagan | January 5, 2026 |
| Episode #319 | Jess Lytle | January 8, 2026 |
| Episode #336 | Connor Beaulieu | March 9, 2026 |
| Episode #345 | Liz | April 9, 2026 |
| Episode #346 | Drew Pinta | April 13, 2026 |