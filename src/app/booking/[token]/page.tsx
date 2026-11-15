import type { Metadata } from "next";
import { ManageBooking } from "@/components/booking/ManageBooking";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Manage booking",
};

export default async function ManageBookingPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <section className="mx-auto max-w-7xl px-5 pt-8 pb-16 sm:px-8 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24">
      <ManageBooking token={token} />
    </section>
  );
}
