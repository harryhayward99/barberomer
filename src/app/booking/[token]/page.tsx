import type { Metadata } from "next";
import { ManageBooking } from "@/components/booking/ManageBooking";

export const metadata: Metadata = {
  title: "Manage booking",
};

export default async function ManageBookingPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 sm:pt-10 lg:pt-14">
      <ManageBooking token={token} />
    </section>
  );
}
