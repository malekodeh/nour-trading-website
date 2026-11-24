import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { BrandVisual } from "@/components/ui/BrandVisual";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/sections/JsonLd";
import { productCategories } from "@/content/products";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Product Categories — Custom & Wholesale Products from China",
  description:
    "Source school furniture, backpacks and bags, non-woven tote bags, custom packaging, promotional merchandise, office furniture, commercial equipment, and electronics directly from manufacturers.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Products", path: "/products" }])} />
      <PageHero
        eyebrow="Product Categories"
        title="Products we help you source."
        intro="Every order is quoted individually based on your specifications, quantities, customization, and delivery location. Don’t see your product? We source well beyond these categories."
        crumbs={[{ label: "Products" }]}
      />
      <section className="container-x py-20 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 4) * 0.05}>
              <Link href={`/products/${c.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-lift">
                <BrandVisual slot={c.visual} icon={c.icon} src={c.image ?? undefined} tone="light" className="aspect-[4/3]" sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2.5"><c.icon className="h-5 w-5 text-gold" strokeWidth={1.7} /><h2 className="text-lg font-bold">{c.name}</h2></div>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-slate-text">{c.summary}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
                    <span className="text-slate-text/80">{c.customization.length} customization options</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-corporate group-hover:text-navy">View <ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-slate-text">Pricing is provided by custom quotation only. Minimum order quantities vary by product and manufacturer and are confirmed during quoting.</p>
      </section>
      <CtaBand title="Looking for something else?" text="Describe the product you need — with photos or specifications if you have them — and we’ll research manufacturing options for you." button="Request a Custom Product Quote" />
    </>
  );
}
