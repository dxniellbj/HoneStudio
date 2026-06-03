"use client";

import { useEffect, useRef } from "react";

const GP = "#5dbf5d"; // green-pixel
const GP_DIM = "#2f6e35";
const BG = "#14210f";

interface SlimeRunnerProps {
  onCrash: (score: number) => void;
  hi: number;
}

/* A tiny Chrome-dino-style runner: the slime auto-runs, jump to clear blocks. */
export default function SlimeRunner({ onCrash, hi }: SlimeRunnerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreElRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 140;
    const H = 104;
    canvas.width = W;
    canvas.height = H;
    const groundY = H - 16;

    // Player
    const px = 22;
    const pw = 14;
    const ph = 11;
    let py = groundY; // bottom edge of slime
    let vy = 0;
    let grounded = true;
    const GRAV = 0.55;
    const JUMP = -7.4;

    let obstacles: { x: number; w: number; h: number }[] = [];
    let speed = 2.0;
    let spawn = 36;
    let score = 0;
    let dead = false;
    let raf = 0;
    let frame = 0;

    const jump = () => {
      if (grounded && !dead) {
        vy = JUMP;
        grounded = false;
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };
    const onPtr = (e: Event) => {
      e.preventDefault();
      jump();
    };
    window.addEventListener("keydown", onKey);
    canvas.addEventListener("pointerdown", onPtr);

    const drawSlime = (x: number, bottom: number) => {
      const top = bottom - ph;
      ctx.fillStyle = GP;
      ctx.fillRect(x + 4, top, 6, 2);
      ctx.fillRect(x + 2, top + 2, 10, 2);
      ctx.fillRect(x, top + 4, 14, ph - 5);
      // little feet (alternate while running)
      const step = grounded && Math.floor(frame / 6) % 2 === 0;
      ctx.fillRect(x + 1, bottom - 1, 4, 1);
      ctx.fillRect(x + 9, bottom - 1, 4, 1);
      if (step) ctx.fillRect(x + 5, bottom - 1, 4, 1);
      // eyes (holes)
      ctx.fillStyle = BG;
      const blink = frame % 110 < 5;
      if (!blink) {
        ctx.fillRect(x + 4, top + 5, 2, 2);
        ctx.fillRect(x + 9, top + 5, 2, 2);
      }
    };

    let last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(2.5, (t - last) / 16.667);
      last = t;
      frame += 1;

      // Physics
      vy += GRAV * dt;
      py += vy * dt;
      if (py >= groundY) {
        py = groundY;
        vy = 0;
        grounded = true;
      }

      // Difficulty ramp
      speed += 0.0017 * dt;

      // Spawn obstacles (cadence tightens as speed grows)
      spawn -= dt * (0.6 + speed * 0.18);
      if (spawn <= 0) {
        const h = 9 + Math.floor(Math.random() * 14);
        const w = 5 + Math.floor(Math.random() * 4);
        obstacles.push({ x: W + 2, w, h });
        spawn = 42 + Math.random() * 40;
      }
      for (const o of obstacles) o.x -= speed * dt;
      obstacles = obstacles.filter((o) => o.x + o.w > -2);

      score += dt * 0.6;

      // Collision (AABB, slightly forgiving)
      const sL = px + 2;
      const sR = px + pw - 2;
      const sT = py - ph + 1;
      for (const o of obstacles) {
        const oT = groundY - o.h;
        if (sR > o.x + 1 && sL < o.x + o.w - 1 && py > oT && sT < groundY) {
          dead = true;
          break;
        }
      }

      // Draw
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // ground
      ctx.fillStyle = GP;
      ctx.fillRect(0, groundY + 1, W, 1);
      ctx.fillStyle = GP_DIM;
      const off = Math.floor(frame * speed) % 8;
      for (let gx = -off; gx < W; gx += 8) ctx.fillRect(gx, groundY + 4, 4, 1);

      // obstacles
      ctx.fillStyle = GP;
      for (const o of obstacles) ctx.fillRect(Math.round(o.x), groundY - o.h, o.w, o.h);

      // slime
      drawSlime(px, Math.round(py));

      if (scoreElRef.current) {
        scoreElRef.current.textContent = String(Math.floor(score)).padStart(4, "0");
      }

      if (dead) {
        cancelAnimationFrame(raf);
        window.removeEventListener("keydown", onKey);
        canvas.removeEventListener("pointerdown", onPtr);
        onCrash(Math.floor(score));
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("pointerdown", onPtr);
    };
  }, [onCrash]);

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" style={{ imageRendering: "pixelated" }} />
      <span className="absolute left-1 top-0.5 font-mono text-[7px] leading-none text-green-pixel/50">
        HI {String(hi).padStart(4, "0")}
      </span>
      <span
        ref={scoreElRef}
        className="absolute right-1 top-0.5 font-mono text-[8px] leading-none text-green-pixel"
      >
        0000
      </span>
    </div>
  );
}
