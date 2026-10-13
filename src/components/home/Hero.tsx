import Link from "next/link";
import { MarqueeRow } from "@/components/home/GalleryMarquee";
import { CallButton } from "@/components/ui/CallButton";
import { business } from "@/lib/config/business";
import { galleryRowA } from "@/lib/config/images";

export function Hero() {
  return (
    <section className="flex h-[calc(100dvh-5.75rem)] min-h-min flex-col pt-8 sm:h-[calc(100dvh-7rem)] sm:pt-10 lg:pt-14">
      <div className="mx-auto grid w-full max-w-7xl items-end gap-6 px-5 sm:gap-8 sm:px-8 lg:grid-cols-2 lg:gap-16">
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
            <CallButton
              numberOnly
              className="min-h-11 shrink-0 px-3.5 text-[13px] sm:min-h-12 sm:px-5 sm:text-[15px]"
            />
            <Link
              href="/contact"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-ink px-4 text-[13px] font-medium transition-transform duration-200 hover:-translate-y-0.5 sm:min-h-12 sm:px-6 sm:text-[15px]"
            >
              CONTACT
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 flex min-h-[100px] flex-1 px-5 pb-5 pt-2 sm:mt-8 sm:px-8 sm:pb-6">
        <MarqueeRow images={galleryRowA} priority fit />
      </div>
    </section>
  );
}
