import Link from "next/link";

export default function NotFound() {
  return (
    <section className="scanlines flex min-h-[70vh] items-center justify-center bg-dark px-6">
      <div className="text-center">
        <p className="eyebrow">Game Over</p>
        <h1 className="mt-4 font-display text-6xl font-bold uppercase tracking-tight text-yellow md:text-8xl">
          404
        </h1>
        <p className="mt-2 font-display text-2xl font-bold uppercase text-cream md:text-3xl">
          Page not found
        </p>
        <p className="mt-4 text-lg text-cream/65">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn btn--primary btn--lg">
            Insert Coin · Go Home
          </Link>
          <Link href="/contact" className="btn btn--ghost btn--lg">
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
