import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Paintbrush, PackageSearch, ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { BrandVisual } from "@/components/ui/BrandVisual";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/sections/JsonLd";
import { productCategories } from "@/content/products";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return productCategories.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = productCategories.find((x) => x.slug === slug);
  if (!c) return {};
  return pageMetadata({
    title: `${c.name} Sourcing from China`,
    description: `${c.summary} Custom ${c.name.toLowerCase()} sourced directly from manufacturers with quality control and delivery coordinated by Nour Trading.`,
    path: `/products/${c.slug}`,
  });
}

export default async function ProductCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = productCategories.find((x) => x.slug === slug);
  if (!c) notFound();
  const others = productCategories.filter((x) => x.slug !== c.slug).slice(0, 4);
  const quoteHref = `/request-a-quote?category=${encodeURIComponent(c.name)}`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Products", path: "/products" }, { name: c.name, path: `/products/${c.slug}` }])} />
      <PageHero eyebrow="Product Category" title={c.name} intro={c.summary} crumbs={[{ label: "Products", href: "/products" }, { label: c.name }]}>
        <ButtonLink href={quoteHref} size="lg" arrow>Request a Quote for {c.name}</ButtonLink>
      </PageHero>

      <section className="container-x grid gap-12 py-20 sm:py-24 lg:grid-cols-2">
        <Reveal><BrandVisual slot={c.visual} icon={c.icon} src={c.image ?? undefined} className="aspect-[4/3] rounded-[28px]" priority /></Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-3xl font-bold">Overview</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-slate-text">{c.description}</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-navy"><PackageSearch className="h-4 w-4 text-gold" />Typical products</h3>
              <ul className="mt-3 space-y-2">
                {c.examples.map((e) => <li key={e} className="flex items-start gap-2 text-[15px] text-slate-text"><Check className="mt-0.5 h-4 w-4 shrink-0 text-corporate" />{e}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-navy"><Paintbrush className="h-4 w-4 text-gold" />Customization options</h3>
              <ul className="mt-3 space-y-2">
                {c.customization.map((e) => <li key={e} className="flex items-start gap-2 text-[15px] text-slate-text"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{e}</li>)}
              </ul>
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 rounded-2xl bg-mist p-5 text-sm">
            <div><dt className="text-slate-text/80">Pricing</dt><dd className="mt-1 font-semibold text-navy">Custom quotation</dd></div>
            <div><dt className="text-slate-text/80">Minimum order quantity</dt><dd className="mt-1 font-semibold text-navy">{c.moq ?? "Confirmed during quoting"}</dd></div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={quoteHref} variant="gold" arrow>Request a Quote</ButtonLink>
            <ButtonLink href="/contact" variant="outline">Talk to a Sourcing Specialist</ButtonLink>
          </div>
        </Reveal>
      </section>

      <section className="bg-mist py-16">
        <div className="container-x">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Other categories</h2>
            <Link href="/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-corporate hover:text-navy"><ArrowLeft className="h-4 w-4" />All products</Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link key={o.slug} href={`/products/${o.slug}`} className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card transition hover:shadow-lift">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-gold-light"><o.icon className="h-5 w-5" /></span>
                <span className="font-semibold text-navy group-hover:text-corporate">{o.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
