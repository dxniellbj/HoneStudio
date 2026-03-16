import ScrollReveal from "@/components/ScrollReveal";
import { TESTIMONIALS } from "@/lib/data";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-teal dark:text-teal-dark" : "text-cloud dark:text-slate"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  const testimonial = TESTIMONIALS[0];

  return (
    <section className="bg-white dark:bg-carbon py-16 px-6">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <div className="text-center">
            {/* Quote mark */}
            <div className="mb-6 font-display text-6xl text-teal/20 dark:text-teal-dark/20">
              &ldquo;
            </div>

            {/* Quote text */}
            <blockquote className="text-xl leading-relaxed text-ink dark:text-white md:text-2xl">
              {testimonial.quote}
            </blockquote>

            {/* Attribution */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <StarRating rating={testimonial.rating} />
              <p className="font-mono text-sm uppercase tracking-widest text-graphite dark:text-ash">
                {testimonial.name}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
