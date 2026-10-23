import { destinationFor, SITE } from "@/lib/management/security";
import { readLinks } from "@/lib/management/store";

export const runtime = "nodejs";
export async function POST(request: Request, context: { params: Promise<{ token: string; index: string; action: string }> }) {
  if (request.headers.get("origin") !== SITE) return new Response("Invalid request", { status: 403 });
  const { token, index, action } = await context.params;
  try {
    const record = await readLinks(token);
    const destination = record && destinationFor(record, index, action);
    if (!destination) return new Response("Booking link unavailable", { status: 404 });
    return new Response(null, { status: 303, headers: { Location: destination, "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
  } catch { return new Response("Temporarily unavailable. Please try your original booking link.", { status: 503 }); }
}
