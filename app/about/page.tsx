import type { Metadata } from "next";
import { Target, Eye, ShieldCheck, Gem, Clock3, ScanEye, Handshake, Lightbulb, Headset, Globe2, Factory, Settings2, ClipboardCheck, Ship, HeartHandshake } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BrandVisual } from "@/components/ui/BrandVisual";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/sections/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us — Family-Owned Global Sourcing Partner",
  description:
    "Nour Trading Inc. is a family-owned sourcing and procurement company in Illinois connecting American businesses with trusted manufacturers in China through transparent, end-to-end coordination.",
  path: "/about",
});

const strengths = [
  { icon: Headset, title: "US-based customer service", text: "Work with a team in your time zone that understands American business expectations." },
  { icon: Globe2, title: "International sourcing expertise", text: "Practical knowledge of how to find, evaluate, and work with overseas manufacturers." },
  { icon: Factory, title: "Manufacturer relationships", text: "We cultivate working relationships with factories to support clear communication and accountability." },
  { icon: Settings2, title: "Customized procurement", text: "Every project is scoped to your product, quantity, budget, and timeline — not a one-size package." },
  { icon: ClipboardCheck, title: "Quality control coordination", text: "Samples, production checks, and inspections are planned into every order." },
  { icon: Ship, title: "Logistics coordination", text: "Freight, customs brokerage, and delivery are coordinated with qualified, licensed partners." },
];

const values = [
  { icon: ShieldCheck, name: "Integrity", text: "We say what we can do, and we do what we say." },
  { icon: Gem, name: "Quality", text: "Products should meet the standard you approved — every time." },
  { icon: Clock3, name: "Reliability", text: "Consistent communication and follow-through at each milestone." },
  { icon: ScanEye, name: "Transparency", text: "Clear pricing, defined responsibilities, and honest updates." },
  { icon: Handshake, name: "Partnership", text: "We measure success by long-term relationships, not single orders." },
  { icon: Lightbulb, name: "Innovation", text: "Always looking for better products, processes, and options for you." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "About Us", path: "/about" }])} />
      <PageHero
        eyebrow="About Nour Trading"
        title="Connecting American Businesses with Global Manufacturing Opportunities."
        intro="A family-owned company based in Illinois, built to make overseas procurement simpler, more transparent, and more accessible."
        crumbs={[{ label: "About Us" }]}
      />

      <section className="container-x grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Our Story</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Global manufacturing, with a partner close to home.</h2>
          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-slate-text">
            <p>
              American organizations — from schools and restaurants to retailers and nonprofits — increasingly look overseas for
              better value, more customization, and access to specialized manufacturing. Yet buying internationally can feel
              uncertain: Which factories are reliable? How is quality checked? Who handles freight, customs, and delivery?
            </p>
            <p>
              NOUR TRADING INC. was founded to answer those questions. We serve as your US-based sourcing and procurement partner,
              identifying suitable manufacturers in China, negotiating on your behalf, coordinating samples and production,
              arranging quality inspections, and organizing shipping, customs clearance through licensed brokers, and final
              delivery.
            </p>
            <p>
              As a family-owned business, relationships matter to us. We believe trust is earned through clear communication,
              honest pricing, and doing the work carefully — and that is how we intend to build lasting partnerships with every
              customer we serve.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative">
            <BrandVisual slot="about" className="aspect-[4/5] rounded-[28px] sm:aspect-[5/5]" />
            <div className="absolute -bottom-6 -left-4 max-w-[260px] rounded-2xl bg-white p-5 shadow-lift sm:-left-8">
              <HeartHandshake className="h-7 w-7 text-gold" strokeWidth={1.6} />
              <p className="mt-3 font-display text-lg font-bold text-navy">Family-owned.</p>
              <p className="text-sm text-slate-text">Personal accountability on every project.</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[{ icon: Target, label: "Our Mission", text: "To make global sourcing simpler, more transparent, and more accessible for American businesses." },
            { icon: Eye, label: "Our Vision", text: "To become a trusted international procurement partner for organizations of all sizes." }].map((b, i) => (
            <Reveal key={b.label} delay={i * 0.08}>
              <div className={`h-full rounded-3xl p-9 sm:p-12 ${i === 0 ? "bg-navy text-white" : "bg-white shadow-card"}`}>
                <b.icon className={`h-9 w-9 ${i === 0 ? "text-gold-light" : "text-gold"}`} strokeWidth={1.5} />
                <h2 className={`mt-6 text-sm font-bold uppercase tracking-[0.18em] ${i === 0 ? "text-gold-light" : "text-gold-dark"}`}>{b.label}</h2>
                <p className={`mt-4 font-display text-2xl font-semibold leading-snug sm:text-[1.7rem] ${i === 0 ? "text-white" : "text-navy"}`}>{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-20 sm:py-28">
        <Reveal><SectionHeading eyebrow="What We Bring" title="Why organizations work with us" /></Reveal>
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.06}>
              <div className="border-t-2 border-gold pt-6">
                <s.icon className="h-7 w-7 text-navy" strokeWidth={1.5} />
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-text">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy py-20 sm:py-28">
        <div className="absolute inset-0 bg-dots" aria-hidden />
        <div className="container-x relative">
          <Reveal><SectionHeading light align="center" eyebrow="Our Values" title="The principles behind every order" /></Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.name} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:bg-white/[0.08]">
                  <v.icon className="h-7 w-7 text-gold-light" strokeWidth={1.5} />
                  <h3 className="mt-4 text-xl font-bold text-white">{v.name}</h3>
                  <p className="mt-2 text-[15px] text-blue-100/80">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Let’s build a lasting partnership." text="Tell us about your organization and what you need to source. We’ll walk you through the options." />
    </>
  );
}
