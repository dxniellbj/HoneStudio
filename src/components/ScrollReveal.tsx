"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: Variants;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  variant = fadeUp,
  delay,
  className,
}: ScrollRevealProps) {
  const resolvedVariant: Variants = delay
    ? {
        ...variant,
        visible: {
          ...(typeof variant.visible === "object" ? variant.visible : {}),
          transition: {
            ...(typeof variant.visible === "object" &&
            "transition" in variant.visible
              ? (variant.visible.transition as Record<string, unknown>)
              : {}),
            delay,
          },
        },
      }
    : variant;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={resolvedVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
}
