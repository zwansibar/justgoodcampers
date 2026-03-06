import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const siteUrl = "https://www.justgoodcampers.com";

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
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "JustGoodCampers New Zealand" }],
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Camper Rental New Zealand | JustGoodCampers",
    description: "Family-owned camper rental in New Zealand. No hidden fees, everything included.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${siteUrl}/#organization`,
      name: "JustGoodCampers",
      url: siteUrl,
      address: { "@type": "PostalAddress", addressCountry: "NZ" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["English"],
      },
      sameAs: [
        "https://www.instagram.com/justgoodcampers",
        "https://www.facebook.com/justgoodcampers",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "JustGoodCampers",
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
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
