export type Season = "low" | "shoulder" | "high";

export interface Addon {
  id: string;
  label: string;
  pricePerDay: number; // NZD cents
  description: string;
}

export const ADDONS: Addon[] = [
  { id: "starlink",      label: "Starlink Wi-Fi",         pricePerDay: 1500, description: "Stay connected anywhere in New Zealand with satellite internet." },
  { id: "binoculars",   label: "Binoculars",              pricePerDay:  500, description: "Spot dolphins, birds, and stars up close." },
  { id: "campkit",      label: "Ultimate Campground Kit", pricePerDay: 1000, description: "Jeu de boules, frisbee, Jenga, and more for evenings at camp." },
  { id: "hammock",      label: "Hammock",                 pricePerDay:  500, description: "String it up between two trees and do absolutely nothing." },
  { id: "tent",         label: "Tent",                    pricePerDay: 1200, description: "Extra sleeping space for friends or an adventure-loving kid." },
  { id: "bikerack",     label: "Bike Rack",               pricePerDay:  800, description: "Mount your bikes and explore trails along the way." },
  { id: "bikes",        label: "Bikes (pair)",            pricePerDay: 2000, description: "Explore New Zealand's trails and scenic routes on two wheels." },
  { id: "outdoorshower",label: "Outdoor Shower",          pricePerDay:  800, description: "Rinse off after a beach day or a muddy hike." },
];

// Daily rates in NZD cents
export const CAMPER_RATES: Record<string, Record<Season, number>> = {
  "2-berth": { low: 17900, shoulder: 21900, high: 25900 },
  "4-berth": { low: 22900, shoulder: 26900, high: 31900 },
};

export function getSeason(date: Date): Season {
  const month = date.getMonth() + 1; // 1-12
  if (month >= 5 && month <= 9) return "low";
  if (month === 10 || month === 11 || month === 3 || month === 4) return "shoulder";
  return "high"; // Dec, Jan, Feb
}

export interface DayBreakdown {
  date: string;
  season: Season;
  ratePerDay: number; // cents
}

export interface PriceBreakdown {
  days: number;
  dayBreakdowns: DayBreakdown[];
  camperTotal: number;    // cents
  addonTotal: number;     // cents
  grandTotal: number;     // cents
  lowDays: number;
  shoulderDays: number;
  highDays: number;
}

export function calculatePrice(
  camperSlug: string,
  pickupDate: Date,
  dropoffDate: Date,
  selectedAddonIds: string[]
): PriceBreakdown {
  const rates = CAMPER_RATES[camperSlug] ?? CAMPER_RATES["2-berth"];
  const dayBreakdowns: DayBreakdown[] = [];

  // Iterate each day from pickup (inclusive) to dropoff (exclusive)
  const cursor = new Date(pickupDate);
  cursor.setHours(12, 0, 0, 0);
  const end = new Date(dropoffDate);
  end.setHours(12, 0, 0, 0);

  while (cursor < end) {
    const season = getSeason(cursor);
    dayBreakdowns.push({
      date: cursor.toISOString().split("T")[0],
      season,
      ratePerDay: rates[season],
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  const days = dayBreakdowns.length;
  const camperTotal = dayBreakdowns.reduce((sum, d) => sum + d.ratePerDay, 0);

  const selectedAddons = ADDONS.filter((a) => selectedAddonIds.includes(a.id));
  const addonTotal = selectedAddons.reduce((sum, a) => sum + a.pricePerDay * days, 0);

  return {
    days,
    dayBreakdowns,
    camperTotal,
    addonTotal,
    grandTotal: camperTotal + addonTotal,
    lowDays: dayBreakdowns.filter((d) => d.season === "low").length,
    shoulderDays: dayBreakdowns.filter((d) => d.season === "shoulder").length,
    highDays: dayBreakdowns.filter((d) => d.season === "high").length,
  };
}

export function formatNZD(cents: number): string {
  return `NZ$${(cents / 100).toLocaleString("en-NZ", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}
