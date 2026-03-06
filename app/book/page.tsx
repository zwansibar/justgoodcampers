import type { Metadata } from "next";
import BookingPageClient from "./BookingPageClient";

export const metadata: Metadata = {
  title: "Book Your Camper | JustGoodCampers New Zealand",
  description:
    "Check availability and book your New Zealand camper rental. Get in touch directly and we'll confirm your booking within hours — fast, personal service.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book Your Camper | JustGoodCampers NZ",
    description: "Check availability for your New Zealand camper rental.",
    url: "https://justgoodcampers.com/book",
    siteName: "JustGoodCampers",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Your Camper | JustGoodCampers New Zealand",
    description: "Check availability for your New Zealand camper rental.",
    images: ["/og-image.png"],
  },
};

export default function BookPage({
  searchParams,
}: {
  searchParams: { camper?: string; pickup?: string; dropoff?: string };
}) {
  return (
    <BookingPageClient
      initialCamper={searchParams.camper ?? ""}
      initialPickup={searchParams.pickup ?? ""}
      initialDropoff={searchParams.dropoff ?? ""}
    />
  );
}
