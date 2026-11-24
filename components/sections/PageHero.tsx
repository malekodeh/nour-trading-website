import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 bg-dots" aria-hidden />
      <div className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-corporate-light/30 blur-3xl" aria-hidden />
      <svg className="absolute bottom-0 right-0 hidden h-full w-1/2 lg:block" viewBox="0 0 600 400" preserveAspectRatio="xMaxYMid slice" aria-hidden>
        <path d="M20 360 C 200 120, 420 100, 600 220" fill="none" stroke="#C9A24D" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="5 7" />
        <g fill="none" stroke="#fff" strokeOpacity=".06"><circle cx="460" cy="200" r="120" /><circle cx="460" cy="200" r="190" /><circle cx="460" cy="200" r="260" /></g>
      </svg>
      <div className="container-x relative py-16 sm:py-20 lg:py-24">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-blue-100/70">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span aria-current="page" className="text-white">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow eyebrow-light mt-8">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem]">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-blue-100/85">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
