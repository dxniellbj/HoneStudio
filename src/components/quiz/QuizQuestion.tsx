"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion as QuizQuestionType, QuizOption } from "@/types/quiz";
import { springTransition } from "@/lib/animations";

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedOptionId: string | null;
  onSelect: (option: QuizOption) => void;
  direction: number; // 1 for forward, -1 for back
}

const questionVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

const optionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.05,
      ...springTransition,
    },
  }),
};

export default function QuizQuestion({
  question,
  selectedOptionId,
  onSelect,
  direction,
}: QuizQuestionProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={question.id}
        custom={direction}
        variants={questionVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={springTransition}
      >
        {/* Question Text */}
        <h2 className="mb-8 font-display text-2xl font-medium text-white md:text-3xl">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedOptionId === option.id;

            return (
              <motion.button
                key={option.id}
                custom={index}
                variants={optionVariants}
                initial="hidden"
                animate="visible"
                onClick={() => onSelect(option)}
                className={`group w-full rounded-md border px-5 py-4 text-left transition-all ${
                  isSelected
                    ? "border-teal bg-teal-ghost"
                    : "border-slate bg-carbon hover:border-iron hover:bg-slate/50"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                aria-pressed={isSelected}
              >
                <div className="flex items-start gap-4">
                  {/* Radio Circle */}
                  <div
                    className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      isSelected
                        ? "border-teal bg-teal"
                        : "border-iron group-hover:border-ash"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-2 w-2 rounded-full bg-ink"
                      />
                    )}
                  </div>

                  {/* Option Text */}
                  <span
                    className={`text-sm leading-relaxed transition-colors md:text-base ${
                      isSelected ? "text-white" : "text-fog group-hover:text-white"
                    }`}
                  >
                    {option.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
