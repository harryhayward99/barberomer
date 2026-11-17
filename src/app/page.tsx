import { pageMetadata } from "@/lib/config/seo";
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Location } from "@/components/home/Location";
import { Reviews } from "@/components/home/Reviews";
import { ServicesList } from "@/components/home/ServicesList";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "Barber Omer | Barber in Kenilworth — Skin Fades & Cuts",
  description:
    "Turkish barber on Common Lane, Kenilworth. Precision haircuts, skin fades, beard trims and hot towel shaves from £10. Call 07305 421210 or book online.",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider wash />
      <ServicesList />
      <SectionDivider wash />
      <Reviews />
      <SectionDivider wash />
      <Location />
    </>
  );
}
