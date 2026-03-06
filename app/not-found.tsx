import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | JustGoodCampers",
  description: "The page you were looking for doesn't exist. Find our campers, pricing, and contact details on JustGoodCampers.",
};

export default function NotFound() {
  return (
    <main className="pt-20">
      <section className="min-h-[70vh] flex items-center bg-light">
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p className="font-body text-nature text-sm font-medium tracking-[0.2em] uppercase mb-4">
            404 — Page not found
          </p>
          <h1 className="font-display font-bold text-heading text-dark mb-6">
            This road doesn&apos;t go anywhere.
          </h1>
          <p className="font-body text-muted text-lg leading-relaxed mb-12 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist. Maybe the URL changed, or you took a wrong turn somewhere.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/"
              className="inline-flex items-center bg-accent text-white px-8 py-4 rounded-full font-display font-bold text-sm hover:bg-accent/90 transition-colors duration-200"
            >
              Back to homepage
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center border border-border text-ink px-8 py-4 rounded-full font-body font-medium text-sm hover:bg-card transition-colors duration-200"
            >
              Get in touch
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-border pt-8">
            <Link href="/campers" className="font-body text-sm text-nature hover:underline underline-offset-2">
              Our campers &rarr;
            </Link>
            <Link href="/whats-included" className="font-body text-sm text-nature hover:underline underline-offset-2">
              What&apos;s included &rarr;
            </Link>
            <Link href="/faq" className="font-body text-sm text-nature hover:underline underline-offset-2">
              FAQ &rarr;
            </Link>
            <Link href="/book" className="font-body text-sm text-nature hover:underline underline-offset-2">
              Book now &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
