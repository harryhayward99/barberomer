import Image from "next/image";
import { galleryRowA, galleryRowB } from "@/lib/config/images";
import { cn } from "@/lib/utils";

type GalleryImage = (typeof galleryRowA)[number];

export function MarqueeRow({
  images,
  reverse = false,
  priority = false,
}: {
  images: readonly GalleryImage[];
  reverse?: boolean;
  priority?: boolean;
}) {
  const looped = [...images, ...images];

  return (
    <div className="marquee overflow-hidden">
      <div className={cn("marquee-track flex gap-4 pr-4", reverse && "reverse")}>
        {looped.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={cn(
              "relative shrink-0 overflow-hidden rounded-2xl bg-ink/5",
              image.width === 4
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
        <MarqueeRow images={galleryRowB} />
        <MarqueeRow images={galleryRowA} reverse />
      </div>
    </section>
  );
}
