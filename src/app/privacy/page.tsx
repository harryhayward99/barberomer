import { pageMetadata } from "@/lib/config/seo";
import type { Metadata } from "next";
import { business } from "@/lib/config/business";

export const metadata: Metadata = pageMetadata({
  path: "/privacy",
  title: "Privacy Policy",
  description:
    "How Barber Omer in Kenilworth uses booking details — name, phone and email — to run your appointment.",
});

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-2xl px-5 sm:px-8 pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 lg:pb-24">
      <h1 className="text-4xl sm:text-6xl">Privacy Policy</h1>
      <div className="mt-8 space-y-5 leading-8 text-muted">
        <p>
          Barber Omer collects only what is needed to run your appointment: your
          name, mobile number, email and any notes you choose to leave.
        </p>
        <p>
          That information is used to confirm the booking, place it in Omer&apos;s
          calendar and send you a confirmation. It is not sold or used for
          marketing lists.
        </p>
        <p>
          Card payments are handled by Stripe. Barber Omer does not store your
          full card details.
        </p>
        <p>
          To ask about the information held on a booking, call{" "}
          {business.phoneDisplay}.
        </p>
      </div>
    </section>
  );
}
