/* ── Shared Data — Single Source of Truth ── */

// ── Case Studies ──

export interface CaseStudy {
  title: string;
  client: string;
  platform: string;
  pillars: readonly string[];
  summary: string;
  slug: string;
  challenge: string;
  approach: string[];
  results: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "A Learning Platform That Matches the Teaching",
    client: "Shan Fisher Education",
    platform: "Kajabi",
    pillars: ["Web", "Strategy"],
    summary:
      "Redesigned and rebuilt a Kajabi-based education platform to match a premium teaching brand — streamlined course delivery, improved UX, and boosted enrollment conversions.",
    slug: "shan-fisher-education",
    challenge:
      "Shan Fisher had built a loyal following through premium coaching, but the Kajabi site didn't reflect the quality of the teaching. Course navigation was confusing, enrollment drop-off was high, and the brand felt inconsistent across pages.",
    approach: [
      "Audited the existing platform to map every friction point in the student journey",
      "Redesigned the course catalog and individual course pages for clarity and conversion",
      "Built a cohesive visual system — typography, color, and layout — that matched the premium teaching brand",
      "Streamlined the checkout flow to reduce steps and eliminate ambiguity",
    ],
    results: [
      "Enrollment conversions increased significantly after relaunch",
      "Students reported a clearer, more intuitive learning experience",
      "Brand consistency across all pages and touchpoints",
      "Reduced support tickets related to navigation and access issues",
    ],
  },
  {
    title: "From Scattered Content to Scalable Academy",
    client: "Elena Givone Academy",
    platform: "Kajabi",
    pillars: ["Web", "Strategy"],
    summary:
      "Transformed a growing coaching business into a structured online academy — unified branding, clear course pathways, and automated student onboarding.",
    slug: "elena-givone-academy",
    challenge:
      "Elena had multiple courses, memberships, and resources scattered across different tools. Students didn't know where to start, onboarding was manual, and the brand lacked a unified home.",
    approach: [
      "Mapped all existing content and organized it into clear learning pathways",
      "Designed and built a unified academy hub on Kajabi with intuitive navigation",
      "Created automated onboarding sequences — welcome emails, progress tracking, and nudges",
      "Established brand guidelines and applied them consistently across the platform",
    ],
    results: [
      "All content unified under a single, branded academy experience",
      "Automated onboarding replaced hours of manual student setup",
      "Clear course pathways improved student completion rates",
      "Scalable foundation ready for new courses without rework",
    ],
  },
  {
    title: "A Digital Home for a Venture Collective",
    client: "Showcase Ventures",
    platform: "Squarespace + Firebase",
    pillars: ["Web", "AI", "Strategy"],
    summary:
      "Built a dynamic portfolio site for a venture collective — featuring AI-powered search, real-time deal tracking, and an investor-facing dashboard.",
    slug: "showcase-ventures",
    challenge:
      "Showcase Ventures needed a public-facing site that doubled as an operational tool. The portfolio was managed in spreadsheets, investors had no self-serve access to deal information, and there was no way to search or filter the portfolio intelligently.",
    approach: [
      "Designed a clean, investor-grade portfolio site on Squarespace for the public front",
      "Built a Firebase-backed data layer for real-time deal tracking and portfolio management",
      "Integrated AI-powered search so investors could query the portfolio in natural language",
      "Created a private dashboard for the team to manage deals, update statuses, and track metrics",
    ],
    results: [
      "Investors can self-serve portfolio information without requesting updates",
      "AI search reduced time-to-answer for portfolio queries from hours to seconds",
      "The team replaced spreadsheet tracking with a purpose-built dashboard",
      "Public site established Showcase Ventures' digital credibility with LPs",
    ],
  },
];

// ── Service Pillars ──

export interface ServicePillar {
  number: string;
  title: string;
  accent: "teal" | "signal" | "indigo";
  tagline: string;
  description: string;
  outcomes: string[];
  tools: string[];
}

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    number: "01",
    title: "Web Design & Development",
    accent: "teal",
    tagline: "Your digital presence, built to convert.",
    description:
      "Pixel-perfect sites designed around your goals, built to scale, and maintained so you never think about it. From landing pages to full platforms — every detail serves a purpose.",
    outcomes: [
      "Higher conversion rates through intentional UX",
      "Consistent brand experience across every page",
      "A site that scales with your business",
      "Zero maintenance headaches",
    ],
    tools: ["Kajabi", "Shopify", "Squarespace", "Next.js", "Custom Apps"],
  },
  {
    number: "02",
    title: "AI & Automation",
    accent: "signal",
    tagline: "Your business, running itself.",
    description:
      "Automate the busywork — smart workflows, AI-powered tools, and systems that run while you sleep. Free up your time to focus on the work that actually moves the needle.",
    outcomes: [
      "Hours reclaimed from manual, repetitive tasks",
      "Fewer errors with automated quality checks",
      "Faster customer response times",
      "Systems that learn and improve over time",
    ],
    tools: ["Automation", "CRM", "AI Tools", "Email Flows", "Chatbots"],
  },
  {
    number: "03",
    title: "Strategy & Research",
    accent: "indigo",
    tagline: "Build the right thing, the first time.",
    description:
      "Know your market before you move — competitive intel, audience research, and strategy that drives decisions. No guesswork, no wasted budget, just clarity.",
    outcomes: [
      "Clear understanding of your competitive landscape",
      "Data-backed decisions instead of assumptions",
      "A roadmap that aligns team and budget",
      "Confidence in what to build and why",
    ],
    tools: ["Market Research", "Competitive Intel", "Discovery", "Audits"],
  },
];

// ── Process Steps ──

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start with listening. I learn your business, your goals, your constraints — and identify the biggest opportunities to move the needle.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "A clear plan emerges. We align on priorities, define what success looks like, and map out the work — no ambiguity, no scope creep.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Execution with precision. I design, develop, and integrate — shipping in focused sprints with regular check-ins so nothing goes sideways.",
  },
  {
    number: "04",
    title: "Refine",
    description:
      "Launch is just the beginning. We measure, learn, and iterate — making sure what we built keeps working as your business evolves.",
  },
];

// ── Filter Options ──

export const PILLAR_FILTERS = ["All", "Web", "AI", "Strategy"] as const;
export type PillarFilter = (typeof PILLAR_FILTERS)[number];
