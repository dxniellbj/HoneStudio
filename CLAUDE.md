# Hone Studio — Project Conventions

## 0. Tooling

**Always activate Serena MCP** at the start of every session:
```
mcp__plugin_serena_serena__activate_project with project: "C:\Users\N\HoneStudio"
```

---

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
| `<NavBar />` | Client | Responsive nav. Solid `dark` bar, cream `Hone.` logo (red dot), mono uppercase links (yellow when active), red CTA. Full-screen mobile menu. |
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

**Theme: Retro Arcade Console** (reskinned 2026-06-02 from the old "Teal Edge" Brand Kit v2).
Single **light** theme on a cream base — **no dark mode, no theme toggle.**
All values map to the Tailwind v4 `@theme` block in `src/styles/globals.css` (there is no separate `tailwind.config.ts`).

### Colors

**Base — Polystyrene Cream**

| Token | Hex | Usage |
|---|---|---|
| `cream` | `#E8E0C8` | page background |
| `beige` | `#D4C9A8` | raised surfaces, cards, stats |
| `shadow` | `#B8A882` | borders, bezel depth |
| `dark` | `#2A2420` | dark surfaces, primary text |
| `darkest` | `#1A1410` | footer, deepest bg |

**Accents — Console Buttons**

| Token | Hex | Usage |
|---|---|---|
| `red` | `#C0392B` | primary CTA, links, primary accent, the `Hone.` dot |
| `red-bright` | `#D84A3A` | hover |
| `red-shadow` | `#7B241C` | pressed-button shadow |
| `blue` | `#2471A3` | secondary / "player 2" |
| `yellow` | `#D4AC0D` | highlight, eyebrows, logo wordmark, active nav |
| `green-pixel` | `#5DBF5D` | terminal text, status dot |
| `green-screen` | `#3D5A3E` | screen bezel |
| `purple` | `#7D3C98` | storytelling accent |
| `orange` | `#CA6F1E` | tertiary accent |

**Status**

| Token | Hex |
|---|---|
| `success` | `#5DBF5D` |
| `warning` | `#D4AC0D` |
| `error` | `#C0392B` |

> Legacy Brand-Kit-v2 names (`teal`, `signal`, `indigo`, `ink`, `snow`, `carbon`, `ash`, …) are still defined in `@theme` but **repointed to retro values** for back-compat. Prefer the canonical retro names above for new work.

### Fonts

| Token | Family | Role |
|---|---|---|
| `font-display` | Space Grotesk | Headlines, hero, logo wordmark |
| `font-body` | Space Grotesk | Body copy, UI, forms |
| `font-mono` | DM Mono | Labels, tags, eyebrows, metadata, terminal |

Self-host both via `next/font/google`. No external stylesheet requests.

### Radii

| Token | Value |
|---|---|
| `radius-sm` | `4px` |
| `radius-md` | `8px` |
| `radius-lg` | `10px` |
| `radius-xl` | `12px` |
| `radius-2xl` | `16px` |

### Retro component classes (in `globals.css`)

`.btn` (+ `--primary` / `--secondary` / `--outline` / `--ghost` / `--lg` / `--sm`), `.card-work`, `.console-widget`, `.marquee-strip`, `.skill-row`, `.testimonial`, `.stats-bar`, `.cta-block`, `.page-footer`, `.status-dot`, `.scanlines`, `.eyebrow`, `.section-label`, `.badge--*`, `.tag--*`.

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
- **Single retro-arcade theme on cream — no dark mode, no theme toggle.** Don't reintroduce `.dark` variants or `ThemeProvider`.
- The dot on "Hone." is **red** (`text-red`) — keep it red; don't revert to teal. The wordmark uses `font-display` (Space Grotesk).
- Lean into the console aesthetic: scanline textures (`.scanlines`), 3D press buttons (`.btn--*`), terminal/console motifs, hard 2–3px bezel borders (`border-shadow`).
- Swiss Army Knife concept in copy/messaging only — never in logo or visual identity
- Illustrations: linework SVG only (1–1.5px strokes), no photos, no full illustrations

### Rendering & Performance
- Default to RSC; only use `"use client"` when the component needs interactivity (per component table above)
- Mobile-first responsive: design at 375px, scale up
- Lazy-load chatbot, code-split below the fold — target < 40KB initial JS for chat
- Self-host fonts via `next/font` — no CLS
- Target Lighthouse 95+

### Images
- **Always compress images** before adding to `public/` — target < 200KB per image
- Use WebP or JPEG for photos, PNG only when transparency is required
- Use `next/image` with `fill` and proper `sizes` attribute for responsive images
- Provide meaningful `alt` text for accessibility
- Store images in organized folders: `public/images/about/`, `public/images/work/`, etc.
- For book covers and thumbnails: max 400px width, compress to < 50KB

### Accessibility
- ARIA roles on all interactive elements
- Keyboard navigation and focus management
- Focus trap in chat panel
- Screen reader announcements for chat messages
- Semantic HTML with proper heading hierarchy
- `prefers-reduced-motion: reduce` — disable all motion, fall back to instant state

### User Feedback
- Always add feedback after user action — loading states, button press animations, navigation indicators
- Show progress indicators during page transitions (top progress bar, loading cursor)
- Buttons should have visible active/pressed states (scale down on click)
- Never leave the user wondering if their action was received

### Content & Messaging
- Pricing: starting-at ("From $X") tags on the three service cards — Custom Software & AI **from $1,500**, Web Builds **from $600**, Strategy & Research **from $300** (standalone; included free with any build). These are one-time project floors; final price is scope-dependent. CTA is still "get in touch" / "book a call" for a real quote.
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
| **Hover states** | Cards lift (`hover:-translate-y-1`) with red accent border; 3D buttons press down via `.btn` |
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
- **Model:** Gemini 2.5 Flash Lite (`gemini-2.5-flash-lite`)
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
