"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business, telHref } from "@/lib/config/business";
import { cn, liftShadow } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-transparent pt-3 sm:border-b sm:border-ink/10 sm:bg-surface sm:pt-0",
        "sm:shadow-[0_4px_10px_rgba(28,24,21,0.14),0_10px_22px_rgba(28,24,21,0.2)]",
      )}
    >
      <div className="relative hidden justify-center bg-cream px-4 text-surface sm:block sm:overflow-hidden sm:border-b sm:border-ink/10 sm:px-0">
        <p className="mx-auto flex min-h-8 w-max max-w-full items-center gap-2 whitespace-nowrap bg-barber py-1.5 pl-8 pr-8 text-[12px] uppercase tracking-[0.14em] text-surface sm:ml-auto sm:mr-0">
          <span>
            {business.address.line1}, {business.address.city}
          </span>
          <span className="hidden text-surface/55 sm:inline" aria-hidden>
            ·
          </span>
          <a
            href={telHref()}
            className="hidden tabular-nums tracking-normal hover:underline sm:inline"
          >
            {business.phoneDisplay}
          </a>
        </p>
      </div>

      <div
        className={cn(
          "mx-3 mb-0 flex items-center justify-between gap-3 border border-ink/10 bg-surface px-3 py-3",
          liftShadow,
          "sm:mx-auto sm:h-20 sm:max-w-7xl sm:border-0 sm:bg-surface sm:px-8 sm:py-0 sm:shadow-none",
        )}
      >
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border border-ink/10 bg-surface sm:h-11 sm:w-11">
            <Image
              src="/images/logo.png"
              alt="Barber Omer Kenilworth"
              width={44}
              height={44}
              className="h-10 w-10 object-contain sm:h-9 sm:w-9"
              priority
            />
          </span>
          <span className="flex flex-col gap-1">
            <span className="font-heading text-[17px] leading-none tracking-[-0.02em] sm:text-[18px]">
              Barber Omer
            </span>
            <span className="text-[11px] font-medium uppercase leading-none tracking-[0.2em] text-muted sm:text-[12px]">
              Kenilworth
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex xl:gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[12px] font-medium uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink",
                pathname === item.href && "text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={business.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden min-[370px]:inline-flex h-11 items-center justify-center bg-barber px-5 text-[12px] font-medium uppercase tracking-[0.14em] text-surface transition-transform duration-200 hover:-translate-y-0.5 hover:bg-barber-deep sm:h-11"
          >
            Book
          </a>
          <button
            type="button"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center border border-ink/15 bg-surface text-ink transition-colors duration-300 xl:hidden",
              open && "border-ink bg-ink text-surface",
            )}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 overflow-visible"
              fill="none"
              aria-hidden
            >
              <g
                className={cn(
                  "origin-center transition-all duration-300 ease-out motion-reduce:transition-none",
                  open ? "scale-75 opacity-0" : "opacity-100",
                )}
              >
                <path
                  d="M4 7.5h16"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="square"
                />
                <path
                  d="M4 12h11"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="square"
                />
                <path
                  d="M4 16.5h16"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="square"
                />
              </g>
              <g
                className={cn(
                  "origin-center transition-all duration-300 ease-out motion-reduce:transition-none",
                  open ? "opacity-100" : "scale-75 opacity-0",
                )}
              >
                <path
                  d="M6.5 6.5l11 11M17.5 6.5l-11 11"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="square"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          className={cn(
            "mx-3 mb-3 border border-ink/10 bg-surface px-5 py-6 xl:hidden sm:mx-0 sm:mb-0 sm:border-x-0 sm:border-b-0 sm:shadow-none",
            liftShadow,
          )}
        >
          <nav className="flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-heading text-2xl uppercase tracking-[-0.03em]",
                  pathname === item.href ? "text-ink" : "text-ink/70",
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={business.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex min-h-12 w-fit items-center justify-center bg-barber px-5 text-[13px] font-medium uppercase tracking-[0.14em] text-surface"
            >
              Book
            </a>
            <p className="pt-2 text-sm text-muted">
              {business.address.line1}, {business.address.city}
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
