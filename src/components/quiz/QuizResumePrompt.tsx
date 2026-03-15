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
        className="w-full max-w-lg rounded-lg border border-slate bg-carbon p-8"
      >
      <h2 className="mb-2 font-display text-2xl font-medium text-white">
        Welcome back!
      </h2>
      
      <p className="mb-6 text-fog">
        You have a quiz in progress
        <span className="ml-1 font-mono text-sm text-ash">
          (Question {questionNumber} of {totalQuestions})
        </span>
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <motion.button
          onClick={onResume}
          className="flex-1 rounded-sm bg-teal px-6 py-3 font-mono text-sm uppercase tracking-widest text-ink transition-colors hover:bg-teal-bright"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={springTransition}
        >
          Continue
        </motion.button>

        <motion.button
          onClick={onStartFresh}
          className="flex-1 rounded-sm border border-slate bg-transparent px-6 py-3 font-mono text-sm uppercase tracking-widest text-fog transition-colors hover:border-iron hover:bg-slate/50 hover:text-white"
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
