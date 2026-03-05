"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BookingBar from "./BookingBar";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-dark overflow-hidden"
      aria-label="Hero — JustGoodCampers"
    >
      {/* Desktop layout: two-column grid */}
      <div className="max-w-7xl mx-auto px-6 min-h-screen grid md:grid-cols-[55%_45%]">
        {/* Left: text + booking bar */}
        <div className="flex flex-col justify-center pt-28 pb-12 md:pt-24 md:pb-0 relative z-10">
          {/* Eyebrow */}
          <p
            className={`font-body text-accent text-sm font-medium tracking-[0.2em] uppercase mb-7 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "80ms" }}
          >
            New Zealand &middot; Family Owned
          </p>

          {/* Hero headline — line-by-line fade-up */}
          <h1 className="font-display font-bold text-hero text-white mb-5 overflow-hidden">
            {[
              { text: "CAMPER", delay: "180ms", accent: false },
              { text: "RENTAL", delay: "360ms", accent: false },
              { text: "NEW ZEALAND", delay: "540ms", accent: true },
            ].map(({ text, delay, accent }) => (
              <span
                key={text}
                className={`block transition-all duration-700 ease-out ${
                  accent ? "text-accent" : ""
                } ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: delay }}
              >
                {text}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            className={`font-body text-white/50 text-base md:text-lg mb-14 max-w-sm transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "720ms" }}
          >
            Family-owned camper hire in New Zealand. Fully equipped, no hidden fees. Book your hassle-free NZ road trip today.
          </p>

          {/* Booking bar */}
          <div
            className={`mb-14 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
            <BookingBar />
          </div>
        </div>

        {/* Right: hero photo — desktop only */}
        <div className="hidden md:block relative pt-16 pb-8 pl-6 pr-0">
          <div className="relative h-full rounded-2xl overflow-hidden ml-[-20px]">
            <Image
              src="https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1200&q=80"
              alt="Campervan parked at a scenic New Zealand mountain lake at golden hour"
              fill
              className="object-cover"
              priority
            />
            {/* Subtle dark gradient on left edge to blend into the dark bg */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Mobile photo — sits below headline on small screens */}
      <div className="md:hidden absolute top-0 right-0 w-full h-[45vh] opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=800&q=80"
          alt="New Zealand landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/50 to-dark" />
      </div>
    </section>
  );
}
