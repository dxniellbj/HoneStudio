import HeroIntro from "@/components/HeroIntro";
import SplashScreen from "@/components/SplashScreen";
import MarqueeStrip from "@/components/MarqueeStrip";
import ServicePillars from "@/components/ServicePillars";
import Toolkit from "@/components/Toolkit";
import AudienceFunnel from "@/components/AudienceFunnel";
import Testimonials from "@/components/Testimonials";
import ScrollReveal from "@/components/ScrollReveal";
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

      {/* Marquee — decorative scrolling strip */}
      <MarqueeStrip />

      {/* 2. Featured Proof — lead case study */}
      <section className="bg-cream py-16 px-6 pattern-diag border-b-[3px] border-shadow">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="eyebrow mb-4 flex items-center gap-2">
              <span className="inline-block h-px w-6 bg-red" />
              Featured Work
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            {/* Text */}
            <ScrollReveal>
              <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-dark md:text-4xl">
                {FEATURED.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-dark/65">
                An investment team was hunting companies by hand and still missing most of the market. So I built them two internal tools that find, enrich, score, and track companies on their own. Here&apos;s what changed:
              </p>

              {/* Stats — retro stats bar */}
              {FEATURED.stats && (
                <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
                  {FEATURED.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-display text-2xl font-extrabold text-red md:text-3xl">
                        {stat.value}
                      </p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-dark/50">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href={`/work/${FEATURED.slug}`} className="btn btn--primary">
                  Read the case study
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-dark/60 transition-colors hover:text-red"
                >
                  See all work
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
                  className="relative aspect-video overflow-hidden rounded-lg border-2 border-shadow transition-all duration-300 group-hover:-translate-y-1 group-hover:border-red"
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

      {/* 3. What I Build */}
      <ScrollReveal>
        <ServicePillars />
      </ScrollReveal>

      {/* 4. Who I Work With */}
      <AudienceFunnel />

      {/* 5. Toolkit */}
      <Toolkit />

      {/* 6. Testimonial */}
      <Testimonials />

      {/* 7. CTA — retro block */}
      <section className="cta-block">
        <div>
          <h2 className="cta-block__text">
            Sound like what you need?{" "}
            <span className="cta-block__text--accent">Let&apos;s talk.</span>
          </h2>
          <p className="cta-block__sub">
            Tell me what you&apos;re working on — game on.
          </p>
        </div>
        <Link href="/contact" className="btn btn--primary btn--lg">
          Book a call
        </Link>
      </section>
    </>
  );
}
