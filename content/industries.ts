import type { LucideIcon } from "lucide-react";
import { GraduationCap, UtensilsCrossed, Store, Building2, CalendarDays, Cpu } from "lucide-react";
import type { VisualKey } from "./images";

export type Industry = {
  slug: string;
  title: string;
  short: string;
  description: string;
  products: string[];
  icon: LucideIcon;
  visual: VisualKey;
  quoteCategory: string;
};

export const industries: Industry[] = [
  {
    slug: "education",
    title: "Educational Institutions",
    short: "Durable classroom furniture, storage, and student supplies sourced for schools and districts.",
    description:
      "Schools need furniture and supplies that stand up to daily use, arrive before the term begins, and fit within approved budgets. We help schools, districts, and education organizations source classroom products directly from manufacturers, coordinate samples for review, and plan delivery around academic calendars.",
    products: ["School furniture", "Desks and chairs", "Lockers", "Storage cabinets", "Backpacks", "Classroom supplies"],
    icon: GraduationCap,
    visual: "education",
    quoteCategory: "School Furniture",
  },
  {
    slug: "restaurants",
    title: "Restaurants & Food Service",
    short: "Custom bags, packaging, and supplies for restaurants and food-service operators.",
    description:
      "From branded take-out bags to everyday restaurant supplies, food-service businesses buy in volume and reorder often. We help operators source custom-printed packaging and commercial items with consistent quality, so their brand looks the same on every order.",
    products: ["Custom bags", "Food-service packaging", "Restaurant supplies", "Commercial equipment"],
    icon: UtensilsCrossed,
    visual: "restaurant",
    quoteCategory: "Custom Packaging",
  },
  {
    slug: "retail-wholesale",
    title: "Retail & Wholesale",
    short: "Merchandise, branded bags, packaging, and bulk inventory for stores and distributors.",
    description:
      "Retailers and wholesale distributors compete on margin and product selection. We help you reach manufacturers directly for merchandise, custom packaging, and bulk inventory — with the sampling and inspection steps that protect your customer experience.",
    products: ["Merchandise", "Custom packaging", "Branded bags", "Bulk inventory"],
    icon: Store,
    visual: "retail",
    quoteCategory: "Promotional Merchandise",
  },
  {
    slug: "corporate",
    title: "Corporate & Commercial",
    short: "Office furniture, equipment, and branded products for businesses of every size.",
    description:
      "Whether you are furnishing a new office, equipping a facility, or ordering branded merchandise for your team and clients, we coordinate sourcing, customization, and delivery through a single point of contact.",
    products: ["Office furniture", "Equipment", "Promotional merchandise", "Custom products"],
    icon: Building2,
    visual: "corporate",
    quoteCategory: "Office Furniture",
  },
  {
    slug: "events",
    title: "Events & Organizations",
    short: "Convention bags, lanyards, badges, and giveaways for events, nonprofits, and associations.",
    description:
      "Events run on fixed dates. We help event organizers, convention operators, nonprofits, and associations source custom-branded event materials early, approve samples, and plan shipping to meet event timelines.",
    products: ["Convention bags", "Lanyards", "Badges", "Giveaways", "Printed materials", "Event merchandise"],
    icon: CalendarDays,
    visual: "events",
    quoteCategory: "Non-Woven Tote Bags",
  },
  {
    slug: "electronics",
    title: "Electronics & Private Label",
    short: "Customized electronics, digital displays, and private-label devices.",
    description:
      "For companies developing their own branded devices or sourcing specialized electronics, we coordinate manufacturer selection, customization, sampling, and the documentation that electronics imports typically require.",
    products: ["Customized electronic products", "Digital displays", "Interactive devices", "Private-label equipment"],
    icon: Cpu,
    visual: "electronics",
    quoteCategory: "Electronics & Digital Devices",
  },
];
