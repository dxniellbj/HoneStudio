import ScrollReveal from "@/components/ScrollReveal";
import TechLines from "@/components/TechLines";

const TOOLKIT = {
  Web: [
    "Next.js", "React", "TypeScript", "JavaScript", "Firebase",
    "Tailwind CSS", "Liquid", "Vercel", "Shopify", "Webflow",
    "Framer", "Kajabi", "Squarespace", "Figma", "Google Workspace", "HTML/CSS"
  ],
  "AI & Automation": [
    "Genkit", "API Integrations", "Data Pipelines", "AI Workflows",
    "Claude", "OpenAI", "Gemini", "Perplexity", "Apps Script",
    "CRM Automations", "Lead Enrichment", "Chatbots", "Google Sheets", "Excel"
  ],
  Strategy: [
    "Funnel Planning", "Offer Positioning", "Sourcing Systems",
    "Market Research", "Competitive Intel", "SEO", "CRO",
    "Discovery Workshops", "Roadmapping", "Website Audits", "Audits"
  ],
  Design: ["Illustrator", "Photoshop", "Figma", "Brand Kits", "Web Graphics", "Canva"],
} as const;

const TOOLKIT_ACCENT: Record<string, string> = {
  Web: "text-teal dark:text-teal-dark",
  "AI & Automation": "text-signal",
  Strategy: "text-indigo",
  Design: "text-violet",
};

const TOOLKIT_TAG_STYLE: Record<string, string> = {
  Web: "border-teal/30 dark:border-teal-dark/30 text-teal dark:text-teal-dark bg-teal-ghost",
  "AI & Automation": "border-signal/30 text-signal bg-signal-ghost",
  Strategy: "border-indigo/30 text-indigo bg-indigo-ghost",
  Design: "border-violet/30 text-violet bg-violet-ghost",
};

interface ToolkitProps {
  showHeader?: boolean;
  className?: string;
}

export default function Toolkit({ showHeader = true, className = "" }: ToolkitProps) {
  return (
    <section className={`relative bg-white dark:bg-carbon py-16 px-6 pattern-scan ${className}`}>
      <TechLines variant="corner-brackets" className="text-cloud dark:text-slate" />
      <div className="mx-auto max-w-7xl">
        {showHeader && (
          <ScrollReveal>
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash">
              <span className="inline-block h-px w-6 bg-teal dark:bg-teal-dark" />
              Toolkit
            </p>
            <h2 className="font-display text-4xl text-section-title text-ink dark:text-white md:text-5xl">
              What I Work With
            </h2>
            <p className="mt-4 text-lg text-graphite dark:text-ash">
              I&apos;m platform-flexible — I pick the tool that fits the business, not the one I&apos;m most comfortable with.
            </p>
          </ScrollReveal>
        )}

        <div className={`${showHeader ? "mt-10" : ""} grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4`}>
          {Object.entries(TOOLKIT).map(([category, tools], i) => (
            <ScrollReveal key={category} delay={i * 0.1} className="h-full">
              <div className="h-full rounded-md border border-cloud dark:border-slate bg-snow dark:bg-ink p-8">
                <h3
                  className={`mb-6 font-mono text-xs uppercase tracking-widest ${TOOLKIT_ACCENT[category]}`}
                >
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className={`rounded-full border px-3 py-1 font-mono text-[11px] ${TOOLKIT_TAG_STYLE[category]}`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
