import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import WorkGrid from "@/components/WorkGrid";
import Testimonials from "@/components/Testimonials";
import ArcadeCabinet from "@/components/ArcadeCabinet";
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
      {/* ── Hero ── */}
      <section className="bg-cream min-h-dvh flex items-center px-6 pt-24 md:pt-28 pattern-grid border-b-[3px] border-shadow">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-[1fr_420px] md:gap-16">
          <ScrollReveal>
            <p className="eyebrow mb-4 flex items-center gap-2">
              <span className="inline-block h-px w-6 bg-red" />
              Portfolio
            </p>
            <h1 className="font-display text-5xl font-extrabold tracking-[-0.02em] text-dark md:text-6xl">
              Selected Work
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-light text-dark/65">
              A few things I&apos;ve built, and what they actually did for the people who hired me. The AI deal-sourcing platform is the one I point to first.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="order-first md:order-none">
            <ArcadeCabinet marquee="Hone · Work" screen="attract" />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Filter + Grid + Notable Mentions ── */}
      <section className="bg-cream py-16 px-6 pattern-dots border-b-[3px] border-shadow">
        <div className="mx-auto max-w-7xl">
          <WorkGrid />
        </div>
      </section>

      {/* ── Testimonial ── */}
      <Testimonials />

      {/* ── CTA ── */}
      <section className="bg-cream py-16 px-6 pattern-grid border-b-[3px] border-shadow">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-[-0.02em] text-dark md:text-5xl">
            Working on something that needs this kind of thinking?
          </h2>
          <p className="mt-4 text-lg font-light text-dark/65">
            Tell me what you&apos;re trying to build. I&apos;ll tell you how I&apos;d approach it.
          </p>
          <Link href="/contact" className="btn btn--primary btn--lg mt-8">
            Book a call
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
