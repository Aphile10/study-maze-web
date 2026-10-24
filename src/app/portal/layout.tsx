import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Brand, Icon } from "@/components/ui";
import "./portal.css";

export const metadata: Metadata = { title: "School Portal | Study Maze", description: "Explore Study Maze school onboarding in an exhibition demo. Registration details are not sent or saved permanently.", openGraph: { title: "School Portal | Study Maze", description: "An exhibition preview of school onboarding. No live registration processing." }, robots: { index: false, follow: false } };
export default function PortalLayout({ children }: { children: ReactNode }) {
  return <div className="portal"><a href="#portal-content" className="skip-link">Skip to content</a>
    <header className="portal-header"><div className="portal-shell"><Link href="/" aria-label="Study Maze homepage"><Brand /></Link><span className="portal-badge">Organization portal</span><Link href="/" className="portal-home"><Icon name="arrow" />Back to Study Maze</Link></div></header>
    <main id="portal-content">{children}</main>
    <footer className="portal-footer portal-shell"><span>Study Maze &middot; School &amp; organization onboarding</span><span>Study. Play. Compete. Earn.</span></footer>
  </div>;
}
