import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "gold" | "navy" | "outline" | "outline-light" | "link";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap";
const variants: Record<Variant, string> = {
  gold: "bg-gold text-navy-950 shadow-[0_8px_24px_-10px_rgba(201,162,77,0.8)] hover:bg-gold-light hover:-translate-y-0.5",
  navy: "bg-navy text-white hover:bg-corporate hover:-translate-y-0.5 shadow-card",
  outline: "border border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-white",
  "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white hover:text-navy",
  link: "text-corporate hover:text-navy px-0! py-0! rounded-none",
};
const sizes: Record<Size, string> = { md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-[15px]" };

export function buttonClasses(variant: Variant = "gold", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

export function ButtonLink({
  href,
  children,
  variant = "gold",
  size = "md",
  arrow = false,
  className = "",
  ...rest
}: { href: string; children: ReactNode; variant?: Variant; size?: Size; arrow?: boolean; className?: string } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className"
>) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
      {arrow && <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
    </Link>
  );
}
