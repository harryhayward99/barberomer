import type { Metadata } from "next";
import { CallButton } from "@/components/ui/CallButton";
import { confirmBooking } from "@/lib/booking/confirm";
import { getBookingBySession, getBookingByToken } from "@/lib/booking/store";
import { getStripe } from "@/lib/booking/stripe";
import { formatFriendlyDateTime } from "@/lib/booking/time";
import { business } from "@/lib/config/business";
import { formatPrice } from "@/lib/config/services";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "You're booked",
};

export default async function ConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; token?: string }>;
}) {
  const params = await searchParams;
  let booking = params.token ? await getBookingByToken(params.token) : null;

  if (!booking && params.session_id) {
    booking = await getBookingBySession(params.session_id);
    const stripe = getStripe();
    if (stripe && booking && booking.status !== "confirmed") {
      const session = await stripe.checkout.sessions.retrieve(params.session_id);
      if (session.payment_status === "paid" && session.metadata?.bookingId) {
        booking = await confirmBooking(session.metadata.bookingId, session.id);
      }
    }
  }

  if (!booking || booking.status !== "confirmed") {
    return (
      <section className="mx-auto max-w-3xl px-5 pb-20 pt-8 sm:px-8 sm:pt-10 lg:pt-14">
        <h1 className="text-4xl sm:text-6xl">Payment still pending.</h1>
        <p className="mt-5 text-lg text-muted">
          If you have just paid, give it a moment and refresh. If anything looks
          wrong, call Omer and he will sort it.
        </p>
        <div className="mt-8">
          <CallButton />
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-5 pb-20 pt-8 sm:px-8 sm:pt-10 lg:pt-14">
      <p className="text-xs uppercase tracking-[0.22em] text-barber">Confirmed</p>
      <h1 className="mt-3 text-5xl leading-none sm:text-7xl">You&apos;re booked.</h1>
      <p className="mt-8 text-2xl">{booking.serviceName}</p>
      <p className="mt-3 text-lg text-muted">{formatFriendlyDateTime(booking.startIso)}</p>
      <p className="mt-8 leading-8 text-muted">
        Barber Omer
        <br />
        {business.address.line1}
        <br />
        {business.address.city}
        <br />
        {business.address.postcode}
      </p>
      <p className="mt-8 text-lg">
        Deposit paid: {formatPrice(booking.depositPence)}
        <br />
        Remaining at appointment: {formatPrice(booking.remainingPence)}
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <CallButton />
        <a
          href={`/api/calendar/${booking.token}`}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink px-6 text-[15px] font-medium"
        >
          Add to Calendar
        </a>
      </div>
      <div className="mt-8 flex flex-col gap-3 text-sm sm:flex-row sm:gap-6">
        <a href={`/booking/${booking.token}`} className="underline underline-offset-4">
          Reschedule appointment
        </a>
        <a href={`/booking/${booking.token}`} className="underline underline-offset-4">
          Cancel appointment
        </a>
      </div>
    </section>
  );
}
