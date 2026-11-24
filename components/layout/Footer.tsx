import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { site, telHref } from "@/lib/site";
import { services } from "@/content/services";
import { industries } from "@/content/industries";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy-950 pb-24 text-blue-100/75 md:pb-0">
      <div className="absolute inset-0 bg-dots opacity-60" aria-hidden />
      <div className="container-x relative grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo dark />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed">
            A family-owned, US-based sourcing and procurement company helping American organizations buy directly from
            trusted international manufacturers.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-gold" aria-hidden />{site.contact.address ?? site.contact.region}</li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-gold" aria-hidden />
              {site.contact.email ? <a className="hover:text-white" href={`mailto:${site.contact.email}`}>{site.contact.email}</a> : <Link className="hover:text-white" href="/contact">Send us a message</Link>}
            </li>
            {site.contact.phone && (
              <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-gold" aria-hidden /><a className="hover:text-white" href={telHref(site.contact.phone)}>{site.contact.phone}</a></li>
            )}
          </ul>
        </div>

        <FooterCol title="Services" className="lg:col-span-3"
          links={services.map((s) => ({ label: s.title, href: `/services#${s.slug}` }))} />
        <FooterCol title="Industries" className="lg:col-span-2"
          links={industries.map((i) => ({ label: i.title, href: `/industries#${i.slug}` }))} />
        <FooterCol title="Company" className="lg:col-span-3"
          links={[
            { label: "About Us", href: "/about" },
            { label: "How It Works", href: "/how-it-works" },
            { label: "Product Categories", href: "/products" },
            { label: "Request a Quote", href: "/request-a-quote" },
            { label: "Contact Us", href: "/contact" },
          ]} />
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name} All rights reserved. Headquartered in Illinois, USA.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
            <a href="/sitemap.xml" className="hover:text-white">Sitemap</a>
          </div>
        </div>
        <p className="container-x pb-6 text-[11px] leading-relaxed text-blue-100/45">
          Nour Trading Inc. is not a licensed customs broker, freight forwarder, NVOCC, or ocean carrier. Customs brokerage and
          freight transportation are performed by appropriately licensed third-party partners and coordinated by Nour Trading on
          the customer’s behalf.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, className = "" }: { title: string; links: { label: string; href: string }[]; className?: string }) {
  return (
    <div className={className}>
      <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white">{title}</h2>
      <span className="mt-3 block h-px w-8 bg-gold" />
      <ul className="mt-5 space-y-3 text-[14.5px]">
        {links.map((l) => (
          <li key={l.href}><Link href={l.href} className="transition-colors hover:text-white">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
