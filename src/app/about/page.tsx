import { pageMetadata } from "@/lib/config/seo";
import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { HoursStatus } from "@/components/home/HoursStatus";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About",
  description:
    "Barber Omer has looked after Kenilworth since 2015 — precise cuts, friendly service and fair prices on Common Lane.",
});

export default function AboutPage() {
  return (
    <>
      <About pageStart />
      <SectionDivider />
      <HoursStatus />
    </>
  );
}
