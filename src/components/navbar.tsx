"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Brand, Icon } from "./ui";

const links = [["Home", "home"], ["Games", "games"], ["Study", "study"], ["Challenges", "challenges"], ["Rewards", "rewards"], ["For Schools", "schools"]];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return <header className="site-header"><div className="container nav-inner">
    <a href="#home" aria-label="Study Maze home" onClick={() => setOpen(false)}><Brand /></a>
    <button ref={toggle} type="button" className="menu-toggle" aria-controls="main-navigation" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}><span /><span /><span /></button>
    <nav id="main-navigation" aria-label="Main navigation" className={`main-nav ${open ? "nav-open" : ""}`}>
      {links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      <Link href="/portal" onClick={() => setOpen(false)}>School Portal</Link>
      <a className="nav-cta" href="#experience" onClick={() => setOpen(false)}>Explore the app<Icon name="arrow" /></a>
    </nav>
  </div></header>;
}
