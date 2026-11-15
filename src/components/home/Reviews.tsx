"use client";

import { InteractiveMarquee } from "@/components/ui/InteractiveMarquee";
import { business } from "@/lib/config/business";
import { reviews } from "@/lib/config/reviews";
import {
  btnInkClass,
  btnPrimaryClass,
  cn,
  eyebrowClass,
  liftShadow,
  pageStartPad,
  sectionPadBottom,
  sectionPadY,
} from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function Reviews({ pageStart = false }: { pageStart?: boolean }) {
  return (
    <section
      id="reviews"
      className={cn(
        pageStart ? `${pageStartPad} ${sectionPadBottom}` : sectionPadY,
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className={eyebrowClass}>Reviews</p>
            {pageStart ? (
              <h1 className="section-title mt-4 max-w-xl">
                Kenilworth keeps coming back.
              </h1>
            ) : (
              <h2 className="section-title mt-4 max-w-xl">
                Kenilworth keeps coming back.
              </h2>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <div>
              <p className="font-heading text-[clamp(2.75rem,8vw,3.75rem)] leading-none tracking-tight">
                {business.rating}{" "}
                <span className="text-barber" aria-hidden>
                  ★
                </span>
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted">
                Google rating
              </p>
            </div>
            <a
              href={business.googleReviewsUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(btnPrimaryClass, liftShadow)}
            >
              Leave a review
            </a>
          </div>
        </div>
      </div>

      <InteractiveMarquee
        speed={36}
        className="mt-8 py-12"
        trackClassName="gap-4 px-2 pr-4"
      >
        {reviews.map((review) => (
          <figure
            key={review.name}
            className="surface-fade w-[300px] shrink-0 border border-ink/10 bg-surface p-5 sm:w-[360px] sm:p-6"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-ink/10 bg-ink text-[11px] font-medium uppercase tracking-[0.08em] text-surface">
                {initials(review.name)}
              </span>
              <span
                className="text-sm tracking-[0.14em] text-barber"
                aria-label={`${review.stars} stars`}
              >
                {"★".repeat(review.stars)}
              </span>
            </div>
            <blockquote className="mt-5 text-[16px] leading-7 text-ink">
              “{review.text}”
            </blockquote>
            <figcaption className="mt-5 text-[11px] uppercase tracking-[0.16em] text-muted">
              {review.name}
            </figcaption>
          </figure>
        ))}
      </InteractiveMarquee>

      <div className="relative z-10 mx-auto mt-10 max-w-7xl px-5 sm:px-8">
        <a
          href={business.googleReviewsUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(btnInkClass, liftShadow)}
        >
          See Google reviews
        </a>
      </div>
    </section>
  );
}
