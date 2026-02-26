const PILLARS = [
  {
    number: "01",
    title: "Web Design & Development",
    accent: "teal",
    accentHex: "#00D4AA",
    quote: "Your site should work as hard as you do.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="32" height="24" rx="2" stroke="#00D4AA" />
        <line x1="4" y1="12" x2="36" y2="12" stroke="#00D4AA" />
        <circle cx="8" cy="9" r="1" fill="#00D4AA" />
        <circle cx="12" cy="9" r="1" fill="#00D4AA" />
        <polyline points="12,20 16,24 12,28" stroke="#00D4AA" />
        <line x1="20" y1="28" x2="28" y2="28" stroke="#00D4AA" />
        <line x1="12" y1="34" x2="28" y2="34" stroke="#00D4AA" />
      </svg>
    ),
    description:
      "I build sites around what you're actually trying to do — then maintain them so you never have to think about it.",
    tags: ["Kajabi", "Shopify", "Squarespace", "Custom Apps"],
  },
  {
    number: "02",
    title: "AI & Automation",
    accent: "signal",
    accentHex: "#FF6B3D",
    quote: "Less manual work. More time back.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 4 L36 14 L36 26 L20 36 L4 26 L4 14 Z" stroke="#FF6B3D" />
        <circle cx="20" cy="20" r="6" stroke="#FF6B3D" />
        <line x1="20" y1="14" x2="20" y2="4" stroke="#FF6B3D" />
        <line x1="26" y1="20" x2="36" y2="14" stroke="#FF6B3D" />
        <line x1="20" y1="26" x2="20" y2="36" stroke="#FF6B3D" />
        <line x1="14" y1="20" x2="4" y2="14" stroke="#FF6B3D" />
      </svg>
    ),
    description:
      "Smart workflows, AI tools, and systems that handle the repetitive stuff — so you can spend time on work that actually matters.",
    tags: ["Automation", "CRM", "AI Tools", "Email Flows"],
  },
  {
    number: "03",
    title: "Strategy & Research",
    accent: "indigo",
    accentHex: "#4F5BD5",
    quote: "I make sure we build the right thing.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="16" r="12" stroke="#4F5BD5" />
        <line x1="28" y1="26" x2="36" y2="36" stroke="#4F5BD5" />
        <line x1="14" y1="12" x2="14" y2="20" stroke="#4F5BD5" />
        <line x1="20" y1="10" x2="20" y2="20" stroke="#4F5BD5" />
        <line x1="26" y1="14" x2="26" y2="20" stroke="#4F5BD5" />
        <line x1="10" y1="20" x2="30" y2="20" stroke="#4F5BD5" />
      </svg>
    ),
    description:
      "Competitive intel, audience research, and a strategy you can actually act on — before you spend a dollar.",
    tags: ["Market Research", "Competitive Intel", "Discovery"],
  },
] as const;

import TechLines from "@/components/TechLines";

const ACCENT_MAP: Record<string, { bg: string; text: string; quoteText: string; glow: string }> = {
  teal: { bg: "bg-teal", text: "text-teal", quoteText: "text-teal", glow: "hover:border-teal hover:shadow-[0_0_24px_rgba(0,212,170,0.15)]" },
  signal: { bg: "bg-signal", text: "text-signal", quoteText: "text-signal", glow: "hover:border-signal hover:shadow-[0_0_24px_rgba(255,107,61,0.15)]" },
  indigo: { bg: "bg-indigo", text: "text-indigo", quoteText: "text-indigo", glow: "hover:border-indigo hover:shadow-[0_0_24px_rgba(79,91,213,0.15)]" },
};

export default function ServicePillars() {
  return (
    <section className="relative bg-white dark:bg-carbon py-16 px-6 pattern-grid">
      <TechLines variant="corner-brackets" className="text-cloud dark:text-slate" />
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16">
          <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
            <span className="inline-block h-px w-6 bg-teal" />
            How I Help
          </p>
          <h2 className="font-display text-4xl text-section-title text-ink dark:text-white md:text-5xl">
            Three Pillars, One Partner
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-section-desc text-graphite dark:text-ash">
            Strategy, systems, and your site — working together instead of in three different silos.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {PILLARS.map((pillar) => {
            const accent = ACCENT_MAP[pillar.accent];
            return (
              <div
                key={pillar.title}
                className={`group relative h-full rounded-md border border-cloud dark:border-slate bg-snow dark:bg-ink p-8 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] ${accent.glow}`}
              >
                {/* Colored top accent — absolute positioned for reliable hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 ${accent.bg} rounded-t-md opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                {/* Card Number */}
                <p className="mb-4 font-mono text-sm text-ash dark:text-graphite">{pillar.number}</p>

                {/* Icon */}
                <div className="mb-6">{pillar.icon}</div>

                {/* Title */}
                <h3 className="mb-2 font-display text-xl font-medium text-ink dark:text-white">
                  {pillar.title}
                </h3>

                {/* Signal Quote */}
                <p className={`mb-4 font-display text-sm italic ${accent.quoteText}`}>
                  &ldquo;{pillar.quote}&rdquo;
                </p>

                {/* Description */}
                <p className="mb-6 text-section-desc text-graphite dark:text-ash leading-relaxed">
                  {pillar.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-brand rounded-full border border-mist dark:border-iron font-mono text-graphite dark:text-ash"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
