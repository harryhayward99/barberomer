import { buildReviewsJsonLd, pageMetadata } from "@/lib/config/seo";
import type { Metadata } from "next";
import { Reviews } from "@/components/home/Reviews";

export const metadata: Metadata = pageMetadata({
  path: "/reviews",
  title: "Reviews",
  description:
    "What Kenilworth clients say about Barber Omer — friendly service, precise cuts and fair prices on Common Lane.",
});

const reviewsJsonLd = buildReviewsJsonLd();

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <Reviews pageStart />
    </>
  );
}
