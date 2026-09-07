import { JWT } from "google-auth-library";
import { formatPrice } from "@/lib/config/services";
import type { Booking } from "@/lib/booking/types";
import { TIMEZONE } from "@/lib/booking/time";

function calendarConfigured() {
  return Boolean(
    process.env.GOOGLE_CALENDAR_ID &&
      process.env.GOOGLE_CLIENT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY,
  );
}

async function getAccessToken() {
  const client = new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  const auth = await client.authorize();
  if (!auth.access_token) {
    throw new Error("Google Calendar authorization failed.");
  }
  return auth.access_token;
}

async function calendarFetch(path: string, init?: RequestInit) {
  const token = await getAccessToken();
  const response = await fetch(`https://www.googleapis.com/calendar/v3${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google Calendar error ${response.status}: ${body}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export async function getCalendarBusy(fromIso: string, toIso: string) {
  if (!calendarConfigured()) return [];

  const calendarId = process.env.GOOGLE_CALENDAR_ID!;
  const data = (await calendarFetch("/freeBusy", {
    method: "POST",
    body: JSON.stringify({
      timeMin: fromIso,
      timeMax: toIso,
      timeZone: TIMEZONE,
      items: [{ id: calendarId }],
    }),
  })) as {
    calendars?: Record<string, { busy?: { start: string; end: string }[] }>;
  };

  return data.calendars?.[calendarId]?.busy ?? [];
}

function eventPayload(booking: Booking) {
  return {
    summary: `${booking.serviceName} — ${booking.customerName}`,
    description: [
      `Customer: ${booking.customerName}`,
      `Mobile: ${booking.customerPhone}`,
      `Email: ${booking.customerEmail}`,
      `Service: ${booking.serviceName}`,
      `Duration: ${Math.round((new Date(booking.endIso).getTime() - new Date(booking.startIso).getTime()) / 60000)} minutes`,
      `Deposit paid: ${formatPrice(booking.depositPence)}`,
      `Remaining balance: ${formatPrice(booking.remainingPence)}`,
      booking.notes ? `Notes: ${booking.notes}` : "Notes: —",
    ].join("\n"),
    start: { dateTime: booking.startIso, timeZone: TIMEZONE },
    end: { dateTime: booking.endIso, timeZone: TIMEZONE },
    reminders: { useDefault: true },
  };
}

export async function createCalendarEvent(booking: Booking) {
  if (!calendarConfigured()) return undefined;
  const calendarId = encodeURIComponent(process.env.GOOGLE_CALENDAR_ID!);
  const event = (await calendarFetch(`/calendars/${calendarId}/events`, {
    method: "POST",
    body: JSON.stringify(eventPayload(booking)),
  })) as { id?: string };
  return event.id;
}

export async function updateCalendarEvent(booking: Booking) {
  if (!calendarConfigured() || !booking.googleEventId) return;
  const calendarId = encodeURIComponent(process.env.GOOGLE_CALENDAR_ID!);
  await calendarFetch(
    `/calendars/${calendarId}/events/${encodeURIComponent(booking.googleEventId)}`,
    {
      method: "PUT",
      body: JSON.stringify(eventPayload(booking)),
    },
  );
}

export async function deleteCalendarEvent(eventId?: string) {
  if (!calendarConfigured() || !eventId) return;
  const calendarId = encodeURIComponent(process.env.GOOGLE_CALENDAR_ID!);
  await calendarFetch(
    `/calendars/${calendarId}/events/${encodeURIComponent(eventId)}`,
    { method: "DELETE" },
  );
}
