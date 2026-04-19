---
name: ai-in-marketing
description: "Guidance for B2B marketers on adopting AI tools, building AI-enabled workflows, producing AI-assisted creative, and optimizing content for AI search — drawn exclusively from Exit Five podcast guests."
version: "2026-04-19"
episode_count: 4
---

# AI in Marketing

## Overview
This skill covers how B2B marketing teams can adopt AI tools, build AI agents and automated workflows, produce creative content with AI assistance, and optimize content for AI-powered search. All practices are sourced exclusively from Exit Five podcast guests across four episodes (Episodes 336, 341, 345, and 346). Where guests disagree, those disagreements are surfaced explicitly rather than resolved.

---

## Team Adoption and Organizational Change

### Secure Leadership Cover Before Asking Teams to Experiment
Get explicit CEO or leadership approval to allow marketing team members to deprioritize current job responsibilities in favor of learning and building with AI tools. The mandate should explicitly state it is acceptable if short-term metrics dip during the transition. This removes the fear that experimenting with AI will damage performance reviews and creates the psychological safety required for genuine investment in learning. (Source: Drew Pinta, Episode #346)

### Find and Amplify Internal AI Champions
Identify team members who are already quietly using AI tools and turn them into evangelists. Have them record Loom videos showing what they built and how they did it, conduct live demos for the team, and share their workflows openly. This bottom-up approach is more effective than top-down training because people respond to seeing peers like themselves succeed with the tools. (Source: Drew Pinta, Episode #346)

### Shift Marketing Roles from Campaign Runners to AI-Enabled Builders
Transition marketing roles away from executing campaigns manually — clicking buttons in platforms, building dashboards by hand — toward building AI agents and systems that do marketing at scale. Marketers become builders enabled by tools like Claude Code, creating systems that are more effective than what non-marketers would build because they bring deep domain expertise and platform knowledge. (Source: Drew Pinta, Episode #346)

### Frame AI as an Enabler for Creative Teams
*(Note: how you frame AI's impact on roles is contested — see Where Experts Disagree)*

When rolling out AI tools to creative teams, position them as enablers that free up creative professionals to do more strategic and high-value work. Designers, creative directors, and other creative roles remain essential — they now use AI tools to execute faster and handle more volume. This framing supports team buy-in and ensures creative professionals see AI as improving their jobs rather than threatening them. (Source: Liz, Episode #345)

---

## Building AI Agents and Automated Workflows

### Decompose Complex Workflows into Atomic, Chainable Skills
When building AI agents for marketing, break down complex workflows into small, atomic pieces. For each piece, create a Claude skill with clear inputs, outputs, and test cases (evals). Rather than asking Claude to execute an entire vertical go-to-market strategy at once, decompose it into discrete skills such as "research vertical pain points," "generate SEO keywords," and "create landing page copy." This makes skills reusable, testable, and chainable, and makes the overall system more reliable and maintainable. (Source: Drew Pinta, Episode #346)

### Build AI Agents to Scale Vertical Go-to-Market
*(Note: the appropriate scope of AI content generation is contested — see Where Experts Disagree)*

Build an AI agent that replicates the workflow of a successful vertical specialist. Decompose their workflow into atomic pieces, create Claude skills for each piece, then chain them together. The agent can then spin up a complete go-to-market strategy for a new vertical — including market research, SEO keyword strategy, landing page generation, and sales enablement materials — with a single click. This allows scaling from one vertical to fifty or more without hiring proportionally more people. (Source: Drew Pinta, Episode #346)

### Classify Agent Actions as Low-Risk or High-Risk and Apply Guardrails Accordingly
Classify AI agent actions as low-risk (internal work such as creative generation) or high-risk (customer-facing actions such as sending emails or interacting with ad platforms). Apply guardrails only to high-risk actions. For example, create internal middleware that validates HubSpot interactions to prevent sending duplicate emails or other errors. This allows teams to move fast on low-risk work while protecting the business from high-risk mistakes. (Source: Drew Pinta, Episode #346)

### Connect Marketing Tools to Claude via MCP Servers
Build or use MCP (Model Context Protocol) servers that allow Claude to connect to and interact with marketing tools like HubSpot, Ramp, and other platforms. This enables marketers to ask Claude questions about their data and have Claude pull information directly from those systems — for example, asking "has our email list growth slowed in the last 90 days?" and receiving an answer without manually requesting data from a data analyst. (Source: Dave Gerhardt, Episode #346)

### Use Claude + Figma Integration to Generate On-Brand Infographics
Leverage Claude's Figma MCP integration to generate infographics directly from data input in Claude. Input your data and design requirements using your brand skill, and the tool pushes the design to Figma for download. Note that this integration is currently one-directional (Claude to Figma only), so finalize all design decisions in Claude before pushing to Figma. This workflow is particularly useful for demand gen dashboards and data visualization. (Source: Liz, Episode #345)

### Integrate Claude with Notion to Automate Design Tasks from Task Management
Set up a Claude-Notion integration where task links can be dropped directly from a Notion board into Claude chat. Claude reads the task details and automatically executes the associated design workflow. The skill runs, generates the output, and opens it in Google Slides with all brand guidelines applied. This creates a seamless workflow where design requests flow from task management directly to execution without manual handoffs. (Source: Liz, Episode #345)

---

## AI-Assisted Content Creation

### Use Claude as a Research and Synthesis Tool, Not a Content Generator
*(Note: the appropriate role of AI in content production is contested — see Where Experts Disagree)*

Rather than using AI to generate original content from scratch, use Claude as a research and synthesis tool. Gather multiple source materials — transcripts, articles, notes — provide them to Claude with clear context about your audience and goals, and have Claude help organize and synthesize the information. Keep the subject matter expert in control of the narrative, voice, and strategic direction. This approach is particularly effective for newsletter writing and content curation. (Source: Dave Gerhardt, Episode #345)

### Build Content Through AI Assembly, Not AI Generation
*(Note: the appropriate role of AI in content production is contested — see Where Experts Disagree)*

Shift your mindset from using AI to generate full pages to using AI to assemble granular pieces of content from multiple intelligence sources. Break content creation into small, discrete steps: extract intelligence from sales calls, competitor data, product documentation, and internal knowledge; format each piece; map intelligence to specific content sections; write one section at a time with focused context; then reassemble. This granular approach prevents generic output and ensures each component is high-quality and sourced from real data. (Source: Adina Timar, Episode #336)

### Extract Real Questions and Language from Sales Calls for Content
Pull actual customer questions and language from sales calls (via Gong or similar tools) and use them to inform content creation. Cluster these questions by topic to understand what people are actually asking and the terminology they use. Then use this intelligence to create content that answers real questions in real language, rather than relying on generic AI-generated content. This clustering can be done manually or automated with AI. (Source: Eoin Clancy, Episode #336)

### Build Brand Kits from Structured Intelligence Sources
Create comprehensive brand kits by extracting and structuring intelligence from sales transcripts, product documentation, and internal knowledge bases. Use markdown formatting for LLM readability. Include granular details: product lines, specific features, pricing, key differentiators, and technical specifications extracted from sales calls. Validate accuracy against source material. This ensures AI systems can understand and apply your brand voice consistently across content generation. (Source: Adina Timar, Episode #336)

### Validate AI Output Against Subject Matter Expert Reality
When AI generates content recommendations, validate them against real expert knowledge. LLMs often produce generic or incorrect advice. Subject matter experts can catch these errors and provide real-world context that makes content more valuable. For example, LLMs might suggest flashy business names, but a real attorney knows the opposite is true for legal filings. This validation step is critical for maintaining accuracy and trust. (Source: Connor Beaulieu, Episode #336)

### Automate Expert Quote Sourcing with a Structured Workflow
Build a workflow that identifies quote opportunities in existing articles, frames strategic questions, routes them to relevant subject matter experts via Slack, and collects answers for insertion back into content. This automates the operational burden of sourcing expert quotes at scale without automating the quality creation itself. The workflow takes article URLs, uses AI to identify five quote opportunities with context, searches a knowledge base of experts by specialty, and pings them via Slack to claim and answer questions. (Source: Connor Beaulieu, Episode #336)

### Rebuild Competitor Comparison Pages with Depth and Neutrality
Instead of surface-level feature comparisons, rebuild competitor pages from scratch using multiple intelligence sources: live competitor analysis, sales call transcripts, G2 reviews, product documentation, and LLM prompting. Structure the page with specific sections, include cases where competitors win, and provide non-biased comparisons backed by sources. This approach builds trust with both humans and LLMs by showing depth, accuracy, and fairness rather than marketing spin. (Source: Adina Timar, Episode #336)

### Use Claude to Automate Competitive Intelligence from Ad Libraries
Use Claude to analyze Meta and Google Ad transparency libraries to identify what competitors are advertising, their messaging, creative, and targeting. This can reveal pain points, marketing tech stack issues, and conversion problems. Use these insights to inform outreach messaging and positioning. (Source: Jeremy Chung, Episode #341)

---

## AI-Assisted Creative Production

### Document Creative Processes Before Implementing AI Automation
Before building AI skills or automating creative workflows, first document your existing creative processes. Identify which tasks are repeatable and systematic, then use AI to automate those specific workflows. This ensures you are automating the right things and that your AI implementation aligns with how your team actually works. Documentation also makes it easier to train the AI model on your specific requirements and brand standards. (Source: Liz, Episode #345)

### Build a Claude Org-Wide Brand Skill for Self-Serve On-Brand Design
Create a Claude skill (using Claude Enterprise or Team plan) that encodes your brand guidelines, visual styles, and tone into reusable instructions. Input your brand guide as a structured "mega scale" of brand information, then use the skill creator to generate instructions for repeatable design requests — infographics, sales decks, LinkedIn visuals. This enables non-designers across the organization to self-serve on-brand creative without going through design bottlenecks. Use Notion integration to store markdown files of skill instructions and manage change requests through a formal process. (Source: Liz, Episode #345)

### Implement a Skill Change Request Process to Govern AI Design Output
When rolling out a self-serve Claude skill to the organization, establish a formal change request process where users submit feedback through a dedicated channel (e.g., a Notion form) rather than directly modifying the skill. Have a design team review and approve requests, separating one-off custom requests from systemic improvements that should be baked into the skill instructions. This prevents skill drift while still capturing valuable feedback from users and maintaining design quality standards. (Source: Liz, Episode #345)

### Set Realistic Expectations for AI Design Output Quality and Iteration
Plan for an iterative feedback loop rather than expecting perfect output on the first try. Test the tool extensively before rolling out to the broader organization, monitor edge cases and issues as users interact with it, and continuously refine the underlying skill instructions based on real-world usage. The efficiency gains from self-serve design far outweigh the occasional edge cases that require manual fixes. (Source: Liz, Episode #345)

### Invest Significant Time in Building and Refining AI Creative Skills
Building effective AI creative skills is not a one-time effort. Expect to invest hours of feedback, iteration, and refinement to get a skill to produce quality output consistently. This is similar to building any internal tool or process — it requires ongoing maintenance and improvement. Budget time and resources accordingly rather than expecting immediate perfect results. (Source: Liz, Episode #345)

### Maintain a Human Curation and Taste Layer on Top of AI-Generated Creative
AI generation should not be the final step in creative production. Always include a human curation layer where creative professionals review, select, and refine AI outputs based on brand taste, strategic fit, and quality standards. This is especially important when experimenting with new AI capabilities — have humans decide whether AI-generated options work for your brand before publishing. (Source: Carter, Episode #345)

### Hire AI Creative Producers Who Can Execute Full Video Production with AI Tools
Create a role called "AI Creative Producer" who can manage the full video production workflow using AI tools — from scripting to storyboarding to final editing. When hiring for this role, evaluate candidates based on portfolio work and take-home challenges where they produce a full video in 30 minutes to an hour. This role differs from traditional motion designers or video editors; it requires understanding of creative direction, cinematography, and the ability to prompt and iterate with AI tools effectively. (Source: Luke, Episode #345)

### Hire Creative Generalists Who Understand Direction, Cinematography, and Copy
As AI tools handle specialized production tasks, shift hiring toward creative generalists who understand overall creative direction, cinematography principles, and copywriting, and who can work across multiple disciplines. Rather than hiring specialists in motion graphics, video editing, or design, look for people who can conceive ideas, write scripts, direct the overall vision, and use AI tools to execute across multiple mediums. (Source: Vicente, Episode #345)

### Use AI Video Generation for B-Roll and Narrative Content, Not Talking-Head Footage
Current AI video generation tools produce high-quality results for B-roll, animated sequences, and narrative-driven content, but not yet for talking-head footage where facial expressions and lip-sync matter. Use voice-over narration with AI-generated visuals, or reserve talking-head footage for actual human talent. This ensures quality standards while still leveraging AI for the production elements where it excels. (Source: Luke, Episode #345)

### Generate Video Storyboards Using AI Image Models Before Video Production
When creating AI-generated videos, start by developing a script in Claude, then generate storyboard images using an image model (e.g., Nano Banana) by prompting different keyframes for each scene. Use these image references as inputs to video generation tools, which produce better and more consistent results when given visual references. This workflow reduces production time significantly compared to traditional production while maintaining visual consistency throughout the video. (Source: Vicente, Episode #345)

### Build Full Brand Videos with AI in One Day Using Voice, Image, and Video Models
Create complete brand videos by combining AI voice cloning (using a voice marketplace or personal voice clones), image generation models, and AI video tools. One person can execute from idea to finished video in a single day by leveraging these integrated tools rather than requiring traditional production crews. This approach works best for narrative-driven content rather than talking-head footage. (Source: Luke, Episode #345)

### Calculate AI Video Production Cost Per Generation vs. Traditional Production
When evaluating AI video tools, compare the cost per generation (typically approximately $3 per video generation, with generation taking roughly 30 seconds) against the cost of traditional production. AI generation costs are dramatically lower and faster, making it economically viable to create video content for use cases that would never have justified traditional production budgets — such as customer education videos and internal training. (Source: Luke, Episode #345)

### Use AI Video Production to Create Customer Education Content at Lower Cost
Customer education videos are typically expensive to produce but high-value for customer success. AI video tools make it economically viable to create these videos for a few hundred dollars and a couple of weeks of production time, versus the traditional investment required. This enables video content for use cases that would never have justified traditional production budgets. (Source: Vicente, Episode #345)

### Use Voice Cloning with Consent and Compensation via a Voice Marketplace
When using AI voice cloning for marketing, work with a voice marketplace where real voice actors consent to have their voices cloned and receive compensation for usage. For celebrity or high-profile voices, implement a request-based approval process where the voice owner can control how their likeness is used and which brands represent them. This approach ensures legal compliance, ethical use, and ongoing compensation for voice talent. (Source: Luke, Episode #345)

### Test Voice Cloning vs. Dubbing for Localization Based on Language Pairs
When localizing video content across languages, experiment with both voice cloning (replicating the original speaker's voice in a new language) and dubbing (using native speakers) to determine which sounds more natural for specific language pairs. Voice cloning works better for romance-to-romance language pairs (e.g., Spanish to French), while dubbing with native voices works better for distant language pairs (e.g., English to Asian languages). Document which approach works best for each language combination. (Source: Carter, Episode #345)

### Use AI-Generated B-Roll Instead of Stock Video for Specific Shots
Use AI image and video generation tools to create specific B-roll shots that match your exact creative vision rather than being constrained by available stock footage. This is particularly valuable for branded environments or unique visual concepts that don't exist in stock libraries. This approach reduces production costs and timelines while giving you creative control over the exact shots needed. (Source: Carter, Episode #345)

### Shift Creative Process from Selling Ideas with Mockups to Rapid Prototyping
AI tools enable creative directors to move from spending time creating elaborate mockups and presentations to sell ideas, to immediately starting production on day one. Instead of building decks to convince stakeholders, generate rough versions of the creative concept quickly and iterate based on feedback. This accelerates the creative process and allows for more experimentation based on actual output rather than theoretical concepts. (Source: Vicente, Episode #345)

### Use Descript and Claude to Generate YouTube SEO Tags and Descriptions
Upload YouTube videos to Descript, use Claude with custom prompts to generate rich SEO tags and descriptions, then validate those tags using the VidIQ plugin on YouTube. This workflow automates what would normally require coordination with an SEO team, allowing you to manage YouTube optimization independently while maintaining quality through validation. (Source: Carter, Episode #345)

---

## AI Search Optimization

### Prioritize Frontier Knowledge to Differentiate in AI Search
Focus on creating content with frontier knowledge — information that LLMs don't yet know, cannot answer, or don't have access to. This is the primary lever for getting cited in AI search results. Examples include proprietary product data, internal expert insights, or unique research. This approach replaces the old playbook of scraping and repackaging competitor content. (Source: Eoin Clancy, Episode #336)

### Meet the Higher Bar for AI Search Citations
The bar for appearing in AI search results is significantly higher than ranking in traditional Google search. To increase the likelihood of citation in AI search, include more data points, more expert quotes, more internal links, and richer structure than you would for standard SEO. Research shows the gap between Google and AI search requirements is growing, creating an opportunity for those who invest in quality content now. (Source: Eoin Clancy, Episode #336)

### Identify AI Search Gaps Using Search Console and Prompt Analysis
Use Google Search Console to find long-tail queries that look like AI questions rather than traditional search queries. Build a comprehensive library of potential prompts people might ask LLMs about your topic. Analyze which prompts don't mention your brand and which ones mention you but in the wrong context. Use these insights to prioritize which pages to refresh or create, focusing on gaps where LLMs are recommending competitors instead of you. (Source: Adina Timar, Episode #336)

### Quick Win: Refresh Existing High-Performing Content with Expert Quotes and Data
If you want a high-value win without building from zero, identify existing high-performing pages and add expert quotes or data points to them. This is faster than creating new content, leverages existing traffic, and immediately improves E-E-A-T signals and AI search visibility. Use internal experts, sales calls, or proprietary data as sources. (Source: Eoin Clancy, Episode #336)

---

## Where Experts Disagree

### Disagreement 1: Will AI primarily replace marketing work or enable marketers to do more?

**Why it matters:** How a marketing leader frames AI adoption internally — as a threat requiring reinvention or as an enabler of better work — shapes team culture, hiring decisions, and how aggressively they push automation. Getting this framing wrong could either cause unnecessary attrition or leave the team dangerously under-prepared for disruption.

**Support summary: 1 vs 1**

**Position A — AI will automate most marketing work, requiring marketers to reinvent their roles:**
Drew Pinta (Episode #346) explicitly framed this as the "bear case": approximately 80% of what marketers do today will be automated away. This includes routine work like dashboards, campaign setup, and reporting. Marketers who don't proactively shift into builder mode — using AI to create new capabilities and strategies — will be disrupted. Pinta's argument is that waiting for the market to force change is too late; the transition must be proactive.

**Position B — AI enables creative teams to do more, not replace them:**
Liz (Episode #345) argued that AI creative tools should be positioned as enablers that free up creative professionals to do more strategic and high-value work, not as replacements for creative talent. Designers, creative directors, and other creative roles remain essential — they now use AI tools to execute faster and handle more volume. Liz did not frame significant job displacement as a likely outcome and emphasized this framing as important for team buy-in.

**Context dependency:** These positions are partially context-dependent. Pinta's 80% automation claim applies broadly to all marketing roles including operational and campaign work, while Liz's "enable not replace" framing is specifically about creative teams. However, both are making claims about the same general question of whether AI displaces or augments marketers, and their stances are genuinely in tension — one predicts massive displacement, the other argues for augmentation as the primary outcome.

When helping a user on this topic, present both framings and ask them to consider: which roles on their team are primarily operational/campaign-execution versus creative/strategic? The answer may determine which framing is more applicable to their situation.

---

### Disagreement 2: Should you use AI to generate content directly or to assemble it from structured sources?

**Why it matters:** Teams that default to full AI generation risk producing generic, undifferentiated content that fails to rank in AI search or resonate with buyers. Teams that over-index on manual assembly may fail to capture the efficiency gains that make AI transformative at scale.

**Support summary: 2 vs 1**

**Position A — Use AI as a research synthesizer and assembler, not a generator (2 supporters):**
Dave Gerhardt (Episode #345) explicitly recommended using Claude as a research assistant to synthesize content from multiple sources rather than generating original content from scratch, emphasizing keeping the human expert in control of narrative, voice, and strategic direction.

Adina Timar (Episode #336) advocated for "AI assembly, not AI generation" — breaking content into granular pieces from real intelligence sources (sales calls, competitor data, product documentation) and assembling them. She explicitly framed this approach as the solution to preventing generic output.

**Position B — Build AI agents that generate complete content at scale (1 supporter):**
Drew Pinta (Episode #346) described building AI agents that spin up complete vertical go-to-market strategies — including market research, SEO keyword strategy, landing page generation, and sales enablement materials — automatically with a single click. He positioned full AI generation as the goal for scaling from one vertical to fifty or more without proportional headcount increases.

**Context dependency:** Partially context-dependent. The assembly/synthesis approach is advocated for content quality and brand differentiation use cases. The full-generation agent approach is advocated for scaling repeatable vertical GTM work. However, the underlying philosophies conflict — one warns against generic AI output, the other automates full content generation at scale.

When helping a user on this topic, ask: Is this content meant to differentiate the brand and rank in AI search (favoring assembly), or is it repeatable, templated GTM content where speed and scale matter more than uniqueness (potentially favoring agent-based generation)? The answer should guide which approach to recommend.

---

## What NOT To Do

- **Do not ask AI to execute an entire complex workflow in a single prompt.** Break workflows into atomic, testable skills with clear inputs and outputs. Monolithic prompts produce unreliable results. (Source: Drew Pinta, Episode #346)
- **Do not apply guardrails uniformly to all AI agent actions.** Reserve guardrails for high-risk, customer-facing actions. Applying them to low-risk internal work slows teams down unnecessarily. (Source: Drew Pinta, Episode #346)
- **Do not use AI video generation for close-up talking-head footage.** Current tools do not produce acceptable results for facial expressions and lip-sync. Use human talent for talking heads and AI for B-roll and narrative content. (Source: Luke, Episode #345)
- **Do not use AI voice cloning without consent and compensation mechanisms.** Work with voice marketplaces that have proper consent and compensation structures in place. (Source: Luke, Episode #345)
- **Do not push AI-generated design directly to Figma before finalizing all decisions in Claude.** The Claude-to-Figma integration is currently one-directional; changes cannot be pulled back. (Source: Liz, Episode #345)
- **Do not allow users to directly modify shared Claude skills.** Establish a formal change request process to prevent skill drift and maintain design quality standards. (Source: Liz, Episode #345)
- **Do not rely on AI to generate content from scratch for SEO or AI search purposes.** LLMs produce median/average outputs. Content that needs to rank or be cited requires frontier knowledge, expert quotes, and proprietary data that AI cannot generate on its own. (Source: Eoin Clancy, Episode #336; Adina Timar, Episode #336)
- **Do not scrape and repackage competitor content.** This approach is explicitly called out as the old playbook that no longer works in an AI search environment. Prioritize frontier knowledge instead. (Source: Eoin Clancy, Episode #336)
- **Do not publish AI-generated content without SME validation.** LLMs frequently produce generic or factually incorrect advice. Always validate against real expert knowledge before publishing. (Source: Connor Beaulieu, Episode #336)
- **Do not expect AI creative skills to produce perfect output immediately.** Budget time for extensive testing, iteration, and refinement before rolling out to the broader organization. (Source: Liz, Episode #345)
- **Do not skip the human curation layer on AI-generated creative.** AI generation should never be the final step. Always have a creative professional review and refine outputs before publishing. (Source: Carter, Episode #345)

---

## Sources

| Episode | Guest | Date |
|---------|-------|------|
| Episode #346 | Drew Pinta | 2026-04-13 |
| Episode #346 | Dave Gerhardt (host) | 2026-04-13 |
| Episode #345 | Liz | 2026-04-09 |
| Episode #345 | Vicente | 2026-04-09 |
| Episode #345 | Carter | 2026-04-09 |
| Episode #345 | Luke | 2026-04-09 |
| Episode #345 | Dave Gerhardt (host) | 2026-04-09 |
| Episode #341 | Jeremy Chung | 2026-03-28 |
| Episode #336 | Adina Timar | 2026-03-09 |
| Episode #336 | Eoin Clancy | 2026-03-09 |
| Episode #336 | Connor Beaulieu | 2026-03-09 |