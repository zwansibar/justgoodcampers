import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "2-Berth Compact Camper Rental | JustGoodCampers New Zealand",
  description:
    "Our 2-berth compact camper is perfect for couples or solo travellers. Fully self-contained, automatic, with everything included from day one. From NZ$150/day.",
  alternates: { canonical: "/campers/2-berth" },
  openGraph: {
    title: "2-Berth Compact Camper | JustGoodCampers NZ",
    description: "Fully equipped compact campervan for couples exploring New Zealand. Self-contained, automatic, everything included.",
    url: "https://justgoodcampers.com/campers/2-berth",
    siteName: "JustGoodCampers",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "2-Berth Compact Camper Rental | JustGoodCampers NZ",
    description: "Fully equipped compact campervan for couples exploring New Zealand.",
    images: ["/og-image.png"],
  },
};

const specs = [
  { label: "Sleeps", value: "2 adults" },
  { label: "Transmission", value: "Automatic" },
  { label: "Self-contained", value: "Yes — NZ certified" },
  { label: "Kitchen", value: "Gas cooker, sink, prep space" },
  { label: "Fridge", value: "Compressor fridge" },
  { label: "Water", value: "60L fresh water tank" },
  { label: "Toilet & shower", value: "Onboard" },
  { label: "Solar panel", value: "Yes" },
  { label: "Heater", value: "Yes" },
  { label: "Driving licence", value: "Standard NZ or international" },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=900&q=80",
    alt: "2-berth compact campervan exterior on a New Zealand road",
  },
  {
    src: "https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=900&q=80",
    alt: "Campervan parked at a scenic New Zealand viewpoint",
  },
  {
    src: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80",
    alt: "Compact campervan interior showing sleeping and kitchen area",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Vehicle",
      name: "2-Berth Compact Camper",
      description: "Self-contained compact campervan for couples and solo travellers exploring New Zealand. Sleeps 2 adults, automatic transmission, onboard toilet and shower, solar panel, heater, gas cooker. NZ certified for freedom camping. Includes bedding, cooking gear, camp chairs, and Auckland airport transfer.",
      brand: { "@type": "Brand", name: "JustGoodCampers" },
      vehicleTransmission: "AutomaticTransmission",
      numberOfForwardGears: 0,
      offers: {
        "@type": "Offer",
        priceCurrency: "NZD",
        price: "199",
        priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "NZD", price: "199", unitText: "DAY" },
        availability: "https://schema.org/InStock",
        url: "https://justgoodcampers.com/campers/2-berth",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://justgoodcampers.com" },
        { "@type": "ListItem", position: 2, name: "Campers", item: "https://justgoodcampers.com/campers" },
        { "@type": "ListItem", position: 3, name: "2-Berth Compact", item: "https://justgoodcampers.com/campers/2-berth" },
      ],
    },
  ],
};

export default function TwoBerthPage() {
  return (
    <main className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero image */}
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
          {/* Main content */}
          <div>
            <p className="font-body text-nature text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Compact &middot; For couples & solo travellers
            </p>
            <h1 className="font-display font-bold text-heading text-dark mb-4 animate-fade-up" style={{ animationDelay: "80ms" }}>
              2-Berth Compact
            </h1>
            <p className="font-body text-ink text-base leading-relaxed mb-5 bg-nature/[0.06] border border-nature/15 rounded-xl px-4 py-3">
              The 2-berth compact camper is a fully equipped, self-contained campervan for couples and solo travellers exploring New Zealand. It sleeps 2, drives automatically, includes an onboard toilet and shower, and is certified for freedom camping. Rental from NZ$199/day, with bedding, cooking gear, and Auckland airport transfer all included.
            </p>
            <p className="font-body text-muted text-lg leading-relaxed mb-4">
              Our compact camper gives you everything you actually need for a New Zealand road trip — and nothing that just takes up space. It&apos;s self-contained, well-equipped, and easy to drive. Most importantly, it&apos;s ready to go from the moment we hand you the keys.
            </p>
            <p className="font-body text-muted text-base leading-relaxed mb-10">
              Being smaller means you can go further. Side roads, narrow passes, freedom camping spots that bigger vehicles can&apos;t reach — the compact opens up parts of New Zealand that most visitors never see. Perfect for two people who want to move freely and sleep well.
            </p>

            {/* Gallery grid */}
            <div className="grid grid-cols-2 gap-3 mb-12">
              {galleryImages.slice(1).map((img) => (
                <div key={img.src} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 30vw" />
                </div>
              ))}
            </div>

            {/* Included */}
            <h2 className="font-display font-bold text-subheading text-dark mb-4">
              What&apos;s included
            </h2>
            <p className="font-body text-muted text-base leading-relaxed mb-3">
              Every rental comes fully packed — cooking gear and utensils, bedding and linen, camp chairs and table, cleaning kit, airport transfer, and luggage storage during your trip.
            </p>
            <Link href="/whats-included" className="font-body text-sm text-nature font-medium hover:underline">
              See the full inclusions list &rarr;
            </Link>
          </div>

          {/* Sidebar: specs + CTA */}
          <aside className="space-y-6">
            {/* Pricing card */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <p className="font-body text-muted text-sm mb-1">From</p>
              <p className="font-display font-bold text-3xl text-dark mb-1">
                NZ$199<span className="text-base font-body font-normal text-muted">/day</span>
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

            {/* Specs */}
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
