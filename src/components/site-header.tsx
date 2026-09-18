"use client";

import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  ["About", "/about"],
  ["Research", "/research"],
  ["Publications", "/publications"],
  ["Teaching", "/teaching"],
  ["Consultancy", "/consultancy"],
] as const;

type Theme = "light" | "dark";

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("rk-theme");
    const system: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const next: Theme = saved === "dark" || saved === "light" ? saved : system;
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }, []);

  const isDark = theme === "dark";
  const toggle = () => {
    const next: Theme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("rk-theme", next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
      <span className="sr-only">{isDark ? "Switch to light mode" : "Switch to dark mode"}</span>
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className={"brand" + (pathname === "/" ? " brand-active" : "")} onClick={() => setOpen(false)} aria-current={pathname === "/" ? "page" : undefined}>
          <span className="brand-mark">RK</span>
          <span><strong>Reuben Kizito</strong><small>Scholar &amp; practitioner</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => {
            const active = isActive(href);
            return <Link key={href} href={href} className={"nav-link" + (active ? " active" : "")} aria-current={active ? "page" : undefined}>{label}</Link>;
          })}
        </nav>
        <div className="nav-tools">
          <ThemeToggle />
          <Link href="/appointments" className={"button button-small nav-cta" + (pathname === "/appointments" ? " active" : "")} aria-current={pathname === "/appointments" ? "page" : undefined}>Book a conversation</Link>
        </div>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && <div className="mobile-nav container">
        {links.map(([label, href]) => {
          const active = isActive(href);
          return <Link key={href} href={href} className={"nav-link" + (active ? " active" : "")} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>;
        })}
        <Link href="/book" className={"nav-link" + (isActive("/book") ? " active" : "")} aria-current={isActive("/book") ? "page" : undefined} onClick={() => setOpen(false)}>The book</Link>
        <Link href="/community" className={"nav-link" + (isActive("/community") ? " active" : "")} aria-current={isActive("/community") ? "page" : undefined} onClick={() => setOpen(false)}>Community work</Link>
        <Link href="/appointments" className="button" onClick={() => setOpen(false)}>Book a conversation</Link>
      </div>}
    </header>
  );
}
