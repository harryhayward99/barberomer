import { openGraph } from "@/lib/config/seo";
import type { Metadata } from "next";
import { Reviews } from "@/components/home/Reviews";

export const metadata: Metadata = {
  openGraph: { ...openGraph, url: "/reviews" },
  alternates: { canonical: "/reviews" },
  title: "Reviews",
  description: "4.9 on Google. Kenilworth keeps coming back to Barber Omer.",
};

export default function ReviewsPage() {
  return <Reviews pageStart />;
}
