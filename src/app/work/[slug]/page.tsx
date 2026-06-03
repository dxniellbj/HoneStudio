import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import TechLines from "@/components/TechLines";
import { AnimatedStatsGrid } from "@/components/AnimatedStat";
import ImageLightbox from "@/components/ImageLightbox";
import { CASE_STUDIES, type CaseStudyImage } from "@/lib/data";

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
  Web: "border-red/40 text-red bg-red/5",
  AI: "border-purple/40 text-purple bg-purple/5",
  Strategy: "border-blue/40 text-blue bg-blue/5",
};

// Group images into rows based on column spans (12-col grid)
function groupImagesIntoRows(images: CaseStudyImage[]): CaseStudyImage[][] {
  const rows: CaseStudyImage[][] = [];
  let currentRow: CaseStudyImage[] = [];
  let currentCols = 0;

  for (const img of images) {
    const cols = img.cols ?? 12;

    if (currentCols + cols > 12) {
      // Start new row
      if (currentRow.length > 0) {
        rows.push(currentRow);
      }
      currentRow = [img];
      currentCols = cols;
    } else {
      // Add to current row
      currentRow.push(img);
      currentCols += cols;
    }

    // If we've filled the row, push it
    if (currentCols === 12) {
      rows.push(currentRow);
      currentRow = [];
      currentCols = 0;
    }
  }

  // Push remaining images
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;
}

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

  const title = `${study.client} Case Study`;
  const description = study.summary;

  return {
    title,
    description,
    keywords: [
      study.client,
      "case study",
      ...study.pillars,
      "portfolio",
      "web design",
    ],
    alternates: {
      canonical: `/work/${slug}`,
    },
    openGraph: {
      title: `${title} | Hone Studio`,
      description,
      url: `https://honestudio.cv/work/${slug}`,
      images: study.thumbnail
        ? [{ url: study.thumbnail, width: 1200, height: 630 }]
        : undefined,
      type: "article",
    },
    twitter: {
      title: `${title} | Hone Studio`,
      description,
      images: study.thumbnail ? [study.thumbnail] : undefined,
    },
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
      {/* ── Hero ── */}
      <section className="bg-cream py-20 px-6 pattern-grid border-b-[3px] border-shadow">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <Link
              href="/work"
              className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-dark/50 transition-colors hover:text-red"
            >
              <span aria-hidden="true">&larr;</span>
              Back to Work
            </Link>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-sm border border-shadow px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-dark/65">
                {study.platform}
              </span>
              {study.pillars.map((pillar) => (
                <span
                  key={pillar}
                  className={`rounded-sm border px-3 py-1 font-mono text-[11px] uppercase tracking-wide ${
                    PILLAR_COLORS[pillar] ?? "border-shadow text-dark/65"
                  }`}
                >
                  {pillar}
                </span>
              ))}
            </div>

            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-dark/50">
              {study.client}
            </p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-0.02em] text-dark md:text-5xl">
              {study.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed font-light text-dark/65">
              {study.summary}
            </p>

            {study.url && (
              <a
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-red transition-colors hover:text-red-bright"
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
                <ImageLightbox src={study.images[0].src} alt={study.images[0].alt}>
                  <div
                    className="relative aspect-video overflow-hidden rounded-lg border-2 border-shadow transition-all duration-300 hover:border-red"
                    style={study.images[0].bg ? { backgroundColor: study.images[0].bg } : undefined}
                  >
                    <Image
                      src={study.images[0].src}
                      alt={study.images[0].alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </ImageLightbox>
                {study.images[0].caption && (
                  <figcaption className="mt-3 text-center text-sm text-dark/50">
                    {study.images[0].caption}
                  </figcaption>
                )}
              </figure>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ── Scope & Tech Stack ── */}
      <section className="bg-cream py-16 px-6 pattern-dots border-b-[3px] border-shadow">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Scope */}
            <ScrollReveal>
              <p className="eyebrow mb-4 flex items-center gap-2">
                <span className="inline-block h-px w-6 bg-red" />
                Scope
              </p>
              <div className="space-y-3">
                {study.scope.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                    <p className="text-sm leading-relaxed text-dark/65">{item}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Tech Stack */}
            <ScrollReveal delay={0.1}>
              <p className="eyebrow mb-4 flex items-center gap-2">
                <span className="inline-block h-px w-6 bg-red" />
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {study.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-sm border border-shadow px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-dark/65"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── The Challenge (dark accent) ── */}
      <section className="scanlines bg-dark py-16 px-6 pattern-diag border-b-[3px] border-black/40">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-yellow">
              <span className="inline-block h-px w-6 bg-yellow" />
              The Challenge
            </p>
            <div className="rounded-xl border-2 border-black/30 bg-[#211c18] p-8">
              <p className="text-lg leading-relaxed text-cream/70">
                {study.challenge}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── The Approach ── */}
      <section className="relative bg-cream py-16 px-6 pattern-scan border-b-[3px] border-shadow">
        <TechLines variant="circuit-trace" className="text-shadow/60" />
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="eyebrow mb-4 flex items-center gap-2">
              <span className="inline-block h-px w-6 bg-red" />
              The Approach
            </p>
          </ScrollReveal>

          <div className="mt-8 space-y-6">
            {study.approach.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 rounded-lg border-2 border-shadow bg-beige p-6">
                  <span className="shrink-0 font-mono text-sm font-bold text-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-dark/65">{step}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Features ── */}
      {study.keyFeatures.length > 0 && (
        <section className="bg-cream py-16 px-6 pattern-grid border-b-[3px] border-shadow">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <p className="eyebrow mb-4 flex items-center gap-2">
                <span className="inline-block h-px w-6 bg-red" />
                Key Features
              </p>
            </ScrollReveal>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {study.keyFeatures.map((feature, i) => (
                <ScrollReveal key={i} delay={i * 0.06} className="h-full">
                  <div className="h-full flex items-start gap-3 rounded-lg border-2 border-shadow bg-beige p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                    <p className="text-sm leading-relaxed text-dark/65">
                      {feature}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── The Results ── */}
      <section className="bg-cream py-16 px-6 pattern-dots border-b-[3px] border-shadow">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="eyebrow mb-4 flex items-center gap-2">
              <span className="inline-block h-px w-6 bg-red" />
              The Results
            </p>
          </ScrollReveal>

          {/* Stats */}
          {study.stats && study.stats.length > 0 && (
            <AnimatedStatsGrid stats={study.stats} />
          )}

          {/* Supporting Images */}
          {study.images && study.images.length > 1 && (
            <div className="mb-8 space-y-4">
              {groupImagesIntoRows(study.images.slice(1)).map((row, rowIndex) => {
                const isMultiImage = row.length > 1;

                return (
                  <ScrollReveal key={rowIndex} delay={rowIndex * 0.06}>
                    <div className={`grid grid-cols-12 gap-4 ${isMultiImage ? "md:auto-rows-[400px]" : ""}`}>
                      {row.map((img, imgIndex) => {
                        const span = img.cols ?? 12;
                        const isFullWidth = span === 12;

                        return (
                          <figure
                            key={imgIndex}
                            className={`col-span-12 ${COL_SPAN[span] ?? "md:col-span-12"}`}
                          >
                            <ImageLightbox src={img.src} alt={img.alt}>
                              <div
                                className={`relative overflow-hidden rounded-lg border-2 border-shadow transition-all duration-300 hover:border-red ${
                                  isFullWidth ? "aspect-video" : "h-full"
                                }`}
                                style={img.bg ? { backgroundColor: img.bg } : undefined}
                              >
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-contain"
                                  sizes={isFullWidth ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
                                />
                                {/* Zoom indicator */}
                                <div className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-darkest/60 text-cream opacity-0 transition-opacity group-hover:opacity-100">
                                  <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                  </svg>
                                </div>
                              </div>
                            </ImageLightbox>
                            {img.caption && (
                              <figcaption className="mt-3 text-center text-sm text-dark/50">
                                {img.caption}
                              </figcaption>
                            )}
                          </figure>
                        );
                      })}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {study.results.map((result, i) => (
              <ScrollReveal key={i} delay={i * 0.08} className="h-full">
                <div className="h-full flex items-start gap-3 rounded-lg border-2 border-shadow bg-beige p-6">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                  <p className="text-sm leading-relaxed text-dark/65">
                    {result}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cross-Pillar CTA (integrated with Results section) ── */}
      {study.pillars.length > 1 && (
        <section className="bg-cream pb-16 px-6 border-b-[3px] border-shadow">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="rounded-lg border-2 border-red/40 bg-red/5 p-8 text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-dark/50 mb-3">
                  This project pulled in
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {study.pillars.map((pillar) => (
                    <span
                      key={pillar}
                      className={`rounded-sm border px-4 py-1.5 font-mono text-sm uppercase tracking-wide ${
                        PILLAR_COLORS[pillar] ?? "border-shadow text-dark/65"
                      }`}
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-dark/65 mb-6">
                  Research, software, and design, handled by one person from scope to ship.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-red transition-colors hover:text-red-bright"
                >
                  See what I build
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── Other Projects ── */}
      {others.length > 0 && (
        <section className="bg-cream py-16 px-6 pattern-diag border-b-[3px] border-shadow">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <p className="eyebrow mb-4 flex items-center gap-2">
                <span className="inline-block h-px w-6 bg-red" />
                More Work
              </p>
            </ScrollReveal>

            <div className="mt-8 space-y-4">
              {others.map((other, i) => (
                <ScrollReveal key={other.slug} delay={i * 0.08}>
                  <Link
                    href={`/work/${other.slug}`}
                    className="group flex items-center justify-between rounded-lg border-2 border-shadow bg-beige p-6 transition-all duration-300 hover:border-red hover:-translate-y-1"
                  >
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-widest text-dark/50">
                        {other.client}
                      </p>
                      <p className="mt-1 font-display text-lg font-bold text-dark group-hover:text-red transition-colors">
                        {other.title}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-red opacity-0 transition-opacity group-hover:opacity-100">
                      &rarr;
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-cream py-16 px-6 pattern-grid border-b-[3px] border-shadow">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-[-0.02em] text-dark md:text-4xl">
            Got a project that needs this kind of thinking?
          </h2>
          <p className="mt-4 text-lg font-light text-dark/65">
            Tell me what you&apos;re trying to build. I&apos;ll tell you how I&apos;d approach it.
          </p>
          <Link href="/contact" className="btn btn--primary btn--lg mt-8">
            Start a Conversation
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
