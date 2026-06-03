"use client";

import { useEffect, useRef, useState } from "react";

/* Cute single-color 8-bit slime. Body = currentColor, eyes are cut-out
   holes so the background shows through. Hops across its track via CSS and
   leaves a gooey "..." trail of dots that stay put where it has been. */

// 16 x 12 pixel grid — '#' is body, '.' is empty (eyes carved out of the dome)
const ROWS = [
  "................",
  ".....######.....",
  "...##########...",
  "..############..",
  "..############..",
  ".##..######..##.", // eyes
  ".##..######..##.", // eyes
  "################",
  "################",
  "################",
  "##.##.####.##.##.", // wobbly feet
  "................",
];

type Dot = { id: number; x: number };

export default function Slime({ className = "" }: { className?: string }) {
  const slimeRef = useRef<HTMLDivElement>(null);
  const [dots, setDots] = useState<Dot[]>([]);
  const nextId = useRef(0);
  const lastX = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Gap between the slime and where the trail starts (px, behind it).
    const GAP = 34;

    // Periodically drop a dot just *behind* the slime. The dot lives in the
    // static track layer, so it stays where it was left and fades out.
    const drop = setInterval(() => {
      const el = slimeRef.current;
      const track = el?.parentElement;
      if (!el || !track) return;
      const elRect = el.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      const center = elRect.left - trackRect.left + elRect.width / 2;

      // Direction of travel → place the dot behind, with a gap.
      const dir = lastX.current === null ? 1 : Math.sign(center - lastX.current) || 1;
      lastX.current = center;
      const x = center - dir * GAP;

      const id = nextId.current++;
      setDots((prev) => [...prev, { id, x }]);
      // Remove after the fade animation finishes (matches slimeTrail 1.9s)
      setTimeout(() => {
        setDots((prev) => prev.filter((d) => d.id !== id));
      }, 1900);
    }, 320);

    return () => clearInterval(drop);
  }, []);

  const rects: React.ReactNode[] = [];
  ROWS.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === "#") {
        rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />);
      }
    }
  });

  return (
    <>
      {/* Static trail layer — dots stay where the slime dropped them */}
      <div className="slime__trail text-dark/65" aria-hidden="true">
        {dots.map((d) => (
          <span
            key={d.id}
            className="slime__dot"
            style={{ left: d.x - 3, ["--dot-o"]: 0.45 } as React.CSSProperties}
          />
        ))}
      </div>

      {/* The slime itself */}
      <div ref={slimeRef} className={`slime text-dark/65 ${className}`} aria-hidden="true">
        <div className="slime__sprite">
          <svg viewBox="0 0 16 12" fill="currentColor">
            {rects}
          </svg>
        </div>
      </div>
    </>
  );
}
