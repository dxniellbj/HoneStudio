"use client";

import { useEffect, useRef, useState } from "react";

/* Default boot lines typed out one character at a time on mount. */
const BOOT_LINES = [
  "> boot honestudio.exe",
  "> loading modules…",
  "  strategy ........ [OK]",
  "  systems ......... [OK]",
  "  websites ........ [OK]",
  "  ai & automation . [OK]",
  "",
  "> ready_",
];

interface ConsoleWidgetProps {
  /** Terminal lines to type out (stable reference — define as a module const). */
  lines?: readonly string[];
  /** Small caption under the gamepad deck. */
  caption?: string;
}

export default function ConsoleWidget({
  lines = BOOT_LINES,
  caption = "Hone Studio · System Ready",
}: ConsoleWidgetProps) {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const frame = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const full = lines.join("\n");

    if (reduce) {
      setText(full);
      setDone(true);
      return;
    }

    let i = 0;
    const tick = () => {
      i += 1;
      setText(full.slice(0, i));
      if (i < full.length) {
        // Pause a beat at line breaks for a boot-sequence cadence.
        const delay = full[i - 1] === "\n" ? 180 : 18;
        frame.current = setTimeout(tick, delay);
      } else {
        setDone(true);
      }
    };
    frame.current = setTimeout(tick, 400);

    return () => {
      if (frame.current) clearTimeout(frame.current);
    };
  }, [lines]);

  return (
    <div className="console-widget" aria-hidden="true">
      <div className="console-widget__screen">
        <pre
          className="console-widget__text whitespace-pre-wrap break-words"
          /* Reserve the full screen height up front so typing fills a
             fixed-size screen instead of growing the green box. The +1 adds
             a blank line of breathing room after the ready_ line. */
          style={{ height: `${(lines.length + 1) * 1.8}em`, overflow: "hidden" }}
        >
          {text}
          {done && <span className="console-widget__cursor" />}
        </pre>
      </div>
      <div className="console-widget__deck">
        {/* D-pad */}
        <div className="dpad" />

        {/* Start / Select */}
        <div className="console-widget__pills">
          <span className="console-widget__pill">
            <i />
            <span>Select</span>
          </span>
          <span className="console-widget__pill">
            <i />
            <span>Start</span>
          </span>
        </div>

        {/* Face buttons */}
        <div className="face-buttons">
          <span className="face-btn face-btn--top" />
          <span className="face-btn face-btn--right" />
          <span className="face-btn face-btn--bottom" />
          <span className="face-btn face-btn--left" />
        </div>
      </div>
      <p className="console-widget__label">{caption}</p>
    </div>
  );
}
