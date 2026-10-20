import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingWizard } from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Book",
  description: "Book Barber Omer online. Choose a service, pick a time and pay a 25% deposit.",
};

function BookInner({
  searchParams,
}: {
  searchParams: { service?: string; cancelled?: string };
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 sm:pt-10 lg:pb-20 lg:pt-14">
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
