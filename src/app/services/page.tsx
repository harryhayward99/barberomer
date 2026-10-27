import { openGraph } from "@/lib/config/seo";
import type { Metadata } from "next";
import { ServicesList } from "@/components/home/ServicesList";

export const metadata: Metadata = {
  openGraph: { ...openGraph, url: "/services" },
  alternates: { canonical: "/services" },
  title: "Services & prices",
  description:
    "Haircuts, skin fades, hot towel shaves and grooming packages at Barber Omer, Kenilworth.",
};

export default function ServicesPage() {
  return (
    <ServicesList
      pageStart
      heading="Services & prices."
      intro="Straightforward menu. Sensible prices. Book a slot or call Omer if you would rather just come in."
    />
  );
}
