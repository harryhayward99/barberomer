import { NextResponse } from "next/server";
import { getBookingByToken } from "@/lib/booking/store";

export async function GET(
  _request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  const booking = await getBookingByToken(token);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }
  return NextResponse.json({ booking });
}
