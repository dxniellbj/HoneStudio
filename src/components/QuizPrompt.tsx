"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const DELAY_MS = 20000; // 20 seconds
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
        <>
          {/* Darkened overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-darkest/80 backdrop-blur-sm"
            onClick={handleDismiss}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-shadow bg-beige px-10 py-14 shadow-2xl"
          >
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute right-4 top-4 text-dark/50 transition-colors hover:text-dark"
              aria-label="Dismiss"
            >
              <svg
                width="20"
                height="20"
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
            <div className="text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red/20 bg-red/10 px-4 py-2">
                <span className="inline-block h-2 w-2 rounded-full bg-red animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-red">
                  5-min quiz
                </span>
              </div>

              <h3 className="mb-4 font-display font-extrabold tracking-[-0.02em] text-3xl text-dark">
                Not sure where to start?
              </h3>

              <p className="mb-8 text-dark/65 leading-relaxed">
                Take a quick quiz to find out which services fit your needs, then
                get a recommendation built around your answers.
              </p>

              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/quiz"
                  onClick={handleDismiss}
                  className="btn btn--primary w-full sm:w-auto"
                >
                  Take the Quiz
                </Link>
                <button
                  onClick={handleDismiss}
                  className="btn btn--outline w-full sm:w-auto"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
