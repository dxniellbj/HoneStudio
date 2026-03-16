"use client";

import { motion } from "framer-motion";
import { QUIZ_CATEGORIES, TOTAL_QUESTIONS } from "@/lib/quiz-data";

interface QuizProgressProps {
  currentStep: number;
  currentCategory: string;
}

export default function QuizProgress({
  currentStep,
  currentCategory,
}: QuizProgressProps) {
  const progress = ((currentStep + 1) / TOTAL_QUESTIONS) * 100;

  return (
    <div className="mb-8">
      {/* Category & Step Counter */}
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-teal dark:text-teal-dark">
          {currentCategory}
        </span>
        <span className="font-mono text-xs text-ash">
          {currentStep + 1} / {TOTAL_QUESTIONS}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-slate">
        <motion.div
          className="absolute left-0 top-0 h-full bg-teal dark:bg-teal-dark"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>

      {/* Category Dots */}
      <div className="mt-3 flex justify-center gap-2">
        {QUIZ_CATEGORIES.map((category, index) => {
          const categoryIndex = QUIZ_CATEGORIES.indexOf(currentCategory as typeof QUIZ_CATEGORIES[number]);
          const isActive = index === categoryIndex;
          const isComplete = index < categoryIndex;

          return (
            <div
              key={category}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                isComplete
                  ? "bg-teal dark:bg-teal-dark"
                  : isActive
                    ? "bg-teal dark:bg-teal-dark"
                    : "bg-iron"
              }`}
              title={category}
            />
          );
        })}
      </div>
    </div>
  );
}
