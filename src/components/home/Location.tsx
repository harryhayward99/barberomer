import { CallButton } from "@/components/ui/CallButton";
import { business } from "@/lib/config/business";

export function Location() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.22em] text-barber">Find us</p>
          <h2 className="section-title mt-3">
            {business.name}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            {business.address.line1}
            <br />
            {business.address.city}
            <br />
            {business.address.postcode}
          </p>
          <a
            href={`tel:${business.phoneTel}`}
            className="mt-5 inline-block text-2xl text-barber"
          >
            {business.phoneDisplay}
          </a>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CallButton />
            <a
              href={business.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink px-6 text-[15px] font-medium"
            >
              Get Directions
            </a>
          </div>
          <p className="mt-8 max-w-sm text-sm leading-6 text-muted">
            {business.amenities.join(" · ")}
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-line lg:col-span-7">
          <iframe
            title="Map to Barber Omer, 40 Common Lane, Kenilworth"
            src={business.mapEmbedUrl}
            className="h-[360px] w-full border-0 lg:h-[460px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
