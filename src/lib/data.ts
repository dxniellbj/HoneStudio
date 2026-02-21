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
  scope: string[];
  techStack: string[];
  keyFeatures: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "From WordPress to a Scalable Education Platform",
    client: "Shan Fisher Education",
    platform: "Kajabi",
    pillars: ["Web", "AI", "Strategy"],
    summary:
      "Migrated a photography education business from WordPress to Kajabi — moved all courses, built offers, and set up full automation including email sequences.",
    slug: "shan-fisher-education",
    challenge:
      "Shan Fisher Education is a photography business that had outgrown their WordPress setup. Courses were hard to manage, there was no automation in place, and scaling meant hitting a wall with every new launch. They needed a platform that could handle course delivery, payments, and marketing in one place.",
    approach: [
      "Audited the existing WordPress site and mapped all courses, content, and student data for migration",
      "Migrated the full course library to Kajabi — including videos, resources, and student access",
      "Built offers, landing pages, and checkout flows optimized for conversion",
      "Set up full automation — email sequences, onboarding flows, and post-purchase nurture campaigns",
    ],
    results: [
      "Complete migration from WordPress to Kajabi with zero downtime",
      "All courses, offers, and student data successfully moved to one platform",
      "Automated email sequences replaced hours of manual follow-up",
      "Scalable foundation for launching new courses and offers without rework",
    ],
    scope: [
      "Platform migration (WordPress → Kajabi)",
      "Course library setup & content migration",
      "Offer & checkout flow design",
      "Email automation & onboarding sequences",
    ],
    techStack: ["Kajabi", "WordPress", "HTML", "CSS", "JavaScript"],
    keyFeatures: [
      "Full course library with video hosting and resource downloads",
      "Optimized offers with landing pages and checkout flows",
      "Automated email sequences for onboarding, nurture, and post-purchase",
      "Student access management and progress tracking",
    ],
  },
  {
    title: "Building an Academy for an Award-Winning Photographer",
    client: "Elena Givone Academy",
    platform: "Squarespace",
    pillars: ["Web", "Strategy"],
    summary:
      "Helped internationally recognized photographer Elena Givone launch her academy — initially on Kajabi for digital courses, then transitioned to Squarespace as her focus shifted to physical workshops.",
    slug: "elena-givone-academy",
    challenge:
      "Elena Givone — an award-winning Italian photographer, Fujifilm X-Photographer, and Elinchrom ambassador — wanted to start offering education to fellow photographers. She needed a platform to launch courses, but as her vision evolved toward in-person workshops between Italy and Sri Lanka, the setup had to adapt with her.",
    approach: [
      "Built the initial academy on Kajabi with course structure, content hosting, and checkout flows",
      "As Elena's focus shifted from digital courses to physical workshops, re-evaluated the platform needs",
      "Transitioned the academy to Squarespace — better suited for workshop listings, event-based content, and her visual brand",
      "Designed the site to showcase her portfolio, published books, and upcoming workshop schedule",
    ],
    results: [
      "Academy launched and operational, giving Elena a professional home for her education offering",
      "Smooth transition from Kajabi to Squarespace without losing momentum",
      "Platform now aligned with her workshop-first model — easy to update events and listings",
      "Site reflects Elena's international brand across photography, education, and social projects",
    ],
    scope: [
      "Academy platform setup (Kajabi, then Squarespace)",
      "Course structure & content hosting",
      "Website design aligned to visual brand",
      "Workshop listings & event management",
    ],
    techStack: ["Squarespace", "Kajabi", "HTML", "CSS", "JavaScript"],
    keyFeatures: [
      "Portfolio showcase for photography, books, and social projects",
      "Workshop schedule with event-based listings",
      "Course structure for digital education content",
      "Brand-consistent design reflecting Elena's international presence",
    ],
  },
  {
    title: "AI-Powered Deal Sourcing for a Media & Consumer VC",
    client: "Showcase Ventures",
    platform: "Next.js + Firebase + Gemini",
    pillars: ["AI", "Strategy"],
    summary:
      "Built Spotlight and Spyglass — two internal tools that use AI-powered enrichment, multi-source web scraping, and real-time collaboration to transform how a VC firm sources and researches deals.",
    slug: "showcase-ventures",
    challenge:
      "Showcase Ventures invests in Seed and Series A/B media and consumer companies — music, entertainment, film, digital media, beauty, hospitality, and more. Researching potential investments meant hours of manual Googling, scattered notes, and no structured way to enrich, grade, or track companies across the team.",
    approach: [
      "Built Spotlight — a full investment sourcing platform with AI-powered company enrichment using Gemini, multi-source web scraping via Bright Data, and real-time Firestore collaboration",
      "Designed a multi-phase enrichment pipeline: domain discovery, content scraping, AI analysis, social link extraction, and follower count retrieval — all with consensus scoring for data quality",
      "Built hierarchical theme management with drag-and-drop, an interactive dashboard with ROI tracking, and a brand extractor for bulk CSV imports",
      "Built Spyglass — a retail intelligence hub where analysts upload store walk photos and Gemini AI automatically detects every brand and SKU on the shelf, enriches with manufacturer data via web search, and visualizes findings on an interactive map",
    ],
    results: [
      "Company research that took hours now happens in seconds through automated AI enrichment",
      "Multi-source validation ensures data quality — no single point of failure",
      "Real-time collaboration lets the full investment team see enriched data instantly",
      "Structured grading and pipeline tracking replaced scattered notes and spreadsheets",
    ],
    scope: [
      "Spotlight — investment sourcing platform",
      "Spyglass — retail intelligence hub",
      "AI enrichment pipeline design",
      "Real-time collaborative data infrastructure",
    ],
    techStack: [
      "Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "ShadCN UI",
      "Firebase Firestore", "Firebase Auth", "Firebase Storage", "Firebase Cloud Functions",
      "Google Genkit", "Gemini AI", "Bright Data", "Perplexity API",
      "Google Maps API", "Google PSE", "Recharts",
    ],
    keyFeatures: [
      "Multi-phase AI enrichment: domain discovery → web scraping → AI analysis → social data → consensus scoring",
      "Four concurrent background processing queues for parallel enrichment",
      "Hierarchical theme/folder management with drag-and-drop organization",
      "Interactive dashboard with ROI tracking and sourcing grade distribution",
      "Brand extractor for bulk CSV imports with automated domain discovery",
      "Store walk photo analysis — Gemini AI detects every brand and SKU on retail shelves",
      "Two-pass retail enrichment with Google Search grounding for manufacturer data",
      "Interactive Google Maps view with intelligent markers per store location",
      "A/B/C/D company grading system with pipeline tracking",
      "Real-time Firestore listeners — all users see data updates instantly",
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

// ── Notable Mentions (smaller projects) ──

export interface NotableMention {
  client: string;
  url: string;
  description: string;
  pillars: readonly string[];
}

export const NOTABLE_MENTIONS: NotableMention[] = [
  {
    client: "Lanelit",
    url: "https://lanelit.com",
    description:
      "Redesigned the website and set up email replays for Allison Lane's book coaching and visibility strategy practice.",
    pillars: ["Web", "AI"],
  },
];

// ── Filter Options ──

export const PILLAR_FILTERS = ["All", "Web", "AI", "Strategy"] as const;
export type PillarFilter = (typeof PILLAR_FILTERS)[number];
