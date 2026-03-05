"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Our Campers", href: "/campers" },
  { label: "What's Included", href: "/whats-included" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // On subpages the navbar is always solid; on homepage it fades in on scroll
  const solid = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Wordmark */}
          <Link
            href="/"
            className={`font-display font-bold text-lg tracking-tight transition-colors duration-300 ${
              solid ? "text-dark" : "text-white"
            }`}
          >
            JustGoodCampers
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-sm font-medium transition-colors duration-300 ${
                  solid ? "text-ink hover:text-nature" : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/book"
            className="hidden md:inline-flex items-center bg-accent text-white px-5 py-2.5 rounded-full font-body font-medium text-sm hover:bg-accent/90 transition-colors duration-200"
          >
            Check Availability
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block h-0.5 w-6 transition-colors duration-300 ${
                  solid ? "bg-dark" : "bg-white"
                }`}
              />
            ))}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-dark flex flex-col items-center justify-center transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Close */}
        <button
          className="absolute top-5 right-6 p-2 text-white/50 hover:text-white transition-colors"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Wordmark */}
        <span className="absolute top-5 left-6 font-display font-bold text-lg text-white tracking-tight">
          JustGoodCampers
        </span>

        {/* Links */}
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-display font-bold text-4xl text-white hover:text-accent/80 transition-all duration-500 ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 60 + 80}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/book"
            onClick={() => setMenuOpen(false)}
            className={`mt-4 bg-accent text-white px-8 py-4 rounded-full font-display font-bold text-lg hover:bg-accent/90 transition-all duration-500 ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: menuOpen ? `${navLinks.length * 60 + 80}ms` : "0ms" }}
          >
            Check Availability
          </Link>
        </nav>
      </div>
    </>
  );
}
