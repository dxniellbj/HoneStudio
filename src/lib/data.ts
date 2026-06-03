/* ── Shared Data — Single Source of Truth ── */

// ── Case Studies ──

export interface CaseStudyImage {
  src: string;
  alt: string;
  cols?: number;   // out of 12 — defaults to 12 (full width)
  bg?: string;     // hex background to match image edges
  caption?: string; // visible text below the image
}

export interface CaseStudyStat {
  label: string;
  value: string;
}

export interface CaseStudy {
  title: string;
  client: string;
  platform: string;
  pillars: readonly string[];
  summary: string;
  slug: string;
  url?: string;
  thumbnail?: string;
  thumbnailBg?: string;
  thumbVariant?: "red" | "blue" | "yellow" | "green" | "purple";
  thumbLabel?: string;
  images?: CaseStudyImage[];
  stats?: CaseStudyStat[];
  challenge: string;
  approach: string[];
  results: string[];
  scope: string[];
  techStack: string[];
  keyFeatures: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "An AI deal-sourcing platform that runs itself",
    client: "Media & Consumer VC",
    platform: "Next.js + Firebase + Gemini",
    pillars: ["AI", "Web", "Strategy"],
    summary:
      "An investment team was sourcing companies by hand: Googling, copy-pasting into spreadsheets, and still missing most of the market. I designed and built two internal tools that find, enrich, score, and track companies automatically. The team now runs around 1,000 companies a week through a live pipeline instead of burning 10 to 20 hours on manual research.",
    slug: "vc-deal-sourcing",
    thumbnail: "/images/work/vc-deal-sourcing/Platform - Hero.png",
    thumbnailBg: "#2c2f21",
    thumbVariant: "red",
    thumbLabel: "VC.AI",
    images: [
      {
        src: "/images/work/vc-deal-sourcing/Platform - Interface.png",
        alt: "Sourcing platform company enrichment table",
        bg: "#2c2f21",
        caption: "Enter a company name and website. AI enrichment handles the rest: description, social links, follower counts, sourcing grades, and more.",
      },
      {
        src: "/images/work/vc-deal-sourcing/Platform - Analytics.png",
        alt: "Sourcing platform analytics dashboard showing ROI and sourcing metrics",
        bg: "#2c2f21",
      },
    ],
    stats: [
      { label: "Companies / Week", value: "~1,000" },
      { label: "Hours Eliminated / Year", value: "13,000+" },
      { label: "Companies Processed", value: "8,800+" },
      { label: "Cost / 1K Companies", value: "$10–15" },
    ],
    challenge:
      "The client is an early-stage VC firm focused on media and consumer: music, entertainment, film, digital media, beauty, hospitality, and more. As a lean team without enterprise tooling, researching a potential investment meant hours of manual Googling, scattered notes, and no structured way to enrich, grade, or track companies at scale. The work cost 10 to 20 hours a week and still missed most of the market.",
    approach: [
      "Started with the real bottleneck: every company had to be researched by hand. I built a sourcing platform where the team enters a name and a website, and the system does the rest.",
      "Designed the enrichment pipeline in phases: domain discovery, web scraping, AI analysis, social data extraction, and follower counts. Each phase validates against multiple sources, so nothing rests on a single data point.",
      "Built the tools the team needed around it: theme-based organization with drag-and-drop, a grading system, bulk CSV imports, and a real-time dashboard tracking ROI and pipeline health.",
      "Added a second tool for retail intelligence. Analysts photograph store shelves, AI identifies every brand and SKU on sight, then enriches each with manufacturer data and plots it on a map.",
    ],
    results: [
      "Around 1,000 companies enriched per week at $10 to $15 in API costs, work that would take a full team more than 250 hours.",
      "13,000+ hours of manual research eliminated per year, roughly the output of six full-time analysts.",
      "8,800+ companies sourced, enriched, and graded in the system to date.",
      "The deal pipeline went from scattered notes and spreadsheets to a structured, searchable platform the whole team uses daily.",
      "Enriched company data now shows up in real time. Research that used to take hours is ready in seconds.",
    ],
    scope: [
      "Sourcing platform for investment deal flow",
      "Retail intelligence hub",
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
      "Multi-phase AI enrichment: domain discovery, web scraping, AI analysis, social data, consensus scoring",
      "Four concurrent background processing queues for parallel enrichment",
      "Hierarchical theme and folder management with drag-and-drop organization",
      "Interactive dashboard with ROI tracking and sourcing grade distribution",
      "Brand extractor for bulk CSV imports with automated domain discovery",
      "Store-walk photo analysis: AI detects every brand and SKU on retail shelves",
      "Two-pass retail enrichment with Google Search grounding for manufacturer data",
      "Interactive Google Maps view with intelligent markers per store location",
      "A/B/C/D company grading system with pipeline tracking",
      "Real-time Firestore listeners, so every user sees data updates instantly",
    ],
  },
  {
    title: "From a maxed-out WordPress site to a six-figure education platform",
    client: "Shan Fisher Education",
    platform: "Kajabi",
    pillars: ["Web", "Strategy"],
    summary:
      "Shan's photography education business had outgrown WordPress. Courses were scattered across platforms, automations didn't exist, and every launch was a manual scramble. I migrated everything to Kajabi: courses, offers, and email sequences. The business has since done six figures in gross revenue on the platform.",
    slug: "shan-fisher-education",
    url: "https://academy.shanfishereducation.com",
    thumbnail: "/images/work/shan-fisher-education/SFE - Hero.png",
    thumbnailBg: "#e8e8e8",
    thumbVariant: "blue",
    thumbLabel: "SFE",
    images: [
      {
        src: "/images/work/shan-fisher-education/SFE - Hero.png",
        alt: "Shan Fisher Education Kajabi site homepage",
      },
      {
        src: "/images/work/shan-fisher-education/SFE - Analytics.png",
        alt: "Kajabi analytics dashboard showing revenue and subscription metrics",
        cols: 8,
        bg: "#f8f8f8",
      },
      {
        src: "/images/work/shan-fisher-education/SFE - Gross Revenue.png",
        alt: "Gross revenue: £50,151 GBP and $28,124 USD all time",
        cols: 4,
        bg: "#f5f5f5",
      },
    ],
    stats: [
      { label: "Net Revenue", value: "$86,000+" },
      { label: "Contacts", value: "13,800+" },
      { label: "Subs / Month", value: "35" },
      { label: "MRR", value: "$518" },
    ],
    challenge:
      "Shan Fisher Education is a photography business that had outgrown its WordPress setup. Courses were hard to manage, there was no automation in place, and scaling meant hitting a wall with every new launch. They needed a platform that could handle course delivery, payments, and marketing in one place.",
    approach: [
      "Audited the existing WordPress site and mapped every course, asset, and student record for migration.",
      "Migrated the full course library to Kajabi, including videos, resources, and student access.",
      "Built offers, landing pages, and checkout flows designed to convert.",
      "Set up the automation: email sequences, onboarding flows, and post-purchase nurture campaigns.",
      "Stayed on for ongoing maintenance and new course builds as the business grew.",
    ],
    results: [
      "Complete migration from WordPress to Kajabi with zero downtime.",
      "All courses, offers, and student data moved onto one platform.",
      "Automated email sequences replaced hours of manual follow-up.",
      "Six figures in gross revenue on the platform, with a foundation that launches new courses without a rebuild.",
      "An ongoing partnership, with new courses and offers added without outside help.",
    ],
    scope: [
      "Platform migration (WordPress to Kajabi)",
      "Course library setup and content migration",
      "Offer and checkout flow design",
      "Email automation and onboarding sequences",
      "Ongoing maintenance and new course launches",
    ],
    techStack: ["Kajabi", "WordPress", "ManyChat", "HTML", "CSS", "JavaScript"],
    keyFeatures: [
      "Full course library with video hosting and resource downloads",
      "Optimized offers with landing pages and checkout flows",
      "Automated email sequences for onboarding, nurture, and post-purchase",
      "Student access management and progress tracking",
    ],
  },
  {
    title: "An academy that moved with the photographer behind it",
    client: "Elena Givone Academy",
    platform: "Squarespace",
    pillars: ["Web", "Strategy"],
    summary:
      "Elena is an internationally recognized photographer who wanted to teach. I helped her launch her academy, first on Kajabi for digital courses, then moved it to Squarespace when her focus shifted to in-person workshops. The platform bent to fit the business, not the other way around.",
    slug: "elena-givone-academy",
    thumbnail: "/images/work/elena-givone-academy/EGA - Hero.png",
    thumbnailBg: "#e8ddd3",
    thumbVariant: "yellow",
    thumbLabel: "EGA",
    url: "https://elenagivoneacademy.com",
    challenge:
      "Elena Givone is an award-winning Italian photographer, a Fujifilm X-Photographer, and an Elinchrom ambassador who wanted to start teaching fellow photographers. She needed a platform to launch courses, but as her vision moved toward in-person workshops between Italy and Sri Lanka, the setup had to move with her.",
    approach: [
      "Built the initial academy on Kajabi with course structure, content hosting, and checkout flows.",
      "Re-evaluated the platform as Elena's focus shifted from digital courses to physical workshops.",
      "Moved the academy to Squarespace, a better fit for workshop listings, event-based content, and her visual brand.",
      "Designed the site to showcase her portfolio, published books, and upcoming workshop schedule.",
    ],
    results: [
      "Academy launched and operational, giving Elena a professional home for her education offering.",
      "Smooth transition from Kajabi to Squarespace without losing momentum.",
      "Platform now aligned with her workshop-first model, easy to update events and listings.",
      "Site reflects Elena's international brand across photography, education, and social projects.",
    ],
    scope: [
      "Academy platform setup (Kajabi, then Squarespace)",
      "Course structure and content hosting",
      "Website design aligned to visual brand",
      "Workshop listings and event management",
    ],
    techStack: ["Squarespace", "Kajabi", "HTML", "CSS", "JavaScript"],
    keyFeatures: [
      "Portfolio showcase for photography, books, and social projects",
      "Workshop schedule with event-based listings",
      "Course structure for digital education content",
      "Brand-consistent design reflecting Elena's international presence",
    ],
  },
];

// ── Service Pillars ──

export interface ServicePillar {
  number: string;
  title: string;
  accent: "teal" | "signal" | "indigo";
  /** Starting-at price tag, e.g. "From $1,500" or "Custom". */
  price: string;
  /** Optional caption under the price, e.g. "Included with any build". */
  priceNote?: string;
  tagline: string;
  description: string;
  outcomes: string[];
  tools: string[];
}

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    number: "01",
    title: "Custom Software & AI Tools",
    accent: "teal",
    price: "From $1,500",
    tagline: "The tool you need doesn't exist yet? I'll build it.",
    description:
      "You've got a process living in spreadsheets and someone's head, or a product idea that needs real engineering, and nobody on payroll to build it. That's me. I make web apps, internal tools, AI pipelines, and the integrations that finally get your stack talking to itself. For one investment team, I built a two-tool platform that now sources and enriches around 1,000 companies a week on its own. I reach for Next.js, Firebase, and Gemini when they fit. What matters is the tool doing the job, not the logo on it.",
    outcomes: [
      "A tool shaped around how your team actually works, not a SaaS you contort yourself to fit",
      "The manual research, data entry, and copy-paste grind runs itself",
      "AI doing real work inside your pipeline, not a chatbot bolted on for show",
      "One person owns the whole build, so nothing falls through the cracks between brief and ship",
    ],
    tools: ["Next.js", "Firebase", "Gemini", "TypeScript", "API Integrations"],
  },
  {
    number: "02",
    title: "Web Builds",
    accent: "signal",
    price: "From $600",
    tagline: "Need a site? I build those too.",
    description:
      "Maybe you don't need custom software. You need a site that loads fast, looks right, and turns visitors into bookings or sales. I build on Kajabi, Shopify, Squarespace, Webflow, or a custom Next.js front end, chosen around what your business actually has to do. Because I work out the business case before the design, the sites tend to convert instead of just sitting there. And once it's live, I keep it running.",
    outcomes: [
      "Built around one clear goal: more bookings, more sales, more inquiries",
      "The platform fits your business, not whichever one I happen to like this month",
      "Fast, accessible, and ready to grow when you are",
      "I maintain it after launch, so the contact form never quietly dies at 2 AM",
    ],
    tools: ["Kajabi", "Shopify", "Squarespace", "Webflow", "Next.js"],
  },
  {
    number: "03",
    title: "Strategy & Research",
    accent: "indigo",
    price: "From $300",
    priceNote: "Included with any build",
    tagline: "I want to know what we're building before I build it.",
    description:
      "Before I open a code editor, I want to know what we're making and why. That means competitive research, audience mapping, and a plan you can act on, not a strategy doc you file and forget. It's built into every project I take on, and you can also book it on its own — an audit, a discovery sprint, a competitive read — when the thinking is the part you actually need.",
    outcomes: [
      "A clear read on where you stand against the competitors that actually matter",
      "A plan tied to what gets built, not a 40-page deck collecting dust",
      "Scope decided on purpose, so the budget lands where it counts",
      "Decisions backed by research instead of a gut feeling",
    ],
    tools: ["Competitive Research", "Audience Mapping", "Discovery", "Audits"],
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
      "We get on a call and I learn how your business really runs: where the time goes, what you've already tried, and what a win looks like. You leave with my honest read on whether this is even worth building.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "I map the work before touching code: what gets built, in what order, what 'done' means, and a timeline. You sign off on the plan and the scope, so no surprise invoices show up later.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "I design and ship in focused sprints, usually one to two weeks each. You see working software at the end of every cycle and can course-correct while it's still cheap to change.",
  },
  {
    number: "04",
    title: "Refine",
    description:
      "After launch I watch how it performs and fix what the real world surfaces. The goal isn't to call it done. It's to keep it working as your business changes.",
  },
];

// ── Notable Mentions (smaller projects) ──

export interface NotableMention {
  client: string;
  url?: string;
  description: string;
  pillars: readonly string[];
  defunct?: boolean;
}

export const NOTABLE_MENTIONS: NotableMention[] = [
  // ── Active (ordered by size & impact) ──
  {
    client: "Sharni Quinn Wellness",
    url: "https://sharniquinn.com",
    description:
      "Kajabi site for an international wellness coach covering coaching programs, corporate wellness, yoga retreats, and travel consulting. Consolidated several offerings onto one platform.",
    pillars: ["Web", "Strategy"],
  },
  {
    client: "The Wellness Agency Africa",
    url: "https://thewellnessagency.africa",
    description:
      "Kajabi site for an Africa-focused wellness tourism consultancy connecting hotels and corporates with 500+ wellness professionals.",
    pillars: ["Web", "Strategy"],
  },
  {
    client: "The Host Approach",
    url: "https://thehostapproach.com",
    description:
      "Kajabi site, offers, and email automations for a vacation-rental coaching business that helps BnB hosts build direct-booking strategies.",
    pillars: ["Web", "AI"],
  },
  {
    client: "Allison Lane Literary",
    url: "https://lanelit.com",
    description:
      "Kajabi redesign and email automations for a book-coaching firm that helps experts write, publish, and launch books.",
    pillars: ["Web", "AI"],
  },
  {
    client: "Fabulous Dentistry",
    url: "https://fabulousdentistry.com",
    description:
      "WordPress site for a dental practice.",
    pillars: ["Web"],
  },
  {
    client: "Supreme Garden Herbs",
    url: "https://supremegardenherbs.com",
    description:
      "Shopify store for a farm-to-consumer beauty brand selling handcrafted, plant-based haircare and skincare.",
    pillars: ["Web"],
  },
  {
    client: "Courage 2 Transform",
    url: "https://courage2transform.com",
    description:
      "Squarespace site for a certified life and health coach offering coaching, art-therapy resources, and a membership community.",
    pillars: ["Web", "Strategy"],
  },
  {
    client: "KA Energetics",
    url: "https://kaenergetics.com",
    description:
      "Website for a healing and wellness practice.",
    pillars: ["Web"],
  },
  ];

// ── Filter Options ──

export const PILLAR_FILTERS = ["All", "Web", "AI", "Strategy"] as const;
export type PillarFilter = (typeof PILLAR_FILTERS)[number];

// ── Testimonials ──

export interface Testimonial {
  name: string;
  quote: string;
  rating: number;
  /** Optional context line shown under the name (project, platform, etc.) */
  detail?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Brian W.",
    detail: "VC + AI software",
    quote:
      "I couldn't have launched my business without Daniell. He excelled at strategy, research, creative execution, and building the technology to streamline operations. Hard working, reliable, a great communicator. Can't wait to work with him again.",
    rating: 5,
  },
  {
    name: "Sharni Q.",
    detail: "WordPress → Kajabi migration",
    quote:
      "Daniell migrated my WordPress site to Kajabi on a tight deadline and set it all up properly. My monthly traffic is up 4,500% since the move, and I never would have hit my deadlines without him.",
    rating: 5,
  },
  {
    name: "Sylvia O.",
    detail: "Shopify build",
    quote:
      "Daniell took the time to understand my vision and turned it into a clean, functional site that represents my brand perfectly. He was responsive, open to feedback, and made the whole thing stress-free. Now I have a platform I'm proud to share with my customers.",
    rating: 5,
  },
  {
    name: "Shan F.",
    detail: "Worked together since 2023",
    quote:
      "Daniell is talented, knowledgeable, and patient, with a positive attitude that lifts the whole team. Anyone who works with him quickly sees why he's so valuable.",
    rating: 5,
  },
];
