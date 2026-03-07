import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://justgoodcampers.com";

export const metadata: Metadata = {
  title: {
    default: "Camper Rental New Zealand | Family-Owned | JustGoodCampers",
    template: "%s | JustGoodCampers",
  },
  description:
    "Family-owned camper rental in New Zealand. Fully equipped campers, no hidden fees, personal service. Book your hassle-free NZ road trip today.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Camper Rental New Zealand | Family-Owned | JustGoodCampers",
    description:
      "Family-owned camper rental in New Zealand. Fully equipped campers, no hidden fees, personal service.",
    url: siteUrl,
    siteName: "JustGoodCampers",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JustGoodCampers New Zealand" }],
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Camper Rental New Zealand | JustGoodCampers",
    description: "Family-owned camper rental in New Zealand. No hidden fees, everything included.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  other: {
    "theme-color": "#1A3C2E",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${siteUrl}/#organization`,
      name: "JustGoodCampers",
      description: "Family-owned camper rental in New Zealand. Fully equipped, self-contained campervans for hire with pickup from Auckland. No hidden fees, everything included.",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
      },
      image: `${siteUrl}/og-image.png`,
      email: "hello@justgoodcampers.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Auckland",
        addressRegion: "Auckland",
        addressCountry: "NZ",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -36.8509,
        longitude: 174.7645,
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@justgoodcampers.com",
        contactType: "customer service",
        availableLanguage: ["English"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        },
      },
      sameAs: [
        "https://www.instagram.com/justgoodcampers",
        "https://www.facebook.com/justgoodcampers",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Campervans for Hire in New Zealand",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Vehicle",
              name: "2-Berth Compact Campervan",
              description: "Self-contained compact campervan for couples and solo travellers in New Zealand.",
            },
            priceCurrency: "NZD",
            price: "199",
            priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "NZD", price: "199", unitText: "DAY" },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Vehicle",
              name: "4-Berth Family Campervan",
              description: "Self-contained family motorhome for families and groups exploring New Zealand.",
            },
            priceCurrency: "NZD",
            price: "249",
            priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "NZD", price: "249", unitText: "DAY" },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "JustGoodCampers",
      description: "Family-owned campervan hire in New Zealand. Pickup from Auckland, everything included.",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NZ">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} font-body antialiased bg-light`}
      >
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-dark focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-body focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <Navbar />
        <div id="main-content">
          {children}
        </div>
        <Footer />
        <WhatsAppButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
