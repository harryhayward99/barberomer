"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business, telHref } from "@/lib/config/business";
import { cn } from "@/lib/utils";

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
    <header className="sticky top-0 z-40 bg-ink text-surface">
      <div>
        <p className="mx-auto hidden max-w-7xl items-center justify-between gap-4 px-8 py-2 text-[11px] uppercase tracking-[0.14em] text-surface/70 sm:flex">
          <span>
            {business.address.line1}, {business.address.city}
          </span>
          <a href={telHref()} className="tabular-nums tracking-normal hover:text-surface">
            {business.phoneDisplay}
          </a>
        </p>
      </div>
      <div className="hidden h-px bg-surface/20 sm:block" aria-hidden />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:h-[4.75rem] sm:px-8 sm:py-0">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-surface/20 bg-surface/5">
            <Image
              src="/images/logo.png"
              alt="Barber Omer Kenilworth"
              width={40}
              height={40}
              className="h-full w-full object-contain"
              priority
            />
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="font-heading text-[16px] leading-none tracking-[0.01em] text-surface sm:text-[18px]">
              Barber Omer
            </span>
            <span className="text-[10px] font-medium uppercase leading-none tracking-[0.18em] text-surface/55 sm:text-[11px]">
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
                "text-[12px] font-medium uppercase tracking-[0.16em] text-surface/65 transition-colors hover:text-surface",
                pathname === item.href && "text-surface",
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
            className="hidden min-[370px]:inline-flex h-9 items-center justify-center rounded-sm bg-barber px-4 text-[11px] font-medium uppercase tracking-[0.14em] text-surface transition-transform duration-200 hover:-translate-y-0.5 hover:bg-barber-deep sm:h-10 sm:px-5 sm:text-[12px]"
          >
            Book
          </a>
          <button
            type="button"
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-sm bg-transparent text-surface shadow-[inset_0_0_0_1px_rgba(248,243,234,0.35)] transition-colors duration-300 sm:h-10 sm:w-10 xl:hidden",
              open && "bg-surface text-ink shadow-[inset_0_0_0_1px_rgba(248,243,234,0.55)]",
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
        <div className="mx-3 mb-3 border border-surface/15 bg-ink px-5 py-6 xl:hidden sm:mx-0 sm:mb-0 sm:border-x-0 sm:border-b-0">
          <nav className="flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-heading text-2xl uppercase tracking-[-0.03em]",
                  pathname === item.href ? "text-surface" : "text-surface/70",
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
            <p className="pt-2 text-sm text-surface/55">
              {business.address.line1}, {business.address.city}
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
