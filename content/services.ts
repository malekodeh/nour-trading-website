import type { LucideIcon } from "lucide-react";
import { Search, Tags, ShieldCheck, Ship, FileCheck2, Workflow } from "lucide-react";
import type { VisualKey } from "./images";

export type Service = {
  slug: string;
  letter: string;
  title: string;
  short: string;
  intro: string;
  icon: LucideIcon;
  visual: VisualKey;
  points: string[];
  note?: string;
};

export const services: Service[] = [
  {
    slug: "global-product-sourcing",
    letter: "A",
    title: "Global Product Sourcing",
    short: "Identify and compare qualified manufacturers that match your specifications, quantities, and budget.",
    intro:
      "We research the manufacturing landscape for your product, shortlist suitable factories, and present clear side-by-side options so you can make an informed decision — without spending weeks on supplier outreach yourself.",
    icon: Search,
    visual: "manufacturing",
    points: [
      "Manufacturer identification",
      "Factory research and background review",
      "Supplier comparison and shortlisting",
      "Product specification reviews",
      "Price negotiation support",
    ],
  },
  {
    slug: "oem-private-label",
    letter: "B",
    title: "OEM & Private Label Manufacturing",
    short: "Develop products and packaging under your own brand, from first sample to bulk production.",
    intro:
      "Whether you are refining an existing product or launching your own branded line, we coordinate development, customization, and sampling with the manufacturer so the finished goods carry your name and meet your standards.",
    icon: Tags,
    visual: "privateLabel",
    points: [
      "Custom product development",
      "Brand customization",
      "Logo printing and decoration",
      "Packaging development",
      "Sample coordination and approvals",
    ],
  },
  {
    slug: "factory-verification-quality-control",
    letter: "C",
    title: "Factory Verification & Quality Control",
    short: "Reduce supplier risk with due diligence, sample approvals, production monitoring, and inspections.",
    intro:
      "Quality is managed before, during, and after production. We coordinate supplier due diligence and arrange independent audits and inspections through qualified third-party providers, so issues are caught at the factory — not at your loading dock.",
    icon: ShieldCheck,
    visual: "quality",
    points: [
      "Supplier due diligence",
      "Factory audits through qualified providers",
      "Pre-production samples",
      "Production monitoring",
      "Pre-shipment inspections",
    ],
  },
  {
    slug: "international-shipping-logistics",
    letter: "D",
    title: "International Shipping & Logistics",
    short: "Ocean and air freight coordinated with qualified carriers and forwarders, door to door.",
    intro:
      "We coordinate the movement of your goods from the factory to your facility, working with qualified freight forwarders and carriers to select the right mode, consolidate cargo when it makes sense, and keep you informed along the way.",
    icon: Ship,
    visual: "logistics",
    points: [
      "Ocean freight coordination",
      "Air freight coordination",
      "Full-container-load shipments (FCL)",
      "Less-than-container-load shipments (LCL)",
      "Shipment consolidation",
      "Door-to-door delivery coordination",
    ],
    note: "Freight transportation is performed by licensed carriers and freight forwarders. Nour Trading coordinates these services on your behalf.",
  },
  {
    slug: "customs-import-management",
    letter: "E",
    title: "Customs & Import Management",
    short: "Import documentation, duty estimates, and customs clearance coordinated through licensed brokers.",
    intro:
      "Importing involves classification, documentation, duties, and bonds. We organize the paperwork and work alongside licensed customs brokers so your shipment is prepared for clearance and you understand the expected costs in advance.",
    icon: FileCheck2,
    visual: "customs",
    points: [
      "HTS classification review coordination",
      "Customs brokerage through licensed partners",
      "Import documentation coordination",
      "Tariff and duty estimates",
      "Customs bond arrangements",
      "Import compliance coordination",
    ],
    note: "Nour Trading is not a licensed customs broker. Customs entries are filed by licensed customs brokers; duty estimates are provided for planning and final amounts are determined by U.S. Customs and Border Protection.",
  },
  {
    slug: "end-to-end-procurement",
    letter: "F",
    title: "End-to-End Procurement Management",
    short: "One point of contact managing purchase orders, suppliers, schedules, inspections, and delivery.",
    intro:
      "For organizations that want the entire process handled, we act as your procurement team — managing every supplier conversation, milestone, and handoff from purchase order to final delivery.",
    icon: Workflow,
    visual: "delivery",
    points: [
      "Purchase order management",
      "Vendor communications",
      "Production schedules",
      "Inspection coordination",
      "Freight coordination",
      "Final delivery tracking",
    ],
  },
];
