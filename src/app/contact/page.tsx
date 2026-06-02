import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import TechLines from "@/components/TechLines";
import BusinessCard from "@/components/BusinessCard";
import CalEmbed from "@/components/CalEmbed";
import ContactSidebar from "@/components/ContactSidebar";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a discovery call with Hone Studio. 20 to 30 minutes to talk through what you're building and whether there's a fit. Prefer email? I reply within 24 hours.",
  keywords: [
    "contact",
    "book a call",
    "hire developer",
    "discovery call",
    "project inquiry",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Hone Studio",
    description:
      "Book a discovery call with Hone Studio. 20 to 30 minutes to talk through what you're building and whether there's a fit.",
    url: "https://honestudio.cv/contact",

  },
  twitter: {
    title: "Contact | Hone Studio",
    description:
      "Book a discovery call with Hone Studio. 20 to 30 minutes to talk through what you're building and whether there's a fit.",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* ── Hero (A: snow/ink) ── */}
      <section className="bg-snow dark:bg-ink min-h-dvh flex items-center px-6 pt-24 md:pt-28 pattern-grid">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal dark:bg-teal-dark" />
              Contact
            </p>
            <h1 className="font-display text-5xl text-section-title text-ink dark:text-white md:text-6xl">
              Book a Call
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-section-desc text-graphite dark:text-ash">
              We&apos;ll spend 20 to 30 minutes talking through what you&apos;re building and whether there&apos;s a fit. You don&apos;t need a finished brief, just a problem worth solving.
            </p>
            <p className="mt-4 max-w-2xl text-lg text-section-desc text-graphite dark:text-ash">
              If a call feels like too much too soon, email works. I reply within 24 hours. After we talk, I follow up with a short written scope: what I&apos;d build, in what order, and a rough timeline.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />

      {/* ── Calendar Embed (B: white/carbon) ── */}
      <section className="bg-white dark:bg-carbon py-16 px-6 pattern-dots">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:gap-6">
            {/* Calendar - Left Side */}
            <div className="flex-1">
              <ScrollReveal>
                <div className="relative rounded-md border border-cloud dark:border-slate bg-snow dark:bg-ink overflow-hidden p-4 md:p-6 h-[620px] md:h-[660px]">
                  <TechLines variant="bracket-pair" className="text-cloud dark:text-slate" />
                  <div className="h-full">
                    <CalEmbed />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Contact Options - Right Side */}
            <div className="mt-8 lg:mt-0 lg:w-72 lg:self-start">
              <ScrollReveal delay={0.1}>
                <ContactSidebar />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
