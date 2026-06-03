"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { TESTIMONIALS } from "@/lib/data";

const AUTOPLAY_MS = 7000;

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? "text-yellow" : "text-cream/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous testimonial" : "Next testimonial"}
      className="btn btn--outline btn--sm !px-3"
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {direction === "prev" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
}

export default function Testimonials() {
  const count = TESTIMONIALS.length;
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number) => {
      setDirection(next > index || (index === count - 1 && next === 0) ? 1 : -1);
      setIndex((next + count) % count);
    },
    [index, count],
  );

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  // Autoplay — pauses on hover/focus and when the tab is hidden.
  useEffect(() => {
    if (paused || count <= 1) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setDirection(1);
        setIndex((i) => (i + 1) % count);
      }
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  if (count === 0) return null;

  const testimonial = TESTIMONIALS[index];

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : dir * 40,
    }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : dir * -40,
    }),
  };

  return (
    <section className="bg-cream py-16 px-6 border-b-[3px] border-shadow">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="eyebrow mb-4 text-center">What people say</p>
        </ScrollReveal>

        <ScrollReveal>
          <div
            className="group relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            role="group"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
          >
            {/* Card viewport — fixed-ish height so controls don't jump between quotes */}
            <div className="relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${count}`}
                >
                  <div className="testimonial">
                    <div>
                      <p className="testimonial__quote">{testimonial.quote}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <StarRating rating={testimonial.rating} />
                        <p className="testimonial__attr !mt-0">
                          {testimonial.name}
                          {testimonial.detail ? (
                            <span className="opacity-60"> · {testimonial.detail}</span>
                          ) : null}
                        </p>
                      </div>
                    </div>
                    <div className="testimonial__avatar" aria-hidden="true">
                      {initialsOf(testimonial.name)}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            {count > 1 && (
              <div className="mt-6 flex items-center justify-center gap-5">
                <ArrowButton direction="prev" onClick={prev} />

                <div className="flex items-center gap-2" role="tablist" aria-label="Select testimonial">
                  {TESTIMONIALS.map((t, i) => (
                    <button
                      key={t.name}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Go to testimonial ${i + 1}`}
                      onClick={() => go(i)}
                      className={`h-2.5 rounded-full border-2 border-dark transition-all ${
                        i === index ? "w-6 bg-red" : "w-2.5 bg-transparent hover:bg-dark/20"
                      }`}
                    />
                  ))}
                </div>

                <ArrowButton direction="next" onClick={next} />
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
