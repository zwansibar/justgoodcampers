"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export default function CTASection() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section
      id="cta"
      ref={ref}
      className="py-20 md:py-28 bg-accent"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2
          id="cta-heading"
          className={`font-display font-bold text-heading text-white mb-4 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Ready to explore New Zealand by camper?
        </h2>

        <p
          className={`font-body text-white/75 text-lg mb-10 max-w-md mx-auto transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          Choose your camper. Pick your dates. We handle the rest.
        </p>

        <div
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <Link
            href="/book"
            className="inline-flex items-center gap-2 border-2 border-white text-white px-10 py-4 rounded-full font-display font-bold text-base hover:bg-white hover:text-accent transition-all duration-200"
          >
            Check Availability
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="font-body text-white/50 text-xs mt-4">
            No deposit needed &middot; Cancel anytime &middot; We respond within hours
          </p>
        </div>
      </div>
    </section>
  );
}
