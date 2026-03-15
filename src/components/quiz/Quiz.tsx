"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type {
  QuizState,
  QuizAnswer,
  QuizOption,
  QuizRecommendation,
  QuizSubmission,
} from "@/types/quiz";
import { QUIZ_QUESTIONS } from "@/lib/quiz-data";
import {
  getInitialScores,
  calculateScores,
  extractUrgency,
  generateRecommendation,
} from "@/lib/quiz-logic";
import {
  saveQuizProgress,
  loadQuizProgress,
  clearQuizProgress,
  markQuizCompleted,
  hasCompletedQuiz,
  type SavedQuizState,
} from "@/lib/quiz-storage";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import QuizEmailCapture from "./QuizEmailCapture";
import QuizResults from "./QuizResults";
import QuizResumePrompt from "./QuizResumePrompt";
import { fadeUp } from "@/lib/animations";

type QuizPhase = "questions" | "email" | "results" | "resume";

export default function Quiz() {
  const [state, setState] = useState<QuizState>({
    currentStep: 0,
    answers: [],
    scores: getInitialScores(),
    urgency: "exploring",
    isComplete: false,
  });

  const [phase, setPhase] = useState<QuizPhase>("questions");
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<QuizRecommendation | null>(
    null
  );

  const [savedProgress, setSavedProgress] = useState<SavedQuizState | null>(null);
  const hasInitialized = useRef(false);

  const currentQuestion = QUIZ_QUESTIONS[state.currentStep];
  const currentAnswer = state.answers.find(
    (a) => a.questionId === currentQuestion?.id
  );

  // Check for saved progress on mount
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Skip resume prompt if user already completed the quiz
    if (hasCompletedQuiz()) {
      return;
    }

    const saved = loadQuizProgress();
    if (saved && saved.currentStep < QUIZ_QUESTIONS.length) {
      setSavedProgress(saved);
      setPhase("resume");
    }
  }, []);

  // Save progress on answer or step change (only during questions phase)
  useEffect(() => {
    if (phase === "questions" && hasInitialized.current) {
      saveQuizProgress(state.currentStep, state.answers);
    }
  }, [state.currentStep, state.answers, phase]);

  const handleResume = useCallback(() => {
    if (savedProgress) {
      setState((prev) => ({
        ...prev,
        currentStep: savedProgress.currentStep,
        answers: savedProgress.answers,
      }));
      setSavedProgress(null);
      setPhase("questions");
    }
  }, [savedProgress]);

  const handleStartFresh = useCallback(() => {
    clearQuizProgress();
    setSavedProgress(null);
    setState({
      currentStep: 0,
      answers: [],
      scores: getInitialScores(),
      urgency: "exploring",
      isComplete: false,
    });
    setPhase("questions");
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (phase !== "questions") return;

      const options = currentQuestion?.options ?? [];

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        // Find current selection index
        const currentIndex = currentAnswer
          ? options.findIndex((o) => o.id === currentAnswer.optionId)
          : -1;

        let newIndex: number;
        if (e.key === "ArrowDown") {
          newIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        } else {
          newIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        }

        handleSelect(options[newIndex]);
      }

      if (e.key === "Enter" && currentAnswer) {
        e.preventDefault();
        handleNext();
      }

      if (e.key === "Backspace" && state.currentStep > 0) {
        e.preventDefault();
        handleBack();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, currentQuestion, currentAnswer, state.currentStep]);

  const handleSelect = useCallback((option: QuizOption) => {
    setState((prev) => {
      // Remove existing answer for this question if any
      const filteredAnswers = prev.answers.filter(
        (a) => a.questionId !== currentQuestion.id
      );

      const newAnswer: QuizAnswer = {
        questionId: currentQuestion.id,
        optionId: option.id,
        questionText: currentQuestion.question,
        answerText: option.label,
      };

      return {
        ...prev,
        answers: [...filteredAnswers, newAnswer],
      };
    });

    // Auto-advance after a brief delay to show selection
    setTimeout(() => {
      setDirection(1);
      if (state.currentStep < QUIZ_QUESTIONS.length - 1) {
        setState((prev) => ({
          ...prev,
          currentStep: prev.currentStep + 1,
        }));
      } else {
        // Quiz complete, move to email capture
        setState((prev) => {
          const scores = calculateScores(prev.answers);
          const urgency = extractUrgency(prev.answers);
          return {
            ...prev,
            scores,
            urgency,
            isComplete: true,
          };
        });
        setPhase("email");
      }
    }, 300);
  }, [currentQuestion, state.currentStep]);

  const handleNext = useCallback(() => {
    if (!currentAnswer) return;

    setDirection(1);

    if (state.currentStep < QUIZ_QUESTIONS.length - 1) {
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }));
    } else {
      // Quiz complete, move to email capture
      const scores = calculateScores(state.answers);
      const urgency = extractUrgency(state.answers);
      setState((prev) => ({
        ...prev,
        scores,
        urgency,
        isComplete: true,
      }));
      setPhase("email");
    }
  }, [currentAnswer, state.currentStep, state.answers]);

  const handleBack = useCallback(() => {
    if (state.currentStep > 0) {
      setDirection(-1);
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep - 1,
      }));
    }
  }, [state.currentStep]);

  const handleEmailSubmit = useCallback(
    async (data: { email: string; name?: string; company?: string }) => {
      setIsSubmitting(true);
      setSubmitError(null);

      const scores = calculateScores(state.answers);
      const urgency = extractUrgency(state.answers);
      const rec = generateRecommendation(scores);

      const submission: QuizSubmission = {
        createdAt: new Date().toISOString(),
        scores,
        recommendation: rec,
        answers: state.answers,
        email: data.email,
        name: data.name,
        company: data.company,
        urgency,
      };

      try {
        const res = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submission),
        });

        if (!res.ok) {
          throw new Error("Failed to submit quiz");
        }

        // Update state with email data
        setState((prev) => ({
          ...prev,
          email: data.email,
          name: data.name,
          company: data.company,
          scores,
          urgency,
        }));

        setRecommendation(rec);
        setPhase("results");
        clearQuizProgress();
        markQuizCompleted();
      } catch {
        setSubmitError("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [state.answers]
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:py-20">
      <AnimatePresence mode="wait">
        {phase === "resume" && savedProgress && (
          <motion.div
            key="resume"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizResumePrompt
              currentStep={savedProgress.currentStep}
              onResume={handleResume}
              onStartFresh={handleStartFresh}
            />
          </motion.div>
        )}

        {phase === "questions" && (
          <motion.div
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Progress */}
            <QuizProgress
              currentStep={state.currentStep}
              currentCategory={currentQuestion.category}
            />

            {/* Question */}
            <QuizQuestion
              question={currentQuestion}
              selectedOptionId={currentAnswer?.optionId ?? null}
              onSelect={handleSelect}
              direction={direction}
            />

            {/* Navigation */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex items-center justify-between"
            >
              <button
                onClick={handleBack}
                disabled={state.currentStep === 0}
                className="font-mono text-xs uppercase tracking-widest text-ash transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="rounded-sm bg-teal px-6 py-2.5 font-mono text-sm uppercase tracking-widest text-ink transition-colors hover:bg-teal-bright disabled:cursor-not-allowed disabled:opacity-50"
              >
                {state.currentStep === QUIZ_QUESTIONS.length - 1
                  ? "See Results"
                  : "Next"}
              </button>
            </motion.div>

            {/* Keyboard Hint */}
            <p className="mt-8 hidden text-center font-mono text-xs text-graphite md:block">
              Use arrow keys to navigate, Enter to continue
            </p>
          </motion.div>
        )}

        {phase === "email" && (
          <motion.div
            key="email"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <QuizEmailCapture
              onSubmit={handleEmailSubmit}
              isSubmitting={isSubmitting}
              error={submitError}
            />
          </motion.div>
        )}

        {phase === "results" && recommendation && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <QuizResults
              recommendation={recommendation}
              scores={state.scores}
              urgency={state.urgency}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
