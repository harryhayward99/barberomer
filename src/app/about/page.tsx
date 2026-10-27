import { openGraph } from "@/lib/config/seo";
import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { HoursStatus } from "@/components/home/HoursStatus";

export const metadata: Metadata = {
  openGraph: { ...openGraph, url: "/about" },
  alternates: { canonical: "/about" },
  title: "About",
  description:
    "Barber Omer has been looking after Kenilworth since 2015 — precise cuts, friendly service, fair prices.",
};

export default function AboutPage() {
  return (
    <>
      <About pageStart />
      <HoursStatus compact />
    </>
  );
}
