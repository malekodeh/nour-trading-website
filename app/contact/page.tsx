import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock3, FileText } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/sections/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us — Talk to a Sourcing Specialist",
  description: "Contact Nour Trading Inc., an Illinois-based global sourcing and procurement company. Send us a message or request a quote for your next sourcing project.",
  path: "/contact",
});

export default function ContactPage() {
  const c = site.contact;
  const cards = [
    { icon: Mail, title: "Email", value: c.email, href: c.email ? `mailto:${c.email}` : undefined, fallback: "Email address coming soon — please use the form" },
    { icon: Phone, title: "Phone", value: c.phone, href: c.phone ? telHref(c.phone) : undefined, fallback: "Phone number coming soon" },
    { icon: MapPin, title: "Headquarters", value: c.address ?? c.region, fallback: c.region },
    { icon: Clock3, title: "Business Hours", value: c.hours, fallback: "Monday – Friday · hours to be announced" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      <PageHero eyebrow="Contact Us" title="Talk to a sourcing specialist." intro="Have a question, a project in mind, or want to explore whether overseas sourcing makes sense for you? We’d be glad to hear from you." crumbs={[{ label: "Contact" }]} />

      <section className="container-x -mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.title} className="relative rounded-2xl border border-line bg-white p-6 shadow-card">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-gold-light"><card.icon className="h-5 w-5" /></span>
            <h2 className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-text/80">{card.title}</h2>
            {card.value && card.href ? (
              <a href={card.href} className="mt-1 block font-semibold text-navy hover:text-corporate">{card.value}</a>
            ) : (
              <p className={`mt-1 ${card.value ? "font-semibold text-navy" : "text-[15px] text-slate-text"}`}>{card.value ?? card.fallback}</p>
            )}
          </div>
        ))}
      </section>

      <section className="container-x grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Business inquiry</h2>
          <p className="mt-2 text-slate-text">For detailed sourcing requests with specifications and files, please use our <a href="/request-a-quote" className="font-medium text-corporate underline">quote request form</a>.</p>
          <div className="mt-8"><ContactForm /></div>
        </div>
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-line">
            {/* Google Maps placeholder — replace with an <iframe> embed once the office address is confirmed. */}
            <div className="relative flex aspect-[4/3] items-center justify-center bg-navy">
              <div className="absolute inset-0 bg-dots" aria-hidden />
              <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full opacity-20" aria-hidden>
                <path d="M60 20 L140 20 L145 40 L150 120 L120 135 L70 130 L55 60 Z" fill="none" stroke="#fff" strokeWidth="1" />
              </svg>
              <div className="relative text-center text-white">
                <MapPin className="mx-auto h-9 w-9 text-gold" />
                <p className="mt-3 font-display text-lg font-bold">Illinois, USA</p>
                <p className="mt-1 text-sm text-blue-100/70">Office location map coming soon</p>
              </div>
            </div>
            <div className="bg-white p-6">
              <h2 className="font-display text-lg font-bold">Office location</h2>
              <p className="mt-1 text-[15px] text-slate-text">{c.address ?? "NOUR TRADING INC. is headquartered in Illinois. Meetings are available by appointment."}</p>
            </div>
          </div>
          <div className="rounded-3xl bg-mist p-7">
            <FileText className="h-7 w-7 text-gold" />
            <h2 className="mt-3 font-display text-lg font-bold">Ready with a product in mind?</h2>
            <p className="mt-1 text-[15px] text-slate-text">Skip ahead and send us your specifications for a custom quotation.</p>
            <div className="mt-5"><ButtonLink href="/request-a-quote" arrow>Request a Quote</ButtonLink></div>
          </div>
        </div>
      </section>
    </>
  );
}
