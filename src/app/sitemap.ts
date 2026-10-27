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
    "/privacy",
    "/booking-policy",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
