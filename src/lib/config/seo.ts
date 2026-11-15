import type { Metadata } from "next";
import { business, siteUrl } from "@/lib/config/business";
import { openingHours, dayNames } from "@/lib/config/hours";
import { reviews } from "@/lib/config/reviews";
import { services } from "@/lib/config/services";

const ogImage = {
  url: "/images/omer-shopfront.png",
  width: 1200,
  height: 630,
  alt: "Barber Omer shopfront on Common Lane, Kenilworth",
} as const;

export const openGraph = {
  title: "Barber Omer | Barber in Kenilworth",
  description:
    "Modern barbering at 40 Common Lane, Kenilworth. Skin fades, haircuts and beard work since 2015 — fair prices, friendly chair.",
  locale: "en_GB",
  type: "website" as const,
  siteName: business.name,
  images: [ogImage],
};

const dayMap = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

function openingHoursSpecification() {
  return Object.entries(openingHours)
    .filter(([, hours]) => hours != null)
    .map(([day, hours]) => ({
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: `https://schema.org/${dayNames[Number(day)]}`,
      opens: hours!.open,
      closes: hours!.close,
    }));
}

/** Legacy string form still useful for some parsers */
function openingHoursStrings() {
  const byKey = new Map<string, string>();
  for (const [day, hours] of Object.entries(openingHours)) {
    if (!hours) continue;
    const key = `${hours.open}-${hours.close}`;
    const code = dayMap[Number(day)];
    const existing = byKey.get(key);
    byKey.set(key, existing ? `${existing},${code}` : code);
  }
  return [...byKey.entries()].map(([span, days]) => `${days} ${span}`);
}

function priceRange() {
  const prices = services.map((service) => service.pricePence);
  const min = Math.min(...prices) / 100;
  const max = Math.max(...prices) / 100;
  return `£${min.toFixed(0)}-£${max.toFixed(0)}`;
}

export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${siteUrl}/#salon`,
    name: business.name,
    description: openGraph.description,
    url: siteUrl,
    telephone: business.phoneTel,
    email: business.email,
    image: [
      `${siteUrl}/images/omer-shopfront.png`,
      `${siteUrl}/images/omer-doorway.jpg`,
      `${siteUrl}/images/logo.png`,
    ],
    logo: `${siteUrl}/images/logo.png`,
    priceRange: priceRange(),
    currenciesAccepted: "GBP",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.line1,
      addressLocality: business.address.city,
      postalCode: business.address.postcode,
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.35378,
      longitude: -1.56068,
    },
    hasMap: business.directionsUrl,
    areaServed: [
      { "@type": "City", name: "Kenilworth" },
      { "@type": "AdministrativeArea", name: "Warwickshire" },
    ],
    openingHours: openingHoursStrings(),
    openingHoursSpecification: openingHoursSpecification(),
    sameAs: [business.instagram, business.googleReviewsUrl],
    amenityFeature: business.amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Barber services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: { "@id": `${siteUrl}/#salon` },
        },
        price: (service.pricePence / 100).toFixed(2),
        priceCurrency: "GBP",
        url: `${siteUrl}/services`,
      })),
    },
  };
}

export function buildFaqJsonLd(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildReviewsJsonLd() {
  const average =
    reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length;

  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${siteUrl}/#salon`,
    name: business.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(average.toFixed(1)),
      bestRating: 5,
      worstRating: 1,
      ratingCount: reviews.length,
      reviewCount: reviews.length,
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.stars,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.text,
    })),
  };
}

export const contactFaqs = [
  {
    question: "Do I need to book a haircut at Barber Omer?",
    answer:
      "Booking online is the easiest way to secure a time, and appointments are accepted 24/7. You can also call Omer on 07305 421210.",
  },
  {
    question: "Where is Barber Omer in Kenilworth?",
    answer:
      "The shop is at 40 Common Lane, Kenilworth CV8 2EQ. Parking is available nearby.",
  },
  {
    question: "How much does a haircut cost?",
    answer:
      "Haircuts and grooming start from £10, with most adult cuts around £15–£22 and fuller packages up to £40. See the services page for the full menu.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "Monday–Wednesday 09:00–19:30, Thursday–Friday 09:00–20:00, Saturday 08:30–18:30, Sunday 10:00–17:30.",
  },
  {
    question: "Do you take card payments?",
    answer:
      "Yes — card payments are accepted, and the shop is wheelchair accessible and child friendly.",
  },
] as const;

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

/** Shared per-page metadata with consistent OG + Twitter cards. */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageSeoInput): Metadata {
  const images = image ? [{ url: image, alt: title }] : [ogImage];
  const socialTitle =
    path === "/" ? title : `${title} | ${business.name}`;

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...openGraph,
      title: socialTitle,
      description,
      url: path,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [images[0]?.url ?? ogImage.url],
    },
  };
}

export const rootMetadataExtras: Pick<
  Metadata,
  "keywords" | "authors" | "creator" | "publisher" | "twitter" | "category"
> = {
  keywords: [
    "barber Kenilworth",
    "haircut Kenilworth",
    "skin fade Kenilworth",
    "barber Common Lane",
    "Beard trim Kenilworth",
    "Barber Omer",
  ],
  authors: [{ name: business.name, url: siteUrl }],
  creator: business.name,
  publisher: business.name,
  category: "Barber shop",
  twitter: {
    card: "summary_large_image",
    title: openGraph.title,
    description: openGraph.description,
    images: [ogImage.url],
  },
};
