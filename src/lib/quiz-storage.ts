import type { QuizAnswer } from "@/types/quiz";

const STORAGE_KEY = "hone_quiz_progress";
const COMPLETED_KEY = "hone_quiz_completed";
const STORAGE_VERSION = 1;
const EXPIRY_DAYS = 7;

export interface SavedQuizState {
  version: number;
  currentStep: number;
  answers: QuizAnswer[];
  savedAt: string; // ISO timestamp
}

/**
 * Save quiz progress to localStorage
 */
export function saveQuizProgress(currentStep: number, answers: QuizAnswer[]): void {
  try {
    const state: SavedQuizState = {
      version: STORAGE_VERSION,
      currentStep,
      answers,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage might be full or disabled - fail silently
    console.warn("Failed to save quiz progress");
  }
}

/**
 * Load saved quiz progress from localStorage
 * Returns null if no valid progress exists
 */
export function loadQuizProgress(): SavedQuizState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const state: SavedQuizState = JSON.parse(raw);

    // Version mismatch - clear and start fresh
    if (state.version !== STORAGE_VERSION) {
      clearQuizProgress();
      return null;
    }

    // Check expiry (7 days)
    const savedDate = new Date(state.savedAt);
    const now = new Date();
    const daysDiff = (now.getTime() - savedDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysDiff > EXPIRY_DAYS) {
      clearQuizProgress();
      return null;
    }

    // Validate structure
    if (
      typeof state.currentStep !== "number" ||
      !Array.isArray(state.answers) ||
      typeof state.savedAt !== "string"
    ) {
      clearQuizProgress();
      return null;
    }

    return state;
  } catch {
    // Corrupted data - clear and start fresh
    clearQuizProgress();
    return null;
  }
}

/**
 * Clear saved quiz progress
 */
export function clearQuizProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Fail silently
  }
}

/**
 * Check if there is saved quiz progress
 */
export function hasQuizProgress(): boolean {
  return loadQuizProgress() !== null;
}

/**
 * Mark quiz as completed (user submitted successfully)
 */
export function markQuizCompleted(): void {
  try {
    localStorage.setItem(COMPLETED_KEY, new Date().toISOString());
  } catch {
    // Fail silently
  }
}

/**
 * Check if user has already completed the quiz
 */
export function hasCompletedQuiz(): boolean {
  try {
    return localStorage.getItem(COMPLETED_KEY) !== null;
  } catch {
    return false;
  }
}
