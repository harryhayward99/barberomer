import { business } from "@/lib/config/business";
import {
  btnPrimaryClass,
  btnSecondaryClass,
  cn,
  eyebrowClass,
  sectionPadY,
} from "@/lib/utils";

export function Location() {
  return (
    <section id="contact" className={cn("mx-auto max-w-7xl px-5 sm:px-8", sectionPadY)}>
      <div className="surface-fade relative z-10 grid gap-8 border border-ink/10 bg-surface lg:grid-cols-2 lg:gap-0">
        <div className="flex flex-col justify-between gap-10 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-12">
          <div>
            <p className={eyebrowClass}>Find us</p>
            <a
              href={`tel:${business.phoneTel}`}
              className="mt-5 block font-heading text-4xl leading-none tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]"
            >
              {business.phoneDisplay}
            </a>
            <p className="mt-6 max-w-sm text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Book online or give us a call — bookings accepted 24/7.
            </p>
            <p className="mt-8 text-base leading-8 text-ink sm:text-lg">
              {business.address.line1}
              <br />
              {business.address.city} {business.address.postcode}
            </p>
          </div>
          <div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={business.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className={btnPrimaryClass}
              >
                Book online
              </a>
              <a
                href={business.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(btnSecondaryClass, "shadow-none")}
              >
                Get directions
              </a>
            </div>
            <p className="mt-6 text-sm leading-6 text-muted">
              {business.amenities.join(" · ")}
            </p>
          </div>
        </div>
        <div className="h-[320px] overflow-hidden border-t border-ink/10 lg:h-auto lg:min-h-[520px] lg:border-l lg:border-t-0">
          <iframe
            title="Map to Barber Omer, 40 Common Lane, Kenilworth"
            src={business.mapEmbedUrl}
            className="h-full w-full border-0 grayscale-[20%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
