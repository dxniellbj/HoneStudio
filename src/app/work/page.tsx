import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import WorkGrid from "@/components/WorkGrid";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects from Hone Studio — web design, AI tools, and strategy work for founders, educators, and VC firms.",
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
      "Selected projects — web design, AI tools, and strategy work for founders, educators, and VC firms.",
    url: "https://honestudio.cv/work",
    
  },
  twitter: {
    title: "Work | Hone Studio",
    description:
      "Selected projects — web design, AI tools, and strategy work for founders, educators, and VC firms.",
  },
};

export default function WorkPage() {
  return (
    <>
      {/* ── Hero (A: snow/ink) ── */}
      <section className="bg-snow dark:bg-ink min-h-dvh flex items-center px-6 pattern-grid">
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
              Every project here started the same way: something wasn't working, and nobody could figure out why. I figured out why. Then I fixed it.
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
            Your project could be next
          </h2>
          <p className="mt-4 text-lg text-graphite dark:text-ash">
            Tell me what&apos;s not working. I&apos;ll tell you what I&apos;d do about it.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-sm bg-teal dark:bg-teal-dark px-8 py-3 font-mono text-sm uppercase tracking-widest text-ink transition-colors hover:bg-teal-bright dark:hover:bg-teal"
          >
            Start a Conversation
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
