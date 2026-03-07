import type { DateRange } from "./availability";

export function isDateInRanges(date: Date, ranges: DateRange[]): boolean {
  const d = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return ranges.some((r) => d >= r.start && d < r.end);
}

export function rangesOverlap(
  pickupDate: Date,
  dropoffDate: Date,
  ranges: DateRange[]
): boolean {
  const pickup = `${pickupDate.getFullYear()}-${String(pickupDate.getMonth() + 1).padStart(2, "0")}-${String(pickupDate.getDate()).padStart(2, "0")}`;
  const dropoff = `${dropoffDate.getFullYear()}-${String(dropoffDate.getMonth() + 1).padStart(2, "0")}-${String(dropoffDate.getDate()).padStart(2, "0")}`;
  return ranges.some((r) => pickup < r.end && dropoff > r.start);
}
