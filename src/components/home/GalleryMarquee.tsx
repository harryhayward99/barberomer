import Image from "next/image";
import { galleryImages, galleryRowA } from "@/lib/config/images";
import { cn, pageStartPad, sectionPad, sectionPadBottom } from "@/lib/utils";

type GalleryImage = (typeof galleryImages)[number];

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
  const looped = [...images, ...images];

  return (
    <div className={cn("marquee overflow-hidden", fit && "h-full min-h-[100px] w-full")}>
      <div
        className={cn(
          "marquee-track flex gap-3 pr-3 sm:gap-4 sm:pr-4",
          fit && "h-full min-h-[100px]",
          reverse && "reverse",
        )}
      >
        {looped.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={cn(
              "relative shrink-0 overflow-hidden rounded-2xl bg-ink/5",
              fit
                ? "aspect-[4/5] h-full min-h-[100px] w-auto"
                : image.width === 4
                  ? "w-[280px] sm:w-[340px]"
                  : "w-[220px] sm:w-[260px]",
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={680}
              height={850}
              priority={priority && index < 2}
              className={cn(
                "object-cover",
                fit ? "absolute inset-0 h-full w-full" : "aspect-[4/5] h-full w-full",
              )}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
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
        <h2 className="section-title mt-3 max-w-xl">
          Fresh from the chair.
        </h2>
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
