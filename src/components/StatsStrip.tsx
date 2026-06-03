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
    <div className="stats-bar__item">
      <p className="stats-bar__num stats-bar__num--accent">
        {count}
        <span>{suffix}</span>
      </p>
      <p className="stats-bar__label">{label}</p>
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
    <section ref={ref} className="bg-cream py-20 px-6 pattern-scan border-b-[3px] border-shadow">
      <div className="mx-auto max-w-5xl mb-10">
        <TechLines variant="scan-rule" className="text-shadow/60" />
      </div>
      <div className="mx-auto max-w-5xl stats-bar">
        {STATS.map((stat) => (
          <StatItem key={stat.label} {...stat} started={started} />
        ))}
      </div>
    </section>
  );
}
