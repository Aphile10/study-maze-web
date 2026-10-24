import type { ReactNode } from "react";

export type IconName = "arrow" | "book" | "bolt" | "gift" | "star" | "check" | "file" | "users" | "shield" | "sparkles" | "grid" | "clock";
const paths: Record<IconName, ReactNode> = {
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  book: <><path d="M12 5v15M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Z" /></>,
  bolt: <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" />,
  gift: <><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M5 12v9h14v-9M12 8v13M12 8H8a3 3 0 1 1 3-3l1 3Zm0 0h4a3 3 0 1 0-3-3l-1 3Z" /></>,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
  check: <path d="m5 12 4 4L19 6" />,
  file: <><path d="M14 2H5v20h14V7l-5-5Z M14 2v5h5M8 12h8M8 16h6" /></>,
  users: <><circle cx="9" cy="8" r="3" /><path d="M2 21v-3a7 7 0 0 1 14 0v3M16 5a3 3 0 0 1 0 6M19 14a6 6 0 0 1 3 5v2" /></>,
  shield: <><path d="m12 2 9 4v6c0 5-5 9-9 10-4-1-9-5-9-10V6l9-4Z" /><path d="m8 12 3 3 5-6" /></>,
  sparkles: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM20 2v4M18 4h4" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></>,
};
export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return <svg className={`icon ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
export function Brand() {
  return <span className="brand"><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M7 25V7h18v18H13V13h6v6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></span><span>study<span className="brand-light">maze</span><span className="brand-dot">.</span></span></span>;
}
export function ButtonLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <a href={href} className={`button ${secondary ? "button-secondary" : "button-primary"}`}>{children}<Icon name="arrow" /></a>;
}
export function SectionHeading({ eyebrow, title, children, centered = false }: { eyebrow: string; title: ReactNode; children?: ReactNode; centered?: boolean }) {
  return <div className={`section-heading ${centered ? "text-center mx-auto" : ""}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children && <p className="section-description">{children}</p>}</div>;
}
export function FeatureCard({ icon, title, children }: { icon: IconName; title: string; children: ReactNode }) {
  return <div className="feature-card"><span className="icon-box"><Icon name={icon} /></span><h3>{title}</h3><p>{children}</p></div>;
}
