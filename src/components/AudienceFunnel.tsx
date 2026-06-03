"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

const AUDIENCES = [
  {
    number: "01",
    title: "Launch Partner",
    audience: "Founders & Early-Stage Startups",
    hook: "You need it built and there's nobody to build it.",
    description:
      "No technical co-founder, no dev team, and a pile of things that have to exist: an internal tool, an AI workflow, a web app. I scope it, build it, ship it, then stick around for whatever launch throws at you.",
    model: "Project-based engagement",
  },
  {
    number: "02",
    title: "Growth Partner",
    audience: "Small Business & E-commerce",
    hook: "Your tools don't talk to each other.",
    description:
      "Orders here, customers there, and you in the middle copying data between them by hand. I tidy the stack, automate the boring stuff, and build what's missing so the whole thing runs without you babysitting it.",
    model: "Monthly retainer",
  },
  {
    number: "03",
    title: "Backend Partner",
    audience: "Agencies & Consultants",
    hook: "You won the work. Now you need someone to build it.",
    description:
      "You keep the client relationship. I'm the technical muscle behind it: white-label web and software work you can put your name on, delivered without the drama.",
    model: "White-label partnership",
  },
] as const;

export default function AudienceFunnel() {
  return (
    <section className="scanlines bg-dark py-16 px-6 pattern-scan border-b-[3px] border-black/40">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-yellow"
          >
            <span className="inline-block h-px w-6 bg-red" />
            Who I Help
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl font-extrabold tracking-[-0.02em] text-cream md:text-5xl"
          >
            So who hires me?
          </motion.h2>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {AUDIENCES.map((item) => (
            <motion.div
              key={item.number}
              variants={fadeUp}
              whileHover={{
                scale: 1.02,
                borderColor: "var(--color-red)",
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="relative h-full rounded-xl border-2 border-black/30 bg-[#211c18] p-8 transition-colors"
            >
              {/* Eyebrow */}
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-cream/40">
                Package {item.number}
              </p>

              {/* Title */}
              <h3 className="mb-1 font-display text-2xl font-bold text-cream">
                {item.title}
              </h3>

              {/* Audience */}
              <p className="mb-4 text-sm text-cream/45">{item.audience}</p>

              {/* Hook Quote */}
              <p className="mb-4 font-display text-lg italic text-red">
                &ldquo;{item.hook}&rdquo;
              </p>

              {/* Description */}
              <p className="mb-6 font-light leading-relaxed text-cream/65">
                {item.description}
              </p>

              {/* Engagement Model */}
              <div className="border-t border-white/10 pt-4">
                <p className="font-mono text-xs uppercase tracking-widest text-yellow/80">
                  {item.model}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
