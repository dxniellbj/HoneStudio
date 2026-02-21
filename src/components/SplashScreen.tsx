"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type Phase = "loading" | "prompt" | "ripple" | "done";

function playBootSound() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // Soft bouncing tones — synced to the ball bounce rhythm
    for (let i = 0; i < 3; i++) {
      const t = now + i * 0.5;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(520 + i * 80, t);
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc.start(t);
      osc.stop(t + 0.15);
    }

    // Completion ping — two harmonious tones
    const ct = now + 1.2;
    [1047, 1319].forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ct);
      gain.gain.setValueAtTime(0.06, ct);
      gain.gain.exponentialRampToValueAtTime(0.001, ct + 0.5);
      osc.start(ct);
      osc.stop(ct + 0.5);
    });
  } catch {
    // Web Audio not available — continue silently
  }
}

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [loaderFading, setLoaderFading] = useState(false);
  const [ripplePos, setRipplePos] = useState<{ x: number; y: number } | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [skip, setSkip] = useState(false);
  const soundPlayed = useRef(false);

  useEffect(() => {
    // Only show once per session
    try {
      if (sessionStorage.getItem("hone-splash")) {
        setSkip(true);
        return;
      }
    } catch {
      setSkip(true);
      return;
    }

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSkip(true);
      return;
    }

    // Detect touch device
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);

    document.body.style.overflow = "hidden";

    // Prevent double sound in StrictMode
    if (!soundPlayed.current) {
      soundPlayed.current = true;
      playBootSound();
    }

    // Write session flag after short delay so StrictMode cleanup can clear it
    const sessionTimer = setTimeout(() => {
      try {
        sessionStorage.setItem("hone-splash", "1");
      } catch {
        /* ignore */
      }
    }, 100);

    // Phase A → fade loader after 1.7s
    const fadeTimer = setTimeout(() => setLoaderFading(true), 1700);
    // Phase A → show prompt after loader fade (1.7s + 500ms)
    const promptTimer = setTimeout(() => setPhase("prompt"), 2200);

    return () => {
      clearTimeout(sessionTimer);
      clearTimeout(fadeTimer);
      clearTimeout(promptTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (phase !== "prompt") return;

      setRipplePos({ x: e.clientX, y: e.clientY });
      setPhase("ripple");

      // After ripple animation (600ms), dismiss
      setTimeout(() => {
        setPhase("done");
        document.body.style.overflow = "";
        window.dispatchEvent(new Event("splash-dismissed"));
      }, 600);
    },
    [phase],
  );

  // Skip: dispatch event so HeroIntro knows to auto-start for returning visitors
  useEffect(() => {
    if (skip) {
      const t = setTimeout(() => {
        window.dispatchEvent(new Event("splash-skipped"));
      }, 50);
      return () => clearTimeout(t);
    }
  }, [skip]);

  if (skip || phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-snow dark:bg-ink"
      aria-hidden="true"
      onClick={handleClick}
      style={{ cursor: phase === "prompt" ? "pointer" : "default" }}
    >
      {/* Phase A: Loader */}
      {phase === "loading" && (
        <div
          className={`splash-loader transition-opacity duration-500 ${
            loaderFading ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* Phase B: Enter Prompt */}
      {phase === "prompt" && (
        <p className="splash-prompt font-mono text-sm uppercase tracking-widest text-graphite dark:text-ash select-none">
          {isTouch ? "Tap to enter" : "Click to enter"}
        </p>
      )}

      {/* Phase C: Ripple */}
      {phase === "ripple" && ripplePos && (
        <div
          className="splash-ripple"
          style={{ left: ripplePos.x, top: ripplePos.y }}
        />
      )}
    </div>
  );
}
