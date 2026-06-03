"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CoinDrag from "@/components/CoinDrag";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
] as const;

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Nav Bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-dark border-b border-black/30"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3">
          {/* Logo + hidden coin */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-0" aria-label="Hone Studio home">
              <span className="font-display text-xl font-bold tracking-[-0.02em] text-cream">
                Hone
              </span>
              <span className="font-display text-xl font-bold tracking-[-0.02em] text-red">.</span>
            </Link>
            <CoinDrag />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`font-mono text-[11px] uppercase tracking-[0.1em] transition-colors hover:text-cream ${
                  pathname === link.href
                    ? "text-yellow"
                    : "text-cream/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-sm bg-red px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-white shadow-[0_3px_0_rgba(0,0,0,0.3)] transition-colors hover:bg-red-bright"
            >
              Start a project
            </Link>
          </div>

          {/* Hamburger Button — mobile only */}
          <button
            className="md:hidden relative z-[70] w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-px w-5 bg-cream transition-all duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-cream transition-all duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Full-Page Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-[60] bg-dark transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        aria-hidden={!open}
      >
        {/* Top bar — logo mirrored from nav */}
        <div className="mx-auto max-w-7xl flex items-center px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-0"
            aria-label="Hone Studio home"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            <span className="font-display text-xl font-bold tracking-[-0.02em] text-cream">
              Hone
            </span>
            <span className="font-display text-xl font-bold tracking-[-0.02em] text-red">.</span>
          </Link>
        </div>

        {/* Centered links */}
        <div className="flex flex-col items-center justify-center h-[calc(100dvh-80px)] gap-10 px-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`font-display text-3xl font-bold transition-colors hover:text-yellow ${
                pathname === link.href
                  ? "text-yellow"
                  : "text-cream"
              }`}
              tabIndex={open ? 0 : -1}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-4 flex flex-col items-center gap-6">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-sm bg-red px-10 py-4 font-mono text-sm uppercase tracking-widest text-white shadow-[0_4px_0_rgba(0,0,0,0.3)] transition-colors hover:bg-red-bright"
              tabIndex={open ? 0 : -1}
            >
              Start a project
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
