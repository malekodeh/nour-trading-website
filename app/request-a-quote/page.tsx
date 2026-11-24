import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock3, FileSearch, ShieldCheck, MessageSquareText } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { JsonLd } from "@/components/sections/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Request a Free Sourcing Quote",
  description:
    "Tell us what you need to source from China. Share product details, quantities, and delivery location, and Nour Trading will prepare a custom quotation covering manufacturing, shipping, duties, and delivery.",
  path: "/request-a-quote",
});

const next = [
  { icon: FileSearch, t: "We review your requirements", d: "A sourcing specialist reviews your details and follows up with any questions." },
  { icon: MessageSquareText, t: "We research options", d: "We identify suitable manufacturers and gather pricing and lead-time information." },
  { icon: Clock3, t: "You receive a proposal", d: "A clear quotation covering products, applicable costs, and delivery arrangements." },
];

export default function QuotePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Request a Quote", path: "/request-a-quote" }])} />
      <PageHero
        eyebrow="Request a Quote"
        title="Tell us what you need to source."
        intro="Share as much detail as you can — the more we know, the more accurate your quotation will be. There’s no cost or obligation to request a quote."
        crumbs={[{ label: "Request a Quote" }]}
      />
      <section className="bg-mist py-14 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_340px]">
          <Suspense fallback={<div className="h-[900px] animate-pulse rounded-3xl bg-white" />}>
            <QuoteForm />
          </Suspense>
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-navy p-7 text-white">
              <h2 className="font-display text-lg font-bold text-white">What happens next</h2>
              <ol className="mt-6 space-y-6">
                {next.map((n, i) => (
                  <li key={n.t} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy-950">{i + 1}</span>
                    <div><p className="font-semibold">{n.t}</p><p className="mt-1 text-sm text-blue-100/75">{n.d}</p></div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl border border-line bg-white p-7">
              <ShieldCheck className="h-7 w-7 text-gold" strokeWidth={1.6} />
              <h2 className="mt-3 font-display text-base font-bold">Your information is protected</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-text">We use your details and files only to evaluate and quote your project. We do not sell your information, and we share product details with prospective manufacturers only as needed to prepare your quotation.</p>
            </div>
            <div className="rounded-3xl border border-line bg-white p-7 text-sm leading-relaxed text-slate-text">
              <p className="font-semibold text-navy">Tips for an accurate quote</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Include photos or links to similar products</li>
                <li>Note sizes, materials, and colors</li>
                <li>Give a quantity range if you’re unsure</li>
                <li>Mention any required certifications</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
