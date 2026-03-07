"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ADDONS, CAMPER_RATES, calculatePrice, formatNZD } from "@/lib/pricing";
import type { DateRange } from "@/lib/availability";
import { rangesOverlap, isDateInRanges } from "@/lib/date-utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  flightNumber: string;
  notes: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CAMPERS = [
  {
    slug: "2-berth",
    name: "2-Berth Compact",
    tagline: "For couples & solo travellers",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=600&q=80",
    fromPrice: CAMPER_RATES["2-berth"].low,
  },
  {
    slug: "4-berth",
    name: "4-Berth Family",
    tagline: "For families & small groups",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80",
    fromPrice: CAMPER_RATES["4-berth"].low,
  },
];

function toLocalDateStr(date: Date): string {
  return date.toISOString().split("T")[0];
}

function parseLocalDate(str: string): Date {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDisplay(str: string): string {
  if (!str) return "";
  return parseLocalDate(str).toLocaleDateString("en-NZ", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function diffDays(a: string, b: string): number {
  return Math.round((parseLocalDate(b).getTime() - parseLocalDate(a).getTime()) / 86400000);
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────

function MiniCalendar({
  month, year, unavailable, pickup, dropoff,
  onPickDate, minDate,
}: {
  month: number; year: number;
  unavailable: DateRange[];
  pickup: string; dropoff: string;
  onPickDate: (d: string) => void;
  minDate: string;
}) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);

  return (
    <div>
      <div className="grid grid-cols-7 mb-1">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
          <div key={d} className="text-center font-body text-xs text-muted py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dateObj = parseLocalDate(dateStr);
          const isPast = dateStr < minDate;
          const isUnavail = isDateInRanges(dateObj, unavailable);
          const isDisabled = isPast || isUnavail;
          const isPickup = dateStr === pickup;
          const isDropoff = dateStr === dropoff;
          const isInRange = pickup && dropoff && dateStr > pickup && dateStr < dropoff;

          return (
            <button
              key={i}
              type="button"
              disabled={isDisabled}
              onClick={() => !isDisabled && onPickDate(dateStr)}
              className={[
                "h-9 w-full flex items-center justify-center font-body text-sm rounded-lg transition-colors duration-100",
                isDisabled ? "text-muted/40 cursor-not-allowed line-through" : "hover:bg-nature/10 cursor-pointer",
                isPickup || isDropoff ? "bg-accent text-white hover:bg-accent/90" : "",
                isInRange ? "bg-nature/10 text-dark" : "",
                !isPickup && !isDropoff && !isInRange && !isDisabled ? "text-dark" : "",
              ].join(" ")}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepBar({ current }: { current: number }) {
  const steps = ["Camper & Dates", "Add-ons", "Your Details", "Review"];
  return (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <div key={n} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className={[
                "w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm transition-colors duration-200",
                done ? "bg-nature text-white" : active ? "bg-accent text-white" : "bg-border text-muted",
              ].join(" ")}>
                {done ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                ) : n}
              </div>
              <span className={`font-body text-xs hidden sm:block ${active ? "text-dark font-medium" : "text-muted"}`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 ${done ? "bg-nature" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface Props {
  initialCamper: string;
  initialPickup: string;
  initialDropoff: string;
}

export default function BookingFlow({ initialCamper, initialPickup, initialDropoff }: Props) {
  const [step, setStep] = useState(1);
  const [camperSlug, setCamperSlug] = useState(initialCamper || "");
  const [pickup, setPickup] = useState(initialPickup || "");
  const [dropoff, setDropoff] = useState(initialDropoff || "");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [details, setDetails] = useState<CustomerDetails>({
    name: "", email: "", phone: "", flightNumber: "", notes: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [unavailable, setUnavailable] = useState<DateRange[]>([]);
  const [calMonth, setCalMonth] = useState(() => {
    const d = initialPickup ? parseLocalDate(initialPickup) : new Date();
    return { month: d.getMonth(), year: d.getFullYear() };
  });
  const [pickingFor, setPickingFor] = useState<"pickup" | "dropoff">("pickup");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ id: string; type: "direct" | "enquiry" } | null>(null);

  const today = toLocalDateStr(new Date());
  const camper = CAMPERS.find((c) => c.slug === camperSlug);
  const numDays = pickup && dropoff ? diffDays(pickup, dropoff) : 0;
  const pricing = camper && pickup && dropoff && numDays >= 5
    ? calculatePrice(camperSlug, parseLocalDate(pickup), parseLocalDate(dropoff), selectedAddons)
    : null;

  // Load unavailability when camper changes
  useEffect(() => {
    if (!camperSlug) return;
    (async () => {
      const { data: camperRow } = await supabase.from("campers").select("id").eq("slug", camperSlug).single();
      if (!camperRow) return;
      const id = camperRow.id;
      const [{ data: bookings }, { data: blocked }] = await Promise.all([
        supabase.from("bookings").select("pickup_date,dropoff_date").eq("camper_id", id).in("status", ["confirmed", "pending"]),
        supabase.from("blocked_dates").select("start_date,end_date").eq("camper_id", id),
      ]);
      const ranges: DateRange[] = [];
      (bookings ?? []).forEach((b: { pickup_date: string; dropoff_date: string }) => ranges.push({ start: b.pickup_date, end: b.dropoff_date }));
      (blocked ?? []).forEach((b: { start_date: string; end_date: string }) => ranges.push({ start: b.start_date, end: b.end_date }));
      setUnavailable(ranges);
    })();
  }, [camperSlug]);

  const handleDatePick = useCallback((dateStr: string) => {
    if (pickingFor === "pickup") {
      setPickup(dateStr);
      setDropoff("");
      setPickingFor("dropoff");
    } else {
      if (dateStr <= pickup) {
        setPickup(dateStr);
        setDropoff("");
        setPickingFor("dropoff");
        return;
      }
      // Check overlap
      if (rangesOverlap(parseLocalDate(pickup), parseLocalDate(dateStr), unavailable)) {
        setErrors({ dates: "These dates overlap with an unavailable period. Please choose different dates." });
        return;
      }
      setDropoff(dateStr);
      setPickingFor("pickup");
      setErrors({});
    }
  }, [pickingFor, pickup, unavailable]);

  // ── Step 1 validation ──
  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!camperSlug) e.camper = "Please select a camper.";
    if (!pickup) e.dates = "Please select a pick-up date.";
    if (!dropoff) e.dates = "Please select a drop-off date.";
    if (pickup && dropoff && numDays < 5) e.dates = "Minimum rental is 5 days.";
    if (pickup && pickup < today) e.dates = "Pick-up date must be in the future.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Step 3 validation ──
  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (!details.name.trim()) e.name = "Full name is required.";
    if (!details.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) e.email = "Valid email is required.";
    if (!details.phone.trim()) e.phone = "Phone number is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit booking ──
  async function submitBooking(type: "direct" | "enquiry") {
    if (!agreed) { setErrors({ terms: "Please agree to the rental terms." }); return; }
    if (!pricing || !camper) return;
    setSubmitting(true);
    setErrors({});

    try {
      // Get camper id
      const { data: camperRow } = await supabase.from("campers").select("id").eq("slug", camperSlug).single();
      if (!camperRow) throw new Error("Camper not found");

      const addonData = ADDONS.filter((a) => selectedAddons.includes(a.id)).map((a) => ({
        id: a.id, label: a.label, pricePerDay: a.pricePerDay,
      }));

      const { data: booking, error } = await supabase.from("bookings").insert({
        camper_id: camperRow.id,
        customer_name: details.name,
        customer_email: details.email,
        customer_phone: details.phone,
        pickup_date: pickup,
        dropoff_date: dropoff,
        num_days: pricing.days,
        total_price: pricing.grandTotal,
        addons: addonData,
        status: type === "direct" ? "confirmed" : "pending",
        booking_type: type,
        notes: details.notes || null,
        flight_number: details.flightNumber || null,
      }).select("id").single();

      if (error) throw error;

      // Send emails (non-blocking — don't fail booking if email fails)
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: booking.id,
          bookingType: type,
          customerName: details.name,
          customerEmail: details.email,
          customerPhone: details.phone,
          camperName: camper.name,
          pickupDate: pickup,
          dropoffDate: dropoff,
          numDays: pricing.days,
          totalPrice: pricing.grandTotal,
          addons: addonData,
          flightNumber: details.flightNumber || undefined,
          notes: details.notes || undefined,
        }),
      }).catch(() => {});

      setBookingResult({ id: booking.id, type });
      setStep(5);
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Something went wrong. Please try again or contact us on WhatsApp." });
    } finally {
      setSubmitting(false);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 5 — Confirmation
  // ─────────────────────────────────────────────────────────────────────────
  if (step === 5 && bookingResult) {
    const isDirect = bookingResult.type === "direct";
    return (
      <div className="min-h-screen pt-20 bg-light flex items-center justify-center px-6 py-20">
        <div className="max-w-lg w-full text-center">
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${isDirect ? "bg-nature/10" : "bg-accent/10"}`}>
            {isDirect ? (
              <svg className="w-10 h-10 text-nature" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            ) : (
              <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            )}
          </div>
          <h1 className="font-display font-bold text-3xl text-dark mb-3">
            {isDirect ? "Booking confirmed!" : "Enquiry sent!"}
          </h1>
          <p className="font-body text-muted text-base leading-relaxed mb-2">
            {isDirect
              ? "Your booking is locked in. We'll send a confirmation email shortly with everything you need to know."
              : "We've received your request and will get back to you within a few hours with availability and next steps."}
          </p>
          {isDirect && (
            <p className="font-body text-sm text-muted/70 mb-8">
              Reference: <span className="font-mono font-medium text-dark">#{bookingResult.id.slice(0, 8).toUpperCase()}</span>
            </p>
          )}
          {/* Summary card */}
          {camper && (
            <div className="bg-card border border-border rounded-2xl p-6 text-left mb-8">
              <p className="font-display font-bold text-sm text-dark mb-4">{camper.name}</p>
              <div className="space-y-2 text-sm font-body">
                <div className="flex justify-between"><span className="text-muted">Pick-up</span><span className="text-dark font-medium">{formatDisplay(pickup)}</span></div>
                <div className="flex justify-between"><span className="text-muted">Drop-off</span><span className="text-dark font-medium">{formatDisplay(dropoff)}</span></div>
                {pricing && <div className="flex justify-between border-t border-border pt-2 mt-2"><span className="font-medium text-dark">Total</span><span className="font-bold text-dark">{formatNZD(pricing.grandTotal)}</span></div>}
              </div>
            </div>
          )}
          <a
            href="https://wa.me/64000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-display font-bold text-sm hover:bg-[#1ebe5d] transition-colors duration-200 mb-4"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Questions? Message us on WhatsApp
          </a>
          <div className="mt-2">
            <Link href="/" className="font-body text-sm text-nature hover:underline">← Back to homepage</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-light">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-display font-bold text-heading text-dark mb-2">Book your camper</h1>
        <p className="font-body text-muted mb-8">Auckland pickup · Minimum 5 days · No deposit required</p>
        <StepBar current={step} />

        {/* ── STEP 1: Camper & Dates ── */}
        {step === 1 && (
          <div>
            <h2 className="font-display font-bold text-xl text-dark mb-5">Choose your camper</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {CAMPERS.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => { setCamperSlug(c.slug); setErrors({}); }}
                  className={[
                    "text-left rounded-2xl border-2 overflow-hidden transition-all duration-200 focus:outline-none",
                    camperSlug === c.slug ? "border-accent shadow-lg" : "border-border hover:border-nature/40",
                  ].join(" ")}
                >
                  <div className="relative h-40">
                    <Image src={c.image} alt={c.name} fill className="object-cover" sizes="300px" />
                    {camperSlug === c.slug && (
                      <div className="absolute top-3 right-3 w-7 h-7 bg-accent rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-display font-bold text-dark text-base">{c.name}</p>
                    <p className="font-body text-xs text-muted mb-1">{c.tagline}</p>
                    <p className="font-display font-bold text-sm text-accent">From {formatNZD(c.fromPrice)}/day</p>
                  </div>
                </button>
              ))}
            </div>
            {errors.camper && <p className="font-body text-sm text-red-500 mb-4">{errors.camper}</p>}

            <h2 className="font-display font-bold text-xl text-dark mb-2">Select your dates</h2>
            <p className="font-body text-xs text-muted mb-4">
              {pickingFor === "pickup" ? "Click a date to set pick-up" : "Now click a date to set drop-off"}
            </p>

            {/* Date display */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { label: "Pick-up", val: pickup, which: "pickup" as const },
                { label: "Drop-off", val: dropoff, which: "dropoff" as const },
              ].map(({ label, val, which }) => (
                <button
                  key={which}
                  type="button"
                  onClick={() => setPickingFor(which)}
                  className={[
                    "text-left p-4 rounded-xl border-2 transition-colors duration-150",
                    pickingFor === which ? "border-accent bg-accent/5" : "border-border bg-card hover:border-nature/40",
                  ].join(" ")}
                >
                  <p className="font-body text-xs text-muted uppercase tracking-wider mb-1">{label}</p>
                  <p className={`font-display font-bold text-sm ${val ? "text-dark" : "text-muted/50"}`}>
                    {val ? formatDisplay(val) : "Select date"}
                  </p>
                </button>
              ))}
            </div>

            {/* Calendar */}
            <div className="bg-card border border-border rounded-2xl p-5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => setCalMonth((m) => {
                    const d = new Date(m.year, m.month - 1, 1);
                    return { month: d.getMonth(), year: d.getFullYear() };
                  })}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-light transition-colors"
                >
                  <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <p className="font-display font-bold text-dark text-sm">
                  {new Date(calMonth.year, calMonth.month, 1).toLocaleDateString("en-NZ", { month: "long", year: "numeric" })}
                </p>
                <button
                  type="button"
                  onClick={() => setCalMonth((m) => {
                    const d = new Date(m.year, m.month + 1, 1);
                    return { month: d.getMonth(), year: d.getFullYear() };
                  })}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-light transition-colors"
                >
                  <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
              <MiniCalendar
                month={calMonth.month}
                year={calMonth.year}
                unavailable={unavailable}
                pickup={pickup}
                dropoff={dropoff}
                onPickDate={handleDatePick}
                minDate={today}
              />
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-accent/80" /><span className="font-body text-xs text-muted">Selected</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-nature/10" /><span className="font-body text-xs text-muted">In range</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-border" /><span className="font-body text-xs text-muted">Unavailable</span></div>
              </div>
            </div>

            {errors.dates && <p className="font-body text-sm text-red-500 mb-3">{errors.dates}</p>}

            {/* Price breakdown */}
            {pricing && (
              <div className="bg-nature/[0.06] border border-nature/15 rounded-xl p-4 mb-4">
                <p className="font-display font-bold text-sm text-dark mb-2">Price estimate</p>
                <div className="space-y-1 text-sm font-body">
                  {pricing.lowDays > 0 && (
                    <div className="flex justify-between text-muted">
                      <span>{pricing.lowDays} day{pricing.lowDays > 1 ? "s" : ""} · Low season</span>
                      <span>{formatNZD(CAMPER_RATES[camperSlug].low * pricing.lowDays)}</span>
                    </div>
                  )}
                  {pricing.shoulderDays > 0 && (
                    <div className="flex justify-between text-muted">
                      <span>{pricing.shoulderDays} day{pricing.shoulderDays > 1 ? "s" : ""} · Shoulder season</span>
                      <span>{formatNZD(CAMPER_RATES[camperSlug].shoulder * pricing.shoulderDays)}</span>
                    </div>
                  )}
                  {pricing.highDays > 0 && (
                    <div className="flex justify-between text-muted">
                      <span>{pricing.highDays} day{pricing.highDays > 1 ? "s" : ""} · High season</span>
                      <span>{formatNZD(CAMPER_RATES[camperSlug].high * pricing.highDays)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-dark border-t border-nature/20 pt-2 mt-1">
                    <span>Camper total ({pricing.days} days)</span>
                    <span>{formatNZD(pricing.camperTotal)}</span>
                  </div>
                </div>
              </div>
            )}

            {numDays > 0 && numDays < 5 && (
              <p className="font-body text-sm text-amber-600 mb-3">Minimum rental is 5 days ({numDays} selected).</p>
            )}

            <button
              type="button"
              onClick={() => validateStep1() && setStep(2)}
              className="w-full bg-accent text-white py-4 rounded-xl font-display font-bold text-sm hover:bg-accent/90 transition-colors duration-200"
            >
              Next: Add-ons →
            </button>
          </div>
        )}

        {/* ── STEP 2: Add-ons ── */}
        {step === 2 && (
          <div>
            <h2 className="font-display font-bold text-xl text-dark mb-1">Make it even better</h2>
            <p className="font-body text-muted text-sm mb-6">All add-ons are per day · {numDays} days rental</p>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {ADDONS.map((addon) => {
                const selected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => setSelectedAddons((prev) =>
                      selected ? prev.filter((id) => id !== addon.id) : [...prev, addon.id]
                    )}
                    className={[
                      "text-left p-4 rounded-xl border-2 transition-all duration-150",
                      selected ? "border-accent bg-accent/5" : "border-border bg-card hover:border-nature/40",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-display font-bold text-sm text-dark">{addon.label}</p>
                        <p className="font-body text-xs text-muted leading-relaxed mt-1">{addon.description}</p>
                      </div>
                      <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${selected ? "bg-accent" : "bg-border"}`}>
                        {selected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                    </div>
                    <p className="font-display font-bold text-xs text-accent mt-2">{formatNZD(addon.pricePerDay)}/day · {formatNZD(addon.pricePerDay * numDays)} total</p>
                  </button>
                );
              })}
            </div>

            {/* Running total */}
            {pricing && (
              <div className="bg-card border border-border rounded-xl p-4 mb-6">
                <div className="flex justify-between text-sm font-body text-muted mb-1">
                  <span>Camper ({pricing.days} days)</span>
                  <span>{formatNZD(pricing.camperTotal)}</span>
                </div>
                {pricing.addonTotal > 0 && (
                  <div className="flex justify-between text-sm font-body text-muted mb-1">
                    <span>Add-ons</span>
                    <span>{formatNZD(pricing.addonTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between font-display font-bold text-dark border-t border-border pt-2 mt-1">
                  <span>Total</span>
                  <span>{formatNZD(pricing.grandTotal)}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 border border-border text-ink py-4 rounded-xl font-body font-medium text-sm hover:bg-card transition-colors duration-200">← Back</button>
              <button type="button" onClick={() => setStep(3)} className="flex-[2] bg-accent text-white py-4 rounded-xl font-display font-bold text-sm hover:bg-accent/90 transition-colors duration-200">Next: Your Details →</button>
            </div>
            <button type="button" onClick={() => setStep(3)} className="w-full mt-2 font-body text-sm text-muted hover:text-dark transition-colors duration-200 text-center py-2">Skip add-ons</button>
          </div>
        )}

        {/* ── STEP 3: Details ── */}
        {step === 3 && (
          <div>
            <h2 className="font-display font-bold text-xl text-dark mb-6">Your details</h2>
            <div className="space-y-5">
              {[
                { id: "name", label: "Full name", type: "text", placeholder: "Jane Smith", required: true },
                { id: "email", label: "Email address", type: "email", placeholder: "jane@example.com", required: true },
                { id: "phone", label: "Phone number", type: "tel", placeholder: "+64 21 123 4567", required: true },
                { id: "flightNumber", label: "Arrival flight number (optional)", type: "text", placeholder: "NZ001" },
              ].map(({ id, label, type, placeholder, required }) => (
                <div key={id}>
                  <label htmlFor={`f-${id}`} className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-2">{label}</label>
                  <input
                    id={`f-${id}`}
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    value={details[id as keyof CustomerDetails]}
                    onChange={(e) => setDetails((d) => ({ ...d, [id]: e.target.value }))}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 font-body text-ink text-sm outline-none focus:border-accent transition-colors duration-200"
                  />
                  {errors[id] && <p className="font-body text-xs text-red-500 mt-1">{errors[id]}</p>}
                </div>
              ))}
              <div>
                <label htmlFor="f-notes" className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-2">Special requests (optional)</label>
                <textarea
                  id="f-notes"
                  rows={3}
                  placeholder="Anything else we should know?"
                  value={details.notes}
                  onChange={(e) => setDetails((d) => ({ ...d, notes: e.target.value }))}
                  className="w-full bg-card border border-border rounded-xl px-4 py-3 font-body text-ink text-sm outline-none focus:border-accent transition-colors duration-200 resize-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button type="button" onClick={() => setStep(2)} className="flex-1 border border-border text-ink py-4 rounded-xl font-body font-medium text-sm hover:bg-card transition-colors duration-200">← Back</button>
              <button type="button" onClick={() => validateStep3() && setStep(4)} className="flex-[2] bg-accent text-white py-4 rounded-xl font-display font-bold text-sm hover:bg-accent/90 transition-colors duration-200">Review booking →</button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Review & Confirm ── */}
        {step === 4 && camper && pricing && (
          <div>
            <h2 className="font-display font-bold text-xl text-dark mb-6">Review your booking</h2>

            <div className="bg-card border border-border rounded-2xl divide-y divide-border mb-6">
              {/* Camper */}
              <div className="p-5">
                <p className="font-body text-xs text-muted uppercase tracking-wider mb-1">Camper</p>
                <p className="font-display font-bold text-dark">{camper.name}</p>
              </div>
              {/* Dates */}
              <div className="p-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-body text-xs text-muted uppercase tracking-wider mb-1">Pick-up</p>
                  <p className="font-display font-bold text-dark text-sm">{formatDisplay(pickup)}</p>
                </div>
                <div>
                  <p className="font-body text-xs text-muted uppercase tracking-wider mb-1">Drop-off</p>
                  <p className="font-display font-bold text-dark text-sm">{formatDisplay(dropoff)}</p>
                </div>
              </div>
              {/* Price breakdown */}
              <div className="p-5">
                <p className="font-body text-xs text-muted uppercase tracking-wider mb-3">Price breakdown</p>
                <div className="space-y-1.5 text-sm font-body">
                  {pricing.lowDays > 0 && <div className="flex justify-between text-muted"><span>{pricing.lowDays}d × Low season</span><span>{formatNZD(CAMPER_RATES[camperSlug].low * pricing.lowDays)}</span></div>}
                  {pricing.shoulderDays > 0 && <div className="flex justify-between text-muted"><span>{pricing.shoulderDays}d × Shoulder season</span><span>{formatNZD(CAMPER_RATES[camperSlug].shoulder * pricing.shoulderDays)}</span></div>}
                  {pricing.highDays > 0 && <div className="flex justify-between text-muted"><span>{pricing.highDays}d × High season</span><span>{formatNZD(CAMPER_RATES[camperSlug].high * pricing.highDays)}</span></div>}
                  {ADDONS.filter((a) => selectedAddons.includes(a.id)).map((a) => (
                    <div key={a.id} className="flex justify-between text-muted"><span>{a.label}</span><span>{formatNZD(a.pricePerDay * pricing.days)}</span></div>
                  ))}
                  <div className="flex justify-between font-bold text-dark border-t border-border pt-2 mt-1 text-base">
                    <span>Total ({pricing.days} days)</span>
                    <span>{formatNZD(pricing.grandTotal)}</span>
                  </div>
                </div>
              </div>
              {/* Customer details */}
              <div className="p-5">
                <p className="font-body text-xs text-muted uppercase tracking-wider mb-3">Your details</p>
                <div className="space-y-1 text-sm font-body">
                  <div className="flex justify-between"><span className="text-muted">Name</span><span className="text-dark">{details.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Email</span><span className="text-dark">{details.email}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Phone</span><span className="text-dark">{details.phone}</span></div>
                  {details.flightNumber && <div className="flex justify-between"><span className="text-muted">Flight</span><span className="text-dark">{details.flightNumber}</span></div>}
                  {details.notes && <div className="flex flex-col gap-1"><span className="text-muted">Notes</span><span className="text-dark">{details.notes}</span></div>}
                </div>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => { setAgreed(e.target.checked); setErrors({}); }}
                className="mt-0.5 w-4 h-4 rounded border-border accent-accent"
              />
              <span className="font-body text-sm text-muted">
                I agree to the{" "}
                <Link href="/faq" className="text-nature hover:underline">rental terms and conditions</Link>.
                I understand there is no deposit and free cancellation up to 14 days before pickup.
              </span>
            </label>
            {errors.terms && <p className="font-body text-sm text-red-500 mb-3">{errors.terms}</p>}
            {errors.submit && <p className="font-body text-sm text-red-500 mb-3">{errors.submit}</p>}

            {/* Action buttons */}
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                disabled={submitting}
                onClick={() => submitBooking("direct")}
                className="bg-accent text-white py-4 rounded-xl font-display font-bold text-sm hover:bg-accent/90 disabled:opacity-60 transition-colors duration-200"
              >
                {submitting ? "Confirming…" : "Confirm booking"}
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={() => submitBooking("enquiry")}
                className="border-2 border-border text-ink py-4 rounded-xl font-display font-bold text-sm hover:bg-card disabled:opacity-60 transition-colors duration-200"
              >
                {submitting ? "Sending…" : "Send as enquiry"}
              </button>
            </div>
            <p className="font-body text-xs text-muted/70 text-center mb-4">
              No deposit required · Free cancellation up to 14 days before pickup · We&apos;ll confirm within hours
            </p>
            <button type="button" onClick={() => setStep(3)} className="w-full font-body text-sm text-muted hover:text-dark transition-colors duration-200 text-center py-2">← Edit details</button>
          </div>
        )}
      </div>
    </div>
  );
}
