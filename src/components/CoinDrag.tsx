"use client";

import { useRef, useState } from "react";

const COIN_OUTLINE = "#160f0a";
const COIN = "#d4ac0d";
const COIN_DK = "#9a7d09";

/* A tiny mystery coin in the header. Drag it onto an arcade cabinet's coin
   slot (any element with [data-coin-slot]) to boot the slime-runner game. */
export default function CoinDrag() {
  const [off, setOff] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const start = useRef({ x: 0, y: 0 });

  const down = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY };
    setOff({ x: 0, y: 0 });
    setDragging(true);
  };

  const move = (e: React.PointerEvent) => {
    if (!dragging) return;
    setOff({ x: e.clientX - start.current.x, y: e.clientY - start.current.y });
  };

  const up = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragging(false);
    const slot = document.querySelector("[data-coin-slot]");
    if (slot) {
      const r = slot.getBoundingClientRect();
      const m = 20;
      const hit =
        e.clientX >= r.left - m &&
        e.clientX <= r.right + m &&
        e.clientY >= r.top - m &&
        e.clientY <= r.bottom + m;
      if (hit) window.dispatchEvent(new CustomEvent("hone-coin-insert"));
    }
    setOff(null);
  };

  return (
    <button
      type="button"
      aria-label="Mystery coin"
      title="…?"
      className="coin-egg"
      style={{
        transform: off ? `translate(${off.x}px, ${off.y}px)` : undefined,
        zIndex: dragging ? 100000 : undefined,
        cursor: dragging ? "grabbing" : "grab",
        opacity: dragging ? 1 : undefined,
      }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
    >
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="7.5" fill={COIN_OUTLINE} />
        <circle cx="8" cy="8" r="6.5" fill={COIN} />
        <circle cx="8" cy="8" r="4.5" fill="none" stroke={COIN_DK} strokeWidth="1" />
        <rect x="7" y="5" width="2" height="6" fill={COIN_DK} />
        <rect x="5" y="7" width="6" height="2" fill={COIN_DK} />
      </svg>
    </button>
  );
}
