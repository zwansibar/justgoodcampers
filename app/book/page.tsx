import type { Metadata } from "next";
import Link from "next/link";
import BookingBar from "@/components/BookingBar";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Book Your Camper | JustGoodCampers New Zealand",
  description:
    "Check availability and book your New Zealand camper rental. Get in touch directly and we'll confirm your booking within hours — fast, personal service.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book Your Camper | JustGoodCampers NZ",
    description: "Check availability for your New Zealand camper rental.",
    url: "https://www.justgoodcampers.com/book",
  },
};

export default function BookPage() {
  return (
    <main className="pt-20">
      <section className="bg-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-body text-accent text-sm font-medium tracking-[0.2em] uppercase mb-4">Book</p>
          <h1 className="font-display font-bold text-heading text-white max-w-2xl animate-fade-up" style={{ animationDelay: "100ms" }}>
            Check availability
          </h1>
          <p className="font-body text-white/50 text-lg mt-4 max-w-xl animate-fade-up" style={{ animationDelay: "250ms" }}>
            Use the form below to check dates, or get in touch directly and we&apos;ll sort everything for you.
          </p>
          <div className="mt-10 max-w-3xl">
            <BookingBar />
          </div>
        </div>
      </section>

      {/* Intentional "coming soon" section — honest and warm */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left: message */}
            <div>
              <div className="inline-flex items-center gap-2 bg-nature/10 text-nature rounded-full px-4 py-2 font-body text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-nature"></span>
                Online booking coming soon
              </div>
              <h2 className="font-display font-bold text-subheading text-dark mb-4">
                We&apos;re working on it.
              </h2>
              <p className="font-body text-muted text-lg leading-relaxed mb-4">
                In the meantime, getting in touch directly is actually faster. We&apos;re a small team — you&apos;ll have a confirmed booking within hours, not days.
              </p>
              <p className="font-body text-muted text-base leading-relaxed mb-8">
                Tell us your dates, how many people, which camper you&apos;re interested in, and we&apos;ll get back to you with availability and everything you need to know to confirm.
              </p>
              <a
                href="https://wa.me/64000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-dark text-white px-7 py-4 rounded-full font-display font-bold text-sm hover:bg-dark/80 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Message us on WhatsApp
              </a>
              <p className="font-body text-xs text-muted mt-4">
                Or email{" "}
                <a href="mailto:hello@justgoodcampers.com" className="text-nature hover:underline">
                  hello@justgoodcampers.com
                </a>
              </p>
            </div>

            {/* Right: contact form */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="py-12 bg-white text-center border-t border-border">
        <div className="max-w-xl mx-auto px-6">
          <p className="font-body text-muted text-sm mb-2">Have questions before you book?</p>
          <Link href="/faq" className="font-display font-bold text-dark hover:text-nature transition-colors duration-200">
            Read our FAQ &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
