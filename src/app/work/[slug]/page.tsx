import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import TechLines from "@/components/TechLines";
import { CASE_STUDIES } from "@/lib/data";

const PILLAR_COLORS: Record<string, string> = {
  Web: "border-teal/30 text-teal bg-teal-ghost",
  AI: "border-signal/30 text-signal bg-signal-ghost",
  Strategy: "border-indigo/30 text-indigo bg-indigo-ghost",
};

function getStudy(slug: string) {
  return CASE_STUDIES.find((s) => s.slug === slug);
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) return {};

  return {
    title: study.client,
    description: study.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) notFound();

  return (
    <>
      {/* ── Hero (A: snow/ink) ── */}
      <section className="bg-snow dark:bg-ink py-32 px-6 pattern-grid">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <Link
              href="/work"
              className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash transition-colors hover:text-teal"
            >
              <span aria-hidden="true">&larr;</span>
              Back to Work
            </Link>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-mist dark:border-iron px-3 py-1 font-mono text-[11px] text-graphite dark:text-ash">
                {study.platform}
              </span>
              {study.pillars.map((pillar) => (
                <span
                  key={pillar}
                  className={`rounded-full border px-3 py-1 font-mono text-[11px] ${
                    PILLAR_COLORS[pillar] ?? "border-mist dark:border-iron text-graphite dark:text-ash"
                  }`}
                >
                  {pillar}
                </span>
              ))}
            </div>

            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              {study.client}
            </p>
            <h1 className="mt-2 font-display text-4xl text-section-title text-ink dark:text-white md:text-5xl">
              {study.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-section-desc text-graphite dark:text-ash">
              {study.summary}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />

      {/* ── Challenge (B: white/carbon) ── */}
      <section className="bg-white dark:bg-carbon py-24 px-6 pattern-dots">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal" />
              The Challenge
            </p>
            <p className="text-lg leading-relaxed text-graphite dark:text-ash">
              {study.challenge}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider from="carbon" to="ink" lightFrom="white" lightTo="snow" />

      {/* ── Approach (A: snow/ink) ── */}
      <section className="relative bg-snow dark:bg-ink py-24 px-6 pattern-diag">
        <TechLines variant="circuit-trace" className="text-mist dark:text-iron" />
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal" />
              The Approach
            </p>
          </ScrollReveal>

          <div className="mt-8 space-y-6">
            {study.approach.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4">
                  <span className="mt-1 font-mono text-sm text-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-graphite dark:text-ash">{step}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />

      {/* ── Results (B: white/carbon) ── */}
      <section className="bg-white dark:bg-carbon py-24 px-6 pattern-grid">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal" />
              The Results
            </p>
          </ScrollReveal>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {study.results.map((result, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex items-start gap-3 rounded-md border border-cloud dark:border-slate bg-snow dark:bg-ink p-6">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  <p className="text-sm leading-relaxed text-graphite dark:text-ash">
                    {result}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="carbon" to="ink" lightFrom="white" lightTo="snow" />

      {/* ── CTA (A: snow/ink) ── */}
      <section className="bg-snow dark:bg-ink py-24 px-6 pattern-grid">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl text-section-title text-ink dark:text-white md:text-4xl">
            Want results like these?
          </h2>
          <p className="mt-4 text-lg text-graphite dark:text-ash">
            Let&apos;s talk about your project.
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
