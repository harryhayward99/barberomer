import { business } from "@/lib/config/business";
import { cn, sectionPad } from "@/lib/utils";

export function Location() {
  return (
    <section id="contact" className={cn("mx-auto max-w-7xl px-5 sm:px-8", sectionPad)}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-0 lg:overflow-hidden lg:rounded-[2rem] lg:border lg:border-line">
        <div className="flex flex-col justify-between gap-10 lg:px-10 lg:py-12 xl:px-14">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-barber">Find us</p>
            <a
              href={`tel:${business.phoneTel}`}
              className="mt-5 block font-heading text-4xl leading-none tracking-tight text-barber sm:text-5xl lg:text-[3.4rem]"
            >
              {business.phoneDisplay}
            </a>
            <p className="mt-6 max-w-sm text-lg leading-8 text-muted">
              Book online or give us a call — bookings accepted 24/7.
            </p>
            <p className="mt-8 text-lg leading-8 text-ink">
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
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-barber px-5 text-[15px] font-medium text-cream transition-transform duration-200 hover:-translate-y-0.5 hover:bg-barber-deep"
              >
                Book Online Now
              </a>
              <a
                href={business.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink px-6 text-[15px] font-medium"
              >
                Get Directions
              </a>
            </div>
            <p className="mt-6 text-sm leading-6 text-muted">
              {business.amenities.join(" · ")}
            </p>
          </div>
        </div>
        <div className="h-[320px] overflow-hidden rounded-[2rem] border border-line lg:h-auto lg:min-h-[520px] lg:rounded-none lg:border-0 lg:border-l lg:border-line">
          <iframe
            title="Map to Barber Omer, 40 Common Lane, Kenilworth"
            src={business.mapEmbedUrl}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
