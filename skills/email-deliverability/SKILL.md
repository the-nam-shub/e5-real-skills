---
name: email-deliverability
description: "Guidance for diagnosing, protecting, and improving B2B email deliverability across cold outbound, opted-in marketing, and newsletter programs — trigger when a user asks about inbox placement, sender reputation, spam filters, email infrastructure, or engagement metrics."
version: "2026-04-20"
episode_count: 6
---

# Email Deliverability

## Overview
This skill covers B2B email deliverability best practices spanning cold outbound infrastructure, opted-in marketing programs, technical configuration, engagement signals, and metric interpretation. All practices are sourced exclusively from Exit Five podcast guests across 6 episodes. Do not supplement with general knowledge not represented here — gaps in coverage are intentional.

---

## Infrastructure: Domains, IPs, and Inboxes

**Protect your primary domain at all costs.**

- Never send cold outbound email from your primary company domain (e.g., `yourcompany.com`). Use secondary domains (e.g., `try.exitfive.com`, `get.exitfive.com`) instead. If the primary domain is blacklisted, it damages your entire business's email deliverability. (Source: Alex Fine, Episode #256)
- Use secondary domains rather than subdomains for email campaigns. Subdomains are tied to your primary domain's reputation; secondary domains are fully isolated. (Source: Alex Fine, Episode #256)
- Limit to three email inboxes per domain maximum. If a domain develops a poor reputation, all inboxes on it are at risk. Spreading inboxes across multiple domains (max 3 per domain) diversifies that risk. (Source: Alex Fine, Episode #256)
- Use real people's names in email addresses (e.g., `dan@domain.com`), not aliases like `sales@domain.com` or fake names. Real names allow recipients to verify the sender on LinkedIn and reduce spam filter triggers. (Source: Alex Fine, Episode #256)
- Avoid no-reply email addresses for marketing campaigns. Use a real, monitored address so replies — a key engagement signal — can be tracked and responded to. Set up a tool to manage incoming replies. (Source: Sara McNamara, Episode #256)

**On dedicated IPs vs. IP rotation:**

- Decide on a dedicated IP based on how strategically important email is to your business, not on a specific volume threshold. If email is core to your GTM, a dedicated IP gives you full control over sender reputation. (Source: Sara McNamara, Episode #256)
- For outbound campaigns, consider tools that rotate your sending IP across multiple addresses (e.g., biweekly rotation) rather than relying on a single dedicated IP. If one IP is blacklisted, others remain unaffected. (Source: Alex Fine, Episode #256)
- If you cannot afford a dedicated IP, evaluate platforms that rotate IPs across multiple addresses rather than placing you on a shared IP with unknown senders. (Source: Sara McNamara, Episode #256)

**Warming up new domains:**

- When warming up a new domain, start with a small, highly engaged audience (e.g., 1,000–2,000 friendly customers or partners) and gradually increase volume over weeks. Use a structured schedule: Week 1 at ~1,000 emails, Week 2 at ~2,000, and so on. Do not rush this process. (Source: Sara McNamara, Episode #256)
- For cold outbound ramp-up, send no more than 50 emails per day per domain, distributed across 3 inboxes. Increase volume gradually as the domain builds reputation. (Source: Alex Fine, Episode #256)
- Use an email warmup service that actively removes spam inboxes from the warm-up pool (e.g., Instantly). Verify the tool isolates bad actors before adding them to your warm-up network. (Source: Alex Fine, Episode #256)
- Do not switch domains repeatedly to escape a poor sender reputation. ESPs recognize this pattern and will automatically flag the new domains. Rebuild reputation the right way — there is no shortcut. (Source: Sara McNamara, Episode #256)

**Diversify infrastructure for cold outbound:**

- Send cold emails across multiple inboxes and domains rather than concentrating volume in a single inbox. A single inbox receiving spam complaints from 2 out of 10 recipients (20%) can trigger a spam flag; spreading sends dilutes that risk. Use tools like Instantly or Smartlead that support ESP matching — sending Outlook emails to Outlook inboxes, Gmail to Gmail. (Source: Alex Fine, Episode #245)

---

## Cold Outbound Email: Sending Practices

- Limit cold outbound sequences to three emails maximum. After three unanswered emails, continued sending is likely to generate spam complaints. Move on to new prospects instead. (Source: Alex Fine, Episode #256)
- Validate email addresses and detect catch-all addresses before adding contacts to a sequence. Use tools like Bounceband to ensure you're only sending to real, monitored inboxes. (Source: Alex Fine, Episode #256)
- For outbound prospecting emails, use a reply-based opt-out (e.g., "reply with 'no thank you' to opt out") instead of an unsubscribe link. Links — including unsubscribe links — can trigger phishing filters. Reply-based opt-outs also generate reply activity, which improves sender reputation. **Note: marketing emails require legal unsubscribe links per compliance law — this practice applies to outbound prospecting only.** (Source: Alex Fine, Episode #256)
- Rotate 3–4 subject line variations per campaign send. Each variation should convey the same core message but be formatted and personalized differently to bypass spam filters that detect repetitive patterns. (Source: Alex Fine, Episode #256)
- Avoid elements that spam filters flag as phishing: no links, no images, no open tracking pixels, no click tracking pixels in cold email copy. Even tracking pixels are read by spam filters as links. Keep copy length, word choices, and HTML usage minimal and varied. The goal is to appear as a plain, legitimate person-to-person message. (Source: Alex Fine, Episode #245)
- Manual one-to-one emails (sent from Gmail or a personal inbox) have the best deliverability and require minimal concern about filters. Deliverability complexity increases significantly only when you move to automated bulk sending — focus on these practices when implementing automation. (Source: Alex Fine, Episode #256)

---

## Opted-In Marketing Email: Content and Engagement

- Send emails from named individuals (e.g., "Joe from Company X") rather than generic brand addresses. Route replies to the actual sender's email address so conversations feel one-to-one. Include a sender photo in your CRM to reinforce the human connection. (Source: Joe, Episode #312)
- Use the "reply with GUIDE" tactic for content distribution: instead of linking to a landing page, send a short letter-format email asking recipients to reply with a keyword to receive the asset. This increases response rates approximately 300% and generates reply signals that improve inbox placement. (Source: Jay Schwedelson, Episode #329)
- Consolidate multiple links into a single master link to a landing page rather than including 8–12 individual links. List items with brief descriptions and link once to a page where recipients can explore all options. (Source: Alex Fine, Episode #256)
- Minimize links in emails generally. Spam filters view multiple links as a phishing indicator. If you need to offer multiple resources, tease the content and ask recipients to reply if interested. (Source: Alex Fine, Episode #256)
- In your welcome email or early welcome sequence, ask subscribers to whitelist your email address or add you to their contacts. Provide clear instructions for their email client. (Source: Sara McNamara, Episode #256)
- Analyze your own email-opening behavior to inform subject line and send strategy. You typically open email because of the sender, the subject line, or the time of day. Use all three levers — not just subject lines — to improve open rates. (Source: Alyssa, Episode #312)

**On email frequency and engagement** *(Note: this is contested — see Where Experts Disagree)*:

- Jay Schwedelson argues that B2B marketers are not sending enough email, and that low engagement is caused by boring content, not high frequency. Modern spam filtering is engagement-based — insufficient volume starves the algorithm of positive signals and causes inbox placement to deteriorate. The fix is more email with better content. (Source: Jay Schwedelson, Episode #329)

---

## List Hygiene and Audience Management

- Before implementing a sunset policy to remove inactive subscribers, run a targeted re-engagement campaign. Invite inactive users to opt back in or confirm their interest. Only after this attempt should you remove truly unresponsive contacts. Sunset policy is the final step, not the first. (Source: Joe, Episode #312)
- Identify honeypots and security bots by looking for accounts that open every email but never click, never reply, and have suspicious email addresses (unusual formatting, generic names). Manually review your database for these patterns and remove them. (Source: Sara McNamara, Episode #256)
- Define spam as email that is irrelevant to the recipient, provides no value, and is sent too frequently. Avoid sending the same generic message to many recipients without personalization — this pattern triggers both spam filters and user complaints. (Source: Alex Fine, Episode #256) *(Note: this is contested in the context of frequency decisions — see Where Experts Disagree)*

---

## Technical Configuration and Rendering

- Keep email file size under 102 kilobytes. Gmail clips emails that exceed this threshold. Critical elements like unsubscribe links must appear before the clipping point to avoid compliance issues and poor user experience. (Source: Jaina Mistry, Episode #241)
- Include sufficient live (non-image) text in emails so that AI-generated inbox summaries accurately represent your content. Image-only emails or emails relying solely on alt text will produce poor or irrelevant AI summaries, potentially hurting open rates. (Source: Jaina Mistry, Episode #241)
- Do not use misleading subject lines that don't match email content (e.g., "Your credit card failed" for a renewal notice), and never use fake "Re:" or "Fwd:" formatting to trick recipients into opening. These tactics trigger spam complaints, violate anti-spam regulations, and can result in fines. (Source: Jaina Mistry, Episode #241)

---

## Diagnosing Deliverability Problems

- If an email has zero or near-zero opens, investigate whether it's a deliverability or technical issue before assuming it's a copy problem. Check if the email landed in spam, if there's a list quality issue, or if there's a technical send error. Only after ruling out deliverability problems should you optimize subject lines and copy. (Source: Sheri Otto, Episode #247)
- Check your ESP's built-in health monitoring tool (e.g., HubSpot's email health pane) to identify deliverability problems before they escalate. These tools benchmark performance against industry standards and flag technical misconfigurations faster than manual analysis of open and click rates. (Source: Sara McNamara, Episode #256)
- Monitor unsubscribe rate and unsubscribe reasons as primary indicators of deliverability health. Implement an unsubscribe reason form to gather qualitative data on why recipients are leaving — this reveals whether the problem is content relevance or technical delivery. (Source: Sara McNamara, Episode #256)

**On using open rate as a deliverability signal** *(Note: this is contested — see Where Experts Disagree)*:

- Jaina Mistry recommends monitoring open rate trends over time as an early warning signal for deliverability problems, particularly for regularly-sent newsletters. (Source: Jaina Mistry, Episode #241)
- Alex Fine recommends using reply rate as the primary deliverability signal and warns that open rates are skewed by bots and filters. (Source: Alex Fine, Episode #256)

**Identifying bot and firewall activity:**

- Send a test email at 2 AM and measure click activity in the first 30 minutes. Most clicks in that window are bot activity. Discount your overall click metrics by this bot percentage to get a more accurate view of actual engagement. (Source: Jay Schwedelson, Episode #241)
- The "view in browser" link at the top of emails is often the first link clicked by bots. A 60% click-through rate on that link while other links are much lower is a strong signal of bot inflation. (Source: Jaina Mistry, Episode #241)
- In B2B, if a recipient opens and clicks every link in every email consistently, their organization's IT security firewall is likely automatically opening and clicking all emails before releasing them to the inbox. This can delay delivery by up to 4 hours and inflate metrics. (Source: Beth O'Malley, Episode #241)

---

## Where Experts Disagree

### 1. When engagement drops, should you send more email or less?
**Support summary: 1 vs 1**

**Position A — Send more email with better content** (Jay Schwedelson, Episode #329):
Schwedelson argues that B2B marketers are not sending enough email and that lower frequency leads to lower performance. His reasoning: modern spam filtering is engagement-based, not content-trigger-based. If you're not sending enough email to generate replies and clicks, you starve the algorithm of positive signals and end up in spam. The fix is more email with better, more engaging content — not less email.

**Position B — Reduce frequency and improve relevance** (Alex Fine, Episode #256):
Fine explicitly defines spam as email that is "not relevant to the recipient, provides no value, and is sent too frequently." He warns that sending the same generic message to many recipients without personalization triggers both spam filters and user complaints. The solution is to reduce frequency and improve relevance.

**Context dependency:** This disagreement is partially context-dependent. Schwedelson is speaking primarily about opted-in marketing lists where the sender already has permission and a relationship. Fine is speaking primarily about cold outbound prospecting where no prior relationship exists. However, both make general claims about frequency and engagement that overlap in the opted-in marketing context, making this a genuine disagreement for that shared scenario.

**What this means for you:** If you're managing an opted-in list with declining engagement, you face a real choice between these positions. Consider whether your content is genuinely valuable and differentiated (Schwedelson's framing) or whether you're over-communicating to a segment that never found your emails relevant (Fine's framing). The answer may depend on your unsubscribe rate and reply rate trends.

---

### 2. Is open rate a useful signal for diagnosing deliverability problems?
**Support summary: 1 vs 1**

**Position A — Open rate trends are a valuable early warning signal** (Jaina Mistry, Episode #241):
Mistry argues that while open rates are not a reliable success metric in isolation, a dramatic decline in open rates over time — especially for regularly-sent newsletters — is one of the most valuable early warning signals for deliverability problems. She recommends monitoring open rates by inbox provider and cadence to catch issues before they escalate.

**Position B — Open rates are unreliable; use reply rate instead** (Alex Fine, Episode #256):
Fine recommends tracking positive reply rate as the only meaningful performance metric for outbound email and explicitly warns against relying on open rates or click-through rates because they are increasingly skewed by security bots and email filters. He describes a declining reply rate (e.g., from 7–8% down to 1%) as the reliable indicator that emails are no longer landing in the primary inbox.

**Context dependency:** Partially context-dependent. Mistry is speaking about opted-in newsletter and marketing email programs where bot inflation is a known but manageable factor. Fine is speaking specifically about cold outbound prospecting where bot inflation is more severe and reply rate is more actionable. However, both make claims about open rate reliability as a deliverability diagnostic that conflict in the overlapping context of any bulk email program.

**What this means for you:** For opted-in newsletters, monitoring open rate trends over time (not point-in-time snapshots) may still provide useful directional signals as Mistry suggests — particularly when segmented by inbox provider. For cold outbound, Fine's position is stronger: reply rate is the more reliable and actionable metric. In either context, use the 2 AM bot test and "view in browser" click analysis to understand how much of your open and click data is inflated before drawing conclusions.

---

## What NOT To Do

- **Do not send cold email from your primary domain.** A blacklisted primary domain damages your entire business's email deliverability. (Source: Alex Fine, Episode #256)
- **Do not use no-reply email addresses.** Replies are a key engagement signal and represent your most valuable audience segment. (Source: Sara McNamara, Episode #256)
- **Do not switch domains repeatedly to escape a poor reputation.** ESPs recognize the pattern and will flag new domains automatically. (Source: Sara McNamara, Episode #256)
- **Do not include links, images, or tracking pixels in cold outbound emails.** These trigger phishing filters. (Source: Alex Fine, Episode #245)
- **Do not send more than three emails in a cold outbound sequence.** Continued sending after three non-responses generates spam complaints. (Source: Alex Fine, Episode #256)
- **Do not associate more than three inboxes with a single domain.** Concentration of inboxes on one domain creates catastrophic risk if that domain is flagged. (Source: Alex Fine, Episode #256)
- **Do not use misleading subject lines or fake Re:/Fwd: formatting.** These violate anti-spam regulations and can result in fines. (Source: Jaina Mistry, Episode #241)
- **Do not let email file size exceed 102 kilobytes.** Gmail will clip the email, potentially hiding your unsubscribe link and creating compliance risk. (Source: Jaina Mistry, Episode #241)
- **Do not use image-only emails.** AI inbox summaries will misrepresent your content, hurting open rates. (Source: Jaina Mistry, Episode #241)
- **Do not treat open rate as a reliable point-in-time success metric.** Bot inflation from security firewalls and filters makes it unreliable for measuring engagement. Use it only as a trend signal for deliverability diagnostics, and even then, see the disagreement above. (Source: Jaina Mistry, Episode #241; Alex Fine, Episode #256)
- **Do not optimize email copy before diagnosing deliverability.** A perfect email that doesn't reach the inbox is worthless. Rule out technical and list issues first. (Source: Sheri Otto, Episode #247)
- **Do not use a warmup service that doesn't isolate spam inboxes from the warm-up pool.** Building reputation by engaging with spam cannons harms deliverability. (Source: Alex Fine, Episode #256)
- **Do not send the same generic message to many recipients without personalization.** This pattern triggers both spam filters and user complaints. (Source: Alex Fine, Episode #256)

---

## Sources

| Episode | Guest | Date |
|---------|-------|------|
| Episode #241 | Jaina Mistry | 2025-04-28 |
| Episode #241 | Jay Schwedelson | 2025-04-28 |
| Episode #241 | Beth O'Malley | 2025-04-28 |
| Episode #245 | Alex Fine | 2025-05-12 |
| Episode #247 | Sheri Otto | 2025-05-19 |
| Episode #256 | Alex Fine | 2025-06-19 |
| Episode #256 | Sara McNamara | 2025-06-19 |
| Episode #312 | Alyssa | 2025-12-15 |
| Episode #312 | Joe | 2025-12-15 |
| Episode #329 | Jay Schwedelson | 2026-02-12 |