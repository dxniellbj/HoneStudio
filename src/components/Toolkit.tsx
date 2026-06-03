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
  Web: "text-red",
  "AI & Automation": "text-orange",
  Strategy: "text-blue",
  Design: "text-purple",
};

const TOOLKIT_TAG_STYLE: Record<string, string> = {
  Web: "border-red/40 text-red bg-red/5",
  "AI & Automation": "border-orange/40 text-orange bg-orange/5",
  Strategy: "border-blue/40 text-blue bg-blue/5",
  Design: "border-purple/40 text-purple bg-purple/5",
};

interface ToolkitProps {
  showHeader?: boolean;
  className?: string;
}

export default function Toolkit({ showHeader = true, className = "" }: ToolkitProps) {
  return (
    <section className={`relative bg-cream py-16 px-6 pattern-scan border-b-[3px] border-shadow ${className}`}>
      <TechLines variant="corner-brackets" className="text-shadow/60" />
      <div className="mx-auto max-w-7xl">
        {showHeader && (
          <ScrollReveal>
            <p className="eyebrow mb-4 flex items-center gap-2">
              <span className="inline-block h-px w-6 bg-red" />
              Toolkit
            </p>
            <h2 className="font-display text-4xl font-extrabold tracking-[-0.02em] text-dark md:text-5xl">
              What I Work With
            </h2>
            <p className="mt-4 text-lg font-light text-dark/65">
              I&apos;m not loyal to any one platform. I pick the tool that fits your business, not the one I&apos;m comfiest in.
            </p>
          </ScrollReveal>
        )}

        <div className={`${showHeader ? "mt-10" : ""} grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4`}>
          {Object.entries(TOOLKIT).map(([category, tools], i) => (
            <ScrollReveal key={category} delay={i * 0.1} className="h-full">
              <div className="h-full rounded-lg border-2 border-shadow bg-beige p-8">
                <h3
                  className={`mb-6 font-mono text-xs uppercase tracking-widest ${TOOLKIT_ACCENT[category]}`}
                >
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className={`rounded-sm border px-3 py-1 font-mono text-[11px] uppercase tracking-wide ${TOOLKIT_TAG_STYLE[category]}`}
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
