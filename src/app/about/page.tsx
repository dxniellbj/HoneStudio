import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import Toolkit from "@/components/Toolkit";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Niell Alfajora, the developer behind Hone Studio. I build custom software and AI tools, and I'm the same person who plans it, designs it, and ships it.",
  keywords: [
    "Niell Alfajora",
    "Hone Studio founder",
    "custom software developer",
    "tech consultant",
    "web developer Philippines",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Hone Studio",
    description:
      "Meet Niell Alfajora, the developer behind Hone Studio. Custom software, AI tools, and the websites in between.",
    url: "https://honestudio.cv/about",
    
  },
  twitter: {
    title: "About | Hone Studio",
    description:
      "Meet Niell Alfajora, the developer behind Hone Studio. Custom software, AI tools, and the websites in between.",
  },
};

const VALUES = [
  {
    title: "Honest By Default",
    description:
      "If something won't work, I'll tell you before you spend money on it. If there's a better path, I'll point to it, even when it means less work for me. I'd rather lose a project than build you the wrong thing.",
  },
  {
    title: "One Brain, Not One Team",
    description:
      "You get a senior partner who knows your business inside out. Not a project manager relaying messages between a designer, a developer, and a strategist who've never been on the same call. Faster decisions, tighter execution, no game of telephone.",
  },
  {
    title: "Outcomes Over Output",
    description:
      "A gorgeous site that doesn't convert is just expensive decoration. I care about what the work does for your business. Pages shipped is not a number I brag about.",
  },
  {
    title: "Everything Touches Everything",
    description:
      "Strategy shapes design. Design shapes the tech stack. The tech stack feeds back into strategy. When one person handles all three, those connections happen on their own instead of dying in a handoff.",
  },
] as const;



const RED_RISING_BOOKS = [
  { title: "Red Rising", cover: "/images/about/red-rising-1.jpg", completed: true },
  { title: "Golden Son", cover: "/images/about/red-rising-2.jpg", completed: true },
  { title: "Morning Star", cover: "/images/about/red-rising-3.png", completed: true },
  { title: "Iron Gold", cover: "/images/about/red-rising-4.webp", completed: false },
  { title: "Dark Age", cover: "/images/about/red-rising-5.jpg", completed: false },
  { title: "Light Bringer", cover: "/images/about/red-rising-6.jpg", completed: false },
] as const;

const TOP_READS = [
  { genre: "Nonfiction", title: "Think Again", author: "Adam Grant", cover: "/images/about/think-again-book-cover.jpg" },
  { genre: "Nonfiction", title: "The Importance of Being Interested", author: "Robin Ince", cover: "/images/about/the-importance-of-being-interested-book-cover.jpg" },
  { genre: "Sci-Fi", title: "Project Hail Mary", author: "Andy Weir", cover: "/images/about/project-hail-mary-book-cover.jpg" },
  { genre: "Slice of Life", title: "The Book Thief", author: "Markus Zusak", cover: "/images/about/the-book-thief-book-cover.jpg" },
] as const;



export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-cream min-h-dvh flex items-center px-6 pt-24 md:pt-28 pattern-grid border-b-[3px] border-shadow">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Text */}
            <ScrollReveal>
              <p className="eyebrow mb-4 flex items-center gap-2">
                <span className="inline-block h-px w-6 bg-red" />
                About
              </p>
              <h1 className="font-display text-5xl font-extrabold tracking-[-0.02em] text-dark md:text-6xl">
                Niell Alfajora
              </h1>
              <p className="mt-2 font-mono text-sm uppercase tracking-widest text-dark/50">
                Founder, Hone Studio
              </p>
              <div className="mt-8 space-y-4 text-lg leading-relaxed font-light text-dark/65">
                <p>
                  I build the strategy, the systems, and the website, and I&apos;m the same person in all three meetings.
                </p>
                <p>
                  Founders and small teams hire me when they need someone who can think about the business <em>and</em> build the thing. Not a developer waiting on a brief. Not a strategist who hands off a PDF and vanishes. One person doing the thinking and the building, so nothing gets lost in translation.
                </p>
              </div>
            </ScrollReveal>

            {/* Avatar + Business Card */}
            <ScrollReveal delay={0.15}>
              <div className="relative flex items-center justify-center">
                <Image
                  src="/images/N - profile - black on transparent.svg"
                  alt="Niell Alfajora"
                  width={400}
                  height={600}
                  className="h-full w-auto max-h-[calc(100vh-16rem)] object-contain"
                  priority
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Background ── */}
      <section className="bg-cream py-16 px-6 pattern-dots border-b-[3px] border-shadow">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <p className="eyebrow mb-4 flex items-center gap-2">
                <span className="inline-block h-px w-6 bg-red" />
                Background
              </p>
              <h2 className="font-display text-4xl font-extrabold tracking-[-0.02em] text-dark md:text-5xl">
                How I Got Here
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed font-light text-dark/65">
                <p>
                  I started building websites for small businesses. Kajabi sites, Shopify stores, WordPress redesigns. The kind of work where you&apos;re on a call with the actual founder, figuring out what they need, not what looks good in a case study.
                </p>
                <p>
                  That kept pulling me into bigger problems. A client needed email automations. Then a CRM setup. Then competitive research before a rebrand. Instead of saying &ldquo;that&apos;s not what I do,&rdquo; I learned it. Honestly? I found it more interesting than building another website.
                </p>
                <p>
                  One thing led to another, and now I build AI-powered internal tools for a VC firm during the week and ship sites and systems for founders on the side.
                </p>
                <p>
                  The through line isn&apos;t &ldquo;I like figuring out how things work.&rdquo; Everyone says that. It&apos;s that I&apos;d rather understand the whole picture than master one corner of it. I&apos;d rather know why we&apos;re building something before I open a code editor. And I&apos;d rather be the person who connects the dots than the one who paints a single dot really well.
                </p>
                <p>
                  That&apos;s the name, by the way. Hone: to sharpen. Take something that&apos;s already working and give it an edge.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="rounded-lg border-2 border-shadow bg-beige p-8">
                <h3 className="mb-6 font-display text-xl font-extrabold tracking-[-0.02em] text-dark">
                  Currently
                </h3>
                <div className="space-y-5">
                  <div>
                    <p className="mb-1 font-mono text-xs uppercase tracking-widest text-orange">
                      Building
                    </p>
                    <p className="text-sm leading-relaxed text-dark/65">
                      AI tools that automate company research, web scraping, and
                      retail intelligence for the investment team.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-xs uppercase tracking-widest text-blue">
                      Based In
                    </p>
                    <p className="text-sm leading-relaxed text-dark/65">
                      Philippines, working with clients internationally.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="bg-cream py-16 px-6 pattern-diag border-b-[3px] border-shadow">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="eyebrow mb-4 flex items-center gap-2">
              <span className="inline-block h-px w-6 bg-red" />
              Principles
            </p>
            <h2 className="font-display text-4xl font-extrabold tracking-[-0.02em] text-dark md:text-5xl">
              How I Think About Work
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {VALUES.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.08} className="h-full">
                <div className="h-full rounded-lg border-2 border-shadow bg-beige p-8 transition-all duration-300 hover:-translate-y-1 hover:border-red">
                  <h3 className="mb-3 font-display text-xl font-extrabold tracking-[-0.02em] text-dark">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-dark/65">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Toolkit ── */}
      <Toolkit />

      {/* ── Off the Clock ── */}
      <section className="bg-cream py-16 px-6 pattern-grid border-b-[3px] border-shadow">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <ScrollReveal>
            <p className="eyebrow mb-4 flex items-center gap-2">
              <span className="inline-block h-px w-6 bg-red" />
              Off the Clock
            </p>
            <h2 className="font-display text-4xl font-extrabold tracking-[-0.02em] text-dark md:text-5xl">
              What I&apos;m Reading
            </h2>
            <p className="mt-4 max-w-2xl text-lg font-light text-dark/65">
              I bounce between nonfiction that pokes at how I think and fiction good enough to make me forget I&apos;m reading.
            </p>
          </ScrollReveal>

          {/* Currently Reading: Red Rising */}
          <div className="mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <ScrollReveal delay={0.1}>
              <div className="rounded-lg border-2 border-shadow bg-beige p-6">
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-red">
                  Currently working through
                </p>
                <p className="text-xl font-extrabold tracking-[-0.02em] text-dark">
                  The Red Rising series
                </p>
                <p className="mt-1 text-sm text-dark/65">
                  by Pierce Brown
                </p>
                <p className="mt-4 text-sm leading-relaxed text-dark/65">
                  Started as a guilty-pleasure sci-fi binge, turned into one of the sharpest takes on leadership, revolution, and what it costs to build something new. Three books in, three to go.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="grid grid-cols-6 gap-3">
                {RED_RISING_BOOKS.map((book) => (
                  <div key={book.title} className="relative">
                    {book.completed && (
                      <span className="absolute -top-2 -right-2 z-10 rounded-full bg-red px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-cream">
                        ✓
                      </span>
                    )}
                    <div className="group relative aspect-[2/3] overflow-hidden rounded-md border-2 border-shadow bg-beige shadow-sm transition-transform duration-300 hover:scale-105">
                      <Image
                        src={book.cover}
                        alt={`${book.title} by Pierce Brown`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Top Picks */}
          <div className="mt-16">
            <ScrollReveal>
              <p className="mb-6 font-mono text-xs uppercase tracking-widest text-dark/50">
                Top picks
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {TOP_READS.map((book, i) => (
                <ScrollReveal key={book.title} delay={0.1 + i * 0.08} className="h-full">
                  <div className="group h-full overflow-hidden rounded-lg border-2 border-shadow bg-beige transition-all duration-300 hover:-translate-y-1 hover:border-red">
                    <div className="relative aspect-[2/3] overflow-hidden bg-shadow/40">
                      <Image
                        src={book.cover}
                        alt={`${book.title} by ${book.author}`}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-red">
                        {book.genre}
                      </p>
                      <h3 className="font-display text-sm font-extrabold tracking-[-0.02em] leading-snug text-dark">
                        {book.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-dark/65">
                        {book.author}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-dark py-16 px-6 scanlines border-b-[3px] border-black/40">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-[-0.02em] text-cream md:text-5xl">
            Think we&apos;d work well together?
          </h2>
          <p className="mt-4 text-lg text-cream/70">
            I&apos;m always up for a conversation, even if it&apos;s just to talk through what you&apos;re building.
          </p>
          <Link href="/contact" className="btn btn--primary btn--lg mt-8">
            Let&apos;s Talk
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
