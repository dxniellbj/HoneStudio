PRODUCT REQUIREMENTS DOCUMENT

**Hone Studio**

Portfolio Website & Honest AI Chatbot

*The Swiss Army Knife --- One partner. Every tool you need.*

  -------------------------- --------------------------------------------
  Version                    1.0

  Date                       February 19, 2026

  Author                     Hone Studio

  Status                     Draft

  Domain                     honestudio.cv / honestudio.co
  -------------------------- --------------------------------------------

1\. Overview

This PRD defines the requirements for the Hone Studio portfolio website and its integrated AI chatbot, Honest AI. The site is a custom-built Next.js application hosted on Firebase Hosting, designed to showcase Hone Studio's services, case studies, and the Swiss Army Knife value proposition.

1.1 The Swiss Army Knife

**Hone Studio is positioned as a business's Swiss Army Knife:** one partner that replaces the need for a full ops and tech team. Web design, AI and automation, strategy and research --- all from a single fractional partner with zero overhead. The website must communicate this breadth-of-capability clearly, without making it feel scattered. The Swiss Army Knife metaphor is the unifying narrative that ties the offering together.

**This concept lives in copy, messaging, and page structure** --- not in the visual logo or brand identity. It shapes how services are presented (integrated, not siloed), how case studies cross-sell (one client, multiple tools), and how Honest AI describes the business to visitors.

1.2 What This Is (and Isn't)

**What this is:** A fast, static portfolio site with an AI chatbot. Simple contact form. No CRM, no paid services, no bloat. Built cheap, built well.

**What this is not:** A SaaS product, a lead management system, or an enterprise app.

2\. Goals

-   Communicate the Swiss Army Knife positioning: one partner, every tool --- through page structure, copy, and chatbot behavior

-   Establish Hone Studio's digital presence with a custom build that signals technical depth and premium quality

-   Showcase cross-pillar case studies that prove the breadth is real, not theoretical

-   Deploy Honest AI as a 24/7 assistant that explains the offering, surfaces relevant work, and nudges toward contact

-   Serve as a living case study --- the site itself demonstrates what Hone Studio builds (custom web app + AI)

-   Keep monthly costs under \$10 (ideally free-tier everything)

3\. Tech Stack

Chosen for cost (free tiers), performance, and simplicity.

  ---------------- -------------------------- ------------------- ----------------------------
  **Layer**        **Technology**             **Cost**            **Why**

  **Framework**    Next.js 15 (App Router)    Free                SSG + API routes

  **Language**     TypeScript                 Free                Type safety

  **Styling**      Tailwind CSS 4             Free                Design token system

  **AI / LLM**     Google Gemini API          Free tier / cheap   Honest AI engine

  **Hosting**      Firebase Hosting (Spark)   Free                CDN, SSL, custom domain

  **Functions**    Cloud Functions (Spark)    Free tier           API routes for chat + form

  **Analytics**    Google Analytics 4         Free                Traffic + events

  **Database**     Firestore (Spark)          Free tier           Contact form + chat logs

  **Domain**       honestudio.cv or .co       \~\$12--\$30/yr     Only hard cost

  **Media**        Static /public folder      Free                No CDN needed
  ---------------- -------------------------- ------------------- ----------------------------

3.1 Monthly Cost

  ------------------------------ ------------------ ---------------------------------------
  **Item**                       **Cost**           **Notes**

  **Firebase Hosting (Spark)**   \$0                10GB storage, 360MB/day transfer

  **Cloud Functions (Spark)**    \$0                125K invocations/month free

  **Gemini API (Flash 2.0)**     \$0--\$5           Free tier generous; Flash is cheapest

  **Firestore Spark**            \$0                50K reads/day, 20K writes/day

  **Google Analytics 4**         \$0                Unlimited events, free forever

  **Domain**                     \~\$1--\$2.50      Amortized monthly

  **Total**                      \$0--\$8/mo        Effectively free at portfolio scale
  ------------------------------ ------------------ ---------------------------------------

4\. Sitemap & Pages

Minimal page count. Every page earns its place.

  -------------------- ------------------------------------------------------------------------------------------------------ --------------
  **Route**            **Purpose**                                                                                            **Priority**

  **/**                Homepage --- Swiss Army Knife value prop, service pillars, audience funnel, case studies, CTA          P0

  **/services**        Single page with all three service pillars. Integrated, not siloed --- reinforcing the SAK narrative   P0

  **/work**            Case studies index with filterable cards by pillar                                                     P0

  **/work/\[slug\]**   Individual case study: Problem → Approach → Result. Cross-pillar tags show breadth                     P0

  **/about**           Personal story, why the breadth works, what ties it together. Addresses the generalist objection       P0

  **/contact**         Simple contact form → Firestore + notification                                                         P0
  -------------------- ------------------------------------------------------------------------------------------------------ --------------

4.1 Homepage Flow

The homepage is the Swiss Army Knife in action --- showing how one partner covers everything a business needs:

1.  Hero --- Single value proposition that communicates the SAK concept without using the literal metaphor in the headline. Territory: "Your business needs a full ops and tech team. You don't need to hire one."

2.  How I Help --- Three service pillar cards, presented as integrated tools of one offering, not three separate businesses

3.  Who I Help --- Audience self-selection ("I work with\...") linking to relevant case studies. Founders / SMBs / Agencies

4.  Proof --- Case study highlights emphasizing cross-pillar projects (e.g., Showcase Ventures: web + AI + strategy)

5.  CTA --- Contact form link. Clean. One action.

Honest AI chatbot persists as a floating widget on every page.

5\. Honest AI --- Chatbot

5.1 Overview

Honest AI is the conversational front-desk of the website. It answers questions, explains the Swiss Army Knife offering, recommends case studies, handles the "can one person really do all this?" objection, and nudges visitors toward the contact form. Powered by Google Gemini Flash for cost efficiency.

**The chatbot is the Swiss Army Knife concept made interactive.** A visitor can ask about web design and Honest AI explains it --- then naturally connects it to automation or strategy work, showing how the services are integrated rather than separate.

5.2 Capabilities

  -------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Capability**             **Description**

  **Service Q&A**            Answer questions about all three pillars, platforms (Kajabi, Shopify, Squarespace, custom), process, and engagement models. Always frame answers through the integrated-partner lens.

  **SAK Narrative**          When asked about any single service, naturally reference how it connects to the other pillars. "I build the site, but I also set up the automation behind it and do the research upfront."

  **Case Study Surfacing**   Recommend case studies based on visitor's question. Prioritize cross-pillar examples (Showcase Ventures) to demonstrate breadth.

  **Objection Handling**     Proactively address: "Can one person do all this?" "What's your process?" "How does pricing work?" with confident, on-brand responses.

  **Contact Nudge**          When a visitor shows interest, suggest reaching out via the contact page. Keep it natural, not pushy.

  **Page-Aware Context**     Knows which page the visitor is on. Adjusts greeting and suggestions. On /work/showcase-ventures it references that specific project.

  **Session Memory**         Maintains context within a session. Doesn't repeat information already discussed.
  -------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

5.3 What It Doesn't Do

-   No lead scoring, pipeline management, or CRM integration

-   No booking/scheduling --- contact page handles this

-   No email capture within chat

-   No autonomous multi-step actions --- it's Q&A, not an agent

-   No admin dashboard at launch (Firestore console if needed)

5.4 System Prompt Architecture

Two lean layers:

**Layer 1 --- Identity & Rules:** Name is Honest AI. Tone: direct, expert, warm, clear. Represents Hone Studio as a Swiss Army Knife --- one fractional partner covering web, AI/automation, and strategy. Response length: 2--4 sentences default, expand only if asked. When unsure, say so honestly (hence the name). Always frame the offering as integrated, never siloed. Suggest the contact page when appropriate.

**Layer 2 --- Knowledge Base:** Services and platforms, case study summaries (Problem/Approach/Result for each), target audiences (Founders, SMBs, Agencies), pricing guidance ("get in touch" not exact numbers), Swiss Army Knife messaging hooks ("one partner, every tool"), FAQs, brand voice examples.

5.5 API Route

POST /api/chat

> Request: { messages\[\], page: string }
>
> Response: Streaming (Gemini generateContentStream)
>
> Model: gemini-2.0-flash
>
> Limits: 20 req/min/IP via Cloud Functions rate limiting

5.6 UI Spec

  -------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------
  **Element**          **Spec**

  **Trigger Button**   Fixed bottom-right, 20px margin. 52px circle. Teal bg, "H." icon (Fraunces). Subtle pulse on first visit.

  **Panel**            380px × 520px. Header: "Honest AI" + close btn. Scrollable messages. Fixed input. Spring animation on open.

  **Welcome**          Contextual. Homepage: "Hey! I'm Honest AI --- ask me anything about what Hone Studio can do for you." /services: "Want the details on any of these?"

  **Messages**         Assistant: left, #F6F7F9 bg. User: right, teal bg, white text. Supports bold + links.

  **Typing**           3-dot pulse while streaming.

  **Quick Prompts**    3 chips on first load: "What do you do?" "Show me your work" "How do I get in touch?"

  **Mobile**           Full-width bottom sheet \< 768px. Swipe to dismiss. Input above keyboard.

  **A11y**             ARIA roles, keyboard nav, focus trap, screen reader announcements.
  -------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------

6\. Contact Form

Simple. No CRM. Firestore + free notification.

6.1 Fields

  ------------------ ------------ -------------- -----------------------------------------
  **Field**          **Type**     **Required**   **Notes**

  **Name**           text         Yes            First + last, single field

  **Email**          email        Yes            Client + server validation

  **Inquiry Type**   select       Yes            New Project / Ongoing Support / General

  **Message**        textarea     Yes            Min 20 chars, max 2000
  ------------------ ------------ -------------- -----------------------------------------

6.2 Submission Flow

1.  Validate client-side → disable button, show spinner

2.  POST /api/contact → sanitize → write to Firestore (contacts collection)

3.  Trigger notification: Discord/Slack webhook (free) or Gmail SMTP extension (free)

4.  Show success: "Thanks! I'll be in touch within 24 hours."

Honeypot field for bot prevention. No CAPTCHA needed at portfolio scale.

7\. Case Studies

**Case studies are the proof that the Swiss Army Knife works.** Each one shows how a single client engagement spanned multiple service pillars. The Showcase Ventures case study is the crown jewel --- web design, custom AI tools, and CRM automation for one client.

  --------------------------- ------------------------ ------------------------ --------------------
  **Client**                  **Platform**             **Pillars Shown**        **Audience**

  **Shan Fisher Education**   Kajabi                   Web Design, Strategy     Creator / Educator

  **Elena Givone Academy**    Kajabi                   Web Design, Strategy     Creator / Educator

  **Showcase Ventures**       Squarespace + Firebase   Web, AI/Auto, Strategy   Institutional
  --------------------------- ------------------------ ------------------------ --------------------

Stored as MDX files in the repo. Frontmatter includes: title, client, platform, pillars (array), thumbnail, and a summary field that feeds directly into Honest AI's knowledge base.

Each case study page ends with a cross-pillar CTA: "This project used \[Web + AI + Strategy\]. See how these services work together." --- linking back to /services.

8\. Design System

Implements the Hone Studio brand kit via Tailwind CSS config. Tokens in tailwind.config.ts.

  ------------------- --------------------------- -------------------------------
  **Token**           **Value**                   **Usage**

  **Display Font**    Fraunces (Google Fonts)     Headlines, hero, logo

  **Body Font**       DM Sans (Google Fonts)      Body, UI, forms

  **Mono Font**       Space Mono (Google Fonts)   Labels, tags, metadata

  **Primary**         #00D4AA Teal + scale        CTAs, links, chatbot, accents

  **Signal**          #FF6B3D Orange              AI/Automation pillar

  **Depth**           #4F5BD5 Indigo              Strategy pillar

  **Neutrals**        #0F1114 → #FFFFFF           Backgrounds, text, borders

  **Illustration**    SVG linework, 1--1.5px      Service icons, textures
  ------------------- --------------------------- -------------------------------

9\. Key Components

  -------------------------- ---------- --------------------------------------------------------------------------------------------------
  **Component**              **Type**   **Description**

  **\<NavBar /\>**           RSC        Responsive nav. Logo, links, contact CTA. Transparent on hero, solid on scroll.

  **\<Hero /\>**             RSC        Full-width hero. SAK value prop headline, subtitle, CTA. Dark/light variants.

  **\<ServicePillars /\>**   RSC        Three pillar cards on one page. Linework icons, outcome copy, platform tags. Feels integrated.

  **\<AudienceFunnel /\>**   Client     "I work with\..." interactive cards. Founders / SMBs / Agencies. Links to relevant case studies.

  **\<CaseStudyCard /\>**    RSC        Card with client, platform badge, pillar tags, thumbnail. Cross-pillar badges highlighted.

  **\<ContactForm /\>**      Client     Form with validation, Firestore submission, success state, honeypot.

  **\<ChatWidget /\>**       Client     Honest AI. Floating button, panel, streaming Gemini responses, quick prompts.

  **\<ChatMessage /\>**      Client     Message bubble. Markdown links, bold, inline formatting.

  **\<Footer /\>**           RSC        Logo, nav links, email, legal.
  -------------------------- ---------- --------------------------------------------------------------------------------------------------

10\. Performance & SEO

10.1 Performance

-   Static export (next export) served via Firebase Hosting CDN --- API routes run on Cloud Functions

-   Chatbot: lazy-loaded, code-split, \< 40KB initial JS

-   Fonts: next/font self-hosted (Fraunces, DM Sans, Space Mono) --- no CLS

-   Images: next/image with WebP, responsive srcset, lazy load

-   Target: Lighthouse 95+

10.2 SEO

-   Dynamic metadata per page via Next.js generateMetadata (build-time for static pages)

-   Open Graph + Twitter Card tags

-   JSON-LD: Organization, Service, FAQPage

-   Auto-generated sitemap.xml + robots.txt

-   Semantic HTML, proper heading hierarchy, alt text

11\. Security

-   HTTPS enforced (Firebase Hosting)

-   Rate limiting: Cloud Functions middleware --- /api/chat 20 req/min/IP, /api/contact 5 req/min/IP

-   Input sanitization on all fields and chat messages

-   Env vars for Gemini API key + Firebase config

-   Firestore rules: public read on content, write-only on contacts/chat

-   Honeypot on contact form, no CAPTCHA

-   No auth needed --- fully public site

12\. Build Timeline

Solo developer. Lean build.

  ----------- ------------------ -------------------------------------------------------------------------------------------------------- ----------------
  **Phase**   **Name**           **Deliverables**                                                                                         **Time**

  **1**       **Scaffold**       Next.js + Tailwind + design tokens + Firebase Hosting deploy + Cloud Functions setup + component stubs   2--3 days

  **2**       **Core Pages**     Homepage (SAK hero, pillars, funnel, proof), services, about, contact + Firestore, nav, footer           1--1.5 weeks

  **3**       **Case Studies**   MDX setup, case study template, 3 case studies, /work index with pillar filters                          3--5 days

  **4**       **Honest AI**      ChatWidget, Gemini API route, system prompt + knowledge base, streaming UI, quick prompts                1--1.5 weeks

  **5**       **Polish**         SEO, OG images, a11y pass, Lighthouse, mobile QA, final deploy                                           2--3 days
  ----------- ------------------ -------------------------------------------------------------------------------------------------------- ----------------

Estimated total: **3--4 weeks to launch.**

13\. Open Items

  -------- ------------------------------------------------------------------------ ------------- --------------------
  **\#**   **Decision**                                                             **Status**    **Notes**

  **1**    Domain: honestudio.cv vs. honestudio.co (check availability + pricing)   **Open**      Compare costs

  **2**    Notification method: Discord webhook vs. Slack webhook vs. Gmail SMTP    **Open**      Pick one

  **3**    Case study content creation (Problem/Approach/Result for each)           **Pending**   Blocks Phase 3

  **4**    Honest AI knowledge base content authoring                               **Pending**   Needs case studies

  **5**    Gemini model: Flash 2.0 vs. Flash 2.0 Lite (cost vs. quality)            **Open**      Test both

  **6**    Whether to log chat conversations to Firestore (free writes limited)     **Open**      Can skip at launch
  -------- ------------------------------------------------------------------------ ------------- --------------------

14\. Out of Scope

Cut to keep this lean:

  ----------------------------------- --------------------------------------------------------------------------------
  **Feature**                         **Why It's Out**

  **CRM (Pipedrive)**                 Overkill. Firestore + webhook is enough for portfolio volume.

  **Paid email (Resend, SendGrid)**   Free webhook or Gmail SMTP covers it.

  **Scheduling (Cal.com)**            Contact form is the CTA. Scheduling happens over email.

  **Paid analytics (PostHog)**        GA4 is free and unlimited. No need for paid tools.

  **Blog**                            Not needed at launch. Can add later with MDX if content strategy warrants it.

  **Lead scoring / pipeline**         This is a portfolio site, not a sales tool.

  **Admin dashboard**                 Firestore console works. Build a dashboard only if volume demands it.

  **Auth / user accounts**            Fully public site. No gated content.

  **Separate service sub-pages**      One /services page. Less to maintain, reinforces the integrated SAK narrative.

  **Package pricing pages**           No pricing on site. "Get in touch" is the CTA per strategic brief.
  ----------------------------------- --------------------------------------------------------------------------------

END OF DOCUMENT

Hone Studio --- honestudio.cv
