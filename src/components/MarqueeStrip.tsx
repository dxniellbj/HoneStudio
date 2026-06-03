const ITEMS = [
  "Custom Software",
  "AI & Automation",
  "Internal Tools",
  "Web Development",
  "Strategy",
  "Systems",
] as const;

/* Decorative scrolling strip. Items are duplicated for a seamless loop. */
export default function MarqueeStrip() {
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-strip__inner">
        {loop.map((item, i) => (
          <span key={i}>
            <span className="marquee-strip__item">{item}</span>
            <span className="marquee-strip__dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
