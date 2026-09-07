import { Resend } from "resend";
import { business, siteUrl } from "@/lib/config/business";
import { formatPrice } from "@/lib/config/services";
import type { Booking } from "@/lib/booking/types";
import { formatFriendlyDateTime } from "@/lib/booking/time";

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

function bookingHtml(booking: Booking) {
  const manageUrl = `${siteUrl}/booking/${booking.token}`;
  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#F7F3EC;padding:32px;color:#111111;">
      <div style="max-width:520px;margin:0 auto;background:#ffffff;padding:32px;border-radius:24px;">
        <p style="letter-spacing:0.16em;text-transform:uppercase;font-size:12px;color:#8B1E1E;margin:0 0 12px;">Barber Omer</p>
        <h1 style="font-size:28px;margin:0 0 16px;">You're booked.</h1>
        <p style="margin:0 0 24px;line-height:1.6;">${booking.serviceName}<br/>${formatFriendlyDateTime(booking.startIso)}</p>
        <p style="margin:0 0 24px;line-height:1.6;">
          ${business.address.line1}<br/>
          ${business.address.city}<br/>
          ${business.address.postcode}
        </p>
        <p style="margin:0 0 24px;line-height:1.6;">
          Deposit paid: ${formatPrice(booking.depositPence)}<br/>
          Remaining at appointment: ${formatPrice(booking.remainingPence)}
        </p>
        <p style="margin:0 0 24px;">
          <a href="tel:${business.phoneTel}" style="color:#8B1E1E;font-weight:600;">Call Omer — ${business.phoneDisplay}</a>
        </p>
        <p style="margin:0 0 8px;">
          <a href="${manageUrl}" style="color:#111111;">Reschedule appointment</a>
        </p>
        <p style="margin:0;">
          <a href="${manageUrl}" style="color:#111111;">Cancel appointment</a>
        </p>
      </div>
    </div>
  `;
}

export async function sendBookingConfirmation(booking: Booking) {
  const resend = getResend();
  if (!resend) return;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Barber Omer <bookings@barberomer.co.uk>",
    to: booking.customerEmail,
    subject: `You're booked — ${booking.serviceName} at Barber Omer`,
    html: bookingHtml(booking),
  });
}
