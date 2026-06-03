"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

type ThumbVariant = "red" | "blue" | "yellow" | "green" | "purple";

interface CaseStudyCardProps {
  title: string;
  client: string;
  platform: string;
  pillars: readonly string[];
  summary: string;
  slug: string;
  thumbnail?: string;
  thumbnailBg?: string;
  thumbVariant?: ThumbVariant;
  thumbLabel?: string;
}

const PILLAR_TAG: Record<string, string> = {
  Web: "tag--red",
  AI: "tag--purple",
  Strategy: "tag--blue",
};

const cardVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  hover: {
    scale: 1.02,
    y: -6,
    boxShadow: "0 20px 40px rgba(192,57,43,0.12), 0 8px 16px rgba(0,0,0,0.08)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

// Derive a short all-caps token from the client name for the thumb label.
function deriveLabel(label: string | undefined, client: string): string {
  if (label) return label;
  const cleaned = client.replace(/[^A-Za-z0-9 ]/g, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return words
      .slice(0, 3)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  }
  return cleaned.slice(0, 6).toUpperCase();
}

export default function CaseStudyCard({
  title,
  client,
  platform,
  pillars,
  summary,
  slug,
  thumbVariant = "red",
  thumbLabel,
}: CaseStudyCardProps) {
  const label = deriveLabel(thumbLabel, client);

  return (
    <Link href={`/work/${slug}`} className="block h-full">
      <motion.article
        className="card-work group h-full"
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={cardVariants}
      >
        {/* Thumbnail — scanline console panel with big all-caps token */}
        <div className={`card-work__thumb card-work__thumb--${thumbVariant} font-display`}>
          <span className="card-work__thumb-label">{label}</span>
        </div>

        {/* Body */}
        <div className="card-work__body">
          {/* Client + platform eyebrow */}
          <p className="card-work__tag">
            {client} · {platform}
          </p>

          {/* Title */}
          <h3 className="card-work__title font-display">{title}</h3>

          {/* Summary */}
          <p className="card-work__desc">{summary}</p>

          {/* Pillar Tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {pillars.map((pillar) => (
              <span
                key={pillar}
                className={`rounded-sm border border-black/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide ${
                  PILLAR_TAG[pillar] ?? "tag--blue"
                }`}
              >
                {pillar}
              </span>
            ))}
          </div>

          {/* Arrow hint */}
          <motion.span
            className="mt-4 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-yellow"
            variants={{
              rest: { x: 0 },
              hover: { x: 4 },
            }}
          >
            Read case study
            <span aria-hidden="true">&rarr;</span>
          </motion.span>
        </div>
      </motion.article>
    </Link>
  );
}
