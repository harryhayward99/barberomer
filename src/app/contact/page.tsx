import type { Metadata } from "next";
import { HoursStatus } from "@/components/home/HoursStatus";
import { Location } from "@/components/home/Location";

export const metadata: Metadata = {
  title: "Contact",
  description: "Find Barber Omer at 40 Common Lane, Kenilworth. Call 07480 335904.",
};

export default function ContactPage() {
  return (
    <>
      <Location pageStart />
      <HoursStatus />
    </>
  );
}
