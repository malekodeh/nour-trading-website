import type { LucideIcon } from "lucide-react";
import { School, Backpack, ShoppingBag, Package, Gift, Armchair, ChefHat, MonitorSmartphone } from "lucide-react";
import type { VisualKey } from "./images";

/**
 * PRODUCT CATALOG
 * ---------------
 * To add a category: copy an entry, give it a unique `slug`, and it will automatically
 * appear on /products, get its own page at /products/[slug], be added to the sitemap,
 * and show up in the quote-form category list.
 *
 * `moq` — leave as null until a minimum order quantity is CONFIRMED with the manufacturer.
 * Never publish manufacturer purchase prices here.
 */
export type ProductCategory = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  examples: string[];
  customization: string[];
  moq: string | null;
  icon: LucideIcon;
  visual: VisualKey;
  image?: string | null; // optional per-category photo, e.g. "/images/products/school-furniture.jpg"
};

export const productCategories: ProductCategory[] = [
  {
    slug: "school-furniture",
    name: "School Furniture",
    summary: "Student desks, chairs, lockers, and storage built for daily classroom use.",
    description:
      "Classroom furniture sourced to your specifications — sizes, materials, colors, and finishes — with sample approval before bulk production and delivery planned around your school calendar.",
    examples: ["Student desks", "Classroom chairs", "Teacher desks", "Lockers", "Storage cabinets", "Library and activity tables"],
    customization: ["Dimensions and height ranges", "Colors and finishes", "Material selection", "Logo or school branding", "Flat-pack or assembled"],
    moq: null,
    icon: School,
    visual: "education",
  },
  {
    slug: "backpacks-bags",
    name: "Backpacks & Bags",
    summary: "Student backpacks, duffels, and branded bags for schools, teams, and retail.",
    description:
      "Backpacks and bags customized with your colors and logo, in fabrics and constructions suited to how they will be used.",
    examples: ["Student backpacks", "Laptop bags", "Duffel bags", "Drawstring bags", "Cooler bags"],
    customization: ["Fabric and color", "Embroidered or printed logos", "Compartment layout", "Zippers and hardware", "Custom labels and tags"],
    moq: null,
    icon: Backpack,
    visual: "retail",
  },
  {
    slug: "non-woven-tote-bags",
    name: "Non-Woven Tote Bags",
    summary: "Reusable, cost-effective tote bags for events, retail, and promotions.",
    description:
      "Non-woven tote bags are a practical, reusable choice for conventions, grocery and retail, and community programs. We coordinate size, material weight, and printing to suit your purpose.",
    examples: ["Convention tote bags", "Grocery and shopping totes", "Gusseted totes", "Laminated totes"],
    customization: ["Size and gusset", "Material weight (GSM)", "Color", "Screen or full-color printing", "Handle style"],
    moq: null,
    icon: ShoppingBag,
    visual: "events",
  },
  {
    slug: "custom-packaging",
    name: "Custom Packaging",
    summary: "Branded boxes, bags, and food-service packaging that present your products well.",
    description:
      "Packaging that protects your products and represents your brand — from printed retail boxes to restaurant take-out bags.",
    examples: ["Printed retail boxes", "Mailer boxes", "Paper and plastic carry bags", "Food-service packaging", "Inserts and labels"],
    customization: ["Structure and dimensions", "Printing and finishes", "Materials", "Inserts", "Branded labels"],
    moq: null,
    icon: Package,
    visual: "privateLabel",
  },
  {
    slug: "promotional-merchandise",
    name: "Promotional Merchandise",
    summary: "Branded giveaways and merchandise for marketing, events, and teams.",
    description:
      "Branded merchandise that people actually keep — sourced in volume with consistent logo reproduction and coordinated delivery for your campaign or event date.",
    examples: ["Lanyards and badges", "Drinkware", "Apparel accessories", "Desk and tech accessories", "Event giveaways"],
    customization: ["Logo printing or engraving", "Pantone color matching", "Individual packaging", "Custom inserts"],
    moq: null,
    icon: Gift,
    visual: "events",
  },
  {
    slug: "office-furniture",
    name: "Office Furniture",
    summary: "Desks, seating, and storage for offices and commercial spaces.",
    description:
      "Office furniture for new fit-outs and expansions — workstations, task seating, meeting tables, and storage — sourced to your layout and finish requirements.",
    examples: ["Workstations", "Task and executive chairs", "Meeting tables", "Storage and filing", "Reception furniture"],
    customization: ["Finishes and upholstery", "Dimensions", "Configurations", "Cable management options"],
    moq: null,
    icon: Armchair,
    visual: "corporate",
  },
  {
    slug: "commercial-equipment",
    name: "Commercial Equipment",
    summary: "Equipment and supplies for restaurants, retail, and commercial facilities.",
    description:
      "Commercial equipment and fixtures for food service, retail, and facilities, sourced with attention to specifications, documentation, and applicable product requirements.",
    examples: ["Food-service equipment", "Shelving and display fixtures", "Carts and storage", "Facility supplies"],
    customization: ["Specifications and sizes", "Materials", "Branding", "Voltage and plug type (where applicable)"],
    moq: null,
    icon: ChefHat,
    visual: "restaurant",
  },
  {
    slug: "electronics-digital-devices",
    name: "Electronics & Digital Devices",
    summary: "Digital displays, interactive devices, and private-label electronics.",
    description:
      "Customized electronics and digital devices — from interactive displays to private-label products — with sampling, testing documentation, and compliance considerations coordinated with the manufacturer.",
    examples: ["Digital signage displays", "Interactive panels", "Kiosks", "Private-label consumer electronics", "Accessories"],
    customization: ["Branding and enclosure color", "Screen size and specifications", "Software / UI customization", "Packaging and manuals"],
    moq: null,
    icon: MonitorSmartphone,
    visual: "electronics",
  },
];

export const productCategoryNames = productCategories.map((c) => c.name);
