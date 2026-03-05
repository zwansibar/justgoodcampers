const items = [
  "NO HIDDEN FEES",
  "EVERYTHING INCLUDED",
  "FAMILY OWNED",
  "24/7 SUPPORT",
];

// Duplicate for seamless marquee loop
const marqueeItems = [...items, ...items, ...items, ...items];

export default function TrustStrip() {
  return (
    <section
      id="trust"
      className="bg-white border-y border-border overflow-hidden"
      aria-label="Why JustGoodCampers"
    >
      <div className="py-4 flex overflow-hidden">
        <div className="marquee-track flex items-center gap-0 shrink-0">
          {marqueeItems.map((item, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="font-display font-bold text-sm tracking-widest text-ink px-6">
                {item}
              </span>
              <span className="text-accent font-bold text-lg" aria-hidden="true">
                ·
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
