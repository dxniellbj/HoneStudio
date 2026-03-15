import type { QuizQuestion, ServiceDisplay, AudienceDisplay } from "@/types/quiz";

/* ── Quiz Questions (16 questions, ~5 minutes) ── */

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ── Category 1: About You (3 questions) ──
  {
    id: "about-1",
    category: "About You",
    question: "How would you describe your business?",
    options: [
      {
        id: "about-1-a",
        label: "Early-stage startup or new venture (pre-revenue or just launched)",
        scores: { launchPartner: 2 },
      },
      {
        id: "about-1-b",
        label: "Established small business looking to grow",
        scores: { growthPartner: 2 },
      },
      {
        id: "about-1-c",
        label: "Agency or studio that serves clients",
        scores: { backendPartner: 2 },
      },
      {
        id: "about-1-d",
        label: "Solo creator, consultant, or freelancer",
        scores: { launchPartner: 1, growthPartner: 1 },
      },
    ],
  },
  {
    id: "about-2",
    category: "About You",
    question: "What's your team size for ops and tech work?",
    options: [
      {
        id: "about-2-a",
        label: "Just me — I handle everything",
        scores: { launchPartner: 2, ai: 1 },
      },
      {
        id: "about-2-b",
        label: "Small team (2–5 people)",
        scores: { growthPartner: 1 },
      },
      {
        id: "about-2-c",
        label: "Growing team (6–20 people)",
        scores: { growthPartner: 2 },
      },
      {
        id: "about-2-d",
        label: "We outsource most tech/ops work",
        scores: { backendPartner: 2 },
      },
    ],
  },
  {
    id: "about-3",
    category: "About You",
    question: "How do you typically engage with outside help?",
    options: [
      {
        id: "about-3-a",
        label: "One-off projects with a clear deliverable",
        scores: { launchPartner: 1 },
      },
      {
        id: "about-3-b",
        label: "Retainer or ongoing partnership",
        scores: { growthPartner: 2 },
      },
      {
        id: "about-3-c",
        label: "White-label / backend support for my clients",
        scores: { backendPartner: 2 },
      },
      {
        id: "about-3-d",
        label: "Not sure yet — depends on the fit",
        scores: {},
      },
    ],
  },

  // ── Category 2: Current Digital Presence (3 questions) ──
  {
    id: "digital-1",
    category: "Digital Presence",
    question: "What best describes your current website situation?",
    options: [
      {
        id: "digital-1-a",
        label: "No website yet — starting from scratch",
        scores: { web: 3, strategy: 1 },
      },
      {
        id: "digital-1-b",
        label: "Have one, but it's outdated or not working",
        scores: { web: 3 },
      },
      {
        id: "digital-1-c",
        label: "Decent site, but could be better",
        scores: { web: 2 },
      },
      {
        id: "digital-1-d",
        label: "Happy with it — not a priority right now",
        scores: { web: 0 },
      },
    ],
  },
  {
    id: "digital-2",
    category: "Digital Presence",
    question: "What platform is your current site on (if you have one)?",
    options: [
      {
        id: "digital-2-a",
        label: "No site / don't know",
        scores: { web: 1, strategy: 1 },
      },
      {
        id: "digital-2-b",
        label: "WordPress, Wix, or similar DIY builder",
        scores: { web: 2 },
      },
      {
        id: "digital-2-c",
        label: "Squarespace, Kajabi, Shopify, or similar",
        scores: { web: 1 },
      },
      {
        id: "digital-2-d",
        label: "Custom-built (Next.js, React, etc.)",
        scores: { ai: 1 },
      },
    ],
  },
  {
    id: "digital-3",
    category: "Digital Presence",
    question: "How well does your current site convert visitors into leads or customers?",
    options: [
      {
        id: "digital-3-a",
        label: "It doesn't — no clear path to conversion",
        scores: { web: 2, strategy: 2 },
      },
      {
        id: "digital-3-b",
        label: "Some conversions, but could be way better",
        scores: { web: 2, strategy: 1 },
      },
      {
        id: "digital-3-c",
        label: "Converts okay — not my biggest problem",
        scores: { web: 1 },
      },
      {
        id: "digital-3-d",
        label: "Converts great — no issues here",
        scores: {},
      },
    ],
  },

  // ── Category 3: Branding & Identity (3 questions) ──
  {
    id: "brand-1",
    category: "Branding",
    question: "Do you have established brand assets (logo, colors, fonts)?",
    options: [
      {
        id: "brand-1-a",
        label: "Nothing yet — need to build from scratch",
        scores: { strategy: 2, web: 1 },
      },
      {
        id: "brand-1-b",
        label: "Have a logo, but colors/fonts are inconsistent",
        scores: { strategy: 1, web: 1 },
      },
      {
        id: "brand-1-c",
        label: "Have most of it, just needs polish",
        scores: { web: 1 },
      },
      {
        id: "brand-1-d",
        label: "Fully locked in — logo, colors, fonts, the works",
        scores: {},
      },
    ],
  },
  {
    id: "brand-2",
    category: "Branding",
    question: "Do you have documented brand guidelines (tone of voice, messaging, visual rules)?",
    options: [
      {
        id: "brand-2-a",
        label: "No — we wing it",
        scores: { strategy: 2 },
      },
      {
        id: "brand-2-b",
        label: "Informally — it's in my head but not written",
        scores: { strategy: 1 },
      },
      {
        id: "brand-2-c",
        label: "Partial — some things are documented",
        scores: { strategy: 1 },
      },
      {
        id: "brand-2-d",
        label: "Yes — we have a brand guide",
        scores: {},
      },
    ],
  },
  {
    id: "brand-3",
    category: "Branding",
    question: "How consistent is your brand across all touchpoints (website, social, emails)?",
    options: [
      {
        id: "brand-3-a",
        label: "Not consistent at all — it's all over the place",
        scores: { web: 2, strategy: 2 },
      },
      {
        id: "brand-3-b",
        label: "Somewhat — some channels look different",
        scores: { web: 1, strategy: 1 },
      },
      {
        id: "brand-3-c",
        label: "Mostly consistent, with a few gaps",
        scores: { web: 1 },
      },
      {
        id: "brand-3-d",
        label: "Very consistent — everything matches",
        scores: {},
      },
    ],
  },

  // ── Category 4: Operations & Systems (3 questions) ──
  {
    id: "ops-1",
    category: "Operations",
    question: "How much of your daily work involves repetitive tasks (data entry, follow-ups, scheduling)?",
    options: [
      {
        id: "ops-1-a",
        label: "A lot — I'm drowning in repetitive work",
        scores: { ai: 3 },
      },
      {
        id: "ops-1-b",
        label: "Some — there's definitely stuff I could automate",
        scores: { ai: 2 },
      },
      {
        id: "ops-1-c",
        label: "Not much — already pretty streamlined",
        scores: { ai: 1 },
      },
      {
        id: "ops-1-d",
        label: "Very little — our systems handle most of it",
        scores: {},
      },
    ],
  },
  {
    id: "ops-2",
    category: "Operations",
    question: "What tools do you currently use for customer management / CRM?",
    options: [
      {
        id: "ops-2-a",
        label: "Nothing — spreadsheets or manual tracking",
        scores: { ai: 3, strategy: 1 },
      },
      {
        id: "ops-2-b",
        label: "Basic tool (Notion, Airtable, Google Sheets)",
        scores: { ai: 2 },
      },
      {
        id: "ops-2-c",
        label: "Proper CRM (HubSpot, Salesforce, etc.)",
        scores: { ai: 1 },
      },
      {
        id: "ops-2-d",
        label: "Built into our platform (Kajabi, Shopify, etc.)",
        scores: {},
      },
    ],
  },
  {
    id: "ops-3",
    category: "Operations",
    question: "How do you currently handle email marketing and follow-ups?",
    options: [
      {
        id: "ops-3-a",
        label: "Manually — one email at a time",
        scores: { ai: 3 },
      },
      {
        id: "ops-3-b",
        label: "Some automations, but mostly manual",
        scores: { ai: 2 },
      },
      {
        id: "ops-3-c",
        label: "Automated sequences set up and running",
        scores: { ai: 1 },
      },
      {
        id: "ops-3-d",
        label: "Don't do email marketing",
        scores: {},
      },
    ],
  },

  // ── Category 5: Strategy & Direction (2 questions) ──
  {
    id: "strategy-1",
    category: "Strategy",
    question: "How confident are you in your competitive positioning?",
    options: [
      {
        id: "strategy-1-a",
        label: "Not sure — haven't really looked at competitors",
        scores: { strategy: 3 },
      },
      {
        id: "strategy-1-b",
        label: "Know who they are, but unsure how we stack up",
        scores: { strategy: 2 },
      },
      {
        id: "strategy-1-c",
        label: "Fairly confident — we have clear differentiators",
        scores: { strategy: 1 },
      },
      {
        id: "strategy-1-d",
        label: "Very confident — we own our niche",
        scores: {},
      },
    ],
  },
  {
    id: "strategy-2",
    category: "Strategy",
    question: "Do you have a documented roadmap for the next 6–12 months?",
    options: [
      {
        id: "strategy-2-a",
        label: "No — we're figuring it out as we go",
        scores: { strategy: 3 },
      },
      {
        id: "strategy-2-b",
        label: "Rough idea, but nothing written down",
        scores: { strategy: 2 },
      },
      {
        id: "strategy-2-c",
        label: "High-level plan, but details are fuzzy",
        scores: { strategy: 1 },
      },
      {
        id: "strategy-2-d",
        label: "Yes — clear roadmap with milestones",
        scores: {},
      },
    ],
  },

  // ── Category 6: Goals & Timeline (2 questions) ──
  {
    id: "goals-1",
    category: "Goals",
    question: "What's your primary goal for the next 3 months?",
    options: [
      {
        id: "goals-1-a",
        label: "Launch something new (site, product, offer)",
        scores: { web: 2, strategy: 1 },
      },
      {
        id: "goals-1-b",
        label: "Grow revenue or leads",
        scores: { web: 1, ai: 1, strategy: 1 },
      },
      {
        id: "goals-1-c",
        label: "Save time and streamline operations",
        scores: { ai: 2 },
      },
      {
        id: "goals-1-d",
        label: "Figure out strategy and direction",
        scores: { strategy: 2 },
      },
    ],
  },
  {
    id: "goals-2",
    category: "Goals",
    question: "How soon do you want to start?",
    options: [
      {
        id: "goals-2-a",
        label: "ASAP — ready to go now",
        urgency: "high",
        scores: {},
      },
      {
        id: "goals-2-b",
        label: "Next month or two",
        urgency: "medium",
        scores: {},
      },
      {
        id: "goals-2-c",
        label: "Q2 / Q3 this year",
        urgency: "low",
        scores: {},
      },
      {
        id: "goals-2-d",
        label: "Just exploring for now",
        urgency: "exploring",
        scores: {},
      },
    ],
  },
];

/* ── Service Display Data ── */

export const SERVICE_DISPLAY: Record<"web" | "ai" | "strategy", ServiceDisplay> = {
  web: {
    key: "web",
    title: "Web Design & Development",
    accent: "teal",
    tagline: "Sites that work as hard as you do.",
    description:
      "Most sites look fine but don't actually do anything. You need a site built around what you're trying to accomplish — whether that's bookings, sales, or just getting people to pick up the phone.",
    outcomes: [
      "A site that converts, not just looks pretty",
      "Consistent brand experience across every page",
      "Built to grow with your business",
      "No more scrambling to fix broken things",
    ],
  },
  ai: {
    key: "ai",
    title: "AI & Automation",
    accent: "signal",
    tagline: "Stop doing the robot's job.",
    description:
      "You're spending hours on things that should take minutes. Workflows, AI tools, and systems that handle the repetitive work — so you can focus on the stuff only you can do.",
    outcomes: [
      "Get hours back every week",
      "Fewer mistakes from manual data entry",
      "Customers get faster responses (without you typing)",
      "Systems that get smarter the more you use them",
    ],
  },
  strategy: {
    key: "strategy",
    title: "Strategy & Research",
    accent: "indigo",
    tagline: "Build the right thing the first time.",
    description:
      "Before you spend money building something, you should know it's worth building. Competitive research, audience analysis, and strategic planning that tells you what to build and why.",
    outcomes: [
      "Know exactly where you stand vs. competitors",
      "Decisions backed by data, not hunches",
      "A roadmap your whole team can follow",
      "Confidence that you're building the right thing",
    ],
  },
};

/* ── Audience Display Data ── */

export const AUDIENCE_DISPLAY: Record<
  "launchPartner" | "growthPartner" | "backendPartner",
  AudienceDisplay
> = {
  launchPartner: {
    key: "launchPartner",
    title: "Launch Partner",
    subtitle: "For Founders & Creators",
    description:
      "You're building something new and need a partner who can move fast without cutting corners. Someone who gets the startup mindset and can wear multiple hats.",
    engagement:
      "Project-based work with clear deliverables. Get what you need, when you need it — no long-term commitment required.",
  },
  growthPartner: {
    key: "growthPartner",
    title: "Growth Partner",
    subtitle: "For Small & Mid-Size Businesses",
    description:
      "You've got traction and need someone who can help you scale without adding overhead. Ongoing support that grows with you.",
    engagement:
      "Retainer-based partnership. Predictable monthly support with priorities that flex as your business evolves.",
  },
  backendPartner: {
    key: "backendPartner",
    title: "Backend Partner",
    subtitle: "For Agencies & Studios",
    description:
      "You need reliable backend support so you can focus on client relationships. White-label work that makes you look good.",
    engagement:
      "White-label execution. I work behind the scenes so you can deliver more to your clients without expanding your team.",
  },
};

/* ── Quiz Categories for Progress Display ── */

export const QUIZ_CATEGORIES = [
  "About You",
  "Digital Presence",
  "Branding",
  "Operations",
  "Strategy",
  "Goals",
] as const;

export const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;
