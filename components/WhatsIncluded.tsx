"use client";

import Image from "next/image";
import Link from "next/link";
import { UtensilsCrossed, BedDouble, Armchair, Sparkles, Luggage, PlaneTakeoff } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const items = [
  {
    icon: UtensilsCrossed,
    label: "Cooking gear & utensils",
    description: "Pots, pans, plates, cutlery — everything to cook a proper meal on the road.",
  },
  {
    icon: BedDouble,
    label: "Bedding & linen",
    description: "Duvets, pillows, and fresh linen. Just bring yourself.",
  },
  {
    icon: Armchair,
    label: "Camp chairs & table",
    description: "Set up outside at the end of the day and actually enjoy where you are.",
  },
  {
    icon: Sparkles,
    label: "Cleaning kit",
    description: "Leave every site spotless — supplies included, no excuses needed.",
  },
  {
    icon: Luggage,
    label: "Luggage storage during your trip",
    description: "Leave what you don't need with us. Pick it up when you return the camper.",
  },
  {
    icon: PlaneTakeoff,
    label: "Airport transfer",
    description: "We pick you up when you land. Same in reverse when you leave.",
  },
];

export default function WhatsIncluded() {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section
      id="whats-included"
      ref={ref}
      className="py-20 md:py-28"
      style={{ backgroundColor: "#EEF4F0" }}
      aria-labelledby="included-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div
          className={`mb-12 md:mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="font-body text-nature text-sm font-medium tracking-[0.2em] uppercase mb-3">
            No surprises
          </p>
          <h2
            id="included-heading"
            className="font-display font-bold text-heading text-dark max-w-2xl"
          >
            What&apos;s included with every{" "}
            <span className="text-nature">camper rental</span>
          </h2>
          <p className="font-body text-muted text-lg mt-3 max-w-xl">
            You book. We pack. You drive. Everything is already in the camper when you pick it up.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: photo */}
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "4/5" }}>
              <Image
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80"
                alt="Warm cosy camping setup with lantern light — the JustGoodCampers outdoor experience in New Zealand"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
            </div>
          </div>

          {/* Right: list */}
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div>
              {items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`flex items-start gap-4 py-5 border-b border-nature/10 last:border-0 transition-all duration-500 ${
                      inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: `${i * 70 + 300}ms` }}
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-nature/10 flex items-center justify-center mt-0.5">
                      <Icon className="w-4 h-4 text-nature" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm text-dark mb-1">
                        {item.label}
                      </h3>
                      <p className="font-body text-sm text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <Link
                href="/whats-included"
                className="inline-flex items-center gap-2 font-body text-sm font-medium text-nature hover:text-nature/80 transition-colors duration-200"
              >
                See full inclusions list
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
