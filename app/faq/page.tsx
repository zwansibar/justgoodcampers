import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Camper Rental FAQ New Zealand — Licences, Freedom Camping & More | JustGoodCampers",
  description:
    "Common questions about renting a camper in New Zealand — driver's licences, freedom camping rules, self-containment, insurance, airport pick-up, cancellations, and more.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Camper Rental FAQ New Zealand | JustGoodCampers",
    description: "Everything you need to know before booking a camper rental in New Zealand.",
    url: "https://www.justgoodcampers.com/faq",
  },
};

const faqs = [
  {
    question: "What's included with every camper rental?",
    answer:
      "Everything you need from day one — cooking gear and utensils, bedding and linen, camp chairs and table, a cleaning kit, airport transfer (we pick you up), and luggage storage during your trip so you're not cramming extra bags into the van. There's nothing extra to buy or hire separately.",
  },
  {
    question: "Do I need a special licence to drive a camper in New Zealand?",
    answer:
      "No. Both our campers are under 6,000kg gross vehicle mass, which means you drive them on a standard New Zealand or international driver's licence. No special endorsements needed. Our vehicles are automatics, so even if you're used to driving on the right, you'll adapt quickly.",
  },
  {
    question: "Are your campers self-contained for freedom camping?",
    answer:
      "Yes. Both campers hold a current NZ Motorhome/Campervan Certificate of Self-Containment. This means you're legally permitted to freedom camp in designated areas under the Freedom Camping Act — your camper has onboard water, waste storage, and toilet facilities to go 72 hours without connecting to external services.",
  },
  {
    question: "Where can I freedom camp in New Zealand?",
    answer:
      "Freedom camping is allowed at hundreds of spots across the country — beachfronts, lakesides, forests, mountain valleys. The Campermate app (free on iOS and Android) is the best tool for finding them. Always check site-specific rules before you stop, as some areas have restrictions even for certified self-contained vehicles.",
  },
  {
    question: "What about insurance?",
    answer:
      "Our rental includes standard third-party liability cover. We offer an optional collision damage waiver to reduce your excess to zero. Full details are in your rental agreement and we're happy to walk through it with you before you go.",
  },
  {
    question: "Where do I pick up and drop off the camper?",
    answer:
      "We include airport transfer — we pick you up when you land and bring the camper to you. Drop-off works the same way in reverse. Get in touch when you book and we'll sort the logistics around your flight times.",
  },
  {
    question: "Can I store my luggage during the trip?",
    answer:
      "Yes — and this is one of our most popular features. Leave any bags you don't need on the road with us and pick them up when you return the camper. You keep only what fits comfortably in the van, which makes a real difference to the experience.",
  },
  {
    question: "What happens if something breaks down on the road?",
    answer:
      "Call us first. We're contactable 24/7 and we'll work out the fastest solution — whether that's talking you through a fix, arranging a mechanic, or getting to you ourselves. We cover roadside assistance for mechanical breakdowns.",
  },
  {
    question: "How does the airport transfer work?",
    answer:
      "Tell us your flight details when you book. We'll arrange to meet you at the airport when you land and drive you (and the camper) to wherever you're starting from. Same in reverse when your trip ends — we'll pick up the van and get you to your departure airport.",
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "Cancellations more than 30 days before your start date receive a full refund. Between 14–30 days, we retain 50% of the total. Inside 14 days, we're unable to offer a refund, though we&apos;ll always try to work with you if something unexpected comes up. Get in touch and we'll talk it through.",
  },
  {
    question: "Can I travel between the North and South Island?",
    answer:
      "Yes. The inter-island ferry (Interislander or Bluebridge) connects Wellington and Picton and takes around 3 hours. Both our campers fit on the ferry. Book ferry tickets separately — we recommend doing this well in advance during peak season as it sells out. The crossing is an experience in itself.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "For peak season (December–February) and school holidays, 3–6 months ahead is sensible. In shoulder seasons, 4–6 weeks is usually enough. We only have two campers, so availability goes quickly. If you're set on specific dates, don't wait.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.justgoodcampers.com" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://www.justgoodcampers.com/faq" },
  ],
};

export default function FAQPage() {
  return (
    <main className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="bg-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-body text-accent text-sm font-medium tracking-[0.2em] uppercase mb-4">Questions</p>
          <h1 className="font-display font-bold text-heading text-white max-w-2xl animate-fade-up" style={{ animationDelay: "100ms" }}>
            Frequently asked questions
          </h1>
          <p className="font-body text-white/50 text-lg mt-4 max-w-xl animate-fade-up" style={{ animationDelay: "250ms" }}>
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="/contact" className="text-accent hover:underline">Get in touch directly.</Link>
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-3xl mx-auto px-6">
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <section className="py-16 bg-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display font-bold text-subheading text-dark mb-4">Still have questions?</h2>
          <p className="font-body text-muted mb-8">We&apos;re a small team and we reply quickly. Drop us a message and we&apos;ll get back to you.</p>
          <Link href="/contact" className="inline-flex items-center bg-accent text-white px-8 py-4 rounded-full font-display font-bold text-sm hover:bg-accent/90 transition-colors duration-200">
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}
