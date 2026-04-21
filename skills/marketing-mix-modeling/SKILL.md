---
name: marketing-mix-modeling
description: "Guides marketers through measuring marketing impact, channel attribution, incrementality testing, and mix modeling — trigger when a user needs to evaluate channel ROI, build attribution models, design marketing experiments, or report marketing impact to executives."
version: "2026-04-20"
episode_count: 16
---

# Marketing Mix Modeling & Attribution

## Overview
This skill covers how B2B marketers should measure marketing impact across channels, choose and apply attribution models, design incrementality experiments, and report results to executives and finance teams. All practices are sourced exclusively from Exit Five podcast guests across 16 episodes. Where guests disagree — including cases where a single guest's position evolved over time — those disagreements are surfaced explicitly rather than resolved.

---

## Foundational Principles: What You're Actually Trying to Measure

### Establish your baseline before measuring anything
Before attributing growth to marketing, measure your baseline — the number of prospects, leads, or customers who come to you with zero active marketing effort (organic search, word-of-mouth, brand equity, inbound). This baseline is your control group. Any growth above it is potentially incremental. Without establishing this baseline, you cannot distinguish organic growth from marketing-driven growth. (Source: Pranav Piyush, Episode #130)

### Be clear about which question you are answering
Before selecting a measurement approach, define which question you are trying to answer:
- **"Should we continue this campaign and what was its ROI?"** → Use campaign-level attribution.
- **"Which team should own what percentage of our pipeline goal?"** → Use pipeline contribution models.

Do not try to answer both questions simultaneously with the same methodology — they require different approaches and will produce conflicting conclusions. (Source: Sean Lane, Episode #274)

*(Note: whether attribution can reliably answer either question is contested — see Where Experts Disagree)*

### Understand the four major limitations of click-based attribution
Click-based attribution (UTM tracking) has four critical blind spots:
1. It is biased against channels without clicks (video, social, offline, connected TV, billboards, direct mail)
2. It misses all offline marketing entirely
3. Privacy changes (Apple stripping UTMs from Mail and Messages) continuously erode its reliability
4. Clicks show coincidence, not causation

Do not stop tracking clicks, but do not use them alone to answer ROI and incrementality questions. Supplement with correlation analysis and experimentation. (Source: Pranav Piyush, Episode #130)

### Give your audience more credit than your attribution model does
Attribution models often underestimate brand and awareness campaigns because they only track clicks and direct conversions. A prospect may see a founder's LinkedIn post, remember the company name, search for it later, and convert — but the attribution model credits the search, not the LinkedIn post. Shift focus from perfect attribution to creating memorable, repeatable brand moments that drive inbound. (Source: Pranav Piyush, Episode #259)

---

## Attribution Models: How to Apply Them

### Triangulate across multiple models rather than relying on one
No single attribution model is perfect. Triangulate data across first-touch, multi-touch, and last-touch attribution models using your CRM, web analytics, and qualitative feedback (ask customers how they heard about you). This gives a more complete picture of which channels and campaigns are actually driving revenue. (Source: John Short, Episode #201)

*(Note: whether multi-touch attribution is net-useful or structurally misleading is contested — see Where Experts Disagree)*

### Use attribution as a decision-making tool, not a scorekeeping mechanism
Attribution data should inform marketing decisions and help diagnose which channels or tactics are working. Do not use it to defend marketing to the CFO or to settle disputes with sales over pipeline credit. No attribution model is perfectly accurate. Treat attribution as useful for directional insights and experimentation, not as gospel truth. (Source: Ido Mart, Episode #229)

*(Note: whether attribution can serve as a reliable source of truth for specific questions is contested — see Where Experts Disagree)*

### Measure each channel's contribution to the overall marketing mix, not in isolation
Do not evaluate individual channels in isolation. Measure each channel's contribution to the overall effectiveness of your marketing mix. Some channels may not show direct last-touch attribution but play an important role in the customer journey. To validate a channel's impact, run experiments by turning it off in one geography or vertical while keeping it on in another, then measure the impact on overall marketing effectiveness. (Source: Ido Mart, Episode #229)

### Build custom, flexible attribution reports rather than static dashboards
Most attribution platforms offer one-size-fits-all static dashboards that do not reflect the nuances of different business models. Build a reporting tool that allows marketers to create custom reports with flexible attribution models, buyer journey views, and specific metrics tailored to their questions. Include templates by industry. Pair custom reports with buyer journey views that show specific accounts from first touch to close. This enables marketers to tell a coherent story to the CFO/CEO and get actionable insights for optimization. (Source: Emir Atli, Episode #165)

### Use Hockey Stack or DreamData for multi-touch attribution across channels
Hockey Stack and DreamData use APIs to connect all your advertising and marketing tools and can show the full customer journey: LinkedIn impression → Google search → website visit → demo request → deal closed. This provides a more complete picture of any channel's role in the buying journey than single-platform attribution. (Source: Anthony Blatner, Episode #243)

*(Note: whether multi-touch attribution is net-useful or structurally misleading is contested — see Where Experts Disagree)*

### Recognize the double-counting problem in multi-touch attribution
Multi-touch attribution allows the same revenue dollar to be credited to multiple touchpoints simultaneously (event, Google Ad, LinkedIn Ad, SDR, etc.), inflating the apparent ROI of each channel and making it impossible to understand true efficiency. When using multi-touch, be aware that the same dollar in revenue may be counted 5–7 times across different tools and reports. Single-touch attribution forces a choice about which touchpoint gets credit, preventing double-counting. (Source: Chris Walker, Episode #211)

*(Note: whether this problem disqualifies multi-touch attribution or is manageable is contested — see Where Experts Disagree)*

### Recognize that brand, attribution, and pipeline are interconnected
Do not treat brand and pipeline as separate metrics. A single conversion may have 25+ touchpoints before it closes, with the first touch (e.g., an event dinner) and last touch (e.g., an SDR gift card) both contributing to the outcome. Use multi-touch attribution models over long time periods to recognize cumulative contribution, especially in up-market deals. This justifies brand and event investments that don't show immediate ROI but create the conditions for pipeline conversion. (Source: Kelly Hopping, Episode #255)

*(Note: whether multi-touch attribution is net-useful or structurally misleading is contested — see Where Experts Disagree)*

---

## Capturing Offline and Brand Touchpoints

### Capture offline and brand touchpoints via forms and sales call transcripts
Offline and brand-based marketing channels (LinkedIn organic, podcasts, events, community) don't leave digital footprints but are still trackable. Use two methods:
1. **Self-reported attribution via forms**: Ask "How did you hear about us?" and categorize responses (e.g., "LinkedIn organic," "Podcast," "Event")
2. **Call transcription tools** (e.g., Gong): Extract mentions of how prospects heard about you from sales call transcripts

Even without a digital pixel, if a prospect mentions a touchpoint in a form or call, it can be attributed. (Source: Emir Atli, Episode #165)

### Use self-reported attribution data directionally, not as ground truth
Collect self-reported attribution data as qualitative research to identify directional trends, but do not treat it as ground truth. Self-reported data is subject to recency bias — people remember recent touchpoints more clearly than earlier ones, and in multi-channel environments they often cannot accurately recall where they first encountered a brand. Use this data to validate hypotheses but pair it with correlation analysis for more reliable measurement. (Source: Pranav Piyush, Episode #144)

### Use brand search correlation as a proxy for multi-touch attribution
In B2B environments where linear attribution is impossible, use brand search volume as a leading indicator of marketing effectiveness. If brand searches increase following marketing activities, and your sales team reports that trial signups are growing, and when you ask new trials how they heard about you their answers align with your marketing investments, then your marketing is working. This approach acknowledges that modern B2B buying journeys are non-linear and that direct-click attribution misses the full picture. (Source: Madhav Bhandari, Episode #183)

*(Note: whether correlation-based evidence like this is sufficient or whether controlled experiments are required is contested — see Where Experts Disagree)*

### Measure marketing without tracking pixels or cookies
When tracking pixels and cookies are unavailable (due to GDPR, privacy regulations, or browser restrictions), measure marketing impact through alternative methods: analyze branded search volume changes, track direct traffic, gather sales team feedback on how customers heard about you, use lift testing with sufficient budget, and monitor view-through conversions. These methods can be more reliable than pixel-based attribution and may actually improve marketing by shifting focus from direct-response tactics to brand-building. (Source: John Short, Episode #148)

---

## Correlation Analysis

### Map channel impressions to business outcomes using correlation analysis
For each marketing channel (paid social, search, email, events, PR, organic social, etc.), collect 12+ months of historical reach/impressions data and map it against your leading indicator metric (demos, trials, hand raisers). Plot impressions on one axis and your outcome metric on the other to identify which channels show strong correlation. When impressions go up on a channel, do your demos go up? When they go down, do demos go down? This can be done in a simple spreadsheet with no special software. The output reveals which channels are correlated with business growth and which are not. (Source: Pranav Piyush, Episode #130)

*(Note: whether correlation analysis is sufficient evidence or whether controlled experiments are required to prove causality is contested — see Where Experts Disagree)*

### Correlate LinkedIn organic impressions to demo bookings
Create a spreadsheet plotting weekly demo bookings (or your key conversion metric) against LinkedIn organic impressions over a 52-week period. Map both metrics on the same chart to identify correlation patterns: strong correlation shows impressions and demos moving together; weak or no correlation indicates the channel is not driving incremental impact. (Source: Pranav Piyush, Episode #191)

*(Note: whether presenting this correlation to finance teams as evidence of channel effectiveness is appropriate is contested — see Where Experts Disagree)*

### Correlate podcast listens to demo bookings
Plot weekly podcast listens (from your own podcast or from Spotify ad data) against weekly demo bookings on a scatter chart. If listens and demos move together consistently (dots clustered in upper-right and lower-left quadrants), you have evidence of correlation. If dots are scattered across all quadrants, the metrics are unrelated. This five-minute analysis provides directional evidence of podcast impact without complex data science. (Source: Pranav Piyush, Episode #191)

*(Note: whether correlation is sufficient evidence or whether controlled experiments are required is contested — see Where Experts Disagree)*

### Use correlation analysis to identify high-potential channels, then design experiments to confirm
Use correlation analysis as a first-pass screening tool to identify channels or campaigns with high potential contribution to your output metric. Then design controlled experiments to test whether increasing spend on those channels actually drives proportional output growth. Expect 70% of experiments to fail — this is normal for creative work. (Source: Pranav Piyush, Episode #144)

---

## Incrementality Testing and Controlled Experiments

### Reframe the measurement conversation around incrementality
Stop using first-touch, last-touch, or multi-touch attribution models as the primary framework. Instead, frame the measurement conversation with leadership around incrementality: What portion of your pipeline comes from organic demand (word-of-mouth, brand equity built over time) versus what is driven by marketing and sales efforts? Present this as a layered model showing organic demand, brand equity, and then marketing/sales contribution. This reframing aligns measurement with what CFOs and CEOs actually care about: incremental growth. (Source: Pranav Piyush, Episode #191)

### Measure incrementality instead of attribution to understand true marketing impact
Shift from asking "which touchpoint gets credit for this conversion" to asking "would this outcome have happened without my marketing investment." Incrementality measures the actual lift your marketing creates — the difference between a baseline scenario (no marketing) and your current state. This avoids the false causality problem of click attribution and works across all channels, including those that are hard to track (organic, content, social). Test incrementality through controlled experiments (geo tests, holdout groups) or marketing mix modeling. (Source: Pranav Piyush, Episode #239)

### Use experimentation as the foundation for proving causality
Attribution models attempt to assign credit to touchpoints but do not prove causality. Randomized controlled trials and A/B testing are the gold standard for proving cause and effect in marketing. If you are serious about attribution and measurement, you must think about experimentation. (Source: Pranav Piyush, Episode #259)

*(Note: this position is in tension with the same guest's earlier advocacy for correlation analysis as a valid measurement method — see Where Experts Disagree)*

### Run every marketing initiative as a controlled experiment
Treat all marketing activities as experiments with three components:
1. A hypothesis about what will happen
2. An expected lift (e.g., 20% increase in demos)
3. A defined investment

Include a control group that does not receive the treatment. Expect approximately 20% of experiments to succeed and 80% to fail or underperform — this is the industry benchmark across Microsoft, Amazon, Booking.com, Uber, and Airbnb. Use experiments to find diminishing returns on channels and test new creative approaches to break through performance ceilings. (Source: Pranav Piyush, Episode #191)

### Test billboard effectiveness using geographic holdout groups
Buy billboards in one geography (e.g., Burlington) while holding out another similar geography (e.g., New York) as a control. Track demo bookings or your key conversion metric by geography over a 6-week period. Compare conversion rates between the billboard market and the control market to measure incremental impact. This requires more data science support than simpler correlation methods but provides causal evidence for offline advertising. (Source: Pranav Piyush, Episode #191)

### Run Google Conversion Lift studies on search campaigns
Use Google's native Conversion Lift tool (available through your Google rep or in Google Ads) to quantify the incremental contribution of branded and non-branded search keywords to business outcomes. This experiment-based approach replaces cookie-based attribution by measuring actual conversion lift in a test group versus a control group, providing causal evidence rather than correlation. (Source: Pranav Piyush, Episode #191)

### Use email holdout groups to measure incremental impact of email campaigns
When sending email campaigns (nurture, newsletter, onboarding), create a holdout group by excluding 10% of your target audience from the send. Track conversions (demos, trials, sales) in your CRM for both the sent group and the holdout group over the same period. Compare conversion rates between groups to quantify the true incremental impact of the email, removing self-reported attribution bias. Customer.io has this built natively into their platform. (Source: Pranav Piyush, Episode #191)

### Run DIY Facebook Conversion Lift tests
Access Facebook's Conversion Lift experiment tool directly through your Facebook Ads account (Experiments tab) without needing to contact your Facebook rep. This allows you to measure the incremental impact of Facebook ad campaigns on business outcomes like demos or conversions, proving whether social ads drive incremental sales beyond organic demand. (Source: Pranav Piyush, Episode #191)

---

## Marketing Mix Modeling (MMM)

### Implement a mixed media model to measure brand campaign impact on pipeline
Use a mixed media model (tools like Pareto) to measure the incremental impact of brand and awareness campaigns on pipeline and revenue. Flex budget up and down on specific channels and measure the incremental effect on website traffic, opportunities, and pipeline. Complement with incremental testing: pulse media in specific markets and measure the incremental impact on revenue. This allows brand marketing to be measured against business outcomes rather than vanity metrics. (Source: Ryan Narod, Episode #330)

### Apply MMM to measure the impact of brand and organic channels
For channels that don't generate digital touchpoints (e.g., LinkedIn organic impressions, podcast listens, video views), use marketing mix modeling to estimate impact. Input relevant metrics (e.g., LinkedIn organic impressions, video engagement counts, podcast downloads) alongside conversion data, and MMM will return statistical estimates of each channel's contribution to conversions. This is particularly useful for measuring the impact of brand-building activities that don't have direct digital attribution. (Source: Emir Atli, Episode #165)

---

## Measuring Specific Channel Types

### Measure B2B marketing impact through overall website lift, not channel-specific ROI
Instead of attributing conversions to individual channels, measure the overall lift in website handraisers and return visitor rates after launching campaigns. Compare baseline metrics (e.g., 200 handraisers/month) to post-campaign metrics (e.g., 250 handraisers/month). Track return visitor percentage increases as an indicator that campaigns are driving awareness and repeat engagement. This approach accounts for the long B2B sales cycle where initial touchpoints may not result in immediate conversions but contribute to overall demand generation. (Source: Tas Bober, Episode #154)

### Track event attendance by source and correlate to pipeline and demos
Implement systematic tracking of which events attendees came from (trade shows, webinars, conferences, etc.). Correlate event attendance data with downstream metrics like demos booked and pipeline generated. Most companies don't track this data at all, making it impossible to measure event ROI. Once you have the data, use the same correlation analysis approach as other channels to quantify event impact. (Source: Pranav Piyush, Episode #191)

---

## Reporting to Executives and Finance

### Forecast marketing outcomes using ranges, not single numbers
When forecasting the impact of marketing investments to executives and boards, present a range with best-case and worst-case scenarios rather than a single point estimate. This mirrors how CFOs and boards actually think about business planning — they use ranges for risk management. Use your historical 12-month data and your measurement model to generate these ranges. Also communicate which experiments are in flight that could beat the best-case scenario. This approach is more credible and aligns with how finance teams report to investors. (Source: Pranav Piyush, Episode #130)

---

## Where Experts Disagree

### Disagreement 1: Is correlation analysis a valid measurement approach, or must you run controlled experiments to prove marketing impact?
**Support summary: 4 vs 2**

**Position A — Correlation analysis is a practical and valid measurement method**
Plotting channel impressions or reach against business outcomes over 12+ months is a meaningful and actionable way to identify which channels contribute to growth. When impressions on a channel consistently move with demos or pipeline, that is meaningful evidence of channel contribution. This approach works across all channels including brand and offline, and can be done in a simple spreadsheet without data science resources.

Supporters:
- **Pranav Piyush (Episodes #130, #144, #191)**: Recommends correlation analysis as the first step to identify high-potential channels, putting all marketing channels on equal footing. Advocates mapping channel impressions to business outcomes in a simple spreadsheet over 12+ months. Recommends correlating LinkedIn organic impressions to demo bookings over 52 weeks and presenting this to finance teams as evidence of channel effectiveness.
- **Madhav Bhandari (Episode #183)**: Uses brand search volume as a leading indicator of marketing effectiveness, arguing that if brand searches increase following marketing activities and sales reports align, the marketing is working — without requiring controlled experiments.

**Position B — Correlation does not prove causation; controlled experiments are required**
Two metrics moving together may both be driven by a third untracked variable. Randomized controlled trials and A/B testing are the gold standard for proving cause and effect in marketing. Attribution models and correlation analysis cannot substitute for experimentation if you want to know whether your marketing actually caused an outcome.

Supporters:
- **Pranav Piyush (Episode #259)**: Explicitly states that correlation is not causation using the LinkedIn impressions example — a podcast ad you're not tracking may be the real driver of both LinkedIn engagement and website visits. States that to prove causation, you must run an experiment with a control group. Also states that attribution models do not prove causality and that randomized controlled trials and A/B testing are "the basis of modern science and should be the basis of modern marketing measurement."

**Trend note**: There is a clear chronological pattern within a single guest. Pranav Piyush's earlier episodes (April–November 2024, Episodes #130, #144, #191) recommend correlation analysis as a valid and presentable measurement method, including presenting it to finance teams. His later episodes (June 2025, Episode #259) explicitly argue that correlation is insufficient and that experimentation is required for causality. This suggests a shift in his own thinking over approximately 14 months.

**Context dependency**: Correlation analysis may be appropriate as a low-cost first-pass screening tool to identify candidate channels, while experimentation is required to confirm causality before making large budget commitments. However, Pranav Piyush's later position explicitly warns that presenting correlation to finance teams as evidence of channel effectiveness — which he recommended in earlier episodes — is misleading. This makes it a genuine disagreement about what counts as sufficient evidence, not merely a sequencing question.

**Why it matters**: If correlation analysis is sufficient, most B2B marketing teams can measure channel impact today with a spreadsheet. If experimentation is required, most teams are making budget decisions on misleading evidence and need to invest in holdout testing infrastructure before trusting their channel data.

---

### Disagreement 2: Should you use multi-touch attribution or avoid it due to double-counting problems?
**Support summary: 4 vs 1**

**Position A — Multi-touch attribution is valuable for understanding complex B2B buying journeys**
Multi-touch attribution recognizes the cumulative contribution of many touchpoints across long buying journeys. A single conversion may have 25+ touchpoints, and multi-touch models over long time periods help justify brand and event investments that don't show immediate ROI. Custom, flexible multi-touch reports can tell coherent stories to executives and drive optimization decisions.

Supporters:
- **Kelly Hopping (Episode #255)**: A single conversion may have 25+ touchpoints before it closes; multi-touch attribution over long time periods recognizes cumulative contribution, especially in up-market deals, and justifies brand and event investments.
- **Anthony Blatner (Episode #243)**: Recommends Hockey Stack and DreamData as platforms that show the full customer journey (LinkedIn impression → Google search → website visit → demo request → deal closed), providing a more complete picture than single-platform attribution.
- **John Short (Episode #201)**: Recommends triangulating data across first-touch, multi-touch, and last-touch attribution models using CRM, web analytics, and qualitative feedback to get a more complete picture of which channels drive revenue.
- **Emir Atli (Episode #165)**: Advocates building custom, flexible attribution reports with multi-touch buyer journey views to tell coherent stories to CFOs/CEOs and get actionable optimization insights.

**Position B — Multi-touch attribution creates a structural double-counting problem that distorts decision-making**
Multi-touch attribution allows the same revenue dollar to be credited to multiple touchpoints simultaneously, inflating the apparent ROI of every channel and making it impossible to understand true efficiency. Single-touch attribution or blended CAC is preferable because it forces a choice and prevents the same dollar from being counted 5–7 times across different tools.

Supporters:
- **Chris Walker (Episode #211)**: Multi-touch attribution allows the same revenue dollar to be credited to multiple touchpoints (event, Google Ad, LinkedIn Ad, SDR, etc.), inflating apparent ROI of each channel and making it impossible to understand true efficiency. The same dollar in revenue may be counted 5–7 times across different tools.

**Trend note**: None identified.

**Context dependency**: Chris Walker's critique applies most forcefully when multi-touch data is used to calculate ROI or defend budget to finance. Proponents like Kelly Hopping and Emir Atli use it more for directional storytelling and journey mapping. However, the double-counting problem is structural and applies regardless of use case — making this a genuine disagreement on whether multi-touch models are net-useful, not merely a question of how they are applied.

**Why it matters**: If Chris Walker is right, multi-touch attribution actively misleads budget allocation decisions by making every channel look more efficient than it is. If the pro-multi-touch camp is right, abandoning it means losing visibility into the cumulative, multi-step nature of B2B buying journeys.

---

### Disagreement 3: Should attribution data be used as a source of truth for pipeline credit, or only as a directional decision-making tool?
**Support summary: 5 vs 2**

**Position A — Attribution should only be used directionally, never as a source of truth**
No attribution model is perfectly accurate, so attribution data should only be used directionally to inform decisions and diagnose channel performance — not as gospel truth, not to defend marketing to the CFO, and not to settle disputes with sales over pipeline credit. Treating attribution as a scorekeeping mechanism leads to bad decisions.

Supporters:
- **Ido Mart (Episode #229)**: Explicitly states attribution should be a decision-making tool, not a scorekeeping mechanism or source of truth, and should not be used to defend marketing to the CFO or settle disputes with sales over credit.
- **Pranav Piyush (Episode #191)**: Recommends reframing the attribution conversation entirely around incrementality rather than touchpoint credit, arguing that first-touch, last-touch, and multi-touch models should be abandoned in favor of incrementality framing.
- **John Short (Episode #201)**: Recommends triangulating across multiple models rather than relying on any single one, implying no model is reliable enough to be treated as ground truth.
- **Pranav Piyush (Episode #239)**: Explicitly calls for shifting from attribution to incrementality as the primary framework, arguing attribution models create false causality.
- **Ryan Narod (Episode #330)**: Recommends implementing mixed media models and incremental testing as the measurement approach for brand campaigns, measuring incremental effect on pipeline rather than using attribution models.

**Position B — Attribution can be a reliable source of truth if you match the methodology to the specific question**
Attribution can be reliable if you are clear about which specific question you are trying to answer. Campaign-level attribution is appropriate for answering "should we continue this campaign and what was its ROI?" Pipeline contribution models are appropriate for answering "which team should own what percentage of our pipeline goal?" The problem is not attribution itself but using one methodology to answer both questions simultaneously.

Supporters:
- **Sean Lane (Episode #274)**: Argues that campaign ROI questions and pipeline contribution questions require different methodologies, and that using the right model for the right question makes attribution reliable — the issue is conflating the two questions, not attribution itself.
- **Emir Atli (Episode #165)**: Advocates building custom attribution reports that enable marketers to tell coherent stories to CFOs/CEOs about pipeline contribution — implying attribution can be a reliable enough source of truth for executive reporting when properly configured.

**Trend note**: None identified.

**Context dependency**: Sean Lane's position is that the methodology must match the question, which is partially compatible with Ido Mart's warning against using attribution as a universal scorekeeping mechanism. However, Emir Atli's advocacy for using custom attribution reports to tell pipeline contribution stories to CFOs directly conflicts with Ido Mart's explicit warning against using attribution to defend marketing to the CFO — making this a genuine disagreement in that specific use case.

**Why it matters**: If attribution can be a reliable source of truth for specific questions, marketing teams should invest in building rigorous attribution infrastructure for executive reporting. If it is only directional, using it to defend budget or claim pipeline credit will undermine marketing's credibility when the numbers are scrutinized.

---

## What NOT To Do

- **Do not use a single attribution model as the only measurement approach.** No single model is perfect. Triangulate across first-touch, multi-touch, and last-touch models alongside qualitative data. (Source: John Short, Episode #201)

- **Do not conflate correlation with causation.** Two metrics moving together does not prove one caused the other. A third untracked variable (e.g., a podcast ad) may be driving both. To prove causation, run a controlled experiment. (Source: Pranav Piyush, Episode #259)

- **Do not use attribution as a scorekeeping mechanism or to settle disputes with sales.** Attribution data is not accurate enough to be used as gospel truth for pipeline credit allocation or to defend marketing's value to the CFO. (Source: Ido Mart, Episode #229)

- **Do not try to answer campaign ROI questions and pipeline contribution questions with the same methodology.** These are different questions requiring different measurement approaches. Conflating them produces contradictory conclusions. (Source: Sean Lane, Episode #274)

- **Do not evaluate individual channels in isolation.** Measure each channel's contribution to the overall marketing mix. Some channels play important roles in the customer journey that don't show up in last-touch attribution. (Source: Ido Mart, Episode #229)

- **Do not rely solely on click-based attribution.** It is biased against non-click channels, misses all offline marketing, is eroded by privacy changes, and shows coincidence rather than causation. (Source: Pranav Piyush, Episode #130)

- **Do not present multi-touch attribution ROI numbers to finance without acknowledging the double-counting problem.** The same revenue dollar may be counted 5–7 times across different tools, inflating apparent channel efficiency. (Source: Chris Walker, Episode #211)

- **Do not treat self-reported attribution data as ground truth.** It is subject to recency bias and multi-channel confusion. Use it directionally to validate hypotheses, not as definitive evidence. (Source: Pranav Piyush, Episode #144)

- **Do not measure marketing impact without first establishing your baseline organic demand.** Without a baseline, you cannot distinguish organic growth from marketing-driven growth. (Source: Pranav Piyush, Episode #130)

- **Do not present single-point forecasts to executives.** Present best-case and worst-case ranges, which is how CFOs and boards actually think about business planning. (Source: Pranav Piyush, Episode #130)

- **Do not skip tracking event attendance by source.** Most companies don't track this data at all, making it impossible to measure event ROI. (Source: Pranav Piyush, Episode #191)

---

## Sources

| Episode | Guest | Date |
|---------|-------|------|
| Episode #130 | Pranav Piyush | 2024-04-08 |
| Episode #144 | Pranav Piyush | 2024-05-27 |
| Episode #148 | John Short | 2024-06-10 |
| Episode #154 | Tas Bober | 2024-07-01 |
| Episode #165 | Emir Atli | 2024-08-12 |
| Episode #183 | Madhav Bhandari | 2024-10-10 |
| Episode #191 | Pranav Piyush | 2024-11-07 |
| Episode #201 | John Short | 2024-12-12 |
| Episode #211 | Chris Walker | 2025-01-16 |
| Episode #229 | Ido Mart | 2025-03-20 |
| Episode #239 | Pranav Piyush | 2025-04-21 |
| Episode #243 | Anthony Blatner | 2025-05-05 |
| Episode #255 | Kelly Hopping | 2025-06-16 |
| Episode #259 | Pranav Piyush | 2025-06-26 |
| Episode #274 | Sean Lane | 2025-08-18 |
| Episode #330 | Ryan Narod | 2026-02-17 |