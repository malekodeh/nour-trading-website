"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, MessageSquareText } from "lucide-react";

/** Sticky bottom action bar on phones so "Request a Quote" is always one tap away. */
export function MobileQuoteBar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/request-a-quote")) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 backdrop-blur md:hidden">
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <Link href="/request-a-quote" className="flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-semibold text-navy-950">
          <FileText className="h-4 w-4" /> Request a Free Quote
        </Link>
        <Link href="/contact" aria-label="Talk to a sourcing specialist" className="flex items-center justify-center rounded-full border border-navy/15 px-4 text-navy">
          <MessageSquareText className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
