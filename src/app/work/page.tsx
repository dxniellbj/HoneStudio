import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import WorkGrid from "@/components/WorkGrid";
import Link from "next/link";
import { NOTABLE_MENTIONS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects from Hone Studio — real work, real outcomes across web, AI, and strategy.",
};

export default function WorkPage() {
  return (
    <>
      {/* ── Hero (A: snow/ink) ── */}
      <section className="bg-snow dark:bg-ink py-32 px-6 pattern-grid">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal" />
              Portfolio
            </p>
            <h1 className="font-display text-5xl text-section-title text-ink dark:text-white md:text-6xl">
              Selected Work
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-section-desc text-graphite dark:text-ash">
              Real projects, real outcomes. Here&apos;s what integrated ops and
              tech looks like in practice.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />

      {/* ── Filter + Grid (B: white/carbon) ── */}
      <section className="bg-white dark:bg-carbon py-24 px-6 pattern-dots">
        <div className="mx-auto max-w-7xl">
          <WorkGrid />
        </div>
      </section>

      <SectionDivider from="carbon" to="ink" lightFrom="white" lightTo="snow" />

      {/* ── Notable Mentions (A: snow/ink) ── */}
      <section className="bg-snow dark:bg-ink py-24 px-6 pattern-diag">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal" />
              Also Worked With
            </p>
          </ScrollReveal>

          <div className="mt-8 space-y-4">
            {NOTABLE_MENTIONS.map((mention, i) => (
              <ScrollReveal key={mention.client} delay={i * 0.08}>
                <div className="flex items-start justify-between gap-6 rounded-md border border-cloud dark:border-slate bg-white dark:bg-carbon p-6 transition-all duration-300 hover:border-teal">
                  <div>
                    <a
                      href={mention.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-lg font-medium text-ink dark:text-white transition-colors hover:text-teal"
                    >
                      {mention.client}
                      <span className="ml-2 text-xs text-ash">&nearr;</span>
                    </a>
                    <p className="mt-2 text-sm leading-relaxed text-graphite dark:text-ash">
                      {mention.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {mention.pillars.map((pillar) => (
                      <span
                        key={pillar}
                        className={`rounded-full border px-3 py-1 font-mono text-[11px] ${
                          pillar === "Web"
                            ? "border-teal/30 text-teal bg-teal-ghost"
                            : pillar === "AI"
                              ? "border-signal/30 text-signal bg-signal-ghost"
                              : "border-indigo/30 text-indigo bg-indigo-ghost"
                        }`}
                      >
                        {pillar}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />

      {/* ── CTA (A: snow/ink) ── */}
      <section className="bg-snow dark:bg-ink py-24 px-6 pattern-grid">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl text-section-title text-ink dark:text-white md:text-5xl">
            Got a project in mind?
          </h2>
          <p className="mt-4 text-lg text-graphite dark:text-ash">
            Let&apos;s talk about what you&apos;re building.
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
