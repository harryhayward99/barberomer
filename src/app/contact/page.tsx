import { openGraph } from "@/lib/config/seo";
import type { Metadata } from "next";
import { ContactBoard } from "@/components/contact/ContactBoard";
import { HoursStatus } from "@/components/home/HoursStatus";

export const metadata: Metadata = {
  openGraph: { ...openGraph, url: "/contact" },
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: "Find Barber Omer at 40 Common Lane, Kenilworth. Call 07480 335904.",
};

export default function ContactPage() {
  return (
    <>
      <ContactBoard />
      <HoursStatus />
    </>
  );
}
