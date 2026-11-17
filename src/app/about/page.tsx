import { buildBreadcrumbJsonLd, pageMetadata } from "@/lib/config/seo";
import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { HoursStatus } from "@/components/home/HoursStatus";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About the Kenilworth barber",
  description:
    "Barber Omer has looked after Kenilworth since 2015 — Turkish barbering, precise cuts, friendly service and fair prices on Common Lane.",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "About", path: "/about" },
]);

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <About pageStart />
      <SectionDivider />
      <HoursStatus />
    </>
  );
}
