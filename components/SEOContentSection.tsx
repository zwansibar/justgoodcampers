import Link from "next/link";

const internalLinks = [
  { label: "Our campers", href: "/campers" },
  { label: "What's included", href: "/whats-included" },
  { label: "Frequently asked questions", href: "/faq" },
  { label: "Plan your trip", href: "/blog" },
];

export default function SEOContentSection() {
  return (
    <section
      id="about-camper-rental-nz"
      className="bg-light py-16 md:py-20"
    >
      <div className="max-w-[720px] mx-auto px-6">
        <h2 className="font-display font-bold text-dark mb-6" style={{ fontSize: "1.2rem", lineHeight: "1.5" }}>
          Camper rental in New Zealand with JustGoodCampers
        </h2>

        <div className="space-y-5 font-body text-muted" style={{ fontSize: "16.5px", lineHeight: "1.8" }}>
          <p>
            JustGoodCampers is a family-owned camper hire company based in New Zealand, offering fully equipped campervans for self-drive holidays across the North and South Island. Whether you are a couple looking for a compact 2-berth campervan or a family searching for a spacious 4-berth motorhome, our campers are ready from the moment you pick them up.
          </p>
          <p>
            Every campervan rental includes bedding, cooking gear, camp chairs, a cleaning kit, luggage storage, and airport transfer at no extra cost. There are no hidden fees, no confusing packages, and no surprise charges at pickup. What you see is what you get.
          </p>
          <p>
            All our campers are certified self-contained, which means you can stay at designated freedom camping spots throughout New Zealand. From the stunning fjords of Milford Sound to the volcanic landscapes of Tongariro, from the golden beaches of Abel Tasman to the scenic roads around Queenstown, our campers are built to take you wherever the road leads.
          </p>
          <p>
            We are based in New Zealand and offer campervan pickup from Auckland. As a small family business, we provide personal service that larger rental companies simply cannot match. Need route advice? Wondering about the best time to visit? Just send us a message — we are always happy to help.
          </p>
          <p>
            Whether you call it a campervan hire, motorhome rental, or camper holiday, the experience with JustGoodCampers is always the same: simple, honest, and fully equipped for your New Zealand road trip.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-10 pt-8 border-t border-border">
          {internalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-nature hover:underline underline-offset-2"
            >
              {link.label} &rarr;
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
