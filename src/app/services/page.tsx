import { buildBreadcrumbJsonLd, pageMetadata } from "@/lib/config/seo";
import type { Metadata } from "next";
import { ServicesList } from "@/components/home/ServicesList";

export const metadata: Metadata = pageMetadata({
  path: "/services",
  title: "Haircut & skin fade prices in Kenilworth",
  description:
    "Haircut, skin fade, beard trim and hot towel shave prices at Barber Omer, 40 Common Lane, Kenilworth. Book online or call 07305 421210.",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Services & prices", path: "/services" },
]);

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServicesList
        pageStart
        heading="Services & prices."
        intro="Straightforward menu. Sensible prices. Book a slot or call Omer if you would rather just come in."
      />
    </>
  );
}
