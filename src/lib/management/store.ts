import { get, put } from "@vercel/blob";
import { type LinkRecord, tokenFor, tokenPath } from "./security";

export async function saveLinks(record: LinkRecord): Promise<string> {
  const secret = process.env.BOOKING_LINK_SECRET;
  if (!secret) throw new Error("Booking links are not configured");
  const token = tokenFor(record, secret);
  const path = tokenPath(token)!;
  // Identical retries write identical content. The token binds the whole record,
  // so this cannot overwrite a different appointment or another family visit.
  await put(path, JSON.stringify(record), {
    access: "private", addRandomSuffix: false, allowOverwrite: true,
    contentType: "application/json", cacheControlMaxAge: 60,
  });
  return token;
}

export async function readLinks(token: string): Promise<LinkRecord | null> {
  const path = tokenPath(token);
  if (!path) return null;
  const result = await get(path, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200) return null;
  const record = JSON.parse(await new Response(result.stream).text()) as LinkRecord;
  if (record.version !== 1 || record.expiresAt <= Date.now() || !Array.isArray(record.appointments)) return null;
  const secret = process.env.BOOKING_LINK_SECRET;
  if (!secret || tokenFor(record, secret) !== token) return null;
  return record;
}
