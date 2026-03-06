"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="bg-white border-t border-border px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-display font-bold text-dark text-sm">From NZ$199/day</p>
            <p className="font-body text-xs text-muted">No deposit required</p>
          </div>
          <Link
            href="/book"
            tabIndex={visible ? 0 : -1}
            className="flex-shrink-0 bg-accent text-white px-5 py-3 rounded-xl font-display font-bold text-sm hover:bg-accent/90 transition-colors duration-200"
          >
            Check Availability
          </Link>
        </div>
      </div>
    </div>
  );
}
