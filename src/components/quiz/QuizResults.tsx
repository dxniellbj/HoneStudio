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
    teal: "border-red bg-red/10 text-red",
    signal: "border-orange bg-orange/10 text-orange",
    indigo: "border-blue bg-blue/10 text-blue",
  };

  const accentBorders = {
    teal: "border-red",
    signal: "border-orange",
    indigo: "border-blue",
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
        <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-red">
          Your Results
        </span>
        <h1 className="font-display font-extrabold tracking-[-0.02em] text-3xl text-dark md:text-4xl">
          Here&apos;s what you need
        </h1>
      </motion.div>

      {/* Score Visualization */}
      <motion.div
        variants={fadeUp}
        className="mb-10 rounded-lg border-2 border-shadow bg-beige p-6"
      >
        <p className="mb-4 text-center font-mono text-xs uppercase tracking-widest text-dark/50">
          Service Fit
        </p>
        <div className="flex gap-2">
          <div
            className="h-2 rounded-full bg-red transition-all"
            style={{ width: `${percentages.web}%` }}
            title={`Web: ${percentages.web}%`}
          />
          <div
            className="h-2 rounded-full bg-orange transition-all"
            style={{ width: `${percentages.ai}%` }}
            title={`AI: ${percentages.ai}%`}
          />
          <div
            className="h-2 rounded-full bg-blue transition-all"
            style={{ width: `${percentages.strategy}%` }}
            title={`Strategy: ${percentages.strategy}%`}
          />
        </div>
        <div className="mt-3 flex justify-between text-xs">
          <span className="text-red">Web {percentages.web}%</span>
          <span className="text-orange">AI {percentages.ai}%</span>
          <span className="text-blue">Strategy {percentages.strategy}%</span>
        </div>
      </motion.div>

      {/* Primary Service Card */}
      <motion.div
        variants={scaleIn}
        className={`mb-6 overflow-hidden rounded-lg border-2 ${accentBorders[primaryService.accent]} bg-beige`}
      >
        <div className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <span
              className={`rounded-sm border px-2 py-1 font-mono text-xs uppercase tracking-wider ${accentColors[primaryService.accent]}`}
            >
              Primary Fit
            </span>
          </div>
          <h2 className="mb-2 font-display font-extrabold tracking-[-0.02em] text-2xl text-dark">
            {primaryService.title}
          </h2>
          <p className="mb-4 text-sm italic text-dark/65">{primaryService.tagline}</p>
          <p className="mb-6 text-dark/65">{primaryService.description}</p>

          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-dark/50">
              What you get
            </p>
            <ul className="space-y-2">
              {primaryService.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2 text-sm text-dark/80">
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-red"
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
          className="mb-10 rounded-lg border-2 border-shadow bg-beige p-6"
        >
          <div className="mb-3 flex items-center gap-3">
            <span
              className={`rounded-sm border px-2 py-1 font-mono text-xs uppercase tracking-wider ${accentColors[secondaryService.accent]}`}
            >
              Also Consider
            </span>
          </div>
          <h3 className="mb-2 font-display font-extrabold tracking-[-0.02em] text-xl text-dark">
            {secondaryService.title}
          </h3>
          <p className="text-sm text-dark/65">{secondaryService.tagline}</p>
        </motion.div>
      )}

      {/* Audience Segment */}
      <motion.div
        variants={fadeUp}
        className="mb-10 rounded-lg border-2 border-shadow bg-beige p-6"
      >
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-red">
          Recommended Engagement
        </p>
        <h3 className="mb-1 font-display font-extrabold tracking-[-0.02em] text-xl text-dark">
          {audience.title}
        </h3>
        <p className="mb-4 text-sm text-dark/50">{audience.subtitle}</p>
        <p className="mb-4 text-dark/65">{audience.description}</p>
        <div className="rounded-sm border border-shadow bg-cream p-4">
          <p className="text-sm text-dark/80">{audience.engagement}</p>
        </div>
      </motion.div>

      {/* Matching Case Studies */}
      {matchingCaseStudies.length > 0 && (
        <motion.div variants={fadeUp} className="mb-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-dark/50">
            Related Work
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {matchingCaseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/work/${cs.slug}`}
                className="group rounded-lg border-2 border-shadow bg-beige p-4 transition-colors hover:border-red"
              >
                <p className="mb-1 text-sm font-medium text-dark group-hover:text-red">
                  {cs.client}
                </p>
                <p className="line-clamp-2 text-xs text-dark/50">{cs.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {cs.pillars.map((pillar) => (
                    <span
                      key={pillar}
                      className="rounded-sm border border-shadow bg-cream px-1.5 py-0.5 font-mono text-[10px] uppercase text-dark/65"
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
        className="scanlines rounded-xl bg-dark p-8 text-center text-cream"
      >
        <h3 className="mb-2 font-display font-extrabold tracking-[-0.02em] text-xl text-cream">
          {cta.headline}
        </h3>
        <p className="mb-6 text-sm text-cream/70">{cta.subtext}</p>
        <Link
          href="/contact"
          className="btn btn--primary inline-block"
        >
          {cta.button}
        </Link>
      </motion.div>

      {/* Retake Quiz */}
      <motion.div variants={fadeUp} className="mt-6 text-center">
        <button
          onClick={() => window.location.reload()}
          className="font-mono text-xs uppercase tracking-widest text-dark/50 transition-colors hover:text-dark"
        >
          Retake Quiz
        </button>
      </motion.div>
    </motion.div>
  );
}
