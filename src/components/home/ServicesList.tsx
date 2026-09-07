import Link from "next/link";
import {
  formatDuration,
  formatPrice,
  serviceGroups,
  services,
} from "@/lib/config/services";
import { cn } from "@/lib/utils";

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

      <div className="mt-16 grid gap-16 lg:grid-cols-3">
        {serviceGroups.map((group) => (
          <div key={group.id}>
            <h3 className="text-sm uppercase tracking-[0.18em] text-muted">
              {group.label}
            </h3>
            <ul className="mt-6 divide-y divide-line">
              {services
                .filter((service) => service.group === group.id)
                .map((service) => (
                  <li
                    key={service.id}
                    className={cn(
                      "group flex items-start justify-between gap-4 py-5 transition-colors",
                      service.featured && "rounded-2xl bg-ink px-4 py-5 text-cream",
                    )}
                  >
                    <div>
                      <p className="text-lg">{service.name}</p>
                      {service.description && (
                        <p
                          className={cn(
                            "mt-1 text-sm",
                            service.featured ? "text-cream/65" : "text-muted",
                          )}
                        >
                          {service.description}
                        </p>
                      )}
                      <p
                        className={cn(
                          "mt-2 text-sm",
                          service.featured ? "text-cream/65" : "text-muted",
                        )}
                      >
                        {formatDuration(service.durationMinutes)}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <p
                        className={cn(
                          "text-lg tabular-nums",
                          service.featured ? "text-cream" : "text-barber",
                        )}
                      >
                        {formatPrice(service.pricePence)}
                      </p>
                      <Link
                        href={`/book?service=${service.id}`}
                        className={cn(
                          "text-sm underline-offset-4 hover:underline",
                          service.featured ? "text-cream" : "text-ink",
                        )}
                      >
                        Book
                      </Link>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
