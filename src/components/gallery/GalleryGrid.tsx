"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { galleryImages } from "@/lib/config/images";

export function GalleryGrid() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-3">
        {galleryImages.map((image, i) => (
          <button
            key={image.src}
            type="button"
            aria-label={`View ${image.alt} larger`}
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className="surface-fade relative aspect-square cursor-zoom-in overflow-hidden border border-ink/10 bg-ink/5 text-left"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {open ? (
        <ImageLightbox
          images={galleryImages}
          index={index}
          onClose={() => setOpen(false)}
          onChange={setIndex}
        />
      ) : null}
    </>
  );
}