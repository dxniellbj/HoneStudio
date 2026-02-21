import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import TechLines from "@/components/TechLines";
import ContactForm from "@/components/ContactForm";
import BusinessCard from "@/components/BusinessCard";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Hone Studio. Tell me about your project — I'll get back to you within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      {/* ── Hero (A: snow/ink) ── */}
      <section className="bg-snow dark:bg-ink py-32 px-6 pattern-grid">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal" />
              Contact
            </p>
            <h1 className="font-display text-5xl text-section-title text-ink dark:text-white md:text-6xl">
              Let&apos;s Talk
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-section-desc text-graphite dark:text-ash">
              Have a project in mind? Tell me about it — I&apos;ll get back to
              you within 24 hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />

      {/* ── Form + Info (B: white/carbon) ── */}
      <section className="bg-white dark:bg-carbon py-24 px-6 pattern-dots">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-5">
            {/* Form — takes 3 of 5 cols */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <ContactForm />
              </ScrollReveal>
            </div>

            {/* Info Card */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={0.15}>
                <div className="relative rounded-md border border-cloud dark:border-slate bg-snow dark:bg-ink p-8">
                  <TechLines variant="bracket-pair" className="text-cloud dark:text-slate" />
                  <h3 className="mb-6 font-display text-xl font-medium text-ink dark:text-white">
                    Other ways to reach me
                  </h3>

                  <div className="space-y-6">
                    {/* Email */}
                    <div>
                      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-ash">
                        Email
                      </p>
                      <a
                        href="mailto:hello@honestudio.cv"
                        className="text-sm text-teal transition-colors hover:text-teal-bright"
                      >
                        hello@honestudio.cv
                      </a>
                    </div>

                    {/* Response Time */}
                    <div>
                      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-ash">
                        Response Time
                      </p>
                      <p className="text-sm text-graphite dark:text-ash">
                        Usually within 24 hours
                      </p>
                    </div>

                    {/* Chat */}
                    <div>
                      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-ash">
                        Quick Question?
                      </p>
                      <p className="text-sm text-graphite dark:text-ash">
                        Use the chat widget in the corner — Honest AI can answer
                        most questions instantly.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 h-px bg-cloud dark:bg-slate" />

                  <p className="mt-6 text-xs leading-relaxed text-ash">
                    No sales pitch, no obligation. Just a conversation about
                    what you need and whether I&apos;m the right fit.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <div className="mt-6 flex justify-center">
                  <BusinessCard />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
