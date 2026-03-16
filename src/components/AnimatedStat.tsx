"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, started: boolean, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    let raf: number;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, started, duration]);

  return count;
}

// Parse numeric value from stat string (e.g., "~1,000" -> 1000, "250+" -> 250)
function parseStatValue(value: string): { num: number; prefix: string; suffix: string } {
  const prefix = value.match(/^[~$]*/)?.[0] || "";
  const suffix = value.match(/[+%]?$/)?.[0] || "";
  const numStr = value.replace(/[^0-9.]/g, "");
  const num = parseFloat(numStr) || 0;
  return { num, prefix, suffix };
}

// Format number with commas
function formatNumber(n: number): string {
  return n.toLocaleString();
}

interface AnimatedStatProps {
  value: string;
  label: string;
  started: boolean;
}

export default function AnimatedStat({ value, label, started }: AnimatedStatProps) {
  const { num, prefix, suffix } = parseStatValue(value);
  const animatedNum = useCountUp(num, started);

  return (
    <div className="h-full rounded-md border border-cloud dark:border-slate bg-snow dark:bg-ink p-5 text-center">
      <p className="font-display text-2xl font-semibold text-teal dark:text-teal-dark md:text-3xl">
        {prefix}{formatNumber(animatedNum)}{suffix}
      </p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-graphite dark:text-ash">
        {label}
      </p>
    </div>
  );
}

// Container component that triggers animation on scroll
interface AnimatedStatsGridProps {
  stats: { value: string; label: string }[];
}

export function AnimatedStatsGrid({ stats }: AnimatedStatsGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-6 mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat, i) => (
        <AnimatedStat key={i} value={stat.value} label={stat.label} started={started} />
      ))}
    </div>
  );
}
