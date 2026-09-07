"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { galleryRowA, galleryRowB } from "@/lib/config/images";
import { cn } from "@/lib/utils";

function Row({
  images,
  reverse = false,
}: {
  images: readonly { src: string; alt: string; width: number }[];
  reverse?: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const drag = useRef({
    active: false,
    startX: 0,
    startScroll: 0,
  });

  const looped = [...images, ...images];

  return (
    <div
      ref={rowRef}
      className="marquee overflow-hidden"
      onPointerDown={(event) => {
        drag.current = {
          active: true,
          startX: event.clientX,
          startScroll: rowRef.current?.scrollLeft ?? 0,
        };
        setPaused(true);
        rowRef.current?.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!drag.current.active || !rowRef.current) return;
        rowRef.current.scrollLeft =
          drag.current.startScroll - (event.clientX - drag.current.startX);
      }}
      onPointerUp={() => {
        drag.current.active = false;
        setPaused(false);
      }}
    >
      <div
        className={cn(
          "marquee-track flex gap-4 pr-4",
          reverse && "reverse",
          paused && "paused",
        )}
      >
        {looped.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={cn(
              "relative shrink-0 overflow-hidden rounded-2xl bg-ink/5",
              image.width === 4 ? "w-[280px] sm:w-[340px]" : "w-[220px] sm:w-[260px]",
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={680}
              height={850}
              className="aspect-[4/5] h-full w-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function GalleryMarquee() {
  return (
    <section id="gallery" className="overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-xs uppercase tracking-[0.22em] text-barber">Gallery</p>
        <h2 className="section-title mt-3 max-w-xl">
          Fresh from the chair.
        </h2>
        <p className="mt-5 text-lg text-muted">
          Real cuts. Real clients. Barber Omer.
        </p>
      </div>

      <div className="mt-12 space-y-4">
        <Row images={galleryRowA} />
        <Row images={galleryRowB} reverse />
      </div>
    </section>
  );
}
