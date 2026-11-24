/**
 * PHOTOGRAPHY SLOTS
 * -----------------
 * Every image area on the site is a named "slot". Until a real photo is provided,
 * the slot renders a branded navy illustration (see components/ui/BrandVisual.tsx).
 *
 * To add a photo:
 *   1. Put a licensed, high-resolution JPG/WebP in /public/images/ (≥ 1600px wide).
 *   2. Set the slot's `src` below, e.g. src: "/images/hero-port.jpg".
 *   3. Write a specific, descriptive `alt`.
 */
export type VisualKey =
  | "hero"
  | "manufacturing"
  | "privateLabel"
  | "quality"
  | "logistics"
  | "customs"
  | "delivery"
  | "warehouse"
  | "education"
  | "restaurant"
  | "retail"
  | "corporate"
  | "events"
  | "electronics"
  | "about";

export type ImageSlot = { src: string | null; alt: string };

export const images: Record<VisualKey, ImageSlot> = {
  hero: { src: null, alt: "Container ship being loaded at an international port" },
  manufacturing: { src: null, alt: "Modern factory production line" },
  privateLabel: { src: null, alt: "Custom branded product packaging samples" },
  quality: { src: null, alt: "Quality inspector checking finished products at a factory" },
  logistics: { src: null, alt: "Stacked shipping containers at a port terminal" },
  customs: { src: null, alt: "Import documents and shipment paperwork" },
  delivery: { src: null, alt: "Commercial delivery truck arriving at a US warehouse" },
  warehouse: { src: null, alt: "Organized warehouse with palletized goods" },
  education: { src: null, alt: "Modern classroom furniture with desks and chairs" },
  restaurant: { src: null, alt: "Branded restaurant take-out bags and food-service packaging" },
  retail: { src: null, alt: "Retail store shelves stocked with merchandise" },
  corporate: { src: null, alt: "Contemporary corporate office furniture" },
  events: { src: null, alt: "Convention tote bags, lanyards, and event badges" },
  electronics: { src: null, alt: "Interactive digital display and electronic devices" },
  about: { src: null, alt: "Nour Trading team reviewing product samples" },
};
