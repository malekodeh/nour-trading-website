import type { Metadata } from "next";
import Link from "next/link";
import { Check, Info, Layers, Boxes } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { BrandVisual } from "@/components/ui/BrandVisual";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/sections/JsonLd";
import { services } from "@/content/services";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { site, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Sourcing, Quality Control & Import Management Services",
  description:
    "Global product sourcing, OEM & private label manufacturing, factory verification and quality control, international shipping coordination, customs and import management, and end-to-end procurement from China to the USA.",
  path: "/services",
});

export default function ServicesPage() {
  const serviceLd = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.intro,
    serviceType: s.title,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    url: absoluteUrl(`/services#${s.slug}`),
  }));

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Services", path: "/services" }]), ...serviceLd]} />
      <PageHero
        eyebrow="Our Services"
        title="End-to-end sourcing and procurement, built around your needs."
        intro="From finding the right manufacturer to delivering finished goods to your facility, Nour Trading coordinates every step through one point of contact."
        crumbs={[{ label: "Services" }]}
      >
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <Link key={s.slug} href={`#${s.slug}`} className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:border-gold hover:bg-white/5">
              {s.title}
            </Link>
          ))}
        </div>
      </PageHero>

      <section className="container-x py-16">
        <Reveal>
          <div className="grid gap-4 rounded-3xl border border-line bg-mist p-6 sm:p-8 md:grid-cols-2">
            <div className="flex gap-4">
              <Layers className="h-8 w-8 shrink-0 text-gold" strokeWidth={1.5} />
              <div><h2 className="text-lg font-bold">Individual services</h2><p className="mt-1 text-[15px] text-slate-text">Already have a supplier but need inspections? Need help with freight and import paperwork only? Engage us for the specific service you need.</p></div>
            </div>
            <div className="flex gap-4">
              <Boxes className="h-8 w-8 shrink-0 text-gold" strokeWidth={1.5} />
              <div><h2 className="text-lg font-bold">Complete project management</h2><p className="mt-1 text-[15px] text-slate-text">Prefer to hand off the whole process? We manage your procurement project from requirements to final delivery.</p></div>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="container-x space-y-20 pb-8 sm:space-y-28">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-title`} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className={i % 2 ? "lg:order-2" : ""}>
              <div className="relative">
                <BrandVisual slot={s.visual} className="aspect-[4/3] rounded-[28px]" />
                <span className="absolute -top-5 left-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold font-display text-2xl font-extrabold text-navy-950 shadow-lift">{s.letter}</span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex items-center gap-3 text-gold-dark"><s.icon className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-[0.18em]">Service {s.letter}</span></div>
              <h2 id={`${s.slug}-title`} className="mt-3 text-3xl font-bold sm:text-4xl">{s.title}</h2>
              <p className="mt-5 text-[17px] leading-relaxed text-slate-text">{s.intro}</p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15px] font-medium text-navy"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy"><Check className="h-3 w-3 text-gold-light" strokeWidth={3} /></span>{p}</li>
                ))}
              </ul>
              {s.note && (
                <p className="mt-6 flex gap-2.5 rounded-xl bg-mist p-4 text-[13.5px] leading-relaxed text-slate-text"><Info className="mt-0.5 h-4 w-4 shrink-0 text-corporate" />{s.note}</p>
              )}
              <div className="mt-8"><ButtonLink href={`/request-a-quote?service=${s.slug}`} variant="navy" arrow>Request a Quote</ButtonLink></div>
            </Reveal>
          </section>
        ))}
      </div>

      <CtaBand />
    </>
  );
}
