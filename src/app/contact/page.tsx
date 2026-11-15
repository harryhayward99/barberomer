import {
  buildFaqJsonLd,
  contactFaqs,
  pageMetadata,
} from "@/lib/config/seo";
import type { Metadata } from "next";
import { ContactBoard } from "@/components/contact/ContactBoard";
import { ContactFaq } from "@/components/contact/ContactFaq";
import { HoursStatus } from "@/components/home/HoursStatus";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact & directions",
  description:
    "Visit Barber Omer at 40 Common Lane, Kenilworth CV8 2EQ. Call 07305 421210, get directions, or book online any time.",
});

const faqJsonLd = buildFaqJsonLd([...contactFaqs]);

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ContactBoard />
      <SectionDivider />
      <HoursStatus />
      <SectionDivider />
      <ContactFaq />
    </>
  );
}
