"use client";

import { useState, useEffect, useRef } from "react";

const CLICKABLE = "a, button, [role='button'], input, textarea, select, label, [tabindex]";

export default function TealCursor() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      const target = e.target as Element | null;
      setHovering(!!target?.closest(CLICKABLE));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const animate = () => {
      if (wrapper.current) {
        wrapper.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={wrapper}
      className="pointer-events-none fixed top-0 left-0 z-[10000]"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    >
      {/* Dot — default state */}
      <div
        className="absolute transition-all duration-200 ease-out"
        style={{
          width: hovering ? 0 : 12,
          height: hovering ? 0 : 12,
          borderRadius: "50%",
          backgroundColor: "#00D4AA",
          top: hovering ? 0 : -6,
          left: hovering ? 0 : -6,
          opacity: hovering ? 0 : 1,
        }}
      />

      {/* Hand pointer — hover state, morphs from the dot */}
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="#00D4AA"
        className="absolute transition-all duration-200 ease-out"
        style={{
          top: -2,
          left: -5,
          opacity: hovering ? 1 : 0,
          transform: hovering ? "scale(1)" : "scale(0.3)",
        }}
      >
        <path d="M7 0a1.5 1.5 0 0 1 1.5 1.5V9h1V6.5a1.5 1.5 0 0 1 3 0V9h1V7.5a1.5 1.5 0 0 1 3 0V13a7 7 0 0 1-7 7H9a7 7 0 0 1-7-7v-2a1.5 1.5 0 0 1 3 0V9.5l0-8A1.5 1.5 0 0 1 7 0Z" />
      </svg>
    </div>
  );
}
