import { pageMetadata } from "@/lib/config/seo";
import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import {
  eyebrowClass,
  pageStartPad,
  sectionPadBottom,
} from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  path: "/gallery",
  title: "Gallery",
  description:
    "Skin fades, textured crops and clean lineups from Barber Omer's chair in Kenilworth — real cuts, real clients.",
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

      <GalleryGrid />
    </section>
  );
}