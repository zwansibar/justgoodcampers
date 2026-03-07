import type { Metadata } from "next";
import BookingFlow from "./BookingFlow";

export const metadata: Metadata = {
  title: "Book Your Camper | JustGoodCampers New Zealand",
  description:
    "Book your New Zealand campervan hire online. Choose your camper, pick your dates, add extras, and confirm in minutes. No deposit required.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book Your Camper | JustGoodCampers NZ",
    description: "Book your New Zealand campervan hire online. No deposit required.",
    url: "https://justgoodcampers.com/book",
    siteName: "JustGoodCampers",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Your Camper | JustGoodCampers NZ",
    description: "Book your New Zealand campervan hire online. No deposit required.",
    images: ["/og-image.png"],
  },
};

export default function BookPage({
  searchParams,
}: {
  searchParams: { camper?: string; pickup?: string; dropoff?: string };
}) {
  return (
    <BookingFlow
      initialCamper={searchParams.camper ?? ""}
      initialPickup={searchParams.pickup ?? ""}
      initialDropoff={searchParams.dropoff ?? ""}
    />
  );
}
