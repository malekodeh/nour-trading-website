import type { LucideIcon } from "lucide-react";
import { ClipboardList, SearchCheck, FileText, Factory, Ship, Truck } from "lucide-react";

export type ProcessStep = {
  n: number;
  title: string;
  short: string;
  detail: string;
  youProvide?: string[];
  weHandle: string[];
  icon: LucideIcon;
};

export const processSteps: ProcessStep[] = [
  {
    n: 1,
    title: "Tell Us What You Need",
    short: "Submit Your Requirements",
    detail:
      "Share product descriptions, specifications, estimated quantities, target timing, and your delivery location. Photos, drawings, or reference products are welcome.",
    youProvide: ["Product details or samples", "Estimated quantity", "Delivery location and timing"],
    weHandle: ["Requirements review", "Clarifying questions", "Feasibility check"],
    icon: ClipboardList,
  },
  {
    n: 2,
    title: "Supplier Sourcing",
    short: "Supplier Sourcing & Verification",
    detail:
      "We identify and evaluate suitable manufacturing options, review supplier backgrounds, and compare capabilities, lead times, and pricing.",
    weHandle: ["Manufacturer research", "Supplier due diligence", "Option comparison"],
    icon: SearchCheck,
  },
  {
    n: 3,
    title: "Review Your Quotation",
    short: "Quotation & Approval",
    detail:
      "You receive a clear proposal covering products, applicable costs, estimated duties, shipping, and delivery arrangements — with defined responsibilities and terms.",
    youProvide: ["Quotation approval", "Sample feedback"],
    weHandle: ["Itemized proposal", "Sample coordination", "Purchase order preparation"],
    icon: FileText,
  },
  {
    n: 4,
    title: "Production & Quality Control",
    short: "Production & Quality Control",
    detail:
      "Manufacturing, pre-production sample approvals, production schedules, and inspections are coordinated, with updates shared at key milestones.",
    weHandle: ["Production scheduling", "Progress updates", "Pre-shipment inspection coordination"],
    icon: Factory,
  },
  {
    n: 5,
    title: "International Shipping",
    short: "International Shipping & Customs",
    detail:
      "We coordinate ocean or air freight and customs brokerage through qualified, licensed service providers, and organize the import documentation.",
    weHandle: ["Freight booking coordination", "Import documentation", "Customs clearance via licensed broker"],
    icon: Ship,
  },
  {
    n: 6,
    title: "Final Delivery",
    short: "Final Delivery",
    detail:
      "Goods are delivered to the agreed destination — your school, store, warehouse, or office — and we follow up to confirm everything arrived as expected.",
    weHandle: ["Domestic delivery coordination", "Delivery confirmation", "Post-delivery follow-up"],
    icon: Truck,
  },
];
