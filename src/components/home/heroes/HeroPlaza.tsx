"use client";

import Image from "next/image";
import { useState } from "react";
import { heroSlides } from "@/components/home/heroes/shared";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { business } from "@/lib/config/business";
import { cn } from "@/lib/utils";

const features = [
  {
    key: "precision-haircuts",
    label: (
      <>
        Precision
        <br />
        haircuts
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" aria-hidden>
        <circle cx="6.5" cy="6.5" r="2.25" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="6.5" cy="17.5" r="2.25" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8.4 8.1 19 17.5M8.4 15.9 19 6.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    ),
  },
  {
    key: "skin-fades",
    label: (
      <>
        Skin
        <br />
        fades
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" aria-hidden>
        <path
          d="M4.5 19.5 14 10l2.2 2.2-9.5 9.5H4.5v-2.2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="miter"
        />
        <path
          d="M14 10c1.2-1.8 3.4-3.4 5.6-3.8.4 1.8-.2 3.6-1.6 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M13.2 10.8 15.4 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    ),
  },
  {
    key: "beard-work",
    label: (
      <>
        Beard
        <br />
        work
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" aria-hidden>
        <path
          d="M7.5 9.5c0-2.4 2-4.3 4.5-4.3s4.5 1.9 4.5 4.3"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M5.8 11.2c.4 4.6 2.8 7.8 6.2 7.8s5.8-3.2 6.2-7.8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="miter"
        />
        <path d="M9.2 12.2h5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    key: "premium-experience",
    label: (
      <>
        Premium
        <br />
        experience
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" aria-hidden>
        <path
          d="M12 3.5 13.4 9h5.6l-4.5 3.4 1.7 5.6L12 14.8l-4.2 3.2 1.7-5.6L5 9h5.6L12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="miter"
        />
      </svg>
    ),
  },
];

/** Split hero on large screens: copy + features left, collage right. */
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
      className={cn(
        "relative overflow-x-clip bg-cream pt-8 pb-10 sm:pt-10 sm:pb-12",
        "lg:flex lg:h-[calc(100svh-7.25rem)] lg:flex-col lg:justify-center lg:overflow-hidden lg:py-5",
      )}
    >
      {/* Mobile / tablet wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-16 z-0 h-44 w-44 translate-x-[25px] translate-y-[15px] sm:right-auto sm:left-1/2 sm:top-[14%] sm:h-64 sm:w-64 sm:translate-x-[-8%] sm:translate-y-[-50%] lg:hidden"
      >
        <HeroWashMark />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 sm:px-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-14">
        <div className="flex flex-col text-center lg:text-left">
          <p className="inline-flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted sm:gap-4 sm:text-[12px] lg:justify-start">
            <span className="h-px w-6 shrink-0 bg-ink/10 sm:w-8" aria-hidden />
            Kenilworth · Since {business.established}
            <span className="h-px w-6 shrink-0 bg-ink/10 sm:w-8" aria-hidden />
          </p>

          <div className="relative mt-3 w-full self-center sm:mt-4 lg:mt-4 lg:w-fit lg:self-start">
            <h1 className="mx-auto w-full text-center text-[clamp(2.2rem,7vw,3.7rem)] uppercase text-ink lg:mx-0 lg:max-w-[16ch] lg:text-left lg:text-[clamp(2.4rem,3.8vw,3.5rem)]">
              Modern&nbsp;Turkish
              <br className="lg:hidden" />
              {" "}
              barbering
            </h1>
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-[calc(100%+140px)] z-0 hidden h-56 w-56 -translate-y-1/2 lg:block"
            >
              <HeroWashMark />
            </div>
          </div>

          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-muted sm:mt-4 sm:text-lg sm:leading-8 lg:mx-0 lg:mt-4 lg:max-w-md lg:text-base lg:leading-7">
            Experience the art of Turkish barbering. Precision haircuts, skin fades
            and traditional grooming in Kenilworth.
          </p>

          <ul className="mt-7 grid grid-cols-4 gap-0 divide-x divide-ink/10 border-t border-ink/10 pt-4 sm:mt-8 sm:pt-5 lg:mt-8 lg:pt-5">
            {features.map((feature) => (
              <li
                key={feature.key}
                className="flex flex-col items-center gap-1.5 px-1.5 text-center sm:gap-2.5 sm:px-3 lg:items-start lg:px-2 lg:text-left xl:px-3"
              >
                <span className="text-ink">{feature.icon}</span>
                <span className="text-[9px] font-medium uppercase leading-snug tracking-[0.1em] text-ink sm:text-[11px] sm:tracking-[0.12em] lg:text-[10px] xl:text-[11px]">
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 w-full sm:mt-7 lg:mt-0">
          <div className="grid grid-cols-12 items-end gap-3 sm:gap-4 lg:max-h-[min(58svh,30rem)]">
            <button
              type="button"
              aria-label={`View ${slides[index]?.alt ?? "cut"} larger`}
              onClick={() => openAt(index)}
              className="surface-fade relative col-span-8 aspect-square max-h-full cursor-zoom-in overflow-hidden rounded border border-ink/10 bg-ink/5 text-left lg:aspect-auto lg:h-[min(58svh,30rem)]"
            >
              {slides.map((image, i) => (
                <Image
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 70vw, 35vw"
                  className={cn(
                    "object-cover transition-opacity duration-500",
                    i === index ? "opacity-100" : "opacity-0",
                  )}
                />
              ))}
            </button>

            <div className="col-span-4 flex flex-col gap-3 sm:gap-4 lg:h-[min(58svh,30rem)]">
              <button
                type="button"
                aria-label={`View ${side.alt} larger`}
                onClick={() => openAt((index + 1) % slides.length)}
                className="surface-fade relative aspect-square cursor-zoom-in overflow-hidden rounded border border-ink/10 bg-ink/5 text-left lg:min-h-0 lg:flex-1 lg:aspect-auto"
              >
                <Image
                  src={side.src}
                  alt={side.alt}
                  fill
                  sizes="(max-width: 1024px) 25vw, 15vw"
                  className="object-cover"
                />
              </button>
              <div className="surface-fade relative flex aspect-square flex-col overflow-hidden rounded border border-ink/10 bg-ink text-surface lg:min-h-0 lg:flex-1 lg:aspect-auto">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full opacity-40"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in srgb, var(--red) 55%, transparent) 0%, transparent 70%)",
                  }}
                />
                <div className="relative flex flex-1 flex-col items-center justify-center px-3 pt-3 sm:px-4 sm:pt-4">
                  <p className="font-heading text-[clamp(2rem,6vw,2.75rem)] leading-none tracking-wide">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <span className="mt-2 h-px w-8 bg-barber" aria-hidden />
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-surface/45 sm:text-[11px]">
                    of {String(slides.length).padStart(2, "0")}
                  </p>
                </div>
                <div className="relative grid grid-cols-2 border-t border-surface/15">
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() => go(-1)}
                    className="inline-flex h-10 items-center justify-center bg-surface/10 text-surface transition-colors hover:bg-surface/20 sm:h-11"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="square"
                      aria-hidden
                    >
                      <path d="M10 3.5 5.5 8 10 12.5" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() => go(1)}
                    className="inline-flex h-10 items-center justify-center border-l border-surface/15 bg-surface/10 text-surface transition-colors hover:bg-surface/20 sm:h-11"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="square"
                      aria-hidden
                    >
                      <path d="M6 3.5 10.5 8 6 12.5" />
                    </svg>
                  </button>
                </div>
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

function HeroWashMark() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--red) 42%, transparent) 0%, color-mix(in srgb, var(--red) 16%, transparent) 46%, transparent 72%)",
        }}
      />
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 rotate-[28deg]"
        style={{
          backgroundColor: "var(--cream)",
          WebkitMaskImage: "url(/images/logo-oxblood.png)",
          maskImage: "url(/images/logo-oxblood.png)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </>
  );
}
