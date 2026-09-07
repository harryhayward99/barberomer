import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getCalendarBusy } from "@/lib/booking/calendar";
import { createBooking, listBusyIntervals, updateBooking } from "@/lib/booking/store";
import { slotIsAvailable } from "@/lib/booking/slots";
import { getStripe, paymentsConfigured } from "@/lib/booking/stripe";
import { fromLondonLocal, timeFromMinutes, minutesFromTime } from "@/lib/booking/time";
import { business, siteUrl } from "@/lib/config/business";
import {
  formatPrice,
  getDeposit,
  getRemaining,
  getService,
} from "@/lib/config/services";

export async function POST(request: Request) {
  const body = await request.json();
  const service = getService(String(body.serviceId || ""));
  const date = String(body.date || "");
  const time = String(body.time || "");
  const customerName = String(body.customerName || "").trim();
  const customerPhone = String(body.customerPhone || "").trim();
  const customerEmail = String(body.customerEmail || "").trim();
  const notes = String(body.notes || "").trim();

  if (!service || !date || !time) {
    return NextResponse.json({ error: "Choose a service, day and time." }, { status: 400 });
  }
  if (!customerName || !customerPhone || !customerEmail) {
    return NextResponse.json(
      { error: "Name, mobile number and email are needed to book." },
      { status: 400 },
    );
  }

  const start = fromLondonLocal(date, time);
  const end = fromLondonLocal(
    date,
    timeFromMinutes(minutesFromTime(time) + service.durationMinutes),
  );
  const fromIso = fromLondonLocal(date, "00:00").toISOString();
  const toIso = fromLondonLocal(date, "23:59").toISOString();
  const busy = [
    ...(await getCalendarBusy(fromIso, toIso)),
    ...(await listBusyIntervals(fromIso, toIso)),
  ];

  if (!slotIsAvailable(date, time, service.durationMinutes, busy)) {
    return NextResponse.json(
      { error: "That time has just been taken. Please choose another." },
      { status: 409 },
    );
  }

  const depositPence = getDeposit(service.pricePence);
  const booking = await createBooking({
    id: randomUUID(),
    token: randomUUID(),
    serviceId: service.id,
    serviceName: service.name,
    startIso: start.toISOString(),
    endIso: end.toISOString(),
    customerName,
    customerPhone,
    customerEmail,
    notes: notes || undefined,
    depositPence,
    remainingPence: getRemaining(service.pricePence),
    totalPence: service.pricePence,
  });

  if (!paymentsConfigured()) {
    return NextResponse.json({
      bookingToken: booking.token,
      paymentsReady: false,
      message: `Online card payments are being connected. Call Omer on ${business.phoneDisplay} to confirm this time.`,
    });
  }

  const stripe = getStripe()!;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: customerEmail,
    success_url: `${siteUrl}/book/confirmed?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/book?cancelled=1`,
    metadata: { bookingId: booking.id },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "gbp",
          unit_amount: depositPence,
          product_data: {
            name: `25% deposit — ${service.name}`,
            description: `Remaining ${formatPrice(getRemaining(service.pricePence))} payable at Barber Omer.`,
          },
        },
      },
    ],
  });

  await updateBooking(booking.id, {
    stripeSessionId: session.id,
  });

  return NextResponse.json({
    url: session.url,
    paymentsReady: true,
    bookingToken: booking.token,
  });
}
