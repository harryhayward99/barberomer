import { business } from "@/lib/config/business";
import {
  formatDuration,
  formatPrice,
  serviceGroups,
  services,
} from "@/lib/config/services";
import {
  cn,
  eyebrowClass,
  pageStartPad,
  sectionPadBottom,
  sectionPadY,
} from "@/lib/utils";

export function ServicesList({
  heading = "Cuts that earn their keep.",
  intro = "Quality work at sensible prices. Book a time, or just call Omer.",
  pageStart = false,
}: {
  heading?: string;
  intro?: string;
  pageStart?: boolean;
}) {
  return (
    <section
      id="services"
      className={cn(
        "mx-auto max-w-7xl px-5 sm:px-8",
        pageStart ? `${pageStartPad} ${sectionPadBottom}` : sectionPadY,
      )}
    >
      <div className="max-w-2xl">
        <p className={eyebrowClass}>Services</p>
        <h2 className="section-title mt-4">{heading}</h2>
        <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {intro}
        </p>
      </div>

      <div className="mt-12 grid items-start gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-5">
        {serviceGroups.map((group) => {
          const items = services.filter((service) => service.group === group.id);
          const featured = items.filter((service) => service.featured);
          const rest = items.filter((service) => !service.featured);

          return (
            <div
              key={group.id}
              className="border border-ink/10 bg-surface"
            >
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
                <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                  {group.label}
                </h3>
                <span className="h-1.5 w-1.5 bg-barber" aria-hidden />
              </div>

              {featured.map((service) => (
                <article
                  key={service.id}
                  className="relative border-b border-ink/10 bg-ink px-5 py-6 text-surface"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-surface/50">
                    Featured
                  </p>
                  <div className="mt-3 flex items-start justify-between gap-4">
                    <p className="font-heading text-2xl leading-none tracking-[-0.03em]">
                      {service.name}
                    </p>
                    <p className="shrink-0 text-lg tabular-nums">
                      {formatPrice(service.pricePence)}
                    </p>
                  </div>
                  {service.description ? (
                    <p className="mt-3 max-w-[16rem] text-sm leading-6 text-surface/65">
                      {service.description}
                    </p>
                  ) : null}
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <p className="text-sm text-surface/65">
                      {formatDuration(service.durationMinutes)}
                    </p>
                    <a
                      href={business.bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-9 shrink-0 items-center justify-center bg-surface px-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ink transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      Book
                    </a>
                  </div>
                </article>
              ))}

              <ul>
                {rest.map((service, index) => (
                  <li
                    key={service.id}
                    className={cn(
                      "flex flex-col gap-2 px-5 py-5",
                      index > 0 && "border-t border-ink/10",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-lg leading-snug">{service.name}</p>
                      <p className="shrink-0 text-lg tabular-nums text-barber">
                        {formatPrice(service.pricePence)}
                      </p>
                    </div>
                    {service.description ? (
                      <p className="text-sm text-muted">{service.description}</p>
                    ) : null}
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-muted">
                        {formatDuration(service.durationMinutes)}
                      </p>
                      <a
                        href={business.bookingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-9 shrink-0 items-center justify-center bg-barber px-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-surface transition-transform duration-200 hover:-translate-y-0.5 hover:bg-barber-deep"
                      >
                        Book
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
