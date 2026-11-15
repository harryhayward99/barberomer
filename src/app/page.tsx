import { openGraph } from "@/lib/config/seo";
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Location } from "@/components/home/Location";
import { Reviews } from "@/components/home/Reviews";
import { ServicesList } from "@/components/home/ServicesList";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  openGraph: { ...openGraph, url: "/" },
  alternates: { canonical: "/" },
};

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
