import { business, telHref } from "@/lib/config/business";

export function BookWidget() {
  return (
    <>
      {/* Mobile: sticky Book + Call bar — matches ink header */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 sm:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="pointer-events-auto rounded-t border-t border-surface/15 bg-ink px-3 py-2.5">
          <div className="mx-auto grid max-w-lg grid-cols-2 gap-2.5">
            <a
              href={business.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm bg-barber px-3 text-[11px] font-medium uppercase tracking-[0.16em] text-surface transition-colors hover:bg-barber-deep"
            >
              <CalendarIcon />
              Book
            </a>
            <a
              href={telHref()}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm bg-transparent px-3 text-[11px] font-medium uppercase tracking-[0.16em] text-surface shadow-[inset_0_0_0_1px_rgba(248,243,234,0.35)] transition-colors hover:bg-surface/10"
            >
              <PhoneIcon />
              Call
            </a>
          </div>
        </div>
      </div>

      {/* Desktop: floating book button */}
      <div className="pointer-events-none fixed bottom-5 right-5 z-30 hidden sm:bottom-8 sm:right-8 sm:block">
        <div className="relative">
          <span className="book-widget-glow" aria-hidden />
          <a
            href={business.bookingUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Book an appointment"
            className="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded border border-ink bg-ink text-surface shadow-[0_4px_10px_rgba(28,24,21,0.14),0_10px_22px_rgba(28,24,21,0.2)]"
          >
            <CalendarIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </>
  );
}

function CalendarIcon({ className = "h-4 w-4 shrink-0" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden
    >
      <rect x="3.5" y="5" width="17" height="15.5" rx="0" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3.5v3" />
      <path d="M16 3.5v3" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 17.5h.01" />
      <path d="M12 17.5h.01" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden
    >
      <path d="M7.5 4.5h3l1.2 3.2-1.8 1.2a11 11 0 0 0 5.2 5.2l1.2-1.8 3.2 1.2v3a1.5 1.5 0 0 1-1.5 1.5A14.5 14.5 0 0 1 4.5 6a1.5 1.5 0 0 1 1.5-1.5Z" />
    </svg>
  );
}
