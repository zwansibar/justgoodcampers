"use client";

import Link from "next/link";
import { MessageCircle, PackageCheck, MapPin } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    number: "01",
    Icon: MessageCircle,
    title: "Get in touch",
    description:
      "Send us a message or WhatsApp. Tell us your travel dates and we'll help you pick the right camper. No pressure, just honest advice.",
  },
  {
    number: "02",
    Icon: PackageCheck,
    title: "We prepare everything",
    description:
      "We pack your camper with fresh bedding, cooking gear, and everything on the included list. It's ready when you arrive.",
  },
  {
    number: "03",
    Icon: MapPin,
    title: "You explore",
    description:
      "Pick up your camper, hit the road, and enjoy New Zealand at your own pace. We're always a message away if you need anything.",
  },
];

export default function HowItWorks() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-20 md:py-28 bg-light"
      aria-labelledby="how-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div
          className={`mb-16 md:mb-20 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="font-body text-nature text-sm font-medium tracking-[0.2em] uppercase mb-3">
            The process
          </p>
          <h2
            id="how-heading"
            className="font-display font-bold text-heading text-dark"
          >
            Your trip with JustGoodCampers
          </h2>
          <p className="font-body text-muted text-lg mt-3">
            From first message to first sunrise.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-0 relative">

          {steps.map((step, i) => {
            const { Icon } = step;
            return (
              <div
                key={step.number}
                className={`md:px-8 first:pl-0 last:pr-0 transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 160 + 150}ms` }}
              >
                {/* Icon + number row */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative z-10 w-11 h-11 rounded-full bg-nature/10 border-2 border-nature/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-nature" strokeWidth={1.75} />
                  </div>
                  <span
                    className={`font-display font-bold text-5xl leading-none select-none transition-all duration-700 ${
                      inView ? "text-border" : "text-transparent"
                    }`}
                    style={{ transitionDelay: `${i * 160 + 320}ms` }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-xl text-dark mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={`mt-14 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "650ms" }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent text-white px-7 py-3.5 rounded-full font-display font-bold text-sm hover:bg-accent/90 transition-colors duration-200"
          >
            Get in touch
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
