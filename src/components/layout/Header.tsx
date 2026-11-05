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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-transparent pt-3 transition-[colors,box-shadow] duration-300 sm:border-b sm:pt-0 sm:shadow-[0_0_0_1px_rgba(17,17,17,0.05),0_4px_14px_rgba(17,17,17,0.08),0_18px_40px_rgba(17,17,17,0.1)]",
        scrolled
          ? "sm:border-line sm:bg-cream/95 sm:backdrop-blur-md"
          : "sm:border-transparent sm:bg-cream",
      )}
    >
      <div className="relative hidden justify-center bg-transparent px-4 text-cream sm:block sm:overflow-hidden sm:bg-cream sm:px-0 sm:border-b sm:border-[#c4c4c4]">
        <p
          className="mx-auto flex min-h-7 w-max max-w-full items-center gap-2 whitespace-nowrap bg-barber py-1 pl-7 pr-7 text-[11px] text-cream [clip-path:polygon(1.1rem_0,calc(100%_-_1.1rem)_0,100%_100%,0_100%)] sm:ml-auto sm:mr-0 sm:min-h-8 sm:pl-8 sm:pr-8 sm:text-[13px] sm:[clip-path:polygon(1.1rem_0,100%_0,100%_100%,0_100%)]"
        >
          <span>
            {business.address.line1}, {business.address.city}
          </span>
          <span className="hidden text-cream/60 sm:inline" aria-hidden="true">
            |
          </span>
          <a href={telHref()} className="hidden tabular-nums hover:underline sm:inline">
            {business.phoneDisplay}
          </a>
        </p>
      </div>
      <div
        className="mx-3 mb-2 flex items-center justify-between gap-3 rounded-full border-[0.5px] bg-cream px-3 py-3 shadow-[0_0_0_1px_rgba(17,17,17,0.05),0_4px_14px_rgba(17,17,17,0.08),0_18px_40px_rgba(17,17,17,0.1)] sm:mx-auto sm:mb-0 sm:h-20 sm:max-w-7xl sm:gap-4 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-8 sm:py-0 sm:shadow-none"
        style={{ borderColor: "#c4c4c4" }}
      >
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span
            className="inline-flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white sm:h-12 sm:w-12 sm:rounded-none"
            style={{ border: "1px solid #c4c4c4" }}
          >
            <Image
              src="/images/logo.png"
              alt="Barber Omer Kenilworth"
              width={48}
              height={48}
              className="h-11 w-11 object-contain sm:h-10 sm:w-10"
              priority
            />
          </span>
          <span className="flex flex-col gap-1">
            <span className="font-heading text-[17px] leading-none sm:text-[18px]">
              Barber Omer
            </span>
            <span className="text-xs font-normal uppercase leading-none tracking-[0.22em] text-muted sm:text-[13px]">
              Kenilworth
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-7 xl:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[14px] text-muted transition-colors hover:text-ink",
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
            className="hidden min-[370px]:inline-flex h-14 items-center justify-center rounded-full bg-barber px-4 text-sm font-medium text-cream transition-transform duration-200 hover:-translate-y-0.5 hover:bg-barber-deep sm:h-11"
          >
            BOOK
          </a>
          <button
            type="button"
            className={cn(
              "inline-flex h-14 w-14 items-center justify-center rounded-full border text-ink transition-colors duration-300 sm:h-11 sm:w-11 xl:hidden",
              open && "bg-ink text-cream",
            )}
            style={{ borderColor: open ? "#111111" : "#c4c4c4" }}
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
                <path d="M4 7.5h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <path d="M4 12h11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <path d="M4 16.5h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </g>
              <g
                className={cn(
                  "origin-center transition-all duration-300 ease-out motion-reduce:transition-none",
                  open ? "opacity-100" : "scale-75 opacity-0",
                )}
              >
                <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </g>
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-3 mb-2 rounded-3xl border border-line bg-cream px-5 py-6 shadow-[0_4px_14px_rgba(17,17,17,0.07)] xl:hidden sm:mx-0 sm:mb-0 sm:rounded-none sm:border-x-0 sm:border-b-0 sm:shadow-none">
          <nav className="flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-heading text-2xl tracking-tight"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={business.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="pt-2 text-barber"
            >
              Book Online
            </a>
            <p className="pt-2 text-sm text-muted">{business.address.line1}, {business.address.city}</p>
          </nav>
        </div>
      )}
    </header>
  );
}
