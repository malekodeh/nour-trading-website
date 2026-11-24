"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { processSteps } from "@/content/process";

/** Interactive six-step sourcing journey. Click / tab through steps; auto-sized for mobile. */
export function ProcessTimeline({ dark = false }: { dark?: boolean }) {
  const [active, setActive] = useState(0);
  const step = processSteps[active];
  const Icon = step.icon;

  return (
    <div>
      <div role="tablist" aria-label="Sourcing process steps" className="relative grid grid-cols-3 gap-y-6 sm:grid-cols-6">
        <div className={`absolute left-[8%] right-[8%] top-7 hidden h-px sm:block ${dark ? "bg-white/15" : "bg-line"}`} aria-hidden />
        <motion.div
          className="absolute left-[8%] top-7 hidden h-px bg-gold sm:block"
          initial={false}
          animate={{ width: `${(active / (processSteps.length - 1)) * 84}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
        {processSteps.map((s, i) => {
          const done = i < active;
          const isActive = i === active;
          const SIcon = s.icon;
          return (
            <button
              key={s.n}
              role="tab"
              id={`step-tab-${s.n}`}
              aria-selected={isActive}
              aria-controls="step-panel"
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setActive((a) => Math.min(a + 1, processSteps.length - 1));
                if (e.key === "ArrowLeft") setActive((a) => Math.max(a - 1, 0));
              }}
              className="group relative flex flex-col items-center px-1 text-center"
            >
              <span
                className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? "scale-110 border-gold bg-gold text-navy-950 shadow-[0_0_0_6px_rgba(201,162,77,0.18)]"
                    : done
                      ? "border-gold bg-white text-gold-dark"
                      : dark
                        ? "border-white/20 bg-navy-900 text-blue-100 group-hover:border-white/50"
                        : "border-line bg-white text-slate-text group-hover:border-navy/30"
                }`}
              >
                {done ? <Check className="h-5 w-5" /> : <SIcon className="h-5 w-5" strokeWidth={1.75} />}
              </span>
              <span className={`mt-3 text-[11px] font-bold uppercase tracking-widest ${isActive ? "text-gold-dark" : dark ? "text-blue-100/50" : "text-slate-text/60"}`} style={isActive && dark ? { color: "#E2C27A" } : undefined}>
                Step {s.n}
              </span>
              <span className={`mt-1 text-[13px] font-semibold leading-snug sm:text-sm ${dark ? "text-white" : "text-navy"}`}>{s.short}</span>
            </button>
          );
        })}
      </div>

      <div
        id="step-panel"
        role="tabpanel"
        aria-labelledby={`step-tab-${step.n}`}
        className={`mt-10 overflow-hidden rounded-3xl border ${dark ? "border-white/10 bg-white/[0.04]" : "border-line bg-white shadow-card"}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step.n}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.3fr_1fr]"
          >
            <div>
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold-light"><Icon className="h-6 w-6" strokeWidth={1.6} /></span>
                <span className="font-display text-5xl font-extrabold text-gold/30">0{step.n}</span>
              </div>
              <h3 className={`mt-5 text-2xl font-bold ${dark ? "text-white" : ""}`}>{step.title}</h3>
              <p className={`mt-3 text-[16px] leading-relaxed ${dark ? "text-blue-100/80" : "text-slate-text"}`}>{step.detail}</p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setActive((a) => Math.max(a - 1, 0))} disabled={active === 0}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold disabled:opacity-40 ${dark ? "border-white/20 text-white" : "border-line text-navy"}`}>Previous</button>
                <button onClick={() => setActive((a) => Math.min(a + 1, processSteps.length - 1))} disabled={active === processSteps.length - 1}
                  className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white disabled:opacity-40">Next step</button>
              </div>
            </div>
            <div className="grid content-start gap-5">
              {step.youProvide && <List title="You provide" items={step.youProvide} dark={dark} />}
              <List title="Nour Trading coordinates" items={step.weHandle} dark={dark} gold />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function List({ title, items, dark, gold }: { title: string; items: string[]; dark: boolean; gold?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 ${dark ? "bg-white/[0.05]" : "bg-mist"}`}>
      <p className={`text-xs font-bold uppercase tracking-[0.16em] ${dark ? "text-blue-100/60" : "text-slate-text/70"}`}>{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li key={it} className={`flex items-start gap-2.5 text-[15px] ${dark ? "text-white" : "text-navy"}`}>
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${gold ? "text-gold" : "text-corporate"}`} />{it}
          </li>
        ))}
      </ul>
    </div>
  );
}
