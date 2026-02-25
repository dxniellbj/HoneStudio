# Hone Studio — Project Conventions

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Firebase Hosting · Gemini API
**Domain:** honestudio.cv / honestudio.co
**One-liner:** Fractional ops & tech partner — strategy, systems, and websites with zero overhead.

---

## 1. File & Folder Naming

| Type | Convention | Example |
|---|---|---|
| Folders | `kebab-case` | `case-studies/`, `chat-widget/` |
| Component files | `PascalCase.tsx` | `NavBar.tsx`, `ChatWidget.tsx` |
| Non-component files | `kebab-case.ts` | `gemini-client.ts`, `firestore.ts` |
| Route segments | `kebab-case` (match PRD sitemap) | `/work/[slug]` |
| Config files | Standard names | `tailwind.config.ts`, `firebase.json` |
| MDX case studies | `kebab-case.mdx` (match URL slug) | `showcase-ventures.mdx` |

---

## 2. Directory Structure

```
src/
  app/                → routes (/, /services, /work, /work/[slug], /about, /contact)
  components/         → shared UI components
  components/chat/    → Honest AI widget components
  lib/                → utilities (gemini-client, firestore, rate-limit)
  lib/animations.ts   → shared Framer Motion variants
  content/            → MDX case studies
  styles/             → global CSS if needed (gradient keyframes, base resets)
public/               → static assets, OG images
```

---

## 3. Component Naming

Exact names from PRD Section 9. Do not rename.

| Component | Type | Description |
|---|---|---|
| `<NavBar />` | RSC | Responsive nav. Logo, links, contact CTA. Transparent on hero, solid on scroll. |
| `<Hero />` | RSC | Full-width hero. SAK value prop headline, subtitle, CTA. |
| `<ServicePillars />` | RSC | Three pillar cards. Linework icons, outcome copy, platform tags. Integrated feel. |
| `<AudienceFunnel />` | Client | "I work with..." interactive cards. Founders / SMBs / Agencies. |
| `<CaseStudyCard />` | RSC | Card with client, platform badge, pillar tags, thumbnail. |
| `<ContactForm />` | Client | Form with validation, Firestore submission, success state, honeypot. |
| `<ChatWidget />` | Client | Honest AI. Floating button, panel, streaming Gemini responses, quick prompts. |
| `<ChatMessage />` | Client | Message bubble. Markdown links, bold, inline formatting. |
| `<Footer />` | RSC | Logo, nav links, email, legal. |

---

## 4. Design Token Naming

All values sourced from the Brand Kit v2. Map to `tailwind.config.ts`.

### Colors

**Primary — Teal Edge**

| Token | Hex | Usage |
|---|---|---|
| `teal` | `#00D4AA` | CTAs, links, chatbot, primary accent |
| `teal-bright` | `#1AEDC2` | Hover states, highlights |
| `teal-mid` | `#00B892` | Secondary teal |
| `teal-dark` | `#009E7B` | Dark backgrounds, on-light dot |
| `teal-deep` | `#007A5F` | Deepest teal |
| `teal-ghost` | `rgba(0,212,170,0.08)` | Transparent fills, ghost backgrounds |
| `teal-glow` | `rgba(0,212,170,0.15)` | Glow effects, hover overlays |

**Secondary — Service Accents**

| Token | Hex | Usage |
|---|---|---|
| `signal` | `#FF6B3D` | AI & Automation pillar accent |
| `signal-dim` | `#E05A30` | Dimmed signal |
| `signal-ghost` | `rgba(255,107,61,0.08)` | Signal transparent fill |
| `indigo` | `#4F5BD5` | Strategy pillar accent |
| `indigo-dim` | `#3D49B8` | Dimmed indigo |
| `indigo-ghost` | `rgba(79,91,213,0.08)` | Indigo transparent fill |

**Neutrals**

| Token | Hex |
|---|---|
| `ink` | `#0F1114` |
| `carbon` | `#181B20` |
| `slate` | `#22262D` |
| `iron` | `#363B44` |
| `graphite` | `#5A6069` |
| `ash` | `#8A9099` |
| `fog` | `#B3B8C0` |
| `mist` | `#D6D9DE` |
| `cloud` | `#ECEEF1` |
| `snow` | `#F6F7F9` |
| `white` | `#FFFFFF` |

**Status**

| Token | Hex |
|---|---|
| `success` | `#34D399` |
| `warning` | `#FBBF24` |
| `error` | `#F87171` |

### Fonts

| Token | Family | Role |
|---|---|---|
| `font-display` | Fraunces | Headlines, hero, logo |
| `font-body` | DM Sans | Body copy, UI, forms |
| `font-mono` | Space Mono | Labels, tags, metadata, code |

Self-host all three via `next/font/google`. No external stylesheet requests.

### Radii

| Token | Value |
|---|---|
| `radius-sm` | `6px` |
| `radius-md` | `10px` |
| `radius-lg` | `16px` |

---

## 5. TypeScript Conventions

- **Interfaces:** `PascalCase` with descriptive names — `CaseStudy`, `ChatMessage`, `ContactFormData`
- **Props types:** `ComponentNameProps` — `HeroProps`, `ChatWidgetProps`
- **Enums:** Avoid. Use `as const` objects instead.
- **Hooks:** `use` prefix, camelCase — `useChat`, `useContactForm`
- **Constants:** `SCREAMING_SNAKE_CASE` for env-derived values, `camelCase` for local

---

## 6. Behavioral Rules

### Brand Identity
- Never hardcode brand colors — always use Tailwind tokens
- Swiss Army Knife concept in copy/messaging only — never in logo or visual identity
- Teal dot on "Hone." is sacred — never remove or recolor
- Illustrations: linework SVG only (1–1.5px strokes), no photos, no full illustrations

### Rendering & Performance
- Default to RSC; only use `"use client"` when the component needs interactivity (per component table above)
- Mobile-first responsive: design at 375px, scale up
- Lazy-load chatbot, code-split below the fold — target < 40KB initial JS for chat
- Self-host fonts via `next/font` — no CLS
- Target Lighthouse 95+

### Accessibility
- ARIA roles on all interactive elements
- Keyboard navigation and focus management
- Focus trap in chat panel
- Screen reader announcements for chat messages
- Semantic HTML with proper heading hierarchy
- `prefers-reduced-motion: reduce` — disable all motion, fall back to instant state

### Content & Messaging
- No pricing on site — CTA is always "get in touch" / "book a call"
- Frame services as outcomes, not deliverables
- Cross-sell through case studies, not nav
- Tone of voice: direct not aggressive, expert not pretentious, warm not casual, clear not oversimplified

### Copywriting Voice

**Banned patterns** — these read as AI-generated or TED-talk performative:
- "No X, no Y, just Z" constructions
- "move the needle", "pixel-perfect", "seamless", "cutting-edge", "holistic"
- TED-talk callbacks ("That's the job.", "That's how X works.")
- Empty doubling ("real projects, real outcomes")
- Tricolon slogans used repeatedly ("X. Y. Z." as a rhythm crutch)

**Rules:**
- Write like you're talking to one person, not presenting to a room
- Sell the experience of working together, not a list of services
- If it sounds like a slide deck, rewrite it
- Contractions are fine — they sound human
- Don't over-explain. Trust the reader.
- CTAs should sound like something you'd actually say out loud

---

## 7. Animation System

Library: **Framer Motion** (`motion` from `framer-motion`)

### Core Patterns

| Pattern | Implementation |
|---|---|
| **Scroll reveal** | Fade + slide up on viewport entry via `whileInView` |
| **Staggered children** | Cards/list items animate in sequence — `staggerChildren: 0.08–0.12s` |
| **Spring easing** | `type: "spring"`, `stiffness: 100`, `damping: 20` — organic feel, not linear |
| **Page transitions** | Fade between routes using layout animations |
| **Hero entrance** | Staggered fade-up: pill → wordmark → subtitle → CTA |
| **Parallax** | Subtle background shift on scroll for hero/dark sections (< 20% movement) |
| **Hover states** | Scale `1.02–1.05` with spring transition on cards; teal glow on interactive elements |
| **Text reveal** | Word-by-word or line-by-line on headlines via `variants` + `staggerChildren` |
| **Number counters** | Animate stats/metrics counting up on scroll entry |
| **Gradient shifts** | Subtle animated radial gradients on hero/dark sections (CSS `@keyframes` for performance) |
| **Chatbot panel** | Spring open/close — `y: 20, opacity: 0` → `y: 0, opacity: 1` |

### Performance Rules

- Animate only `transform` and `opacity` (GPU-composited, no layout thrash)
- Use `will-change` sparingly — only on elements about to animate
- Hero animations load immediately (above fold); everything else triggers on scroll
- Lazy-load Framer Motion components below the fold

### Naming & Organization

- Variant names: descriptive (`fadeUp`, `staggerContainer`, `slideInLeft`, `scaleIn`)
- Single source of truth: `src/lib/animations.ts` for all reusable motion variants

---

## 8. Honest AI Rules

- **Name:** Honest AI
- **Model:** Gemini 2.0 Flash
- **API route:** `POST /api/chat` — streaming via `generateContentStream`
- **Rate limit:** 20 req/min/IP
- When unsure, say so honestly
- 2–4 sentence default responses; expand only if asked
- Always frame offering as integrated, never siloed
- Page-aware context — adjust greeting and suggestions based on current route
- Nudge to contact page naturally, not pushy
- Session memory — don't repeat information already discussed
- Quick prompts on first load: "What do you do?" / "Show me your work" / "How do I get in touch?"

---

## 9. Git & Workflow

- **Branch naming:** `feature/short-description`, `fix/short-description`
- **Commits:** conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
- **No force pushes to main**
