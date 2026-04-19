---
name: ai-in-marketing
description: "Guidance for implementing AI tools, workflows, and strategies across marketing functions — including content creation, creative production, team transformation, and AI search optimization. Trigger when a user asks how to use AI in their marketing work."
version: "2026-04-19"
episode_count: 4
---

# AI in Marketing

## Overview
This skill covers how B2B marketing teams can effectively adopt and implement AI tools across content, creative production, go-to-market strategy, and search optimization. It also addresses how to structure teams, govern AI outputs, and build durable AI-enabled workflows. All practices are sourced exclusively from Exit Five podcast guests across four episodes (Episodes 336, 341, 345, and 346).

---

## Team Transformation and AI Adoption

### Secure Leadership Mandate Before Launching AI Initiatives
Get explicit CEO or leadership approval to allow marketing team members to deprioritize current job responsibilities in favor of learning and building with AI tools. The mandate should explicitly state it is acceptable if short-term metrics dip during the transition. This removes the fear that experimenting with AI will hurt performance reviews and creates psychological safety to invest time in learning. (Source: Drew Pinta, Episode 346)

### Identify and Empower Internal AI Champions
Find team members who are already quietly using AI tools and turn them into evangelists. Have them record Loom videos showing what they built and how they did it, conduct demos for the team, and share their workflows. This bottom-up approach is more effective than top-down training because people get excited seeing peers like them successfully using the tools. (Source: Drew Pinta, Episode 346)

### Shift Marketing Roles from Campaign Runners to AI-Enabled Builders
Transition marketing roles away from executing campaigns manually — clicking buttons in platforms, building dashboards by hand — toward building AI agents and systems that do marketing at scale. Marketers become builders enabled by tools like Claude Code, creating systems that are more effective than what non-marketers would build because they bring deep domain expertise and platform knowledge. (Source: Drew Pinta, Episode 346)

*(Note: the degree to which AI replaces versus enables marketers is contested — see Where Experts Disagree)*

### Lean Into Marketers' Structural Advantage in the AI Era
Recognize that AI and LLMs are trained to produce median, average outputs — which is a liability in marketing, where differentiation and creativity are the point. Average is sufficient in backend engineering (code that runs and passes tests), but not in marketing. This gives marketers a structural advantage over engineers in the AI era: human taste, creativity, and differentiation will remain valuable in marketing longer than in many other functions. Lean into this advantage rather than treating AI as a threat. (Source: Drew Pinta, Episode 346)

---

## Building AI Agents and Workflows

### Decompose Marketing Workflows into Atomic, Chainable Skills
When building AI agents for marketing, break complex workflows into small, atomic pieces. For each piece, create a Claude skill with clear inputs, outputs, and test cases (evals). This makes skills reusable, testable, and chainable. Rather than asking Claude to execute an entire vertical go-to-market strategy at once, decompose it into discrete skills such as "research vertical pain points," "generate SEO keywords," and "create landing page copy." This approach makes the system more reliable and maintainable. (Source: Drew Pinta, Episode 346)

### Build AI Agents to Scale Vertical Go-to-Market Strategy
Build an AI agent that replicates the workflow of a successful vertical specialist. Decompose their workflow into atomic pieces, create Claude skills for each piece with clear inputs, outputs, and evals, then chain them together. The agent can then spin up a complete go-to-market strategy for a new vertical — including market research, SEO keyword strategy, landing page generation, sales enablement materials, and channel-specific tactics — with a single trigger. This allows scaling from one vertical to fifty or more without hiring proportionally more people. (Source: Drew Pinta, Episode 346)

### Classify Agent Actions as Low-Risk or High-Risk and Apply Guardrails Accordingly
Classify AI agent actions as low-risk (internal work like creative generation) or high-risk (customer-facing actions like sending emails or interacting with ad platforms). Apply guardrails only to high-risk actions. For example, create internal middleware that validates HubSpot interactions to prevent sending duplicate emails or other errors. This allows teams to move fast on low-risk work while protecting the business from high-risk mistakes. (Source: Drew Pinta, Episode 346)

### Use MCP Servers to Connect Marketing Tools Directly to Claude
Build or use MCP (Model Context Protocol) servers that allow Claude to connect to and interact with marketing tools like HubSpot, Ramp, and other platforms. This enables marketers to ask Claude questions about their data and have Claude pull information directly from those systems — for example, "Has our email list growth slowed in the last 90 days?" — eliminating the need to manually request data from a data analyst. (Source: Dave Gerhardt, Episode 346)

### Document Creative Processes Before Automating Them
Before building AI skills or automating creative workflows, first document your existing creative processes. Identify which tasks are repeatable and systematic, then use AI to automate those specific workflows. This ensures you are automating the right things and that your AI implementation aligns with how your team actually works. Documentation also makes it easier to train the AI model on your specific requirements and brand standards. (Source: Liz, Episode 345)

### Budget Significant Time for Building and Refining AI Skills
Building effective AI skills is not a one-time effort. Expect to invest hours of feedback, iteration, and refinement to get a skill to produce quality output consistently. This is similar to building any internal tool or process — it requires ongoing maintenance and improvement. Teams should budget time and resources accordingly rather than expecting immediate perfect results. (Source: Liz, Episode 345)

---

## Self-Serve Design and Brand Governance

### Build an Org-Wide Claude Brand Skill for Self-Serve On-Brand Design
Create a Claude skill (using Claude Enterprise or Team plan) that encodes your brand guidelines, visual styles, and tone into reusable instructions. Input your brand guide as a structured "mega scale" of brand information, then use the skill creator to generate instructions for repeatable design requests — infographics, sales decks, LinkedIn visuals. This enables non-designers across the organization to self-serve on-brand creative without going through design bottlenecks. Use Notion integration to store markdown files of skill instructions and manage change requests through a formal process. (Source: Liz, Episode 345)

### Use Claude + Figma Integration to Generate On-Brand Infographics
Leverage Claude's Figma MCP integration to generate infographics directly from data input in Claude. Input your data and design requirements using your brand skill, and the tool will push the design to Figma for download as a JPEG. Note that this is currently one-directional (Claude to Figma only), so finalize all design decisions in Claude before pushing to Figma. This workflow is particularly useful for demand gen dashboards and data visualization. (Source: Liz, Episode 345)

### Integrate Claude with Notion to Automate Design Tasks from Task Management
Set up a Claude-Notion integration where you can drop task links directly from your Notion board into Claude chat. Claude will read the task details and automatically execute the associated design workflow. The skill runs, generates the output, and opens it in Google Slides with all brand guidelines applied. This creates a seamless workflow where design requests flow from task management directly to execution without manual handoffs. (Source: Liz, Episode 345)

### Implement a Formal Change Request Process to Govern AI Skill Updates
When rolling out a self-serve Claude skill to the organization, establish a formal change request process where users submit feedback through a dedicated channel (e.g., a Notion form) rather than directly modifying the skill. Have a design team review and approve requests, separating one-off custom requests from systemic improvements that should be baked into the skill instructions. This prevents skill drift while still capturing valuable feedback from users and maintaining design quality standards. (Source: Liz, Episode 345)

### Set Realistic Expectations for AI Design Output Quality
AI design tools will not produce perfect output on the first try, and that is normal. Plan for an iterative feedback loop: test the tool extensively before rolling out to the broader organization, monitor edge cases as users interact with it, and continuously refine the underlying skill instructions based on real-world usage. The efficiency gains from self-serve design far outweigh the occasional edge cases that require manual fixes. (Source: Liz, Episode 345)

---

## AI-Enabled Creative Production

### Use AI to Enable Creative Teams, Not Replace Them
AI creative tools should be positioned as enablers that free up creative professionals to do more strategic and high-value work. Designers, creative directors, and other creative roles remain essential — they now use AI tools to execute faster and handle more volume. This framing helps with team buy-in and ensures creative professionals see AI as a tool that makes their jobs better.

*(Note: this framing is contested — see Where Experts Disagree)*

(Source: Liz, Episode 345)

### Maintain a Human Curation and Taste Layer on Top of AI-Generated Creative
AI generation should not be the final step in creative production. Always include a human curation layer where creative professionals review, select, and refine AI outputs based on brand taste, strategic fit, and quality standards. This is especially important as you experiment with new AI capabilities — have humans decide whether AI-generated options work for your brand before publishing. This prevents brand dilution while still capturing efficiency gains from AI production. (Source: Carter, Episode 345)

### Hire AI Creative Producers Who Can Execute Full Video Production with AI Tools
Create a new role called "AI Creative Producer" who can manage the full video production workflow using AI tools — from scripting to storyboarding to final editing. When hiring for this role, evaluate candidates based on portfolio work and take-home challenges where they produce a full video in 30 minutes to an hour. This role differs from traditional motion designers or video editors; it requires understanding of creative direction, cinematography, and the ability to prompt and iterate with AI tools effectively. (Source: Luke, Episode 345)

### Hire Creative Generalists Who Understand Direction, Cinematography, and Copy
As AI tools handle specialized production tasks, shift hiring toward creative generalists who understand overall creative direction, cinematography principles, and copywriting, and who can work across multiple disciplines. Rather than hiring specialists in motion graphics, video editing, or design, look for people who can conceive ideas, write scripts, direct the overall vision, and use AI tools to execute across multiple mediums. (Source: Vicente, Episode 345)

### Shift the Creative Process from Selling Ideas with Mockups to Rapid Prototyping
AI tools enable creative directors to move from spending time creating elaborate mockups and presentations to sell ideas, to immediately starting production on day one. Instead of building decks to convince stakeholders, generate rough versions of the creative concept quickly and iterate based on feedback. This accelerates the creative process and allows for more experimentation based on actual output rather than theoretical concepts. (Source: Vicente, Episode 345)

---

## AI Video Production

### Use AI Video Generation for B-Roll and Narrative Content — Not Talking-Head Footage
Current AI video generation tools produce high-quality results for B-roll, animated sequences, and narrative-driven content, but not yet for talking-head footage where facial expressions and lip-sync matter. Avoid using AI for close-up talking heads; instead use voice-over narration with AI-generated visuals, or reserve talking-head footage for actual human talent. (Source: Luke, Episode 345)

### Build Full Brand Videos with AI in One Day Using Voice, Image, and Video Models
Create complete brand videos by combining AI voice cloning (using a voice marketplace or personal voice clones), image generation models (e.g., Nano Banana), and AI video tools. One person can execute from idea to finished video in a single day by leveraging these integrated tools rather than requiring traditional production crews. This approach works best for narrative-driven content rather than talking-head footage. (Source: Luke, Episode 345)

### Generate Video Storyboards Using AI Image Models Before Video Production
When creating AI-generated videos, start by developing a script in Claude, then generate storyboard images using Nano Banana or similar image models by prompting different keyframes for each scene. Use these image references as inputs to video generation tools, which produce better and more consistent results when given visual references. This workflow reduces production time by approximately two weeks compared to traditional production while maintaining visual consistency. (Source: Vicente, Episode 345)

### Generate Specific B-Roll Shots with AI Instead of Relying on Stock Video
Use AI image and video generation tools to create specific B-roll shots that match your exact creative vision rather than being constrained by available stock footage. This is particularly valuable for branded environments or unique visual concepts that don't exist in stock libraries. This approach reduces production costs and timelines while giving you creative control over the exact shots needed. (Source: Carter, Episode 345)

### Calculate AI Video Production Cost Per Generation vs. Traditional Production
When evaluating AI video tools, compare the cost per generation (typically approximately $3 per video generation, with generation taking roughly 30 seconds) against the cost of traditional production (crew, equipment, talent). This shifts the economics of video production and enables broader use of video across marketing for use cases that would never have justified traditional production budgets — such as customer education videos and internal training. (Source: Luke, Episode 345)

### Use AI Video Production to Create Customer Education Content at Lower Cost
Customer education videos are typically expensive to produce but high-value for customer success. AI video tools make it economically viable to create these videos for a few hundred dollars and a couple of weeks of production time, versus the traditional investment required. This enables you to create video content for use cases that would never have justified traditional production budgets. (Source: Vicente, Episode 345)

### Test Voice Cloning vs. Dubbing for Localization Based on Language Pairs
When localizing video content across languages, experiment with both voice cloning (replicating the original speaker's voice in a new language) and dubbing (using native speakers) to determine which sounds more natural for specific language pairs. Voice cloning works better for romance-to-romance language pairs (e.g., Spanish to French), while dubbing with native voices works better for distant language pairs (e.g., English to Asian languages). Document which approach works best for each language combination to inform future localization decisions. (Source: Carter, Episode 345)

### Use Voice Marketplaces with Consent and Compensation for Voice Cloning
When using AI voice cloning for marketing, work with a voice marketplace where real voice actors consent to have their voices cloned and receive compensation for usage. For celebrity or high-profile voices, implement a request-based approval process where the voice owner can control how their likeness is used and which brands represent them. This ensures legal compliance, ethical use, and ongoing compensation for voice talent. (Source: Luke, Episode 345)

### Combine Motion Capture with AI-Generated Designs and Voice Sync
Experiment with motion capture technology to animate designs created by your design team, then sync those animations with AI-generated voiceovers. This hybrid approach combines human design creativity with AI animation and voice capabilities, creating polished video content that leverages the strengths of both human and AI production. (Source: Carter, Episode 345)

### Use Descript and Claude to Generate YouTube SEO Tags and Descriptions
Upload YouTube videos to Descript, use Claude with custom prompts to generate rich SEO tags and descriptions, then validate those tags using the VidIQ plugin on YouTube. This workflow automates what would normally require coordination with an SEO team, allowing you to manage YouTube optimization independently while maintaining quality through validation. (Source: Carter, Episode 345)

---

## AI-Assisted Content Creation

### Use Claude as a Research and Synthesis Tool, Not a Content Generator
Rather than using AI to generate original content from scratch, use Claude as a research and synthesis tool. Gather multiple source materials — transcripts, articles, notes — provide them to Claude with clear context about your audience and goals, and have Claude help organize and synthesize the information. This approach leverages AI's strength in information synthesis while keeping the subject matter expert in control of the narrative, voice, and strategic direction. This is particularly effective for newsletter writing and content curation. (Source: Dave Gerhardt, Episode 345)

### Build Content Through AI Assembly, Not AI Generation
Shift mindset from using AI to generate full pages to using AI to assemble granular pieces of content from multiple intelligence sources. Break down content creation into small, discrete steps: extract intelligence from sales calls, competitor data, product documentation, and internal knowledge; format each piece; map intelligence to specific content sections; write one section at a time with focused context; then reassemble. This granular approach prevents generic output and ensures each component is high-quality and sourced from real data. (Source: Adina Timar, Episode 336)

### Build Brand Kits from Structured Intelligence Sources
Create comprehensive brand kits by extracting and structuring intelligence from sales transcripts, product documentation, and internal knowledge bases. Use markdown formatting for LLM readability. Include granular details: product lines, specific features, pricing, key differentiators, and technical specifications extracted from sales calls. Validate accuracy against source material. This ensures AI systems can understand and apply your brand voice consistently across content generation. (Source: Adina Timar, Episode 336)

### Extract Real Questions and Language from Sales Calls for Content
Pull actual customer questions and language from sales calls (via Gong or similar tools) and use them to inform content creation. Cluster these questions by topic to understand what people are actually asking and the terminology they use. Then use this intelligence to create content that answers real questions in real language, rather than relying on generic AI-generated content. This can be done manually or automated with AI clustering. (Source: Eoin Clancy, Episode 336)

### Validate AI Output Against Subject Matter Expert Reality
When AI generates content recommendations, validate them against real expert knowledge. LLMs often produce generic or incorrect advice. Subject matter experts can catch these errors and provide real-world context that makes content more valuable. For example, LLMs might suggest flashy business names, but a real attorney knows the opposite is true for legal filings. This validation step is critical for maintaining accuracy and trust. (Source: Connor Beaulieu, Episode 336)

### Automate Expert Quote Sourcing with a Structured Workflow
Build a workflow that identifies quote opportunities in existing articles, frames strategic questions, routes them to relevant subject matter experts via Slack, and collects answers for insertion back into content. This automates the operational burden of sourcing expert quotes at scale without automating the quality creation itself. The workflow takes article URLs, uses AI to identify five quote opportunities with context, searches a knowledge base of experts by specialty, and pings them via Slack to claim and answer questions. (Source: Connor Beaulieu, Episode 336)

### Rebuild Competitor Comparison Pages with Depth and Neutrality
Instead of surface-level feature comparisons, rebuild competitor pages from scratch using multiple intelligence sources: live competitor analysis, sales call transcripts, G2 reviews, product documentation, and LLM prompting. Structure the page with specific sections, include cases where competitors win, and provide non-biased comparisons backed by sources. This approach builds trust with both humans and LLMs by showing depth, accuracy, and fairness rather than marketing spin. (Source: Adina Timar, Episode 336)

---

## AI Search Optimization

### Prioritize Frontier Knowledge to Differentiate in AI Search
Focus on creating content with frontier knowledge — information that LLMs don't yet know, cannot answer, or don't have access to. This is the primary lever for getting cited in AI search results. Examples include proprietary product data, internal expert insights, or unique research. This approach replaces the old playbook of scraping and repackaging competitor content. (Source: Eoin Clancy, Episode 336)

### Meet the Higher Bar for AI Search Citations
The bar for appearing in AI search results is significantly higher than ranking in traditional Google search. To increase likelihood of citation in AI search, include more data points, more expert quotes, more internal links, and richer structure than you would for standard SEO. Research shows the gap between Google and AI search requirements is growing, creating an opportunity for those who invest in quality content now. (Source: Eoin Clancy, Episode 336)

### Identify AI Search Gaps Using Search Console and Prompt Analysis
Use Google Search Console to find long-tail queries that look like AI questions rather than traditional search queries. Build a comprehensive library of potential prompts people might ask LLMs about your topic. Analyze which prompts don't mention your brand and which ones mention you but in the wrong context. Use these insights to prioritize which pages to refresh or create, focusing on gaps where LLMs are recommending competitors instead of you. (Source: Adina Timar, Episode 336)

### Quick Win: Refresh Existing High-Performing Content with Expert Quotes and Data
If you want a high-value win without building from zero, identify existing high-performing pages and add expert quotes or data points to them. This is faster than creating new content, leverages existing traffic, and immediately improves E-E-A-T signals and AI search visibility. Use internal experts, sales calls, or proprietary data as sources. (Source: Eoin Clancy, Episode 336)

---

## Competitive Intelligence with AI

### Use Claude to Automate Deep Research into Ad Libraries for Competitive Intelligence
Use Claude or similar AI to analyze Meta and Google Ad transparency libraries to identify what competitors and portfolio companies are advertising — their messaging, creative, and targeting. This can reveal pain points, marketing tech stack issues, and conversion problems. Claude can help automate the process of extracting insights from these public ad libraries, which can then inform outreach messaging and positioning. (Source: Jeremy Chung, Episode 341)

---

## Where Experts Disagree

### Will AI Primarily Replace Marketing Work or Enable Marketers to Do More?

This is a genuinely contested question among guests, and how a marketing leader frames AI adoption internally — as a threat or an enabler — shapes team culture, hiring decisions, and how aggressively they invest in AI transformation.

**Support summary: 1 vs 1**

---

**Position 1: AI will automate approximately 80% of current marketing work**
*(Source: Drew Pinta, Episode 346)*

Drew Pinta explicitly framed this as the "bear case": approximately 80% of what marketers do today will be automated away. This includes routine work like dashboards, campaign setup, and reporting. Marketers who do not proactively reinvent their roles — shifting into builder mode and using AI to create new capabilities — will be disrupted. Pinta's framing is urgent and transformational: waiting is not a safe option.

---

**Position 2: AI enables creative teams to do more, not replace them**
*(Source: Liz, Episode 345)*

Liz argued that AI creative tools should be positioned as enablers that free up creative professionals to do more strategic and high-value work, not as replacements for creative talent. Designers, creative directors, and other creative roles remain essential — they now use AI tools to execute faster and handle more volume. Liz did not frame significant job displacement as likely, and emphasized that this framing is important for team buy-in.

---

**Context dependency:** These positions are partially talking past each other. Pinta's 80% automation claim applies broadly to all marketing roles, including operational and campaign work. Liz's "enable not replace" framing is specifically about creative teams. However, both are making claims about the same general question — whether AI displaces or augments marketers — and their stances genuinely conflict on the degree of displacement expected.

**What this means for you:** When advising on AI adoption strategy, present both framings to the user. For operational and campaign-execution roles, Pinta's more disruptive framing may be more applicable. For creative roles, Liz's enablement framing may be more accurate — and is also more effective for internal change management. Do not present either position as settled consensus.

---

## What NOT To Do

- **Do not ask Claude to execute an entire complex workflow in a single prompt.** Decompose workflows into atomic skills with clear inputs, outputs, and evals, then chain them. (Source: Drew Pinta, Episode 346)
- **Do not apply guardrails uniformly to all AI agent actions.** Reserve guardrails for high-risk, customer-facing actions. Applying them to low-risk internal work slows teams down unnecessarily. (Source: Drew Pinta, Episode 346)
- **Do not use AI video generation for talking-head footage.** Current tools do not produce acceptable quality for close-up faces with lip-sync. Use AI for B-roll and narrative content instead. (Source: Luke, Episode 345)
- **Do not use AI generation as the final step in creative production.** Always include a human curation layer to review, select, and refine AI outputs before publishing. (Source: Carter, Episode 345)
- **Do not use AI to generate full content pages from scratch.** Use AI to assemble granular pieces from real intelligence sources — sales calls, product docs, competitor data — rather than generating generic content. (Source: Adina Timar, Episode 336)
- **Do not publish AI-generated content without validating against subject matter experts.** LLMs produce generic or incorrect advice. Expert validation is critical for accuracy and trust. (Source: Connor Beaulieu, Episode 336)
- **Do not rely on the old SEO playbook of scraping and repackaging competitor content for AI search.** AI search rewards frontier knowledge — proprietary data, internal insights, unique research — not recycled content. (Source: Eoin Clancy, Episode 336)
- **Do not clone voices without consent and compensation.** Use voice marketplaces where voice actors have opted in and are compensated for usage. (Source: Luke, Episode 345)
- **Do not allow users to directly modify shared AI skills.** Implement a formal change request process to prevent skill drift and maintain quality standards. (Source: Liz, Episode 345)
- **Do not expect AI design tools to produce perfect output on the first try.** Plan for iterative refinement and budget time accordingly. (Source: Liz, Episode 345)
- **Do not wait for the market to force AI adoption.** Marketers who proactively reinvent their roles now will have a significant advantage over those who wait. (Source: Drew Pinta, Episode 346)

---

## Sources

| Episode | Guest | Date |
|---------|-------|------|
| Episode 336 | Adina Timar | 2026-03-09 |
| Episode 336 | Eoin Clancy | 2026-03-09 |
| Episode 336 | Connor Beaulieu | 2026-03-09 |
| Episode 341 | Jeremy Chung | 2026-03-28 |
| Episode 345 | Liz | 2026-04-09 |
| Episode 345 | Vicente | 2026-04-09 |
| Episode 345 | Carter | 2026-04-09 |
| Episode 345 | Luke | 2026-04-09 |
| Episode 345 | Dave Gerhardt | 2026-04-09 |
| Episode 346 | Drew Pinta | 2026-04-13 |
| Episode 346 | Dave Gerhardt | 2026-04-13 |