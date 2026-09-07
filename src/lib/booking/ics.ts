import { business } from "@/lib/config/business";
import type { Booking } from "@/lib/booking/types";

function stamp(iso: string) {
  return iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function bookingToIcs(booking: Booking) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Barber Omer//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${booking.id}@barberomer.co.uk`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(booking.startIso)}`,
    `DTEND:${stamp(booking.endIso)}`,
    `SUMMARY:${booking.serviceName} at Barber Omer`,
    `DESCRIPTION:${booking.serviceName} with Omer. Remaining balance due at appointment.`,
    `LOCATION:${business.address.line1}\\, ${business.address.city}\\, ${business.address.postcode}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return ics;
}
