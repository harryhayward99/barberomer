import Link from "next/link";
import { business, telHref } from "@/lib/config/business";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-3 py-2 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-[1.35fr_1fr] gap-2 pb-[env(safe-area-inset-bottom)]">
        <a
          href={telHref()}
          className="flex min-h-12 flex-col items-center justify-center rounded-full bg-barber px-3 py-2 text-cream"
        >
          <span className="text-[15px] font-medium leading-none">Call Omer</span>
          <span className="mt-1 text-[12px] tabular-nums text-cream/80">
            {business.phoneDisplay}
          </span>
        </a>
        <Link
          href="/book"
          className="flex min-h-12 items-center justify-center rounded-full border border-ink bg-cream text-[15px] font-medium text-ink"
        >
          Book
        </Link>
      </div>
    </div>
  );
}
