---
name: website-performance-optimization
description: "Helps marketers audit and improve website technical performance, including page load speed and core web vitals, to reduce bounce rate and improve conversion."
version: "2026-04-21"
episode_count: 2
---

# Website Performance Optimization

## Overview
This skill covers technical website performance practices for B2B marketers, focused on auditing site health and optimizing page load speed. All practices are sourced exclusively from Exit Five podcast guests and reflect their direct recommendations. No general best practices have been added beyond what guests explicitly shared.

## Audit First: Establish Your Technical Baseline

Before optimizing copy, design, or conversion elements, ensure your technical foundations are solid. Run a Google Lighthouse audit to get an objective performance score across core web vitals, SEO, and accessibility.

- Access Lighthouse via Chrome DevTools (right-click → Inspect → Lighthouse tab), or use alternatives such as PageSpeed Insights, WebPageTest, or the Chrome extension. (Source: Tas Bober, Episode #185)
- Use the Lighthouse performance report to generate a specific list of issues, then share that list directly with your dev team as a prioritized action plan. (Source: Tas Bober, Episode #185)
- Run this audit *before* investing time in marketing copy or design changes — technical problems will undermine any conversion work built on top of them. (Source: Tas Bober, Episode #185)

## Page Load Speed: Benchmarks and Fixes

Page load speed directly affects bounce rate and user engagement. Slow pages cause visitors to leave before they ever engage with your content, making this a conversion issue, not just a technical one.

- Set a hard benchmark of **3 seconds or less** for page load time. (Source: Tas Bober, Episode #185)
- Test load times across devices and connection speeds to catch performance gaps that desktop-only testing misses. (Source: Gabby Sellam, Episode #218)
- Identify the two most common culprits of slow load times:
  1. **Overuse of scripts** — plugins, tracking pixels, and ad tags (e.g., LinkedIn ads) that run on page load.
  2. **Uncompressed or unresized images** that add unnecessary file weight. (Source: Tas Bober, Episode #185)
- Ask your web dev team to implement **lazy loading for non-critical scripts** (analytics, ad pixels) so only essential scripts execute immediately on load. (Source: Tas Bober, Episode #185)
- Ask your web dev team to **configure CDN settings to auto-compress images** and convert them to next-gen formats such as WebP. These two changes alone can reduce load time by 7–8 seconds. (Source: Tas Bober, Episode #185)
- Optimize images as a standard practice: compress file sizes and resize images appropriately before upload. (Source: Gabby Sellam, Episode #218)
- Minimize code where possible as part of ongoing performance hygiene. (Source: Gabby Sellam, Episode #218)

## What NOT To Do

- **Do not skip the technical audit and jump straight to copy or design optimization.** If the technical foundation is broken, conversion improvements built on top of it will underperform. Audit first. (Source: Tas Bober, Episode #185)
- **Do not let all scripts — including non-critical tracking and ad pixels — run immediately on page load.** This is one of the most common and impactful causes of slow load times. Lazy load anything that isn't essential to the initial page render. (Source: Tas Bober, Episode #185)
- **Do not upload images without compressing or resizing them.** Unoptimized images are a frequent and easily avoidable source of page weight. (Source: Tas Bober, Episode #185; Gabby Sellam, Episode #218)
- **Do not test performance only on desktop or fast connections.** Visitors arrive on a range of devices and network speeds; test accordingly. (Source: Gabby Sellam, Episode #218)

## Sources

| Episode | Guest | Date |
|---------|-------|------|
| Episode #185 | Tas Bober | 2024-10-17 |
| Episode #218 | Gabby Sellam | 2025-02-10 |