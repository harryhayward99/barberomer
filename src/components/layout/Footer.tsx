import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/config/business";
import { displayHours } from "@/lib/config/hours";

const footerNav: { href: string; label: string; external?: boolean }[] = [
  { href: "/services", label: "Services" },
  { href: business.bookingUrl, label: "Book", external: true },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <Image
            src="/images/logo.png"
            alt="Barber Omer"
            width={64}
            height={64}
            className="h-14 w-14 object-cover"
          />
          <p className="mt-6 font-heading text-3xl tracking-tight">Barber Omer</p>
          <p className="mt-4 text-surface/70">
            {business.address.line1}
            <br />
            {business.address.city}
            <br />
            {business.address.postcode}
          </p>
          <a
            href={`tel:${business.phoneTel}`}
            className="mt-5 inline-block text-lg text-surface hover:text-white"
          >
            {business.phoneDisplay}
          </a>
          <a
            href={business.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex w-fit min-h-12 items-center justify-center rounded-full bg-barber px-5 text-[13px] font-medium uppercase tracking-[0.14em] text-surface transition-transform duration-200 hover:-translate-y-0.5 hover:bg-barber-deep"
          >
            Book Online Now
          </a>
        </div>

        <div className="lg:col-span-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-surface/45">
            Visit
          </p>
          <nav className="mt-5 flex flex-col gap-3 text-[13px] uppercase tracking-[0.14em] text-surface/80">
            {footerNav.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-surface"
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} className="hover:text-surface">
                  {item.label}
                </Link>
              ),
            )}
            <a
              href={business.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-surface"
            >
              Instagram
            </a>
          </nav>
        </div>

        <div className="lg:col-span-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-surface/45">
            Opening hours
          </p>
          <ul className="mt-5 space-y-2 text-sm text-surface/75">
            {displayHours.map((row) => (
              <li key={row.day} className="flex justify-between gap-6">
                <span>{row.day}</span>
                <span className="tabular-nums">{row.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-surface/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Barber Omer</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy" className="hover:text-surface">
              Privacy Policy
            </Link>
            <Link href="/booking-policy" className="hover:text-surface">
              Booking / Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
