import { pageMetadata } from "@/lib/config/seo";
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Location } from "@/components/home/Location";
import { Reviews } from "@/components/home/Reviews";
import { ServicesList } from "@/components/home/ServicesList";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "Barber Omer | Barber in Kenilworth — Sharp cuts, fair prices",
  description:
    "Local barber on Common Lane, Kenilworth. Skin fades, classic cuts and beard work since 2015 — calm chair, fair prices. Call 07305 421210 or book online.",
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
