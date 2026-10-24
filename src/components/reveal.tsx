"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !("IntersectionObserver" in window)) return;
    const items = root.current?.querySelectorAll<HTMLElement>(".reveal") ?? [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    items.forEach((item) => { item.classList.add("will-reveal"); observer.observe(item); });
    const showAll = () => { if (media.matches) { observer.disconnect(); items.forEach((item) => item.classList.remove("will-reveal")); } };
    media.addEventListener("change", showAll);
    return () => { observer.disconnect(); media.removeEventListener("change", showAll); items.forEach((item) => item.classList.remove("will-reveal")); };
  }, []);
  return <div ref={root}>{children}</div>;
}
