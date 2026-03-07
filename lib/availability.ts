import { supabase } from "./supabase";
import { rangesOverlap } from "./date-utils";

export interface DateRange {
  start: string; // ISO date "YYYY-MM-DD"
  end: string;
}

export async function getUnavailableDates(camperSlug: string): Promise<DateRange[]> {
  // Fetch camper id from slug
  const { data: camper } = await supabase
    .from("campers")
    .select("id")
    .eq("slug", camperSlug)
    .single();

  if (!camper) return [];

  const camperId = camper.id;
  const ranges: DateRange[] = [];

  // Confirmed bookings
  const { data: bookings } = await supabase
    .from("bookings")
    .select("pickup_date, dropoff_date")
    .eq("camper_id", camperId)
    .in("status", ["confirmed", "pending"]);

  if (bookings) {
    for (const b of bookings) {
      ranges.push({ start: b.pickup_date, end: b.dropoff_date });
    }
  }

  // Blocked dates
  const { data: blocked } = await supabase
    .from("blocked_dates")
    .select("start_date, end_date")
    .eq("camper_id", camperId);

  if (blocked) {
    for (const b of blocked) {
      ranges.push({ start: b.start_date, end: b.end_date });
    }
  }

  return ranges;
}

export async function isAvailable(
  camperSlug: string,
  pickupDate: Date,
  dropoffDate: Date
): Promise<boolean> {
  const ranges = await getUnavailableDates(camperSlug);
  return !rangesOverlap(pickupDate, dropoffDate, ranges);
}
