const COLOR_MAP: Record<string, string> = {
  // Retro palette — single theme
  cream: "#E8E0C8",
  beige: "#D4C9A8",
  shadow: "#B8A882",
  dark: "#2A2420",
  darkest: "#1A1410",
  // Legacy aliases (repointed to retro values)
  ink: "#2A2420",
  carbon: "#2A2420",
  slate: "#3A332C",
  snow: "#E8E0C8",
  white: "#E8E0C8",
  cloud: "#D4C9A8",
};

interface SectionDividerProps {
  from: string;
  to: string;
  /** Kept for call-site compatibility; ignored in single-theme mode. */
  lightFrom?: string;
  lightTo?: string;
}

export default function SectionDivider({ from, to }: SectionDividerProps) {
  const fromColor = COLOR_MAP[from] ?? from;
  const toColor = COLOR_MAP[to] ?? to;

  return (
    <div
      className="h-8 md:h-12"
      aria-hidden="true"
      style={{
        background: `linear-gradient(${fromColor}, ${toColor})`,
      }}
    />
  );
}
