"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["About", "/about"],
  ["Research", "/research"],
  ["Publications", "/publications"],
  ["Teaching", "/teaching"],
  ["Consultancy", "/consultancy"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">RK</span>
          <span><strong>Reuben Kizito</strong><small>Scholar &amp; practitioner</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link href="/appointments" className="button button-small nav-cta">Book a conversation</Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && <div className="mobile-nav container">
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link href="/book" onClick={() => setOpen(false)}>The book</Link>
        <Link href="/community" onClick={() => setOpen(false)}>Community work</Link>
        <Link href="/appointments" className="button" onClick={() => setOpen(false)}>Book a conversation</Link>
      </div>}
    </header>
  );
}
