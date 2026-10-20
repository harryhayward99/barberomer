import { business } from "@/lib/config/business";
import { reviews } from "@/lib/config/reviews";
import { cn, pageStartPad, sectionPad, sectionPadBottom } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function Reviews({ pageStart = false }: { pageStart?: boolean }) {
  const looped = [...reviews, ...reviews];

  return (
    <section
      id="reviews"
      className={cn(pageStart ? `${pageStartPad} ${sectionPadBottom}` : sectionPad)}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-barber">Reviews</p>
            <h2 className="section-title mt-3 max-w-xl">
              Kenilworth keeps coming back.
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <div>
              <p className="font-heading text-[clamp(2.75rem,8vw,3.75rem)] tracking-tight">
                {business.rating} <span className="text-barber">★</span>
              </p>
              <p className="mt-1 text-sm text-muted">Google rating</p>
            </div>
            <a
              href={business.googleReviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-barber px-4 text-sm font-medium text-cream transition-transform duration-200 hover:-translate-y-0.5 hover:bg-barber-deep"
            >
              Leave a Review
            </a>
          </div>
        </div>
      </div>

      <div className="marquee mt-12 overflow-hidden py-5">
        <div className="marquee-track flex gap-4 px-1 pr-4">
          {looped.map((review, index) => (
            <figure
              key={`${review.name}-${index}`}
              className="surface-fade w-[300px] shrink-0 rounded-2xl bg-white p-5 sm:w-[360px]"
              style={{ border: "1px solid #c4c4c4" }}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-medium text-cream">
                  {initials(review.name)}
                </span>
                <span
                  className="text-sm tracking-[0.14em] text-barber"
                  aria-label={`${review.stars} stars`}
                >
                  {"★".repeat(review.stars)}
                </span>
              </div>
              <blockquote className="mt-4 text-[16px] leading-7 text-ink">
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
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-6 text-[15px] font-medium text-cream transition-transform duration-200 hover:-translate-y-0.5"
        >
          See Google Reviews
        </a>
      </div>
    </section>
  );
}
