"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CaseStudyCard from "@/components/CaseStudyCard";
import { CASE_STUDIES, PILLAR_FILTERS, type PillarFilter } from "@/lib/data";

export default function WorkGrid() {
  const [active, setActive] = useState<PillarFilter>("All");

  const filtered =
    active === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((s) => s.pillars.includes(active));

  return (
    <div>
      {/* Filter Pills */}
      <div className="mb-12 flex flex-wrap gap-3" role="group" aria-label="Filter by pillar">
        {PILLAR_FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            aria-pressed={active === filter}
            className={`rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
              active === filter
                ? "border-teal bg-teal text-ink"
                : "border-cloud dark:border-slate bg-snow dark:bg-ink text-graphite dark:text-ash hover:border-teal hover:text-teal"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((study) => (
            <motion.div
              key={study.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <CaseStudyCard {...study} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-ash">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
