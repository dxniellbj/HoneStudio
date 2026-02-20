import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import TechLines from "@/components/TechLines";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Niell Alfajora — the fractional ops & tech partner behind Hone Studio. One partner, every tool you need.",
};

const VALUES = [
  {
    title: "Integrated, Not Siloed",
    description:
      "Strategy, design, and tech shouldn't live in separate rooms. I work across all three so everything connects and nothing falls through the cracks.",
  },
  {
    title: "Outcomes Over Deliverables",
    description:
      "A beautiful site that doesn't convert is just decoration. Everything I build is measured by the results it drives for your business.",
  },
  {
    title: "Honest By Default",
    description:
      "If something won't work, I'll say so. If there's a better path, I'll show you. No upsells, no fluff — just clear, direct communication.",
  },
  {
    title: "Lean & Focused",
    description:
      "No agency overhead, no bloated teams. One senior partner who knows your business inside out — faster decisions, tighter execution.",
  },
] as const;

const TOOLKIT = {
  Web: ["Next.js", "React", "Tailwind CSS", "Kajabi", "Shopify", "Squarespace", "Figma", "Vercel"],
  AI: ["Gemini", "OpenAI", "LangChain", "Firebase", "Automation", "Chatbots"],
  Strategy: ["Market Research", "Competitive Intel", "Discovery Workshops", "Roadmapping", "Audits"],
} as const;

const TOOLKIT_ACCENT: Record<string, string> = {
  Web: "text-teal",
  AI: "text-signal",
  Strategy: "text-indigo",
};

const TOOLKIT_TAG_STYLE: Record<string, string> = {
  Web: "border-teal/30 text-teal bg-teal-ghost",
  AI: "border-signal/30 text-signal bg-signal-ghost",
  Strategy: "border-indigo/30 text-indigo bg-indigo-ghost",
};

export default function AboutPage() {
  return (
    <>
      {/* ── Hero (A: snow/ink) ── */}
      <section className="bg-snow dark:bg-ink py-32 px-6 pattern-grid">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Text */}
            <ScrollReveal>
              <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
                <span className="inline-block h-px w-6 bg-teal" />
                About
              </p>
              <h1 className="font-display text-5xl text-section-title text-ink dark:text-white md:text-6xl">
                Niell Alfajora
              </h1>
              <p className="mt-2 font-mono text-sm uppercase tracking-widest text-graphite dark:text-ash">
                Founder, Hone Studio
              </p>
              <div className="mt-8 space-y-4 text-lg leading-relaxed text-section-desc text-graphite dark:text-ash">
                <p>
                  I&apos;m a fractional ops and tech partner for founders, small
                  businesses, and agencies who need senior-level execution
                  without the overhead of a full team.
                </p>
                <p>
                  Most businesses hire a designer, a developer, a strategist,
                  and an automation specialist — four conversations, four
                  invoices, four people who don&apos;t talk to each other. I
                  replace that with one partner who handles all of it.
                </p>
              </div>
            </ScrollReveal>

            {/* Avatar + Business Card */}
            <ScrollReveal delay={0.15}>
              <div className="relative flex items-center justify-center">
                <img
                  src="/images/N - profile - black on transparent.svg"
                  alt="Niell Alfajora"
                  className="h-full w-auto max-h-[calc(100vh-16rem)] object-contain dark:hidden"
                />
                <img
                  src="/images/N - profile - white on transparent.svg"
                  alt="Niell Alfajora"
                  className="h-full w-auto max-h-[calc(100vh-16rem)] object-contain hidden dark:block"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />

      {/* ── Why Hone (B: white/carbon) ── */}
      <section className="bg-white dark:bg-carbon py-24 px-6 pattern-dots">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
                <span className="inline-block h-px w-6 bg-teal" />
                Origin
              </p>
              <h2 className="font-display text-4xl text-section-title text-ink dark:text-white md:text-5xl">
                Why &ldquo;Hone&rdquo;?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-graphite dark:text-ash">
                To hone means to sharpen — to take something good and make it
                precise, focused, effective. That&apos;s the job. I take
                businesses that are already doing the work and sharpen
                everything around them: the site, the systems, the strategy.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-graphite dark:text-ash">
                No bloat. No reinvention for the sake of it. Just a sharper
                version of what you already have — and a clear path to
                what&apos;s next.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="rounded-md border border-cloud dark:border-slate bg-snow dark:bg-ink p-8">
                <h3 className="mb-4 font-display text-xl font-medium text-ink dark:text-white">
                  The Swiss Army Knife Thinking
                </h3>
                <p className="text-sm leading-relaxed text-graphite dark:text-ash">
                  A Swiss Army Knife doesn&apos;t carry twelve separate tools
                  in a bag — it puts every blade, driver, and opener into one
                  compact frame. That&apos;s how Hone Studio works.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-graphite dark:text-ash">
                  Strategy informs the design. Design shapes the build. The
                  build feeds back into strategy. When one person holds all
                  three, nothing gets lost in translation, nothing falls between
                  teams, and every decision stays aligned with the outcome.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    { label: "One partner", detail: "not three vendors" },
                    { label: "One conversation", detail: "not a game of telephone" },
                    { label: "One bill", detail: "not a stack of invoices" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      <p className="text-sm text-graphite dark:text-ash">
                        <span className="font-medium text-ink dark:text-white">{item.label}</span>
                        {" — "}{item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider from="carbon" to="ink" lightFrom="white" lightTo="snow" />

      {/* ── Values (A: snow/ink) ── */}
      <section className="bg-snow dark:bg-ink py-24 px-6 pattern-diag">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal" />
              Principles
            </p>
            <h2 className="font-display text-4xl text-section-title text-ink dark:text-white md:text-5xl">
              How I Think About Work
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {VALUES.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.08}>
                <div className="rounded-md border border-cloud dark:border-slate bg-white dark:bg-carbon p-8 transition-all duration-300 hover:border-teal hover:shadow-sm">
                  <h3 className="mb-3 font-display text-xl font-medium text-ink dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-graphite dark:text-ash">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />

      {/* ── Toolkit (B: white/carbon) ── */}
      <section className="relative bg-white dark:bg-carbon py-24 px-6 pattern-scan">
        <TechLines variant="corner-brackets" className="text-cloud dark:text-slate" />
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal" />
              Toolkit
            </p>
            <h2 className="font-display text-4xl text-section-title text-ink dark:text-white md:text-5xl">
              What I Work With
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {Object.entries(TOOLKIT).map(([category, tools], i) => (
              <ScrollReveal key={category} delay={i * 0.1}>
                <div className="rounded-md border border-cloud dark:border-slate bg-snow dark:bg-ink p-8">
                  <h3
                    className={`mb-6 font-mono text-xs uppercase tracking-widest ${TOOLKIT_ACCENT[category]}`}
                  >
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <span
                        key={tool}
                        className={`rounded-full border px-3 py-1 font-mono text-[11px] ${TOOLKIT_TAG_STYLE[category]}`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
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
          <h2 className="font-display text-4xl text-section-title text-ink dark:text-white md:text-5xl">
            Let&apos;s work together
          </h2>
          <p className="mt-4 text-lg text-graphite dark:text-ash">
            Tell me about your project — I&apos;ll tell you how I can help.
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
