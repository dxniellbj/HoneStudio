"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useAnimate,
} from "framer-motion";

/* ── Scroll prompt — fades in after auto-play, fades out on scroll ── */
function ScrollPrompt({ scrollOpacity }: { scrollOpacity: ReturnType<typeof useTransform<number, number>> }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
    >
      <motion.div
        style={{ opacity: scrollOpacity }}
        className="flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[11px] uppercase tracking-widest text-ash dark:text-iron select-none">
          Scroll
        </span>
        <motion.svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-ash dark:text-iron"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <polyline points="4,6 9,12 14,6" />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}

/* ── Shared hero content (used in static & scroll-driven) ── */
function HeroContentMarkup() {
  return (
    <>
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
    </>
  );
}

/* ────────────────────────────────────────────────────────────
   Static Hero — reduced-motion or post-autoplay final state
   ──────────────────────────────────────────────────────────── */
function StaticHero() {
  return (
    <section className="relative min-h-screen bg-snow dark:bg-ink flex items-center justify-center overflow-hidden">
      <div className="hero-gradient absolute inset-0" />
      <div className="hero-grid absolute inset-0" />

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
          I handle strategy, systems, and your website — so you&apos;re not managing a whole team to get it done.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <HeroContentMarkup />
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   First Visit Hero
   - Auto-plays ONLY the "Hone." swivel (scroll locked)
   - Then unlocks scroll → 300vh scroll-driven for the rest
   ──────────────────────────────────────────────────────────── */
function FirstVisitHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const [swivelDone, setSwivelDone] = useState(false);
  const [, animate] = useAnimate();

  // Auto-play swivel after splash dismissed
  useEffect(() => {
    let cancelled = false;
    document.body.style.overflow = "hidden";

    (async () => {
      // Swivel "Hone"
      if (wordmarkRef.current) {
        await animate(
          wordmarkRef.current,
          { transform: "rotateY(0deg)", opacity: 1 },
          { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
        );
      }
      if (cancelled) return;

      // Swivel teal dot
      if (dotRef.current) {
        await animate(
          dotRef.current,
          { transform: "rotateY(0deg)", opacity: 1 },
          { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
        );
      }
      if (cancelled) return;

      // Brief hold to appreciate the wordmark
      await new Promise((r) => setTimeout(r, 300));
      if (cancelled) return;

      // Unlock scroll — scroll-driven animation takes over
      setSwivelDone(true);
      document.body.style.overflow = "";
    })();

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
    };
  }, [animate]);

  /* ── Scroll transforms (phases 2–4, swivel phase is auto-played) ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* Scroll prompt fades out before wordmark starts scaling */
  const promptOpacity = useTransform(scrollYProgress, [0, 0.10], [1, 0]);

  /* Phase 2 (18–35%): wordmark scales up + fades out */
  const wordmarkScale = useTransform(scrollYProgress, [0.18, 0.28, 0.35], [1, 1.3, 1.3]);
  const wordmarkFadeOut = useTransform(scrollYProgress, [0.25, 0.35], [1, 0]);
  const wordmarkY = useTransform(scrollYProgress, [0.18, 0.35], [0, -40]);

  /* Phase 3 (32–58%): hero content staggers in */
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

  return (
    <section ref={containerRef} className="relative min-h-[200vh] bg-snow dark:bg-ink">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="hero-gradient absolute inset-0" />
        <div className="hero-grid absolute inset-0" />

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
          {/* ── Wordmark: swivel via auto-play, scale/fade via scroll ── */}
          <motion.div style={{ opacity: wordmarkFadeOut, y: wordmarkY, scale: wordmarkScale }}>
            <div className="flex items-baseline justify-center" style={{ perspective: 800 }}>
              <h1
                ref={wordmarkRef}
                style={{
                  transform: swivelDone ? "rotateY(0deg)" : "rotateY(90deg)",
                  opacity: swivelDone ? 1 : 0,
                  fontSize: "clamp(4rem, 15vw, 10rem)",
                  letterSpacing: "-0.03em",
                }}
                className="font-display font-semibold text-ink dark:text-white"
              >
                Hone
              </h1>
              <span
                ref={dotRef}
                style={{
                  transform: swivelDone ? "rotateY(0deg)" : "rotateY(90deg)",
                  opacity: swivelDone ? 1 : 0,
                  fontSize: "clamp(4rem, 15vw, 10rem)",
                }}
                className="font-display font-semibold text-teal"
              >
                .
              </span>
            </div>
          </motion.div>

          {/* ── Scroll prompt: appears after swivel, fades on scroll ── */}
          {swivelDone && <ScrollPrompt scrollOpacity={promptOpacity} />}

          {/* ── Hero content: scroll-driven ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center mx-auto max-w-4xl px-6 text-center">
            <motion.div
              style={{ opacity: pillOpacity, y: pillY }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal-ghost px-4 py-2"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-teal animate-blink" />
              <span className="font-mono text-xs uppercase tracking-widest text-teal">
                Fractional Ops &amp; Tech Partner
              </span>
            </motion.div>

            <motion.h2
              style={{ opacity: headlineOpacity, y: headlineY, fontSize: "clamp(2rem, 6vw, 3.5rem)", letterSpacing: "-0.03em" }}
              className="font-display font-bold text-ink dark:text-white leading-tight"
            >
              Your business needs a full ops and tech team.
            </motion.h2>

            <motion.p
              style={{ opacity: subtitleOpacity, y: subtitleY, fontSize: "clamp(1.25rem, 3vw, 2rem)" }}
              className="mt-4 font-display text-teal leading-tight"
            >
              You don&apos;t need to hire one.
            </motion.p>

            <motion.p
              style={{ opacity: descOpacity, y: descY }}
              className="mx-auto mt-6 max-w-2xl font-body text-lg font-light text-graphite dark:text-ash"
            >
              I handle strategy, systems, and your website — so you&apos;re not managing a whole team to get it done.
            </motion.p>

            <motion.div
              style={{ opacity: ctaOpacity, y: ctaY }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <HeroContentMarkup />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Return Visit Hero
   - Auto-plays: swivel → grow large → fade (scroll locked)
   - Then unlocks scroll → 300vh scroll-driven for hero content
   ──────────────────────────────────────────────────────────── */
function ReturnVisitHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [autoPlayDone, setAutoPlayDone] = useState(false);
  const [, animate] = useAnimate();

  // Auto-play swivel + scale/fade on mount (scroll locked)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      document.body.style.overflow = "hidden";

      // Phase 1: "Hone" swivels in
      if (wordmarkRef.current) {
        await animate(
          wordmarkRef.current,
          { transform: "rotateY(0deg)", opacity: 1 },
          { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
        );
      }
      if (cancelled) return;

      // Teal dot swivels in
      if (dotRef.current) {
        await animate(
          dotRef.current,
          { transform: "rotateY(0deg)", opacity: 1 },
          { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
        );
      }
      if (cancelled) return;

      // Hold
      await new Promise((r) => setTimeout(r, 500));
      if (cancelled) return;

      // Phase 2: Wordmark grows large + fades out
      if (wrapperRef.current) {
        await animate(
          wrapperRef.current,
          { transform: "scale(1.3) translateY(-40px)", opacity: 0 },
          { duration: 0.6, ease: "easeInOut" },
        );
      }
      if (cancelled) return;

      // Auto-play done — unlock scroll, scroll-driven content takes over
      setAutoPlayDone(true);
      document.body.style.overflow = "";
    })();

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
    };
  }, [animate]);

  /* ── Scroll transforms for hero content ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* Scroll prompt fades out as content starts appearing */
  const promptOpacityReturn = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  /* Content staggers in via scroll (compressed ranges — wordmark is auto-played) */
  const pillOpacity = useTransform(scrollYProgress, [0.05, 0.12], [0, 1]);
  const pillY = useTransform(scrollYProgress, [0.05, 0.12], [30, 0]);

  const headlineOpacity = useTransform(scrollYProgress, [0.10, 0.18], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.10, 0.18], [30, 0]);

  const subtitleOpacity = useTransform(scrollYProgress, [0.16, 0.24], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.16, 0.24], [30, 0]);

  const descOpacity = useTransform(scrollYProgress, [0.22, 0.30], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.22, 0.30], [30, 0]);

  const ctaOpacity = useTransform(scrollYProgress, [0.28, 0.36], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.28, 0.36], [30, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[200vh] bg-snow dark:bg-ink">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="hero-gradient absolute inset-0" />
        <div className="hero-grid absolute inset-0" />

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
          {/* ── Wordmark (auto-play: swivels in, grows large, fades out) ── */}
          {!autoPlayDone && (
            <div ref={wrapperRef} style={{ perspective: 800 }}>
              <div className="flex items-baseline justify-center">
                <h1
                  ref={wordmarkRef}
                  style={{
                    transform: "rotateY(90deg)",
                    opacity: 0,
                    fontSize: "clamp(4rem, 15vw, 10rem)",
                    letterSpacing: "-0.03em",
                  }}
                  className="font-display font-semibold text-ink dark:text-white"
                >
                  Hone
                </h1>
                <span
                  ref={dotRef}
                  style={{
                    transform: "rotateY(90deg)",
                    opacity: 0,
                    fontSize: "clamp(4rem, 15vw, 10rem)",
                  }}
                  className="font-display font-semibold text-teal"
                >
                  .
                </span>
              </div>
            </div>
          )}

          {/* ── Scroll prompt: appears after auto-play, fades on scroll ── */}
          {autoPlayDone && <ScrollPrompt scrollOpacity={promptOpacityReturn} />}

          {/* ── Hero content: scroll-driven (visible after auto-play) ── */}
          {autoPlayDone && (
            <div className="absolute inset-0 flex flex-col items-center justify-center mx-auto max-w-4xl px-6 text-center">
              <motion.div
                style={{ opacity: pillOpacity, y: pillY }}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal-ghost px-4 py-2"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-teal animate-blink" />
                <span className="font-mono text-xs uppercase tracking-widest text-teal">
                  Fractional Ops &amp; Tech Partner
                </span>
              </motion.div>

              <motion.h2
                style={{ opacity: headlineOpacity, y: headlineY, fontSize: "clamp(2rem, 6vw, 3.5rem)", letterSpacing: "-0.03em" }}
                className="font-display font-bold text-ink dark:text-white leading-tight"
              >
                Your business needs a full ops and tech team.
              </motion.h2>

              <motion.p
                style={{ opacity: subtitleOpacity, y: subtitleY, fontSize: "clamp(1.25rem, 3vw, 2rem)" }}
                className="mt-4 font-display text-teal leading-tight"
              >
                You don&apos;t need to hire one.
              </motion.p>

              <motion.p
                style={{ opacity: descOpacity, y: descY }}
                className="mx-auto mt-6 max-w-2xl font-body text-lg font-light text-graphite dark:text-ash"
              >
                I handle strategy, systems, and your website — so you&apos;re not managing a whole team to get it done.
              </motion.p>

              <motion.div
                style={{ opacity: ctaOpacity, y: ctaY }}
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
              >
                <HeroContentMarkup />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Main Export — routes to the right hero variant
   ──────────────────────────────────────────────────────────── */
export default function HeroIntro() {
  const prefersReducedMotion = useReducedMotion();
  const [mode, setMode] = useState<"first" | "return" | "static" | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setMode("static");
      return;
    }

    const handleDismissed = () => setMode("first");
    const handleSkipped = () => setMode("return");

    window.addEventListener("splash-dismissed", handleDismissed);
    window.addEventListener("splash-skipped", handleSkipped);

    // Fallback if neither event fires
    const fallback = setTimeout(() => {
      setMode((prev) => {
        if (prev) return prev;
        // Check if splash was shown (sessionStorage flag set by SplashScreen)
        try {
          return sessionStorage.getItem("hone-splash") === "1" ? "return" : "first";
        } catch {
          return "return";
        }
      });
    }, 200);

    return () => {
      window.removeEventListener("splash-dismissed", handleDismissed);
      window.removeEventListener("splash-skipped", handleSkipped);
      clearTimeout(fallback);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || mode === "static") {
    return <StaticHero />;
  }

  if (mode === "first") {
    return <FirstVisitHero />;
  }

  if (mode === "return") {
    return <ReturnVisitHero />;
  }

  // Waiting for mode — invisible placeholder to avoid layout shift
  return (
    <section className="relative min-h-screen bg-snow dark:bg-ink flex items-center justify-center overflow-hidden">
      <div className="hero-gradient absolute inset-0" />
      <div className="hero-grid absolute inset-0" />
    </section>
  );
}
