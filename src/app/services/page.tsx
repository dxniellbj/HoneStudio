import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import TechLines from "@/components/TechLines";
import Link from "next/link";
import { SERVICE_PILLARS, PROCESS_STEPS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design, AI & automation, and strategy — three pillars, one partner. See how Hone Studio delivers integrated results.",
};

const ACCENT_MAP = {
  teal: {
    number: "text-teal",
    border: "border-teal/20",
    dot: "bg-teal",
    tag: "border-teal/30 text-teal bg-teal-ghost",
  },
  signal: {
    number: "text-signal",
    border: "border-signal/20",
    dot: "bg-signal",
    tag: "border-signal/30 text-signal bg-signal-ghost",
  },
  indigo: {
    number: "text-indigo",
    border: "border-indigo/20",
    dot: "bg-indigo",
    tag: "border-indigo/30 text-indigo bg-indigo-ghost",
  },
} as const;

// Alternating section types: A = snow/ink, B = white/carbon
const SECTION_STYLES = [
  { bg: "bg-white dark:bg-carbon", card: "bg-snow dark:bg-ink", pattern: "pattern-diag" },
  { bg: "bg-snow dark:bg-ink", card: "bg-white dark:bg-carbon", pattern: "pattern-dots" },
  { bg: "bg-white dark:bg-carbon", card: "bg-snow dark:bg-ink", pattern: "pattern-grid" },
] as const;

const DIVIDER_PAIRS = [
  // Hero(A) → Pillar1(B)
  { from: "ink", to: "carbon", lightFrom: "snow", lightTo: "white" },
  // Pillar1(B) → Pillar2(A)
  { from: "carbon", to: "ink", lightFrom: "white", lightTo: "snow" },
  // Pillar2(A) → Pillar3(B)
  { from: "ink", to: "carbon", lightFrom: "snow", lightTo: "white" },
] as const;

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero (A: snow/ink) ── */}
      <section className="bg-snow dark:bg-ink py-32 px-6 pattern-grid">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal" />
              Services
            </p>
            <h1 className="font-display text-5xl text-section-title text-ink dark:text-white md:text-6xl">
              Three Pillars, One Partner
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-section-desc text-graphite dark:text-ash">
              Strategy, systems, and websites that work together — so every
              piece of your business pulls in the same direction.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Pillar Details ── */}
      {SERVICE_PILLARS.map((pillar, i) => {
        const accent = ACCENT_MAP[pillar.accent];
        const style = SECTION_STYLES[i];
        const divider = DIVIDER_PAIRS[i];

        return (
          <div key={pillar.number}>
            <SectionDivider
              from={divider.from}
              to={divider.to}
              lightFrom={divider.lightFrom}
              lightTo={divider.lightTo}
            />
            <section className={`${style.bg} py-24 px-6 ${style.pattern}`}>
              <div className="mx-auto max-w-7xl">
                <div
                  className={`grid grid-cols-1 items-start gap-12 lg:grid-cols-2 ${
                    i % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Text Column */}
                  <ScrollReveal>
                    <p className={`mb-2 font-mono text-sm ${accent.number}`}>
                      {pillar.number}
                    </p>
                    <h2 className="font-display text-3xl text-section-title text-ink dark:text-white md:text-4xl">
                      {pillar.title}
                    </h2>
                    <p className={`mt-2 font-display text-lg italic ${accent.number}`}>
                      {pillar.tagline}
                    </p>
                    <p className="mt-6 text-lg leading-relaxed text-section-desc text-graphite dark:text-ash">
                      {pillar.description}
                    </p>

                    {/* Tool Pills */}
                    <div className="mt-8 flex flex-wrap gap-2">
                      {pillar.tools.map((tool) => (
                        <span
                          key={tool}
                          className={`rounded-full border px-3 py-1 font-mono text-[11px] ${accent.tag}`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </ScrollReveal>

                  {/* Outcomes Column */}
                  <ScrollReveal delay={0.15}>
                    <div className={`rounded-md border border-cloud dark:border-slate p-8 ${style.card}`}>
                      <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
                        What You Get
                      </h3>
                      <ul className="space-y-4">
                        {pillar.outcomes.map((outcome) => (
                          <li key={outcome} className="flex items-start gap-3">
                            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />
                            <span className="text-sm leading-relaxed text-graphite dark:text-ash">
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
          </div>
        );
      })}

      {/* ── Process (A: snow/ink) ── */}
      <SectionDivider from="carbon" to="ink" lightFrom="white" lightTo="snow" />
      <section className="relative bg-snow dark:bg-ink py-24 px-6 pattern-dots">
        <TechLines variant="circuit-trace" className="text-mist dark:text-iron" />
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal" />
              Process
            </p>
            <h2 className="font-display text-4xl text-section-title text-ink dark:text-white md:text-5xl">
              How We Work Together
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-section-desc text-graphite dark:text-ash">
              A clear, repeatable process — so you always know what&apos;s
              happening and what comes next.
            </p>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <div className="rounded-md border border-cloud dark:border-slate bg-white dark:bg-carbon p-8 transition-all duration-300 hover:border-iron">
                  <p className="mb-4 font-mono text-sm text-teal">
                    {step.number}
                  </p>
                  <h3 className="mb-3 font-display text-xl font-medium text-ink dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-section-desc text-graphite dark:text-ash">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />

      {/* ── CTA (B: white/carbon) ── */}
      <section className="bg-white dark:bg-carbon py-24 px-6 pattern-dots">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl text-section-title text-ink dark:text-white md:text-5xl">
            Ready to talk?
          </h2>
          <p className="mt-4 text-lg text-graphite dark:text-ash">
            Let&apos;s figure out where I can make the biggest impact.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-sm bg-teal px-8 py-3 font-mono text-sm uppercase tracking-widest text-ink transition-colors hover:bg-teal-bright"
          >
            Get in Touch
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
