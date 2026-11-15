"use client";

import Image from "next/image";
import { useState } from "react";
import {
  HeroBookButton,
  HeroContactLink,
  heroSlides,
} from "@/components/home/heroes/shared";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { business } from "@/lib/config/business";
import { cn, liftShadow, pageStartPad, sectionPadBottom } from "@/lib/utils";

/** Plaza hero — large square stage + side square stack, shared carousel. */
export function HeroPlaza() {
  const slides = heroSlides;
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const side = slides[(index + 1) % slides.length];

  const go = (direction: -1 | 1) => {
    setIndex((value) => (value + direction + slides.length) % slides.length);
  };

  const openAt = (next: number) => {
    setIndex(next);
    setLightboxOpen(true);
  };

  return (
    <section
      className={cn("relative bg-cream", pageStartPad, sectionPadBottom)}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute z-0 h-44 w-44 sm:h-52 sm:w-52 lg:h-64 lg:w-64",
          "top-1 right-0 translate-x-[calc(50%-50px)] -translate-y-[30px] sm:top-2",
          "lg:top-[34%] lg:left-[35%] lg:right-auto lg:translate-x-[-50%] lg:translate-y-[-50%]",
        )}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--red) 42%, transparent) 0%, color-mix(in srgb, var(--red) 16%, transparent) 46%, transparent 72%)",
          }}
        />
        <Image
          src="/images/logo-oxblood.png"
          alt=""
          width={160}
          height={160}
          className="absolute left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rotate-[35deg] object-contain opacity-55"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="relative lg:col-span-5">
            <p className="font-heading text-[12px] font-medium uppercase tracking-[0.22em] text-muted sm:text-[13px]">
              Kenilworth · Since {business.established}
            </p>
            <h1 className="mt-4 max-w-md text-[clamp(2.5rem,7vw,4.6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em]">
              Sharp cuts.
              <br />
              Fair prices.
            </h1>
            <p className="mt-5 max-w-sm text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Omer&apos;s been cutting hair on Common Lane since{" "}
              {business.established} — calm, careful, and properly welcoming.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <HeroBookButton />
              <HeroContactLink />
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <div className="grid grid-cols-12 items-end gap-3 sm:gap-4">
              <button
                type="button"
                aria-label={`View ${slides[index]?.alt ?? "cut"} larger`}
                onClick={() => openAt(index)}
                className="surface-fade relative col-span-8 aspect-square cursor-zoom-in overflow-hidden border border-ink/10 bg-ink/5 text-left"
              >
                {slides.map((image, i) => (
                  <Image
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 70vw, 40vw"
                    className={cn(
                      "object-cover transition-opacity duration-500",
                      i === index ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}
              </button>

              <div className="col-span-4 flex flex-col gap-3 sm:gap-4">
                <button
                  type="button"
                  aria-label={`View ${side.alt} larger`}
                  onClick={() => openAt((index + 1) % slides.length)}
                  className="surface-fade relative aspect-square cursor-zoom-in overflow-hidden border border-ink/10 bg-ink/5 text-left"
                >
                  <Image
                    src={side.src}
                    alt={side.alt}
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </button>
                <div className="surface-fade flex aspect-square flex-col justify-between border border-ink/10 bg-ink p-3 text-surface sm:p-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-surface/55">
                    From the chair
                  </p>
                  <p className="font-heading text-2xl leading-none sm:text-3xl">
                    {String(index + 1).padStart(2, "0")}
                    <span className="text-surface/35">
                      /{String(slides.length).padStart(2, "0")}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-4 sm:justify-between">
              <div className="hidden items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-muted sm:flex">
                <span className="tabular-nums text-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-10 bg-ink/25 sm:w-16" aria-hidden />
                <span className="tabular-nums">
                  {String(slides.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() => go(-1)}
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center border border-ink/20 bg-surface text-ink transition-colors hover:bg-ink hover:text-surface",
                    liftShadow,
                  )}
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => go(1)}
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center border border-ink/20 bg-surface text-ink transition-colors hover:bg-ink hover:text-surface",
                    liftShadow,
                  )}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen ? (
        <ImageLightbox
          images={slides}
          index={index}
          onClose={() => setLightboxOpen(false)}
          onChange={setIndex}
        />
      ) : null}
    </section>
  );
}