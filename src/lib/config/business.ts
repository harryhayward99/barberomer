export const business = {
  name: "Barber Omer",
  established: 2015,
  phoneDisplay: "07480 335904",
  phoneTel: "+447480335904",
  email: process.env.BUSINESS_EMAIL || "hello@barberomer.co.uk",
  address: {
    line1: "40 Common Lane",
    city: "Kenilworth",
    postcode: "CV8 2EQ",
    country: "United Kingdom",
  },
  bookingUrl: "https://api.leadconnectorhq.com/booking/barber-omer-%E2%80%94-kenilworth-hi9xnu0j1fi",
  instagram: "https://www.instagram.com/turkishhairmaster/",
  instagramHandle: "@turkishhairmaster",
  googleMapsQuery: "Barber Omer, 40 Common Lane, Kenilworth CV8 2EQ",
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Barber%20Omer%2040%20Common%20Lane%20Kenilworth%20CV8%202EQ",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=40%20Common%20Lane%2C%20Kenilworth%20CV8%202EQ",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=40%20Common%20Lane%2C%20Kenilworth%20CV8%202EQ&z=16&output=embed",
  amenities: [
    "Parking available",
    "Card payments accepted",
    "Wheelchair accessible",
    "Child friendly",
    "Wi-Fi available",
  ],
  rating: 4.9,
  timezone: "Europe/London",
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function formatAddress(separator = "\n") {
  const { line1, city, postcode } = business.address;
  return [line1, city, postcode].join(separator);
}

export function telHref() {
  return `tel:${business.phoneTel}`;
}
