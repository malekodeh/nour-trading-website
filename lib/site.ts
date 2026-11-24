/**
 * Central site configuration.
 * Update contact details here once confirmed — every page reads from this file.
 * Values set to `null` render as a tasteful "coming soon" state instead of fake data.
 */
export const site = {
  name: "NOUR TRADING INC.",
  shortName: "Nour Trading",
  slogan: "From Factory to Your Door.",
  tagline: "Your Trusted Partner in Global Sourcing, Procurement & Supply Chain Solutions.",
  description:
    "Nour Trading Inc. is a family-owned, Illinois-based global sourcing and procurement company helping US organizations buy directly from vetted manufacturers in China — with quality control, shipping coordination, customs clearance through licensed partners, and final delivery.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://nourtrading.com").replace(/\/$/, ""),
  locale: "en_US",

  contact: {
    email: "nourtradingusa@gmail.com" as string | null, // switch to a @nourtrading.com address once email routing is set up
    phone: "(708) 307-5768" as string | null,
    address: null as string | null, // Office address — TO BE CONFIRMED (do not publish a residential address)
    region: "Illinois, United States",
    hours: null as string | null, // e.g. "Monday – Friday, 9:00 AM – 5:00 PM CT" — TO BE CONFIRMED
  },

  social: {
    linkedin: null as string | null,
  },
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
] as const;

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** US phone number → tel: link with country code, e.g. tel:+17083075768 */
export function telHref(phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  return `tel:+1${digits}`;
}
