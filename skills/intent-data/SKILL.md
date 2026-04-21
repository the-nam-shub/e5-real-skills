---
name: intent-data
description: "Guidance for sourcing, evaluating, and activating intent data signals in B2B marketing — trigger when a user asks about intent data strategy, ABM targeting, account scoring, or intent vendor evaluation."
version: "2026-04-20"
episode_count: 9
---

# Intent Data: Sourcing, Evaluating, and Activating Signals in B2B Marketing

## Overview
This skill covers how B2B marketers should source, evaluate, layer, and activate intent data signals — from first-party behavioral signals to third-party vendor data to industry-specific triggers. All practices are sourced exclusively from Exit Five podcast guests across 9 episodes. Where guests disagree, those disagreements are surfaced explicitly rather than resolved.

---

## Building an Intent Signal Foundation

### Start with first-party signals as your anchor
Weight first-party intent signals more heavily than third-party data in account scoring and budget allocation decisions. First-party signals — pricing page visits, guided tour interactions, interactive demo engagement, content downloads from your own site — indicate direct engagement with your brand and are more reliable predictors of buying intent. Use third-party intent as a secondary layer to expand reach, but let first-party signals drive targeting and budget allocation. *(Source: Richard Meyer, Episode #341)*

*(Note: whether third-party intent data is trustworthy enough to act on directly is genuinely contested — see Where Experts Disagree)*

### Use interactive demo engagement as a first-party intent signal
Ungated interactive demos generate first-party intent data about which accounts are interested in specific features or use cases. Track which accounts view which demos and what sections they engage with. This provides more accurate intent signals than third-party data because you know exactly what the prospect cared about, not just that they were "in-market." Combine this first-party data with any remaining third-party intent tools to build a more complete picture. *(Source: Natalie Marcotullio, Episode #176)*

Embed multiple CTAs throughout the interactive demo — not just at the end. Use UTM parameters to track which demo visitors came from, and leverage account-level tracking via cookie and IP detection to identify which accounts engaged even when the demo is ungated. Top-performing demos using this approach achieved a 32% click-through rate. *(Source: Natalie Marcotullio, Episode #176)*

### Use website visitor data to trigger nurture campaigns
When you launch new content or campaigns, use tools that reveal which companies are visiting your website to identify target accounts showing interest. Pull the list of companies viewing specific content and use it to trigger personalized nurture campaigns that reference what their team was looking at, creating a marketing activation moment. *(Source: Taylor Udell, Episode #190)*

When publishing ungated content, measure success by: (1) tracking which target accounts viewed the content using tools like Clearbit or Koala, (2) checking if those accounts have active opportunities in your CRM and whether those deals close faster, (3) counting conversations started by sales reps using the content as a conversation starter, and (4) monitoring whether content helps navigate to power users or key personas. *(Source: Taylor Udell, Episode #190)*

---

## Sourcing and Expanding Intent Signals

### Go beyond standard intent data providers to find proprietary signals
Beyond Bombora and 6sense, look for industry-specific signals that indicate buying intent: job board activity (new hires at target accounts), 10-K filings and earnings calls (for public companies), commercial real estate transactions, lease signings, or other vertical-specific events. Use tools like Clay to automate collection of this data. Proprietary intent signals give you an edge competitors using the same commodity providers won't have. *(Source: John Short, Episode #201)*

### Use behavioral signals to define and target your ICP in paid media
Instead of relying solely on job title and company size, use behavioral intent signals to identify your true ICP. Look for companies that have video on their website, run webinars, are active in events, and show job changes. Use tools like Clearbit, 6sense, or similar to identify these signals and build target account lists for paid ads. *(Source: Cindy Dubon, Episode #341)*

*(Note: the reliability of third-party enrichment tools like 6sense for this purpose is contested — see Where Experts Disagree)*

### Identify accounts showing competitive intent
Use intent data to identify accounts actively researching competitors — G2 reviews, comparison pages, competitor website visits. These accounts show purchase intent but may not know about your solution. Create dedicated automation workflows to reach these accounts with brand-building and educational content before they finalize vendor selection. *(Source: Jean Cameron, Episode #315)*

*(Note: the reliability of third-party signals like G2 review activity for this purpose is contested — see Where Experts Disagree)*

### Leverage partner data platforms for additional intent signals
Use partner data platforms (Crossbeam, Reveal) to access intent signals from partner ecosystems. Apply this data at scale to identify both new acquisition targets and cross-sell opportunities within existing customer bases. Treat partner overlap data as a complement to first-party and web intent data. *(Source: Kris Rudeegraap, Episode #159)*

### Extract intent signals from podcast content using AI
Use AI tools (like ListenNotes) to automatically extract relevant snippets and insights from podcasts that prospects have appeared on or discussed. Pull 3–4 key talking points from a 45-minute episode and use those specific details in personalized outreach emails. This creates highly relevant personalization that would be impractical to do manually at scale. *(Source: Kris Rudeegraap, Episode #159)*

---

## Evaluating Intent Data Vendors

### Ask vendors two critical qualifying questions before buying
Most intent data in the market is low-quality and sold by multiple vendors under different names. When evaluating any intent data vendor, ask: (1) Do you share or resell this data to other vendors? If yes, the data is commoditized and not differentiated. (2) What constitutes a signal in your data? If the answer is "website visits" or "bitstream data," that is intent-to-learn, not intent-to-purchase. Better signals include reading case studies or comparison reports, visiting review sites, or other actions that indicate active evaluation. *(Source: Chris Rack, Episode #150)*

### Vet vendors on data sourcing and ownership
Ask three specific questions: (1) Where do you get your data? (2) Do you buy it or create it yourself? (3) If you buy it, who do you buy it from? Many providers purchase the same data from the same 1–2 sources, meaning competitors using different vendors receive identical signals. Providers unable to clearly answer these questions should be treated with skepticism. Proprietary or self-created signals offer competitive differentiation. *(Source: Chris Rack, Episode #140)*

### Prioritize signal quality over volume
When evaluating intent data providers, focus on the type and relevance of signals ingested rather than total volume. High-quality intent signals come from engagement with specific content types — peer review sites, case studies, comparison reports, pricing guides — that indicate active purchase consideration, not generic web page visits. Avoid providers claiming millions of signals monthly; volume often indicates noise rather than actionable intent. *(Source: Chris Rack, Episode #140)*

---

## Activating Intent Data in Campaigns

### Build an intent flywheel across multiple ad channels
Create a closed-loop system where first-party intent signals (website visits to pricing page, guided tours) trigger data enrichment in Clay, which syncs back to HubSpot and feeds into ad channels (Facebook, Google Display, LinkedIn) via a tool like Vector. As accounts show intent, increase ad budget allocation to those accounts, creating a compounding effect. Validate targeting accuracy on one channel (LinkedIn) before scaling to others. Use 13+ intent sources — first-party and third-party — to score accounts on ICP fit and intent. Richard's results using this approach: 2x impressions in one month vs. all of the prior quarter, 75% CPM decrease, 3.5x average monthly pipeline, 5.2x pipeline from paid channels directly. *(Source: Richard Meyer, Episode #341)*

### Segment your ABM target account list before spending
Do not spend budget against every account on your ABM list equally. Slice the list by intent signals (hot/warm/cold), product interest, and industry vertical. This allows you to personalize messaging and allocate budget more efficiently to accounts most likely to convert, reducing waste and improving ROI. Different segments may warrant different messaging, channels, and investment levels. *(Source: Kym Parker, Episode #201)*

### Build your target account list from CRM data first, then layer in intent
Start with trailing six months of CRM data to identify win/loss patterns and revenue trends by account type. Look for accounts where you're generating opportunities but losing deals — this signals interest but messaging or positioning gaps. Then identify industry-specific triggers (growth signals, content publishing, funding rounds) that indicate buying readiness. Layer in intent data last, after vetting vendors on data sourcing and signal quality. The list should be rooted in data rather than a sales wishlist. *(Source: Chris Rack, Episode #150)*

### Match intent data quality to your outreach strategy
If your intent data is weak or unproven, place those accounts into a nurture flow and track engagement with your own communications until they score higher. Only use direct outreach (calling, direct mail) when you have high-confidence intent signals. With strong intent, you can reach out directly and reference the specific signal (e.g., "I see you're evaluating HR software"). With weak intent, nurture first to build engagement signals before direct outreach. *(Source: Chris Rack, Episode #140)*

### Qualify leads at top of funnel on both firmographics and intent signals
When leads convert, immediately qualify them on two dimensions: (1) firmographic fit (company size, industry, geography, ICP alignment), and (2) buying intent signals (what content did they download, did they use the chatbot, did they request a demo). Leads that score well on both dimensions have the best velocity through the sales cycle. Route high-scoring leads to sales; nurture the rest. *(Source: Ruth Zive, Episode #175)*

---

## Where Experts Disagree

### Should you trust third-party intent data, or is first-party intent data fundamentally more reliable?

**Support summary: 4 vs. 4** — This is an evenly split disagreement among guests.

---

**Position A: First-party intent is more reliable; be deeply skeptical of third-party intent data**

Four guests argue that first-party signals should anchor your intent strategy and that third-party intent data is often too low-quality to act on without heavy vetting:

- **Richard Meyer (Episode #341, March 2026)** explicitly prioritizes first-party signals (pricing page visits, guided tour interactions) over third-party intent data in account scoring, using third-party only as a secondary layer to expand reach. His system generated 3.5x average monthly pipeline and 5.2x pipeline from paid channels by weighting first-party signals.

- **Natalie Marcotullio (Episode #176, September 2024)** argues that first-party intent from interactive demo engagement is more accurate than third-party intent data because you know exactly what the prospect cared about, not just that they were "in-market." She recommends combining first-party data with any remaining third-party tools — framing first-party as the anchor.

- **Chris Rack (Episode #150, June 2024)** states most intent data in the market is low-quality and sold by multiple vendors under different names. He argues most third-party intent data conflates intent-to-learn with intent-to-purchase, making it unreliable for ABM targeting. He asserts only Google and Bing reliably capture true purchase intent (via search).

- **Chris Rack (Episode #140, May 2024)** recommends vetting intent data providers on data sourcing and ownership, noting many providers purchase the same data from the same 1–2 sources, meaning competitors receive identical signals. He advises placing accounts with weak or unproven intent into nurture rather than direct outreach — implying low default confidence in third-party signals.

---

**Position B: Third-party intent data is valuable when layered with first-party signals and industry-specific triggers**

Four guests treat third-party intent data as a valid and actionable input, either as a baseline to supplement or as a specific signal type worth acting on:

- **Jean Cameron (Episode #315, December 2025)** recommends using third-party intent data — G2 reviews, competitor website visits, comparison pages — to identify accounts showing competitive intent and orchestrating dedicated automation workflows to reach them. No skepticism of data quality is expressed; it is treated as directly actionable.

- **John Short (Episode #201, December 2024)** recommends going beyond Bombora and 6sense to find industry-specific behavioral signals, implying standard third-party providers are a valid baseline worth supplementing rather than replacing. The framing is additive, not dismissive.

- **Kris Rudeegraap (Episode #159, July 2024)** recommends using partner data platforms (Crossbeam, Reveal) for third-party intent signals in acquisition and cross-sell, treating them as a complement to first-party and web intent data without expressing skepticism about data quality.

- **Cindy Dubon (Episode #341, March 2026)** recommends using tools like Clearbit and 6sense to identify behavioral intent signals (video presence, webinar activity, event participation) for ICP targeting in paid media, treating third-party enrichment tools as reliable inputs without qualification.

---

**Context dependency:** Chris Rack's skepticism is most applicable when evaluating commodity intent data vendors selling resold bitstream data. Jean Cameron and Kris Rudeegraap are referencing more specific third-party signals — G2 review activity, partner overlap data — that are arguably higher-quality than generic web traffic signals. The core disagreement about whether third-party intent data is trustworthy enough to act on directly versus requiring heavy vetting or replacement with first-party signals applies broadly regardless of company stage.

**Trend note:** The skepticism position (Chris Rack, Episodes #140 and #150, mid-2024) predates the more pragmatic layering approach seen in later episodes (Jean Cameron, Episode #315, December 2025; Richard Meyer, Episode #341, March 2026). However, Richard Meyer in the most recent episode still explicitly prioritizes first-party over third-party, so the skepticism has not fully given way to acceptance of third-party data.

**Why it matters for your decision:** If you are evaluating whether to purchase a third-party intent data subscription, apply Chris Rack's vetting questions first (data sourcing, signal definition, resale practices). If the vendor passes that bar — or if you are using specific, higher-quality signal sources like G2 review activity or partner overlap data — the layering approach described by Jean Cameron, John Short, and Kris Rudeegraap may be appropriate. If you cannot get clear answers from a vendor, default to investing in first-party signal infrastructure (interactive demos, website visitor tracking, guided tours) before spending on third-party data.

---

## What NOT To Do

- **Do not treat all intent signals as equal.** Generic web page visits and bitstream data are intent-to-learn, not intent-to-purchase. Do not route accounts to direct sales outreach based on these signals alone. *(Source: Chris Rack, Episodes #140 and #150)*

- **Do not buy intent data without vetting the vendor's sourcing.** Ask where the data comes from, whether it is purchased or proprietary, and whether it is resold to competitors. If the vendor cannot answer clearly, do not buy. *(Source: Chris Rack, Episode #140)*

- **Do not spend ABM budget equally across your entire target account list.** Failing to segment by intent level, product interest, and industry wastes budget on cold accounts and dilutes messaging. *(Source: Kym Parker, Episode #201)*

- **Do not build your target account list from a sales wishlist.** Root the list in CRM win/loss data and verified intent signals, not aspirational targets. *(Source: Chris Rack, Episode #150)*

- **Do not place CTAs only at the end of interactive demos.** Prospects who disengage before the end will not convert. Distribute CTAs throughout the demo. *(Source: Natalie Marcotullio, Episode #176)*

- **Do not use direct outreach (calls, direct mail) against accounts with weak or unproven intent signals.** Nurture those accounts first until they generate stronger first-party engagement signals. *(Source: Chris Rack, Episode #140)*

- **Do not measure ungated content success by MQL volume alone.** Track account-level visibility, deal velocity for accounts that engaged, and conversations started by sales using the content. *(Source: Taylor Udell, Episode #190)*

- **Do not assume high signal volume means high signal quality.** Providers claiming millions of monthly signals are often delivering noise. *(Source: Chris Rack, Episode #140)*

---

## Sources

| Episode | Guest | Date |
|---------|-------|------|
| Episode #341 | Richard Meyer | March 28, 2026 |
| Episode #341 | Cindy Dubon | March 28, 2026 |
| Episode #315 | Jean Cameron | December 25, 2025 |
| Episode #201 | John Short | December 12, 2024 |
| Episode #201 | Kym Parker | December 12, 2024 |
| Episode #190 | Taylor Udell | November 4, 2024 |
| Episode #176 | Natalie Marcotullio | September 16, 2024 |
| Episode #175 | Ruth Zive | September 12, 2024 |
| Episode #159 | Kris Rudeegraap | July 18, 2024 |
| Episode #150 | Chris Rack | June 17, 2024 |
| Episode #140 | Chris Rack | May 13, 2024 |