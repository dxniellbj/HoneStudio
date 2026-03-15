"use client";

import { useMemo, useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ── Shape Types ── */
type ShapeType = "circle" | "triangle" | "square" | "diamond" | "hexagon" | "cube" | "cylinder";

interface Shape {
  id: number;
  type: ShapeType;
  size: number;
  x: number;
  y: number;
  rotation: number;
  spinDuration: number;
  floatDuration: number;
  floatDelay: number;
  opacity: number;
  color: "teal" | "teal-bright" | "teal-mid" | "teal-dark";
  zIndex: number;
}

/* ── Simple SVG Shape Components ── */

function Circle({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function Triangle({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 4L36 34H4L20 4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function Square({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="4" y="4" width="32" height="32" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function Diamond({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 4L36 20L20 36L4 20L20 4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function Hexagon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 4L34 12V28L20 36L6 28V12L20 4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function Cube({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 4L36 12V28L20 36L4 28V12L20 4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 12L20 20L36 12" stroke={color} strokeWidth="1.5" />
      <path d="M20 20V36" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function Cylinder({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="8" rx="14" ry="5" stroke={color} strokeWidth="1.5" />
      <path d="M6 8V32" stroke={color} strokeWidth="1.5" />
      <path d="M34 8V32" stroke={color} strokeWidth="1.5" />
      <path d="M6 32C6 35 12 37 20 37C28 37 34 35 34 32" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

/* ── Color map ── */
const colorMap: Record<Shape["color"], string> = {
  teal: "var(--color-teal)",
  "teal-bright": "var(--color-teal-bright)",
  "teal-mid": "var(--color-teal-mid)",
  "teal-dark": "var(--color-teal-dark)",
};

/* ── Shape renderer ── */
function ShapeRenderer({ type, size, color }: { type: ShapeType; size: number; color: string }) {
  switch (type) {
    case "circle": return <Circle size={size} color={color} />;
    case "triangle": return <Triangle size={size} color={color} />;
    case "square": return <Square size={size} color={color} />;
    case "diamond": return <Diamond size={size} color={color} />;
    case "hexagon": return <Hexagon size={size} color={color} />;
    case "cube": return <Cube size={size} color={color} />;
    case "cylinder": return <Cylinder size={size} color={color} />;
  }
}

/* ── Seeded random for consistent SSR/CSR ── */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/* ── Pre-defined positions for controlled spacing with small overlaps ── */
const positions = [
  { x: 58, y: 25 },  // top area
  { x: 78, y: 18 },
  { x: 45, y: 45 },  // middle area
  { x: 70, y: 40 },
  { x: 88, y: 35 },
  { x: 52, y: 65 },  // lower area
  { x: 75, y: 58 },
  { x: 62, y: 78 },
  { x: 85, y: 70 },
  { x: 48, y: 85 },
  { x: 72, y: 82 },
  { x: 90, y: 55 },
];

/* ── Generate shapes ── */
function generateShapes(): Shape[] {
  const allTypes: ShapeType[] = ["triangle", "square", "diamond", "hexagon", "cube", "cylinder", "circle"];
  const colors: Shape["color"][] = ["teal", "teal-bright", "teal-mid", "teal-dark"];
  const shapes: Shape[] = [];

  // First: One OBNOXIOUSLY LARGE circle as focal point
  shapes.push({
    id: 0,
    type: "circle",
    size: 380,
    x: 60,
    y: 28,
    rotation: 0,
    spinDuration: 120,
    floatDuration: 8,
    floatDelay: 0,
    opacity: 0.45,
    color: "teal-bright",
    zIndex: 1,
  });

  // Rest of shapes at pre-defined positions
  for (let i = 0; i < positions.length; i++) {
    const seed = (i + 1) * 1337;
    const pos = positions[i];
    
    // Sizes: 70-160px
    const size = 70 + seededRandom(seed + 1) * 90;
    
    // Cycle through all shape types
    const shapeType = allTypes[i % allTypes.length];
    
    shapes.push({
      id: i + 1,
      type: shapeType,
      size,
      x: pos.x,
      y: pos.y,
      rotation: seededRandom(seed + 4) * 360,
      spinDuration: 30 + seededRandom(seed + 5) * 50,
      floatDuration: 3 + seededRandom(seed + 6) * 4,
      floatDelay: (i + 1) * 0.08,
      opacity: 0.35 + seededRandom(seed + 8) * 0.35,
      color: colors[Math.floor(seededRandom(seed + 9) * colors.length)],
      zIndex: 2 + Math.floor(seededRandom(seed + 10) * 8),
    });
  }

  return shapes;
}

/* ── Individual Shape with Magnetic Repulsion ── */
interface FloatingShapeProps {
  shape: Shape;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function FloatingShape({ shape, mouseX, mouseY, containerRef }: FloatingShapeProps) {
  const repelX = useMotionValue(0);
  const repelY = useMotionValue(0);
  
  const springConfig = { stiffness: 100, damping: 18 };
  const smoothX = useSpring(repelX, springConfig);
  const smoothY = useSpring(repelY, springConfig);

  useEffect(() => {
    const unsubX = mouseX.on("change", () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const mx = mouseX.get();
      const my = mouseY.get();
      
      const shapeX = (shape.x / 100) * rect.width + shape.size / 2;
      const shapeY = (shape.y / 100) * rect.height + shape.size / 2;
      
      const dx = shapeX - mx;
      const dy = shapeY - my;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const repulsionRadius = shape.size * 0.8;
      
      if (distance < repulsionRadius && distance > 0) {
        const force = (1 - distance / repulsionRadius) * 50;
        const angle = Math.atan2(dy, dx);
        
        repelX.set(Math.cos(angle) * force);
        repelY.set(Math.sin(angle) * force);
      } else {
        repelX.set(0);
        repelY.set(0);
      }
    });

    return () => unsubX();
  }, [mouseX, mouseY, shape, repelX, repelY, containerRef]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${shape.x}%`,
        top: `${shape.y}%`,
        x: smoothX,
        y: smoothY,
        zIndex: shape.zIndex,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: shape.opacity,
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.8, delay: shape.floatDelay },
        scale: { duration: 0.8, delay: shape.floatDelay, type: "spring" },
      }}
    >
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [shape.rotation, shape.rotation + 360],
        }}
        transition={{
          y: {
            duration: shape.floatDuration,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: shape.spinDuration,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        <ShapeRenderer
          type={shape.type}
          size={shape.size}
          color={colorMap[shape.color]}
        />
      </motion.div>
    </motion.div>
  );
}

/* ── Main Component ── */

export default function HeroFeatureBlock() {
  const shapes = useMemo(() => generateShapes(), []);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
      mouseX.set(-1000);
      mouseY.set(-1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {isClient && shapes.map((shape) => (
        <FloatingShape
          key={shape.id}
          shape={shape}
          mouseX={mouseX}
          mouseY={mouseY}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}
