# Exit Five B2B Marketing Skills for Claude

Claude skill files grounded in expert best practices from [The Dave Gerhardt Show (Exit Five)](https://exitfive.com/podcast), not superficial advice with a pretty wrapper.

Every recommendation in these skills traces back to a specific guest, a specific episode, and a specific "practice" they detailed. If a topic isn't covered, it's because no guest has addressed it yet.

## How to Use

1. Fork this repo
2. Copy any `SKILL.md` file into your Claude Project's skill directory
3. Claude will automatically apply the skill when relevant to your task

## Where the Experts Disagree

Not every best practice is settled. When podcast guests give conflicting advice on the same question, we track it, including how many guests support each position. A "6 vs 1" disagreement tells you different things than a "3 vs 3" one.

See [`/disagreements`](./disagreements/) for the full structured data.

All 0 disagreements are available as structured JSON in [`/disagreements`](./disagreements/).

## Per-Episode Analysis

Every processed episode produces a short write-up covering what it added to the knowledge base: new practices extracted, which skills were updated, and any disagreements it surfaced or reinforced.

See [`/episode-analyses`](./episode-analyses/) for all analyses.

## How It Works

This repo is maintained by an automated pipeline that:
1. Monitors the Exit Five podcast RSS feed for new episodes
2. Pulls transcripts directly from the `podcast:transcript` URL in the RSS
3. Uses Claude Haiku to identify specific, actionable best practices (not vague advice)
4. Detects genuine disagreements between experts across episodes, with support counts
5. Compiles practices into skill files, organized by marketing function
6. Generates a per-episode analysis explaining what each new episode contributed
7. Publishes updates after each new episode

Every practice requires a specificity score of 3+ (out of 5) to be included. Generic advice like "know your audience" gets filtered out. What remains is the stuff you can actually do on Monday morning.

## Available Skills

| Skill | Practices | Episodes | Last Updated |
|-------|-----------|----------|--------------|
| [Abm Field Events](./skills/abm-field-events/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Abm Pipeline Attribution Alignment](./skills/abm-pipeline-attribution-alignment/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Account Based Marketing](./skills/account-based-marketing/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Agency And Vendor Management](./skills/agency-and-vendor-management/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Ai Adoption And Team Enablement](./skills/ai-adoption-and-team-enablement/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Ai Content Creation And Repurposing](./skills/ai-content-creation-and-repurposing/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Ai Governance And Responsible Use](./skills/ai-governance-and-responsible-use/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Ai Sales Intelligence And Outreach](./skills/ai-sales-intelligence-and-outreach/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Ai Search Optimization](./skills/ai-search-optimization/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Ai Workflow Automation And Agent Building](./skills/ai-workflow-automation-and-agent-building/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Analyst Relations](./skills/analyst-relations/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Attribution And Incrementality Measurement](./skills/attribution-and-incrementality-measurement/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Audience Building](./skills/audience-building/SKILL.md) | 0 | 0 | 2026-04-20 |
| [B2b Buying Process](./skills/b2b-buying-process/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Brand And Content Demand Creation](./skills/brand-and-content-demand-creation/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Brand Building Tactics And Creative](./skills/brand-building-tactics-and-creative/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Brand Measurement And Roi](./skills/brand-measurement-and-roi/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Category Creation Strategy](./skills/category-creation-strategy/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Channel And Campaign Measurement](./skills/channel-and-campaign-measurement/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Channel Strategy](./skills/channel-strategy/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Cmo Role Definition And Career Navigation](./skills/cmo-role-definition-and-career-navigation/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Cold Email Outbound](./skills/cold-email-outbound/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Community Building](./skills/community-building/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Community Member Engagement](./skills/community-member-engagement/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Community Moderation And Governance](./skills/community-moderation-and-governance/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Compensation Strategy](./skills/compensation-strategy/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Competitive Intelligence](./skills/competitive-intelligence/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Competitive Positioning Strategy](./skills/competitive-positioning-strategy/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Content Distribution And Repurposing](./skills/content-distribution-and-repurposing/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Content Ideation](./skills/content-ideation/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Content Measurement And Attribution](./skills/content-measurement-and-attribution/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Content Operations](./skills/content-operations/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Content Planning And Editorial Strategy](./skills/content-planning-and-editorial-strategy/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Copywriting Craft And Execution](./skills/copywriting-craft-and-execution/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Creative Brainstorming And Ideation](./skills/creative-brainstorming-and-ideation/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Creative Strategy](./skills/creative-strategy/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Creator Led Content Programs](./skills/creator-led-content-programs/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Cro Program Management](./skills/cro-program-management/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Cross Functional Launch Alignment](./skills/cross-functional-launch-alignment/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Customer Advocacy](./skills/customer-advocacy/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Customer Expansion And Retention](./skills/customer-expansion-and-retention/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Customer Onboarding And Success](./skills/customer-onboarding-and-success/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Customer Research](./skills/customer-research/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Customer Win Back](./skills/customer-win-back/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Deep Work And Time Management](./skills/deep-work-and-time-management/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Demand Gen Strategy And Measurement](./skills/demand-gen-strategy-and-measurement/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Direct Mail And Gifting](./skills/direct-mail-and-gifting/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Early Stage Marketing](./skills/early-stage-marketing/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Email Copy And Subject Lines](./skills/email-copy-and-subject-lines/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Email Deliverability](./skills/email-deliverability/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Email Design And Layout](./skills/email-design-and-layout/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Email List Hygiene](./skills/email-list-hygiene/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Email List Segmentation](./skills/email-list-segmentation/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Email Marketing And Nurture](./skills/email-marketing-and-nurture/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Employee Advocacy](./skills/employee-advocacy/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Employee Recognition](./skills/employee-recognition/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Employer Branding](./skills/employer-branding/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Enterprise Gtm Strategy](./skills/enterprise-gtm-strategy/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Event Booth Strategy](./skills/event-booth-strategy/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Event Planning And Experience Design](./skills/event-planning-and-experience-design/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Event Promotion And Follow Up](./skills/event-promotion-and-follow-up/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Event Strategy And Measurement](./skills/event-strategy-and-measurement/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Executive Stakeholder Management](./skills/executive-stakeholder-management/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Founder Led Marketing](./skills/founder-led-marketing/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Freelance And Solo Business Strategy](./skills/freelance-and-solo-business-strategy/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Funnel Pipeline And Revenue Metrics](./skills/funnel-pipeline-and-revenue-metrics/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Gtm Strategy Cross Functional Alignment](./skills/gtm-strategy-cross-functional-alignment/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Homepage Website Strategy](./skills/homepage-website-strategy/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Icp Definition And Segmentation](./skills/icp-definition-and-segmentation/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Influencer Marketing](./skills/influencer-marketing/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Intent Data](./skills/intent-data/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Interactive Product Demos](./skills/interactive-product-demos/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Internal Communications](./skills/internal-communications/SKILL.md) | 0 | 0 | 2026-04-20 |
| [International Market Expansion](./skills/international-market-expansion/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Landing Page And Web Copy](./skills/landing-page-and-web-copy/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Landing Page Design Optimization](./skills/landing-page-design-optimization/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Lead Scoring And Predictive Scoring](./skills/lead-scoring-and-predictive-scoring/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Lifecycle Marketing](./skills/lifecycle-marketing/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Linkedin Ads Tactics](./skills/linkedin-ads-tactics/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Linkedin Content Strategy](./skills/linkedin-content-strategy/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Linkedin Profile Optimization](./skills/linkedin-profile-optimization/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Marketing Budget And Resource Allocation](./skills/marketing-budget-and-resource-allocation/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Marketing Career Development](./skills/marketing-career-development/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Marketing Experimentation And Channel Strategy](./skills/marketing-experimentation-and-channel-strategy/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Marketing Metrics And Measurement](./skills/marketing-metrics-and-measurement/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Marketing Mix Modeling](./skills/marketing-mix-modeling/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Marketing Operations](./skills/marketing-operations/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Marketing Project Management](./skills/marketing-project-management/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Marketing Strategy Planning And Goal Setting](./skills/marketing-strategy-planning-and-goal-setting/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Marketing Team Hiring And Talent](./skills/marketing-team-hiring-and-talent/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Marketing Team Structure](./skills/marketing-team-structure/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Media Brand Building](./skills/media-brand-building/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Meeting Design And Facilitation](./skills/meeting-design-and-facilitation/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Membership Community Monetization](./skills/membership-community-monetization/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Messaging Development And Copywriting](./skills/messaging-development-and-copywriting/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Nearbound Marketing](./skills/nearbound-marketing/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Original Research And Data Content](./skills/original-research-and-data-content/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Out Of Home Advertising](./skills/out-of-home-advertising/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Outbound Abm And Account Targeting](./skills/outbound-abm-and-account-targeting/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Outbound Sales Messaging](./skills/outbound-sales-messaging/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Paid Media Strategy](./skills/paid-media-strategy/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Partner Marketing](./skills/partner-marketing/SKILL.md) | 0 | 0 | 2026-04-20 |
| [People Management And Performance](./skills/people-management-and-performance/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Personal Productivity And Habits](./skills/personal-productivity-and-habits/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Personalization At Scale](./skills/personalization-at-scale/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Physical Product Marketing](./skills/physical-product-marketing/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Podcast Strategy](./skills/podcast-strategy/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Pr And Communications](./skills/pr-and-communications/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Presentation Strategy](./skills/presentation-strategy/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Pricing Page Strategy](./skills/pricing-page-strategy/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Pricing Strategy](./skills/pricing-strategy/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Product Launch Strategy](./skills/product-launch-strategy/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Product Led Growth](./skills/product-led-growth/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Product Market Fit](./skills/product-market-fit/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Product Marketing](./skills/product-marketing/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Professional Networking](./skills/professional-networking/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Prompt Engineering For Marketers](./skills/prompt-engineering-for-marketers/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Rebrand Strategy](./skills/rebrand-strategy/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Reddit Marketing](./skills/reddit-marketing/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Referral Marketing](./skills/referral-marketing/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Remote Work Practices](./skills/remote-work-practices/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Revenue Forecasting](./skills/revenue-forecasting/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Revenue Operations](./skills/revenue-operations/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Sales Enablement](./skills/sales-enablement/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Sales Led Gtm Strategy](./skills/sales-led-gtm-strategy/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Sales Marketing Organizational Alignment](./skills/sales-marketing-organizational-alignment/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Seo And Search Marketing](./skills/seo-and-search-marketing/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Signal Based Marketing](./skills/signal-based-marketing/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Sms Marketing](./skills/sms-marketing/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Social Media Content Execution](./skills/social-media-content-execution/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Social Media Strategy And Operations](./skills/social-media-strategy-and-operations/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Sponsorship Strategy](./skills/sponsorship-strategy/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Storytelling](./skills/storytelling/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Team Offsite And Culture Building](./skills/team-offsite-and-culture-building/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Testing And Experimentation](./skills/testing-and-experimentation/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Thought Leadership Content](./skills/thought-leadership-content/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Vendor Evaluation](./skills/vendor-evaluation/SKILL.md) | 0 | 0 | 2026-04-20 |
| [Video Content Marketing](./skills/video-content-marketing/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Video On Camera Skill Building](./skills/video-on-camera-skill-building/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Visual Content Strategy](./skills/visual-content-strategy/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Web Accessibility And Compliance](./skills/web-accessibility-and-compliance/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Webinar Strategy](./skills/webinar-strategy/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Website Information Architecture](./skills/website-information-architecture/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Website Performance Optimization](./skills/website-performance-optimization/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Win Loss Analysis](./skills/win-loss-analysis/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Workplace Communication And Feedback](./skills/workplace-communication-and-feedback/SKILL.md) | 0 | 0 | 2026-04-21 |
| [Workplace Wellbeing And Mental Health](./skills/workplace-wellbeing-and-mental-health/SKILL.md) | 0 | 0 | 2026-04-21 |

## Attribution

All content is sourced from publicly available podcast transcripts. Every practice is attributed to the guest who shared it. This project is not affiliated with Exit Five.
