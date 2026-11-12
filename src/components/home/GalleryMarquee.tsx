"use client";

import Image from "next/image";
import { useState } from "react";
import {
  InteractiveMarquee,
  useMarqueeGuard,
} from "@/components/ui/InteractiveMarquee";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { galleryImages, galleryRowA } from "@/lib/config/images";
import { cn, pageStartPad, sectionPad, sectionPadBottom } from "@/lib/utils";

type GalleryImage = (typeof galleryImages)[number];

function GalleryTile({
  image,
  index,
  priority = false,
  fit = false,
  onOpen,
}: {
  image: GalleryImage;
  index: number;
  priority?: boolean;
  fit?: boolean;
  onOpen: (index: number) => void;
}) {
  const { wasDrag } = useMarqueeGuard();

  return (
    <button
      type="button"
      aria-label={`Inspect ${image.alt}`}
      onClick={() => {
        if (wasDrag()) return;
        onOpen(index);
      }}
      className={cn(
        "relative shrink-0 overflow-hidden rounded-2xl bg-ink/5 text-left [box-shadow:none] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barber",
        fit
          ? "aspect-[4/5] h-full w-auto"
          : image.width === 4
            ? "aspect-[4/5] w-[280px] sm:w-[340px]"
            : "aspect-[4/5] w-[220px] sm:w-[260px]",
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={680}
        height={850}
        priority={priority && index < 2}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
    </button>
  );
}

export function MarqueeRow({
  images,
  reverse = false,
  priority = false,
  fit = false,
}: {
  images: readonly GalleryImage[];
  reverse?: boolean;
  priority?: boolean;
  fit?: boolean;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <InteractiveMarquee
        speed={reverse ? -38 : 42}
        className={cn(fit && "h-full w-full")}
        trackClassName={cn("gap-3 pr-3 sm:gap-4 sm:pr-4", fit && "h-full")}
      >
        {images.map((image, index) => (
          <GalleryTile
            key={image.src}
            image={image}
            index={index}
            priority={priority}
            fit={fit}
            onOpen={setLightboxIndex}
          />
        ))}
      </InteractiveMarquee>

      {lightboxIndex != null ? (
        <ImageLightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      ) : null}
    </>
  );
}

export function GalleryMarquee({ pageStart = false }: { pageStart?: boolean }) {
  return (
    <section
      id="gallery"
      className={cn(
        "overflow-hidden",
        pageStart ? `${pageStartPad} ${sectionPadBottom}` : sectionPad,
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-xs uppercase tracking-[0.22em] text-barber">Gallery</p>
        <h2 className="section-title mt-3 max-w-xl">Fresh from the chair.</h2>
        <p className="mt-5 text-lg text-muted">
          Real cuts. Real clients. Barber Omer.
        </p>
      </div>

      <div className="mt-12">
        <MarqueeRow images={galleryRowA} />
      </div>
    </section>
  );
}
