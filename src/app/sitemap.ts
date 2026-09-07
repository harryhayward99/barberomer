import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config/business";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/gallery",
    "/about",
    "/reviews",
    "/contact",
    "/book",
    "/privacy",
    "/booking-policy",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" || route === "/book" ? 1 : 0.6,
  }));
}
