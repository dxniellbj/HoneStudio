import Link from "next/link";

interface CaseStudyCardProps {
  title: string;
  client: string;
  platform: string;
  pillars: readonly string[];
  summary: string;
  slug: string;
}

const PILLAR_COLORS: Record<string, string> = {
  Web: "border-teal/30 text-teal bg-teal-ghost",
  AI: "border-signal/30 text-signal bg-signal-ghost",
  Strategy: "border-indigo/30 text-indigo bg-indigo-ghost",
};

export default function CaseStudyCard({
  title,
  client,
  platform,
  pillars,
  summary,
  slug,
}: CaseStudyCardProps) {
  return (
    <article className="group rounded-md border border-cloud dark:border-slate bg-white dark:bg-carbon overflow-hidden transition-all duration-300 hover:border-teal hover:shadow-lg">
      {/* Thumbnail Placeholder */}
      <div className="relative h-48 bg-slate dark:bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-radial-[at_30%_40%] from-teal-glow to-transparent opacity-60" />
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Client Eyebrow */}
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-ash">
          {client}
        </p>

        {/* Title */}
        <h3 className="mb-3 font-display text-xl font-semibold text-ink dark:text-white">
          {title}
        </h3>

        {/* Platform Badge */}
        <span className="mb-3 inline-block rounded-full border border-mist dark:border-iron px-3 py-1 font-mono text-[11px] text-graphite dark:text-ash">
          {platform}
        </span>

        {/* Pillar Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {pillars.map((pillar) => (
            <span
              key={pillar}
              className={`rounded-full border px-3 py-1 font-mono text-[11px] ${
                PILLAR_COLORS[pillar] ?? "border-mist dark:border-iron text-graphite dark:text-ash"
              }`}
            >
              {pillar}
            </span>
          ))}
        </div>

        {/* Summary */}
        <p className="mt-4 text-sm leading-relaxed text-graphite dark:text-ash">
          {summary}
        </p>

        {/* Link */}
        <Link
          href={`/work/${slug}`}
          className="mt-4 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-teal transition-colors hover:text-teal-bright"
        >
          Read case study
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
