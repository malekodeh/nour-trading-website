"use client";
import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

/**
 * Subtle fade-up on scroll. Content is fully visible in server-rendered HTML
 * (good for SEO, no-JS, and slow connections); only elements that start below
 * the fold are hidden after hydration and revealed as they scroll into view.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return; // already in view: leave as is
    setState("hidden");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) { setState("shown"); io.disconnect(); }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as ElementType;
  const motion =
    state === "hidden" ? "opacity-0 translate-y-5" : state === "shown" ? "opacity-100 translate-y-0" : "";
  return (
    <Tag
      ref={ref}
      className={`${className} ${state !== "static" ? "transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)]" : ""} ${motion}`}
      style={state === "shown" && delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
