"use client";

import { useState } from "react";
import Link from "next/link";
import BookingBar from "@/components/BookingBar";

const whatsappNumber = "64000000000";

interface Props {
  initialCamper: string;
  initialPickup: string;
  initialDropoff: string;
}

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric" });
}

function buildWhatsAppMessage(camper: string, pickup: string, dropoff: string) {
  const lines = ["Hi, I'd like to book a camper with JustGoodCampers."];
  if (camper) lines.push(`Camper: ${camper === "2-berth" ? "2-Berth Compact" : "4-Berth Family"}`);
  if (pickup) lines.push(`Pick-up: ${formatDate(pickup)}`);
  if (dropoff) lines.push(`Drop-off: ${formatDate(dropoff)}`);
  lines.push("Please let me know availability and pricing. Thanks!");
  return encodeURIComponent(lines.join("\n"));
}

export default function BookingPageClient({ initialCamper, initialPickup, initialDropoff }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    camper: initialCamper,
    pickup: initialPickup,
    dropoff: initialDropoff,
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${buildWhatsAppMessage(form.camper, form.pickup, form.dropoff)}`;

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-dark py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-body text-accent text-sm font-medium tracking-[0.2em] uppercase mb-4">Book</p>
          <h1 className="font-display font-bold text-heading text-white max-w-2xl animate-fade-up" style={{ animationDelay: "100ms" }}>
            Check availability
          </h1>
          <p className="font-body text-white/50 text-lg mt-4 max-w-xl animate-fade-up" style={{ animationDelay: "250ms" }}>
            We&apos;re taking bookings via direct contact. Send us your dates and we&apos;ll get back to you within a few hours with availability and pricing.
          </p>
          <div className="mt-10 max-w-3xl">
            <BookingBar />
            <p className="font-body text-white/40 text-xs mt-3">
              No deposit required &middot; Free cancellation &middot; Response within hours
            </p>
          </div>
        </div>
      </section>

      {/* Main booking section */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

            {/* Left: WhatsApp + info */}
            <div>
              <h2 className="font-display font-bold text-subheading text-dark mb-3">
                Get in touch to book
              </h2>
              <p className="font-body text-muted text-base leading-relaxed mb-8">
                We&apos;re a small team and we reply fast — usually within a few hours. Send us your dates, which camper you&apos;re interested in, and how many people are travelling. We&apos;ll confirm availability and send everything you need.
              </p>

              {/* WhatsApp primary CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] text-white px-7 py-4 rounded-full font-display font-bold text-base hover:bg-[#1ebe5d] transition-colors duration-200 w-fit mb-4"
              >
                <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Message us on WhatsApp
              </a>
              <p className="font-body text-xs text-muted mb-10">
                Or email us at{" "}
                <a href="mailto:hello@justgoodcampers.com" className="text-nature hover:underline">
                  hello@justgoodcampers.com
                </a>
              </p>

              {/* Trust signals */}
              <div className="bg-nature/[0.06] border border-nature/15 rounded-2xl p-6 space-y-3">
                {[
                  "No deposit required to hold your dates",
                  "Free cancellation up to 14 days before pickup",
                  "Personal response guaranteed within hours",
                  "Same people pack your camper and hand you the keys",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-nature/10 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-nature" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-body text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: email form */}
            <div className="bg-card border border-border rounded-2xl p-8">
              {sent ? (
                <div className="flex flex-col items-start justify-center min-h-[300px]">
                  <div className="w-12 h-12 rounded-full bg-nature/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-nature" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-xl text-dark mb-2">Message sent!</h3>
                  <p className="font-body text-muted text-sm">We&apos;ll get back to you within a few hours with availability and pricing.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" aria-label="Booking enquiry form">
                  <h2 className="font-display font-bold text-subheading text-dark mb-6">Send a booking enquiry</h2>

                  <div>
                    <label htmlFor="book-name" className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-2">Your name</label>
                    <input id="book-name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Jane Smith"
                      className="w-full bg-light border border-border rounded-xl px-4 py-3 font-body text-ink text-sm outline-none focus:border-accent transition-colors duration-200" />
                  </div>

                  <div>
                    <label htmlFor="book-email" className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-2">Email address</label>
                    <input id="book-email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@example.com"
                      className="w-full bg-light border border-border rounded-xl px-4 py-3 font-body text-ink text-sm outline-none focus:border-accent transition-colors duration-200" />
                  </div>

                  <div>
                    <label htmlFor="book-camper" className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-2">Which camper</label>
                    <select id="book-camper" name="camper" value={form.camper} onChange={handleChange}
                      className="w-full bg-light border border-border rounded-xl px-4 py-3 font-body text-ink text-sm outline-none focus:border-accent transition-colors duration-200 cursor-pointer">
                      <option value="">Select a camper</option>
                      <option value="2-berth">2-Berth Compact — From NZ$199/day</option>
                      <option value="4-berth">4-Berth Family — From NZ$249/day</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="book-pickup" className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-2">Pick-up date</label>
                      <input id="book-pickup" name="pickup" type="date" value={form.pickup} onChange={handleChange}
                        className="w-full bg-light border border-border rounded-xl px-4 py-3 font-body text-ink text-sm outline-none focus:border-accent transition-colors duration-200 [color-scheme:light]" />
                    </div>
                    <div>
                      <label htmlFor="book-dropoff" className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-2">Drop-off date</label>
                      <input id="book-dropoff" name="dropoff" type="date" value={form.dropoff} onChange={handleChange}
                        className="w-full bg-light border border-border rounded-xl px-4 py-3 font-body text-ink text-sm outline-none focus:border-accent transition-colors duration-200 [color-scheme:light]" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="book-message" className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-2">Anything else?</label>
                    <textarea id="book-message" name="message" rows={4} value={form.message} onChange={handleChange}
                      placeholder="Number of travellers, questions, special requests..."
                      className="w-full bg-light border border-border rounded-xl px-4 py-3 font-body text-ink text-sm outline-none focus:border-accent transition-colors duration-200 resize-none" />
                  </div>

                  <button type="submit"
                    className="w-full bg-accent text-white py-4 rounded-xl font-display font-bold text-sm hover:bg-accent/90 transition-colors duration-200">
                    Send enquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="py-12 bg-white text-center border-t border-border">
        <div className="max-w-xl mx-auto px-6">
          <p className="font-body text-muted text-sm mb-2">Have questions before you book?</p>
          <Link href="/faq" className="font-display font-bold text-dark hover:text-nature transition-colors duration-200">
            Read our FAQ &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
