"use client";

import { useState, useEffect, useRef } from "react";

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
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Only show once per session
    try {
      if (sessionStorage.getItem("hone-splash")) {
        setVisible(false);
        return;
      }
      sessionStorage.setItem("hone-splash", "1");
    } catch {
      setVisible(false);
      return;
    }

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";
    playBootSound();

    const fadeTimer = setTimeout(() => setFadeOut(true), 1700);
    const removeTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 2200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-snow dark:bg-ink transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="splash-loader" />
    </div>
  );
}
