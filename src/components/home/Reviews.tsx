import { business } from "@/lib/config/business";
import { reviews } from "@/lib/config/reviews";

export function Reviews() {
  const looped = [...reviews, ...reviews];

  return (
    <section id="reviews" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-barber">Reviews</p>
            <h2 className="section-title mt-3 max-w-xl">
              Kenilworth keeps coming back.
            </h2>
          </div>
          <div className="lg:text-right">
            <p className="font-heading text-[clamp(2.75rem,8vw,3.75rem)] tracking-tight">
              {business.rating} <span className="text-barber">★</span>
            </p>
            <p className="mt-2 text-sm text-muted">Google rating</p>
          </div>
        </div>
      </div>

      <div className="marquee mt-12 overflow-hidden">
        <div className="marquee-track flex gap-5 pr-5">
          {looped.map((review, index) => (
            <figure
              key={`${review.name}-${index}`}
              className="w-[320px] shrink-0 rounded-[1.6rem] border border-line bg-cream p-6 sm:w-[380px]"
            >
              <blockquote className="text-[17px] leading-7 text-ink">
                “{review.text}”
              </blockquote>
              <figcaption className="mt-5 text-sm text-muted">{review.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-5 sm:px-8">
        <a
          href={business.googleReviewsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink px-6 text-[15px] font-medium transition-transform duration-200 hover:-translate-y-0.5"
        >
          See Google Reviews
        </a>
      </div>
    </section>
  );
}
