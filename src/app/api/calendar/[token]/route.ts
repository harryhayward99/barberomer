import { NextResponse } from "next/server";
import { bookingToIcs } from "@/lib/booking/ics";
import { getBookingByToken } from "@/lib/booking/store";

export async function GET(
  _request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  const booking = await getBookingByToken(token);
  if (!booking || booking.status !== "confirmed") {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  return new NextResponse(bookingToIcs(booking), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="barber-omer-${booking.id.slice(0, 8)}.ics"`,
    },
  });
}
