import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-ink px-6">
      <div className="text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-teal">
          404
        </p>
        <h1 className="mt-4 font-display text-5xl text-section-title text-white md:text-6xl">
          Page not found
        </h1>
        <p className="mt-4 text-lg text-ash">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-sm bg-teal px-8 py-3 font-mono text-sm uppercase tracking-widest text-ink transition-colors hover:bg-teal-bright"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="rounded-sm border border-slate px-8 py-3 font-mono text-sm uppercase tracking-widest text-ash transition-colors hover:border-teal hover:text-teal"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
