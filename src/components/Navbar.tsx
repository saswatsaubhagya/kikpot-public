"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/* `overlay` is for pages that open with the dark hero band: the bar starts
   transparent and light-on-dark, then flips to canvas once you scroll past it.
   Pages without that band (dev tools) must not, or it renders white on white. */
export default function Navbar({ overlay = false }: { overlay?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHero = overlay && !scrolled && !isOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        onHero
          ? "bg-transparent"
          : "border-b border-hairline bg-canvas/95 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex h-[72px] items-center justify-between">
          <Link
            href="/"
            className={`display text-[1.6rem] ${
              onHero ? "text-brand-ink" : "text-text"
            }`}
          >
            Kikpot
          </Link>

          <nav className="ml-auto hidden items-center gap-8 md:flex">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[0.9375rem] transition-opacity duration-200 hover:opacity-70 ${
                  onHero ? "text-brand-ink/85" : "text-dim"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className={onHero ? "on-brand" : undefined}>
              <Link href="/dev-tools" className="btn-primary !px-5 !py-2.5 !text-sm">
                Dev tools
              </Link>
            </div>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`-mr-2 p-2 md:hidden ${onHero ? "text-brand-ink" : "text-text"}`}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeWidth={1.5}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 17h16"}
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <nav className="flex flex-col border-t border-hairline py-3 md:hidden">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="py-3 text-[0.9375rem] text-text"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/dev-tools"
              onClick={() => setIsOpen(false)}
              className="btn-primary mt-3 mb-2"
            >
              Dev tools
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
