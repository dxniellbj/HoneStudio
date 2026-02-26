/**
 * Honest AI Knowledge Base
 * ────────────────────────
 * Single source of truth for the chatbot. The AI should ONLY reference
 * information contained here. If it's not in this file, it should say
 * "I don't have that information" rather than guess.
 */

export const KNOWLEDGE_BASE = `
=== COMPANY ===
Name: Hone Studio
Website: honestudio.cv
Founder: Niell Alfajora (Daniell Bije Alfajora)
Role: Fractional Ops & Tech Partner
Location: Philippines
Phone: +63 969 613 6802

=== ABOUT NIELL ===
Niell Alfajora is a full-stack developer and fractional ops & tech partner. He runs Hone Studio and also works as a Research Analyst at Showcase Ventures, a media and consumer-focused VC firm. At Showcase, he supports the investment team on sourcing and due diligence — conducting deep-dive sector research, analyzing market trends, and assessing competitive landscapes to identify Seed and Series A/B opportunities. He also built two internal tools (Spotlight and Spyglass) to streamline deal sourcing. Previously founded Net Maestro.

=== WHAT HONE STUDIO DOES ===
Hone Studio is a one-person studio run by Niell Alfajora. It provides fractional (part-time, on-demand) operations and technology services for founders, small businesses, and agencies.

The core concept is the "Swiss Army Knife" approach: one senior partner who handles strategy, systems, and websites together — eliminating the need for multiple vendors, reducing miscommunication, and keeping costs lean.

- One partner, not three vendors
- One conversation, not a game of telephone
- One bill, not a stack of invoices

=== WHY "HONE"? ===
To hone means to sharpen — to take something good and make it precise, focused, effective. Hone Studio takes businesses that are already doing the work and sharpens everything around them: the site, the systems, the strategy. No bloat. No reinvention for the sake of it.

=== THREE SERVICE PILLARS ===

1. Web Design & Development (accent: teal)
   Tagline: "Your digital presence, built to convert."
   Description: Pixel-perfect sites designed around your goals, built to scale, and maintained so you never think about it. From landing pages to full platforms — every detail serves a purpose.
   Outcomes:
   - Higher conversion rates through intentional UX
   - Consistent brand experience across every page
   - A site that scales with your business
   - Zero maintenance headaches
   Platforms & tools: Kajabi, Shopify, Squarespace, WordPress, Next.js, React, Tailwind CSS, HTML/CSS/JS, Custom Apps, Figma, Vercel

2. AI & Automation (accent: orange/signal)
   Tagline: "Your business, running itself."
   Description: Automate the busywork — smart workflows, AI-powered tools, and systems that run while you sleep. Free up your time to focus on the work that actually moves the needle.
   Outcomes:
   - Hours reclaimed from manual, repetitive tasks
   - Fewer errors with automated quality checks
   - Faster customer response times
   - Systems that learn and improve over time
   Platforms & tools: Gemini, OpenAI, Claude, Perplexity, Cursor, Automation, CRM, AI Tools, Email Flows, Chatbots

3. Strategy & Research (accent: indigo)
   Tagline: "Build the right thing, the first time."
   Description: Know your market before you move — competitive intel, audience research, and strategy that drives decisions. No guesswork, no wasted budget, just clarity.
   Outcomes:
   - Clear understanding of your competitive landscape
   - Data-backed decisions instead of assumptions
   - A roadmap that aligns team and budget
   - Confidence in what to build and why
   Platforms & tools: Market Research, Competitive Intel, Discovery Workshops, Roadmapping, Audits

=== WHO HONE STUDIO WORKS WITH ===

1. Founders & Startups
   Problem: Wearing too many hats, no time to build properly
   Solution: One partner who handles the tech and ops side end-to-end

2. Small & Medium Businesses
   Problem: Juggling multiple freelancers and agencies, inconsistent results
   Solution: Integrated service — strategy, design, build, and automation from one person

3. Agencies & Teams
   Problem: Need senior-level execution capacity without hiring full-time
   Solution: Fractional partner who plugs into existing workflows

=== PROCESS ===

Step 1: Discovery
We start with listening. I learn your business, your goals, your constraints — and identify the biggest opportunities to move the needle.

Step 2: Strategy
A clear plan emerges. We align on priorities, define what success looks like, and map out the work — no ambiguity, no scope creep.

Step 3: Build
Execution with precision. I design, develop, and integrate — shipping in focused sprints with regular check-ins so nothing goes sideways.

Step 4: Refine
Launch is just the beginning. We measure, learn, and iterate — making sure what we built keeps working as your business evolves.

=== CASE STUDIES ===

1. Shan Fisher Education
   Industry: Photography education
   Platform: Kajabi (migrated from WordPress)
   Pillars: Web, AI, Strategy
   Summary: Migrated a photography education business from WordPress to Kajabi — moved all courses, built offers, and set up full automation including email sequences.
   Challenge: Shan Fisher Education had outgrown their WordPress setup. Courses were hard to manage, there was no automation, and scaling meant hitting a wall with every new launch. They needed one platform for course delivery, payments, and marketing.
   What was done: Full migration of courses, content, and student data to Kajabi. Built offers, landing pages, and checkout flows. Set up email sequences, onboarding flows, and post-purchase nurture campaigns.
   Results:
   - Complete migration from WordPress to Kajabi with zero downtime
   - All courses, offers, and student data moved to one platform
   - Automated email sequences replaced hours of manual follow-up
   - Scalable foundation for launching new courses without rework

2. Elena Givone Academy
   Industry: Photography education & workshops
   About Elena: Elena Givone is an award-winning Italian photographer, visual artist, and writer. She is a Fujifilm X-Photographer and Elinchrom ambassador. She lives between Italy and Sri Lanka and has worked on social photography projects across Brazil, Mali, Myanmar, Greece, and Sri Lanka. She has published books and teaches at IIF Milano.
   Platform: Squarespace (initially Kajabi, then transitioned)
   Pillars: Web, Strategy
   Summary: Helped internationally recognized photographer Elena Givone launch her academy — initially on Kajabi for digital courses, then transitioned to Squarespace as her focus shifted to physical workshops.
   Challenge: Elena wanted to start offering education to fellow photographers but her vision evolved from digital courses to in-person workshops between Italy and Sri Lanka, so the platform had to adapt.
   What was done: Built the initial academy on Kajabi, then transitioned to Squarespace when her focus shifted to physical workshops. Designed the site to showcase her portfolio, books, and workshop schedule.
   Results:
   - Academy launched and operational with a professional home for her education offering
   - Smooth transition from Kajabi to Squarespace without losing momentum
   - Platform aligned with her workshop-first model — easy to update events and listings
   - Site reflects Elena's international brand across photography, education, and social projects

3. Showcase Ventures
   Industry: Venture capital — media and consumer focused (music, live entertainment, film, TV, digital media, video games, beauty, health & wellness, hospitality, food & beverage, fashion)
   Platform: Next.js 15, Firebase (Firestore), Gemini AI, Bright Data, Perplexity API
   Pillars: AI, Strategy
   Summary: Built Spotlight and Spyglass — two internal tools that use AI-powered enrichment, multi-source web scraping, and real-time collaboration to transform how the firm sources and researches deals.
   Context: Niell works at Showcase Ventures as a Research Analyst, supporting the investment team on sourcing and due diligence.
   What was built:
   - Spotlight — a full investment sourcing platform with AI-powered company enrichment. Features include:
     - Multi-phase enrichment: domain discovery via Google PSE, web scraping via Bright Data, AI analysis via Gemini, social link discovery, follower count retrieval
     - Consensus scoring across multiple sources for data quality validation
     - Hierarchical theme/folder management with drag-and-drop
     - Interactive dashboard with ROI tracking and sourcing grade distribution
     - Brand extractor for bulk CSV imports with automated domain discovery
     - Real-time collaboration via Firestore listeners — all users see updates instantly
     - Company grading system (preliminary and final grades) with pipeline tracking
     - Background queue processing with concurrent enrichment (4 parallel queues)
   - Spyglass (codename: StoreWalker) — a retail intelligence hub for CPG investors and analysts. Features include:
     - Store walk workflow: visit a retail location, photograph shelves, upload photos
     - Gemini 3-Flash AI analyzes each photo to exhaustively detect every brand and SKU visible (brand name, SKU, category, size, unit count)
     - Two-pass enrichment: Pass 1 extracts brands from images, Pass 2 enriches with manufacturer data via Google Search grounding
     - Brand database with resizable table, search, category/grade filters, bulk actions, and A/B/C/D grading system
     - Interactive Google Maps view with intelligent markers showing store locations and detected brands
     - Real-time dashboard with visit stats, brand counts, tracking rates, and category breakdowns
     - Processing history with analysis logs, timing metrics, and raw AI responses
     - Firebase Cloud Functions triggered on visit creation for automated background processing
   Tech: React 19, React Router v7, TypeScript, Tailwind CSS, Radix UI/ShadCN, Firebase (Auth, Firestore, Storage, Cloud Functions), Google Genkit, Gemini 3-Flash, Google Maps API, Recharts
   Tech: Next.js 15, TypeScript, React 19, Tailwind CSS 4, ShadCN UI, Firebase Firestore, Google Genkit, Gemini 2.0 Flash, Bright Data, Perplexity API, Recharts
   Results:
   - Company research that took hours now happens in seconds through automated AI enrichment
   - Multi-source validation ensures data quality — no single point of failure
   - Real-time collaboration lets the full investment team see enriched data instantly
   - Structured grading and pipeline tracking replaced scattered notes and spreadsheets

=== OTHER PROJECTS (Notable Mentions) ===

- Lanelit (lanelit.com): Redesigned the website and set up email replays for Allison Lane's book coaching and visibility strategy practice. Allison Lane is a book coach with 25 years of marketing/PR experience who helps women experts transform their expertise into published books. Pillars: Web, AI.

=== VALUES / PRINCIPLES ===

1. Integrated, Not Siloed
   Strategy, design, and tech shouldn't live in separate rooms. I work across all three so everything connects and nothing falls through the cracks.

2. Outcomes Over Deliverables
   A beautiful site that doesn't convert is just decoration. Everything I build is measured by the results it drives for your business.

3. Honest By Default
   If something won't work, I'll say so. If there's a better path, I'll show you. No upsells, no fluff — just clear, direct communication.

4. Lean & Focused
   No agency overhead, no bloated teams. One senior partner who knows your business inside out — faster decisions, tighter execution.

=== PRICING ===
No pricing is listed on the website. The call to action is always "get in touch" or "book a call." If asked about pricing, direct them to the contact page.

=== CONTACT ===
Email: hello@honestudio.cv
Phone: +63 969 613 6802
Contact page: /contact
Response time: Usually within 24 hours
`;
