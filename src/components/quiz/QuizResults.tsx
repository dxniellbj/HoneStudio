"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { QuizRecommendation, QuizScores, UrgencyLevel } from "@/types/quiz";
import { SERVICE_DISPLAY, AUDIENCE_DISPLAY } from "@/lib/quiz-data";
import { getCtaText, getMatchingPillars, getServicePercentages } from "@/lib/quiz-logic";
import { CASE_STUDIES } from "@/lib/data";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";

interface QuizResultsProps {
  recommendation: QuizRecommendation;
  scores: QuizScores;
  urgency: UrgencyLevel;
}

export default function QuizResults({
  recommendation,
  scores,
  urgency,
}: QuizResultsProps) {
  const primaryService = SERVICE_DISPLAY[recommendation.primaryService];
  const secondaryService = recommendation.secondaryService
    ? SERVICE_DISPLAY[recommendation.secondaryService]
    : null;
  const audience = AUDIENCE_DISPLAY[recommendation.audienceSegment];
  const cta = getCtaText(urgency);
  const percentages = getServicePercentages(scores);

  // Get matching case studies
  const matchingPillars = getMatchingPillars(recommendation);
  const matchingCaseStudies = CASE_STUDIES.filter((cs) =>
    cs.pillars.some((p) => matchingPillars.includes(p))
  ).slice(0, 2);

  const accentColors = {
    teal: "border-teal dark:border-teal-dark bg-teal-ghost text-teal dark:text-teal-dark",
    signal: "border-signal bg-signal-ghost text-signal",
    indigo: "border-indigo bg-indigo-ghost text-indigo",
  };

  const accentBorders = {
    teal: "border-teal",
    signal: "border-signal",
    indigo: "border-indigo",
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-2xl"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="mb-10 text-center">
        <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-teal dark:text-teal-dark">
          Your Results
        </span>
        <h1 className="font-display text-3xl font-medium text-white md:text-4xl">
          Here&apos;s what you need
        </h1>
      </motion.div>

      {/* Score Visualization */}
      <motion.div
        variants={fadeUp}
        className="mb-10 rounded-md border border-slate bg-carbon p-6"
      >
        <p className="mb-4 text-center font-mono text-xs uppercase tracking-widest text-ash">
          Service Fit
        </p>
        <div className="flex gap-2">
          <div
            className="h-2 rounded-full bg-teal dark:bg-teal-dark transition-all"
            style={{ width: `${percentages.web}%` }}
            title={`Web: ${percentages.web}%`}
          />
          <div
            className="h-2 rounded-full bg-signal transition-all"
            style={{ width: `${percentages.ai}%` }}
            title={`AI: ${percentages.ai}%`}
          />
          <div
            className="h-2 rounded-full bg-indigo transition-all"
            style={{ width: `${percentages.strategy}%` }}
            title={`Strategy: ${percentages.strategy}%`}
          />
        </div>
        <div className="mt-3 flex justify-between text-xs">
          <span className="text-teal dark:text-teal-dark">Web {percentages.web}%</span>
          <span className="text-signal">AI {percentages.ai}%</span>
          <span className="text-indigo">Strategy {percentages.strategy}%</span>
        </div>
      </motion.div>

      {/* Primary Service Card */}
      <motion.div
        variants={scaleIn}
        className={`mb-6 overflow-hidden rounded-md border-2 ${accentBorders[primaryService.accent]} bg-carbon`}
      >
        <div className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <span
              className={`rounded-sm px-2 py-1 font-mono text-xs uppercase tracking-wider ${accentColors[primaryService.accent]}`}
            >
              Primary Fit
            </span>
          </div>
          <h2 className="mb-2 font-display text-2xl font-medium text-white">
            {primaryService.title}
          </h2>
          <p className="mb-4 text-sm italic text-fog">{primaryService.tagline}</p>
          <p className="mb-6 text-fog">{primaryService.description}</p>

          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-ash">
              What you get
            </p>
            <ul className="space-y-2">
              {primaryService.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2 text-sm text-mist">
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal dark:text-teal-dark"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Secondary Service */}
      {secondaryService && (
        <motion.div
          variants={fadeUp}
          className="mb-10 rounded-md border border-slate bg-carbon p-6"
        >
          <div className="mb-3 flex items-center gap-3">
            <span
              className={`rounded-sm px-2 py-1 font-mono text-xs uppercase tracking-wider ${accentColors[secondaryService.accent]}`}
            >
              Also Consider
            </span>
          </div>
          <h3 className="mb-2 font-display text-xl font-medium text-white">
            {secondaryService.title}
          </h3>
          <p className="text-sm text-fog">{secondaryService.tagline}</p>
        </motion.div>
      )}

      {/* Audience Segment */}
      <motion.div
        variants={fadeUp}
        className="mb-10 rounded-md border border-slate bg-carbon p-6"
      >
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-teal dark:text-teal-dark">
          Recommended Engagement
        </p>
        <h3 className="mb-1 font-display text-xl font-medium text-white">
          {audience.title}
        </h3>
        <p className="mb-4 text-sm text-ash">{audience.subtitle}</p>
        <p className="mb-4 text-fog">{audience.description}</p>
        <div className="rounded-sm bg-slate/50 p-4">
          <p className="text-sm text-mist">{audience.engagement}</p>
        </div>
      </motion.div>

      {/* Matching Case Studies */}
      {matchingCaseStudies.length > 0 && (
        <motion.div variants={fadeUp} className="mb-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-ash">
            Related Work
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {matchingCaseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/work/${cs.slug}`}
                className="group rounded-md border border-slate bg-carbon p-4 transition-colors hover:border-iron"
              >
                <p className="mb-1 text-sm font-medium text-white group-hover:text-teal dark:group-hover:text-teal-dark">
                  {cs.client}
                </p>
                <p className="line-clamp-2 text-xs text-ash">{cs.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {cs.pillars.map((pillar) => (
                    <span
                      key={pillar}
                      className="rounded-sm bg-slate px-1.5 py-0.5 font-mono text-[10px] uppercase text-fog"
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* CTA */}
      <motion.div
        variants={fadeUp}
        className="rounded-md border border-teal bg-teal-ghost p-8 text-center"
      >
        <h3 className="mb-2 font-display text-xl font-medium text-white">
          {cta.headline}
        </h3>
        <p className="mb-6 text-sm text-fog">{cta.subtext}</p>
        <Link
          href="/contact"
          className="inline-block rounded-sm bg-teal dark:bg-teal-dark px-8 py-3 font-mono text-sm uppercase tracking-widest text-ink transition-colors hover:bg-teal-bright dark:hover:bg-teal"
        >
          {cta.button}
        </Link>
      </motion.div>

      {/* Retake Quiz */}
      <motion.div variants={fadeUp} className="mt-6 text-center">
        <button
          onClick={() => window.location.reload()}
          className="font-mono text-xs uppercase tracking-widest text-ash transition-colors hover:text-white"
        >
          Retake Quiz
        </button>
      </motion.div>
    </motion.div>
  );
}
