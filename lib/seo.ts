import type { Metadata } from "next";
import { site, absoluteUrl } from "./site";

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.shortName}`,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      images: [{ url: absoluteUrl("/og-image.png"), width: 1200, height: 630, alt: "Nour Trading Inc. — Global Sourcing Made Simple" }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.shortName}`, description, images: [absoluteUrl("/og-image.png")] },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: absoluteUrl("/brand/nour-logo-full.png"),
  slogan: site.slogan,
  description: site.description,
  address: { "@type": "PostalAddress", addressRegion: "IL", addressCountry: "US" },
  areaServed: { "@type": "Country", name: "United States" },
  knowsAbout: ["Global sourcing", "Procurement", "China sourcing", "Quality control coordination", "Import management", "OEM manufacturing", "Private label manufacturing"],
  ...(site.contact.email ? { email: site.contact.email } : {}),
  ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}
