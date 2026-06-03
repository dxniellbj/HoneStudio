"use client";

import BusinessCard from "@/components/BusinessCard";

export default function ContactSidebar() {
  function openChat() {
    window.dispatchEvent(new CustomEvent("openHonestChat"));
  }

  return (
    <div className="scanlines rounded-xl bg-dark text-cream p-6 flex flex-col gap-6">
      {/* Alternative contact options */}
      <div className="space-y-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-yellow leading-relaxed">
            Prefer email?
          </p>
          <a
            href="mailto:dxniellbj@gmail.com"
            className="text-sm leading-relaxed text-cream/80 transition-colors hover:text-yellow"
          >
            dxniellbj@gmail.com
          </a>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-cream/45">
            Replies within 24 hours
          </p>
        </div>

        <div className="h-px bg-cream/15" />

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-yellow leading-relaxed">
            Got a quick one?
          </p>
          <button
            onClick={openChat}
            className="text-sm leading-relaxed text-cream/80 transition-colors hover:text-yellow text-left"
          >
            Ping the chat widget →
          </button>
        </div>
      </div>

      <div className="h-px bg-cream/15" />

      {/* Business Card */}
      <div className="flex justify-center">
        <BusinessCard />
      </div>
    </div>
  );
}
