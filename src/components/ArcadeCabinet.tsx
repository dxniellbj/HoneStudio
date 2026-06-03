"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SlimeRunner from "./SlimeRunner";

type Screen = "menu" | "attract";
type Phase = "idle" | "playing" | "over";

interface ArcadeCabinetProps {
  marquee?: string;
  screen?: Screen;
  items?: readonly string[];
}

/* Retro palette */
const C = {
  outline: "#160f0a",
  red: "#c0392b",
  redDk: "#9b2d22",
  redHi: "#d6584a",
  redDeep: "#7e2419",
  yellow: "#d4ac0d",
  cream: "#e8e0c8",
  dark: "#2a2420",
  darkest: "#1a1410",
  screen: "#14210f",
  beige: "#d4c9a8",
  beigeHi: "#efe7d0",
  beigeDk: "#b8a882",
  blue: "#2471a3",
  green: "#5dbf5d",
  bzTop: "#4a4036",
  bzL: "#3a312a",
  bzR: "#2a2420",
  bzB: "#1a130f",
};

function Block({ x, y, w, h, fill }: { x: number; y: number; w: number; h: number; fill: string }) {
  return (
    <>
      <rect x={x - 1} y={y - 1} width={w + 2} height={h + 2} fill={C.outline} />
      <rect x={x} y={y} width={w} height={h} fill={fill} />
    </>
  );
}

function CabinetArt() {
  return (
    <svg className="arcade__svg" viewBox="0 0 80 104" xmlns="http://www.w3.org/2000/svg">
      {/* ── Marquee ── */}
      <Block x={16} y={1} w={7} h={4} fill={C.red} />
      <Block x={57} y={1} w={7} h={4} fill={C.red} />
      <Block x={12} y={4} w={56} h={12} fill={C.blue} />
      <rect x={15} y={6} width={50} height={2} fill={C.cream} />
      <rect x={15} y={10} width={50} height={2} fill={C.cream} />
      <rect x={12} y={15} width={56} height={2} fill={C.redDk} />

      {/* ── Upper body — shaped silhouette: red angles inward near the screen ── */}
      <polygon points="11,15 69,15 69,18 65,27 65,58 15,58 15,27 11,18" fill={C.outline} />
      <polygon points="12,16 68,16 68,18 64,26 64,57 16,57 16,26 12,18" fill={C.red} />
      <polygon points="12,16 68,16 68,18 64,26 16,26 12,18" fill={C.redHi} />
      <polygon points="64,26 64,57 61,57 61,26" fill={C.redDk} />

      {/* ── Screen bezel — beveled recess + CRT ── */}
      <rect x={19} y={21} width={42} height={32} fill={C.outline} />
      <polygon points="20,22 60,22 56,25 24,25" fill={C.bzTop} />
      <polygon points="20,22 24,25 24,49 20,52" fill={C.bzL} />
      <polygon points="60,22 56,25 56,49 60,52" fill={C.bzR} />
      <polygon points="20,52 60,52 56,49 24,49" fill={C.bzB} />
      <rect x={24} y={25} width={32} height={24} fill={C.screen} />

      {/* ── Base body ── */}
      <Block x={12} y={70} w={56} h={30} fill={C.red} />
      <rect x={13} y={95} width={54} height={4} fill={C.redDk} />
      {/* Coin slot — small, upper-right corner (where arcade coin mechs sit) */}
      <rect x={58} y={75} width={5} height={7} fill={C.outline} />
      <rect x={59} y={76} width={3} height={5} fill={C.cream} />
      <rect x={60} y={77} width={1} height={3} fill={C.darkest} />
      {/* Legs */}
      <rect x={15} y={100} width={9} height={4} fill={C.darkest} />
      <rect x={56} y={100} width={9} height={4} fill={C.darkest} />

      {/* ── Control panel (juts wider) ── */}
      <Block x={8} y={57} w={64} h={13} fill={C.beige} />
      <rect x={9} y={58} width={62} height={2} fill={C.beigeHi} />
      <rect x={9} y={67} width={62} height={2} fill={C.beigeDk} />

      {/* Joystick — far left, mirroring the rightmost (green) button */}
      <rect x={16} y={64} width={6} height={3} fill={C.darkest} />
      <rect x={18} y={58} width={2} height={7} fill={C.darkest} />
      <Block x={16} y={53} w={6} h={5} fill={C.red} />

      {/* Buttons */}
      <Block x={42} y={62} w={4} h={4} fill={C.red} />
      <Block x={48} y={62} w={4} h={4} fill={C.blue} />
      <Block x={54} y={62} w={4} h={4} fill={C.yellow} />
      <Block x={60} y={62} w={4} h={4} fill={C.green} />
    </svg>
  );
}

function MenuScreen({ items }: { items: readonly string[] }) {
  const [sel, setSel] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setSel((s) => (s + 1) % items.length), 950);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <div className="px-2 text-left">
      <p className="mb-0.5 text-center text-[7px] tracking-[0.12em] text-green-pixel/90">
        SELECT MODE
      </p>
      {items.map((item, i) => (
        <p
          key={item}
          className={`text-[8px] leading-[1.5] ${i === sel ? "text-green-pixel" : "text-green-pixel/40"}`}
        >
          {i === sel ? "▸ " : "  "}
          {item}
        </p>
      ))}
      <p className="mt-1 text-center text-[6px] tracking-[0.1em] text-green-pixel/70">
        <span className="animate-blink">INSERT COIN</span>
      </p>
    </div>
  );
}

function AttractScreen() {
  return (
    <div className="px-1 text-center">
      <p className="font-display text-base font-bold leading-none text-green-pixel">
        HONE<span>.</span>
      </p>
      <p className="mt-1 text-[6px] tracking-[0.16em] text-green-pixel/55">SLIME ARCADE</p>
      <p className="mt-2 text-[8px] tracking-[0.08em]">
        <span className="animate-blink">INSERT COIN</span>
      </p>
    </div>
  );
}

function GameOverScreen({ score, hi }: { score: number; hi: number }) {
  return (
    <div className="px-1 text-center">
      <p className="text-[10px] font-bold tracking-[0.1em] text-green-pixel">GAME OVER</p>
      <p className="mt-1.5 text-[8px] text-green-pixel/90">SCORE {String(score).padStart(4, "0")}</p>
      <p className="text-[7px] text-green-pixel/55">HI&nbsp;&nbsp;&nbsp;{String(hi).padStart(4, "0")}</p>
      <p className="mt-2 text-[7px] tracking-[0.08em]">
        <span className="animate-blink">INSERT COIN</span>
      </p>
    </div>
  );
}

export default function ArcadeCabinet({ marquee, screen = "menu", items = [] }: ArcadeCabinetProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [hi, setHi] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const motionOk = useRef(false);

  useEffect(() => {
    motionOk.current = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      setHi(Number(localStorage.getItem("hone-runner-hi") || "0") || 0);
    } catch {
      /* ignore */
    }
  }, []);

  // Boot the game when the header coin is dropped into this cabinet's slot
  useEffect(() => {
    const onInsert = () => {
      if (motionOk.current) setPhase("playing");
    };
    window.addEventListener("hone-coin-insert", onInsert);
    return () => window.removeEventListener("hone-coin-insert", onInsert);
  }, []);

  const handleCrash = useCallback((score: number) => {
    setFinalScore(score);
    setPhase("over");
    setHi((h) => {
      const nh = Math.max(h, score);
      try {
        localStorage.setItem("hone-runner-hi", String(nh));
      } catch {
        /* ignore */
      }
      return nh;
    });
  }, []);

  return (
    <div className="arcade" aria-label={marquee}>
      <CabinetArt />

      {/* Live CRT screen — mirrors the screen rect in the SVG (24,25,32,24 of 80x104) */}
      <div className="arcade__crt" style={{ left: "30%", top: "24%", width: "40%", height: "23.1%" }}>
        {phase === "playing" ? (
          <SlimeRunner onCrash={handleCrash} hi={hi} />
        ) : phase === "over" ? (
          <GameOverScreen score={finalScore} hi={hi} />
        ) : screen === "menu" ? (
          <MenuScreen items={items} />
        ) : (
          <AttractScreen />
        )}
      </div>

      {/* Coin-slot drop target (over the slot) — found by the header coin */}
      <div
        data-coin-slot
        className="absolute"
        style={{ left: "64%", top: "66%", width: "22%", height: "20%", pointerEvents: "none" }}
        aria-hidden="true"
      />
    </div>
  );
}
