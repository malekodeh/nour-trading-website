import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { productCategories } from "@/content/products";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number][] = [
    ["/", 1], ["/services", 0.9], ["/request-a-quote", 0.9], ["/how-it-works", 0.8], ["/industries", 0.8],
    ["/products", 0.8], ["/about", 0.7], ["/contact", 0.7], ["/privacy-policy", 0.2], ["/terms", 0.2],
  ];
  return [
    ...pages.map(([p, priority]) => ({ url: absoluteUrl(p), lastModified: now, changeFrequency: "monthly" as const, priority })),
    ...productCategories.map((c) => ({ url: absoluteUrl(`/products/${c.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
