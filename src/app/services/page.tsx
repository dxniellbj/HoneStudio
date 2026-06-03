import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import TechLines from "@/components/TechLines";
import Toolkit from "@/components/Toolkit";
import ArcadeCabinet from "@/components/ArcadeCabinet";
import Link from "next/link";
import { SERVICE_PILLARS, PROCESS_STEPS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software and AI tools, web builds, and the strategy behind them. Built by one developer who works out what your business needs first.",
  keywords: [
    "custom software development",
    "AI tools",
    "internal tools",
    "Next.js development",
    "web design services",
    "Kajabi development",
    "Shopify development",
    "automation",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Hone Studio",
    description:
      "Custom software and AI tools, web builds, and the strategy behind them. Built by one developer who works out what your business needs first.",
    url: "https://honestudio.cv/services",

  },
  twitter: {
    title: "Services | Hone Studio",
    description:
      "Custom software and AI tools, web builds, and the strategy behind them. Built by one developer who works out what your business needs first.",
  },
};

// Map legacy pillar accent keys to retro palette colors
const ACCENT_MAP = {
  teal: {
    number: "text-red",
    dot: "bg-red",
    tag: "border-red/40 text-red bg-red/5",
    hover: "hover:border-red",
  },
  signal: {
    number: "text-orange",
    dot: "bg-orange",
    tag: "border-orange/40 text-orange bg-orange/5",
    hover: "hover:border-orange",
  },
  indigo: {
    number: "text-blue",
    dot: "bg-blue",
    tag: "border-blue/40 text-blue bg-blue/5",
    hover: "hover:border-blue",
  },
} as const;

// Alternating section patterns for the retro single theme
const SECTION_PATTERNS = ["pattern-diag", "pattern-dots", "pattern-grid"] as const;

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-cream min-h-dvh flex items-center px-6 pt-24 md:pt-28 pattern-grid border-b-[3px] border-shadow">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-[1fr_420px] md:gap-16">
          <ScrollReveal>
            <p className="eyebrow mb-4 flex items-center gap-2">
              <span className="inline-block h-px w-6 bg-red" />
              Services
            </p>
            <h1 className="font-display text-5xl font-extrabold tracking-[-0.02em] text-dark md:text-6xl">
              What I Build
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-light text-dark/65">
              Most of what I do is custom software: internal tools, AI pipelines, and web apps for teams that need something built and have no developer to build it.
            </p>
            <p className="mt-4 max-w-2xl text-lg font-light text-dark/65">
              I build websites too, and I plan every project before I touch the code. Here&apos;s what each of those looks like in practice.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-dark/45">
              Starting prices — final number depends on scope
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="order-first md:order-none">
            <ArcadeCabinet
              marquee="Hone · Services"
              screen="menu"
              items={["Software & AI", "Web Builds", "Strategy"]}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Pillar Details ── */}
      {SERVICE_PILLARS.map((pillar, i) => {
        const accent = ACCENT_MAP[pillar.accent];
        const pattern = SECTION_PATTERNS[i % SECTION_PATTERNS.length];

        return (
          <section
            key={pillar.number}
            className={`bg-cream py-16 px-6 ${pattern} border-b-[3px] border-shadow`}
          >
            <div className="mx-auto max-w-7xl">
              <div
                className={`grid grid-cols-1 items-start gap-12 lg:grid-cols-2 ${
                  i % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Text Column */}
                <ScrollReveal>
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <p className={`font-mono text-sm ${accent.number}`}>{pillar.number}</p>
                    <span
                      className={`rounded-sm border border-current px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide ${accent.number}`}
                    >
                      {pillar.price}
                    </span>
                    {pillar.priceNote && (
                      <span className="font-mono text-[10px] uppercase tracking-wide text-dark/45">
                        {pillar.priceNote}
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-3xl font-extrabold tracking-[-0.02em] text-dark md:text-4xl">
                    {pillar.title}
                  </h2>
                  <p className={`mt-2 font-display text-lg italic ${accent.number}`}>
                    {pillar.tagline}
                  </p>
                  <p className="mt-6 text-lg font-light leading-relaxed text-dark/65">
                    {pillar.description}
                  </p>

                  {/* Tool Pills */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {pillar.tools.map((tool) => (
                      <span
                        key={tool}
                        className={`rounded-sm border px-3 py-1 font-mono text-[11px] uppercase tracking-wide ${accent.tag}`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </ScrollReveal>

                {/* Outcomes Column */}
                <ScrollReveal delay={0.15}>
                  <div
                    className={`rounded-lg border-2 border-shadow bg-beige p-8 transition-all duration-300 ${accent.hover}`}
                  >
                    <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-dark/50">
                      What You Get
                    </h3>
                    <ul className="space-y-4">
                      {pillar.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-3">
                          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />
                          <span className="text-sm leading-relaxed text-dark/65">
                            {outcome}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Process ── */}
      <section className="relative bg-cream py-16 px-6 pattern-dots border-b-[3px] border-shadow">
        <TechLines variant="circuit-trace" className="text-shadow/60" />
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="eyebrow mb-4 flex items-center gap-2">
              <span className="inline-block h-px w-6 bg-red" />
              Process
            </p>
            <h2 className="font-display text-4xl font-extrabold tracking-[-0.02em] text-dark md:text-5xl">
              How This Works
            </h2>
            <p className="mt-4 max-w-2xl text-lg font-light text-dark/65">
              No 12-step onboarding gauntlet. Here&apos;s what actually happens:
            </p>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1} className="h-full">
                <div className="h-full rounded-lg border-2 border-shadow bg-beige p-8 transition-all duration-300 hover:-translate-y-1 hover:border-red">
                  <p className="mb-4 font-mono text-sm text-red">
                    {step.number}
                  </p>
                  <h3 className="mb-3 font-display text-xl font-bold text-dark">
                    {step.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-dark/65">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Toolkit ── */}
      <Toolkit />

      {/* ── CTA — retro block ── */}
      <section className="cta-block">
        <div>
          <h2 className="cta-block__text">
            Let&apos;s figure out what you actually need.{" "}
            <span className="cta-block__text--accent">Game on.</span>
          </h2>
          <p className="cta-block__sub">
            Plenty of projects start as &ldquo;I think we need a website&rdquo; and turn into something far more useful once we dig in. Tell me what&apos;s going on and I&apos;ll tell you where I&apos;d start.
          </p>
        </div>
        <Link href="/contact" className="btn btn--primary btn--lg">
          Book a call
        </Link>
      </section>
    </>
  );
}
