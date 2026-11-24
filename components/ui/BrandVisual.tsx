import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Ship, Container, Factory, Cog, ShieldCheck, ClipboardCheck, Truck, Warehouse, Tags, Package, Palette,
  FileCheck2, Stamp, Globe2, GraduationCap, School, UtensilsCrossed, ShoppingBag, Store, Building2, Armchair,
  CalendarDays, BadgeCheck, Cpu, MonitorSmartphone, Handshake, Users,
} from "lucide-react";
import { images, type VisualKey } from "@/content/images";

const scenes: Record<VisualKey, [LucideIcon, LucideIcon, LucideIcon]> = {
  hero: [Ship, Container, Globe2],
  manufacturing: [Factory, Cog, Package],
  privateLabel: [Tags, Palette, Package],
  quality: [ShieldCheck, ClipboardCheck, BadgeCheck],
  logistics: [Ship, Container, Globe2],
  customs: [FileCheck2, Stamp, Container],
  delivery: [Truck, Warehouse, Package],
  warehouse: [Warehouse, Package, Truck],
  education: [GraduationCap, School, Armchair],
  restaurant: [UtensilsCrossed, ShoppingBag, Package],
  retail: [Store, ShoppingBag, Tags],
  corporate: [Building2, Armchair, Handshake],
  events: [CalendarDays, BadgeCheck, ShoppingBag],
  electronics: [Cpu, MonitorSmartphone, Cog],
  about: [Handshake, Users, Globe2],
};

/**
 * Renders a real photo when one is configured in content/images.ts,
 * otherwise a refined branded illustration so layouts never look broken.
 */
export function BrandVisual({
  slot,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  src: srcOverride,
  tone = "navy",
  icon,
}: {
  slot: VisualKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  src?: string | null;
  tone?: "navy" | "light";
  /** Override the central icon (e.g. a product category icon). */
  icon?: LucideIcon;
}) {
  const img = images[slot];
  const pos = /(^|\s)absolute(\s|$)/.test(className) ? "" : "relative";
  const src = srcOverride ?? img.src;

  if (src) {
    return (
      <div className={`${pos} overflow-hidden ${className}`}>
        <Image src={src} alt={img.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  const [SceneMain, A, B] = scenes[slot];
  const Main = icon ?? SceneMain;
  const light = tone === "light";
  return (
    <div
      role="img"
      aria-label={img.alt}
      className={`${pos} isolate overflow-hidden ${
        light ? "bg-gradient-to-br from-mist to-white" : "bg-gradient-to-br from-navy via-navy-900 to-corporate"
      } ${className}`}
    >
      <div className={`absolute inset-0 ${light ? "bg-dots-navy" : "bg-dots"}`} />
      {/* soft light */}
      <div className={`absolute -right-1/4 -top-1/3 h-[120%] w-[80%] rounded-full blur-3xl ${light ? "bg-corporate/10" : "bg-corporate-light/30"}`} />
      {/* route arc */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <path d="M30 240 C 120 90, 280 90, 370 200" fill="none" stroke="#C9A24D" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="4 6" />
        <circle cx="30" cy="240" r="4" fill="#C9A24D" />
        <circle cx="370" cy="200" r="4" fill="#C9A24D" />
        <g stroke={light ? "#102D57" : "#ffffff"} strokeOpacity="0.07" fill="none">
          <circle cx="200" cy="150" r="70" /><circle cx="200" cy="150" r="110" /><circle cx="200" cy="150" r="150" />
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className={`flex h-24 w-24 items-center justify-center rounded-3xl border sm:h-28 sm:w-28 ${light ? "border-navy/10 bg-white shadow-card" : "border-white/15 bg-white/[0.06] backdrop-blur-sm"}`}>
            <Main aria-hidden className={`h-11 w-11 sm:h-12 sm:w-12 ${light ? "text-navy" : "text-white"}`} strokeWidth={1.3} />
          </div>
          <div className={`absolute -left-14 -top-8 flex h-12 w-12 items-center justify-center rounded-2xl border ${light ? "border-navy/10 bg-white" : "border-white/10 bg-white/[0.05]"}`}>
            <A aria-hidden className="h-5 w-5 text-gold" strokeWidth={1.5} />
          </div>
          <div className={`absolute -bottom-8 -right-14 flex h-12 w-12 items-center justify-center rounded-2xl border ${light ? "border-navy/10 bg-white" : "border-white/10 bg-white/[0.05]"}`}>
            <B aria-hidden className={`h-5 w-5 ${light ? "text-corporate" : "text-blue-100"}`} strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
  );
}
