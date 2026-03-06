const items = [
  "Pickup from Auckland",
  "No hidden fees",
  "Everything included",
  "Family owned & operated",
];

export default function TrustBar() {
  return (
    <section
      id="trust"
      className="border-y border-nature/10"
      style={{ backgroundColor: "#EEF4F0" }}
      aria-label="Why JustGoodCampers"
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center justify-center md:justify-start gap-2.5"
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-nature/10 flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-nature"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="font-body font-medium text-sm text-ink">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
