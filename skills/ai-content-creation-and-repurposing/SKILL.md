---
name: ai-content-creation-and-repurposing
description: "Guidance for using AI tools to create, repurpose, and distribute B2B marketing content—covering workflows, quality guardrails, tool-specific tactics, and where expert opinion diverges on AI's proper role in content creation."
version: "2026-04-20"
episode_count: 52
---

# AI Content Creation and Repurposing

## Overview
This skill covers how B2B marketers can effectively use AI tools to create, repurpose, and distribute content—including workflows for video production, written content, localization, research synthesis, and brand voice maintenance. All practices are sourced exclusively from Exit Five podcast guests and host Dave Gerhardt across 52 episodes. Where guests disagree, those disagreements are surfaced explicitly rather than resolved.

---

## Foundational Principles: What AI Is (and Isn't) Good For

Before deploying AI in any content workflow, establish a clear mental model of where AI adds value and where it degrades output quality.

**Use AI for:**
- Research synthesis, data aggregation, and theme extraction from large datasets (Source: Emma Stratton, Episode #234; Diane Wiredu, Episode #226)
- Repurposing, reformatting, and distributing existing content across channels (Source: Domi de Saint-Exupéry, Episode #332)
- Generating first drafts and 80% starting points that humans then refine (Source: Dave Gerhardt, Episode #164)
- Editing, grammar correction, and structural polish (Source: Sara Lattanzio, Episode #268)
- Identifying weaknesses in existing copy—clichés, abstract language, gaps (Source: Harry Dry, Episode #303; Jessica Hreha, Episode #136)
- Brainstorming and ideation to accelerate the zero-to-one phase (Source: Dave Gerhardt, Episode #307; Pranav Piyush, Episode #285)
- Discrete tactical tasks: translation, transcription, headline variations, design briefs (Source: Dave Gerhardt, Episode #209)

**Do not use AI for:**
- Strategic messaging decisions—what you stand for, what to focus on, what to leave out (Source: Emma Stratton, Episode #295)
- Core positioning and differentiation strategy (Source: Diane Wiredu, Episode #226)
- Generating ideas with conviction or making bold creative choices (Source: Harry Dry, Episode #303)
- Publishing wholesale AI-generated content without human review and refinement (Source: Dave Gerhardt, Episode #275)

> ⚠️ **Note: Whether AI should generate original content from scratch is actively contested among guests. See "Where Experts Disagree" before deciding your approach.**

---

## Building the Foundation: Strategy Documents and Briefs

The quality of AI output is directly proportional to the quality of inputs you provide. Invest in these assets before prompting.

**Create foundational strategy documents before generating any creative output.** These include: a company manifesto or narrative (who your audience is, what their problem is, how you uniquely solve it, your specific POV), category entry points, jobs-to-be-done, positioning document, brand personality and tone guidelines, and behavioral psychology principles relevant to your market. Without this foundational work, AI outputs will be generic and undifferentiated. (Source: Pranav Piyush, Episode #285)

**Invest significant upfront time—1 to 2 hours minimum—organizing and refining these strategy documents before prompting.** Think of it as prompt engineering for your entire marketing strategy: the better your inputs, the better your outputs. This is a prerequisite, not a shortcut. (Source: Dave Gerhardt, Episode #285)

**When using AI for content generation, always provide:** (1) core company messaging and positioning, (2) target audience definitions, (3) examples of high-quality past work in the same format, and (4) tone and style guidelines. Update these inputs as company messaging evolves. (Source: Jennifer Cannizzaro, Episode #267)

**Develop a one-page tone of voice guide** that captures your brand's personality and linguistic patterns. Feed this alongside product context documentation and brand style guides into every AI content workflow. Continuously refine these assets over time as your product and market conditions evolve. (Source: Eoin Clancy, Episode #326)

**Spend 30 minutes upfront creating a detailed brief** before using AI for any content piece. Gather source materials (transcripts, articles, notes) first, then use AI to help research, organize, and piece together materials, followed by significant editing time. (Source: Dave Gerhardt, Episode #345)

**Don't ask AI generic questions.** Instead of "Give me webinar ideas for B2B marketers," provide detailed context: your audience, past performance data, what your audience gravitates toward, and what you want to achieve. The more specific and detailed your brief, the better the output. (Source: Dave Gerhardt, Episode #155)

---

## Written Content Workflows

### Research and Drafting

**Use AI as a research and editing assistant, not a content generator.** The workflow: gather source materials → create a detailed brief → use AI to research, organize, and piece together materials → spend significant time editing and refining. This works best when you are the subject matter expert. (Source: Dave Gerhardt, Episode #345)

**Use NotebookLM for source-grounded research** by uploading up to 300 sources per notebook (documents, PDFs, audio recordings, video transcripts). Use the chat feature to query only against your uploaded sources to reduce hallucinations. Practical applications include: onboarding (upload company docs and chat as if interviewing team members), product launches (load product decks, technical docs, competitive analysis), and content iteration. (Source: Jess Lytle, Episode #319)

**Build a Custom GPT trained on proprietary research reports** to automatically surface relevant statistics, quotes, and data for insertion into blog posts, sales decks, and thought leadership content. Upload the full report to the GPT's knowledge base, disable web search to prevent hallucination, and use it as an expert advisor to recommend 3 different ways to integrate specific stats into existing content while matching tone and voice. This extends the lifecycle of a single research report across 6–9+ months of content production. (Source: Jillian Hoefer, Episode #278)

**Generate and edit outlines before writing full content.** Use AI to generate an outline based on your brief, target audience, and key messages. Review and edit the outline to ensure strategic alignment before the tool writes the full piece. This prevents wasted drafting time and ensures content stays on-message. (Source: Jessica Hreha, Episode #136)

**Build content through AI-assembled granular pieces rather than full-page generation.** Break content creation into small, discrete sections: extract tiny pieces of intelligence (from sales calls, product data, competitor analysis, internal knowledge bases), map each piece to specific sections of a content brief using structured JSON output, write one section at a time with focused context, then re-edit the full assembled output. (Source: Adina Timar, Episode #336)

**Map research intelligence to content structure using JSON formatting.** After gathering research from multiple sources, use structured JSON output to map each piece of intelligence to specific content sections (headings, subsections). This ensures granular placement of information where it's most relevant and helps LLMs understand the content structure. (Source: Adina Timar, Episode #336)

**Validate extracted data from primary sources before publishing.** When extracting information from sales calls, internal documentation, or other primary sources, implement a validation step to ensure accuracy. This is a quality check on extracted facts and claims, not a full rewrite. (Source: Adina Timar, Episode #336)

**Use AI to generate 80% drafts that you refine rather than starting from scratch.** Provide the AI with context (company details, audience, goals) via custom instructions or detailed prompts to improve output quality. (Source: Dave Gerhardt, Episode #164) *(Note: whether this approach produces quality output without strong copywriting skills is contested — see Where Experts Disagree)*

### Editing and Quality Control

**Prioritize editing over initial writing.** Generate multiple variations (e.g., 5–10 subject line options), then piece together the best elements from each. Use ChatGPT to generate variations, then cherry-pick words and phrases from different options to build your own final version. Editing is where the real work happens. (Source: Dave Gerhardt, Episode #314)

**Use AI to identify clichés and abstract language in your copy.** Feed your homepage copy or draft into an AI tool and ask it to flag clichés, abstract verbs, and abstract nouns. Use the output to identify weak spots. Do not rely on AI to write the replacement copy—that requires human conviction and deep category knowledge. (Source: Harry Dry, Episode #303)

**Use AI to analyze and identify gaps in existing content.** Upload completed content (decks, documents, articles) into an AI tool and ask it to identify what's missing or what could be strengthened. For example: "If you're a CMO, what is missing from this deck?" This helps content creators move beyond their own blind spots. (Source: Jessica Hreha, Episode #136)

**Use AI as a third-party brainstorm partner to identify gaps in team work.** When your team has completed a draft, feed the copy into ChatGPT along with context about the competitive landscape and ask what gaps or stronger angles the team might have missed. This provides objective feedback without the manager having to do the analysis themselves. (Source: Sara Ajemian, Episode #288)

**Use AI to eliminate obvious ideas during ideation.** Ask AI to generate the top 10 ideas for a project, then remove all of those ideas from consideration. Since AI generates averages of existing best practices, its suggestions represent the most obvious, consensus-driven ideas that competitors are likely already executing. By eliminating these, teams force themselves to generate truly original ideas. (Source: Udi Ledergor, Episode #237)

**Identify AI-generated content that lacks quality by checking for three signals:** (1) content that is not unique and doesn't push the conversation forward—it simply scrapes and repurposes top Google results; (2) content that doesn't match your brand's tone of voice and personality; (3) telltale linguistic patterns like overuse of words such as "utilize" instead of "use" or formal phrases not found in everyday vocabulary. (Source: Eoin Clancy, Episode #326)

**Use AI to maintain brand voice at scale across the organization.** Establish your brand voice in an AI tool and allow individual contributors across functions (event marketing, product marketing, demand gen) to generate on-brand content independently. The brand team blesses the voice parameters upfront, then the tool enforces consistency at scale. (Source: Dave Gerhardt, Episode #136)

### Email Content

**Use Claude Projects to build and reuse email messaging briefs.** Create a detailed email messaging brief in Claude Projects that includes audience, unique mechanism, differentiators, and value props. Store this brief as a reusable project, then feed it context about specific campaigns, audiences, or clients. Have Claude fill out the brief for you to structure strong email promo campaigns. (Source: Joe, Episode #312)

**When using AI to generate email content, treat your training data as critical input.** Feed the AI strong human-written examples with clear voice, compelling stories, case studies, and data. For newsletters or multi-section emails, create separate AI workflows for each section rather than generating the entire email at once. Always include a human editor in the loop to review for tone, strategy, accuracy, and to add final human touches (GIFs, references, spontaneous elements) that make the email feel natural. (Source: Joe, Episode #312)

**Include sufficient live text in emails to ensure AI summaries are accurate and relevant.** With AI email summaries becoming standard in inbox clients, image-only emails or emails relying solely on alt text will produce poor or irrelevant summaries, potentially hurting open rates. Live text is now a technical requirement for email effectiveness. (Source: Jaina Mistry, Episode #241)

### Copywriting and Prompting Skill

**Build a swipe file of inspiration to train your prompting ability.** Treat prompting like copywriting: maintain a swipe file of examples, frameworks, and approaches you encounter. When you see something interesting—a design, a framework, a way of framing something—capture it and think about how you could turn it into a prompt. (Source: Kieran Flanagan, Episode #257)

**Use ChatGPT to analyze writing style and provide editing feedback on copy.** Feed high-quality copy examples into ChatGPT and ask it to describe the writing style, tone, and techniques used. Then attempt to write in that same style. Additionally, use ChatGPT to review your own writing and ask it to identify weaknesses, poke holes in arguments, or suggest improvements. (Source: Dave Gerhardt, Episode #129)

> ⚠️ **Note: Whether strong copywriting skills are required to get good AI output is actively contested. See "Where Experts Disagree."**

---

## Content Repurposing and Distribution

**Use AI to create derivatives from original content, not to generate all content from scratch.** Invest in high-quality original work (e.g., a 30-page ebook written by a human writer) and then use AI to generate 45+ derivative pieces from it across channels (social, email, webinars, etc.). The AI accelerates distribution and repurposing, not creation. (Source: Kelly Hopping, Episode #255)

**Create a content waterfall from podcast episodes using AI extraction.** Use AI tools to extract key insights, frameworks, and stories from podcast transcripts. Convert a single episode into multiple content formats: written articles, social media clips, newsletter content, and blog posts. This creates multiple distribution channels and touchpoints from one core piece of content. (Source: Chelsea Castle, Episode #172)

**Repurpose long-form content into multiple short-form formats using AI tools** (like Tofu). Create long-form content once, then use AI to automatically repurpose it into LinkedIn posts, carousel slides, social snippets, and more. Maintain editorial control over the final outputs. (Source: Sara Lattanzio, Episode #268)

**Use AI to repurpose single content pieces into multiple formats and channels.** Take a primary content asset (e.g., a podcast transcript) and use AI to generate multiple derivative pieces: email summaries, blog post outlines, newsletter ideas, social media clips, key takeaways. (Source: Dave Gerhardt, Episode #136)

**Set up a ChatGPT Project by uploading foundational strategy documents** (manifesto, category entry points, jobs-to-be-done, top blog posts, positioning document, brand personality guidelines, behavioral psychology principles). Write custom instructions that tell the AI to generate new campaign ideas by connecting dots across these files. Feed in new inputs (sales call transcripts, LinkedIn posts, podcast transcripts, presentation decks) and prompt the AI to generate campaign hooks, ad ideas, email series outlines, and content repurposing ideas. (Source: Pranav Piyush, Episode #285)

**Repurpose executive content (podcasts, presentations, blog posts) into new campaign formats.** Feed existing executive content into your ChatGPT Project and prompt it to generate new campaign assets in different formats. Upload a podcast transcript and ask the AI to create a white paper outline, LinkedIn carousel ideas, email series, or ad hooks based on the content. Repeat this process whenever new content is created to maintain a steady stream of repurposed campaign ideas. (Source: Pranav Piyush, Episode #285)

**Use AI to convert founder conversations into scalable content assets.** Record regular conversations with your CEO or founders, transcribe them, and use AI to generate multiple content pieces (social posts, blog summaries, newsletter content) from those transcripts. This allows you to scale founder-led content without requiring the founder to write or create content themselves. (Source: Jess Cook, Episode #266)

**Record fireside chats, customer interviews, or partner conversations and use AI transcription tools** to automatically generate transcripts. Convert these transcripts into blog posts or unique content pieces. This allows your content team to produce more content in less time while maintaining authenticity. (Source: Michael Cole, Episode #212)

**Use AI-powered video content labs (e.g., Goldcast's Content Lab) to automatically extract and repurpose webinar clips.** Use these extracted moments as part of your content strategy, reducing the need for manual video editing and enabling faster content distribution across channels. (Source: Kris Rudeegraap, Episode #159)

**Repurpose battle cards and assets into alternative formats using AI tools like NotebookLM.** Convert battle cards or detailed assets into alternative formats (e.g., a 20-minute podcast, audio summary, or interactive guide). This allows sales teams to consume the same information in a more engaging format, increasing adoption without starting from scratch. (Source: Talya Heller, Episode #246)

---

## Content Ideation and Research

**Use AI as a brainstorming and ideation partner to accelerate project starts.** Start every project by using AI as a brainstorming partner to help generate initial ideas, frameworks, and directions. Treat AI as a tool to enhance your thinking, not as a replacement for human judgment and creativity. (Source: Dave Gerhardt, Episode #307)

**Treat AI-generated campaign ideas as starting points at 50–70% quality, then apply human judgment and creativity.** Expect 50–70% of outputs to be useful; the remaining 30–50% will need significant refinement or rejection. Always apply human judgment, creative energy, and brand taste to AI suggestions before shipping. Assign a real marketer to review, refine, and iterate on AI outputs before execution. (Source: Pranav Piyush, Episode #285)

**Use AI as a third-party brainstorm partner to identify gaps in team work.** When your team is stuck on a problem or has completed a draft, pull up ChatGPT and ask it to review the work and identify what's missing or what could be stronger. (Source: Sara Ajemian, Episode #288)

**Use AI as an ideation partner to inspire and refine your own thinking.** Share your initial thinking with the tool, ask it to fill in gaps and offer ideas you haven't considered, then use those outputs as inspiration to refine your own work. The AI output often won't be usable as-is, but specific words, phrases, or concepts can spark better ideas that you then develop yourself. (Source: Jessica Hreha, Episode #136)

**Use AI to reverse-engineer patterns in your best-performing content.** Collect your top-performing content pieces (e.g., most popular posts from the last 3 months) and feed them into ChatGPT with a prompt asking it to identify the common elements that make them successful. Use the AI's analysis to create a framework or checklist for future content creation. (Source: Matt Carnevale, Episode #155)

**Use AI to analyze trends, validate ideas, and strengthen your writing with research.** When you have a core idea or analogy that resonates with your audience, use ChatGPT to find supporting research, frameworks, or studies that back it up. Weave those findings into your piece to add credibility. (Source: Dave Gerhardt, Episode #155)

**Organize scattered content ideas using ChatGPT and spreadsheets.** Export all notes from your phone or note-taking app into a text file, then use ChatGPT to categorize and analyze them by content type, strength, and tone. Import the categorized results into a spreadsheet with filters organized by content type. (Source: Chelsea Castle, Episodes #262 and #172)

**Use AI to identify content gaps for AI search** by pulling sales transcripts from the last 90 days, analyzing them to extract explicit and implicit questions customers are asking, cross-referencing against AI search gaps (questions where your company should appear but doesn't), and overlaying quantitative data to prioritize which gaps to address first. Feed the system rich context (brand case, ICP, sales metadata) so it understands nuance beyond raw transcript text. (Source: Eoin, Episode #290)

**Automate content refresh by auditing pages for AI search readiness.** Build a workflow that takes a URL and runs two parallel audits: (1) structural audit—heading hierarchy, internal/external links, metadata, freshness signals; (2) brand alignment audit—whether product mentions, ICP references, and positioning match current company state. Output a visual diff showing what changed and why, with human-in-the-loop editing. Key insight: pages refreshed in the last 90 days are 3x more likely to be cited by AI search tools than pages 6+ months old. (Source: Eoin, Episode #290)

**Use AI to generate content improvement suggestions but require human review and editing before publishing.** Output suggestions in a visual diff format (strikethrough for deletions, highlighted text for additions) with reasoning for each change. Require a human editor to review, accept, reject, or modify each suggestion before publishing. Do not blindly accept all AI-generated changes or copy-paste AI output directly to your site. (Source: Eoin, Episode #290)

**Use AI to synthesize customer research data, not to develop messaging strategy.** AI is useful for pulling high-level themes from large amounts of customer data (like 50+ customer call recordings or interview transcripts). However, still listen to or read the raw customer interviews yourself to absorb the emotional context and nuance. (Source: Emma Stratton, Episode #234)

---

## AI Video Production

### Workflow and Production

**Produce full brand videos with one person in one day using AI tools.** Combine: voice cloning or licensed voices for voiceover, image generation models (Nano Banana) for B-roll, AI video tools to animate stills, and music/sound effects generation. This approach works best for narrative-driven content; avoid using AI for talking-head footage of real people on camera. (Source: Luke, Episode #345)

**Use an AI-powered video production workflow to go from script to final cut in two weeks.** Start with Claude to develop and iterate the script, generate storyboards using image models (Nano Banana), create individual scene clips with AI video tools, then move into traditional post-production (editing, color, sound). Use image references as anchors for video generation to ensure consistency across clips. (Source: Vicente, Episode #345)

**Generate custom B-roll for specific event venues using AI image and video tools.** Instead of being constrained by available stock footage, use AI image generation to create specific B-roll shots that match your event venue and branding. Generate images of your specific theater or venue with your branding, then use those as references for AI video generation. (Source: Carter, Episode #345)

**Use AI to compress video production cycles from weeks to days.** Leverage AI video generation and editing tools to dramatically reduce the time between creative concept and finished video. This enables faster feedback loops and more frequent testing of video concepts. (Source: Dave Gerhardt, Episode #279)

**Use AI video generation to test multiple video variations before committing to expensive production.** Generate multiple video variations using AI tools to test different hooks, angles, and messaging at low cost. Once you've validated a concept through AI-generated variations, you can then invest in more polished production if needed. (Source: Dave Gerhardt, Episode #279)

**Write scripts and messaging first, then generate video from written content.** Start with written content (scripts, blog posts, articles) before producing video. This allows you to test messaging cheaply and iterate on the story before investing in video production. (Source: Dave Gerhardt, Episode #279)

**Use AI tools to generate multiple script and messaging variations for testing.** Use AI tools like ChatGPT and Perplexity to brainstorm and generate different angles, hooks, and messaging variations for your video scripts. Test these variations to see which angles resonate most with your audience before committing to production. (Source: Holly Xiao, Episode #279)

**Convert PDFs and training materials into AI video using avatars for faster sales enablement and L&D.** Upload PDFs or training materials directly to HeyGen and automatically generate video training content with your avatar. This eliminates the need to write scripts or record videos manually, making it faster to scale training across sales teams and L&D departments. (Source: Holly Xiao, Episode #270)

**Create animated brand characters using Meshy and VEO 3.** Convert a 2D brand mascot into a 3D animated asset: upload the original character image to Meshy, generate 3D renderings, take screenshots from multiple angles, then upload those screenshots to VEO 3 with prompts to animate the character. Remove backgrounds and integrate the resulting video clips into marketing assets, landing pages, and ads. (Source: Jake Heap, Episode #278)

**Evaluate AI video generation cost against traditional production.** When assessing the cost of AI video generation (typically $3 per generation for tools like Runway), compare it to the cost of traditional production (renting equipment, hiring crew, location fees). AI generation at $3 per iteration is significantly cheaper than even a single day of traditional video production. (Source: Luke, Episode #345)

**Survey your audience to validate acceptance of AI-generated video content.** HeyGen's survey of 2,500+ consumers found that over 90% don't have a problem with brands using AI-generated videos, and quality is the primary concern rather than the fact that it's AI-generated. Use this data to inform your AI video strategy and address stakeholder concerns. (Source: Holly Xiao, Episode #279)

### Voice, Localization, and Rights

**Use a licensed voice marketplace for brand video voiceovers with proper rights management.** Instead of hiring voice actors or using unlicensed voices, use a voice marketplace where real voice actors have uploaded their voices and receive ongoing payouts as their voice is used. For celebrity or famous voices, implement a request-based approval system where brands must request specific use cases. This ensures legal compliance, supports voice actors financially, and gives brands access to high-quality, recognizable voices. (Source: Luke, Episode #345)

**Clone executive voice for multilingual ad campaigns.** Use voice cloning technology to record a CEO or executive speaking in their native language, then clone that voice to create ads in other languages. This maintains brand consistency and executive presence across markets without requiring the executive to record in multiple languages. (Source: Luke, Episode #345)

**Test voice cloning vs. dubbing for video localization based on language pair.** Voice cloning works better for romance-to-romance language pairs (e.g., Spanish to French) but sounds unnatural when cloning across distant language families (e.g., American English to Asian languages). In those cases, use pre-recorded native voices for dubbing instead. Document which approach works best for each language combination to build a localization playbook. (Source: Carter, Episode #345)

**Use AI tools (Phrase + Claude) to scale global localization and reduce manual QA burden.** Shift the localization team's role from manual QA and language expertise to strategic market selection and quality oversight. Use AI to handle the bulk of localization work, then apply human QA only to critical markets where brand consistency is essential. For lower-priority markets, accept 94% accuracy to move faster. (Source: Tara Robertson, Episode #288)

### YouTube and SEO

**Generate YouTube SEO tags and descriptions using AI and validation tools.** Use Descript to upload finished YouTube videos and generate SEO-optimized tags and descriptions via custom prompts. Then validate and refine these suggestions using the VidIQ plugin on your YouTube channel before publishing. This workflow allows one person to manage YouTube optimization end-to-end. (Source: Carter, Episode #345)

---

## AI Video Team Building

**Create a new role called "AI Creative Producer" to manage video production using AI tools.** When hiring, evaluate candidates on two criteria: portfolio (showing their creative taste and past work) and a take-home challenge where they produce a full video in 30 minutes using AI tools. This hiring approach filters for people who understand both creative direction and AI tool fluency. (Source: Luke, Episode #345)

**When building AI video teams, prioritize generalist creatives who understand direction, cinematography, and copy over specialists in single disciplines.** The ideal candidate understands the full creative workflow and can move from idea to execution without needing to hand off to multiple specialists. (Source: Vicente, Episode #345)

**Before building an internal AI creative team, hire a contractor or work with an agency to test and validate AI creative workflows.** This allows you to understand what's possible, identify which tools work best for your use cases, and build internal expertise before committing to a full-time hire. Use this testing phase to document processes and build confidence in the approach. (Source: Luke, Episode #345)

**Use AI to accelerate creative ideation and reduce pitch/mockup time.** Instead of spending weeks creating mockups and pitch decks to sell creative ideas internally, use AI tools to generate rough versions of your concept on day one. This shifts the creative process from "sell the idea first, then execute" to "start creating immediately and iterate." (Source: Vicente, Episode #345)

---

## AI Design and Visual Content

**Use AI tools like Midjourney to generate visuals for content without hiring photographers.** Generate images, refine them with specific requests (e.g., "add melanin," "make it look like Mad Men"), and then use them in Canva templates or social media posts. This dramatically speeds up content production and reduces costs, especially for social media graphics and carousel posts. (Source: Ross Simmonds, Episode #200)

**Test AI design skills internally before organization-wide rollout.** Before deploying an AI design skill to your entire organization, conduct thorough internal testing with your marketing and design teams. Document edge cases and issues that arise (e.g., distorted charts, layout problems), then iterate on the skill instructions to address them. Once you've refined the skill and set clear expectations that perfection isn't required, roll it out organization-wide. (Source: Liz, Episode #345)

**Set realistic expectations for AI design output quality and iteration.** Recognize that AI design tools will not produce perfect output on the first try. Instead of viewing edge cases (distorted charts, layout issues) as failures, treat them as part of an iterative process. The efficiency gains from self-service design typically far outweigh the occasional need for manual fixes. Set organizational expectations that AI-generated designs are starting points, not final products. (Source: Liz, Episode #345)

**Use AI to translate visual design preferences into language.** If you have strong creative opinions but don't speak the language of design (padding, vectors, typography, etc.), collect examples of designs or aesthetics you like, put them in ChatGPT, and ask it to describe the similarities and what makes them work. This helps you develop a shared vocabulary with designers. (Source: Dave Gerhardt, Episode #257)

**Use AI to articulate design patterns and improve feedback quality.** Gather examples of designs you like, then ask ChatGPT to analyze and describe the common styles, elements, and patterns across them. Use ChatGPT's articulation to give clearer, more specific feedback to designers. (Source: Dave Gerhardt, Episodes #155 and #153)

---

## LinkedIn and Personal Brand Content

**Use voice dictation to generate post drafts, then structure with AI.** Record voice notes or use auto-dictate to capture raw ideas and thoughts without worrying about structure or grammar. Feed the transcribed blurb into an AI tool with specific instructions for the post structure. Follow up by manually fine-tuning, removing artifacts like em dashes, and ensuring the final post matches your brand voice. (Source: Sara Lattanzio, Episode #268)

**Use AI for editing, grammar, and structure—not for generating core ideas.** AI works best as an editor and formatter when you provide it with a clear idea, outline, or voice note. This preserves authenticity and ensures your unique perspective drives the content. (Source: Sara Lattanzio, Episode #268)

**Feed AI tools your own past posts and voice memos to build a personalized writing style guide.** Use AI to help flesh out ideas, add research, and refine hooks—but always write the core content yourself. Export your top posts into Claude to identify patterns in what works. Never publish AI-generated content wholesale; inject personal details, opinions, and authentic voice that AI cannot replicate. (Source: Dave Gerhardt, Episode #275)

**If an executive cannot write their own LinkedIn content, conduct interviews with them** (similar to a podcast format) to capture their voice, stories, and perspectives. Use the interview transcript as the basis for drafting posts, then have the executive edit and approve. Optionally, train an AI model on the executive's past writing (emails, Slack messages) to generate drafts that sound more like them before presenting to the executive for editing. (Source: Finn Thormeier, Episode #317)

> ⚠️ **Note: Whether LinkedIn content should be deliberately unpolished or polished and well-structured is actively contested. See "Where Experts Disagree."**

---

## Miscellaneous High-Value AI Workflows

**Use AI to generate personalized growth guides and advice based on customer and prospect data.** When you have access to large datasets about your customers and prospects (e.g., through a free product or metrics tool), use AI to generate personalized growth guides and advice. This creates helpful content that serves customer needs beyond your product value proposition. (Source: Andrew Davies, Episode #195)

**Auto-generate branded video content from creator profiles to reduce friction in content creation.** Build a tool that allows creators to submit their profile and record a short text snippet with their voice, then automatically generates a screen recording of your product features overlaid with the creator's face and voice. This dramatically reduces the production friction for creators to generate high-quality, branded content. (Source: Bruno Estrella, Episode #180)

**Use AI to generate a candid "How to Work with Me" document.** Ask ChatGPT or Claude to generate a "How to Work with Me" document by providing context about your working style, then specifically ask it to include the hard truths—the things people might not enjoy working with you. Share the real version of yourself, not the best version, so people know what they're getting. (Source: Kieran Flanagan, Episodes #318 and #257)

**Use Optio to automate Google Ads and Bing Ads optimization recommendations.** Connect your Google Ads and Bing Ads accounts to Optio, which analyzes your account data and makes optimization recommendations: identifies underperforming keywords to add to negative keyword lists, flags underbidding opportunities, and suggests headline variations. (Source: Adam Goyette, Episode #164)

**Recognize that upper-funnel content is most vulnerable to AI search disruption.** Generative AI in search results is primarily cannibalizing upper-funnel, informational search traffic (how-tos, research, educational content). Lower-funnel, intent-driven searches remain less disrupted. Adjust content strategy accordingly: focus upper-funnel efforts on building brand trust and direct relationships rather than relying on organic search traffic alone. (Source: John Short, Episode #148)

---

## Where Experts Disagree

### 1. Should AI generate original content from scratch, or only assist with research and editing?

**Support summary: 11 (assistant only) vs. 6 (generate at scale with right inputs)**

This is the most significant disagreement in this skill file. It directly affects how you structure your content team and AI workflows.

---

**Position A: AI should not generate original content from scratch**

AI lacks context, experience, conviction, and the unique insights that make content compelling. Publishing AI-generated content wholesale results in generic "