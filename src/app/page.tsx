import HeroIntro from "@/components/HeroIntro";
import SplashScreen from "@/components/SplashScreen";
import ServicePillars from "@/components/ServicePillars";
import Toolkit from "@/components/Toolkit";
import AudienceFunnel from "@/components/AudienceFunnel";
import Testimonials from "@/components/Testimonials";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/data";

const FEATURED = CASE_STUDIES[0];

export default function HomePage() {
  return (
    <>
      {/* Splash + Hero (homepage only) */}
      <SplashScreen />
      <HeroIntro />

      {/* 2. Featured Proof — lead case study (B: white/carbon) */}
      <section className="bg-white dark:bg-carbon py-16 px-6 pattern-diag">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal dark:bg-teal-dark" />
              Featured Work
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            {/* Text */}
            <ScrollReveal>
              <h2 className="font-display text-3xl text-section-title text-ink dark:text-white md:text-4xl">
                {FEATURED.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-graphite dark:text-ash">
                An investment team was sourcing companies by hand and still missing most of the market. I designed and built two internal tools that find, enrich, score, and track companies automatically. Here is what changed:
              </p>

              {/* Stats */}
              {FEATURED.stats && (
                <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
                  {FEATURED.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-display text-2xl font-medium text-teal dark:text-teal-dark md:text-3xl">
                        {stat.value}
                      </p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-graphite dark:text-ash">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href={`/work/${FEATURED.slug}`}
                  className="inline-block rounded-sm bg-teal dark:bg-teal-dark px-7 py-3 font-mono text-sm uppercase tracking-widest text-ink transition-colors hover:bg-teal-bright dark:hover:bg-teal"
                >
                  Read the Case Study
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-graphite dark:text-ash transition-colors hover:text-teal dark:hover:text-teal-dark"
                >
                  See All Work
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </ScrollReveal>

            {/* Image */}
            <ScrollReveal delay={0.15}>
              <Link
                href={`/work/${FEATURED.slug}`}
                className="group block"
                aria-label={`Read the ${FEATURED.client} case study`}
              >
                <div
                  className="relative aspect-video overflow-hidden rounded-md border border-cloud dark:border-slate transition-all duration-300 group-hover:border-teal dark:group-hover:border-teal-dark"
                  style={FEATURED.thumbnailBg ? { backgroundColor: FEATURED.thumbnailBg } : undefined}
                >
                  {FEATURED.thumbnail && (
                    <Image
                      src={FEATURED.thumbnail}
                      alt={`${FEATURED.client} sourcing platform`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  )}
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. What I Build (B: white/carbon — continuous with proof) */}
      <ScrollReveal>
        <ServicePillars />
      </ScrollReveal>

      <SectionDivider from="carbon" to="ink" lightFrom="white" lightTo="snow" />

      {/* 4. Who I Work With (A: snow/ink) */}
      <AudienceFunnel />

      <SectionDivider from="ink" to="carbon" lightFrom="snow" lightTo="white" />

      {/* 5. Toolkit (B: white/carbon) */}
      <Toolkit />

      {/* 6. Testimonial (B: white/carbon) */}
      <Testimonials />

      <SectionDivider from="carbon" to="ink" lightFrom="white" lightTo="snow" />

      {/* 7. CTA Section (A: snow/ink) */}
      <section className="bg-snow dark:bg-ink py-16 px-6 pattern-grid">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl text-section-title text-ink dark:text-white md:text-5xl">
            Sound like what you need?
          </h2>
          <p className="mt-4 text-lg text-graphite dark:text-ash">
            Tell me what you&apos;re working on. I&apos;ll tell you how I&apos;d approach it, and whether I&apos;m the right person to build it.
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
