"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useAnimate,
} from "framer-motion";

/* ── Scroll hint — shows immediately, hides on first scroll ── */
function useScrollHint(enabled: boolean) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) { setVisible(false); return; }

    setVisible(true);

    const onScroll = () => setVisible(false);
    window.addEventListener("scroll", onScroll, { once: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled]);

  return visible;
}

/* ── Floating scroll hint — centered, prominent, disappears on scroll ── */
function ScrollHint({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="scroll-hint"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="font-mono text-sm uppercase tracking-widest text-graphite dark:text-ash select-none">
              Scroll to explore
            </span>
            <motion.svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-teal"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <polyline points="7,11 14,19 21,11" />
            </motion.svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
   Static Hero — reduced-motion fallback
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
   Animated Hero (first visit & return visit)
   - Auto-plays: swivel in → hold → swivel out (scroll locked)
   - Unlocks scroll → scroll-driven hero content
   - 3s idle → floating scroll hint (centered, disappears on scroll)
   ──────────────────────────────────────────────────────────── */
function AnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const [animDone, setAnimDone] = useState(false);
  const [, animate] = useAnimate();
  const showHint = useScrollHint(animDone);

  useEffect(() => {
    let cancelled = false;
    document.body.style.overflow = "hidden";

    (async () => {
      // Swivel IN "Hone"
      if (wordmarkRef.current) {
        await animate(
          wordmarkRef.current,
          { transform: "rotateY(0deg)", opacity: 1 },
          { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
        );
      }
      if (cancelled) return;

      // Swivel IN teal dot
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

      // Swivel OUT both simultaneously
      await Promise.all([
        wordmarkRef.current
          ? animate(
              wordmarkRef.current,
              { transform: "rotateY(-90deg)", opacity: 0 },
              { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
            )
          : null,
        dotRef.current
          ? animate(
              dotRef.current,
              { transform: "rotateY(-90deg)", opacity: 0 },
              { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
            )
          : null,
      ]);
      if (cancelled) return;

      // Unlock scroll
      setAnimDone(true);
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
          {/* ── Wordmark: swivels in then out (auto-play) ── */}
          {!animDone && (
            <div style={{ perspective: 800 }}>
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

          {/* ── Scroll hint: 3s idle after animation completes ── */}
          <ScrollHint visible={showHint} />

          {/* ── Hero content: scroll-driven (visible after swivel out) ── */}
          {animDone && (
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

  if (mode === "first" || mode === "return") {
    return <AnimatedHero />;
  }

  // Waiting for mode — invisible placeholder to avoid layout shift
  return (
    <section className="relative min-h-screen bg-snow dark:bg-ink flex items-center justify-center overflow-hidden">
      <div className="hero-gradient absolute inset-0" />
      <div className="hero-grid absolute inset-0" />
    </section>
  );
}
