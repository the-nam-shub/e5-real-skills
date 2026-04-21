---
name: attribution-and-incrementality-measurement
description: "Guides marketers through measuring true marketing impact—covering incrementality testing, attribution model selection, geo-lift experiments, and how to avoid common measurement traps. Trigger when a user asks how to prove marketing ROI, measure a specific channel, set up attribution infrastructure, or resolve marketing-sales credit disputes."
version: "2026-04-20"
episode_count: 34
---

# Attribution and Incrementality Measurement

## Overview
This skill covers how B2B marketers should measure the true impact of their marketing investments—from experimental design and geo-lift testing to attribution model selection, self-reported data, and organizational alignment around measurement. All practices are sourced exclusively from guests on the Exit Five podcast. Where guests disagree, those disagreements are surfaced explicitly rather than resolved.

---

## Foundational Measurement Philosophy

### Shift from Attribution Credit to Incrementality
Reframe the measurement conversation away from "which touchpoint gets credit for this conversion" and toward "would this outcome have happened without my marketing investment." Incrementality measures the actual lift your marketing creates—the difference between a baseline scenario (no marketing) and your current state. This avoids the false causality problem of click attribution and works across all channels, including those that are hard to track. (Source: Pranav Piyush, Episode #239)

Establish your baseline organic demand before measuring marketing impact. Measure the number of prospects, leads, or customers that come to you with zero active marketing effort (organic search, word-of-mouth, brand equity, inbound). Any growth above this baseline is potentially incremental. Without this baseline, you cannot distinguish organic growth from marketing-driven growth. (Source: Pranav Piyush, Episode #130)

### Align Measurement Approach to Marketing Strategy
Design measurement frameworks that fit the nature of each marketing initiative rather than forcing all marketing into a single measurement model. Use measurement approaches appropriate to the channel and objective—surveys for brand awareness, event studies for stunts, incrementality tests for paid channels. *(Note: this principle is contested when applied to brand campaigns specifically — see Where Experts Disagree.)* (Source: Drew Pinta, Episode #346)

### Distinguish Which Question You Are Answering
Be explicit about which question you are trying to answer before choosing a measurement approach. If you are asking "Should we continue this campaign and what was its ROI?", use campaign-level attribution. If you are asking "Which team should own what percentage of our pipeline goal?", use pipeline contribution models. Do not try to answer both questions simultaneously with the same methodology—they require different approaches and will produce conflicting conclusions. (Source: Sean Lane, Episodes #274 and #187)

### Match Measurement Complexity to Budget Scale
For marketing budgets under $1M annually with 1–2 channels, use a simple spreadsheet to track reach/impressions and correlate them to outcomes. No special tools are needed. As you scale to multiple millions in budget across many channels, move to more sophisticated approaches like marketing mix modeling or incrementality testing vendors. Do not over-engineer measurement early. (Source: Pranav Piyush, Episode #130)

---

## Incrementality Testing Methods

### Geo-Lift Testing: Core Principles
Run controlled experiments to isolate the causal impact of marketing spend rather than relying on correlation or attribution models. For channels like billboards, out-of-home, or paid social, use geo-lift tests: run ads in certain geographies while holding out others, then compare performance metrics (SQLs, website sessions, brand awareness) between test and control geographies over time. This reveals what would have happened in the absence of the marketing spend and enables ROI calculation. (Source: Drew Pinta, Episode #346)

When running geo-lift tests, select test and control geographies randomly rather than choosing high-performing markets. Randomization preserves statistical assumptions and prevents bias. Use vendors that specialize in geo-lift testing rather than building this capability in-house, as it is not a high-leverage use of internal data science resources. (Source: Drew Pinta, Episode #346)

### Geo-Lift Testing: Specific Channel Applications
- **Out-of-home and digital billboards:** Select specific geographies to run OOH or digital billboard campaigns while monitoring aggregate conversion metrics (applications, demos, etc.) in test geographies versus control geographies where no OOH ran. Digital OOH platforms like Quividi and OneScreen allow precise geographic targeting. (Source: Pranav Piyush, Episode #259)
- **Billboards with holdout groups:** Buy billboards in one geography while holding out another similar geography as a control. Track demo bookings or your key conversion metric by geography over a 6-week period. (Source: Pranav Piyush, Episode #191)
- **Out-of-home single-market test before scaling:** Select one market and run normal performance campaigns as a control. Add OOH or TV spend in that market and measure the incremental lift in pipeline generation or revenue before committing larger budgets. (Source: Amrita Gurney, Episode #287)
- **Connected TV (CTV):** When a brand has maxed out direct-response channels like paid search and paid social, test CTV ads in specific geographies using a geotest to measure lift. CTV can work even with modest budgets ($30–$40K). Measure success by aggregate conversion metrics (MQLs, demos) in test versus control geographies. (Source: Pranav Piyush, Episode #259)
- **YouTube ads:** Run a YouTube ad campaign in specific geographies while monitoring MQLs or conversions in test versus control geographies. Before scaling, audit whether the brand has significant organic YouTube content that may be cannibalizing paid performance. If organic YouTube content is strong, paid YouTube ads may show zero lift. (Source: Pranav Piyush, Episode #259)
- **Google Performance Max:** When testing PMax, set up exclusions to prevent cannibalizing branded search, non-branded search, and other Google properties you are already investing in. Run the test in specific geographies and measure lift in MQLs or conversions in test versus control geographies. (Source: Pranav Piyush, Episode #259)

### Branded Search Incrementality
Run a geotest holdout on branded search: select specific geographies and cut branded search spend to zero (or significantly reduce it) for 4–6 weeks while monitoring conversion metrics (MQLs, demos, applications) in those test geographies versus control geographies where branded search continues. Measure whether conversions shift to organic search or decline. This reveals whether branded search is truly driving incremental conversions or simply cannibalizing organic traffic. Two Series C and Series E SaaS companies tested this and found millions in savings with no performance loss when organic SEO was strong. (Source: Pranav Piyush, Episode #259)

### Small-Budget Incrementality Testing
For brands with limited budgets ($500–$10K), avoid spreading spend across multiple channels nationally. Instead, run tests by splitting your target audience into test and control groups. For example, split an account list in half: advertise to half via LinkedIn while the other half receives no ads, then measure lift. Alternatively, focus all spend on a single geography to test a channel's impact. This allows statistically valid tests even with small budgets by concentrating spend and creating clear signal. (Source: Pranav Piyush, Episode #259)

### Multichannel Test Isolation
If you run a multichannel test (e.g., YouTube + OOH + CTV + Meta simultaneously) and see lift but the cost per incremental conversion is significantly higher than your other media investments, do not scale. Instead, pause the multichannel test and run individual channel tests in smaller geographies to isolate which channel is driving the lift and at what cost. This prevents wasting budget on inefficient channel combinations. (Source: Pranav Piyush, Episode #259)

### Channel Maturity Framework
Establish a multi-stage framework for evaluating and graduating marketing channels from experimental to mature status. Early stages require solid optimization events and baseline reporting setup. Mid-stage channels run in-platform incrementality tests (cheaper but less trustworthy). Mature channels pass rigorous external incrementality tests before being classified as core. This prevents premature scaling of unproven channels and ensures budget allocation decisions are based on validated performance. (Source: Drew Pinta, Episode #346)

---

## Measuring Brand and Upper-Funnel Campaigns

### Brand Awareness Surveys with Geographic Segmentation
Conduct weekly brand awareness surveys that include a geographic component to measure lift in brand awareness by region. Use historical data to establish the relationship between brand awareness lift and downstream funnel metrics. This enables measurement of upper-funnel initiatives (like billboards or regional campaigns) that don't drive immediate conversions but build awareness that converts over time. (Source: Drew Pinta, Episode #346)

### Event Study Methodology for Brand Stunts
Measure the impact of brand activations (e.g., experiential stunts) by forecasting baseline marketing performance for the week following the event, executing the stunt, then comparing actual results to the forecast. This isolates the causal impact of the creative initiative without requiring direct response attribution. (Source: Drew Pinta, Episode #346)

### Out-of-Home Lift Tracking
Track website visits, demo requests, opportunities created, and paid campaign performance (LinkedIn, Google Ads) during the 4–8 weeks when out-of-home campaigns are running and compare to baseline periods. For TV specifically, measure analytics lift within a 15-minute window after a spot airs to capture immediate response. (Source: Amrita Gurney, Episode #287)

### Mixed Media Modeling for Brand Campaigns
Implement a mixed media model (using tools like Pareto) to measure incremental impact of brand and awareness campaigns on pipeline and revenue. Flex budget up and down on specific channels and measure the incremental effect on website traffic, opportunities, and pipeline. Complement with incremental testing: pulse media in specific markets and measure the incremental impact on revenue. (Source: Ryan Narod, Episode #330)

For channels that don't generate digital touchpoints (e.g., LinkedIn organic impressions, podcast listens, video views), use marketing mix modeling (MMM) to estimate impact. Input relevant metrics (e.g., LinkedIn organic impressions, video engagement counts, podcast downloads) alongside conversion data, and MMM will return statistical estimates of each channel's contribution to conversions. (Source: Emir Atli, Episode #165)

### Awareness-to-Conversion Attribution Chain
Run awareness-stage creative in parallel with mid-funnel and bottom-funnel conversion creative. Test whether exposure to awareness creative increases conversion rates on subsequent bottom-funnel ads. For example, measure if people exposed to an awareness ad convert through a webinar ad or incentivized offer at 2x the rate of those without prior exposure. Use this data to justify top-of-funnel investment. (Source: Ryan Narod, Episode #330)

### Overall Website Lift as a Brand Measurement Proxy
Instead of attributing conversions to individual channels, measure the overall lift in website handraisers and return visitor rates after launching campaigns. Compare baseline metrics (e.g., 200 handraisers/month) to post-campaign metrics (e.g., 250 handraisers/month). Track return visitor percentage increases as an indicator that campaigns are driving awareness and repeat engagement. (Source: Tas Bober, Episode #154)

### Brand Search Correlation as a Proxy
Use brand search volume as a leading indicator of marketing effectiveness in B2B environments where linear attribution is impossible. If brand searches increase following marketing activities, and your sales team reports that trial signups are growing, and new trials report hearing about you through channels aligned with your marketing investments, your marketing is working. This approach acknowledges that modern B2B buying journeys are non-linear and that direct-click attribution misses the full picture. (Source: Madhav Bhandari, Episode #183)

---

## Attribution Infrastructure and Data Collection

### CRM Sync and Conversions API
Set up CRM sync and LinkedIn's Conversions API as mandatory infrastructure for measuring LinkedIn ad effectiveness beyond last-click attribution. CRM sync connects your first-party CRM data with LinkedIn's platform data, enabling you to see which accounts and contacts engaged with your ads and later converted. Conversions API allows you to track downstream actions (website visits, content downloads, demo requests, pipeline stage changes) back to the ad exposure. Together, these tools enable measurement across long B2B deal cycles. *(Note: the role of MTA infrastructure in budget allocation decisions is contested — see Where Experts Disagree.)* (Source: Davang Shah, Episode #338)

### Feed Offline CRM Data Back into Ad Platforms
Connect your CRM to ad platforms (Google Ads, Meta, LinkedIn) to send downstream conversion signals (SQLs, meetings booked, trials started, deals closed) back to the platform. Tag different conversion types with relative values (e.g., a trial is worth 2x a form fill). This trains the bidding algorithm to optimize for quality leads, not just volume, and reduces reliance on platform-only metrics. (Source: Kym Parker, Episode #201)

### Blend CRM and LinkedIn Data for Unified Attribution
Use data integration tools to pull LinkedIn campaign data and CRM data into Looker or Tableau. Create blends that match leads and deals to their source campaigns. This allows you to see the full journey: which LinkedIn campaign a person saw, when they visited your site, and whether they converted. This requires more setup than built-in tools but provides richer attribution. (Source: Anthony Blatner, Episode #243)

### Track Integrated Channel Touchpoints in CRM
Implement an integrated outbound strategy that runs email, LinkedIn outreach, and paid ads simultaneously and tracks the entire buyer journey across all channels in a single CRM record. Log every touchpoint chronologically. Use unique identifiers (work email, personal email, contact ID) to ensure all touchpoints map to the same contact record. Tools like Clay are useful for enrichment to ensure you have the right identifiers to stitch data together. (Source: Alex Fine, Episode #245)

### Capture Offline and Brand Touchpoints
Offline and brand-based marketing channels (LinkedIn organic, podcasts, events, community) don't leave digital footprints but are still trackable. Use two methods: (1) self-reported attribution via forms asking "How did you hear about us?" and categorize responses; (2) use call transcription tools (e.g., Gong) to extract mentions of how prospects heard about you from sales calls. Even without a digital pixel, if a prospect mentions a touchpoint in a form or call, it can be attributed. (Source: Emir Atli, Episode #165)

### AI-Powered Sales Call Transcript Analysis
Pipe Gong call transcripts through an LLM to identify mentions of how leads or customers heard about your company. This surfaces attribution signals that contradict or validate MTA models and reveals which channels are actually driving awareness and consideration, especially for brand and upper-funnel initiatives that traditional attribution misses. (Source: Drew Pinta, Episode #346)

Set up alerts in call recording software (like Fathom) for specific campaign names, influencer names, or channel keywords. The software will automatically transcribe calls and flag mentions, giving you a count of how many times each term was mentioned. You can also query the AI chat feature to ask questions like "How many times was this mentioned in the last 30 days?" Combine this with a "How did you hear about us?" field on your form for additional directional data. (Source: Jess Cook, Episode #321)

### Measure Marketing Without Pixels or Cookies
When tracking pixels and cookies are unavailable (due to GDPR, privacy regulations, or browser restrictions), measure marketing impact through alternative methods: analyze branded search volume changes, track direct traffic, gather sales team feedback on how customers heard about you, use lift testing with sufficient budget, and monitor view-through conversions. These methods can be more reliable than pixel-based attribution and may actually improve marketing by shifting focus from direct-response tactics to brand-building. (Source: John Short, Episode #148)

### Understand the Four Major Limitations of Click-Based Attribution
Click-based attribution (UTM tracking) has four critical blind spots: (1) it is biased against channels without clicks (video, social, offline, connected TV, billboards, direct mail); (2) it misses all offline marketing entirely; (3) privacy changes (like Apple stripping UTMs from Mail and Messages) continuously erode its reliability; and (4) clicks show coincidence, not causation. Do not stop tracking clicks, but do not use them alone to answer ROI and incrementality questions. Supplement with correlation analysis and experimentation to understand true causation. (Source: Pranav Piyush, Episode #130)

---

## Self-Reported Attribution ("How Did You Hear About Us?")

*(Note: how much weight to give self-reported data is a genuine area of disagreement among guests — see Where Experts Disagree before advising users on this topic.)*

When collecting self-reported attribution data, use an open text field rather than a dropdown menu. Dropdowns force users to pick from predefined options and often result in lazy selections. Open text fields reveal actual attribution sources and can surface unexpected channels (e.g., LLM search, specific content pieces, word-of-mouth). Kandji discovered that 17% of inbound traffic attributed to LLM search using this method. (Source: Sylvia LePoidevin, Episode #306)

When using a structured question rather than open text, construct it carefully with mutually exclusive, understandable options. Avoid grouping similar platforms together. (Source: Pranav Piyush, Episode #239)

When users sign up for your product or community, ask them: (1) Why did you sign up? (2) What's your role? (3) How did you hear about us? Pipe this data into a shared Slack channel so the team can see patterns in real time. Use these insights to double down on high-performing channels and topics. (Source: Dave Gerhardt, Episode #141)

Use automated post-signup surveys (e.g., Typeform) that trigger immediately after signup to ask new members how they heard about the community. Review this data regularly to identify your most effective audience-building channels. Exit Five found that 60% of new members came from LinkedIn, validating their focus on that platform. (Source: Matt Carnevale, Episode #233)

---

## Correlation Analysis as a Measurement Method

### Track Reach Metrics Across All Channels Weekly
Measure the number of people reached through each marketing channel (paid, owned, earned) on a daily or weekly basis. This includes LinkedIn audience size, email open rates, organic social reach, community engagement, advertising impressions, and PR mentions. Track this consistently over 6–9 months in a spreadsheet or tool. This creates a baseline to correlate against your output metric. (Source: Pranav Piyush, Episode #144)

### Map Channel Impressions to Business Outcomes
For each marketing channel, collect 12+ months of historical reach/impressions data and map it against your leading indicator metric (demos, trials, handraisers). Plot impressions on one axis and your outcome metric on the other to identify which channels show strong correlation. When impressions go up on a channel, do your demos go up? When they go down, do demos go down? This can be done in a simple spreadsheet with no special software. (Source: Pranav Piyush, Episode #130)

### Distinguish Correlation from Causation
Correlation is when two metrics move together (e.g., LinkedIn impressions and demos both increase). Causation is proving that the increase in impressions caused the increase in demos. You may see correlation but miss the true cause: a podcast ad you are not tracking may be the real driver of both LinkedIn engagement and website visits. To prove causation, run an experiment with a control group. Without a control, you only have correlation, not proof of cause and effect. (Source: Pranav Piyush, Episode #259)

---

## Reporting Attribution to Executives and Stakeholders

### Avoid "Retinal Burn" When Presenting Attribution Data
When presenting marketing channel performance data (e.g., cost per lead by channel), do not show a single attribution table that highlights one channel as dramatically more expensive without context or caveats. This creates "retinal burn"—the number burns into the decision-maker's retina and they will reference it for years as fact, even if it is misleading. For example, showing trade shows at $25,000 cost per lead on a last-touch basis will cause the CEO to say "trade shows cost 5x more than anything else" for three years, even if that metric does not account for pipeline influence or first-touch value. If you must show comparative data, either: (1) show multiple attribution models side-by-side, (2) provide context about what the data does and does not measure, or (3) have your sales partner (CRO) defend the program in the meeting if it was a joint decision. (Source: Dave Kellogg, Episode #342)

### Frame Brand Awareness ROI as Influence, Not Direct Attribution
When reporting on brand awareness campaigns, use the language of influence rather than direct attribution. Instead of claiming a campaign "generated X revenue," report that "X% of pipeline was exposed to the campaign" or "the campaign influenced X% of closed deals." This reframes expectations: brand awareness campaigns influence the buying journey rather than trigger individual conversions. (Source: Tagg Bozied, Episode #243)

### Build Custom, Flexible Attribution Reports
Build a reporting tool that allows marketers to create custom reports with flexible attribution models, buyer journey views, and specific metrics tailored to their questions. Include templates by industry. This enables marketers to tell a coherent story to the CFO/CEO and to get actionable insights for optimization. Pair custom reports with buyer journey views that show specific accounts from first touch to close. (Source: Emir Atli, Episode #165)

### Reframe Attribution Conversation Around Incrementality for Leadership
Stop using first-touch, last-touch, or multi-touch attribution models as the primary frame for leadership conversations. Instead, present measurement around incrementality: what portion of your pipeline comes from organic demand (word-of-mouth, brand equity built over time) versus what is driven by marketing and sales efforts? Present this as a layered model showing organic demand, brand equity, and then marketing/sales contribution. This aligns measurement with what CFOs and CEOs actually care about: incremental growth. (Source: Pranav Piyush, Episode #191)

### Use Attribution as a Decision-Making Tool, Not Scorekeeping
Attribution data should inform marketing decisions and help diagnose which channels or tactics are working, not be used to defend marketing to the CFO or to settle disputes with sales over credit. No attribution model is perfectly accurate. Treat attribution as useful for directional insights and experimentation, not as gospel truth. (Source: Ido Mart, Episode #229)

---

## Marketing-Sales Alignment on Attribution

### Establish Company-Wide Agreement to Avoid Attribution Disputes
Explicitly agree at the C-level that fighting over attribution is a waste of time and culturally damaging. Instead, focus on control groups, treatment groups, and progression metrics. Make this a cultural norm from the top down. (Source: Brian Kotlyar, Episode #331)

### Use Account-Based Territories to Eliminate Attribution Disputes
Assign all named accounts in your ICP to specific sales territories (e.g., 50 accounts per enterprise seller, 200 per mid-market seller). When a meeting is booked with any named account, credit the win to the team regardless of which function (marketing, SDR, sales) initiated contact. This eliminates unproductive credit-fighting and aligns all functions around a shared goal: getting meetings with named accounts. Use cohort analysis (e.g., comparing meeting rates for accounts receiving LinkedIn ads vs. those not receiving them) to measure channel effectiveness without requiring perfect attribution. (Source: Kyle Coleman, Episodes #198 and #123)

### Measure Overall Meetings Booked, Not Marketing-Sourced vs. Sales-Sourced
Stop tracking "marketing-sourced" vs. "sales-sourced" meetings. Instead, measure total meetings booked with prospects. This eliminates internal credit-claiming between marketing and sales and focuses both teams on the shared goal of growing overall pipeline. Measure success on the total number of meetings and pipeline, not on who gets credit for each one. (Source: Pranav Piyush, Episode #239)

### Measure Marketing's Influence on All Pipeline, Not Just Marketing-Sourced Deals
Instead of crediting marketing only for deals they directly source, measure marketing's influence on all revenue. This incentivizes marketing to focus on pipeline acceleration, deal size expansion, and account expansion—not just top-of-funnel volume. (Source: Mason Cosby, Episode #186)

### Document Attribution Rules and Pipeline Definitions
Create and maintain written documentation that defines what constitutes pipeline readiness, what qualifies as a first touch, and how you measure influence versus attribution. This removes ambiguity and reduces conflict between marketing and sales over credit for opportunities. The documentation should be agreed upon by both teams and used consistently. (Source: Ruth Zive, Episode #175)

### Integrate Inbound and Outbound Measurement Holistically
In enterprise sales cycles, inbound and outbound are inextricably linked and should not be treated as separate channels. An SDR may outbound to an account with no response for months, but when that same account is targeted with an ad, the contact may click through and be attributed as an inbound lead—yet the outbound motion created the awareness that made the inbound conversion possible. Measure influence and attribution holistically rather than crediting a single source. (Source: Ruth Zive, Episode #175)

### Establish 50/50 Attribution Agreement with Sales
Implement a 50/50 attribution agreement with sales to reduce finger-pointing and create accountability. Measure pipeline contribution as a shared metric between marketing and sales, with each team responsible for driving that number. *(Note: the underlying MTA model this is paired with is contested — see Where Experts Disagree.)* (Source: Kristine Segrist, Episode #277)

---

## ABM-Specific Measurement

### Measure ABM Efficacy Using Treatment and Control Groups
Among your universe of ideal target accounts, randomly assign some to receive ABM programs (treatment) and hold others as control. Measure lift in key metrics: conversion from unengaged to stage-one opportunity, and stage-one to stage-two conversion. This isolates the impact of ABM separate from baseline conversion rates. Example: treatment group converts to stage one at 32% higher rate than control; stage-one-to-stage-two conversion is 38% higher. This approach proves ABM ROI without relying on attribution models. (Source: Brian Kotlyar, Episode #331)

### Start ABM with Reallocated Budget and Test Against Control Before Scaling
You do not need net-new budget to launch ABM. Carve out budget from existing digital spend and run a small pilot. Use a control group (non-ABM accounts) and treatment group (ABM accounts) to measure lift. Track not just meetings booked, but qualified opportunities and conversion rates. Not every company or sales motion is suited for ABM, so testing first is critical. (Source: Casey Patterson, Episode #331)

---

## Where Experts Disagree

### 1. How reliable is self-reported "How did you hear about us?" data for marketing decisions?

**Support summary: 5 vs 2 (more guests treat it as a valuable signal)**

**Position A — Self-reported data is directional only; do not use it for budget decisions**
Pranav Piyush (Episodes #144 and #239) argues that self-reported attribution data is subject to recency bias and that people in multi-channel environments often cannot accurately recall where they first encountered a brand. He recommends using it only as a sanity check or hypothesis validator, never as the primary basis for budget allocation, and pairing it with correlation analysis or incrementality testing for more reliable measurement.

**Position B — Self-reported data, collected carefully, is a genuinely valuable and actionable signal**
Five guests take a more favorable view:
- Sylvia LePoidevin (Episode #306) advocates strongly for open text fields over dropdowns, citing that Kandji discovered 17% of inbound traffic attributed to LLM search using this method—an unexpected and actionable finding that directly shaped strategy.
- Jess Cook (Episode #321) recommends combining "How did you hear about us?" form fields with AI-powered call recording as a lightweight but effective attribution approach, treating it as a meaningful data source.
- Dave Gerhardt (Episode #141) recommends piping signup source data into a shared Slack channel so the team can see patterns in real time and double down on high-performing channels.
- Matt Carnevale (Episode #233) used automated post-signup surveys to find that 60% of new members came from LinkedIn—data that directly validated their channel focus.
- Bruno Estrella (Episode #180) argues that customer interviews and self-reported attribution are more accurate than pixel-based tracking for understanding which channels and content actually drive conversions, especially as cookie-based tracking degrades.

**Context dependency:** Pranav Piyush's skepticism is most relevant for companies running complex multi-channel programs where recall bias is severe. The pro-self-reported camp may be speaking to simpler GTM motions or using it as one of several signals. However, both camps are addressing the same fundamental question of how much weight to give this data.

**Why it matters:** If self-reported data is systematically biased by recency, marketers who rely on it will over-credit bottom-funnel channels and under-invest in early-stage brand touchpoints that customers cannot recall. Getting this wrong compounds over time as budget shifts away from channels that actually build pipeline.

---

### 2. Are multi-touch attribution (MTA) models useful for budget allocation decisions?

**Support summary: 5 vs 4 (nearly even split)**

**Position A — MTA models are unreliable for cross-channel budget allocation**
Four guests argue against using MTA for budget decisions:
- Drew Pinta (Episode #346) explicitly states that MTA and last-touch models are unreliable for cross-channel budget allocation in a privacy-constrained environment and recommends using incremental testing and customer feedback instead.
- Chris Walker (Episode #211) highlights the double-counting problem in MTA where the same revenue dollar gets credited to 5–7 touchpoints, distorting decision-making and making it impossible to understand true channel efficiency.
- Pranav Piyush (Episodes #130 and #191) argues that click-based attribution has four critical blind spots and recommends stopping use of first-touch, last-touch, or multi-touch attribution models entirely for leadership conversations, replacing them with incrementality framing.

**Position B — MTA models are useful when applied correctly**
Five guests argue MTA has legitimate value:
- Kelly Hopping (Episode #255) advocates for multi-touch attribution over long time periods to recognize cumulative contribution in up-market deals with 25+ touchpoints, arguing it justifies brand and event investments.
- Emir Atli (Episode #165) recommends building custom, flexible attribution reports with multiple attribution models and buyer journey views to tell coherent stories to CFOs and drive optimization decisions.
- John Short (Episode #201) recommends triangulating across first-touch, multi-touch, and last-touch attribution models alongside qualitative feedback to get a complete picture of channel effectiveness.
- Davang Shah (Episode #338) recommends CRM sync and Conversions API as mandatory infrastructure for multi-touch attribution across the full 211-day B2B deal cycle.
- Kristine Segrist (Episode #277) recommends implementing an MTA model that uses algorithms to weight touchpoints across the funnel journey, paired with a 50/50 attribution agreement with sales.

**Context dependency:** The anti-MTA camp tends to be speaking specifically about budget allocation decisions, while the pro-MTA camp tends to be speaking about influence measurement and storytelling. However, both camps are explicitly addressing B2B marketing contexts, and the disagreement is genuine on whether MTA should inform budget decisions at all.

**Trend note:** The anti-MTA / pro-incrementality position is more heavily represented in recent episodes (2024–2026), with Pranav Piyush appearing across episodes #130, #144, #191, #239, and #259 consistently advocating for incrementality over attribution. This suggests a possible field shift toward incrementality-first thinking, though the pro-MTA voices remain substantial.

**Why it matters:** If MTA models systematically double-count and misattribute, marketers using them for budget allocation are likely over-investing in bottom-funnel channels and under-investing in brand and awareness. Choosing the wrong measurement framework directly determines where millions in budget flow.

---

### 3. Must brand and awareness campaigns show short-term measurable lift to be considered effective?

**Support summary: 3 vs 2**

**Position A — All effective marketing, including brand campaigns, must show short-term measurable lift**
Pranav Piyush (Episodes #259 and #130) explicitly states: "If a campaign does not show short-term lift, it is highly unlikely to show long-term lift." He argues that the belief that some marketing only works long-term usually means you do not know how to measure its short-term effect, and that every piece of effective marketing drives some measurable short-term impact. This shifts the mindset from "brand awareness takes time" to "brand campaigns must prove incrementality quickly or they are not working."

**Position B — Brand campaigns should be measured with approaches appropriate to their objective, not required to show short-term conversion lift**
Three guests argue against applying short-term direct-response measurement to brand work:
- Drew Pinta (Episode #346) explicitly states that "the fastest way to kill creative marketing is to measure it with direct response metrics" and advocates for using surveys for brand awareness and event studies for stunts rather than requiring short-term conversion lift.
- Kelly Cheng (Episode #297) argues for accepting directional attribution rather than requiring proof of short-term ROI, especially when founders understand marketing and are bought into brand strategy. Directional progress in organic search and referral traffic is sufficient.
- Kelly Hopping (Episode #255) advocates for multi-touch attribution over long time periods to recognize cumulative contribution, arguing that brand and event investments create conditions for pipeline conversion that do not show immediate ROI.

**Context dependency:** Both camps are explicitly addressing the same question of how to evaluate brand campaign effectiveness in B2B. This is a genuine disagreement about fundamental measurement philosophy, not a difference in company stage or industry.

**Trend note:** Drew Pinta's episode (#346, April 2026) is the most recent and takes the strongest stance against applying short-term direct-response measurement to brand work, potentially representing a reaction to the incrementality-first movement that Pranav Piyush has been advocating across multiple episodes.

**Why it matters:** If Pranav Piyush is right, marketers who do not require short-term proof from brand campaigns are wasting budget on ineffective work. If Drew Pinta is right, requiring short-term conversion lift from brand campaigns will systematically kill the creative and awareness work that builds long-term competitive advantage.

---

## What NOT To Do

- **Do not use MTA or last-touch models as the primary basis for cross-channel budget allocation decisions.** They are unreliable in a privacy-constrained environment and subject to double-counting. *(Contested — see Where Experts Disagree.)* (Source: Drew Pinta, Episode #346; Chris Walker, Episode #211)
- **Do not present a single attribution table to executives without context or caveats.** Showing one channel as dramatically more expensive without explaining what the metric does and does not measure creates "retinal burn"