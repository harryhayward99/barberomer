import { pageMetadata } from "@/lib/config/seo";
import type { Metadata } from "next";
import Image from "next/image";
import { galleryImages } from "@/lib/config/images";
import {
  eyebrowClass,
  pageStartPad,
  sectionPadBottom,
} from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  path: "/gallery",
  title: "Gallery",
  description:
    "Skin fades, textured crops and clean lineups from Barber Omer’s chair in Kenilworth — real cuts, real clients.",
  image: "/images/cuts/cut-textured-fade.png",
});

export default function GalleryPage() {
  return (
    <section
      className={`mx-auto max-w-7xl px-5 sm:px-8 ${pageStartPad} ${sectionPadBottom}`}
    >
      <p className={eyebrowClass}>Gallery</p>
      <h1 className="section-title mt-4 max-w-xl">Fresh from the chair.</h1>
      <p className="mt-5 max-w-md text-base leading-7 text-muted sm:text-lg sm:leading-8">
        Real cuts. Real clients. Barber Omer.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-3">
        {galleryImages.map((image) => (
          <div
            key={image.src}
            className="surface-fade relative aspect-square overflow-hidden border border-ink/10 bg-ink/5"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
