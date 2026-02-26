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
    title: "From WordPress to a Scalable Education Platform",
    client: "Shan Fisher Education",
    platform: "Kajabi",
    pillars: ["Web", "AI", "Strategy"],
    summary:
      "Migrated a photography education business from WordPress to Kajabi — moved all courses, built offers, and set up full automation including email sequences.",
    slug: "shan-fisher-education",
    url: "https://academy.shanfishereducation.com",
    thumbnail: "/images/work/shan-fisher-education/SFE - Hero.png",
    thumbnailBg: "#e8e8e8",
    images: [
      {
        src: "/images/work/shan-fisher-education/SFE - Hero.png",
        alt: "Shan Fisher Education — Kajabi site homepage",
      },
      {
        src: "/images/work/shan-fisher-education/SFE - Analytics.png",
        alt: "Kajabi analytics dashboard showing revenue and subscription metrics",
        cols: 8,
        bg: "#f8f8f8",
      },
      {
        src: "/images/work/shan-fisher-education/SFE - Gross Revenue.png",
        alt: "Gross revenue — £50,151 GBP and $28,124 USD all time",
        cols: 4,
        bg: "#f5f5f5",
      },
    ],
    stats: [
      { label: "Net Revenue", value: "£67,986" },
      { label: "Contacts", value: "13,800+" },
      { label: "Subs / Month", value: "35" },
      { label: "MRR", value: "£408" },
    ],
    challenge:
      "Shan Fisher Education is a photography business that had outgrown their WordPress setup. Courses were hard to manage, there was no automation in place, and scaling meant hitting a wall with every new launch. They needed a platform that could handle course delivery, payments, and marketing in one place.",
    approach: [
      "Audited the existing WordPress site and mapped all courses, content, and student data for migration",
      "Migrated the full course library to Kajabi — including videos, resources, and student access",
      "Built offers, landing pages, and checkout flows optimized for conversion",
      "Set up full automation — email sequences, onboarding flows, and post-purchase nurture campaigns",
      "Continued with ongoing maintenance and building out new course offerings as the business grew",
    ],
    results: [
      "Complete migration from WordPress to Kajabi with zero downtime",
      "All courses, offers, and student data successfully moved to one platform",
      "Automated email sequences replaced hours of manual follow-up",
      "Scalable foundation for launching new courses and offers without rework",
      "Ongoing partnership — new courses and offers added without needing outside help",
    ],
    scope: [
      "Platform migration (WordPress → Kajabi)",
      "Course library setup & content migration",
      "Offer & checkout flow design",
      "Email automation & onboarding sequences",
      "Ongoing maintenance & new course launches",
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
    title: "Building an Academy for an Award-Winning Photographer",
    client: "Elena Givone Academy",
    platform: "Squarespace",
    pillars: ["Web", "Strategy"],
    summary:
      "Helped internationally recognized photographer Elena Givone launch her academy — initially on Kajabi for digital courses, then transitioned to Squarespace as her focus shifted to physical workshops.",
    slug: "elena-givone-academy",
    thumbnail: "/images/work/elena-givone-academy/EGA - Hero.png",
    thumbnailBg: "#e8ddd3",
    url: "https://elenagivoneacademy.com",
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
    thumbnail: "/images/work/showcase-ventures/Spotlight - Hero.png",
    thumbnailBg: "#2c2f21",
    images: [
      {
        src: "/images/work/showcase-ventures/Spotlight - Interface.png",
        alt: "Spotlight company enrichment table",
        bg: "#2c2f21",
        caption: "Enter a company name and website — AI enrichment handles the rest: description, social links, follower counts, sourcing grades, and more.",
      },
      {
        src: "/images/work/showcase-ventures/Spotlight - Analytics.png",
        alt: "Spotlight analytics dashboard showing ROI and sourcing metrics",
        bg: "#2c2f21",
      },
    ],
    stats: [
      { label: "Companies / Week", value: "~1,000" },
      { label: "Hours Saved / Week", value: "250+" },
      { label: "Days Saved / Year", value: "1,625" },
      { label: "Cost / 1K Companies", value: "$10–15" },
    ],
    challenge:
      "Showcase Ventures is a startup VC firm focused on media and consumer — music, entertainment, film, digital media, beauty, hospitality, and more. As a lean team without enterprise tooling, researching potential investments meant hours of manual Googling, scattered notes, and no structured way to enrich, grade, or track companies at scale.",
    approach: [
      "Started with the core problem: the team was spending hours manually researching every company. Built Spotlight to let them enter a name and website, then let AI do the rest",
      "Designed the enrichment pipeline in phases — domain discovery, web scraping, AI analysis, social data extraction, and follower counts — each validating against multiple sources so nothing relies on a single data point",
      "Added the tools the team needed around it: theme-based organization with drag-and-drop, a grading system, bulk CSV imports, and a real-time dashboard tracking ROI and pipeline health",
      "Built Spyglass as a second tool for retail intelligence — analysts photograph store shelves, Gemini AI identifies every brand and SKU on sight, then enriches each with manufacturer data and maps it all geographically",
    ],
    results: [
      "~1,000 companies enriched per week at $10–15 in API costs — work that would take a full team 250+ hours done automatically",
      "13,000+ hours of manual research eliminated per year — the equivalent of six full-time analysts",
      "8,851 companies sourced, enriched, and graded in the system to date",
      "Deal pipeline went from scattered notes and spreadsheets to a structured, searchable platform the whole team uses daily",
      "Investment team now sees enriched company data in real time — research that used to take hours is ready in seconds",
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
    tagline: "Sites that actually work for you.",
    description:
      "I design and build sites around what you're trying to accomplish — then maintain them so you never have to think about it. Landing pages, full platforms, whatever the project calls for.",
    outcomes: [
      "Better conversion through design that's actually thought through",
      "A brand experience that holds up across every page",
      "A site that scales with your business",
      "Zero maintenance headaches",
    ],
    tools: ["Kajabi", "Shopify", "Squarespace", "Next.js", "Custom Apps"],
  },
  {
    number: "02",
    title: "AI & Automation",
    accent: "signal",
    tagline: "Less busywork. More leverage.",
    description:
      "Smart workflows, AI tools, and systems that handle the repetitive stuff — so you can spend your time on work that actually matters.",
    outcomes: [
      "Hours back from tasks you shouldn't be doing manually",
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
    tagline: "Know what you're building before you build it.",
    description:
      "Competitive intel, audience research, and a strategy you can actually act on. Know what you're building and why before you spend a dollar.",
    outcomes: [
      "Clear picture of your competitive landscape",
      "Decisions based on data, not gut feelings",
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
      "I learn your business — the goals, the constraints, where things are stuck. We figure out where the biggest wins are.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "We align on priorities, define what success looks like, and map out exactly what gets built. Everyone knows what's happening and when.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "I design, build, and ship in focused sprints. You get regular check-ins so there are never any surprises.",
  },
  {
    number: "04",
    title: "Refine",
    description:
      "After launch, we measure what's working and adjust. The goal is making sure everything keeps performing as your business grows.",
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
      "Kajabi site for an international wellness coach and speaker offering women's coaching, corporate wellness programs, yoga retreats, and wellness travel consulting.",
    pillars: ["Web"],
  },
  {
    client: "Cape Town Wellness Travel Alliance",
    url: "https://ctwta.com",
    description:
      "Kajabi site for an Africa-focused wellness tourism consultancy and talent agency connecting hotels, lodges, and corporate clients with a network of 500+ wellness professionals.",
    pillars: ["Web"],
  },
  {
    client: "The Host Approach",
    url: "https://thehostapproach.com",
    description:
      "Kajabi site, offer structure, and email automations for a vacation rental coaching business that helps BnB hosts build direct booking strategies.",
    pillars: ["Web", "AI"],
  },
  {
    client: "Allison Lane Literary",
    url: "https://lanelit.com",
    description:
      "Kajabi redesign and email automations for a book coaching and visibility strategy firm that helps experts write, publish, and launch books.",
    pillars: ["Web", "AI"],
  },
  {
    client: "Fabulous Dentistry",
    url: "https://fabulousdentistry.com",
    description:
      "WordPress site for a Houston-based dental practice offering cosmetic, general, and sedation dentistry with a spa-like patient experience.",
    pillars: ["Web"],
  },
  {
    client: "Supreme Garden Herbs",
    url: "https://supremegardenherbs.com",
    description:
      "Shopify store for a farm-to-consumer beauty brand selling handcrafted, plant-based haircare and skincare products.",
    pillars: ["Web"],
  },
  {
    client: "Courage 2 Transform",
    url: "https://courage2transform.com",
    description:
      "Squarespace site for an internationally certified life and health coach offering one-on-one coaching, art therapy resources, and a membership community.",
    pillars: ["Web"],
  },
  {
    client: "KA Energetics",
    url: "https://kaenergetics.com",
    description:
      "Website for a healing and coaching practice offering energy work, quantum healing sessions, group meditation, and a transformational cohort program.",
    pillars: ["Web"],
  },
  // ── Defunct (ordered by size & impact) ──
  {
    client: "Go 2 Media & Marketing",
    description:
      "Kajabi platform for a social media marketing and virtual assistant agency that connected clients with VAs and provided training programs.",
    pillars: ["Web"],
    defunct: true,
  },
  {
    client: "Black Fox Natural Cosmetics",
    description:
      "Shopify store for a men's skincare and haircare brand.",
    pillars: ["Web"],
    defunct: true,
  },
  {
    client: "DSG Drone Productions",
    description:
      "WordPress site for a drone photography and videography production company.",
    pillars: ["Web"],
    defunct: true,
  },
];

// ── Filter Options ──

export const PILLAR_FILTERS = ["All", "Web", "AI", "Strategy"] as const;
export type PillarFilter = (typeof PILLAR_FILTERS)[number];
