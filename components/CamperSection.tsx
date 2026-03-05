"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Gauge, ShieldCheck } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const campers = [
  {
    name: "2-Berth Compact",
    slug: "2-berth",
    tagline: "For couples & solo travellers",
    description:
      "Everything you need for two, nothing you don't. Nimble enough to reach places bigger vehicles can't.",
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=900&q=80",
    imageAlt: "2-berth compact campervan rental parked at a scenic New Zealand lake",
    specs: ["Sleeps 2", "Automatic", "Self-contained"],
  },
  {
    name: "4-Berth Family",
    slug: "4-berth",
    tagline: "For families & small groups",
    description:
      "Space to spread out, room for everything, all the comforts you need for a proper family adventure.",
    image:
      "https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=900&q=80",
    imageAlt: "4-berth family campervan hire on a scenic New Zealand road with mountains in the background",
    specs: ["Sleeps 4", "Automatic", "Self-contained"],
  },
];

const SpecIcons = [Users, Gauge, ShieldCheck];

export default function CamperSection() {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section
      id="campers"
      ref={ref}
      className="py-20 md:py-28 bg-light"
      aria-labelledby="campers-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`mb-14 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2
            id="campers-heading"
            className="font-display font-bold text-heading text-dark"
          >
            Our camper hire options in New Zealand
          </h2>
          <p className="font-body text-muted mt-3 text-lg">
            Two options. Both fully equipped. You choose the size.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
          {campers.map((camper, i) => {
            return (
              <div
                key={camper.slug}
                className={`transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${i === 1 ? "md:mt-14" : ""}`}
                style={{ transitionDelay: `${i * 150 + 100}ms` }}
              >
                <Link
                  href={`/campers/${camper.slug}`}
                  className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                  aria-label={`View ${camper.name} details`}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                    <Image
                      src={camper.image}
                      alt={camper.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-5 font-body text-xs font-medium text-white/75 uppercase tracking-widest">
                      {camper.tagline}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display font-bold text-xl text-dark mb-2">
                      {camper.name}
                    </h3>
                    <p className="font-body text-muted text-sm leading-relaxed mb-5">
                      {camper.description}
                    </p>

                    {/* Specs */}
                    <div className="flex items-center gap-5 pb-5 mb-5 border-b border-border">
                      {camper.specs.map((label, idx) => {
                        const Icon = SpecIcons[idx];
                        return (
                          <div key={label} className="flex items-center gap-1.5">
                            <Icon className="w-3.5 h-3.5 flex-shrink-0 text-nature" strokeWidth={1.75} />
                            <span className="font-body text-xs font-medium text-muted">
                              {label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <span className="font-body font-medium text-nature text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
                      View details
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
