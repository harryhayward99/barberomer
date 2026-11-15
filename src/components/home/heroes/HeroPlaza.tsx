"use client";

import Image from "next/image";
import { useState } from "react";
import {
  HeroBookButton,
  HeroContactLink,
  heroSlides,
} from "@/components/home/heroes/shared";
import { business } from "@/lib/config/business";
import { cn, pageStartPad, sectionPadBottom } from "@/lib/utils";

/** Plaza hero — large square stage + side square stack, shared carousel. */
export function HeroPlaza() {
  const slides = heroSlides;
  const [index, setIndex] = useState(0);
  const lead = slides[index] ?? slides[0];
  const side = slides[(index + 1) % slides.length];

  const go = (direction: -1 | 1) => {
    setIndex((value) => (value + direction + slides.length) % slides.length);
  };

  return (
    <section
      className={cn("relative overflow-hidden bg-cream", pageStartPad, sectionPadBottom)}
    >
      {/* Static background wash — smaller, fully on-canvas soft radial (no hard mid cut) */}
      {/* Wash at header-bottom height, centred on the far right — full soft radial (no top clip) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 z-0 h-44 w-44 translate-x-1/2 sm:h-52 sm:w-52"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--red) 42%, transparent) 0%, color-mix(in srgb, var(--red) 16%, transparent) 46%, transparent 72%)",
        }}
      />
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
              <div className="relative col-span-8 aspect-square overflow-hidden border border-ink/10 bg-ink/5">
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
              </div>

              <div className="col-span-4 flex flex-col gap-3 sm:gap-4">
                <div className="relative aspect-square overflow-hidden border border-ink/10 bg-ink/5">
                  <Image
                    src={side.src}
                    alt={side.alt}
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex aspect-square flex-col justify-between border border-ink/10 bg-ink p-3 text-surface sm:p-4">
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
                <span className="hidden sm:inline">· {lead.alt.split(",")[0]}</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() => go(-1)}
                  className="inline-flex h-10 w-10 items-center justify-center border border-ink/20 bg-surface text-ink transition-colors hover:bg-ink hover:text-surface"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => go(1)}
                  className="inline-flex h-10 w-10 items-center justify-center border border-ink/20 bg-surface text-ink transition-colors hover:bg-ink hover:text-surface"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
