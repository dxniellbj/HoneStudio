"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoadingIndicator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Track navigation
  useEffect(() => {
    // Reset on route change complete
    setIsLoading(false);
    setProgress(100);

    const timeout = setTimeout(() => setProgress(0), 300);
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  // Intercept link clicks to show loading state
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Skip external links, hash links, and same-page links
      if (
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        link.target === "_blank"
      ) {
        return;
      }

      // Skip if it's the current page
      if (href === pathname) return;

      // Start loading animation
      setIsLoading(true);
      setProgress(0);

      // Animate progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 15;
        if (currentProgress > 90) {
          currentProgress = 90;
          clearInterval(interval);
        }
        setProgress(currentProgress);
      }, 100);

      // Cleanup interval when component unmounts or route changes
      return () => clearInterval(interval);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  // Add loading cursor to body
  useEffect(() => {
    if (isLoading) {
      document.body.style.cursor = "progress";
    } else {
      document.body.style.cursor = "";
    }

    return () => {
      document.body.style.cursor = "";
    };
  }, [isLoading]);

  return (
    <>
      {/* Top Progress Bar */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[200] h-0.5"
          >
            <motion.div
              className="h-full bg-teal dark:bg-teal-dark"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
            {/* Glow effect */}
            <div
              className="absolute right-0 top-0 h-full w-24 bg-gradient-to-r from-transparent to-teal/50 dark:to-teal-dark/50"
              style={{ transform: `translateX(${progress < 5 ? -100 : 0}%)` }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Overlay (subtle) */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[199] pointer-events-none"
          >
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-white/5 dark:bg-ink/10" />

            {/* Center loading spinner */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-3"
              >
                {/* Spinner */}
                <div className="relative h-8 w-8">
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-teal/20 dark:border-teal-dark/20"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-transparent border-t-teal dark:border-t-teal-dark"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
