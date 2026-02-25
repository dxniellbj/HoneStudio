import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-snow dark:bg-ink py-16 px-6" role="contentinfo">
      <div className="mx-auto max-w-7xl flex flex-col items-center text-center">
        {/* Logo */}
        <Link href="/" className="mb-4" aria-label="Hone Studio home">
          <span className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink dark:text-white">
            Hone
          </span>
          <span className="font-display text-2xl font-semibold tracking-[-0.02em] text-teal">.</span>
        </Link>

        {/* Tagline */}
        <p className="mb-8 text-graphite dark:text-ash">
          Strategy. Systems. Websites. One person.
        </p>

        {/* Nav Links */}
        <nav
          className="mb-8 flex flex-wrap items-center justify-center gap-6"
          aria-label="Footer navigation"
        >
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest text-graphite dark:text-ash transition-colors hover:text-teal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Email */}
        <a
          href="mailto:hello@honestudio.cv"
          className="mb-8 font-mono text-sm text-graphite dark:text-ash transition-colors hover:text-teal"
        >
          hello@honestudio.cv
        </a>

        {/* Divider */}
        <div className="mb-8 h-0.5 w-9 bg-teal" />

        {/* Copyright */}
        <p className="font-mono text-xs text-ash dark:text-iron">
          &copy; 2026 Hone Studio
        </p>
      </div>
    </footer>
  );
}
