"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MessageSquareText } from "lucide-react";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-[0_1px_0_rgba(16,45,87,0.08),0_10px_30px_-20px_rgba(16,45,87,0.35)] backdrop-blur-md" : "bg-white"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div className="container-x flex h-[76px] items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative whitespace-nowrap rounded-full px-3 py-2 text-[14.5px] font-medium transition-colors ${
                isActive(item.href) ? "text-navy" : "text-slate-text hover:text-navy"
              }`}
            >
              {item.label}
              {isActive(item.href) && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold" />}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <span className="hidden xl:inline-flex">
            <ButtonLink href="/contact" variant="outline">Talk to a Specialist</ButtonLink>
          </span>
          <ButtonLink href="/request-a-quote" variant="gold" arrow>
            Request a Quote
          </ButtonLink>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[76px] bottom-0 overflow-y-auto border-t border-line bg-white xl:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex flex-col py-4">
              <Link href="/" className="border-b border-line py-4 text-lg font-semibold text-navy">Home</Link>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-center justify-between border-b border-line py-4 text-lg font-semibold text-navy"
                >
                  {item.label}
                  {isActive(item.href) && <span className="h-2 w-2 rounded-full bg-gold" />}
                </Link>
              ))}
              <div className="mt-6 grid gap-3">
                <ButtonLink href="/request-a-quote" size="lg" arrow>Request a Quote</ButtonLink>
                <ButtonLink href="/contact" size="lg" variant="outline">
                  <MessageSquareText className="h-4 w-4" /> Talk to a Sourcing Specialist
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
