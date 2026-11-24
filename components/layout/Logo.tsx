import Image from "next/image";
import Link from "next/link";

export function Logo({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Nour Trading Inc. — Home" className={`group flex items-center gap-3 ${className}`}>
      <span className={`relative flex shrink-0 items-center justify-center ${dark ? "h-12 w-14 rounded-xl bg-white p-1.5" : "h-11 w-[52px]"}`}>
        <Image src="/brand/nour-mark.png" alt="" width={640} height={538} priority className="h-full w-full object-contain" />
      </span>
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className="font-display text-[19px] font-extrabold tracking-tight sm:text-xl">
          <span className={dark ? "text-white" : "text-navy"}>Nour</span>{" "}
          <span className="text-gold-dark [text-shadow:none]" style={dark ? { color: "#E2C27A" } : undefined}>Trading</span>
          <span className={`ml-1 text-[11px] font-bold ${dark ? "text-blue-100/70" : "text-navy/60"}`}>INC.</span>
        </span>
        <span className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${dark ? "text-blue-100/60" : "text-slate-text/80"}`}>
          From Factory to Your Door
        </span>
      </span>
    </Link>
  );
}
