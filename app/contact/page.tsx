import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | JustGoodCampers New Zealand",
  description:
    "Get in touch with the JustGoodCampers team. We're a small family business and we reply quickly. Message us, email us, or reach us on WhatsApp.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | JustGoodCampers NZ",
    description: "Small family team, quick replies. Get in touch about your New Zealand camper rental.",
    url: "https://justgoodcampers.com/contact",
    siteName: "JustGoodCampers",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | JustGoodCampers New Zealand",
    description: "Small family team, quick replies. Get in touch about your New Zealand camper rental.",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  return (
    <main className="pt-20">
      <section className="bg-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-body text-accent text-sm font-medium tracking-[0.2em] uppercase mb-4">Get in touch</p>
          <h1 className="font-display font-bold text-heading text-white max-w-2xl animate-fade-up" style={{ animationDelay: "100ms" }}>
            We&apos;d love to hear from you
          </h1>
          <p className="font-body text-white/70 text-lg mt-4 max-w-2xl animate-fade-up" style={{ animationDelay: "250ms" }}>
            JustGoodCampers is a family-owned campervan hire company based in Auckland, New Zealand. To make an enquiry or ask a question about your rental, email us at hello@justgoodcampers.com or send a message on WhatsApp. We typically reply within a few hours.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <ContactForm />

            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display font-bold text-subheading text-dark mb-6">
                  Direct contact
                </h2>
                <div className="space-y-5">
                  <a
                    href="mailto:hello@justgoodcampers.com"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-nature/10 flex items-center justify-center flex-shrink-0 group-hover:bg-nature transition-colors duration-200">
                      <svg className="w-5 h-5 text-nature group-hover:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-body text-xs text-muted uppercase tracking-wider mb-0.5">Email</p>
                      <p className="font-display font-semibold text-dark group-hover:text-nature transition-colors duration-200">
                        hello@justgoodcampers.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/64000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-nature/10 flex items-center justify-center flex-shrink-0 group-hover:bg-nature transition-colors duration-200">
                      <svg className="w-5 h-5 text-nature group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-body text-xs text-muted uppercase tracking-wider mb-0.5">WhatsApp</p>
                      <p className="font-display font-semibold text-dark group-hover:text-nature transition-colors duration-200">
                        Message us on WhatsApp
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-nature/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-nature" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-body text-xs text-muted uppercase tracking-wider mb-0.5">Location</p>
                      <p className="font-display font-semibold text-dark">New Zealand</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-nature/[0.06] border border-nature/15 rounded-2xl p-6">
                <p className="font-display font-bold text-dark mb-2">A note from us</p>
                <p className="font-body text-sm text-muted leading-relaxed">
                  We&apos;re a small family team — you&apos;ll be talking to the same people who pack your camper and hand you the keys. We reply to every message personally, usually within a few hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
