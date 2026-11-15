import { pageMetadata } from "@/lib/config/seo";
import type { Metadata } from "next";
import { ServicesList } from "@/components/home/ServicesList";

export const metadata: Metadata = pageMetadata({
  path: "/services",
  title: "Services & prices",
  description:
    "Haircut, skin fade, hot towel shave and grooming prices at Barber Omer in Kenilworth. Book online or call 07305 421210.",
});

export default function ServicesPage() {
  return (
    <ServicesList
      pageStart
      heading="Services & prices."
      intro="Straightforward menu. Sensible prices. Book a slot or call Omer if you would rather just come in."
    />
  );
}
