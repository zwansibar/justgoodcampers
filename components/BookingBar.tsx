"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BookingBarProps {
  className?: string;
}

export default function BookingBar({ className = "" }: BookingBarProps) {
  const [camper, setCamper] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/book");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl shadow-xl ${className}`}
      aria-label="Camper booking search"
    >
      {/* Desktop: single row */}
      <div className="hidden md:flex items-stretch divide-x divide-border">
        {/* Camper select */}
        <div className="flex-1 flex flex-col justify-center px-5 py-4">
          <label className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-1.5">
            Camper
          </label>
          <select
            value={camper}
            onChange={(e) => setCamper(e.target.value)}
            className="w-full font-body text-ink text-sm bg-transparent border-none outline-none cursor-pointer appearance-none"
          >
            <option value="">Choose camper</option>
            <option value="2-berth">2-Berth Compact</option>
            <option value="4-berth">4-Berth Family</option>
          </select>
        </div>

        {/* Pick-up date */}
        <div className="flex-1 flex flex-col justify-center px-5 py-4">
          <label className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-1.5">
            Pick-up
          </label>
          <input
            type="date"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full font-body text-ink text-sm bg-transparent border-none outline-none [color-scheme:light]"
          />
        </div>

        {/* Drop-off date */}
        <div className="flex-1 flex flex-col justify-center px-5 py-4">
          <label className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-1.5">
            Drop-off
          </label>
          <input
            type="date"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="w-full font-body text-ink text-sm bg-transparent border-none outline-none [color-scheme:light]"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center px-4 py-3">
          <button
            type="submit"
            className="bg-accent text-white font-display font-bold text-sm px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors duration-200 whitespace-nowrap"
          >
            Search
          </button>
        </div>
      </div>

      {/* Mobile: stacked */}
      <div className="flex flex-col divide-y divide-border md:hidden">
        <div className="px-5 py-4">
          <label className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-1.5">
            Camper
          </label>
          <select
            value={camper}
            onChange={(e) => setCamper(e.target.value)}
            className="w-full font-body text-ink text-base bg-transparent border-none outline-none cursor-pointer appearance-none"
          >
            <option value="">Choose camper</option>
            <option value="2-berth">2-Berth Compact</option>
            <option value="4-berth">4-Berth Family</option>
          </select>
        </div>

        <div className="px-5 py-4">
          <label className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-1.5">
            Pick-up date
          </label>
          <input
            type="date"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full font-body text-ink text-base bg-transparent border-none outline-none [color-scheme:light]"
          />
        </div>

        <div className="px-5 py-4">
          <label className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-1.5">
            Drop-off date
          </label>
          <input
            type="date"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="w-full font-body text-ink text-base bg-transparent border-none outline-none [color-scheme:light]"
          />
        </div>

        <div className="px-5 py-4">
          <button
            type="submit"
            className="w-full bg-accent text-white font-display font-bold text-sm px-6 py-4 rounded-xl hover:bg-accent/90 transition-colors duration-200"
          >
            Check Availability
          </button>
        </div>
      </div>
    </form>
  );
}
