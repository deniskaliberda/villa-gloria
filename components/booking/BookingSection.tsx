"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Home, Building2 } from "lucide-react";
import { AvailabilityCalendar } from "./AvailabilityCalendar";
import { BookingForm } from "./BookingForm";

interface BookingSectionProps {
  locale: string;
}

export function BookingSection({ locale }: BookingSectionProps) {
  const t = useTranslations("booking");
  const [property, setProperty] = useState<"haus" | "apartment">("haus");
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);

  const handleRangeChange = useCallback(
    (newCheckIn: string | null, newCheckOut: string | null) => {
      setCheckIn(newCheckIn);
      setCheckOut(newCheckOut);
    },
    []
  );

  return (
    <div className="space-y-8">
      {/* Property Toggle */}
      <div>
        <p className="mb-3 font-accent text-sm font-semibold text-dark">
          {t("selectProperty")}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setProperty("haus")}
            className={`flex flex-1 items-center gap-3 rounded-card border-2 p-4 transition-all ${
              property === "haus"
                ? "border-terracotta-500 bg-terracotta-50 text-dark"
                : "border-sand-300 bg-white text-dark-light hover:border-warm"
            }`}
          >
            <Home
              className={`h-5 w-5 shrink-0 ${
                property === "haus"
                  ? "text-terracotta-500"
                  : "text-dark-light"
              }`}
            />
            <div className="text-left">
              <p className="font-accent text-sm font-semibold">
                {locale === "de" ? "Gesamtes Haus" : "Entire House"}
              </p>
              <p className="text-xs text-dark-light">
                {locale === "de"
                  ? "Bis 9 Gäste · 4 Schlafzimmer"
                  : "Up to 9 guests · 4 bedrooms"}
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setProperty("apartment")}
            className={`flex flex-1 items-center gap-3 rounded-card border-2 p-4 transition-all ${
              property === "apartment"
                ? "border-terracotta-500 bg-terracotta-50 text-dark"
                : "border-sand-300 bg-white text-dark-light hover:border-warm"
            }`}
          >
            <Building2
              className={`h-5 w-5 shrink-0 ${
                property === "apartment"
                  ? "text-terracotta-500"
                  : "text-dark-light"
              }`}
            />
            <div className="text-left">
              <p className="font-accent text-sm font-semibold">
                {locale === "de" ? "Poolwohnung" : "Pool Apartment"}
              </p>
              <p className="text-xs text-dark-light">
                {locale === "de"
                  ? "2 Gäste + Aufbettung · 1 Schlafzimmer"
                  : "2 guests + extra bed · 1 bedroom"}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Calendar */}
      <AvailabilityCalendar
        locale={locale}
        property={property}
        minNights={3}
        onRangeChange={handleRangeChange}
      />

      {/* Form */}
      <BookingForm
        locale={locale}
        property={property}
        checkIn={checkIn}
        checkOut={checkOut}
      />
    </div>
  );
}
