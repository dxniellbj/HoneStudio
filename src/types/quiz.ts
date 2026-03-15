/* ── Quiz Types ── */

export interface QuizScores {
  web: number;
  ai: number;
  strategy: number;
  launchPartner: number;   // Founders
  growthPartner: number;   // SMBs
  backendPartner: number;  // Agencies
}

export type UrgencyLevel = "high" | "medium" | "low" | "exploring";

export interface QuizOption {
  id: string;
  label: string;
  scores: Partial<QuizScores>;
  urgency?: UrgencyLevel;
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: QuizOption[];
}

export interface QuizAnswer {
  questionId: string;
  optionId: string;
  questionText: string;
  answerText: string;
}

export interface QuizRecommendation {
  primaryService: "web" | "ai" | "strategy";
  secondaryService: "web" | "ai" | "strategy" | null;
  audienceSegment: "launchPartner" | "growthPartner" | "backendPartner";
}

export interface QuizState {
  currentStep: number;
  answers: QuizAnswer[];
  scores: QuizScores;
  urgency: UrgencyLevel;
  isComplete: boolean;
  email?: string;
  name?: string;
  company?: string;
}

export interface QuizSubmission {
  createdAt: string;
  scores: QuizScores;
  recommendation: QuizRecommendation;
  answers: QuizAnswer[];
  email: string;
  name?: string;
  company?: string;
  urgency: UrgencyLevel;
}

// Service display info for results
export interface ServiceDisplay {
  key: "web" | "ai" | "strategy";
  title: string;
  accent: "teal" | "signal" | "indigo";
  tagline: string;
  description: string;
  outcomes: string[];
}

// Audience segment display info
export interface AudienceDisplay {
  key: "launchPartner" | "growthPartner" | "backendPartner";
  title: string;
  subtitle: string;
  description: string;
  engagement: string;
}
