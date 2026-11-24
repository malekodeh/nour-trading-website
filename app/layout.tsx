import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileQuoteBar } from "@/components/layout/MobileQuoteBar";
import { JsonLd } from "@/components/sections/JsonLd";
import { site } from "@/lib/site";
import { organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Nour Trading Inc. | China Sourcing & Procurement Company in Illinois, USA",
    template: "%s | Nour Trading Inc.",
  },
  description: site.description,
  applicationName: site.shortName,
  authors: [{ name: site.name }],
  keywords: [
    "China sourcing agent USA", "global sourcing company Illinois", "product sourcing from China", "import management services USA",
    "China to USA procurement company", "wholesale products from China", "custom manufacturing China", "door-to-door sourcing solutions",
    "school furniture sourcing", "custom packaging manufacturing",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Nour Trading Inc. — Global Sourcing Made Simple" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#102D57", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={organizationJsonLd} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileQuoteBar />
      </body>
    </html>
  );
}
