import { NextResponse } from "next/server";
import { cancelBooking } from "@/lib/booking/confirm";
import { getBookingByToken } from "@/lib/booking/store";

export async function POST(
  _request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  const booking = await getBookingByToken(token);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }
  const cancelled = await cancelBooking(booking);
  return NextResponse.json({ booking: cancelled });
}
