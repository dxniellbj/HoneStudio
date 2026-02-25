import HeroIntro from "@/components/HeroIntro";
import SplashScreen from "@/components/SplashScreen";
import ServicePillars from "@/components/ServicePillars";
import ToolsBanner from "@/components/ToolsBanner";
import AudienceFunnel from "@/components/AudienceFunnel";
import CaseStudyCard from "@/components/CaseStudyCard";
import StatsStrip from "@/components/StatsStrip";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* Splash + Hero (homepage only) */}
      <SplashScreen />
      <HeroIntro />

      <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />

      {/* 2. Service Pillars (B: white/carbon) */}
      <ScrollReveal>
        <ServicePillars />
      </ScrollReveal>

      <SectionDivider from="carbon" to="ink" lightFrom="white" lightTo="snow" />

      {/* 3. Audience Funnel (A: snow/ink) */}
      <AudienceFunnel />

      <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />

      {/* 4. Tools Banner (B: white/carbon) */}
      <ToolsBanner />

      <SectionDivider from="carbon" to="ink" lightFrom="white" lightTo="snow" />

      {/* 5. Proof Section (A: snow/ink) */}
      <section className="bg-snow dark:bg-ink py-24 px-6 pattern-diag">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-16">
              <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
                <span className="inline-block h-px w-6 bg-teal" />
                Proof
              </p>
              <h2 className="font-display text-4xl text-section-title text-ink dark:text-white md:text-5xl">
                Selected Work
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-graphite dark:text-ash">
                A few projects that show how this actually works.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CASE_STUDIES.map((study, i) => (
              <ScrollReveal key={study.slug} delay={i * 0.1} className="h-full">
                <CaseStudyCard {...study} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />

      {/* 6. Stats Strip (B: white/carbon) */}
      <StatsStrip />

      <SectionDivider from="carbon" to="ink" lightFrom="white" lightTo="snow" />

      {/* 7. CTA Section (A: snow/ink) */}
      <section className="bg-snow dark:bg-ink py-24 px-6 pattern-grid">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl text-section-title text-ink dark:text-white md:text-5xl">
            Got something you&apos;re working on?
          </h2>
          <p className="mt-4 text-lg text-graphite dark:text-ash">
            Tell me what you&apos;re dealing with — I&apos;ll tell you if I can help.
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
