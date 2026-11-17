import {
  buildLocalBusinessJsonLd,
  openGraph,
  rootMetadataExtras,
} from "@/lib/config/seo";
import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookWidget } from "@/components/ui/BookWidget";
import { siteUrl } from "@/lib/config/business";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Barber Omer | Modern Turkish barbering in Kenilworth",
    template: "%s | Barber Omer",
  },
  description:
    "Modern Turkish barbering at 40 Common Lane, Kenilworth. Precision haircuts, skin fades and traditional grooming. Call 07305 421210 or book online.",
  openGraph,
  ...rootMetadataExtras,
  alternates: { canonical: "/" },
};

const jsonLd = buildLocalBusinessJsonLd();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className="min-h-screen bg-cream pb-[calc(4.75rem+env(safe-area-inset-bottom))] text-ink antialiased sm:pb-0">
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
