import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookWidget } from "@/components/ui/BookWidget";
import { business } from "@/lib/config/business";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/sora/600.css";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Barber Omer | Modern barbering in Kenilworth",
    template: "%s | Barber Omer",
  },
  description:
    "Sharp cuts, fair prices and a friendly chair in the heart of Kenilworth. Call Omer on 07305 421210 or book online.",
  openGraph: {
    title: "Barber Omer | Sharp cuts. No fuss.",
    description:
      "Modern barbering at 40 Common Lane, Kenilworth. Great cuts, fair prices and a friendly atmosphere since 2015.",
    locale: "en_GB",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: business.name,
  telephone: business.phoneTel,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.line1,
    addressLocality: business.address.city,
    postalCode: business.address.postcode,
    addressCountry: "GB",
  },
  openingHours: [
    "Mo-We 09:00-19:30",
    "Th-Fr 09:00-20:00",
    "Sa 08:30-18:30",
    "Su 10:00-17:30",
  ],
  image: "/images/logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className="min-h-screen bg-cream text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <BookWidget />
      </body>
    </html>
  );
}
