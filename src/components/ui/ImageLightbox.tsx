"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type LightboxImage = {
  src: string;
  alt: string;
};

type ImageLightboxProps = {
  images: readonly LightboxImage[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function ImageLightbox({
  images,
  index,
  onClose,
  onChange,
}: ImageLightboxProps) {
  const image = images[index] ?? images[0];
  const [top, setTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector("header");
    const scrollY = window.scrollY;

    const measure = () => {
      if (!header) {
        setTop(0);
        return;
      }
      // Use layout height so sticky scroll position cannot push the overlay
      // up over the header.
      setTop(Math.round(header.getBoundingClientRect().height || header.offsetHeight));
    };

    // Bring the sticky header back to the top of the viewport, then lock scroll.
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    measure();

    window.addEventListener("resize", measure);
    const observer = header ? new ResizeObserver(measure) : null;
    if (header && observer) observer.observe(header);

    return () => {
      window.removeEventListener("resize", measure);
      observer?.disconnect();
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    if (!image) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        onChange((index - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        onChange((index + 1) % images.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [image, images.length, index, onChange, onClose]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-x-0 bottom-0 z-[35] flex flex-col bg-ink/90 p-4 sm:p-6"
      style={{ top }}
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink transition hover:bg-white sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" strokeWidth={2} />
      </button>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              onChange((index - 1 + images.length) % images.length);
            }}
            className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/95 text-ink transition hover:bg-white sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              onChange((index + 1) % images.length);
            }}
            className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/95 text-ink transition hover:bg-white sm:right-6"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </>
      ) : null}

      <figure
        className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-10 sm:px-16"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative min-h-0 w-full flex-1 overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>
        <figcaption className="mt-3 max-w-2xl shrink-0 text-center text-sm leading-6 text-cream/85 sm:mt-4">
          {image.alt}
        </figcaption>
      </figure>
    </div>
  );
}
