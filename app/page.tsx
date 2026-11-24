import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Handshake, Factory, ShieldCheck, Route, Calculator, Check } from "lucide-react";
import { HomeHero } from "@/components/sections/HomeHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BrandVisual } from "@/components/ui/BrandVisual";
import { ButtonLink } from "@/components/ui/Button";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CtaBand } from "@/components/sections/CtaBand";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "China Sourcing & Procurement Company in Illinois, USA",
    description:
      "Nour Trading Inc. helps US businesses source products directly from trusted manufacturers in China — managing supplier verification, quality control, shipping coordination, customs clearance through licensed partners, and delivery.",
    path: "/",
  }),
  title: { absolute: "Nour Trading Inc. | China Sourcing & Procurement Company in Illinois, USA" },
};

const reasons = [
  { icon: Handshake, title: "One Trusted Partner", text: "Manage your international purchasing through one dedicated point of contact." },
  { icon: Factory, title: "Direct Manufacturer Access", text: "Connect with qualified factories and competitive manufacturing options." },
  { icon: ShieldCheck, title: "Quality Assurance", text: "Coordinate supplier verification, sample approvals, production monitoring, and quality inspections." },
  { icon: Route, title: "End-to-End Logistics Coordination", text: "Coordinate international shipping, customs brokerage, and domestic delivery through qualified service providers." },
  { icon: Calculator, title: "Transparent Cost Management", text: "Receive detailed pricing that considers manufacturing, transportation, applicable customs duties, and delivery." },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* Why choose */}
      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Why Choose Nour Trading"
              title="International purchasing, without the complexity."
              intro="Buying directly from overseas manufacturers can lower costs and open up custom options — but it also means managing suppliers, quality, freight, and customs. We bring it together under one accountable partner based here in the US."
            />
            <div className="mt-8"><ButtonLink href="/about" variant="outline" arrow>About Nour Trading</ButtonLink></div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06} className={i === 4 ? "sm:col-span-2" : ""}>
                <div className="group h-full rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-lift sm:p-7">
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mist text-navy transition-colors group-hover:bg-navy group-hover:text-gold-light">
                      <r.icon className="h-6 w-6" strokeWidth={1.6} />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold">{r.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-slate-text">{r.text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Reveal><SectionHeading eyebrow="Our Services" title="Use one service — or let us manage the entire project." /></Reveal>
            <Reveal><ButtonLink href="/services" variant="navy" arrow>View All Services</ButtonLink></Reveal>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.07}>
                <Link href={`/services#${s.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <BrandVisual slot={s.visual} className="aspect-[16/9]" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-gold-light"><s.icon className="h-5 w-5" strokeWidth={1.7} /></span>
                      <h3 className="text-lg font-bold leading-snug">{s.title}</h3>
                    </div>
                    <p className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-text">{s.short}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-corporate group-hover:text-navy">
                      Learn more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-x py-20 sm:py-28">
        <Reveal><SectionHeading align="center" eyebrow="How It Works" title="Your complete sourcing journey" intro="A clear, six-step process with defined responsibilities at every stage — so you always know what happens next." /></Reveal>
        <Reveal className="mt-14"><ProcessTimeline /></Reveal>
        <div className="mt-10 text-center"><ButtonLink href="/how-it-works" variant="outline" arrow>See the full process</ButtonLink></div>
      </section>

      {/* All-inclusive band */}
      <section className="relative isolate overflow-hidden bg-navy py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-dots" aria-hidden />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading light eyebrow="All-Inclusive Sourcing" title="Manufacturing, shipping, customs, and delivery — coordinated together." intro="Every quotation spells out what is included, who is responsible for each stage, and the cost terms that apply, so there are no surprises between the factory and your door." />
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {["Supplier identification & verification", "Price negotiation support", "Samples & product customization", "Production monitoring", "Pre-shipment inspection coordination", "Ocean & air freight coordination", "Customs clearance via licensed brokers", "Final-mile delivery coordination"].map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-[15px]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Industries */}
      <section className="container-x py-20 sm:py-28">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal><SectionHeading eyebrow="Industries We Serve" title="Sourcing solutions for organizations across America." /></Reveal>
          <Reveal><ButtonLink href="/industries" variant="outline" arrow>All Industries</ButtonLink></Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={(i % 3) * 0.07}>
              <Link href={`/industries#${ind.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl">
                <BrandVisual slot={ind.visual} className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" sizes="(min-width:1024px) 33vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <ind.icon className="h-6 w-6 text-gold-light" strokeWidth={1.6} />
                  <h3 className="mt-3 text-xl font-bold text-white">{ind.title}</h3>
                  <p className="mt-1.5 max-h-0 overflow-hidden text-sm text-blue-100/85 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 group-focus-visible:max-h-24 group-focus-visible:opacity-100">{ind.short}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
