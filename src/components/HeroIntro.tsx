"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export default function HeroIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* ── Phase 1 (0–15%): "Hone." swivels in (rotateY spin + fade in) ── */
  const honeSwivelY = useTransform(scrollYProgress, [0, 0.15], [90, 0]);
  const honeOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const dotSwivelY = useTransform(scrollYProgress, [0.04, 0.15], [90, 0]);
  const dotOpacity = useTransform(scrollYProgress, [0.04, 0.12], [0, 1]);

  /* ── Phase 2 (18–30%): "Hone." scales up then fades out ── */
  const wordmarkScale = useTransform(scrollYProgress, [0.18, 0.28, 0.35], [1, 1.3, 1.3]);
  const wordmarkFadeOut = useTransform(scrollYProgress, [0.25, 0.35], [1, 0]);
  const wordmarkY = useTransform(scrollYProgress, [0.18, 0.35], [0, -40]);

  /* ── Phase 3 (32–58%): Hero content lines stagger in one by one ── */
  const pillOpacity = useTransform(scrollYProgress, [0.32, 0.38], [0, 1]);
  const pillY = useTransform(scrollYProgress, [0.32, 0.38], [30, 0]);

  const headlineOpacity = useTransform(scrollYProgress, [0.37, 0.43], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.37, 0.43], [30, 0]);

  const subtitleOpacity = useTransform(scrollYProgress, [0.42, 0.48], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.42, 0.48], [30, 0]);

  const descOpacity = useTransform(scrollYProgress, [0.47, 0.53], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.47, 0.53], [30, 0]);

  const ctaOpacity = useTransform(scrollYProgress, [0.52, 0.58], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.52, 0.58], [30, 0]);

  /* ── Phase 4 (58–100%): Hold — hero content stays centered for reading ── */

  /* ── Reduced motion: skip animations, show final state ── */
  if (prefersReducedMotion) {
    return (
      <section className="relative min-h-screen bg-snow dark:bg-ink flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="hero-gradient absolute inset-0" />
        <div className="hero-grid absolute inset-0" />

        {/* Content — final state (hero content centered, wordmark already gone) */}
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal-ghost px-4 py-2">
            <span className="inline-block h-2 w-2 rounded-full bg-teal animate-blink" />
            <span className="font-mono text-xs uppercase tracking-widest text-teal">
              Fractional Ops &amp; Tech Partner
            </span>
          </div>

          <h2
            className="font-display font-bold text-ink dark:text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", letterSpacing: "-0.03em" }}
          >
            Your business needs a full ops and tech team.
          </h2>

          <p
            className="mt-4 font-display text-teal leading-tight"
            style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}
          >
            You don&apos;t need to hire one.
          </p>

          <p className="mx-auto mt-6 max-w-2xl font-body text-lg font-light text-graphite dark:text-ash">
            Strategy, systems, and websites — one partner, zero overhead.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-sm bg-teal px-8 py-3 font-mono text-sm uppercase tracking-widest text-ink transition-colors hover:bg-teal-bright"
            >
              Book a Discovery Call
            </Link>
            <Link
              href="/work"
              className="rounded-sm border border-graphite/30 dark:border-ash/30 bg-transparent px-8 py-3 font-mono text-sm uppercase tracking-widest text-graphite dark:text-ash transition-colors hover:border-teal hover:text-teal"
            >
              See My Work
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative min-h-[300vh] bg-snow dark:bg-ink">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Background Layer — Gradient */}
        <div className="hero-gradient absolute inset-0" />

        {/* Background Layer — Grid */}
        <div className="hero-grid absolute inset-0" />

        {/* Scroll-driven content */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
          {/* ── Wordmark (swivels in, scales up, fades out) ── */}
          <motion.div
            style={{ opacity: wordmarkFadeOut, y: wordmarkY, scale: wordmarkScale }}
          >
            <div className="flex items-baseline justify-center" style={{ perspective: 800 }}>
              {/* "Hone" — swivels in via rotateY */}
              <motion.h1
                style={{
                  rotateY: honeSwivelY,
                  opacity: honeOpacity,
                  fontSize: "clamp(4rem, 15vw, 10rem)",
                  letterSpacing: "-0.03em",
                }}
                className="font-display font-semibold text-ink dark:text-white"
              >
                Hone
              </motion.h1>

              {/* Teal dot — swivels in */}
              <motion.span
                style={{
                  rotateY: dotSwivelY,
                  opacity: dotOpacity,
                  fontSize: "clamp(4rem, 15vw, 10rem)",
                }}
                className="font-display font-semibold text-teal"
              >
                .
              </motion.span>
            </div>
          </motion.div>

          {/* ── Hero content (each line staggers in) ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center mx-auto max-w-4xl px-6 text-center">
            {/* Pill Badge */}
            <motion.div
              style={{ opacity: pillOpacity, y: pillY }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal-ghost px-4 py-2"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-teal animate-blink" />
              <span className="font-mono text-xs uppercase tracking-widest text-teal">
                Fractional Ops &amp; Tech Partner
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              style={{ opacity: headlineOpacity, y: headlineY, fontSize: "clamp(2rem, 6vw, 3.5rem)", letterSpacing: "-0.03em" }}
              className="font-display font-bold text-ink dark:text-white leading-tight"
            >
              Your business needs a full ops and tech team.
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              style={{ opacity: subtitleOpacity, y: subtitleY, fontSize: "clamp(1.25rem, 3vw, 2rem)" }}
              className="mt-4 font-display text-teal leading-tight"
            >
              You don&apos;t need to hire one.
            </motion.p>

            {/* Description */}
            <motion.p
              style={{ opacity: descOpacity, y: descY }}
              className="mx-auto mt-6 max-w-2xl font-body text-lg font-light text-graphite dark:text-ash"
            >
              Strategy, systems, and websites — one partner, zero overhead.
            </motion.p>

            {/* CTA Pair */}
            <motion.div
              style={{ opacity: ctaOpacity, y: ctaY }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                className="rounded-sm bg-teal px-8 py-3 font-mono text-sm uppercase tracking-widest text-ink transition-colors hover:bg-teal-bright"
              >
                Book a Discovery Call
              </Link>
              <Link
                href="/work"
                className="rounded-sm border border-graphite/30 dark:border-ash/30 bg-transparent px-8 py-3 font-mono text-sm uppercase tracking-widest text-graphite dark:text-ash transition-colors hover:border-teal hover:text-teal"
              >
                See My Work
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
