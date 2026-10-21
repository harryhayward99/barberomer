import { readLinks } from "@/lib/management/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = {
  "Content-Type": "text/html; charset=utf-8", "Cache-Control": "private, no-store, max-age=0",
  "Referrer-Policy": "no-referrer", "X-Robots-Tag": "noindex, nofollow, noarchive",
  "X-Content-Type-Options": "nosniff",
  "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; form-action 'self' https://api.leadconnectorhq.com; frame-ancestors 'none'; base-uri 'none'",
};
export async function GET(_request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  let record;
  try { record = await readLinks(token); }
  catch { return new Response("Booking management is temporarily unavailable. Please use your original booking link or contact Omer.", { status: 503, headers }); }
  if (!record) return new Response("This booking link is unavailable or has expired. Please use your latest booking text or contact Omer.", { status: 404, headers });
  const cards = record.appointments.map((_, i) => `<section><h2>${record.appointments.length > 1 ? `Appointment ${i + 1}` : "Your appointment"}</h2><div class="actions">${["reschedule", "cancel"].map(action => `<form method="post" action="/m/${token}/${i}/${action}"><button class="${action}" type="submit">${action === "cancel" ? "Cancel appointment" : "Reschedule"}</button></form>`).join("")}</div></section>`).join("");
  return new Response(`<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Manage your booking | Barber Omer</title><style>body{margin:0;background:#f5f1eb;color:#222;font:17px/1.6 system-ui,sans-serif}main{max-width:620px;margin:6vh auto;padding:28px}header{letter-spacing:.12em;font-size:14px;font-weight:700}h1{font-size:34px;line-height:1.2}h2{font-size:20px}section{background:white;padding:24px;border-radius:16px;margin:24px 0;border:1px solid #ddd}.actions{display:flex;gap:12px;flex-wrap:wrap}button{border:1px solid #222;border-radius:8px;padding:14px 20px;font:inherit;font-weight:650;cursor:pointer}.reschedule{background:#222;color:white}.cancel{background:white;color:#222}.note{color:#555;font-size:15px}a{color:inherit}</style></head><body><main><header>BARBER OMER · KENILWORTH</header><h1>Manage your booking</h1><p>Opening this page hasn't changed your appointment.</p><p>Choose an option below, then follow the steps on our booking system to confirm your change.</p>${cards}<p class="note">Online changes close 2 hours before your appointment. Your booking system shows the current appointment details and available options.${record.appointments.length > 1 ? " Each appointment must be changed separately. Changing one will not change the others." : ""}</p><p class="note">Keep this link private. Anyone you share it with may be able to manage these appointments.</p></main></body></html>`, { headers });
}
