import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import TechLines from "@/components/TechLines";
import BusinessCard from "@/components/BusinessCard";

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

      {/* ── Book a Call (B: white/carbon) ── */}
      <section className="bg-white dark:bg-carbon py-16 px-6 pattern-dots">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="relative rounded-md border border-cloud dark:border-slate bg-snow dark:bg-ink p-8 text-center">
              <TechLines variant="bracket-pair" className="text-cloud dark:text-slate" />
              
              {/* Calendar Icon */}
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-teal-ghost p-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
              </div>

              <h2 className="mb-3 font-display text-2xl font-medium text-ink dark:text-white">
                Schedule a Conversation
              </h2>
              <p className="mb-8 text-graphite dark:text-ash">
                30 minutes to discuss your project, answer questions, and figure out next steps.
              </p>

              <a
                href="https://calendar.app.google/ZQU813b4JzLtaVS78"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-teal px-6 py-3 font-mono text-sm uppercase tracking-widest text-ink transition-colors hover:bg-teal-bright"
              >
                Pick a Time
              </a>

              <div className="mt-8 h-px bg-cloud dark:bg-slate" />

              {/* Alternative contact */}
              <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
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
