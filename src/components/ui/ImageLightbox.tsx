"use client";

import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { business } from "@/lib/config/business";
import { btnPrimaryClass, cn, liftShadow } from "@/lib/utils";

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

  useEffect(() => {
    const scrollY = window.scrollY;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
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

  if (!image || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-[100] flex flex-col bg-ink"
      onClick={onClose}
    >
      <div
        className="relative z-10 flex items-center justify-between gap-4 px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:pt-5"
        onClick={(event) => event.stopPropagation()}
      >
        <a
          href={business.bookingUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(btnPrimaryClass, liftShadow, "min-h-11 px-6")}
        >
          Book
        </a>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center border border-surface/20 bg-surface/10 text-surface transition hover:bg-surface hover:text-ink"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>

      <figure
        className="relative mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-6 sm:px-10 sm:py-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-full w-full max-h-[calc(100dvh-11.5rem)] min-h-[50vh]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </figure>

      {images.length > 1 ? (
        <div
          className="relative z-10 flex items-center justify-center gap-4 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:gap-5 sm:px-6 sm:pb-6"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            aria-label="Previous image"
            onClick={() =>
              onChange((index - 1 + images.length) % images.length)
            }
            className="inline-flex h-12 w-12 items-center justify-center border border-surface/20 bg-surface/10 text-surface transition hover:bg-surface hover:text-ink"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <p className="min-w-[4.5rem] text-center text-[12px] uppercase tracking-[0.2em] text-surface/70 tabular-nums">
            {String(index + 1).padStart(2, "0")}
            <span className="text-surface/35">
              /{String(images.length).padStart(2, "0")}
            </span>
          </p>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => onChange((index + 1) % images.length)}
            className="inline-flex h-12 w-12 items-center justify-center border border-surface/20 bg-surface/10 text-surface transition hover:bg-surface hover:text-ink"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      ) : null}
    </div>,
    document.body,
  );
}