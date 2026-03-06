import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import AboutSection from "@/components/AboutSection";
import CamperSection from "@/components/CamperSection";
import WhatsIncluded from "@/components/WhatsIncluded";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import SEOContentSection from "@/components/SEOContentSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const homepageFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is included with every camper rental?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every rental includes cooking gear and utensils, bedding and linen, camp chairs and table, a cleaning kit, airport transfer, and luggage storage during your trip. Nothing extra to buy or hire separately.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a special licence to drive a camper in New Zealand?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Both our campers are under 6,000kg gross vehicle mass — you drive them on a standard New Zealand or international driver's licence. Both are automatic.",
      },
    },
    {
      "@type": "Question",
      name: "Are your campervans self-contained for freedom camping in New Zealand?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Both campers hold a current NZ Certificate of Self-Containment, allowing freedom camping at designated areas under the Freedom Camping Act.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book a camper rental with JustGoodCampers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Get in touch via our contact form, email, or WhatsApp with your dates and number of travellers. We confirm availability quickly — usually within hours.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqJsonLd) }} />
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <CamperSection />
      <WhatsIncluded />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <SEOContentSection />
      <StickyMobileCTA />
    </main>
  );
}
