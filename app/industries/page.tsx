import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { BrandVisual } from "@/components/ui/BrandVisual";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/sections/JsonLd";
import { industries } from "@/content/industries";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Industries We Serve — Schools, Restaurants, Retail, Events & More",
  description:
    "Sourcing and procurement for schools, restaurants, retailers and wholesalers, corporate offices, events and nonprofits, and electronics and private-label brands across the United States.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Industries", path: "/industries" }])} />
      <PageHero
        eyebrow="Industries We Serve"
        title="Sourcing expertise for the organizations that keep America running."
        intro="Each industry has its own products, standards, and timelines. We tailor sourcing, customization, and delivery to the way your organization buys."
        crumbs={[{ label: "Industries" }]}
      >
        <div className="flex flex-wrap gap-2">
          {industries.map((ind) => (
            <Link key={ind.slug} href={`#${ind.slug}`} className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:border-gold hover:bg-white/5">
              <ind.icon className="h-4 w-4 text-gold-light" />{ind.title}
            </Link>
          ))}
        </div>
      </PageHero>

      <div className="container-x space-y-8 py-20 sm:space-y-10 sm:py-24">
        {industries.map((ind, i) => (
          <Reveal key={ind.slug}>
            <section id={ind.slug} aria-labelledby={`${ind.slug}-t`} className="grid overflow-hidden rounded-[28px] border border-line bg-white shadow-card lg:grid-cols-5">
              <BrandVisual slot={ind.visual} className={`min-h-[240px] lg:col-span-2 ${i % 2 ? "lg:order-2" : ""}`} sizes="(min-width:1024px) 40vw, 100vw" />
              <div className="p-8 sm:p-10 lg:col-span-3 lg:p-12">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-gold-light"><ind.icon className="h-5 w-5" strokeWidth={1.7} /></span>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold-dark">Industry</span>
                </div>
                <h2 id={`${ind.slug}-t`} className="mt-4 text-2xl font-bold sm:text-3xl">{ind.title}</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-slate-text">{ind.description}</p>
                <h3 className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-slate-text/70">Common products</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {ind.products.map((p) => (
                    <li key={p} className="rounded-full bg-mist px-3.5 py-1.5 text-sm font-medium text-navy">{p}</li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ButtonLink href={`/request-a-quote?category=${encodeURIComponent(ind.quoteCategory)}&industry=${ind.slug}`} variant="gold" arrow>Request a Quote</ButtonLink>
                </div>
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <CtaBand title="Don’t see your industry?" text="If your organization buys products in volume, we can likely help. Tell us what you need and we’ll explore sourcing options together." button="Tell Us What You Need" />
    </>
  );
}
