import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import type { Booking, BookingStatus } from "@/lib/booking/types";
import { pendingHoldMinutes } from "@/lib/config/hours";

const DATA_PATH = path.join(process.cwd(), ".data", "bookings.json");

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

async function ensureTable() {
  const sql = getSql();
  if (!sql) return;
  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      token TEXT UNIQUE NOT NULL,
      service_id TEXT NOT NULL,
      service_name TEXT NOT NULL,
      start_iso TIMESTAMPTZ NOT NULL,
      end_iso TIMESTAMPTZ NOT NULL,
      customer_name TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      notes TEXT,
      status TEXT NOT NULL,
      deposit_pence INTEGER NOT NULL,
      remaining_pence INTEGER NOT NULL,
      total_pence INTEGER NOT NULL,
      stripe_session_id TEXT,
      google_event_id TEXT,
      created_at TIMESTAMPTZ NOT NULL,
      expires_at TIMESTAMPTZ
    )
  `;
}

function rowToBooking(row: Record<string, unknown>): Booking {
  return {
    id: String(row.id),
    token: String(row.token),
    serviceId: String(row.service_id),
    serviceName: String(row.service_name),
    startIso: new Date(String(row.start_iso)).toISOString(),
    endIso: new Date(String(row.end_iso)).toISOString(),
    customerName: String(row.customer_name),
    customerPhone: String(row.customer_phone),
    customerEmail: String(row.customer_email),
    notes: row.notes ? String(row.notes) : undefined,
    status: String(row.status) as BookingStatus,
    depositPence: Number(row.deposit_pence),
    remainingPence: Number(row.remaining_pence),
    totalPence: Number(row.total_pence),
    stripeSessionId: row.stripe_session_id
      ? String(row.stripe_session_id)
      : undefined,
    googleEventId: row.google_event_id ? String(row.google_event_id) : undefined,
    createdAt: new Date(String(row.created_at)).toISOString(),
    expiresAt: row.expires_at
      ? new Date(String(row.expires_at)).toISOString()
      : undefined,
  };
}

async function readFileStore(): Promise<Booking[]> {
  try {
    const raw = await readFile(DATA_PATH, "utf8");
    return JSON.parse(raw) as Booking[];
  } catch {
    return [];
  }
}

async function writeFileStore(bookings: Booking[]) {
  await mkdir(path.dirname(DATA_PATH), { recursive: true });
  await writeFile(DATA_PATH, JSON.stringify(bookings, null, 2), "utf8");
}

function isActive(booking: Booking, now = new Date()) {
  if (booking.status === "confirmed") return true;
  if (booking.status !== "pending") return false;
  if (!booking.expiresAt) return true;
  return new Date(booking.expiresAt).getTime() > now.getTime();
}

export async function createBooking(
  input: Omit<Booking, "createdAt" | "status" | "expiresAt"> & {
    status?: BookingStatus;
  },
) {
  const booking: Booking = {
    ...input,
    status: input.status ?? "pending",
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + pendingHoldMinutes * 60 * 1000).toISOString(),
  };

  const sql = getSql();
  if (sql) {
    await ensureTable();
    await sql`
      INSERT INTO bookings (
        id, token, service_id, service_name, start_iso, end_iso,
        customer_name, customer_phone, customer_email, notes, status,
        deposit_pence, remaining_pence, total_pence, stripe_session_id,
        google_event_id, created_at, expires_at
      ) VALUES (
        ${booking.id}, ${booking.token}, ${booking.serviceId}, ${booking.serviceName},
        ${booking.startIso}, ${booking.endIso}, ${booking.customerName},
        ${booking.customerPhone}, ${booking.customerEmail}, ${booking.notes ?? null},
        ${booking.status}, ${booking.depositPence}, ${booking.remainingPence},
        ${booking.totalPence}, ${booking.stripeSessionId ?? null},
        ${booking.googleEventId ?? null}, ${booking.createdAt}, ${booking.expiresAt ?? null}
      )
    `;
    return booking;
  }

  const bookings = await readFileStore();
  bookings.push(booking);
  await writeFileStore(bookings);
  return booking;
}

export async function updateBooking(id: string, patch: Partial<Booking>) {
  const sql = getSql();
  if (sql) {
    await ensureTable();
    const current = await getBookingById(id);
    if (!current) return null;
    const next = { ...current, ...patch };
    await sql`
      UPDATE bookings SET
        service_id = ${next.serviceId},
        service_name = ${next.serviceName},
        start_iso = ${next.startIso},
        end_iso = ${next.endIso},
        customer_name = ${next.customerName},
        customer_phone = ${next.customerPhone},
        customer_email = ${next.customerEmail},
        notes = ${next.notes ?? null},
        status = ${next.status},
        deposit_pence = ${next.depositPence},
        remaining_pence = ${next.remainingPence},
        total_pence = ${next.totalPence},
        stripe_session_id = ${next.stripeSessionId ?? null},
        google_event_id = ${next.googleEventId ?? null},
        expires_at = ${next.expiresAt ?? null}
      WHERE id = ${id}
    `;
    return next;
  }

  const bookings = await readFileStore();
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index === -1) return null;
  bookings[index] = { ...bookings[index], ...patch };
  await writeFileStore(bookings);
  return bookings[index];
}

export async function getBookingById(id: string) {
  const sql = getSql();
  if (sql) {
    await ensureTable();
    const rows = await sql`SELECT * FROM bookings WHERE id = ${id} LIMIT 1`;
    return rows[0] ? rowToBooking(rows[0] as Record<string, unknown>) : null;
  }
  return (await readFileStore()).find((booking) => booking.id === id) ?? null;
}

export async function getBookingByToken(token: string) {
  const sql = getSql();
  if (sql) {
    await ensureTable();
    const rows = await sql`SELECT * FROM bookings WHERE token = ${token} LIMIT 1`;
    return rows[0] ? rowToBooking(rows[0] as Record<string, unknown>) : null;
  }
  return (await readFileStore()).find((booking) => booking.token === token) ?? null;
}

export async function getBookingBySession(sessionId: string) {
  const sql = getSql();
  if (sql) {
    await ensureTable();
    const rows = await sql`
      SELECT * FROM bookings WHERE stripe_session_id = ${sessionId} LIMIT 1
    `;
    return rows[0] ? rowToBooking(rows[0] as Record<string, unknown>) : null;
  }
  return (
    (await readFileStore()).find((booking) => booking.stripeSessionId === sessionId) ??
    null
  );
}

export async function listBusyIntervals(fromIso: string, toIso: string) {
  const from = new Date(fromIso).getTime();
  const to = new Date(toIso).getTime();
  const now = new Date();

  const sql = getSql();
  let bookings: Booking[] = [];

  if (sql) {
    await ensureTable();
    const rows = await sql`
      SELECT * FROM bookings
      WHERE start_iso < ${toIso} AND end_iso > ${fromIso}
        AND status IN ('pending', 'confirmed')
    `;
    bookings = rows.map((row) => rowToBooking(row as Record<string, unknown>));
  } else {
    bookings = (await readFileStore()).filter(
      (booking) =>
        new Date(booking.startIso).getTime() < to &&
        new Date(booking.endIso).getTime() > from,
    );
  }

  return bookings
    .filter((booking) => isActive(booking, now))
    .map((booking) => ({
      start: booking.startIso,
      end: booking.endIso,
    }));
}
