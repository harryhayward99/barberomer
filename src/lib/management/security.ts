import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const LOCATION_ID = "cL1qFO89EgW5Y5ppgoL6";
export const SITE = "https://barberomer.vercel.app";
export type ChangeLinks = { reschedule: string; cancel: string };
export type LinkRecord = { version: 1; expiresAt: number; appointments: ChangeLinks[] };

export function authorised(header: string | null, secret: string): boolean {
  if (secret.length < 32 || !header) return false;
  const received = Buffer.from(header);
  const expected = Buffer.from(`Bearer ${secret}`);
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export function safeDestination(input: unknown): string {
  if (typeof input !== "string" || input.length > 4096 || /[\s{}]/.test(input)) throw new Error("Invalid booking link");
  const url = new URL(input);
  if (url.protocol !== "https:" || url.hostname !== "api.leadconnectorhq.com" || url.port || url.username || url.password || url.hash) {
    throw new Error("Unsupported booking link");
  }
  if (url.pathname === "/") throw new Error("Missing booking destination");
  return url.href;
}

export function parseRegistration(input: unknown, now = Date.now()): LinkRecord {
  if (!input || typeof input !== "object") throw new Error("Invalid request");
  const body = input as Record<string, unknown>;
  if (body.locationId !== LOCATION_ID || !Array.isArray(body.appointments) || body.appointments.length < 1 || body.appointments.length > 6) throw new Error("Invalid booking scope");
  const expiresAt = body.expiresAt === undefined
    ? (Math.floor(now / 86400000) + 365) * 86400000
    : Date.parse(String(body.expiresAt));
  if (!Number.isFinite(expiresAt) || expiresAt <= now || expiresAt > now + 366 * 86400000) throw new Error("Invalid expiry");
  const appointments = body.appointments.map((item: unknown) => {
    if (!item || typeof item !== "object") throw new Error("Invalid appointment");
    const pair = item as Record<string, unknown>;
    return { reschedule: safeDestination(pair.reschedule), cancel: safeDestination(pair.cancel) };
  });
  if (new Set(appointments.map(a => a.reschedule)).size !== appointments.length) throw new Error("Duplicate appointment");
  return { version: 1, expiresAt, appointments };
}

export function tokenFor(record: LinkRecord, secret: string): string {
  if (secret.length < 32) throw new Error("Missing signing secret");
  return createHmac("sha256", secret).update(JSON.stringify(record)).digest("base64url").slice(0, 24);
}

export function tokenPath(token: string): string | null {
  return /^[A-Za-z0-9_-]{24}$/.test(token)
    ? `booking-management/${createHash("sha256").update(token).digest("hex")}.json` : null;
}

export function destinationFor(record: LinkRecord, index: string, action: string, now = Date.now()): string | null {
  if (record.expiresAt <= now || !/^[0-5]$/.test(index) || !["cancel", "reschedule"].includes(action)) return null;
  const item = record.appointments[Number(index)];
  return item ? safeDestination(item[action as keyof ChangeLinks]) : null;
}
