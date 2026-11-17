import { buildBreadcrumbJsonLd, pageMetadata } from "@/lib/config/seo";
import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import {
  eyebrowClass,
  pageStartPad,
  sectionPadBottom,
} from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  path: "/gallery",
  title: "Haircut gallery — fades & crops",
  description:
    "Skin fades, textured crops and clean lineups from Barber Omer's chair in Kenilworth — real men's haircuts from Common Lane.",
  image: "/images/cuts/cut-textured-fade.png",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Gallery", path: "/gallery" },
]);

export default function GalleryPage() {
  return (
    <section
      className={`mx-auto max-w-7xl px-5 sm:px-8 ${pageStartPad} ${sectionPadBottom}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <p className={eyebrowClass}>Gallery</p>
      <h1 className="section-title mt-4 max-w-xl">Fresh from the chair.</h1>
      <p className="mt-5 max-w-md text-base leading-7 text-muted sm:text-lg sm:leading-8">
        Real cuts. Real clients. Barber Omer.
      </p>

      <GalleryGrid />
    </section>
  );
}