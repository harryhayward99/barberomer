import { business } from "@/lib/config/business";
import {
  formatDuration,
  formatPrice,
  serviceGroups,
  services,
} from "@/lib/config/services";

export function ServicesList({
  heading = "Cuts that earn their keep.",
  intro = "Quality work at sensible prices. Book a time, or just call Omer.",
}: {
  heading?: string;
  intro?: string;
}) {
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.22em] text-barber">Services</p>
        <h2 className="section-title mt-3">{heading}</h2>
        <p className="mt-5 text-lg leading-8 text-muted">{intro}</p>
      </div>

      <div className="mt-16 grid items-start gap-5 lg:grid-cols-3">
        {serviceGroups.map((group) => {
          const items = services.filter((service) => service.group === group.id);
          const featured = items.filter((service) => service.featured);
          const rest = items.filter((service) => !service.featured);

          return (
            <div
              key={group.id}
              className="overflow-hidden bg-cream"
              style={{ border: "1px solid #c4c4c4" }}
            >
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid #c4c4c4" }}
              >
                <h3 className="text-xs uppercase tracking-[0.22em] text-muted">
                  {group.label}
                </h3>
                <span className="h-2 w-2 bg-barber" aria-hidden />
              </div>

              {featured.map((service) => (
                <article key={service.id} className="relative bg-ink px-5 py-6 text-cream">
                  <span
                    className="absolute right-0 top-0 h-12 w-12 bg-barber"
                    style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                    aria-hidden
                  />
                  <p className="text-[10px] uppercase tracking-[0.22em] text-cream/55">
                    Featured
                  </p>
                  <div className="mt-3 flex items-start justify-between gap-4 pr-6">
                    <p className="font-heading text-2xl leading-none">{service.name}</p>
                    <p className="shrink-0 text-lg tabular-nums">
                      {formatPrice(service.pricePence)}
                    </p>
                  </div>
                  {service.description && (
                    <p className="mt-3 max-w-[16rem] text-sm leading-6 text-cream/70">
                      {service.description}
                    </p>
                  )}
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <p className="text-sm text-cream/70">
                      {formatDuration(service.durationMinutes)}
                    </p>
                    <a
                      href={business.bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-full bg-cream px-3.5 text-sm font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      BOOK
                    </a>
                  </div>
                </article>
              ))}

              <ul>
                {rest.map((service, index) => (
                  <li
                    key={service.id}
                    className="flex flex-col gap-2 px-5 py-5"
                    style={
                      index > 0 ? { borderTop: "1px solid rgba(17, 17, 17, 0.1)" } : undefined
                    }
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-lg">{service.name}</p>
                      <p className="shrink-0 text-lg tabular-nums text-barber">
                        {formatPrice(service.pricePence)}
                      </p>
                    </div>
                    {service.description && (
                      <p className="text-sm text-muted">{service.description}</p>
                    )}
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-muted">
                        {formatDuration(service.durationMinutes)}
                      </p>
                      <a
                        href={business.bookingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-full bg-barber px-3.5 text-sm font-medium text-cream transition-transform duration-200 hover:-translate-y-0.5 hover:bg-barber-deep"
                      >
                        BOOK
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
