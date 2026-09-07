import type { Metadata } from "next";
import Image from "next/image";
import { GalleryMarquee } from "@/components/home/GalleryMarquee";
import { galleryImages } from "@/lib/config/images";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Recent cuts from the chair at Barber Omer, Kenilworth.",
};

export default function GalleryPage() {
  return (
    <>
      <GalleryMarquee />
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 pb-20 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {galleryImages.map((image) => (
          <div key={image.src} className="overflow-hidden rounded-[1.6rem]">
            <Image
              src={image.src}
              alt={image.alt}
              width={800}
              height={1000}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        ))}
      </section>
    </>
  );
}
