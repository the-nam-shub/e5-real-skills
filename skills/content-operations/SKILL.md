---
name: content-operations
description: "Guidance for planning, producing, managing, and distributing B2B marketing content at scale—trigger when a user needs help with content workflows, AI-assisted production, team structure, scheduling, or editorial processes."
version: "2026-04-21"
episode_count: 75
---

# Content Operations

## Overview
This skill covers the operational practices behind B2B content creation and distribution: production workflows, AI tool usage, team structure, scheduling, quality control, and content management systems. All practices are sourced exclusively from guests on the Exit Five podcast. Where guests disagree, both positions are presented with full attribution so you can help users make informed decisions rather than presenting contested practices as settled consensus.

---

## Production Workflows and Cadence

### Weekly and Monthly Production Cycles
- Establish a repeating weekly production cycle for high-volume content: Monday (writers room—each person brings 3 ideas, vote on top ones), Tuesday (fine-tune scripts and assign roles), Wednesday (quality check), Thursday (shoot 12–15 videos), Friday (analyze performance and plan next week). This keeps you 4–6 weeks ahead of your publishing schedule. (Source: Chris Cunningham, Episode #347)
- For batch video production, film 6+ episodes in 1–2 day sessions per month rather than shooting continuously. This reduces logistical overhead, builds momentum, and creates a predictable content bank. (Source: Chris Cunningham, Episode #347)
- For podcast production, batch-record a full season (8–10 episodes) over 2 days in-person. Prepare detailed outlines for each episode but do not script the conversation—let it flow naturally. Bring multiple outfit changes and plan episode order strategically. (Source: Jess Cook, Episode #321)
- Establish a weekly subject matter expert (SME) interview cadence (weekly or twice weekly) with internal experts—executives, solutions engineers, product leaders—to capture insights for thought leadership content. Record and transcribe, then use AI workflows to convert into blog posts, social content, and promotional materials. (Source: Kyle Coleman, Episode #206)
- For CEO/executive LinkedIn content, use a five-day production cycle: Tuesday (20-minute idea dump call with the executive—no prep required, voicemail or video acceptable), Wednesday (write first draft, share via Slack with target post date), Thursday end-of-day (executive reviews and revises), Friday (finalize and stage for publishing). Never start on Monday. Limit revisions to this cadence—anything more leads to overworked content. (Source: Devin Reed, Episode #196)

### Content Calendars and Backlogs
- Maintain a dedicated backlog of 500+ post ideas (Apple Notes, Google Doc, or Notion) to draw from on days when inspiration doesn't strike. Capture ideas as they emerge from customer calls, internal meetings, and team conversations rather than generating them on demand. (Source: Dave Gerhardt, Episode #275)
- Create a structured content management system with multiple documents: a personal content doc, a business/company doc, a customer stories doc, a podcast/media doc, and a master queue/planner spreadsheet tracking idea status (ideas only, ideas needing images, in progress, scheduled). (Source: Brad Zomick, Episode #156)
- Maintain a dedicated Slack channel (e.g., "founder brand") where the founder shares brief content ideas, observations, and story hooks daily as they occur. Weekly, conduct a recorded video session where the founder talks through the story, the marketer writes it up, and the founder edits for voice authenticity. (Source: Kait Stephens, Episode #156)
- Establish a dedicated system (Google Tasks, Slack channel, or similar) to capture content ideas as they emerge throughout the day. Examples: a Slack channel like "stuff customers say" where employees post customer insights, or using meeting recorders (Fathom, Gong, Granola) to identify repeated customer pain points. (Source: Emeric Ernoult, Episode #317)

### Posting Frequency Testing
- Test different posting frequencies and measure engagement before settling on a cadence. Run tests for 2–3 months—the optimal frequency is not intuitive and varies by account type. For example, ClickUp discovered that posting twice daily on their comedy account actually *decreased* impressions; audiences preferred one video per day. (Source: Chris Cunningham, Episode #347)
- **(Note: optimal LinkedIn posting frequency is contested — see Where Experts Disagree)**

---

## AI-Assisted Content Production

### Using AI as a Research and Editing Assistant
- Use AI (Claude, ChatGPT, Perplexity) to gather, synthesize, and organize research materials for content creation rather than generating original content from scratch. Spend 30 minutes upfront creating a detailed brief about what you want to write, then use AI to help research, organize, and piece together materials. Treat AI as a research and editing assistant, not a content generator—this works best when you are the subject matter expert. (Source: Dave Gerhardt, Episode #345)
- Use AI for editing, grammar, and structure—not for generating core ideas. AI works best as an editor and formatter when you provide it with a clear idea, outline, or voice note. Use it to correct typos, suggest alternative phrasings, and consolidate rambling notes into coherent posts. (Source: Sara Lattanzio, Episode #268)
- Use AI as a third-party brainstorm partner to identify gaps in team work. Feed completed copy into ChatGPT along with context about the competitive landscape and ask what gaps or stronger angles the team might have missed. (Source: Sara Ajemian, Episode #288)
- Use AI as an ideation partner: share your initial thinking, ask it to fill in gaps and offer ideas you haven't considered, then use those outputs as inspiration to refine your own work. The AI output often won't be usable as-is, but specific words, phrases, or concepts can spark better ideas. (Source: Jessica Hreha, Episode #136)
- **(Note: whether AI should generate original content from scratch is contested — see Where Experts Disagree)**

### AI Workflow Design
- Instead of manually prompting AI for each piece of content, define your content creation process as a multi-step workflow and encode it into an AI tool (e.g., Copy.ai, custom automation). Example: transcript → extract key points → structure as blog post → maintain speaker voice → add quotes → translate to multiple languages. Run the entire workflow with one click. (Source: Kyle Coleman, Episode #206)
- Break content creation into small, discrete sections and assemble them together rather than prompting AI to generate entire pages at once. Extract tiny pieces of intelligence (from sales calls, product data, competitor analysis, internal knowledge bases), map each piece to specific sections of a content brief using structured JSON output, write one section at a time with focused context, then re-edit the full assembled output. (Source: Adina Timar, Episode #336)
- After gathering research from multiple sources, use structured JSON output to map each piece of intelligence to specific content sections (headings, subsections). This ensures granular placement of information and helps LLMs understand the content structure before writing begins. (Source: Adina Timar, Episode #336)
- When using AI for content generation, provide it with: (1) core company messaging and positioning, (2) target audience definitions, (3) examples of high-quality past work in the same format, and (4) tone and style guidelines. Update and iterate this input as company messaging evolves. (Source: Jennifer Cannizzaro, Episode #267)
- When using AI to generate email content, create separate AI workflows for each section of a multi-section email rather than generating the entire email at once. Feed the AI strong human-written examples with clear voice, compelling stories, case studies, and data. Always include a human editor to review for tone, strategy, and accuracy. (Source: Joe, Episode #312)
- Generate and edit outlines before writing full content. Use AI to generate an outline based on your brief, target audience, and key messages. Review and edit the outline to ensure strategic alignment before the tool writes the full piece. (Source: Jessica Hreha, Episode #136)
- Use guided UI workflows instead of freeform prompting where possible. Tools with structured UI workflows that guide users through required inputs step-by-step (target audience, topic, content length, brand voice, supporting materials) produce more consistent, higher-quality inputs than freeform prompting. (Source: Jessica Hreha, Episode #136)

### Specific High-Value AI Use Cases
- Use AI for discrete, high-leverage tasks: translating content into other languages, converting voice notes to text, generating multiple headline or subject line options, creating detailed design briefs from reference images, or outlining research directions. (Source: Dave Gerhardt, Episode #209; Ross Simmonds, Episode #209)
- Build a custom GPT trained on proprietary research reports to automatically surface relevant statistics, quotes, and data for insertion into blog posts, sales decks, and thought leadership content. Upload the full report to the GPT's knowledge base, disable web search to prevent hallucination, and use it as an expert advisor. This extends the lifecycle of a single research report across 6–9+ months of content production. (Source: Jillian Hoefer, Episode #278)
- Collect your top-performing content pieces and feed them into ChatGPT with a prompt asking it to identify the common elements that make them successful. Use the analysis to create a framework or checklist for future content creation, or to train a custom GPT that helps others create content following the same pattern. (Source: Matt Carnevale, Episode #155)
- Build a custom GPT that embeds your proven content patterns and asks users clarifying questions to extract information before generating content following the proven formula. (Source: Matt Carnevale, Episode #155)
- Use AI to upload completed content (decks, documents, articles) and ask it to identify what's missing or what could be strengthened. Example prompts: "If you're a CMO, what is missing from this deck?" or "What questions should I ask about this proposal?" (Source: Jessica Hreha, Episode #136)
- Build an AI-powered content research engine that runs queries across multiple LLMs (Claude, ChatGPT, Perplexity), analyzes their responses, scrapes citations, stores results in a database, and compares your content against competitors and knowledge bases to identify content gaps. (Source: Jennifer Delevante-Moulen, Episode #288)
- Use voice dictation to capture raw ideas and thoughts, then feed the transcribed blurb into an AI tool with specific instructions for post structure. Follow up by manually fine-tuning and removing AI artifacts (e.g., em dashes) to ensure the final post matches your brand voice. (Source: Sara Lattanzio, Episode #268)

### AI Quality Control
- Use AI to accelerate research, gather data, and generate initial ideas, but don't outsource final creative judgment to AI. Apply your expertise and taste to evaluate and refine the output. The key is knowing when AI output is good enough and when it needs human refinement or rejection. (Source: Erin May, Episode #337)
- When using AI to refresh or improve existing content, output suggestions in a visual diff format (strikethrough for deletions, highlighted text for additions) with reasoning for each change. Require a human editor to review, accept, reject, or modify each suggestion before publishing. Do not blindly accept all AI-generated changes. (Source: Eoin, Episode #290)
- Identify low-quality AI-generated content by checking for three signals: (1) content that is not unique and doesn't push the conversation forward—it simply scrapes and repurposes top Google results; (2) content that doesn't match your brand's tone of voice; (3) telltale linguistic patterns like overuse of "utilize" instead of "use" or formal phrases not found in everyday vocabulary. (Source: Eoin Clancy, Episode #326)

### Brand Knowledge Systems for AI
- Create a Claude skill that encodes your brand guidelines, visual styles, and tone into reusable instructions. Store the skill's markdown instructions in Notion and set up a Claude-Notion integration so the skill pulls live data. Establish a governance process: team members submit skill change requests through Notion, your design team vets and approves changes, and one-off requests are handled separately. (Source: Liz, Episode #345)
- Build a comprehensive knowledge base in Claude (or similar LLM) containing all product information, brand guidelines, customer insights, and messaging frameworks. Train your team to use this centralized brain for content creation and marketing tasks. (Source: Justin Johnson, Episode #271)
- Create a structured brand kit by extracting intelligence from sales transcripts, internal communications, product documentation, and team knowledge. Use markdown formatting for LLM readability. Include granular product details sourced from sales calls rather than hand-written descriptions. Validate extracted data for accuracy before use. (Source: Adina Timar, Episode #336)
- Create a hybrid workflow where humans guide AI output to match brand voice. Develop key input assets: (1) product context documentation, (2) brand style guides, and (3) a one-page tone of voice guide that captures your brand's personality and linguistic patterns. Feed these assets into your AI workflow alongside unique internal expertise or customer insights. (Source: Eoin Clancy, Episode #326)

---

## Content Sourcing and Subject Matter Expertise

### Extracting Expertise from Internal Teams
- Systematically extract unique insights from people inside your organization and your customers rather than relying solely on AI to generate content. Interview engineers daily—they solve customer problems and understand nuanced pain points. Record voice notes from subject matter experts and use AI to enrich and structure them into drafts. (Source: Eoin Clancy, Episode #326)
- Rather than asking solutions engineers or sales engineers to write blog posts, record and transcribe their sales calls using cheap call recording software (e.g., Fireflies, Fathom). Use these transcripts as raw material for use case content, product documentation, and thought leadership. (Source: Kyle Coleman, Episode #206)
- Don't ask executives to create content from scratch. Instead, identify activities they already do regularly and are comfortable with (speaking at conferences, webinars, demos, podcasts) and record/repurpose that content. Extract multiple content pieces ("sawdust") from these existing activities. (Source: Chris Walker, Episode #139)
- Instead of asking executives to write content, interview them in a pre-planned format where you identify topics in advance. This lowers the barrier to participation and captures their authentic voice. The interview can then be repurposed into multiple content formats. (Source: Chris Guest, Episode #139)
- Build a workflow (e.g., Project Penny) that identifies quote opportunities in existing articles using AI, frames strategic questions, matches them to relevant subject matter experts from a knowledge base, and routes requests via Slack for expert responses. The workflow scrapes article content, identifies 5 quote opportunities per article with context and priority levels, searches a knowledge base to rank top 3 relevant experts, and tags them in a dedicated Slack channel. (Source: Connor Beaulieu, Episode #336)

### Content Sourcing Strategies
- Conduct podcast-style interviews with internal subject matter experts and external customers/non-customers aligned to a specific strategic message. Repurpose each interview into multiple formats: written content, video clips, and webinar assets. (Source: Ryan Narod, Episode #330)
- Create a content strategy centered on interviewing the agencies, vendors, and partners that your target customers work with. A small team (3 people) can generate significant traffic (1M+ monthly hits) by systematically interviewing 1,000+ partners over a year. (Source: Jared Fuller, Episode #174)
- Monitor communities (Exit Five, Reddit, Slack groups) where your audience discusses topics relevant to your industry. When you see a comment mentioning a company or strategy worth exploring, save that idea. Batch these ideas and assign them to your writing team to research and write as blog posts first, then convert to threads. (Source: Ross Simmonds, Episode #209)
- Build content engine using original research and first-party product data. Hire a dedicated research role focused on mining first-party data from your product and conducting original research (surveys, analysis). Turn this data into storytelling and content. (Source: Sylvia Lepoidevin, Episode #199)
- Listen to sales call recordings and customer conversations—these contain the richest context for understanding how customers think about problems. Use this material to produce content that is grounded in real expertise rather than generic information. (Source: Eoin Clancy, Episode #326)

---

## Content Repurposing and Recycling

### Repurposing Existing Content
- Identify your top-performing posts using LinkedIn Analytics or Shield, then repost them on a recurring schedule (every 3–6 months). Most followers will not have seen the original post due to feed ephemerality, and the content will perform well again. (Source: Dave Gerhardt, Episode #275)
- Use LinkedIn's analytics to find your highest-performing posts from the past 365–730 days. Repurpose these posts by updating the headline, hook, or framing while keeping the core story intact. Schedule these recycled posts alongside new content to maintain a consistent posting cadence. (Source: Dave Gerhardt, Episode #156)
- Keep a documented list (e.g., Google Doc) of 100+ evergreen blog posts and articles that remain relevant over time. Periodically update these posts by removing dated references, refreshing playbooks and examples, then republish them. (Source: Jason Lemkin, Episode #207)
- Build newsletter content by curating and storytelling around existing podcast episodes. Listen to high-performing episodes, extract key frameworks or insights, wrap them in a personal story or hook, then present the guest's framework or takeaway. The overlap in audience is minimal—less than 5% of LinkedIn followers see any given post, so repurposing is not redundant. (Source: Dave Gerhardt, Episode #169)
- Create a workflow where you record regular conversations with your CEO or founders, transcribe them, and use AI to generate multiple content pieces (social posts, blog summaries, newsletter content) from those transcripts. (Source: Jess Cook, Episode #266)

### Content Refresh for AI Search
- Refresh content quarterly to increase AI search citations. Content refreshed quarterly receives 3x the number of citations in AI search results compared to static content. Re-engage subject matter experts quarterly to provide updated quotes, data, and perspectives on existing pages. (Source: Eoin Clancy, Episode #336)
- Build a workflow that takes a URL from your site and runs two parallel audits: (1) structural audit—how well the page is formatted for AI search (heading hierarchy, internal/external links, metadata, freshness signals), and (2) brand alignment audit—whether product mentions, ICP references, and positioning match current company state. Pages refreshed in the last 90 days are 3x more likely to be cited by AI search tools than pages 6+ months old. Prioritize refresh based on current business focus rather than refreshing everything. (Source: Eoin, Episode #290)

---

## Video Production

### Video Production Approach
- **(Note: whether to use iPhone/low-budget equipment or professional production gear is contested — see Where Experts Disagree)**
- Shoot the majority of short-form social content on iPhone rather than professional cameras. iPhone footage performs better because it looks raw and authentic—similar to user-generated content. Reserve professional cameras only for high-end music videos or special productions. (Source: Chris Cunningham, Episode #347) *(Note: this is contested — see Where Experts Disagree)*
- A single person can produce a complete brand video from concept to final cut in one day by combining AI tools: voice cloning or licensed voices for voiceover, image generation models for B-roll, AI video tools to animate stills, and music/sound effects generation. Avoid using AI for talking-head footage of real people on camera. (Source: Luke, Episode #345)
- Create full-length marketing videos using a structured AI workflow: start with Claude to develop and iterate the script, generate storyboards using image models, create individual scene clips with AI video tools, then move into traditional post-production. Use image references as anchors for video generation to ensure consistency across clips. (Source: Vicente, Episode #345)
- Use CapCut (mobile app or desktop) to edit LinkedIn videos entirely on your phone. CapCut supports captions, animated captions, cuts, transitions, audio, and full video editing. This mobile-first workflow allows you to maintain consistent posting frequency without desktop software. (Source: Tim Davidson, Episode #127)
- Build an in-house video production studio (rather than outsourcing to external production companies) to enable rapid creation of launch content. This allows for 3–4 shoots per week, faster iteration on keynotes and product demos, and the ability to execute monthly launches without production bottlenecks. (Source: Maura Rivera, Episode #301) *(Note: this is contested — see Where Experts Disagree)*
- To create authentic video content without requiring founders to improvise on camera, conduct structured "content interviews" where you ask 15 pre-prepared prompts that the founder can answer conversationally. Record the conversation, then extract short video clips (30–60 seconds) or transcribe the audio into text-based posts using tools like Fireflies AI or Otter. (Source: Tommy Clark, Episode #171)

---

## Team Structure and Roles

### Hiring and Team Design
- When building a content team, prioritize hiring a marketer with writing skills over a writer who will try to figure out distribution and marketing later. A marketer who writes understands the full content lifecycle (creation, distribution, optimization) from the start. Once you have that foundation, hire specialized writers to support the core marketer. (Source: Dave Gerhardt, Episode #200)
- Rather than having one person be mediocre across all channels, identify one channel where someone can excel and let them master it. Once they've cracked the code on one channel, give them 10–20% of their time to experiment with new channels. If they succeed, document their process and bring in additional team members to scale that channel. (Source: Ross Simmonds, Episode #200)
- If you inherit a content agency that produces SEO-optimized content without a point of view or brand perspective, consider cutting them. Instead, hire a single content person you trust who understands your space and can develop a strong point of view. This person becomes responsible for all content representation across channels. (Source: Kevin White, Episode #286)
- When you lack domain expertise, hire subject matter experts (e.g., former developers for developer-focused companies, security professionals for security companies) in advocate or evangelist roles rather than as full-time employees. This can be done part-time or as contractors. Pair with internal editorial oversight to maintain quality control. (Source: Kevin White, Episode #286)
- Instead of hiring expensive content agencies or full-time writers, find people who are already using your product or engaged with your space and offer them small payments ($50–$100 per post) to write content. Pair this with internal editorial oversight to maintain quality. (Source: Kevin White, Episode #286)
- Organize content teams using a "guild" structure where content managers are embedded within and report to functional teams (e.g., lifecycle marketing, SEO, enterprise sales) for day-to-day work and KPIs, but receive professional development and strategic alignment from central content leadership. (Source: Eliana Atia, Episode #166)
- Frame the head of content role as a curator and managing editor who sources insights from existing assets (podcasts, community, guest experts) rather than as an original content creator. The role involves selecting high-value content, editing it, adding narrative framing, and managing the overall content program—similar to a magazine editor in chief. (Source: Dave Gerhardt, Episode #169)

### Involving Sales in Content Creation
- When launching new marketing content or messaging, create a core team that includes a frontline seller (not a sales manager or executive). This seller brings real-world context about customer objections and buying patterns, and their involvement ensures the sales team will actually use the content. (Source: Kira Federer, Episode #254; Episode #184)
- Don't create content or campaigns in isolation and then hand them to sales. Ask sales what they actually need, involve them in brainstorming, and build outlines together. When sales helps create something, they're more likely to use it. (Source: Adam Goyette, Episode #164)

### Creator Programs
- Build a tiered creator program with application requirements and escalating benefits: entry-level creators (who apply, show existing content creation on LinkedIn, and use your product), mid-tier experts (freelancers and agencies building businesses on your product), and enterprise partners (top agencies). Provide benefits including affiliate links, co-created content assets, paid ad promotion of creator profiles, and product feature access. (Source: Bruno Estrella, Episode #180)
- Follow a multi-step process to recruit and coordinate creators for launch campaigns: (1) build a list of creators you already follow or who align with your brand, (2) send cold DMs with flattery and a sneak peek, (3) schedule an intro meeting with a slide deck and product demo, (4) get feedback from your sales team on your pitch, (5) send a brief and contract with clear requirements, (6) on launch day, create a Slack channel where all creators post links simultaneously and engage with each other's posts to amplify reach. (Source: Natalie Taylor, Episode #163)

---

## Content Management Systems and Operations

### Templates, Standards, and Organization
- Create and enforce consistent naming conventions for files, folders, and projects so that any team member can find what they need without asking. (Source: Hannak Rankin, Episode #210)
- Create a single source of truth for all campaign messaging, content, and assets. This allows the team to move faster during pivots, ensures consistency across channels, and prevents duplicate work. (Source: Jessica Skovira, Episode #210)
- Create standardized templates for recurring marketing activities (webinars, field events, email campaigns, landing pages). Document the steps, timeline, and requirements once, then reuse and iterate. Review and refine templates regularly with the team to remove friction and unnecessary steps. (Source: Hannak Rankin, Jessica Skovira, Dave Gerhardt, Episode #210)
- Replace ad-hoc design requests for repetitive work (social graphics, email headers, etc.) with self-service systems: design templates, photography repositories, and easy-to-use tools like Canva. This eliminates the bottleneck of waiting for designers to create routine assets. (Source: Dmitry Shamis, Episode #238)
- Audit your content creation process and identify every gate, approval step, and handoff that slows velocity. Remove unnecessary steps, consolidate approvals, and eliminate delays. The goal is to automate and outsource as much as possible while maintaining quality. (Source: Kyle Coleman, Episode #206)
- Minimize the number of approval layers between subject matter experts and content publication. When content passes through multiple managers and reviewers, the original message and authenticity degrade. Have subject matter experts and vision-holders create content directly with minimal gatekeeping. (Source: Max Van Den Ingh, Episode #161)

### Scheduling and Distribution Tools
- Use Vista Social (or similar scheduling tool) to centralize posting across multiple accounts and platforms. Vista Social is lower-cost than alternatives like Sprout Social or Hootsuite, includes native integrations, and provides weekly performance reports. While manual posting is still preferred when possible, scheduling tools are essential at scale (35+ accounts). (Source: Chris Cunningham, Episode #347)
- Use NotebookLM as a research and content development tool by uploading multiple source types (documents, PDFs, audio recordings, video transcripts) up to 300 sources per notebook. Use the chat feature to query only against your uploaded sources to reduce hallucinations. Practical applications include onboarding, product launches, event coordination, and content iteration. (Source: Jess Lytle, Episode #319)
- **(Note: whether to post manually or use scheduling tools on LinkedIn is contested — see Where Experts Disagree)**

### Content Measurement
- When starting a content or social media initiative, focus on metrics you control: number of posts published, blog posts written, influencer videos created, etc. Don't rely on engagement or virality metrics early because with a small audience, these are unpredictable and discouraging. By focusing on output and consistency, you build reps, learn what resonates, and eventually engagement follows. (Source: Ross Simmonds, Episode #209)
- Treat content creation (blog posts, ebooks, podcasts, videos) as a fixed investment in fuel for your marketing engine, not as a channel with direct ROI. Allocate a separate budget for content production and do not attempt to measure its direct return on investment. Instead, measure the performance of how you distribute that content through owned and paid channels. (Source: Pranav Piyush, Episode #239)

---

## Quality and Editorial Standards

### Editing and Review
- Adjust editing rigor based on the stakes of the asset. A high-stakes landing page for a premium event targeting CMOs should get multiple rounds of feedback and careful word-smithing. A daily LinkedIn post has lower stakes and can be shipped faster with less review. Match your editing process to the stakes of what you're shipping. (Source: Dave Gerhardt, Episode #314) *(Note: this is contested — see Where Experts Disagree)*
- Build a dedicated tone revision step into your production process. After the executive reviews a draft, have them specifically focus on whether the post sounds like them. Start with copy-pasting their raw language from the idea dump, then revise for formatting and clarity, and finally adjust tone to match their voice. (Source: Devin Reed, Episode #196)
- Validate extracted data from primary sources (sales calls, internal documentation) before publishing. This reduces errors and maintains credibility. The validation doesn't require rewriting content from scratch—it's a quality check on extracted facts and claims. (Source: Adina Timar, Episode #336)
- When using AI to generate email content, always include a human editor in the loop to review for tone, strategy, accuracy, and to add final human touches (GIFs, references, spontaneous elements) that make the email feel natural. (Source: Joe, Episode #312)

### Content Structure and Formats
- Organize content around one major pillar per quarter (e.g., "B2B revenue attribution benchmarks"). Create multiple content formats around that pillar: a flagship research report, a podcast series, a live show, a quarterly in-person event, and supporting blog/video content. Host all sub-pillars on a central hub. (Source: Emir Atli, Episode #165)
- Create a stable, repeating newsletter structure (e.g., workplace trends section, AI section, thought leadership topic, water cooler chatter, fun fact, cartoon) that stays consistent week-to-week. This reduces cognitive load and builds reader trust and habit. (Source: Arielle Gordis, Episode #166)
- Structure newsletter creation across the week: spend the first few days researching trends and gathering information, write the draft mid-week, then review and refine multiple times (7+ passes) before sending. (Source: Arielle Gordis, Episode #166)
- Establish a monthly content production cadence targeting 10–15 high-value content assets (blog posts, landing pages, resources, checklists) that target the same keywords you currently run paid ads against. Use SEO briefs and tools like Semrush or Content Shake to ensure consistency and alignment with search intent. (Source: Ross Simmonds, Episode #224)
- Create and publish editorial guidelines that outline your content standards and quality expectations. Maintain author pages that showcase author credentials, expertise, and biography to demonstrate E-E-A-T to both readers and Google. (Source: Rita Cidre, Episode #224)

---

## Where Experts Disagree

### 1. Should AI be used to generate original content from scratch, or only to repurpose and refine existing content?
**Support summary: 5 vs 4**

This is one of the most substantive disagreements across Exit Five guests. Both positions are held by credible practitioners with direct experience.

**Position A: AI can and should generate first drafts from scratch**
With the right inputs (brand voice, messaging, examples), AI can produce 80% of the way to a finished piece, dramatically reducing time-to-draft while maintaining quality. The key is providing sufficient context and always having a human refine the output.

- Dave Gerhardt (Episode #164): Recommends using AI to generate 80% drafts of copy, email, landing pages, or ad headlines, providing context via custom instructions to improve output quality.
- Jennifer Cannizzaro (Episode #267): Deploys AI to generate first drafts of thought leadership, blogs, and website copy with 75% time savings, claiming AI involvement is undetectable in final output when done correctly.
- Kyle Coleman (Episode #206): Advocates encoding entire content creation workflows (transcript → extract key points → structure as blog post) into AI tools to run with one click.
- Adina Timar (Episode #336): Describes building content through AI-assembled granular pieces, writing one section at a time with focused context—treating AI as a primary content generator with human editing at the end.
- Holly Xiao (Episode #270): Uses ChatGPT and Gemini to generate initial drafts and brainstorm ideas, comparing outputs across tools and remixing with own work.

**Position B: AI is better for repurposing and refinement; generating from scratch produces commodity content**
AI-generated content from scratch lacks context, experience, and anecdotal details that make content compelling. Even with context, AI produces "best average answers" by synthesizing billions of data points, resulting in generic, undifferentiated output.

- Domi de Saint-Exupéry (Episode #332): Explicitly states AI content generation from scratch is overrated and ineffective; argues generating 100 blog posts with AI without context results in empty commodity content.
- Mark Schaefer (Episode #261): States AI produces "best average answers" resulting in generic, undifferentiated output. Recommends using AI only for research and filling gaps, not for core narrative or creative work.
- Sara Lattanzio (Episode #268): Recommends using AI only for editing, grammar, and structure—not for generating core ideas. Argues AI works best as an editor and formatter when you provide a clear idea, to preserve authenticity.
- Dave Gerhardt (Episode #345): Describes using Claude as a research assistant for content creation, treating it as a research and editing assistant rather than a content generator.

**Context dependency:** The "generate from scratch" camp consistently emphasizes providing rich context (brand voice, examples, messaging). The "repurposing only" camp argues that even with context, AI lacks the experiential and anecdotal depth that makes content compelling. This may partially dissolve by content type—AI-generated drafts may work better for structured formats (landing pages, email) than for thought leadership or narrative content—but both camps are explicitly discussing general content creation, making this a genuine disagreement.

**Trend note:** The "repurposing only" position appears more frequently in earlier episodes (2024–2025), while the "generate from scratch" position is represented across the full date range. No clear directional shift.

---

### 2. Should you post to LinkedIn manually or use scheduling tools?
**Support summary: 4 vs 2**

**Position A: Scheduling tools are fine or preferred**
Use scheduling tools (Taplio, LinkedIn native scheduler, or similar) to batch-write and queue content in advance. The operational benefits of consistent posting cadence outweigh any minor algorithmic penalty.

- Dave Gerhardt (Episode #131): Describes using Taplio (a third-party tool) to schedule posts 2–3 weeks in advance, posting twice daily at 7 AM and 3 PM Eastern, with no mention of algorithmic penalty.
- Dave Gerhardt (Episode #275): Describes scheduling LinkedIn posts by adding them to calendar at specific times and keeping a 500+ post idea backlog, noting this avoids the engagement drop from LinkedIn's *native* scheduler—implying third-party or calendar-based scheduling is preferred.
- Kait Stephens (Episode #156): Uses LinkedIn's native scheduler to queue content with flexibility to jump the queue for timely ideas, treating scheduling as a standard part of the workflow.
- Ross Simmonds (Episode #121): Recommends batch-writing social content and scheduling with tools like Buffer and Typefully to reduce friction and maintain consistency.

**Position B: Manual posting is preferred**
Post content directly to LinkedIn rather than using third-party scheduling tools, as schedulers may result in reduced algorithmic reach. Manual posting also enables immediate comment engagement, which snowballs performance.

- Tommy Clark (Episode #171): Explicitly recommends posting manually rather than using third-party scheduling tools due to potential algorithmic throttling; notes manual posting allows immediate comment engagement. Acknowledges the difference is noticeable but not a dealbreaker.
- Dave Gerhardt (Episode #225): Recommends publishing live when you have a strong idea, noting real-time engagement signals activity to LinkedIn's algorithm and boosts performance. Acknowledges scheduling causes a 10–20% reach reduction.

**Context dependency:** Dave Gerhardt himself holds both positions across different episodes, suggesting his view evolved or that the answer depends on whether you're optimizing for peak performance on a single post versus sustainable volume. His Episode #275 advice specifically warns against LinkedIn's *native* scheduler while using calendar-based scheduling—suggesting the nuance may be about *which* tool rather than scheduling vs. manual.

**Trend note:** Dave Gerhardt's earlier episode (131, April 2024) recommends Taplio scheduling; his later episode (275, August 2025) warns against LinkedIn's native scheduler specifically. This suggests a possible shift toward more nuanced scheduling advice over time, but the direction is not clearly toward or away from scheduling overall.

---

### 3. Should you ship content fast and imperfect, or invest in quality and polish before publishing?
**Support summary: 5 vs 3 vs 2**

Three distinct positions exist here, with the middle position explicitly attempting to resolve the tension.

**Position A: Ship fast and iterate**
Don't wait for perfection before shipping. Release work quickly, gather real feedback signals, and iterate. Imperfect, scrappy content often resonates more than heavily produced formal content.

- Dave Gerhardt (Episode #314): Explicitly recommends shipping fast and iterating based on immediate feedback signals, arguing the cost of waiting for perfection is higher than shipping something good and improving it.
- Max Van Den Ingh (Episode #161): Advocates for imperfect, scrappy content over polished production, noting authenticity and directness often resonate more.
- Tim Davidson (Episode #127): States consistency and iteration matter more than perfection at the start; recommends posting without waiting for it to be perfect.
- Eliana Atia (Episode #166): Recommends launching content initiatives with imperfect first versions and iterating based on real audience feedback.
- Jason Lemkin (Episode #207): Applies a five-minute rule: if a piece of content takes more than five minutes to write, kill it—enforcing speed as a quality signal.

**Position B: Calibrate quality investment to the stakes of the asset**
Editing rigor should be calibrated to the stakes of the asset. High-stakes assets warrant multiple rounds of careful review. Lower-stakes assets can ship faster. This is a deliberate triage, not a blanket approach.

- Dave Gerhardt (Episode #314): Recommends adjusting editing rigor based on stakes—high-stakes landing pages get multiple rounds of feedback, daily LinkedIn posts ship faster. This nuances his own "ship fast" advice.
- Erin May (Episode #337): Warns against "AI slop"—low-quality, generic content that damages your brand. Advocates maintaining human judgment on final output quality.
- Will Hoekenga (Episode #181): Advocates for shitty first drafts as a starting point, but emphasizes that good copy emerges through iteration and refinement—not just shipping the first draft.

**Position C: Invest in quality and polish**
Content quality is a differentiator. Generic, low-quality content damages brand credibility. Invest in quality through multiple revision passes, subject matter expert involvement, and editorial standards.

- Arielle Gordis (Episode #166): Describes reviewing and refining newsletter drafts 7+ times before sending, treating quality as a driver of reader trust and open rates.
- Kevin White (Episode #286): Recommends cutting agencies that produce generic, perspective-less content and replacing with a single trusted content person who can develop a strong point of view—implying quality and differentiation matter more than volume or speed.

**Context dependency:** The stakes-based position (B) explicitly resolves the tension by asset type. However, the "ship fast" camp and "invest in quality" camp are making broader philosophical claims about content strategy that conflict regardless of asset type.

---

### 4. Should you batch-create and pre-schedule content in advance, or create and post reactively based on daily observations?
**Support summary: 7 vs 1**

**Position A: Batch and pre-schedule**
Batch-write multiple posts in a single session (weekly or monthly) and schedule them in advance. This removes daily decision-making friction, ensures consistent output even during busy periods, and allows you to maintain a content backlog.

- Dave Gerhardt (Episode #131): Describes a weekly batch-writing process: one hour per week to write 4–5 LinkedIn posts from a Notion backlog, then schedule 2–3 weeks in advance using Taplio.
- Jason Lemkin (Episodes #207 and #142): Recommends pre-scheduling content through an entire year to ensure consistent output, arguing this removes friction and guarantees presence even during busy periods.
- Sara Lattanzio (Episode #268): Schedules posts 1 week in advance, dedicating Saturday mornings to writing and design to ensure quality and consistency.
- Chris Cunningham (Episode #347): Advocates batch filming 12–15 videos per week on a structured weekly production cycle, staying 4–6 weeks ahead of publishing schedule.
- Ross Simmonds (Episode #121): Recommends writing multiple social posts in batches monthly and scheduling with Buffer and Typefully to reduce friction of daily posting.
- Jess Cook (Episode #321): Batch-records an entire podcast season in 2 days in-person to maintain consistent chemistry and energy.

**Position B: Reactive daily creation**
Rather than batching and scheduling content in advance, create content daily based on what you observe in the market—conversations, meetings, or emerging trends. This keeps content timely, authentic, and responsive to real signals.

- Jen Allen Knuth (Episode #170): Explicitly recommends against pre-scheduling; instead, wake up each day and identify one thing you observed recently that reveals a flawed belief, then create content around that observation in the moment for authenticity and timeliness.

**Context dependency:** Reactive creation may work better for individuals with high market exposure (salespeople, consultants) who naturally encounter fresh signals daily. Batching works better for teams managing multiple accounts or founders with limited daily bandwidth. However, both camps are making claims about what produces better content quality and consistency, not just operational efficiency.

---

### 5. Should you use iPhone/low-budget equipment or professional production gear for video content?
**Support summary: 4 vs 1**

**Position A: iPhone and low-budget equipment preferred**
Shoot the majority of social video content on iPhone rather than professional cameras. iPhone footage performs better because it looks raw and authentic—similar to user-generated content. The casual aesthetic is a feature, not a limitation. Start with minimal equipment and invest in production quality only after proving consistency.

- Chris Cunningham (Episode #347): Explicitly recommends shooting the majority of short-form social content on iPhone, stating iPhone footage performs better because it looks raw and authentic. Reserves professional cameras only for high-end music videos.
- Dave Gerhardt (Episode #320): Recommends starting a podcast with a basic USB microphone and simple editing tools, investing in production quality only after proving consistency and building an audience.
- Anthony Kennada (Episode #145): Recommends launching video content production with under $1,000 in equipment (DSLR camera on desk, Amazon lighting kit) rather than outsourcing to agencies.
- Max Van Den Ingh (Episode #161): Advocates for imperfect, scrappy content over polished production, noting authenticity and directness often resonate more.

**Position B: Invest in professional production infrastructure**
Build an in-house professional video production studio to enable rapid, high-quality content creation at scale. Professional production infrastructure allows 3–4 shoots per week, faster iteration, and the ability to execute monthly launches without bottlenecks.

- Maura Rivera (Episode #301): Recommends building an in-house video production studio (rather than outsourcing or using low-budget setups) to enable 3–4 shoots per week and rapid launch content creation without production bottlenecks.

**Context dependency:** Low-budget/iPhone advice is explicitly aimed at getting started and proving consistency, while the professional studio recommendation comes from a CMO at a company doing monthly product launches at scale. This may dissolve when accounting for company stage. However, Chris Cunningham's iPhone-is-better-for-authenticity claim applies even at scale (ClickUp is not a small company), creating genuine tension beyond just stage.

---

### 6. How frequently should you post content on LinkedIn—twice daily, once daily, or maximum three times per week?
**Support summary: 4 vs 1 vs 1**

**Position A: High frequency—twice daily**
Aim for posting LinkedIn content twice per day as the ideal frequency. Consistency and volume matter more than perfection; posting frequently with good-enough content outperforms posting rarely with perfect content.

- Tim Davidson (Episode #127): Targets twice-daily LinkedIn video posting as optimal frequency, arguing this maximizes reach and engagement.
- Brad Zomick (Episode #156): Describes a daily posting rhythm of one primary post plus often a second post (share or commentary), establishing twice-daily as a standard cadence.
- Dave Gerhardt (Episode #131): Describes posting twice daily (7 AM and 3 PM Eastern) as his personal cadence in his batch-writing workflow.
- Kait Stephens (Episode #156): Establishes a daily posting rhythm of one primary post plus often a second post (share or commentary), effectively posting twice daily.

**Position B: Once daily is optimal**
Post once per day on LinkedIn during peak engagement windows (morning). If posting multiple times daily, subsequent posts typically receive less reach. Daily consistency is the goal, not twice-daily volume.

- Dave Gerhardt (Episode #317): Recommends one post per day on LinkedIn, noting that if posting multiple times daily, subsequent posts receive less reach. Frames once-daily as the optimal cadence.

**Position C: Maximum three times per week**
Post a maximum of 3 times per week on LinkedIn to maintain quality and avoid audience fatigue. Quality and intentionality per post matter more than volume.

- Sara Lattanzio (Episode #268): Explicitly recommends posting 3 times per week maximum to maintain quality and avoid audience fatigue, and advises against outsourcing or scaling content creation.

**Context dependency:** Sara Lattanzio is specifically discussing personal brand carousel content (a high-effort format), while Tim Davidson is discussing video content, and Dave Gerhardt is discussing general LinkedIn posting. The twice-daily recommendation from ClickUp (Episode #347) is for a brand account with a full production team, not an individual. However, the core question of optimal frequency for LinkedIn presence is a genuine disagreement even within similar contexts.

---

## What NOT To Do

- **Don't generate 100 blog posts with AI without providing context.** This results in empty, commodity content that doesn't stand out and can be replicated by any competitor using the same tools. (Source: Domi de Saint-Exupéry, Episode #332)
- **Don't copy AI output directly without editing.** The mistake many marketers make is copying AI output without applying their own judgment, brand voice, and strategic thinking. (Source: Holly Xiao, Episode #270)
- **Don't blindly accept all AI-generated content changes.** When using AI to refresh or improve content, always require a human editor to review, accept, reject, or modify each suggestion before publishing. (Source: Eoin, Episode #290)
- **Don't outsource final creative judgment to AI.** Use AI to accelerate research and generate options, then apply your expertise and taste to evaluate and refine the output. (Source: Erin May, Episode #337)
- **Don't ask executives to write content from scratch.** Instead, identify activities they already do comfortably (speaking, demos, podcasts) and record/repurpose that content. (Source: Chris Walker, Episode #139)
- **Don't create content or campaigns in isolation and then hand them to sales.** Involve sales in brainstorming and building outlines from the start to ensure adoption. (Source: Adam Goyette, Episode #164)
- **Don't delay launching a podcast or video series waiting for perfect equipment.** Start with minimal gear, prove consistency, then invest in production quality. (Source: Dave Gerhardt, Episode #320)
- **Don't create excessive numbers of landing pages (e.g., 200 pages).** This creates unnecessary management burden and becomes an activity-driven exercise rather than a strategy-driven one. Focus on a core set of foundational pages (6–10) that are continuously optimized. (Source: Tas Bober, Episode #154)
- **Don't pass content through multiple approval layers before it reaches creators.** When content passes through multiple managers and reviewers, the original message and authenticity degrade—similar to the telephone game. (Source: Max Van Den Ingh, Episode #161)
- **Don't rely on engagement or virality metrics early in a content initiative.** With a small audience, these are unpredictable and discouraging. Focus on output metrics you control. (Source: Ross Simmonds, Episode #209)
- **Don't use LinkedIn's native scheduler if you're concerned about reach.** Multiple guests note that LinkedIn's native scheduler may reduce post performance; use third-party tools or calendar-based scheduling instead—though this is contested (see Where Experts Disagree). (Source: Dave Gerhardt, Episode #275)
- **Don't script podcast conversations.** Prepare detailed outlines but let the conversation flow naturally—the best moments come from genuine conversation, not rigid adherence to a question list. (Source: Dave Gerhardt, Episode #320; Jess Cook, Episode #321)
- **Don't keep story highlights on Instagram older than 52 weeks.** Content older than one year signals an inactive brand. Remove old stories from highlights to prevent users from scrolling through outdated content. (Source: Jenn Herman, Episode #168)
- **Don't use a content agency that produces generic, SEO-focused content without a point of view.** Generic, perspective-less content doesn't differentiate your brand or resonate with sophisticated audiences. (Source: Kevin White, Episode #286; Episode #179)
- **Don't wait for a perfect first version before launching a content initiative.** The best feedback comes from real-world audience response, not internal review. (Source: Eliana Atia, Episode #166)
- **Don't use AI for talking-head footage of real people on camera.** AI video tools work best for narrative-driven content with B-roll and animation; avoid using them to generate realistic human presenters. (Source: Luke, Episode #345)

---

## Sources

| Episode | Guest | Date |
|---------|-------|------|
| #347 | Chris Cunningham | 2026-04-16 |
| #346 | Drew Pinta | 2026-04-13 |
| #345 | Dave Gerhardt, Luke, Vicente, Liz | 2026-04-09 |
| #337 | Erin May | 2026-03-12 |
| #336 | Adina Timar, Connor Beaulieu, Eoin Clancy | 2026-03-09 |
| #332 | Domi de Saint-Exupéry | 2026-02-23 |
| #330 | Ryan Narod | 2026-02-17 |
| #326 | Eoin Clancy | 2026-02-04 |
| #321 | Jess Cook | 2026-01-15 |
| #320 | Dave Gerhardt | 2026-01-12 |
| #319 | Jess Lytle | 2026-01-08 |
| #317 | Emeric Ernoult, Dave Gerhardt | 2026-01-01 |
| #315 | Jean Cameron | 2025-12-25 |
| #314 | Dave Gerhardt | 2025-12-22 |
| #312 | Joe | 2025-12-15 |
| #301 | Maura Rivera | 2025-11-06 |
| #290 | Eoin, Dan | 2025-10-13 |
| #289 | Sydney Sloan | 2025-10-09 |
| #288 | Sara Ajemian, Jennifer Delevante-Moulen | 2025-10-06 |
| #286 | Kevin White | 2025-09-29 |
| #279 | Dave Gerhardt | 2025-09-04 |
| #278 | Jillian Hoefer | 2025-09-01 |
| #275 | Dave Gerhardt | 2025-08-21 |
| #271 | Justin Johnson | 2025-08-07 |
| #270 | Holly Xiao | 2025-08-04 |
| #268 | Sara Lattanzio | 2025-07-28 |
| #267 | Jennifer Cannizzaro | 2025-07-24 |
| #266 | Jess Cook | 2025-07-21 |
| #262 | Chelsea Castle | 2025-07-07 |
| #261 | Mark Schaefer | 2025-07-03 |
| #254 | Kira Federer | 2025-06-12 |
| #242 | Brendan Hufford | 2025-05-01 |
| #239 | Pranav Piyush | 2025-04-21 |
| #238 | Dmitry Shamis | 2025-04-17 |
| #225 | Dave Gerhardt | 2025-03-06 |
| #224 | Ross Simmonds, Rita Cidre | 2025-03-03 |
| #210 | Hannak Rankin, Jessica Skovira, Dave Gerhardt | 2025-01-13 |
| #209 | Ross Simmonds, Dave Gerhardt | 2025-01-09 |
| #207 | Jason Lemkin | 2025-01-02 |
| #206 | Kyle Coleman | 2024-12-30 |
| #200 | Ross Simmonds, Dave Gerhardt | 2024-12-09 |
| #199 | Sylvia Lepoidevin | 2024-12-05 |
| #196 | Devin Reed | 2024-11-25 |
| #195 | Andrew Davies | 2024-11-21 |
| #192 | Lashay Lewis | 2024-11-11 |
| #184 | Kira Federer | 2024-10-14 |
| #183 | Madhav Bhandari, Dave Gerhardt | 2024-10-10 |
| #181 | Will Hoekenga | 2024-10-03 |
| #180 | Bruno Estrella | 2024-09-30 |
| #179 | Kevin White | 2024-09-26 |
| #174 | Jared Fuller | 2024-09-09 |
| #172 | Chelsea Castle | 2024-09-02 |
| #171 | Tommy Clark | 2024-08-29 |
| #170 | Jen Allen Knuth | 2024-08-26 |
| #169 | Dave Gerhardt | 2024-08-22 |
| #168 | Jenn Herman | 2024-08-19 |
| #166 | Eliana Atia, Arielle Gordis | 2024-08-12 |
| #165 | Emir Atli | 2024-08-12 |
| #164 | Adam Goyette, Dave Gerhardt | 2024-08-05 |
| #163 | Natalie Taylor | 2024-08-01 |
| #161 | Max Van Den Ingh | 2024-07-25 |
| #157 | Adam Robinson | 2024-07-11 |
| #156 | Brad Zomick, Kait Stephens, Dave Gerhardt | 2024-07-08 |
| #155 | Matt Carnevale, Dave Gerhardt | 2024-07-04 |
| #154 | Tas Bober | 2024-07-01 |
| #147 | Dave Gerhardt | 2024-06-06 |
| #145 | Anthony Kennada | 2024-05-30 |
| #142 | Jason Lemkin | 2024-05-20 |
| #139 | Chris Walker, Chris Guest | 2024-05-09 |
| #136 | Jessica Hreha | 2024-04-29 |
| #131 | Dave Gerhardt | 2024-04-11 |
| #127 | Tim Davidson | 2024-03-25 |
| #124 | Kera Wright | 2024-03-14 |
| #123 | Dave Gerhardt | 2024-03-11 |
| #121 | Ross Simmonds | 2024-02-29 |