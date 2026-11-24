"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Factory, ShieldCheck, Ship, FileCheck2, Truck, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { images } from "@/content/images";

const milestones = [
  { icon: Factory, label: "Verified manufacturer" },
  { icon: ShieldCheck, label: "Quality inspection" },
  { icon: Ship, label: "Ocean / air freight" },
  { icon: FileCheck2, label: "Customs clearance*" },
  { icon: Truck, label: "Delivered to your door" },
];

export function HomeHero() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const fade = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay: d },
  });

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      {images.hero.src ? (
        <>
          <Image src={images.hero.src} alt={images.hero.alt} fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950 via-navy to-corporate" />
      )}
      <div className="absolute inset-0 -z-10 bg-dots" aria-hidden />
      <motion.div
        aria-hidden
        className="absolute -right-32 top-10 -z-10 h-[560px] w-[560px] rounded-full bg-corporate-light/30 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-x grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-[1.15fr_1fr] lg:py-32">
        <div>
          <motion.p {...fade(0)} className="eyebrow eyebrow-light">US-Based Global Sourcing &amp; Procurement</motion.p>
          <motion.h1 {...fade(0.08)} className="mt-6 text-[2.6rem] font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-[4.1rem]">
            Global Sourcing <span className="relative whitespace-nowrap text-gold-light">Made Simple.
              <motion.svg aria-hidden viewBox="0 0 300 12" className="absolute -bottom-2 left-0 w-full" initial={reduce ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}>
                <motion.path d="M2 9 C 80 2, 220 2, 298 8" fill="none" stroke="#C9A24D" strokeWidth="3" strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: 0.7, ease }} />
              </motion.svg>
            </span>
          </motion.h1>
          <motion.p {...fade(0.16)} className="mt-7 max-w-xl text-lg leading-relaxed text-blue-100/85 sm:text-xl">
            From trusted manufacturers in China to your business in the United States, Nour Trading manages sourcing, production,
            quality control, shipping coordination, customs clearance, and delivery.
          </motion.p>
          <motion.p {...fade(0.22)} className="mt-6 font-display text-lg font-semibold italic text-gold-light">From Factory to Your Door.</motion.p>
          <motion.div {...fade(0.3)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/request-a-quote" size="lg" arrow>Request a Free Quote</ButtonLink>
            <ButtonLink href="/services" size="lg" variant="outline-light">Explore Our Services</ButtonLink>
          </motion.div>
          <motion.ul {...fade(0.38)} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-100/70">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" />Family-owned, Illinois-based</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" />One dedicated point of contact</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" />Custom B2B quotations</li>
          </motion.ul>
        </div>

        {/* Route card */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.25 }}
          className="relative"
        >
          <div className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-md sm:p-8">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-blue-100/60">
              <span>The Nour Trading route</span>
              <span className="text-gold-light">One partner</span>
            </div>
            <div className="relative mt-6 h-36">
              <svg viewBox="0 0 400 140" className="absolute inset-0 h-full w-full" aria-hidden>
                <path id="route" d="M30 110 C 120 10, 280 10, 370 100" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="2" />
                <motion.path d="M30 110 C 120 10, 280 10, 370 100" fill="none" stroke="#C9A24D" strokeWidth="2.5" strokeDasharray="6 7"
                  initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.8, ease }} />
                {!reduce && (
                  <circle r="5" fill="#E2C27A">
                    <animateMotion dur="5s" repeatCount="indefinite" path="M30 110 C 120 10, 280 10, 370 100" />
                  </circle>
                )}
              </svg>
              <div className="absolute bottom-0 left-0 flex flex-col items-start">
                <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold"><MapPin className="h-3.5 w-3.5 text-gold" />Factory · China</span>
              </div>
              <div className="absolute bottom-0 right-0 flex flex-col items-end">
                <span className="flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy-950"><MapPin className="h-3.5 w-3.5" />Your Door · USA</span>
              </div>
            </div>
            <ul className="mt-7 space-y-2.5">
              {milestones.map((m, i) => (
                <motion.li
                  key={m.label}
                  initial={reduce ? false : { opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.15, ease }}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-gold-light"><m.icon className="h-[18px] w-[18px]" strokeWidth={1.7} /></span>
                  <span className="text-[15px] font-medium">{m.label}</span>
                  <span className="ml-auto text-[11px] font-semibold uppercase tracking-wider text-blue-100/50">Step {i + 1}</span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] text-blue-100/50">*Through licensed customs brokerage partners.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
