"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

const AUDIENCES = [
  {
    number: "01",
    title: "Launch Partner",
    audience: "Founders & Early-Stage Startups",
    hook: "Move fast without hiring.",
    description:
      "You've got a vision and a deadline but no dev team. I step in and handle the ops and tech — from MVP to launch and whatever comes after.",
    model: "Project-based engagement",
  },
  {
    number: "02",
    title: "Growth Partner",
    audience: "Small Business & E-commerce",
    hook: "Stop duct-taping your systems together.",
    description:
      "Your business is growing but your tools aren't. I clean up the stack, automate the workflows, and build what you need to keep scaling.",
    model: "Monthly retainer",
  },
  {
    number: "03",
    title: "Backend Partner",
    audience: "Agencies & Consultants",
    hook: "Your behind-the-scenes execution partner.",
    description:
      "You handle the client relationship. I handle the build — white-label web development, automation, and technical execution you can trust.",
    model: "White-label partnership",
  },
] as const;

export default function AudienceFunnel() {
  return (
    <section className="bg-snow dark:bg-ink py-16 px-6 pattern-dots">
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
            className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash"
          >
            <span className="inline-block h-px w-6 bg-teal" />
            Who I Help
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl text-section-title text-ink dark:text-white md:text-5xl"
          >
            I Work With...
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
                scale: 1.03,
                borderColor: "var(--color-teal)",
                boxShadow: "0 8px 30px rgba(0,212,170,0.12)",
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="relative h-full rounded-md border border-cloud dark:border-slate bg-white dark:bg-carbon p-8 transition-colors"
            >
              {/* Eyebrow */}
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-ash">
                Package {item.number}
              </p>

              {/* Title */}
              <h3 className="mb-1 font-display text-2xl font-medium text-ink dark:text-white">
                {item.title}
              </h3>

              {/* Audience */}
              <p className="mb-4 text-sm text-ash">{item.audience}</p>

              {/* Hook Quote */}
              <p className="mb-4 font-display text-lg italic text-teal-deep dark:text-teal">
                &ldquo;{item.hook}&rdquo;
              </p>

              {/* Description */}
              <p className="mb-6 text-section-desc leading-relaxed text-graphite dark:text-ash">
                {item.description}
              </p>

              {/* Engagement Model */}
              <div className="border-t border-cloud dark:border-slate pt-4">
                <p className="font-mono text-xs uppercase tracking-widest text-ash">
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
