"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CaseStudyCard from "@/components/CaseStudyCard";
import ScrollReveal from "@/components/ScrollReveal";
import {
  CASE_STUDIES,
  NOTABLE_MENTIONS,
  PILLAR_FILTERS,
  type PillarFilter,
} from "@/lib/data";

export default function WorkGrid() {
  const [active, setActive] = useState<PillarFilter>("All");

  const filteredStudies =
    active === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((s) => s.pillars.includes(active));

  const filteredMentions =
    active === "All"
      ? NOTABLE_MENTIONS
      : NOTABLE_MENTIONS.filter((m) => m.pillars.includes(active));

  const hasResults = filteredStudies.length > 0 || filteredMentions.length > 0;

  return (
    <div>
      {/* Filter Pills */}
      <div className="mb-8 flex flex-wrap gap-3" role="group" aria-label="Filter by pillar">
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

      {/* Case Study Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredStudies.map((study) => (
            <motion.div
              key={study.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="h-full"
            >
              <CaseStudyCard {...study} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Notable Mentions */}
      {filteredMentions.length > 0 && (
        <div className="mt-16">
          <ScrollReveal>
            <p className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal" />
              Also Worked With
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredMentions.map((mention) => (
                <motion.div
                  key={mention.client}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  <div className="flex items-start justify-between gap-6 rounded-md border border-cloud dark:border-slate bg-white dark:bg-carbon p-6 transition-all duration-300 hover:border-teal">
                    <div>
                      {mention.url ? (
                        <a
                          href={mention.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display text-lg font-medium text-ink dark:text-white transition-colors hover:text-teal"
                        >
                          {mention.client}
                          <svg className="ml-1.5 inline-block h-3.5 w-3.5 text-ash" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" />
                          </svg>
                        </a>
                      ) : (
                        <span className="font-display text-lg font-medium text-ink dark:text-white">
                          {mention.client}
                          {mention.defunct && (
                            <span className="ml-2 text-sm font-normal italic text-ash">
                              (defunct)
                            </span>
                          )}
                        </span>
                      )}
                      <p className="mt-2 text-sm leading-relaxed text-graphite dark:text-ash">
                        {mention.description}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      {mention.pillars.map((pillar) => (
                        <span
                          key={pillar}
                          className={`rounded-full border px-3 py-1 font-mono text-[11px] ${
                            pillar === "Web"
                              ? "border-teal/30 text-teal bg-teal-ghost"
                              : pillar === "AI"
                                ? "border-signal/30 text-signal bg-signal-ghost"
                                : "border-indigo/30 text-indigo bg-indigo-ghost"
                          }`}
                        >
                          {pillar}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {!hasResults && (
        <p className="mt-12 text-center text-ash">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
