"use client";

import { motion } from "framer-motion";
import { springTransition } from "@/lib/animations";
import { QUIZ_QUESTIONS } from "@/lib/quiz-data";

interface QuizResumePromptProps {
  currentStep: number;
  onResume: () => void;
  onStartFresh: () => void;
}

export default function QuizResumePrompt({
  currentStep,
  onResume,
  onStartFresh,
}: QuizResumePromptProps) {
  const totalQuestions = QUIZ_QUESTIONS.length;
  // Display 1-indexed question number (currentStep is 0-indexed)
  const questionNumber = currentStep + 1;

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={springTransition}
        className="w-full max-w-lg rounded-lg border-2 border-shadow bg-beige p-8"
      >
      <h2 className="mb-2 font-display font-extrabold tracking-[-0.02em] text-2xl text-dark">
        Welcome back!
      </h2>

      <p className="mb-6 text-dark/65">
        You have a quiz in progress
        <span className="ml-1 font-mono text-sm text-dark/50">
          (Question {questionNumber} of {totalQuestions})
        </span>
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <motion.button
          onClick={onResume}
          className="btn btn--primary flex-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={springTransition}
        >
          Continue
        </motion.button>

        <motion.button
          onClick={onStartFresh}
          className="btn btn--outline flex-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={springTransition}
        >
          Start Fresh
        </motion.button>
      </div>
    </motion.div>
    </div>
  );
}
