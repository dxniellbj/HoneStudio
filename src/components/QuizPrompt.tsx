"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const DELAY_MS = 8000; // 8 seconds
const SESSION_KEY = "hone-quiz-prompt-shown";

export default function QuizPrompt() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Don't show on quiz page or contact page
    if (pathname === "/quiz" || pathname === "/contact") return;

    // Don't show if already shown this session
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // sessionStorage not available
    }

    const timer = setTimeout(() => {
      setVisible(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, [pathname]);

  function handleDismiss() {
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed bottom-6 left-6 z-50 max-w-sm rounded-md border border-slate bg-carbon p-5 shadow-2xl"
        >
          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute right-3 top-3 text-ash transition-colors hover:text-white"
            aria-label="Dismiss"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Content */}
          <div className="pr-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-teal animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-teal">
                5-min quiz
              </span>
            </div>

            <h3 className="mb-2 font-display text-lg font-medium text-white">
              Not sure where to start?
            </h3>

            <p className="mb-4 text-sm text-ash">
              Take a quick quiz to find out which services fit your needs.
            </p>

            <div className="flex items-center gap-3">
              <Link
                href="/quiz"
                onClick={handleDismiss}
                className="rounded-sm bg-teal px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-teal-bright"
              >
                Take the Quiz
              </Link>
              <button
                onClick={handleDismiss}
                className="font-mono text-xs uppercase tracking-widest text-graphite transition-colors hover:text-white"
              >
                Maybe later
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
