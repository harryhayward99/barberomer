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
import "@fontsource/sora/600.css";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Barber Omer | Barber in Kenilworth — Sharp cuts, fair prices",
    template: "%s | Barber Omer",
  },
  description:
    "Barber in Kenilworth at 40 Common Lane. Skin fades, haircuts and beard work since 2015. Call 07305 421210 or book online.",
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
