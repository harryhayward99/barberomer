import Link from "next/link";
import { MarqueeRow } from "@/components/home/GalleryMarquee";
import { business } from "@/lib/config/business";
import { galleryRowA } from "@/lib/config/images";

export function Hero() {
  return (
    <section className="relative flex flex-col pt-8 sm:pt-10 lg:pt-14">
      <img
        src="/images/hero-corner.png"
        alt=""
        width={1024}
        height={938}
        aria-hidden
        decoding="async"
        className="pointer-events-none absolute right-0 -top-4 z-0 w-[min(55vw,19rem)] select-none object-contain object-right-top sm:-right-7 sm:-top-5 sm:w-[min(44vw,23rem)] lg:-right-8 lg:-top-6 lg:w-[min(36vw,26rem)]"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, transparent 34%, #000 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, transparent 34%, #000 100%)",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-6 px-5 sm:gap-8 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-y-10 -left-5 -right-5 -z-10 sm:-inset-y-12 sm:-left-8 sm:-right-8"
          style={{
            background:
              "linear-gradient(90deg, #f7f3ec 0%, #f7f3ec 46%, rgba(247,243,236,0) 100%)",
            maskImage: "linear-gradient(#000 0%, #000 78%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(#000 0%, #000 78%, transparent 100%)",
          }}
        />
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.22em] text-muted">
            Kenilworth · Since {business.established}
          </p>
          <h1 className="max-w-xl text-[clamp(2.75rem,10vw,5.6rem)] leading-[0.92]">
            Sharp cuts.
            <br />
            No fuss.
          </h1>
        </div>

        <div>
          <p className="max-w-md text-lg leading-8 text-muted">
            Pop in and see Omer. A sharp cut, a fair price, and someone who
            remembers how you like it.
          </p>
          <div className="mt-6 flex flex-row items-center gap-2 sm:mt-8 sm:gap-3">
            <a
              href={business.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-barber px-3.5 text-[13px] font-medium text-cream transition-transform duration-200 hover:-translate-y-0.5 hover:bg-barber-deep sm:min-h-12 sm:px-5 sm:text-[15px]"
            >
              BOOK
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-ink px-4 text-[13px] font-medium transition-transform duration-200 hover:-translate-y-0.5 sm:min-h-12 sm:px-6 sm:text-[15px]"
            >
              CONTACT
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-6 h-[240px] px-5 pb-5 pt-2 sm:mt-8 sm:h-[300px] sm:px-8 sm:pb-6 lg:h-[340px]">
        <MarqueeRow images={galleryRowA} priority fit />
      </div>
    </section>
  );
}
