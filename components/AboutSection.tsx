"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

const trustPoints = [
  "Fully equipped from day one",
  "Personal advice from locals",
  "No hidden fees, ever",
];

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section
      id="about-justgoodcampers"
      ref={ref}
      className="py-20 md:py-28 bg-light"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: photo */}
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <Image
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
                alt="Young couple enjoying a campervan road trip in New Zealand"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right: content */}
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <h2
              id="about-heading"
              className="font-display font-bold text-heading text-dark mb-7"
            >
              Family-run camper rental in New Zealand — with a personal touch
            </h2>

            <div className="space-y-4 font-body text-muted text-base leading-relaxed mb-8">
              <p>
                Hi, we&apos;re the family behind JustGoodCampers. We moved from Europe to New Zealand a few years ago, fell in love with the country, and never looked back.
              </p>
              <p>
                After exploring New Zealand by camper ourselves, we knew exactly what makes a great trip and what ruins one. Confusing pricing, unexpected fees at pickup, and impersonal service from big rental companies? We&apos;ve been there.
              </p>
              <p>
                That&apos;s why we do things differently. Every camper is fully equipped and ready from the moment you pick it up. Bedding, cooking gear, chairs, airport transfer — it&apos;s all included. No packages to compare, no extras you didn&apos;t ask for. Pick up your camper from our Auckland base, and you&apos;re ready to explore both islands at your own pace.
              </p>
              <p>
                We&apos;re small on purpose. It means we can give you the kind of personal attention that bigger companies simply can&apos;t. Need route tips? Wondering where to freedom camp? Just send us a message — we love helping travellers get the most out of New Zealand.
              </p>
            </div>

            {/* Trust points */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {trustPoints.map((point, i) => (
                <div
                  key={point}
                  className={`flex items-center gap-2.5 transition-all duration-500 ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                  style={{ transitionDelay: `${i * 80 + 400}ms` }}
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-nature/10 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-nature"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="font-body text-sm font-medium text-ink">{point}</span>
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="/contact"
                className="font-display font-bold text-sm text-white bg-accent px-6 py-3 rounded-full hover:bg-accent/90 transition-colors duration-200"
              >
                Get in touch
              </Link>
              <Link
                href="/whats-included"
                className="font-body text-sm font-medium text-muted hover:text-nature transition-colors duration-200 flex items-center gap-1.5"
              >
                See what&apos;s included
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
