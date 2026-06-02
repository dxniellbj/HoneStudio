import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import WorkGrid from "@/components/WorkGrid";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects from Hone Studio: an AI deal-sourcing platform, education platforms, and web builds for founders and small teams.",
  keywords: [
    "portfolio",
    "case studies",
    "web design portfolio",
    "AI projects",
    "Kajabi websites",
    "startup projects",
  ],
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work | Hone Studio",
    description:
      "Selected projects from Hone Studio: an AI deal-sourcing platform, education platforms, and web builds for founders and small teams.",
    url: "https://honestudio.cv/work",
    
  },
  twitter: {
    title: "Work | Hone Studio",
    description:
      "Selected projects from Hone Studio: an AI deal-sourcing platform, education platforms, and web builds for founders and small teams.",
  },
};

export default function WorkPage() {
  return (
    <>
      {/* ── Hero (A: snow/ink) ── */}
      <section className="bg-snow dark:bg-ink min-h-dvh flex items-center px-6 pt-24 md:pt-28 pattern-grid">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal dark:bg-teal-dark" />
              Portfolio
            </p>
            <h1 className="font-display text-5xl text-section-title text-ink dark:text-white md:text-6xl">
              Selected Work
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-section-desc text-graphite dark:text-ash">
              A few things I&apos;ve built, and what they actually did for the people who hired me. The AI deal-sourcing platform is the one I point to first.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />

      {/* ── Filter + Grid + Notable Mentions (B: white/carbon) ── */}
      <section className="bg-white dark:bg-carbon py-16 px-6 pattern-dots">
        <div className="mx-auto max-w-7xl">
          <WorkGrid />
        </div>
      </section>

      {/* ── Testimonial (B: white/carbon) ── */}
      <Testimonials />

      <SectionDivider from="carbon" to="ink" lightFrom="white" lightTo="snow" />

      {/* ── CTA (A: snow/ink) ── */}
      <section className="bg-snow dark:bg-ink py-16 px-6 pattern-grid">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl text-section-title text-ink dark:text-white md:text-5xl">
            Working on something that needs this kind of thinking?
          </h2>
          <p className="mt-4 text-lg text-graphite dark:text-ash">
            Tell me what you&apos;re trying to build. I&apos;ll tell you how I&apos;d approach it.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-sm bg-teal dark:bg-teal-dark px-8 py-3 font-mono text-sm uppercase tracking-widest text-ink transition-colors hover:bg-teal-bright dark:hover:bg-teal"
          >
            Book a Call
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
