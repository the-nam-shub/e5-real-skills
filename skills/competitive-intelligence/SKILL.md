---
name: competitive-intelligence
description: "Helps marketers build, organize, and activate competitive intelligence—covering research methods, positioning frameworks, sales enablement formats, and automated monitoring workflows. Trigger when a user needs to understand their competitive landscape, develop competitive positioning, enable sales against competitors, or set up ongoing competitive monitoring."
version: "2026-04-20"
episode_count: 31
---

# Competitive Intelligence

## Overview
This skill covers how B2B marketers research competitors, develop competitive positioning, enable sales teams, and build automated systems for ongoing competitive monitoring. All practices are sourced exclusively from guests on the Exit Five podcast; no external best practices have been added. Where guests disagree, both positions are presented with full attribution so you can make an informed choice.

---

## Researching the Competitive Landscape

### Primary Research Methods

When building competitive intelligence from scratch, prioritize primary research over surface-level observation.

- **Rebuild competitor comparison pages from scratch** using primary research: scrape competitor sitemaps and product documentation, extract G2 reviews, analyze live competitor product flows, and gather internal sales call insights. Structure comparisons with specific, sourced claims and include sections where competitors win—not just your advantages. This creates non-biased, detailed comparisons that both humans and LLMs trust more than generic feature lists. *(Source: Adina Timar, Episode #336)*

- **Mine G2, Capterra, and similar review platforms** for competitor reviews. Look for patterns in what customers praise and criticize to reveal which differentiators matter to buyers, what pain points competitors fail to address, and the exact language customers use to describe problems and solutions. Use these insights to inform battle cards, positioning, and messaging without needing additional interviews. *(Source: Matt Carnevale, Episode #250)*

- **Conduct competitive intelligence interviews with former competitor employees.** Reach out to former sales reps and product managers from competing companies via LinkedIn, offer compensation ($85–$105 for 30 minutes), and conduct direct, transparent interviews about how competitors position against you, their sales tactics, and why they win or lose deals. Be upfront about who you represent and respect any non-compete agreements. *(Source: Drew Giovannoli, Episode #221)*

- **Supplement direct customer interviews with secondary sources** when bandwidth is limited: listen to recorded sales calls (via Gong or similar), search competitor mentions in call recordings, mine review sites, attend trade shows and debrief sales teams, review competitor webinars, ask poll questions in your own webinars, and debrief internal teams (CEO, sales) after customer interactions. These sources don't replace interviews but maintain a steady flow of market insights. *(Source: Shoshana Kordova, Episode #250)*

### Building a Multi-Source Intelligence System

- **Establish three complementary intelligence channels:** (1) ongoing relationships with field teams (sales and customer success) to understand wins, losses, retention, churn, and upsell; (2) structured win-loss analysis to uncover why deals are won or lost; (3) a maintained network of "friendly" customers you can call for quick feedback. Actively insert yourself into field forums and meetings where this intelligence is discussed rather than waiting to be invited. *(Source: Jennifer Cannizzaro, Episode #267)*

- **Use CRM data to identify competitive patterns and test positioning hypotheses.** Analyze which competitors appear in lost deals, which use cases are most competitive, and which customer segments face specific competitive pressures. Use this data to form hypotheses, then validate with win-loss interviews and customer conversations. *(Source: Talya Heller, Episode #246)*

- **During win/loss interviews, ask about sales process quality**, not just product features and pricing. Ask what the competing vendor did well in their sales approach, who they brought to meetings, how responsive they were, and how the overall sales experience compared. Deals are sometimes won or lost based on sales execution rather than product differences. *(Source: Drew Giovannoli, Episode #221)*

### Monitoring Competitors Continuously

- **Set up an automated content monitoring and summarization workflow** that scrapes RSS feeds from selected competitor and industry websites every 15 minutes. Use AI to check relevance against your defined topics, extract full article content, summarize with Claude, and send results to Slack. Feed this curated content into custom GPTs to generate content ideas, identify trends, and create unique angles. This workflow can be built in 2–5 hours using Make or Zapier. *(Source: Ugi Djuric, Episode #278)*

- **Use AI agents to process Gong call transcripts automatically.** Set up agents that extract specific data (e.g., competitor mentions) and automatically populate Salesforce, update battle cards, or send Slack notifications. Every time a competitor is mentioned in a call, an agent summarizes the learnings and updates a competitive intelligence database. This scales insights from sales calls across your entire team without manual listening. *(Source: Tom Wentworth, Episode #304)*

- **Set up a Zapier Agent workflow** that listens to sales call recordings (e.g., from Fathom), extracts competitor mentions and objections, and populates a spreadsheet with structured data including: date, meeting ID, meeting title, competitor name, context of mention, sentiment, objection category, severity, and whether it was addressed. Include quality control rules in the prompt (e.g., exclude self-mentions, spell competitor names consistently). The output feeds dashboards tracking brand share of voice, new competitor emergence, and objection patterns. Expect the first version to have errors—plan for iterative prompt refinement through multiple test runs. *(Source: Dan, Episode #290)*

- **Build an AI-powered content research engine** that runs queries across multiple LLMs (Claude, ChatGPT, Perplexity), analyzes their responses, scrapes citations, stores results in a database, and compares your content against competitors and knowledge bases. The agent identifies content gaps, suggests new topics, and helps with content writing to unlock organic reach where competitors are missing. *(Source: Jennifer Delevante-Moulen, Episode #288)*

- **Load recordings of sales calls, SDR calls, and customer success calls into a corporate AI instance** (e.g., ChatGPT) to identify recurring pain points, reasons for lost deals, reasons for wins, and emerging customer trends. You can also create custom GPTs representing your customer personas to test whether positioning and messaging resonate. *(Source: Jennifer Delevante-Moulen, Episode #288)*

---

## Competitive Positioning

### Sequencing: Where to Start

*(Note: The order in which you conduct competitive analysis relative to defining your own positioning is contested — see Where Experts Disagree)*

- **Map three dimensions before building your central argument:** (1) what the founder believes is wrong or missing in the market, (2) what the market actually wants and needs to hear, and (3) what competitors are already saying (to find white space). The central argument is not extracted by asking the founder directly; it must be discovered by analyzing their founding story, market positioning, and competitive landscape. *(Source: Katelyn Bourgoin, Episode #344)*

- **Conduct gap analysis when choosing channels, content topics, or formats:** (1) identify where your target audience hangs out, (2) analyze what content or services already exist for that audience, (3) assess whether those offerings are crowded, infrequent, or low-quality, (4) identify the gap where you can enter with a differentiated, high-quality offering. *(Source: Erin May, Episode #337)*

- **Establish the company's authentic point of view before assessing the competitive landscape.** Avoid leading with competitive gaps, as this can dilute authentic messaging and cause you to become reactive to competitors. Once you understand why you're doing something, assess gaps to find opportunities that still align with your core POV. *(Source: Dmitry Shamis, Episode #238)*

### Developing Competitive Positioning

- **Position your company by reframing the competition, not just your product.** Rather than claiming you're "better" at the same thing competitors do, reframe what the competition is actually good at and position your product for a different use case or buyer. Example: instead of saying "we're better chat than Intercom," position Intercom as great for in-app messaging and product managers, while positioning your product for demand gen marketers who need conversational sales engagement. This shifts the conversation from feature comparison to buyer fit. *(Source: Dave Gerhardt, Episode #219)*

- **Distinguish sustainable product differentiation from temporary advantages** and concentrate messaging heavily on sustainable points. Work with product leadership to identify which capabilities are long-term differentiators versus temporary competitive gaps. This requires ongoing dialogue with product to validate that claimed differentiators are backed by real, lasting product strategy. *(Source: Jason Lyman, Episode #263)*

- **Validate market leadership claims with third-party research** before making them public. Hire a research agency to conduct independent research and validate the claim (e.g., "most used B2B password manager"). This provides credibility and defensibility for your positioning in competitive categories where multiple vendors claim leadership. *(Source: Melton Littlepage, Episode #223)*

---

## Sales Enablement for Competitive Situations

*(Note: The right format for competitive sales enablement materials is contested — see Where Experts Disagree)*

### Competitive Positioning Frameworks

- **Create a competitive positioning map:** a simple table mapping your distinct capabilities (3–5 max) against status quo, specific competitors, and competitive approaches. For each capability-competitor pairing, mark what's possible (green) and impossible (red). This gives sales teams a mental map of which capabilities to emphasize in each competitive situation, and enables content marketers, product teams, and outbound to extract relevant talking points. *(Source: Talya Heller, Episode #246)*

- **Group competitors by approach rather than individual vendor names.** Avoid listing every individual competitor separately. Instead, group them by competitive approach or method (e.g., "headless CMS approach," "agency approach," "server-side optimization"). Use specific competitor names only when they represent a truly distinct approach; otherwise, treat similar solutions as one competitive category. *(Source: Talya Heller, Episode #246)*

- **Create a market map for sales** showing use cases on one axis and competitors or competitive approaches on the other. Mark whether sales should expect to encounter each competitor in each use case. This can be adapted by territory, industry, tier, or geo depending on how your sales team is organized. *(Source: Talya Heller, Episode #246)*

- **Create targeted talk tracks only for situations sales will actually encounter**, rather than trying to be comprehensive. Battle cards fail because they try to cover everything rather than being contextual. *(Source: Talya Heller, Episode #246)*

### Competitive Offers and Campaigns

- **Design incentive programs specific to your competitive positioning** rather than generic discounts. Offer targeted incentives tied to switching from specific competitors (e.g., 50% contract cuts to customers migrating from Adobe, Sitecore, or Oracle CMS). This targets accounts already thinking about switching and provides a concrete catalyst to accelerate their decision timeline from "someday" to "this quarter." The offer should be authentic to your positioning and tied to a specific business outcome (migration, modernization). *(Source: Gurdeep Dhillon, Episodes #280 and #203)*

- **Use intent data to identify accounts actively researching competitors** (G2 reviews, comparison pages, competitor websites). Create dedicated automation workflows to reach these accounts with brand-building and educational content before they finalize their vendor selection. *(Source: Jean Cameron, Episode #315)*

---

## Competitive Intelligence in Paid and Organic Channels

### Paid Search

- **In paid search, target two main keyword categories:** (1) competitor alternative keywords (e.g., "X competitor alternatives"), which have high search volume from people actively evaluating your space, and (2) product-category keywords with relevant modifiers (e.g., "Apple MDM," "Apple Device Management," "Apple security"). *(Source: Sylvia Lepoidevin, Episodes #283 and #199)*

- **Deploy interactive product demos in Google Ads campaigns** targeting competitor product pages or keywords. This allows you to show prospects how your product differs from competitors visually and interactively rather than relying on copy alone. *(Source: Natalie Marcotullio, Episode #122)*

### Organic and Social

- **Calculate organic share of voice** by using competitive intelligence tools to compare your organic keyword share and traffic against 3–4 direct competitors in your niche. Track this metric over time to identify if competitors are gaining ground or if your brand is losing visibility. A declining share of voice indicates either algorithm changes or competitive pressure requiring investigation. *(Source: Andrei Țiț, Episode #269)*

- **Monitor brand mentions in AI search tools** using LLM visibility tools (such as Ahrefs Brand Radar) to track how often your brand is mentioned in AI-generated summaries across ChatGPT, Perplexity, Google AI Overviews, and other LLMs. Identify visibility gaps by finding keywords that trigger AI summaries containing competitor mentions but not your brand, then prioritize closing those gaps with targeted content. *(Source: Andrei Țiț, Episode #269)*

- **Use LinkedIn's built-in competitor reports** to compare engagement metrics (comments, shares, reactions) against named competitors. This shows whether you're winning share of voice on LinkedIn. *(Source: Anthony Blatner, Episode #243)*

- **Request a Share of Feed report from your LinkedIn account rep** showing your share of voice versus competitors to a specific audience. This metric shows whether you're winning more impressions and visibility than competitors on LinkedIn. *(Source: Anthony Blatner, Episode #243)*

- **Analyze competitor LinkedIn pages to identify high-performing content formats.** Use LinkedIn's built-in competitor analytics feature to identify which brands are achieving the highest engagement and review their content patterns. Peep Laja used this analysis to discover that memes generated 10–100x higher engagement than other content types, then implemented a daily meme posting strategy for his company page. *(Source: Peep Laja, Episode #119)*

- **On X, use the "See Similar Posts" feature** to find competitors' high-performing posts on topics you cover. Analyze why certain posts outperformed others (depth, formatting, structure) and use those insights to rewrite and improve your own content on the same topic. *(Source: Ross Simmonds, Episode #121)*

- **Create content that calls out competitor weaknesses or practices**, but follow three rules: (1) don't punch down—only target larger competitors; (2) don't make it personal; (3) don't share private information. This creates engaging content that resonates with customers who have had negative experiences with competitors without crossing ethical lines. *(Source: Dan Cmejla, Episode #134)*

---

## Where Experts Disagree

### 1. Should you use battle cards as your primary competitive sales enablement format?

**Support summary: 1 vs 1**

**Position A — Reject battle cards in favor of capability-based frameworks** *(Talya Heller, Episode #246)*
Battle cards are ineffective because they overwhelm sales reps with too much information in a format that doesn't map to real selling situations. They fail because they try to be comprehensive rather than contextual. Instead, use a simple table mapping 3–5 distinct capabilities against status quo and specific competitors, marking what's possible vs. impossible for each pairing. Create targeted talk tracks only for situations sales will actually encounter.

**Position B — Battle cards are valid when built from rigorous primary research** *(Adina Timar, Episode #336)*
Battle cards (and the competitor comparison pages that underpin them) are a valuable competitive enablement tool when rebuilt from scratch using primary research: scraped competitor sitemaps, G2 reviews, live product flows, and sales call insights. Structure them with specific, sourced claims and include sections where competitors win—not just your advantages. This creates non-biased, detailed comparisons that both humans and LLMs trust.

**Context dependency:** Talya Heller's critique may apply more to large sales teams with many competitors where reps are overwhelmed by comprehensive documents. Adina Timar's approach may suit teams that need detailed written comparisons for both human and AI consumption. However, both are explicitly addressing competitive sales enablement materials, so there is a genuine underlying disagreement about whether the battle card format itself is salvageable.

**Trend note:** None identified from the available data.

**What this means for you:** Before choosing a format, assess your sales team's size and context. If reps are overwhelmed and ignore existing materials, Heller's capability-map approach may be more actionable. If your team needs detailed, credible comparisons—especially for AI-assisted research—Timar's research-first rebuild may be more appropriate. The two approaches are not mutually exclusive: a capability map for in-call use and a research-backed comparison page for digital/AI consumption could coexist.

---

### 2. Should you start brand positioning by analyzing competitive gaps or by defining your own point of view first?

**Support summary: 2 vs 1**

**Position A — Competitive-gap-first** *(Katelyn Bourgoin, Episode #344; Erin May, Episode #337)*
Before building any ownable idea or positioning, map the competitive landscape to find white space. Katelyn Bourgoin describes a three-dimensional discovery process where mapping competitor messaging to find white space is explicitly required before identifying your central argument. Erin May recommends conducting gap analysis—assessing what content or services already exist for your audience and identifying where offerings are crowded or low-quality—as the method for choosing channels and positioning before committing to a strategy.

**Position B — POV-first** *(Dmitry Shamis, Episode #238)*
Establish the company's authentic point of view before assessing the competitive landscape. Leading with competitive gaps dilutes authentic messaging and makes you reactive to competitors. Only after defining your genuine POV should you assess gaps to find opportunities that still align with your core differentiation.

**Context dependency:** Dmitry Shamis may be speaking more to brand/creative positioning for established companies, while Katelyn Bourgoin and Erin May may be addressing early-stage or channel-level strategy. However, all three are explicitly discussing the sequencing of competitive analysis relative to positioning development, making this a genuine disagreement about process order.

**Trend note:** The two guests advocating for competitive-gap-first analysis (Episodes #337 and #344) are more recent than the POV-first advocate (Episode #238), though the sample is too small to draw a firm trend conclusion.

**What this means for you:** Consider your company's stage and the nature of the positioning work. If you're an established company with a clear identity and risk of becoming reactive, Shamis's POV-first approach may protect messaging integrity. If you're entering a new channel, category, or market and need to find where you can realistically win, Bourgoin's and May's gap-first approach may be more pragmatic. One synthesis: use your founding story and authentic beliefs as a filter, but don't finalize positioning without checking what competitors are already saying.

---

## What NOT To Do

- **Do not build competitor comparison pages from surface-level feature lists.** Generic feature comparisons are trusted less by both humans and LLMs than specific, sourced, primary-research-backed comparisons. *(Source: Adina Timar, Episode #336)*

- **Do not use battle cards that try to be comprehensive rather than contextual** if your sales team is large or faces many competitors—reps will ignore them. *(Source: Talya Heller, Episode #246)* *(Note: contested — see Where Experts Disagree)*

- **Do not list every individual competitor separately** in competitive frameworks. Group by competitive approach to avoid overwhelming sales with unnecessary detail. *(Source: Talya Heller, Episode #246)*

- **Do not lead with competitive gaps when developing brand positioning** if doing so causes you to chase white space that doesn't reflect your genuine differentiation. *(Source: Dmitry Shamis, Episode #238)* *(Note: contested — see Where Experts Disagree)*

- **Do not make competitive commentary personal, punch down at smaller competitors, or share private information** when using competitive content as a content pillar. *(Source: Dan Cmejla, Episode #134)*

- **Do not rely solely on direct customer interviews** for competitive intelligence when bandwidth is limited—secondary sources (call recordings, review sites, trade shows) can maintain a steady flow of insights. *(Source: Shoshana Kordova, Episode #250)*

- **Do not manually review call transcripts for competitive mentions** when AI agents can automate extraction, structuring, and routing of that intelligence at scale. *(Source: Tom Wentworth, Episode #304; Dan, Episode #290)*

- **Do not claim market leadership without third-party validation.** Unsubstantiated leadership claims lack credibility in competitive categories where multiple vendors make similar claims. *(Source: Melton Littlepage, Episode #223)*

- **Do not expect your first automated transcript-analysis workflow to be error-free.** Plan for iterative prompt refinement through multiple test runs before the output is reliable. *(Source: Dan, Episode #290)*

---

## Sources

| Episode | Guest | Date | Note |
|---------|-------|------|------|
| #344 | Katelyn Bourgoin | 2026-04-07 | |
| #337 | Erin May | 2026-03-12 | |
| #336 | Adina Timar | 2026-03-09 | |
| #315 | Jean Cameron | 2025-12-25 | |
| #304 | Tom Wentworth | 2025-11-17 | |
| #290 | Dan | 2025-10-13 | |
| #288 | Jennifer Delevante-Moulen | 2025-10-06 | |
| #283 | Sylvia Lepoidevin | 2025-09-18 | |
| #280 | Gurdeep Dhillon | 2025-09-08 | |
| #278 | Ugi Djuric | 2025-09-01 | |
| #269 | Andrei Țiț | 2025-07-31 | |
| #267 | Jennifer Cannizzaro | 2025-07-24 | |
| #263 | Jason Lyman | 2025-07-10 | |
| #255 | Kelly Hopping | 2025-06-16 | |
| #250 | Matt Carnevale | 2025-05-29 | Two guests appeared on this episode |
| #250 | Shoshana Kordova | 2025-05-29 | Two guests appeared on this episode |
| #246 | Talya Heller | 2025-05-15 | |
| #243 | Anthony Blatner | 2025-05-05 | |
| #238 | Dmitry Shamis | 2025-04-17 | |
| #223 | Melton Littlepage | 2025-02-27 | |
| #221 | Drew Giovannoli | 2025-02-20 | |
| #219 | Dave Gerhardt | 2025-02-13 | |
| #203 | Gurdeep Dhillon | 2024-12-19 | |
| #199 | Sylvia Lepoidevin | 2024-12-05 | |
| #134 | Dan Cmejla | 2024-04-22 | |
| #122 | Natalie Marcotullio | 2024-03-04 | |
| #121 | Ross Simmonds | 2024-02-29 | |
| #119 | Peep Laja | 2024-02-22 | |

*Note: Episodes #217 (Jessica Andrews), #261 (Mark Schaefer), #161 (Max Van Den Ingh), and #168 (Jenn Herman) contributed practices to this category that did not meet the specificity threshold for inclusion in this skill file.*