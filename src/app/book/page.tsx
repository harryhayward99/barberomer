import { pageMetadata } from "@/lib/config/seo";
import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingWizard } from "@/components/booking/BookingWizard";

export const metadata: Metadata = pageMetadata({
  path: "/book",
  title: "Book online",
  description:
    "Book a haircut with Barber Omer in Kenilworth. Choose a service, pick a time and pay a 25% deposit online.",
});

function BookInner({
  searchParams,
}: {
  searchParams: { service?: string; cancelled?: string };
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 lg:pb-24">
      {searchParams.cancelled && (
        <p className="mb-8 rounded-2xl border border-line px-4 py-3 text-sm">
          Payment was cancelled. That time has not been held. You can try again
          whenever you are ready.
        </p>
      )}
      <BookingWizard initialServiceId={searchParams.service} />
    </section>
  );
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; cancelled?: string }>;
}) {
  const params = await searchParams;
  return (
    <Suspense>
      <BookInner searchParams={params} />
    </Suspense>
  );
}
