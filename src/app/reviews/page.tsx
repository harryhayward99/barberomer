import {
  buildBreadcrumbJsonLd,
  buildReviewsJsonLd,
  pageMetadata,
} from "@/lib/config/seo";
import type { Metadata } from "next";
import { Reviews } from "@/components/home/Reviews";

export const metadata: Metadata = pageMetadata({
  path: "/reviews",
  title: "Client reviews in Kenilworth",
  description:
    "What Kenilworth clients say about Barber Omer — friendly Turkish barbering, precise cuts and fair prices on Common Lane.",
});

const reviewsJsonLd = buildReviewsJsonLd();
const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Reviews", path: "/reviews" },
]);

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Reviews pageStart />
    </>
  );
}
