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

const PILLAR_TAG: Record<string, string> = {
  Web: "tag--red",
  AI: "tag--purple",
  Strategy: "tag--blue",
};

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
            className={`rounded-sm border-2 px-5 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
              active === filter
                ? "border-red bg-red text-cream"
                : "border-shadow bg-beige text-dark/65 hover:border-red hover:text-red"
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
            <p className="eyebrow mb-6 flex items-center gap-2">
              <span className="inline-block h-px w-6 bg-red" />
              Also Worked With
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredMentions.map((mention) => {
                const CardWrapper = mention.url ? "a" : "div";
                const cardProps = mention.url
                  ? {
                      href: mention.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {};

                return (
                  <motion.div
                    key={mention.client}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  >
                    <CardWrapper
                      {...cardProps}
                      className={`flex items-start justify-between gap-6 rounded-lg border-2 border-shadow bg-beige p-6 transition-all duration-300 hover:border-red ${mention.url ? "cursor-pointer group block hover:-translate-y-1" : ""}`}
                    >
                      <div>
                        <span className={`font-display text-lg font-bold text-dark ${mention.url ? "group-hover:text-red transition-colors" : ""}`}>
                          {mention.client}
                          {mention.url && (
                            <svg className="ml-1.5 inline-block h-3.5 w-3.5 text-dark/40 group-hover:text-red transition-colors" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" />
                            </svg>
                          )}
                          {mention.defunct && (
                            <span className="ml-2 text-sm font-normal italic text-dark/45">
                              (defunct)
                            </span>
                          )}
                        </span>
                        <p className="mt-2 text-sm leading-relaxed text-dark/65">
                          {mention.description}
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        {mention.pillars.map((pillar) => (
                          <span
                            key={pillar}
                            className={`rounded-sm border border-shadow px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide ${
                              PILLAR_TAG[pillar] ?? "tag--blue"
                            }`}
                          >
                            {pillar}
                          </span>
                        ))}
                      </div>
                    </CardWrapper>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {!hasResults && (
        <p className="mt-12 text-center text-dark/50">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
