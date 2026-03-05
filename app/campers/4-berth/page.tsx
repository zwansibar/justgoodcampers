import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "4-Berth Family Camper Rental | JustGoodCampers New Zealand",
  description:
    "Our spacious 4-berth family camper sleeps four with a full kitchen and all the comforts. Self-contained, automatic, everything included. From NZ$190/day.",
  alternates: { canonical: "/campers/4-berth" },
  openGraph: {
    title: "4-Berth Family Camper | JustGoodCampers NZ",
    description: "Spacious family motorhome for New Zealand road trips. Sleeps 4, fully equipped, self-contained.",
    url: "https://www.justgoodcampers.com/campers/4-berth",
  },
};

const specs = [
  { label: "Sleeps", value: "4 (2 adults + 2 children or 4 adults)" },
  { label: "Transmission", value: "Automatic" },
  { label: "Self-contained", value: "Yes — NZ certified" },
  { label: "Kitchen", value: "Gas cooker, full sink, full prep bench" },
  { label: "Fridge", value: "Large compressor fridge" },
  { label: "Water", value: "100L fresh water tank" },
  { label: "Toilet & shower", value: "Onboard" },
  { label: "Sleeping", value: "Fixed double + dinette converts" },
  { label: "Solar panel", value: "Yes" },
  { label: "Heater", value: "Yes" },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1478827387620-527f14a3f4f9?auto=format&fit=crop&w=900&q=80",
    alt: "Spacious 4-berth family motorhome exterior on a New Zealand road",
  },
  {
    src: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=900&q=80",
    alt: "Family campervan parked with stunning New Zealand mountain backdrop",
  },
  {
    src: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80",
    alt: "Spacious campervan interior with full kitchen and dining area",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Vehicle",
      name: "4-Berth Family Camper",
      description: "Spacious self-contained family motorhome for families and groups exploring New Zealand.",
      brand: { "@type": "Brand", name: "JustGoodCampers" },
      offers: {
        "@type": "Offer",
        priceCurrency: "NZD",
        price: "190",
        availability: "https://schema.org/InStock",
        url: "https://www.justgoodcampers.com/campers/4-berth",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.justgoodcampers.com" },
        { "@type": "ListItem", position: 2, name: "Campers", item: "https://www.justgoodcampers.com/campers" },
        { "@type": "ListItem", position: 3, name: "4-Berth Family", item: "https://www.justgoodcampers.com/campers/4-berth" },
      ],
    },
  ],
};

export default function FourBerthPage() {
  return (
    <main className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative h-[55vh] md:h-[65vh] bg-dark overflow-hidden">
        <Image
          src={galleryImages[0].src}
          alt={galleryImages[0].alt}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-[1fr_360px] gap-12 md:gap-16">
          <div>
            <p className="font-body text-nature text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Family &middot; For families & small groups
            </p>
            <h1 className="font-display font-bold text-heading text-dark mb-6 animate-fade-up" style={{ animationDelay: "80ms" }}>
              4-Berth Family
            </h1>
            <p className="font-body text-muted text-lg leading-relaxed mb-4">
              The 4-berth is built for people who want space to breathe. A full-size kitchen, a proper dining area, sleeping for four, and all the storage you need for a family trip or a group of friends doing it properly.
            </p>
            <p className="font-body text-muted text-base leading-relaxed mb-10">
              New Zealand rewards travellers who take their time, and the 4-berth makes it easy to do exactly that. Set up camp, spread out, cook a proper dinner, and wake up somewhere extraordinary. It&apos;s all the comfort of home, with a different view every morning.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-12">
              {galleryImages.slice(1).map((img) => (
                <div key={img.src} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 30vw" />
                </div>
              ))}
            </div>

            <h2 className="font-display font-bold text-subheading text-dark mb-4">
              What&apos;s included
            </h2>
            <p className="font-body text-muted text-base leading-relaxed mb-3">
              Every rental comes fully packed — cooking gear and utensils, bedding and linen for all four, camp chairs and table, cleaning kit, airport transfer, and luggage storage during your trip.
            </p>
            <Link href="/whats-included" className="font-body text-sm text-nature font-medium hover:underline">
              See the full inclusions list &rarr;
            </Link>
          </div>

          <aside className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <p className="font-body text-muted text-sm mb-1">From</p>
              <p className="font-display font-bold text-3xl text-dark mb-1">
                NZ$190<span className="text-base font-body font-normal text-muted">/day</span>
              </p>
              <p className="font-body text-xs text-muted/70 mb-6">Seasonal pricing applies. Get in touch for a quote.</p>
              <Link
                href="/book"
                className="flex items-center justify-center w-full bg-accent text-white py-4 rounded-xl font-display font-bold text-sm hover:bg-accent/90 transition-colors duration-200"
              >
                Check Availability
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center w-full mt-3 border border-border text-ink py-4 rounded-xl font-body font-medium text-sm hover:bg-light transition-colors duration-200"
              >
                Ask a question
              </Link>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-display font-bold text-base text-dark mb-4">Specifications</h3>
              <div className="space-y-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between items-baseline gap-2">
                    <span className="font-body text-sm text-muted">{spec.label}</span>
                    <span className="font-body text-sm font-medium text-ink text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
