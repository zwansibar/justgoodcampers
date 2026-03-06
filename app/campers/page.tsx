import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Camper Hire New Zealand | 2 & 4 Berth | JustGoodCampers",
  description:
    "Browse our 2-berth compact and 4-berth family campervans for hire in New Zealand. Both self-contained, automatic, and fully equipped — no hidden fees, no packages.",
  alternates: { canonical: "/campers" },
  openGraph: {
    title: "Camper Hire New Zealand | JustGoodCampers",
    description: "2-berth and 4-berth campervans for hire in New Zealand. Self-contained, fully equipped, no hidden fees.",
    url: "https://justgoodcampers.com/campers",
    siteName: "JustGoodCampers",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Camper Hire New Zealand | JustGoodCampers",
    description: "2-berth and 4-berth campervans for hire in New Zealand. Self-contained, fully equipped, no hidden fees.",
    images: ["/og-image.png"],
  },
};

const campers = [
  {
    name: "2-Berth Compact",
    slug: "2-berth",
    tagline: "For couples & solo travellers",
    description:
      "Our compact 2-berth campervan is ideal for couples and solo travellers exploring New Zealand. Easy to drive, simple to park, and fully equipped with everything you need for a comfortable self-drive holiday. This campervan is self-contained and certified for freedom camping throughout New Zealand.",
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=900&q=80",
    imageAlt: "2-berth compact campervan hire in New Zealand — parked on a scenic road",
    specs: ["Sleeps 2", "Automatic", "Self-contained", "Gas cooker", "Fridge", "Onboard toilet & shower"],
    price: "From NZ$199/day",
  },
  {
    name: "4-Berth Family",
    slug: "4-berth",
    tagline: "For families & small groups",
    description:
      "Our spacious 4-berth family campervan gives you room to spread out and enjoy the journey together. With a full kitchen, comfortable sleeping for four, and all the essentials included, it is the perfect choice for families and small groups looking for a hassle-free New Zealand road trip.",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=900&q=80",
    imageAlt: "4-berth family motorhome campervan hire in New Zealand",
    specs: ["Sleeps 4", "Automatic", "Self-contained", "Full kitchen", "Large fridge", "Onboard toilet & shower"],
    price: "From NZ$249/day",
  },
];

const seoLinks = [
  { label: "What's included", href: "/whats-included" },
  { label: "Frequently asked questions", href: "/faq" },
  { label: "Get in touch", href: "/contact" },
];

export default function CampersPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-body text-accent text-sm font-medium tracking-[0.2em] uppercase mb-4">Our Fleet</p>
          <h1 className="font-display font-bold text-heading text-white max-w-3xl animate-fade-up" style={{ animationDelay: "100ms" }}>
            Campervan rental New Zealand: choose your camper
          </h1>
          <p className="font-body text-white/50 text-lg mt-4 max-w-xl animate-fade-up" style={{ animationDelay: "250ms" }}>
            Two fully equipped, self-contained campervans for your New Zealand road trip. Pick the size that suits your journey.
          </p>
        </div>
      </section>

      {/* Camper cards */}
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
                  <div className="pb-6 mb-2 border-b border-border">
                    <p className="font-display font-bold text-dark text-xl">{camper.price}</p>
                    <p className="font-body text-xs text-muted/70 mt-0.5">Peak season rates may vary</p>
                  </div>
                  <span className="font-body font-medium text-nature text-sm flex items-center gap-1.5 group-hover:gap-3 transition-all duration-200">
                    View details & book
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
              <Link
                href="/whats-included"
                className="font-body text-xs text-nature hover:underline underline-offset-2 mt-3 block"
              >
                See what&apos;s included &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SEO text section */}
      <section className="py-16 md:py-20 bg-light border-t border-border">
        <div className="max-w-[720px] mx-auto px-6">
          <h2 className="font-display font-bold text-dark mb-6" style={{ fontSize: "1.2rem", lineHeight: "1.5" }}>
            Campervan hire in New Zealand with JustGoodCampers
          </h2>
          <div className="space-y-5 font-body text-muted" style={{ fontSize: "16.5px", lineHeight: "1.8" }}>
            <p>
              Choosing the right campervan for your New Zealand holiday depends on how you like to travel. Our 2-berth compact camper is perfect for couples who want to stay nimble and reach places larger vehicles cannot. The 4-berth family camper offers more space, a full kitchen, and comfortable sleeping for up to four people.
            </p>
            <p>
              Both campervans are fully self-contained, which means you can stay at designated freedom camping spots across New Zealand and save on campground fees. Every rental includes bedding, cooking gear, camp chairs, luggage storage, and airport transfer at no extra cost.
            </p>
            <p>
              We offer campervan pickup from Auckland, making it easy to start your North Island adventure or catch the ferry south to explore the South Island. Whether you are planning a loop through Queenstown and Milford Sound, or heading to the Coromandel and Bay of Islands, our campers are ready for the road.
            </p>
            <p>
              As a family-run camper hire company, we keep things simple and personal. No confusing pricing tiers, no hidden fees at pickup, and no call centres. Just honest service from people who know New Zealand by camper.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-10 pt-8 border-t border-border">
            {seoLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm text-nature hover:underline underline-offset-2"
              >
                {link.label} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
