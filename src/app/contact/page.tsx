import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import TechLines from "@/components/TechLines";
import BusinessCard from "@/components/BusinessCard";
import CalEmbed from "@/components/CalEmbed";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a call with Hone Studio. Pick a time that works for you and let's talk about your project.",
};

export default function ContactPage() {
  return (
    <>
      {/* ── Hero (A: snow/ink) ── */}
      <section className="bg-snow dark:bg-ink py-20 px-6 pattern-grid">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal" />
              Contact
            </p>
            <h1 className="font-display text-5xl text-section-title text-ink dark:text-white md:text-6xl">
              Book a Call
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-section-desc text-graphite dark:text-ash">
              Pick a time that works for you. We&apos;ll talk through your
              project and see if there&apos;s a fit.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />

      {/* ── Calendar Embed (B: white/carbon) ── */}
      <section className="bg-white dark:bg-carbon py-16 px-6 pattern-dots">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="relative rounded-md border border-cloud dark:border-slate bg-snow dark:bg-ink overflow-hidden">
              <TechLines variant="bracket-pair" className="text-cloud dark:text-slate" />
              <div className="h-[650px] md:h-[700px]">
                <CalEmbed />
              </div>
            </div>
          </ScrollReveal>

          {/* Alternative contact */}
          <ScrollReveal delay={0.1}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
              <div className="text-center sm:text-left">
                <p className="font-mono text-xs uppercase tracking-widest text-ash">
                  Prefer email?
                </p>
                <a
                  href="mailto:dxniellbj@gmail.com"
                  className="text-sm text-graphite dark:text-ash transition-colors hover:text-teal"
                >
                  dxniellbj@gmail.com
                </a>
              </div>
              <div className="hidden sm:block h-8 w-px bg-cloud dark:bg-slate" />
              <div className="text-center sm:text-left">
                <p className="font-mono text-xs uppercase tracking-widest text-ash">
                  Quick question?
                </p>
                <p className="text-sm text-graphite dark:text-ash">
                  Use the chat widget
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mt-8 flex justify-center">
              <BusinessCard />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
