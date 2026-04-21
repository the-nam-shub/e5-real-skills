---
name: cro-program-management
description: "Guidance for building and running a B2B conversion rate optimization program — covering research frameworks, testing strategy, CTA design, metrics, reporting, and organizational setup. Trigger when a user asks about improving conversion rates, CRO program structure, landing page optimization, email CTAs, or testing methodology."
version: "2026-04-20"
episode_count: 20
---

# CRO Program Management

## Overview
This skill covers how to build, run, and measure a B2B conversion rate optimization program — from foundational research and testing frameworks to CTA design, metrics hierarchy, reporting cadence, and organizational blockers. All practices are sourced exclusively from Exit Five podcast guests across 20 episodes. Do not supplement with general CRO knowledge not represented here.

---

## CRO as a Program: Philosophy and Structure

**Structure CRO into two distinct buckets: research and testing.** Research (user research, UX/UI research, market research, brand research) must always precede and inform testing (A/B testing, experimentation). Never jump straight to testing without first understanding what to test and why. (Source: Haley Carpenter, Episode #282)

**When introducing CRO to a company with no existing program, start with the marketing team.** Once successful there, expand to other teams like product. (Source: Haley Carpenter, Episode #282)

**Use the CRO foundation pyramid before implementing advanced tactics.** Ensure the foundation is solid before pursuing personalization or recommendations: clear messaging, clear value proposition, clear user journey, and sufficient social proof. If the foundation is cracked, advanced tactics will fail. Many B2B teams skip foundational work and jump to personalization — this is a mistake. (Source: Haley Carpenter, Episode #282)

---

## Research: The Foundation of CRO

**Conduct foundational customer research before running any A/B tests.** Understand who you're speaking to, why they buy from you, and what their desired outcomes are. This identifies whether the core problem is messaging clarity, social proof relevance, or navigation structure — not just button copy. Once you identify the problem, you can optimize every element on the page systematically rather than testing elements in isolation. (Source: Talia Wolf, Episode #251)

**Collect all four data types: quantitative, qualitative, behavioral, and perceptual.** Quantitative data answers "what is happening"; qualitative data answers "why is it happening." Pair these with behavioral data (how people move and interact) and perceptual data (what they think and feel). Both spectrums are necessary for complete research. (Source: Haley Carpenter, Episode #282)

**Use research to form specific hypotheses, then validate through testing.** Research uncovers what's not working and surfaces customer insights, but it doesn't automatically tell you what to change. Blend research findings with intuition from sales and customer success teams — they speak to customers regularly and can confirm whether research findings match real conversations. (Source: Talia Wolf, Episode #132)

**Use the emotional targeting framework to guide optimization instead of best-practices testing.** Replace the standard CRO process (identify problem in GA → search best practices → test hypotheses) with a customer-first approach: conduct research to understand the emotions and real intent driving purchase decisions, then identify what messaging, design, or positioning is missing or misaligned on the page. This shifts from testing button colors to testing whether you're addressing the actual emotional drivers of your buyers. (Source: Talia Wolf, Episode #231)

**Activate research insights through storytelling, newsletters, and presentations.** Don't let research findings die in a slide deck. Actively share insights through newsletters, link them to tests, present findings in person, and tell the story around the data. When sharing CRO research findings, route insights to sales and product teams via the Slack/Teams channel described in the reporting cadence — not just the marketing team. Maintain an insights repository or knowledge base where all research deliverables live for easy reference and reuse. (Source: Haley Carpenter, Episode #282)

---

## Messaging and Motivation: The Primary Conversion Levers

**Before testing anything, audit your site for journey complexity.** Count the number of distinct CTAs on your homepage and key product pages. If there are more than one or two, simplify the journey first. B2B sites often have complex journeys with multiple service pages and multiple CTAs that confuse users. Messaging clarity and value proposition must come before personalization or advanced tactics. Features commoditize quickly; messaging and brand differentiation are harder to replicate. (Source: Haley Carpenter, Episode #282)

**Whether to prioritize increasing motivation or reducing friction is contested.** *(See Where Experts Disagree)*

Peep Laja (Episode #119) argues that motivation is 10x more powerful than friction reduction — users with high motivation will tolerate significant friction (e.g., long forms, gated content), so focus messaging and copy on making people want to take action rather than optimizing form fields or removing steps. Motivation is driven by words and messaging, not design.

Haley Carpenter (Episode #282) and Eli Rubel (Episode #120) argue that friction reduction and journey simplification are foundational CRO priorities — B2B sites often have structural barriers (confusing multi-step journeys, too many CTAs, broken lead routing) that block conversion regardless of how compelling the messaging is. Rubel identifies 50–100 micro-surfaces across the buyer journey as high-value optimization targets where compounding friction reductions can cut CAC in half.

Do not treat these as two independent recommendations to stack without a priority decision. See Where Experts Disagree for guidance on which to address first given your situation.

**Leverage self-image and social-image as core emotional drivers in B2B messaging.** Identify and emphasize two primary emotional motivators: self-image (how the buyer wants to feel about themselves after purchase — confident, proud, capable) and social-image (how the buyer wants others to perceive them — knowledgeable, promoted, a go-to expert). Reflect these emotions in messaging, social proof, visuals, and value propositions rather than leading with features, pricing, or technology. (Source: Talia Wolf, Episodes #132 and #251)

**Map content and CTAs to Eugene Schwartz's five stages of awareness.** Segment your marketing funnel and website content according to: unaware (no knowledge of problem), pain-aware (knows problem exists but not solution), solution-aware (exploring solution types), product-aware (comparing competitors), and most-aware (ready to buy). Create distinct content and calls-to-action for each stage. This prevents forcing early-stage prospects into high-friction actions like "book a demo" before they're ready. (Source: Talia Wolf, Episode #132)

**Evaluate website messaging across five components: clarity, relevance, value, differentiation, and brand perception.** (1) Clarity — do visitors understand what you do? (2) Relevance — do you address their priorities? (3) Value — is the value proposition clear? (4) Differentiation — why choose you over competitors? (5) Brand perception — does tone match your brand? This framework enables objective discussion about copy instead of subjective preference debates. (Source: Peep Laja, Episode #119)

**Test messaging variations in email and paid ads before implementing on the website.** Use email and paid advertising as testing grounds for messaging before committing it to your website. Send different subject lines or ad copy variations and measure which messaging resonates (opens, clicks, signups). Once you've validated what works, bring that winning message to your website. (Source: Talia Wolf, Episode #251)

**Test landing page messaging before driving paid traffic to it.** Before launching a new product, event, or campaign and driving expensive paid traffic to a landing page, test the messaging with your target audience. This prevents wasting budget on landing pages with weak messaging. (Source: Peep Laja, Episode #119)

**Prioritize message testing on money pages first.** Start message testing with your highest-impact pages: homepage and key product/features pages. Once you identify what's not working and iterate, expand testing to other pages. (Source: Peep Laja, Episode #119)

**Use Wynter for B2B messaging validation.** Wynter (wynter.com) is a B2B-specific messaging testing tool for validating messaging, value propositions, homepage copy, and navigation. While on the higher price end, it provides immediate feedback on whether your messaging resonates. Alternative tools exist for message testing, value prop testing, and card sorting/tree testing. (Source: Haley Carpenter, Episode #282)

---

## Testing: When, How, and What to Test

*(Note: Whether B2B marketers should run A/B tests at all is contested — see Where Experts Disagree)*

**Use 200,000 average monthly users as the threshold for controlled A/B testing.** Below this threshold, traditional A/B testing may not yield statistically significant results. For lower-traffic sites, use alternative testing methods rather than dismissing testing entirely. (Source: Haley Carpenter, Episode #282)

**When traffic is too low for controlled A/B testing, use preference tests or user testing platforms.** These methods allow you to test variations under different circumstances and still achieve statistical significance. Ensure data is clean and accurate, and recruit testers from your actual target audience rather than random respondents. (Source: Haley Carpenter, Episode #282)

**Test design and creative variations in paid media to drive conversion improvements without campaign overhauls.** Rather than scrapping entire campaigns, systematically test variations in design and creative elements (imagery style, color palette, composition, tone) to identify what resonates. This approach allows you to improve CAC significantly through iterative creative refinement. (Source: Eli Rubel, Episode #120)

**Identify and optimize micro-surfaces across the buyer journey to compound conversion gains.** Map all touchpoints in your buyer journey and identify 50–100 "micro-surfaces" — small places where you can meaningfully improve conversion (e.g., lead routing, automated lead booking, lead enrichment, mid-funnel nurture sequences, use-case-specific messaging, post-close retention sequences). Compounding small improvements across these surfaces can cut CAC in half or double pipeline with the same budget. Prioritize these over large campaign overhauls. (Source: Eli Rubel, Episode #120)

**Diagnose nurture email performance by separating open-rate issues from conversion issues.** When nurture emails have high open rates but low conversion, the problem is not the subject line — it's the message or offer mismatch. For enterprise/long-cycle deals, recognize that nurture emails may not drive direct conversion; instead, they build trust and authority. Adjust success metrics accordingly: for PLG/short-cycle, expect direct conversion; for enterprise, measure brand-building and engagement. (Source: Eli Rubel, Episode #120)

---

## Call-to-Action Design

*(Note: Whether the single-CTA rule is absolute or allows exceptions is contested — see Where Experts Disagree)*

**Use one primary call-to-action per marketing asset as the default.** Each email, landing page, or marketing piece should have one clear, primary CTA. You can repeat the same CTA link multiple times (top and bottom of email), but it should be the same ask. Multiple competing CTAs confuse the reader and dilute impact. (Source: Dave Gerhardt, Episode #314)

*(Note: This is contested — see Where Experts Disagree)*

**Write CTA buttons in first person to increase click rates.** Write CTA buttons in first person (e.g., "I want to see the secrets" or "Show me the full trends report") instead of imperative form (e.g., "Read the case study" or "Register now"). First-person CTAs increase click-through rates by over 20% because they make the recipient feel invested in the action. CTAs can be full sentences, not just 2–3 words. (Source: Jay Schwedelson, Episode #167)

**Do not use "Register Now" as a CTA button.** This phrase is generic and uninspiring. Instead, use first-person, benefit-driven CTAs like "I want in," "Save my spot," or "I can't wait" — language that makes the recipient feel excited and invested in attending. (Source: Jay Schwedelson, Episode #167)

**Add read-time estimates to content blocks in newsletters and emails.** Include explicit time estimates (e.g., "2 min read," "3 min read") for content blocks. This helps readers make quick decisions about whether they have time to consume the content and increases click-through rates by managing expectations. (Source: Jay Schwedelson, Episode #329)

**In SaaS onboarding email sequences, define and optimize for micro-conversions.** Each email in a free trial or onboarding sequence should drive a single micro-conversion — a small, specific action that moves the user toward the "aha moment." Identify your primary activation metric through customer research (e.g., "creating a first workspace") and make that the sole focus of the first onboarding email. Do not try to cram the entire onboarding flow into one email. (Source: Samar Owais, Episode #247)

---

## Social Proof

**Actively collect social proof by incentivizing customers to provide testimonials or reviews.** Offer small incentives (Starbucks gift card, Amazon gift card, raffle entry) in exchange for 10 minutes of their time. Use platforms like Testimonial.to that allow customers to submit text or video reviews directly. Authentic, raw testimonials — especially video — are more credible than highly produced content. (Source: Haley Carpenter, Episode #282)

**Be strategic about how much social proof you display.** Showing star ratings with too few reviews (e.g., 2–3 reviews) can actually hurt credibility. Determine what social proof you have, how much of it you have, how quickly you can get more, and how you'll continue collecting it. Don't display social proof if you don't have enough to be convincing. (Source: Haley Carpenter, Episode #282)

---

## Metrics and Measurement

**Establish a clear hierarchy of metrics: primary (bottom-line business) vs. secondary (engagement).** Primary metrics are: form submissions, leads, SQL, revenue, ARR, lifetime value, transactions. Secondary metrics are: bounce rate, click-through rate, session duration, scroll depth. Never flip this hierarchy by treating engagement metrics as primary. (Source: Haley Carpenter, Episode #282)

**Treat bottom-line metrics measurement as non-negotiable.** "We can't measure bottom-line metrics" is an unacceptable excuse. There is always a way to tie CRO work back to revenue, leads, or other business outcomes. If you cannot measure what a test impacts on the business, question why you ran the test in the first place. (Source: Haley Carpenter, Episode #282)

**Report CRO results by tying tests to revenue impact.** When reporting to leadership, lead with revenue or business impact, not engagement metrics. Break down the math clearly: test result → business outcome → revenue impact. Example: "This test generated 10 additional form submissions, which equals 5 more opportunities for sales, and at a 20% close rate, that's $10K in additional ARR." (Source: Haley Carpenter, Episode #282)

**Measure success by whether your conversion rate is trending upward, not by hitting a specific benchmark.** Rather than comparing your conversion rate to industry benchmarks (which vary widely by business model, traffic source, and offer type), focus on whether your rate is improving over time. (Source: Talia Wolf, Episode #251)

**Track conversions from your ICP separately from total conversions.** A page might show a high overall conversion rate but a low ICP conversion rate, meaning you're attracting the wrong audience. Optimizing for ICP conversions ensures you're driving the right kind of leads, not just volume. (Source: Talia Wolf, Episode #251)

**Set up multiple conversion types: form submissions, page views, and high-intent pages.** Don't rely on a single conversion metric. Set up conversion tracking for: (1) any page view (broad awareness), (2) high-intent pages like pricing or demo pages, and (3) form submissions. This creates a funnel view showing how many people reach your site, how many reach high-intent pages, and how many convert. (Source: Anthony Blatner, Episode #243)

**When landing pages don't generate on-page conversions, track alternative engagement signals.** Track: (1) scroll depth — is the percentage of users reaching the bottom increasing? (2) FAQ clicks — are users finding answers to objections? (3) Return to main website — are users going back after the landing page? (4) Overall campaign lift via incrementality testing. Do not kill campaigns based on low on-page conversion rates alone. (Source: Tas Bober, Episode #185)

**Diagnose stage-by-stage conversion rates to identify and plug funnel leaks.** Rather than defaulting to "we need more leads," analyze conversion rates at each stage of the sales funnel to identify where pipeline is falling out. If 60% of pipeline is lost at a particular stage, investigate whether a marketing asset, motion, or sales enablement intervention could improve conversion at that stage. (Source: Ruth Zive, Episode #175)

---

## Tools

**Start CRO with free or low-cost behavioral tools.** Microsoft Clarity is free and requires only a code snippet to collect heatmaps and session recordings, showing where users click, scroll, and interact. Hotjar offers affordable entry-level plans suitable for startups. Both provide behavioral data that reveals friction points without requiring large traffic volumes. (Source: Haley Carpenter, Episode #282)

**Implement heat mapping and web analytics tools to identify content engagement patterns.** Use a heat mapping tool (Hotjar, Crazy Egg, Microsoft Clarity) to visualize where users click and scroll, and a web analytics tool (Google Analytics or alternative) to track user behavior. You don't need to watch every session recording — focus on heat map data to identify which sections get the most engagement. (Source: Tas Bober, Episode #185)

**Use predictive user scoring to qualify site visitors before lead capture.** Implement predictive user scoring to identify high-intent visitors based on on-site behavior patterns. Track metrics like pages visited and time spent, then compare against historical user behavior data to predict conversion likelihood. This allows you to qualify visitors as "qualified visits" before they become formal leads. (Source: John Short, Episode #148)

**Quantify design impact on paid media conversion as a performance lever.** When evaluating design investment, calculate the potential ROI by looking at monthly ad spend and conversion rates. For example, if a company spends $250,000/month on paid social and search, a 5% improvement in conversion rate driven by better design directly translates to measurable revenue impact. Use this calculation to reframe design from a "nice-to-have" brand activity to a mission-critical performance lever. (Source: Eli Rubel, Episode #153)

---

## Reporting and Program Management

**Implement a three-tier reporting cadence for CRO.** Use: (1) individual test reports (tactical and specific), (2) newsletters/email updates (shared with select audiences), and (3) quarterly business reviews (strategic, program-level). Use a Slack or Teams channel as the hub for sharing results and upcoming tests. Program-level reporting should track wins/losses, learnings, and cross-functional impact — not just individual test metrics. (Source: Haley Carpenter, Episode #282)

**Embed webinar signup forms directly in related blog posts for organic registration lift.** When you publish a blog post on a topic you'll later cover in a webinar, embed the webinar signup form or link at the top of that blog post. As readers discover the blog post over time through organic search and referral traffic, they encounter the webinar signup opportunity without requiring additional email sends or promotional campaigns. (Source: Amanda Natividad, Episode #205)

---

## LinkedIn Profile as a Conversion Asset

**Treat your LinkedIn profile as a conversion landing page, not a passive listing.** Structure every section (cover image, headline, about section, experience, featured content) to address your ICP's specific pain points and drive a clear conversion action. The profile functions as a landing page where prospects land after seeing your content or receiving outreach. (Source: Kanika Sharma, Episode #215)

**Structure the LinkedIn About section to establish ICP pain points and move prospects toward conversion.** Start with a hook that asks a direct question to your ICP: "Is this the problem you're facing?" Once you get a mental "yes," help them visualize their current state with the problem, then shift them toward the solution you offer. End with a CTA, ROI, or social proof. (Source: Kanika Sharma, Episode #215)

**Use LinkedIn's custom CTA button to link to the most logical next step, not your homepage.** Link to a specific, high-intent destination: a demo page, product page, case study, or calendar link. Use UTM parameters to track clicks. The CTA should represent the most logical next action for someone who has just read your profile. (Source: Kanika Sharma, Episode #215)

**Optimize the LinkedIn Experience section to answer ICP pain points and include a conversion link.** For each role, write 1–2 lines that answer: "What is the biggest problem you solve for users?" and "How do you solve it?" Include quick ROI bullets or social proof. Add a custom link to a relevant landing page, demo, or calendar link. (Source: Kanika Sharma, Episode #215)

---

## Organizational Blockers

**Before starting a CRO engagement, surface organizational resistance to data-driven decisions early.** Ask leadership directly: "If a test shows our current homepage messaging is underperforming, are you open to changing it?" Resistance to this question is an early warning sign. Even the best CRO practitioner cannot overcome a leadership team that is unwilling to act on test results. (Source: Haley Carpenter, Episode #282)

**Allocate budget and internal resources explicitly for CRO.** CRO, when done well, requires investment — specialized skills, tools, and time. If working with an external CRO agency, allocate at least one internal person to manage relationships and approvals. Budget constraints limit the scope and velocity of testing. (Source: Haley Carpenter, Episode #282)

---

## Where Experts Disagree

### 1. Should B2B marketers run A/B tests on landing page elements?
**Support summary: 6 vs. 1 (testing advocates vs. abandon testing)**

**Position A — Stop A/B testing micro-elements in B2B entirely:**
Tom Wentworth (Episode #304) argues that B2B companies should discontinue A/B testing of button colors, copy variations, and other micro-elements on landing pages. His reasoning: B2B companies lack sufficient conversion volume to achieve statistical significance, most teams don't understand statistical significance anyway and draw premature conclusions, and the marginal gains from micro-testing are negligible. He recommends focusing instead on larger strategic decisions — product positioning, messaging pillars, audience targeting — where impact is meaningful.

**Position B — A/B testing is valuable in B2B when done with the right approach:**
Talia Wolf (Episodes #251 and #132), Haley Carpenter (Episode #282), Eli Rubel (Episode #120), and Peep Laja (Episode #119) all advocate for testing as a core CRO practice — but with important conditions. Talia Wolf recommends conducting foundational customer research before testing to identify page-level problems, then testing systematically. She also advocates testing messaging in email and ads before implementing on the website. Haley Carpenter frames CRO as a two-bucket system (research + testing), sets 200K monthly users as the threshold for controlled A/B tests, and recommends alternative testing methods (preference tests, user testing platforms) for lower-traffic sites rather than abandoning testing altogether. Eli Rubel recommends systematically testing design and creative variations in paid media and identifies micro-surfaces across the buyer journey as high-value testing opportunities. Peep Laja advocates for message testing on key pages before launch and iterating based on feedback.

**Context dependency:** Tom Wentworth's argument is strongest for companies with very low traffic where statistical significance is genuinely unachievable. Haley Carpenter's 200K monthly user threshold and alternative testing methods partially bridge the gap — both sides agree that naive micro-testing without statistical rigor is problematic. But Wentworth goes further by recommending abandonment of the practice entirely, while the others say fix the approach, not abandon it. This is a genuine disagreement on whether testing has value in B2B at all, not just a context difference.

**Why it matters:** If Wentworth is right, B2B marketers are wasting significant time and resources on inconclusive tests that create false confidence. If the testing advocates are right, abandoning experimentation means leaving conversion gains on the table and making strategic decisions without validation.

**When helping a user decide:** Surface both positions. If the user's site has fewer than 200K monthly users, Wentworth's concern about statistical significance is directly applicable — but Carpenter's alternative testing methods (preference tests, user testing) offer a path forward that doesn't require abandoning testing entirely. If the user is testing micro-elements without a research-informed hypothesis, all guests would agree that's the wrong approach.

---

### 2. Should every email have exactly one call-to-action, with no exceptions?
**Support summary: 2 vs. 1 (strict single-CTA vs. single-CTA with explicit exceptions)**

**Position A — Strict single CTA, no exceptions:**
Dave Gerhardt (Episode #314) states each email should have one clear primary CTA, and all links should lead to the same destination — you can repeat the same link multiple times (top and bottom) but it must be the same ask. Pierce Uijainwalla (Episode #167) recommends defaulting to a single CTA to maximize focus and click-through rates, with multiple CTAs only acceptable in specific scenarios where they are highly relevant to each other.

**Position B — Single CTA is the default, but explicit exceptions are legitimate:**
Samar Owais (Episode #247) agrees that one type of CTA per email is the rule (all links to the same destination), but explicitly carves out an exception: if the email's purpose is to highlight multiple distinct options (e.g., a calendar of five separate events), multiple CTAs are appropriate.

**Context dependency:** This disagreement is narrow — it's about whether exceptions to the single-CTA rule are legitimate, not whether the rule itself is sound. All three guests agree on the default. The disagreement matters most for email marketers running event-heavy programs where multiple distinct CTAs may be unavoidable.

**Why it matters:** For email marketers managing complex programs with multiple offers, knowing whether exceptions are legitimate affects how they structure promotional emails — strict adherence to single-CTA may force awkward consolidation that reduces clarity rather than improving it.

**When helping a user decide:** The default recommendation from all three guests is one CTA. If the user is running an event-heavy program with genuinely distinct options (e.g., five separate webinars in a single email), Owais's exception applies. If the user is simply trying to promote two resources at once, Gerhardt and Uijainwalla would recommend consolidating them into a single hub landing page.

---

### 3. Should CRO focus primarily on increasing motivation or reducing friction?
**Support summary: 3 vs. 1 (friction reduction matters vs. motivation is primary)**

**Position A — Motivation is the primary lever; friction reduction is secondary:**
Peep Laja (Episode #119) explicitly states that motivation is 10x more powerful than friction reduction. Users with high motivation will tolerate significant friction. Focus messaging and copy on making people want to take action rather than optimizing form fields or removing steps. Motivation is driven by words and messaging, not design.

**Position B — Friction reduction and journey simplification are foundational CRO priorities:**
Haley Carpenter (Episode #282) emphasizes that B2B sites often have complex journeys with multiple CTAs and service pages that confuse users, and that simplifying the journey is a foundational step before personalization or other tactics. The CRO foundation pyramid places journey clarity as a base requirement. Eli Rubel (Episode #120) identifies micro-surfaces across the buyer journey — including lead routing, automated booking, and nurture sequences — as high-value optimization targets, implying that reducing friction at these touchpoints compounds into significant conversion gains.

**Context dependency:** Peep Laja's argument may apply more to top-of-funnel messaging optimization where motivation is the primary barrier, while Haley Carpenter and Eli Rubel may be addressing mid-funnel and journey-level friction where structural barriers are the bottleneck. However, both sides are making general claims about CRO priority, not stage-specific claims, making this a genuine disagreement on emphasis and resource allocation.

**Why it matters:** Where a CRO team focuses its effort — on copywriting and messaging to increase desire, versus on journey simplification and friction removal — determines the entire program roadmap and skill set required.

**When helping a user decide:** If the user's site has unclear messaging and weak value propositions, Laja's motivation-first argument applies directly. If the user's site has a clear value proposition but a confusing multi-step journey with too many CTAs, Carpenter's friction-reduction argument applies. In practice, both may need to be addressed — the disagreement is about which to prioritize first.

---

## What NOT To Do

**Do not run A/B tests on micro-elements (button colors, copy variations) without first achieving statistical significance thresholds.** Most B2B teams draw premature conclusions from inconclusive tests. (Source: Tom Wentworth, Episode #304)

**Do not skip foundational research and jump straight to testing.** Testing without research-informed hypotheses produces noise, not insight. (Source: Talia Wolf, Episode #251; Haley Carpenter, Episode #282)

**Do not treat engagement metrics (bounce rate, CTR, scroll depth) as primary success metrics.** These are secondary. Lead with bottom-line business impact when reporting to leadership. (Source: Haley Carpenter, Episode #282)

**Do not use "we can't measure bottom-line metrics" as an excuse.** This is unacceptable. There is always a way to tie CRO work back to revenue or leads. (Source: Haley Carpenter, Episode #282)

**Do not implement personalization or advanced tactics before the CRO foundation is solid.** If messaging is unclear, the value proposition is weak, or social proof is insufficient, advanced tactics will fail. (Source: Haley Carpenter, Episode #282)

**Do not display social proof with too few reviews.** Showing star ratings with only 2–3 reviews can actively hurt credibility rather than help it. (Source: Haley Carpenter, Episode #282)

**Do not use "Register Now" as a CTA button.** It is generic and uninspiring. Use first-person, benefit-driven language instead. (Source: Jay Schwedelson, Episode #167)

**Do not send recipients to your homepage from LinkedIn CTAs or profile links.** Homepages have too many distractions and no clear value prop. Link to a specific, high-intent destination instead. (Source: Kanika Sharma, Episode #215)

**Do not kill campaigns based on low on-page conversion rates alone.** In B2B with long sales cycles, on-page conversion is often not the right primary metric. Track engagement signals and campaign lift instead. (Source: Tas Bober, Episode #185)

**Do not default to "we need more leads" without first diagnosing stage-by-stage conversion rates.** Plugging a funnel leak often yields better ROI than increasing lead volume. (Source: Ruth Zive, Episode #175)

**Do not drive expensive paid traffic to a landing page before testing its messaging.** Validate messaging with your target audience first. (Source: Peep Laja, Episode #119)

**Do not let research findings die in a slide deck.** Actively share insights through newsletters, presentations, and linked tests. (Source: Haley Carpenter, Episode #282)

---

## Sources

| Episode | Guest | Date |
|---------|-------|------|
| Episode #329 | Jay Schwedelson | 2026-02-12 |
| Episode #314 | Dave Gerhardt | 2025-12-22 |
| Episode #304 | Tom Wentworth | 2025-11-17 |
| Episode #282 | Haley Carpenter | 2025-09-15 |
| Episode #251 | Talia Wolf | 2025-06-02 |
| Episode #247 | Samar Owais | 2025-05-19 |
| Episode #243 | Anthony Blatner | 2025-05-05 |
| Episode #231 | Talia Wolf | 2025-03-24 |
| Episode #215 | Kanika Sharma | 2025-01-30 |
| Episode #205 | Amanda Natividad | 2024-12-26 |
| Episode #185 | Tas Bober | 2024-10-17 |
| Episode #175 | Ruth Zive | 2024-09-12 |
| Episode #167 | Jay Schwedelson, Pierce Uijainwalla | 2024-08-15 |
| Episode #153 | Eli Rubel | 2024-06-27 |
| Episode #148 | John Short | 2024-06-10 |
| Episode #132 | Talia Wolf | 2024-04-15 |
| Episode #120 | Eli Rubel | 2024-02-26 |
| Episode #119 | Peep Laja | 2024-02-22 |