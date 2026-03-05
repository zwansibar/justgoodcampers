"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const testimonials = [
  {
    quote:
      "We loved how simple everything was. No confusing extras, just a comfortable camper and honest service. Being able to store our empty luggage was a huge bonus.",
    name: "Gijs de Vries",
    country: "Netherlands",
    initials: "GV",
  },
  {
    quote:
      "From the first contact to returning the camper, everything felt easy and well organised. Friendly people, clear communication and a great setup.",
    name: "Constant",
    country: "Germany",
    initials: "C",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-20 md:py-32 bg-dark"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2
          id="testimonials-heading"
          className={`font-display font-bold text-subheading text-white/40 uppercase tracking-widest mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          What travellers say
        </h2>

        {/* Quotes */}
        <div
          className={`relative transition-all duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`transition-all duration-500 ${
                i === current
                  ? "opacity-100 relative"
                  : "opacity-0 absolute inset-0 pointer-events-none"
              }`}
              aria-hidden={i !== current}
            >
              {/* Large opening quote mark */}
              <div
                className="font-display font-bold text-accent text-7xl leading-none mb-4 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <blockquote className="font-body text-textLight/85 text-xl md:text-2xl lg:text-3xl italic leading-relaxed mb-10">
                {t.quote}
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-bold text-white text-sm">
                    {t.initials}
                  </span>
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-white text-sm">{t.name}</div>
                  <div className="font-body text-white/40 text-xs">{t.country}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`View testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-accent w-8" : "bg-white/20 w-2 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
