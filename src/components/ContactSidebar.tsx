"use client";

import BusinessCard from "@/components/BusinessCard";

export default function ContactSidebar() {
  function openChat() {
    window.dispatchEvent(new CustomEvent("openHonestChat"));
  }

  return (
    <div className="rounded-md border border-cloud dark:border-slate bg-snow dark:bg-ink p-6 flex flex-col gap-6">
      {/* Alternative contact options */}
      <div className="space-y-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ash leading-relaxed">
            Prefer email?
          </p>
          <a
            href="mailto:dxniellbj@gmail.com"
            className="text-sm leading-relaxed text-graphite dark:text-ash transition-colors hover:text-teal"
          >
            dxniellbj@gmail.com
          </a>
        </div>

        <div className="h-px bg-cloud dark:bg-slate" />

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ash leading-relaxed">
            Quick question?
          </p>
          <button
            onClick={openChat}
            className="text-sm leading-relaxed text-teal transition-colors hover:text-teal-bright text-left"
          >
            Use the chat widget →
          </button>
        </div>
      </div>

      <div className="h-px bg-cloud dark:bg-slate" />

      {/* Business Card */}
      <div className="flex justify-center">
        <BusinessCard />
      </div>
    </div>
  );
}
