"use client";

import { useEffect, useRef, useState } from "react";
import TechLines from "@/components/TechLines";

const STATS = [
  { value: 5, suffix: "+", label: "Years in Business" },
  { value: 20, suffix: "+", label: "Projects Delivered" },
  { value: 100, suffix: "%", label: "Repeat Clients" },
  { value: 24, suffix: "hr", label: "Response Time" },
] as const;

function useCountUp(target: number, started: boolean, duration = 1200) {
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

function StatItem({
  value,
  suffix,
  label,
  started,
}: {
  value: number;
  suffix: string;
  label: string;
  started: boolean;
}) {
  const count = useCountUp(value, started);

  return (
    <div className="text-center">
      <p className="font-display text-4xl font-medium text-teal md:text-5xl">
        {count}
        <span className="text-teal-bright">{suffix}</span>
      </p>
      <p className="mt-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
        {label}
      </p>
    </div>
  );
}

export default function StatsStrip() {
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
    <section ref={ref} className="bg-white dark:bg-carbon py-20 px-6 pattern-scan">
      <div className="mx-auto max-w-5xl mb-10">
        <TechLines variant="scan-rule" className="text-teal" />
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 md:grid-cols-4">
        {STATS.map((stat) => (
          <StatItem key={stat.label} {...stat} started={started} />
        ))}
      </div>
    </section>
  );
}
