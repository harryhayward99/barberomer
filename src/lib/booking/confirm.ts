import {
  createCalendarEvent,
  deleteCalendarEvent,
  updateCalendarEvent,
} from "@/lib/booking/calendar";
import { sendBookingConfirmation } from "@/lib/booking/email";
import { getBookingById, updateBooking } from "@/lib/booking/store";
import type { Booking } from "@/lib/booking/types";

export async function confirmBooking(id: string, stripeSessionId?: string) {
  const booking = await getBookingById(id);
  if (!booking) return null;
  if (booking.status === "confirmed") return booking;

  const eventId =
    booking.googleEventId || (await createCalendarEvent({ ...booking, status: "confirmed" }));

  const confirmed = await updateBooking(id, {
    status: "confirmed",
    expiresAt: undefined,
    stripeSessionId: stripeSessionId ?? booking.stripeSessionId,
    googleEventId: eventId,
  });

  if (confirmed) {
    await sendBookingConfirmation(confirmed);
  }

  return confirmed;
}

export async function rescheduleBooking(
  booking: Booking,
  startIso: string,
  endIso: string,
) {
  const next = await updateBooking(booking.id, { startIso, endIso });
  if (!next) return null;
  if (next.googleEventId) {
    await updateCalendarEvent(next);
  } else if (next.status === "confirmed") {
    const eventId = await createCalendarEvent(next);
    return updateBooking(next.id, { googleEventId: eventId });
  }
  return next;
}

export async function cancelBooking(booking: Booking) {
  await deleteCalendarEvent(booking.googleEventId);
  return updateBooking(booking.id, { status: "cancelled" });
}
