import type { Metadata } from "next";
import { Check, FileSignature, MessageSquareText, Scale } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/sections/JsonLd";
import { processSteps } from "@/content/process";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How It Works — Our 6-Step Sourcing Process",
  description:
    "See how Nour Trading manages sourcing from China to the USA in six clear steps: requirements, supplier sourcing, quotation, production and quality control, international shipping, and final delivery.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to source products from China with Nour Trading",
    step: processSteps.map((s) => ({ "@type": "HowToStep", position: s.n, name: s.title, text: s.detail })),
  };
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "How It Works", path: "/how-it-works" }]), howTo]} />
      <PageHero
        eyebrow="How It Works"
        title="Six clear steps from factory to your door."
        intro="A structured process with defined responsibilities, regular updates, and quality checkpoints — so international purchasing feels as predictable as buying locally."
        crumbs={[{ label: "How It Works" }]}
      />

      <section className="container-x py-20 sm:py-24">
        <Reveal><SectionHeading align="center" eyebrow="Interactive Timeline" title="Explore each stage" intro="Select a step to see what you provide and what we coordinate." /></Reveal>
        <Reveal className="mt-14"><ProcessTimeline /></Reveal>
      </section>

      <section className="bg-mist py-20 sm:py-28">
        <div className="container-x">
          <Reveal><SectionHeading eyebrow="Step by Step" title="The detail behind the process" /></Reveal>
          <ol className="relative mt-14 space-y-6 before:absolute before:bottom-6 before:left-[27px] before:top-6 before:w-px before:bg-gradient-to-b before:from-gold before:to-navy/20 sm:before:left-[31px]">
            {processSteps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.04} className="relative flex gap-5 sm:gap-8">
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-gold-light ring-8 ring-mist sm:h-16 sm:w-16">
                  <s.icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <div className="flex-1 rounded-2xl bg-white p-6 shadow-card sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-dark">Step {s.n}</p>
                  <h3 className="mt-2 text-xl font-bold sm:text-2xl">{s.title}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-slate-text">{s.detail}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.weHandle.map((w) => (
                      <li key={w} className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-navy"><Check className="h-3.5 w-3.5 text-gold" />{w}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x py-20 sm:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: FileSignature, t: "Defined responsibilities", d: "Every quotation states what is included, who handles each stage, and which shipping and cost terms apply." },
            { icon: MessageSquareText, t: "Milestone updates", d: "You receive updates at key points — sample approval, production, inspection, shipment, and delivery." },
            { icon: Scale, t: "Honest estimates", d: "Lead times, freight, and duty figures are estimates based on current information; we flag changes as soon as we learn of them." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-line p-7">
                <c.icon className="h-8 w-8 text-gold" strokeWidth={1.5} />
                <h3 className="mt-4 text-lg font-bold">{c.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-text">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title="Start with Step 1." text="Share your product requirements — it takes just a few minutes, and there’s no obligation." button="Submit Your Requirements" />
    </>
  );
}
