"use client";

import { useTheme } from "@/components/ThemeProvider";

const COLOR_MAP: Record<string, string> = {
  ink: "#0F1114",
  carbon: "#181B20",
  slate: "#22262D",
  snow: "#F6F7F9",
  white: "#FFFFFF",
  cloud: "#ECEEF1",
};

interface SectionDividerProps {
  from: string;
  to: string;
  lightFrom?: string;
  lightTo?: string;
}

export default function SectionDivider({
  from,
  to,
  lightFrom,
  lightTo,
}: SectionDividerProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const fromColor = COLOR_MAP[isDark ? from : (lightFrom ?? from)] ?? from;
  const toColor = COLOR_MAP[isDark ? to : (lightTo ?? to)] ?? to;

  return (
    <div
      className="h-8 md:h-12"
      aria-hidden="true"
      style={{
        "--divider-from": fromColor,
        "--divider-to": toColor,
        background: "linear-gradient(var(--divider-from), var(--divider-to))",
        transition: "--divider-from 0.5s ease, --divider-to 0.5s ease",
      } as React.CSSProperties}
    />
  );
}
