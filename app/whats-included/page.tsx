import type { Metadata } from "next";
import Link from "next/link";
import { Wifi, Search, Star, Leaf, Tent, Bike, Droplets } from "lucide-react";

export const metadata: Metadata = {
  title: "What's Included with Every Camper Rental in New Zealand | JustGoodCampers",
  description:
    "Every JustGoodCampers rental includes cooking gear, bedding, linen, camp chairs, airport transfer, and luggage storage. Everything included — no hidden fees, no packages to compare.",
  alternates: { canonical: "/whats-included" },
  openGraph: {
    title: "What's Included with Every Camper Rental | JustGoodCampers NZ",
    description: "Everything included from day one — cooking gear, bedding, airport transfer, luggage storage. No packages, no hidden fees.",
    url: "https://www.justgoodcampers.com/whats-included",
  },
};

const included = [
  {
    label: "Cooking gear & utensils",
    description: "Pots, pans, a frying pan, plates, bowls, mugs, glasses, cutlery, and a chopping board. Everything you need to cook a proper meal, not just heat something up.",
  },
  {
    label: "Bedding & linen",
    description: "A duvet, pillow, and clean linen for every sleeping spot. Bring your clothes, leave the bulky sleeping bags at home.",
  },
  {
    label: "Camp chairs & table",
    description: "Folding camp chairs and a portable table. Set up outside wherever you park and actually enjoy where you are.",
  },
  {
    label: "Cleaning kit",
    description: "Dishwashing liquid, a sponge, a cloth, and a dustpan and brush. Keep the van clean and leave every site as you found it.",
  },
  {
    label: "Luggage storage during your trip",
    description: "Leave your empty suitcases or anything you don't need on the road with us. Pick them up when you return the camper. No storage fees, no complications.",
  },
  {
    label: "Airport transfer",
    description: "We'll pick you up from the airport when you arrive and drive you to your starting point (or hand over the camper directly). Same when your trip ends — we'll collect the van and get you to your departure airport.",
  },
];

const optional = [
  { Icon: Wifi,       label: "Starlink Wi-Fi",          description: "Stay connected anywhere in New Zealand with satellite internet." },
  { Icon: Search,     label: "Binoculars",               description: "Spot dolphins, birds, and stars up close." },
  { Icon: Star,       label: "Ultimate Campground Kit",  description: "Jeu de boules, frisbee, Jenga, and more for evenings at camp." },
  { Icon: Leaf,       label: "Hammock",                  description: "String it up between two trees and do absolutely nothing." },
  { Icon: Tent,       label: "Tent",                     description: "Extra sleeping space for friends or an adventure-loving kid." },
  { Icon: Bike,       label: "Bike Rack",                description: "Mount your bikes and explore trails along the way." },
  { Icon: Bike,       label: "Bikes",                    description: "Rent bikes and explore New Zealand's trails and scenic routes on two wheels." },
  { Icon: Droplets,   label: "Outdoor Shower",           description: "Rinse off after a beach day or a muddy hike." },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.justgoodcampers.com" },
    { "@type": "ListItem", position: 2, name: "What's Included", item: "https://www.justgoodcampers.com/whats-included" },
  ],
};

export default function WhatsIncludedPage() {
  return (
    <main className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="bg-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-body text-accent text-sm font-medium tracking-[0.2em] uppercase mb-4">No surprises</p>
          <h1 className="font-display font-bold text-heading text-white max-w-2xl animate-fade-up" style={{ animationDelay: "100ms" }}>
            Everything included from day one
          </h1>
          <p className="font-body text-white/50 text-lg mt-4 max-w-xl animate-fade-up" style={{ animationDelay: "250ms" }}>
            You book a camper. It&apos;s packed and ready. You drive. That&apos;s the whole deal.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {included.map((item) => (
              <div key={item.label} className="bg-card border border-border rounded-2xl p-6">
                <div className="w-8 h-8 rounded-full bg-nature/10 flex items-center justify-center mb-4">
                  <svg className="w-4 h-4 text-nature" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display font-bold text-base text-dark mb-2">{item.label}</h2>
                <p className="font-body text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display font-bold text-subheading text-dark mb-2">Optional upgrades</h2>
          <p className="font-body text-muted text-base mb-10 max-w-2xl">
            Our campers come fully equipped, but if you want to take your trip to the next level, these optional add-ons are available.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {optional.map((item) => {
              const { Icon } = item;
              return (
                <div key={item.label} className="bg-light border border-border rounded-2xl p-5">
                  <div className="w-9 h-9 rounded-xl bg-nature/10 flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-nature" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display font-bold text-sm text-dark mb-1">{item.label}</h3>
                  <p className="font-body text-xs text-muted leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
          <p className="font-body text-sm text-muted mt-10 mb-2">
            Interested in any of these? Just add them during your booking.
          </p>
          <Link
            href="/book"
            className="font-body font-medium text-sm text-accent hover:underline underline-offset-2"
          >
            Book your camper &rarr;
          </Link>
        </div>
      </section>

      <section className="py-16 bg-accent text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display font-bold text-subheading text-white mb-4">Ready to book?</h2>
          <p className="font-body text-white/75 mb-8">Check availability and we&apos;ll sort the rest.</p>
          <Link href="/book" className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full font-display font-bold text-sm hover:bg-white hover:text-accent transition-all duration-200">
            Check Availability
          </Link>
        </div>
      </section>
    </main>
  );
}
