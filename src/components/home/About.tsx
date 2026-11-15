import Image from "next/image";
import { business } from "@/lib/config/business";
import { aboutImage } from "@/lib/config/images";
import {
  btnPrimaryClass,
  cn,
  eyebrowClass,
  liftShadow,
  pageStartPad,
  sectionPadBottom,
  sectionPadY,
} from "@/lib/utils";

export function About({ pageStart = false }: { pageStart?: boolean }) {
  const TitleTag = pageStart ? "h1" : "h2";

  return (
    <section
      id="about"
      className={cn(
        "mx-auto max-w-7xl px-5 sm:px-8",
        pageStart ? `${pageStartPad} ${sectionPadBottom}` : sectionPadY,
      )}
    >
      <div className={cn(pageStart && "mx-auto max-w-xl md:text-center")}>
        <p className={eyebrowClass}>About</p>
        <div
          className={cn(
            "mt-4 flex items-center gap-4 sm:gap-5",
            pageStart && "md:justify-center",
          )}
        >
          <div className="surface-fade relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden border border-ink/10 bg-ink/5 sm:h-24 sm:w-24">
            <Image
              src={aboutImage.src}
              alt={aboutImage.alt}
              fill
              sizes="96px"
              className="object-cover"
              style={{ objectPosition: "32% 42%" }}
              priority={pageStart}
            />
          </div>
          <TitleTag className="section-title max-w-lg text-left">
            Your local barber since {business.established}.
          </TitleTag>
        </div>
        <div
          className={cn(
            "mt-8 max-w-lg space-y-5 text-base leading-7 text-muted sm:text-lg sm:leading-8",
            pageStart && "mx-auto",
          )}
        >
          <p>
            Barber Omer is built around straightforward good service: taking
            the time to understand how you want your hair, giving you a precise
            cut and creating a place where people actually enjoy coming back.
          </p>
          <p>
            No rush, no upselling, no luxury mark-up. Just reliable modern
            grooming in Kenilworth — friendly, personal and done properly.
            Drinks are available while you wait.
          </p>
        </div>
        {pageStart ? (
          <a
            href={business.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(btnPrimaryClass, liftShadow, "mt-8")}
          >
            Book now
          </a>
        ) : null}
      </div>
    </section>
  );
}
