import { NextResponse } from "next/server";
import { getCalendarBusy } from "@/lib/booking/calendar";
import { rescheduleBooking } from "@/lib/booking/confirm";
import { slotIsAvailable } from "@/lib/booking/slots";
import { listBusyIntervals } from "@/lib/booking/store";
import { getBookingByToken } from "@/lib/booking/store";
import { fromLondonLocal, minutesFromTime, timeFromMinutes } from "@/lib/booking/time";
import { getService } from "@/lib/config/services";

export async function POST(
  request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  const booking = await getBookingByToken(token);
  if (!booking || booking.status === "cancelled") {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  const body = await request.json();
  const date = String(body.date || "");
  const time = String(body.time || "");
  const service = getService(booking.serviceId);
  if (!service || !date || !time) {
    return NextResponse.json({ error: "Choose a new day and time." }, { status: 400 });
  }

  const fromIso = fromLondonLocal(date, "00:00").toISOString();
  const toIso = fromLondonLocal(date, "23:59").toISOString();
  const busy = [
    ...(await getCalendarBusy(fromIso, toIso)),
    ...(await listBusyIntervals(fromIso, toIso)),
  ].filter(
    (interval) =>
      interval.start !== booking.startIso && interval.end !== booking.endIso,
  );

  if (!slotIsAvailable(date, time, service.durationMinutes, busy)) {
    return NextResponse.json(
      { error: "That time is no longer free. Please choose another." },
      { status: 409 },
    );
  }

  const start = fromLondonLocal(date, time);
  const end = fromLondonLocal(
    date,
    timeFromMinutes(minutesFromTime(time) + service.durationMinutes),
  );

  const next = await rescheduleBooking(booking, start.toISOString(), end.toISOString());
  return NextResponse.json({ booking: next });
}
