"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import ParallaxLayer from "@/components/ParallaxLayer";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-ink flex items-center justify-center overflow-hidden">
      {/* Background Layer 1 — Gradient */}
      <ParallaxLayer offset={0.15} className="absolute inset-0">
        <div className="hero-gradient absolute inset-0" />
      </ParallaxLayer>

      {/* Background Layer 2 — Grid */}
      <ParallaxLayer offset={0.08} className="absolute inset-0">
        <div className="hero-grid absolute inset-0" />
      </ParallaxLayer>

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        {/* Pill Badge */}
        <motion.div variants={fadeUp} className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal-ghost px-4 py-2">
          <span className="inline-block h-2 w-2 rounded-full bg-teal animate-blink" />
          <span className="font-mono text-xs uppercase tracking-widest text-teal">
            Fractional Ops &amp; Tech Partner
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display font-bold text-white leading-tight"
          style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", letterSpacing: "-0.03em" }}
        >
          Your business needs a full ops and tech team.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mt-4 font-display text-teal leading-tight"
          style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
        >
          You don&apos;t need to hire one.
        </motion.p>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl font-body text-lg font-light text-ash"
        >
          Strategy, systems, and websites — one partner, zero overhead.
        </motion.p>

        {/* CTA Pair */}
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-sm bg-teal px-8 py-3 font-mono text-sm uppercase tracking-widest text-ink transition-colors hover:bg-teal-bright"
          >
            Book a Discovery Call
          </Link>
          <Link
            href="/work"
            className="rounded-sm border border-ash/30 bg-transparent px-8 py-3 font-mono text-sm uppercase tracking-widest text-ash transition-colors hover:border-teal hover:text-teal"
          >
            See My Work
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
