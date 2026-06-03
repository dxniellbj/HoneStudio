"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

type Phase = "loading" | "prompt" | "crt" | "done";

function playBootSound() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // Soft bouncing tones — boot blips
    for (let i = 0; i < 3; i++) {
      const t = now + i * 0.5;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "square";
      osc.frequency.setValueAtTime(420 + i * 90, t);
      gain.gain.setValueAtTime(0.03, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.start(t);
      osc.stop(t + 0.12);
    }

    // Completion ping — two harmonious tones
    const ct = now + 1.6;
    [1047, 1319].forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "square";
      osc.frequency.setValueAtTime(freq, ct);
      gain.gain.setValueAtTime(0.05, ct);
      gain.gain.exponentialRampToValueAtTime(0.001, ct + 0.4);
      osc.start(ct);
      osc.stop(ct + 0.4);
    });
  } catch {
    // Web Audio not available — continue silently
  }
}

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [pct, setPct] = useState(0);
  const [isTouch, setIsTouch] = useState(false);
  const [skip, setSkip] = useState(false);
  const [mounted, setMounted] = useState(false);
  const soundPlayed = useRef(false);

  // Portal target only exists on the client
  useEffect(() => setMounted(true), []);

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

    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    document.body.style.overflow = "hidden";

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

    // Chunky 8-bit progress — fills in uneven jumps, then shows the prompt
    let current = 0;
    let promptTimer: ReturnType<typeof setTimeout>;
    const tick = setInterval(() => {
      current = Math.min(100, current + 4 + Math.floor(Math.random() * 12));
      setPct(current);
      if (current >= 100) {
        clearInterval(tick);
        promptTimer = setTimeout(() => setPhase("prompt"), 450);
      }
    }, 110);

    return () => {
      clearTimeout(sessionTimer);
      clearInterval(tick);
      clearTimeout(promptTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const handleClick = useCallback(() => {
    if (phase !== "prompt") return;

    // CRT power-on flash, then reveal the site
    setPhase("crt");
    setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("splash-dismissed"));
    }, 600);
  }, [phase]);

  // Skip: tell HeroIntro to auto-start for returning visitors
  useEffect(() => {
    if (skip) {
      const t = setTimeout(() => {
        window.dispatchEvent(new Event("splash-skipped"));
      }, 50);
      return () => clearTimeout(t);
    }
  }, [skip]);

  if (skip || phase === "done" || !mounted) return null;

  const showPrompt = phase === "prompt";
  const crt = phase === "crt";

  const overlay = (
    <div
      className={`scanlines fixed inset-0 z-[9999] flex items-center justify-center bg-cream ${
        crt ? "animate-crt-off" : ""
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden="true"
      onClick={handleClick}
      style={{
        // Force fixed positioning: the unlayered `.scanlines` rule sets
        // position: relative and would otherwise override Tailwind's `fixed`.
        position: "fixed",
        inset: 0,
        cursor: showPrompt && !crt ? "pointer" : "default",
      }}
    >
      <div className="relative z-[1] flex flex-col items-center gap-8 select-none px-6">
        {/* LOADING.. / READY label */}
        <p className="font-pixel text-[22px] leading-none text-dark">
          {showPrompt ? "READY!" : "LOADING"}
          {!showPrompt && <span className="animate-blink">..</span>}
        </p>

        {/* Pixel progress bar */}
        <div className="pixel-bar pixel-bar--lg">
          <div className="pixel-bar__fill" style={{ width: `${showPrompt ? 100 : pct}%` }} />
        </div>

        {/* Percentage / prompt */}
        {showPrompt ? (
          <p className="splash-prompt font-pixel text-[18px] leading-relaxed text-red">
            {isTouch ? "TAP TO START" : "CLICK TO START"}
          </p>
        ) : (
          <p className="font-pixel text-[15px] leading-none text-dark/70">{pct}%</p>
        )}
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
