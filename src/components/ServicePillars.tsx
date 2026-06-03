const PILLARS = [
  {
    number: "01",
    title: "Custom Software & AI Tools",
    accent: "red",
    accentHex: "#C0392B",
    price: "From $1,500",
    quote: "The tool you need doesn't exist yet? Good. I'll build it.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="32" height="24" rx="2" stroke="#C0392B" />
        <line x1="4" y1="12" x2="36" y2="12" stroke="#C0392B" />
        <circle cx="8" cy="9" r="1" fill="#C0392B" />
        <circle cx="12" cy="9" r="1" fill="#C0392B" />
        <polyline points="12,20 16,24 12,28" stroke="#C0392B" />
        <line x1="20" y1="28" x2="28" y2="28" stroke="#C0392B" />
        <line x1="12" y1="34" x2="28" y2="34" stroke="#C0392B" />
      </svg>
    ),
    description:
      "Internal tools, AI pipelines, and web apps for teams with no developer to spare. I built a deal-sourcing platform that now runs about 1,000 companies a week without anyone touching it.",
    tags: ["Next.js", "Firebase", "Gemini", "Internal Tools"],
  },
  {
    number: "02",
    title: "Web Builds",
    accent: "blue",
    accentHex: "#2471A3",
    price: "From $600",
    quote: "A site that earns its keep, not one that just sits there looking pretty.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="7" width="32" height="26" rx="2" stroke="#2471A3" />
        <line x1="4" y1="14" x2="36" y2="14" stroke="#2471A3" />
        <rect x="8" y="19" width="10" height="10" rx="1" stroke="#2471A3" />
        <line x1="22" y1="20" x2="32" y2="20" stroke="#2471A3" />
        <line x1="22" y1="24" x2="32" y2="24" stroke="#2471A3" />
        <line x1="22" y1="28" x2="28" y2="28" stroke="#2471A3" />
      </svg>
    ),
    description:
      "Kajabi, Shopify, Squarespace, Webflow, or fully custom. I work out what the site has to do for your business first, then build the platform that pulls it off.",
    tags: ["Kajabi", "Shopify", "Squarespace", "Webflow"],
  },
  {
    number: "03",
    title: "Strategy & Research",
    accent: "purple",
    accentHex: "#7D3C98",
    price: "From $300",
    quote: "I figure out what to build before I build it.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="16" r="12" stroke="#7D3C98" />
        <line x1="28" y1="26" x2="36" y2="36" stroke="#7D3C98" />
        <line x1="14" y1="12" x2="14" y2="20" stroke="#7D3C98" />
        <line x1="20" y1="10" x2="20" y2="20" stroke="#7D3C98" />
        <line x1="26" y1="14" x2="26" y2="20" stroke="#7D3C98" />
        <line x1="10" y1="20" x2="30" y2="20" stroke="#7D3C98" />
      </svg>
    ),
    description:
      "Competitive research, audience mapping, and a plan you can actually run with. Built into every project, or book it on its own when the thinking is all you need.",
    tags: ["Competitive Research", "Audience Mapping", "Discovery"],
  },
] as const;

import TechLines from "@/components/TechLines";

const ACCENT_MAP: Record<string, { bar: string; text: string; glow: string }> = {
  red: { bar: "bg-red", text: "text-red", glow: "hover:border-red hover:shadow-[0_0_24px_rgba(192,57,43,0.18)]" },
  blue: { bar: "bg-blue", text: "text-blue", glow: "hover:border-blue hover:shadow-[0_0_24px_rgba(36,113,163,0.18)]" },
  purple: { bar: "bg-purple", text: "text-purple", glow: "hover:border-purple hover:shadow-[0_0_24px_rgba(125,60,152,0.18)]" },
};

export default function ServicePillars() {
  return (
    <section className="relative bg-cream py-16 px-6 pattern-grid border-b-[3px] border-shadow">
      <TechLines variant="corner-brackets" className="text-shadow/60" />
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16">
          <p className="eyebrow mb-4 flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-red" />
            What I Build
          </p>
          <h2 className="font-display text-4xl font-extrabold tracking-[-0.02em] text-dark md:text-5xl">
            Software, and the thinking that makes it work
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-light text-dark/65">
            Most of what I make is custom software and AI tools. I build sites too. And I figure out the whole plan first, so we build the right thing instead of guessing at it.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {PILLARS.map((pillar) => {
            const accent = ACCENT_MAP[pillar.accent];
            return (
              <div
                key={pillar.title}
                className={`group relative h-full overflow-hidden rounded-lg border-2 border-shadow bg-beige p-8 transition-all duration-300 hover:-translate-y-1 ${accent.glow}`}
              >
                {/* Colored top accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${accent.bar} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                {/* Card Number + price */}
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-mono text-sm text-dark/40">{pillar.number}</p>
                  <span
                    className={`rounded-sm border border-current px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide ${accent.text}`}
                  >
                    {pillar.price}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-6">{pillar.icon}</div>

                {/* Title */}
                <h3 className="mb-2 font-display text-xl font-bold text-dark">
                  {pillar.title}
                </h3>

                {/* Signal Quote */}
                <p className={`mb-4 font-display text-sm italic ${accent.text}`}>
                  &ldquo;{pillar.quote}&rdquo;
                </p>

                {/* Description */}
                <p className="mb-6 font-light leading-relaxed text-dark/65">
                  {pillar.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-brand rounded-sm border border-shadow font-mono uppercase text-dark/60"
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
