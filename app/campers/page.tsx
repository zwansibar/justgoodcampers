import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Camper Hire New Zealand | 2-Berth & 4-Berth Campervans | JustGoodCampers",
  description:
    "Browse our 2-berth compact and 4-berth family campervans for hire in New Zealand. Both self-contained, automatic, and fully equipped — no hidden fees, no packages.",
  alternates: { canonical: "/campers" },
  openGraph: {
    title: "Camper Hire New Zealand | JustGoodCampers",
    description: "2-berth and 4-berth campervans for hire in New Zealand. Self-contained, fully equipped, no hidden fees.",
    url: "https://www.justgoodcampers.com/campers",
  },
};

const campers = [
  {
    name: "2-Berth Compact",
    slug: "2-berth",
    tagline: "For couples & solo travellers",
    description:
      "Everything you need for two, nothing you don't. Compact enough to reach places bigger vehicles can't, with a proper kitchen, comfortable sleeping, and full self-containment for freedom camping.",
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=900&q=80",
    imageAlt: "2-berth compact campervan hire in New Zealand — parked on a scenic road",
    specs: ["Sleeps 2", "Automatic", "Self-contained", "Gas cooker", "Fridge", "Onboard toilet & shower"],
  },
  {
    name: "4-Berth Family",
    slug: "4-berth",
    tagline: "For families & small groups",
    description:
      "Space for everyone and everything. Full-size kitchen, fixed double bed, and sleeping for four — perfect for families or anyone who likes room to breathe.",
    image:
      "https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=900&q=80",
    imageAlt: "4-berth family motorhome campervan hire in New Zealand",
    specs: ["Sleeps 4", "Automatic", "Self-contained", "Full kitchen", "Large fridge", "Onboard toilet & shower"],
  },
];

export default function CampersPage() {
  return (
    <main className="pt-20">
      <section className="bg-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-body text-accent text-sm font-medium tracking-[0.2em] uppercase mb-4">Our Fleet</p>
          <h1 className="font-display font-bold text-heading text-white max-w-2xl animate-fade-up" style={{ animationDelay: "100ms" }}>
            Two campers. Both perfect.
          </h1>
          <p className="font-body text-white/50 text-lg mt-4 max-w-xl animate-fade-up" style={{ animationDelay: "250ms" }}>
            Pick the size that suits your trip. Everything else is already taken care of.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-12 items-start">
          {campers.map((camper, i) => (
            <div key={camper.slug} className={i === 1 ? "md:mt-14" : ""}>
              <Link
                href={`/campers/${camper.slug}`}
                className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
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
                <div className="p-7">
                  <h2 className="font-display font-bold text-2xl text-dark mb-3">{camper.name}</h2>
                  <p className="font-body text-muted text-sm leading-relaxed mb-6">{camper.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {camper.specs.map((spec) => (
                      <span key={spec} className="font-body text-xs font-medium text-ink bg-light px-3 py-1.5 rounded-full border border-border">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <span className="font-body font-medium text-nature text-sm flex items-center gap-1.5 group-hover:gap-3 transition-all duration-200">
                    View details & book
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display font-bold text-subheading text-dark mb-4">Not sure which camper to choose?</h2>
          <p className="font-body text-muted mb-8">Get in touch and we&apos;ll help you figure out which camper suits your trip best.</p>
          <Link href="/contact" className="inline-flex items-center bg-accent text-white px-8 py-4 rounded-full font-display font-bold text-sm hover:bg-accent/90 transition-colors duration-200">
            Ask us a question
          </Link>
        </div>
      </section>
    </main>
  );
}
