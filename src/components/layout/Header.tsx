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
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "border-line bg-cream/95 backdrop-blur-md"
          : "border-transparent bg-cream",
      )}
    >
      <div
        className="relative overflow-hidden bg-cream text-cream"
        style={{ borderBottom: "1px solid #c4c4c4" }}
      >
        <p
          className="ml-auto flex min-h-7 w-max items-center gap-2 whitespace-nowrap bg-barber py-1 pl-7 pr-4 text-[11px] text-cream sm:min-h-8 sm:pl-8 sm:pr-8 sm:text-[13px]"
          style={{ clipPath: "polygon(1.1rem 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <span>
            {business.address.line1}, {business.address.city}
          </span>
          <span className="text-cream/60" aria-hidden="true">
            |
          </span>
          <a href={telHref()} className="tabular-nums hover:underline">
            {business.phoneDisplay}
          </a>
        </p>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center bg-white sm:h-12 sm:w-12"
            style={{ border: "1px solid #c4c4c4" }}
          >
            <Image
              src="/images/logo.png"
              alt="Barber Omer Kenilworth"
              width={48}
              height={48}
              className="h-9 w-9 object-contain sm:h-10 sm:w-10"
              priority
            />
          </span>
          <span className="flex flex-col gap-1">
            <span className="font-heading text-[15px] leading-none sm:text-[17px]">
              Barber Omer
            </span>
            <span className="text-[10px] font-normal uppercase leading-none tracking-[0.22em] text-muted sm:text-xs">
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
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-barber px-4 text-sm font-medium text-cream transition-transform duration-200 hover:-translate-y-0.5 hover:bg-barber-deep"
          >
            BOOK
          </a>
          <button
            type="button"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border text-ink transition-colors duration-300 xl:hidden",
              open && "bg-ink text-cream",
            )}
            style={{ borderColor: open ? "#111111" : "#c4c4c4" }}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex h-3.5 w-4 flex-col justify-between" aria-hidden>
              <span
                className={cn(
                  "block h-[1.5px] w-full origin-center rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none",
                  open && "translate-y-[6.25px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-[1.5px] w-full origin-center rounded-full bg-current transition-all duration-200 ease-out motion-reduce:transition-none",
                  open && "scale-x-0 opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-[1.5px] w-full origin-center rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none",
                  open && "-translate-y-[6.25px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-cream px-5 py-6 xl:hidden">
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
