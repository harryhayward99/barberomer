# Barber Omer

Modern website and booking system for Barber Omer, 40 Common Lane, Kenilworth.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Opening hours

Edit `src/lib/config/hours.ts`. Those hours drive both the public hours list and online booking availability.

## Booking / cancellation policy

Edit `src/lib/config/policy.ts`. Do not invent a refund policy in the copy — add Omer’s terms there when they are ready.

## Connect live booking

Copy `.env.example` to `.env.local` and add:

1. **Stripe** — deposit payments. Add the webhook endpoint `/api/webhooks/stripe` for `checkout.session.completed`.
2. **Google Calendar** — create a service account, enable Calendar API, share Omer’s calendar with the service account email, then set `GOOGLE_CALENDAR_ID`, `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY`.
3. **Neon** — production booking store. Without `DATABASE_URL`, bookings are stored in `.data/bookings.json` for local use.
4. **Resend** — customer confirmation emails.

A booking is only confirmed after the 25% deposit payment succeeds. Failed or abandoned payments do not keep the slot.
