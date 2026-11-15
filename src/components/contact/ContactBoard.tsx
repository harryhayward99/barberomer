import { business } from "@/lib/config/business";
import {
  btnPrimaryClass,
  btnSecondaryClass,
  cn,
  eyebrowClass,
  pageStartPad,
  sectionPadBottom,
} from "@/lib/utils";

export function ContactBoard() {
  return (
    <section
      id="contact"
      className={cn("mx-auto max-w-7xl px-5 sm:px-8", pageStartPad, sectionPadBottom)}
    >
      <p className={eyebrowClass}>Find us</p>

      <div className="mt-6 grid items-end gap-8 border-y border-ink/15 py-10 lg:grid-cols-12 lg:gap-6 lg:py-12">
        <div className="lg:col-span-5">
          <h2 className="section-title">{business.name}</h2>
          <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
            {business.address.line1}
            <br />
            {business.address.city}
            <br />
            {business.address.postcode}
          </p>
        </div>
        <div className="lg:col-span-7 lg:text-right">
          <a
            href={`tel:${business.phoneTel}`}
            className="block font-heading text-4xl leading-none tracking-tight text-ink sm:text-5xl"
          >
            {business.phoneDisplay}
          </a>
          <p className="mt-4 text-base leading-7 text-muted lg:ml-auto lg:max-w-md">
            Bookings accepted 24 hours a day, 7 days a week.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:justify-end">
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
              className={btnSecondaryClass}
            >
              Get directions
            </a>
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-muted">
        {business.amenities.join(" · ")}
      </p>

      <div className="mt-8 h-[280px] overflow-hidden border border-ink/10 lg:h-[340px]">
        <iframe
          title="Map to Barber Omer, 40 Common Lane, Kenilworth"
          src={business.mapEmbedUrl}
          className="h-full w-full border-0 grayscale-[20%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
