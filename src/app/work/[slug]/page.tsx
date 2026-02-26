import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import TechLines from "@/components/TechLines";
import { CASE_STUDIES } from "@/lib/data";

const COL_SPAN: Record<number, string> = {
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  12: "md:col-span-12",
};

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

  // Find other case studies for navigation
  const others = CASE_STUDIES.filter((s) => s.slug !== slug);

  return (
    <>
      {/* ── Hero (A: snow/ink) ── */}
      <section className="bg-snow dark:bg-ink py-20 px-6 pattern-grid">
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

            {study.url && (
              <a
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-teal transition-colors hover:text-teal-bright"
              >
                Visit Site
                <svg className="ml-1.5 inline-block h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" />
                </svg>
              </a>
            )}
          </ScrollReveal>

          {/* Hero Image */}
          {study.images && study.images.length > 0 && (
            <ScrollReveal delay={0.1}>
              <figure className="mt-10">
                <div
                  className="overflow-hidden rounded-md border border-cloud dark:border-slate"
                  style={study.images[0].bg ? { backgroundColor: study.images[0].bg } : undefined}
                >
                  <img
                    src={study.images[0].src}
                    alt={study.images[0].alt}
                    className="w-full object-contain"
                  />
                </div>
                {study.images[0].caption && (
                  <figcaption className="mt-3 text-center text-sm text-graphite dark:text-ash">
                    {study.images[0].caption}
                  </figcaption>
                )}
              </figure>
            </ScrollReveal>
          )}
        </div>
      </section>

      <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />

      {/* ── Scope & Tech Stack (B: white/carbon) ── */}
      <section className="bg-white dark:bg-carbon py-16 px-6 pattern-dots">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Scope */}
            <ScrollReveal>
              <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
                <span className="inline-block h-px w-6 bg-teal" />
                Scope
              </p>
              <div className="space-y-3">
                {study.scope.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                    <p className="text-sm leading-relaxed text-graphite dark:text-ash">{item}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Tech Stack */}
            <ScrollReveal delay={0.1}>
              <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
                <span className="inline-block h-px w-6 bg-teal" />
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {study.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-cloud dark:border-iron px-3 py-1 font-mono text-[11px] text-graphite dark:text-ash"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider from="carbon" to="ink" lightFrom="white" lightTo="snow" />

      {/* ── The Challenge (A: snow/ink) ── */}
      <section className="bg-snow dark:bg-ink py-16 px-6 pattern-diag">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal" />
              The Challenge
            </p>
            <div className="rounded-md border border-cloud dark:border-slate bg-white dark:bg-carbon p-8">
              <p className="text-lg leading-relaxed text-graphite dark:text-ash">
                {study.challenge}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />

      {/* ── The Approach (B: white/carbon) ── */}
      <section className="relative bg-white dark:bg-carbon py-16 px-6 pattern-scan">
        <TechLines variant="circuit-trace" className="text-cloud dark:text-iron" />
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
                <div className="flex items-start gap-4 rounded-md border border-cloud dark:border-slate bg-snow dark:bg-ink p-6">
                  <span className="shrink-0 font-mono text-sm font-medium text-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-graphite dark:text-ash">{step}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="carbon" to="ink" lightFrom="white" lightTo="snow" />

      {/* ── Key Features (A: snow/ink) ── */}
      {study.keyFeatures.length > 0 && (
        <>
          <section className="bg-snow dark:bg-ink py-16 px-6 pattern-grid">
            <div className="mx-auto max-w-4xl">
              <ScrollReveal>
                <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
                  <span className="inline-block h-px w-6 bg-teal" />
                  Key Features
                </p>
              </ScrollReveal>

              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {study.keyFeatures.map((feature, i) => (
                  <ScrollReveal key={i} delay={i * 0.06} className="h-full">
                    <div className="h-full flex items-start gap-3 rounded-md border border-cloud dark:border-slate bg-white dark:bg-carbon p-5 transition-all duration-300 hover:border-teal">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      <p className="text-sm leading-relaxed text-graphite dark:text-ash">
                        {feature}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />
        </>
      )}

      {/* ── The Results (B: white/carbon) ── */}
      <section className="bg-white dark:bg-carbon py-16 px-6 pattern-dots">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal" />
              The Results
            </p>
          </ScrollReveal>

          {/* Stats */}
          {study.stats && study.stats.length > 0 && (
            <div className="mt-6 mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {study.stats.map((stat, i) => (
                <ScrollReveal key={i} delay={i * 0.06} className="h-full">
                  <div className="h-full rounded-md border border-cloud dark:border-slate bg-snow dark:bg-ink p-5 text-center">
                    <p className="font-display text-2xl font-semibold text-teal md:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-graphite dark:text-ash">
                      {stat.label}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* Supporting Images */}
          {study.images && study.images.length > 1 && (
            <div className="mb-8 grid grid-cols-12 gap-4">
              {study.images.slice(1).map((img, i) => {
                const span = img.cols ?? 12;
                return (
                  <ScrollReveal
                    key={i}
                    delay={i * 0.06}
                    className={`col-span-12 ${COL_SPAN[span] ?? "md:col-span-12"}`}
                  >
                    <figure className="h-full">
                      <div
                        className="h-full overflow-hidden rounded-md border border-cloud dark:border-slate"
                        style={img.bg ? { backgroundColor: img.bg } : undefined}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      {img.caption && (
                        <figcaption className="mt-3 text-center text-sm text-graphite dark:text-ash">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {study.results.map((result, i) => (
              <ScrollReveal key={i} delay={i * 0.08} className="h-full">
                <div className="h-full flex items-start gap-3 rounded-md border border-cloud dark:border-slate bg-snow dark:bg-ink p-6">
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

      {/* ── Other Projects (A: snow/ink) ── */}
      {others.length > 0 && (
        <>
          <section className="bg-snow dark:bg-ink py-16 px-6 pattern-diag">
            <div className="mx-auto max-w-4xl">
              <ScrollReveal>
                <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
                  <span className="inline-block h-px w-6 bg-teal" />
                  More Work
                </p>
              </ScrollReveal>

              <div className="mt-8 space-y-4">
                {others.map((other, i) => (
                  <ScrollReveal key={other.slug} delay={i * 0.08}>
                    <Link
                      href={`/work/${other.slug}`}
                      className="group flex items-center justify-between rounded-md border border-cloud dark:border-slate bg-white dark:bg-carbon p-6 transition-all duration-300 hover:border-teal hover:-translate-y-0.5"
                    >
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-widest text-ash">
                          {other.client}
                        </p>
                        <p className="mt-1 font-display text-lg font-medium text-ink dark:text-white group-hover:text-teal transition-colors">
                          {other.title}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-teal opacity-0 transition-opacity group-hover:opacity-100">
                        &rarr;
                      </span>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />
        </>
      )}

      {/* ── CTA ── */}
      <section className="bg-white dark:bg-carbon py-16 px-6 pattern-grid">
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
