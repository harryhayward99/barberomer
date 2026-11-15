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
  return (
    <section
      id="about"
      className={cn(
        "mx-auto max-w-7xl px-5 sm:px-8",
        pageStart ? `${pageStartPad} ${sectionPadBottom}` : sectionPadY,
      )}
    >
      <div
        className={cn(
          "grid items-start gap-8 lg:grid-cols-12 lg:gap-10",
          pageStart && "lg:items-center",
        )}
      >
        <div className="lg:col-span-5">
          <div className="surface-fade relative aspect-square max-w-md overflow-hidden border border-ink/10 bg-ink/5">
            <Image
              src={aboutImage.src}
              alt={aboutImage.alt}
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
              style={{ objectPosition: "32% 42%" }}
              priority={pageStart}
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className={eyebrowClass}>About</p>
          <h2 className="section-title mt-4 max-w-lg">
            Your local barber since {business.established}.
          </h2>
          <div className="mt-6 max-w-lg space-y-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
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
      </div>
    </section>
  );
}
