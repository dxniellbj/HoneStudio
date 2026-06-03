"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import ConsoleWidget from "@/components/ConsoleWidget";
import MagneticButton from "@/components/MagneticButton";
import Slime from "@/components/Slime";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

function HeroButtons() {
  return (
    <>
      <MagneticButton strength={0.2} radius={80}>
        <Link href="/contact" className="btn btn--primary btn--lg">
          Book a call
        </Link>
      </MagneticButton>
      <MagneticButton strength={0.2} radius={80}>
        <Link href="/work" className="btn btn--outline btn--lg">
          See the work
        </Link>
      </MagneticButton>
    </>
  );
}

export default function HeroIntro() {
  const reduce = useReducedMotion();

  const Wordmark = (
    <h1
      className="font-display font-bold leading-[0.95] tracking-[-0.03em] text-dark"
      style={{ fontSize: "clamp(40px, 9vw, 88px)" }}
    >
      Hone<span className="text-red">.</span>
    </h1>
  );

  const Role = (
    <p
      className="mt-2 font-display font-bold leading-tight tracking-[-0.01em] text-dark"
      style={{ fontSize: "clamp(18px, 3vw, 28px)" }}
    >
      The thing you need built? I build it.
    </p>
  );

  const Bio = (
    <p className="mt-5 max-w-md text-base leading-relaxed text-dark/65">
      Tell me what your business is actually stuck on and I&apos;ll build the
      software that fixes it. Strategy, design, and the code underneath, all from
      one person who owns the result.
    </p>
  );

  return (
    <section className="scanlines relative flex min-h-[92svh] items-center overflow-hidden border-b-[3px] border-shadow bg-cream">
      <div className="hero-gradient absolute inset-0" />
      <div className="relative z-[1] mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-28 pb-28 md:grid-cols-[1fr_340px] md:gap-16 md:px-10 md:pt-32 md:pb-32">
        {/* Content */}
        {reduce ? (
          <div>
            <div className="mb-3">
              <span className="status-dot">Available — taking projects</span>
            </div>
            {Wordmark}
            {Role}
            {Bio}
            <div className="mt-8 flex flex-wrap gap-3">
              <HeroButtons />
            </div>
          </div>
        ) : (
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="mb-3">
              <span className="status-dot">Available — taking projects</span>
            </motion.div>
            <motion.div variants={item}>{Wordmark}</motion.div>
            <motion.div variants={item}>{Role}</motion.div>
            <motion.div variants={item}>{Bio}</motion.div>
            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <HeroButtons />
            </motion.div>
          </motion.div>
        )}

        {/* Console aside — moves above content on mobile */}
        {reduce ? (
          <div className="order-first md:order-none">
            <ConsoleWidget />
          </div>
        ) : (
          <motion.div
            className="order-first md:order-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 20 }}
          >
            <ConsoleWidget />
          </motion.div>
        )}
      </div>

      {/* Slime hops along the hero floor */}
      <div className="slime-track">
        <Slime />
      </div>
    </section>
  );
}
