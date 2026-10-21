import { authorised, parseRegistration, SITE } from "@/lib/management/security";
import { saveLinks } from "@/lib/management/store";

export const runtime = "nodejs";
export async function POST(request: Request) {
  const secret = process.env.BOOKING_LINK_ISSUER_SECRET;
  if (!secret) return Response.json({ error: "Unavailable" }, { status: 503 });
  if (!authorised(request.headers.get("authorization"), secret)) return Response.json({ error: "Unauthorised" }, { status: 401 });
  const reader = request.body?.getReader();
  if (!reader) return Response.json({ error: "Missing body" }, { status: 400 });
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 60000) { await reader.cancel(); return Response.json({ error: "Too large" }, { status: 413 }); }
    chunks.push(value);
  }
  let record;
  try { record = parseRegistration(JSON.parse(Buffer.concat(chunks).toString("utf8"))); }
  catch { return Response.json({ error: "Invalid booking data" }, { status: 400 }); }
  try {
    const token = await saveLinks(record);
    return Response.json({ manageUrl: `${SITE}/m/${token}` }, { headers: { "Cache-Control": "no-store" } });
  } catch { return Response.json({ error: "Link could not be saved" }, { status: 503 }); }
}
