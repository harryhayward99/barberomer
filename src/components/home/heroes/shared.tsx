import Link from "next/link";
import { business } from "@/lib/config/business";
import { galleryImages } from "@/lib/config/images";

const heroSlideSrcs = [
  "/images/cuts/cut-textured-fade.png",
  "/images/cuts/cut-lineup-profile.png",
  "/images/cuts/cut-black-mask-fade.png",
  "/images/cuts/cut-beard-shape-fade.jpg",
  "/images/cuts/cut-textured-crop.png",
] as const;

/** Curated hero carousel — the cuts selected for the Plaza homepage. */
export const heroSlides = heroSlideSrcs.map((src) => {
  const image = galleryImages.find((item) => item.src === src);
  if (!image) throw new Error(`Missing hero slide: ${src}`);
  return image;
});

export function HeroBookButton({
  className = "",
  label = "Book your seat",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={business.bookingUrl}
      target="_blank"
      rel="noreferrer"
      className={
        className ||
        "inline-flex min-h-12 items-center justify-center bg-barber px-5 text-[13px] font-medium uppercase tracking-[0.14em] text-surface transition-transform duration-200 hover:-translate-y-0.5 hover:bg-barber-deep"
      }
    >
      {label}
    </a>
  );
}

export function HeroContactLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/contact"
      className={
        className ||
        "inline-flex min-h-12 items-center justify-center border border-ink bg-surface px-5 text-[13px] font-medium uppercase tracking-[0.14em] text-ink transition-transform duration-200 hover:-translate-y-0.5"
      }
    >
      Contact
    </Link>
  );
}

export function StampBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute bottom-4 right-4 flex h-20 w-20 items-center justify-center rounded-none border border-cream/40 bg-ink/70 text-center text-[9px] uppercase leading-tight tracking-[0.16em] text-surface backdrop-blur-sm sm:h-24 sm:w-24 sm:text-[10px] ${className}`}
      aria-hidden
    >
      <span>
        Barber
        <br />
        Omer
        <br />
        Since {business.established}
      </span>
    </div>
  );
}
