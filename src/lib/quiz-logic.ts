import type {
  QuizScores,
  QuizAnswer,
  QuizRecommendation,
  UrgencyLevel,
} from "@/types/quiz";
import { QUIZ_QUESTIONS } from "./quiz-data";

/* ── Initial State ── */

export function getInitialScores(): QuizScores {
  return {
    web: 0,
    ai: 0,
    strategy: 0,
    launchPartner: 0,
    growthPartner: 0,
    backendPartner: 0,
  };
}

/* ── Score Calculation ── */

export function calculateScores(answers: QuizAnswer[]): QuizScores {
  const scores = getInitialScores();

  for (const answer of answers) {
    const question = QUIZ_QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) continue;

    const option = question.options.find((o) => o.id === answer.optionId);
    if (!option) continue;

    // Add scores from this answer
    const optionScores = option.scores;
    if (optionScores.web) scores.web += optionScores.web;
    if (optionScores.ai) scores.ai += optionScores.ai;
    if (optionScores.strategy) scores.strategy += optionScores.strategy;
    if (optionScores.launchPartner) scores.launchPartner += optionScores.launchPartner;
    if (optionScores.growthPartner) scores.growthPartner += optionScores.growthPartner;
    if (optionScores.backendPartner) scores.backendPartner += optionScores.backendPartner;
  }

  return scores;
}

/* ── Urgency Extraction ── */

export function extractUrgency(answers: QuizAnswer[]): UrgencyLevel {
  // Find the timeline question answer (last question)
  const timelineAnswer = answers.find((a) => a.questionId === "goals-2");
  if (!timelineAnswer) return "exploring";

  const question = QUIZ_QUESTIONS.find((q) => q.id === "goals-2");
  if (!question) return "exploring";

  const option = question.options.find((o) => o.id === timelineAnswer.optionId);
  return option?.urgency ?? "exploring";
}

/* ── Recommendation Generation ── */

export function generateRecommendation(scores: QuizScores): QuizRecommendation {
  // Determine primary and secondary services
  const services: Array<{ key: "web" | "ai" | "strategy"; score: number }> = [
    { key: "web", score: scores.web },
    { key: "ai", score: scores.ai },
    { key: "strategy", score: scores.strategy },
  ];

  // Sort by score descending
  services.sort((a, b) => b.score - a.score);

  const primary = services[0];
  const secondary = services[1];

  // Secondary only shows if within 3 points of primary and has meaningful score
  const hasSecondary =
    secondary.score >= 3 && primary.score - secondary.score <= 3;

  // Determine audience segment
  const audiences: Array<{
    key: "launchPartner" | "growthPartner" | "backendPartner";
    score: number;
  }> = [
    { key: "launchPartner", score: scores.launchPartner },
    { key: "growthPartner", score: scores.growthPartner },
    { key: "backendPartner", score: scores.backendPartner },
  ];

  audiences.sort((a, b) => b.score - a.score);

  return {
    primaryService: primary.key,
    secondaryService: hasSecondary ? secondary.key : null,
    audienceSegment: audiences[0].key,
  };
}

/* ── Score Percentage (for visualization) ── */

export function getServicePercentages(scores: QuizScores): {
  web: number;
  ai: number;
  strategy: number;
} {
  const total = scores.web + scores.ai + scores.strategy;
  if (total === 0) {
    return { web: 33, ai: 33, strategy: 34 };
  }

  return {
    web: Math.round((scores.web / total) * 100),
    ai: Math.round((scores.ai / total) * 100),
    strategy: Math.round((scores.strategy / total) * 100),
  };
}

/* ── Get Matching Case Studies ── */

export function getMatchingPillars(recommendation: QuizRecommendation): string[] {
  const pillars: string[] = [];

  // Map service keys to pillar names used in case studies
  const pillarMap: Record<"web" | "ai" | "strategy", string> = {
    web: "Web",
    ai: "AI",
    strategy: "Strategy",
  };

  pillars.push(pillarMap[recommendation.primaryService]);

  if (recommendation.secondaryService) {
    pillars.push(pillarMap[recommendation.secondaryService]);
  }

  return pillars;
}

/* ── CTA Text Based on Urgency ── */

export function getCtaText(urgency: UrgencyLevel): {
  headline: string;
  button: string;
  subtext: string;
} {
  switch (urgency) {
    case "high":
      return {
        headline: "Ready to get started?",
        button: "Book a Call",
        subtext: "Let's discuss your project and find the best path forward.",
      };
    case "medium":
      return {
        headline: "Let's plan your next move",
        button: "Schedule a Chat",
        subtext: "We can start mapping out the approach that fits your timeline.",
      };
    case "low":
      return {
        headline: "Good timing to start planning",
        button: "Get in Touch",
        subtext: "Let's connect now so we're ready when you are.",
      };
    case "exploring":
    default:
      return {
        headline: "Questions? Let's talk",
        button: "Start a Conversation",
        subtext: "No pressure — just an honest conversation about what you need.",
      };
  }
}
