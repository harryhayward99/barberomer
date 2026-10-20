import type { Metadata } from "next";
import { Reviews } from "@/components/home/Reviews";

export const metadata: Metadata = {
  title: "Reviews",
  description: "4.9 on Google. Kenilworth keeps coming back to Barber Omer.",
};

export default function ReviewsPage() {
  return <Reviews pageStart />;
}
