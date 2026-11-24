import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
  as: H = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`eyebrow ${light ? "eyebrow-light" : ""} ${align === "center" ? "justify-center" : ""}`}>{eyebrow}</p>
      )}
      <H className={`mt-4 text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[2.75rem] ${light ? "text-white" : ""}`}>
        {title}
      </H>
      {intro && (
        <p className={`mt-5 text-lg leading-relaxed ${light ? "text-blue-100/80" : "text-slate-text"}`}>{intro}</p>
      )}
    </div>
  );
}
