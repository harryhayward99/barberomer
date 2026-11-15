import { pageMetadata } from "@/lib/config/seo";
import type { Metadata } from "next";
import { bookingPolicy } from "@/lib/config/policy";

export const metadata: Metadata = pageMetadata({
  path: "/booking-policy",
  title: "Booking & cancellation policy",
  description:
    "Deposits, cancellations and booking rules for Barber Omer in Kenilworth — clear terms before you book.",
});

export default function BookingPolicyPage() {
  return (
    <section className="mx-auto max-w-2xl px-5 sm:px-8 pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 lg:pb-24">
      <h1 className="text-4xl sm:text-6xl">{bookingPolicy.heading}</h1>
      <p className="mt-6 text-lg leading-8 text-muted">{bookingPolicy.intro}</p>
      <div className="mt-10 space-y-8">
        {bookingPolicy.sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-2xl">{section.title}</h2>
            <p className="mt-3 leading-8 text-muted">{section.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
