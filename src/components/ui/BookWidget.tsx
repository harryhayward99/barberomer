import { business } from "@/lib/config/business";

export function BookWidget() {
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-30 sm:bottom-8 sm:right-8">
      <div className="relative">
        <span className="book-widget-glow" aria-hidden />
        <a
          href={business.bookingUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Book an appointment"
          className="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-cream text-barber"
          style={{ border: "1.5px solid #8B1E1E", boxShadow: "0 12px 28px rgba(17,17,17,0.16)" }}
        >
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
          <path d="M3.5 9.5h17" />
          <path d="M8 3.5v3" />
          <path d="M16 3.5v3" />
          <path d="M8 14h.01" />
          <path d="M12 14h.01" />
          <path d="M16 14h.01" />
          <path d="M8 17.5h.01" />
          <path d="M12 17.5h.01" />
        </svg>
        </a>
      </div>
    </div>
  );
}
