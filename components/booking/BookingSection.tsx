"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Home, Building2, Info } from "lucide-react";
import { AvailabilityCalendar } from "./AvailabilityCalendar";
import { BookingForm } from "./BookingForm";
import {
  type Season,
  apartmentBlockedDates,
  isApartmentAllowedForRange,
  minNightsForCheckIn,
} from "@/lib/seasons";

interface BookingSectionProps {
  locale: string;
}

export function BookingSection({ locale }: BookingSectionProps) {
  const t = useTranslations("booking");
  const [property, setProperty] = useState<"haus" | "apartment">("haus");
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);

  useEffect(() => {
    fetch("/api/seasons")
      .then((r) => r.json())
      .then((data: { seasons: Season[] }) => setSeasons(data.seasons ?? []))
      .catch(() => setSeasons([]));
  }, []);

  const apartmentBlocked = useMemo(
    () => apartmentBlockedDates(seasons),
    [seasons]
  );

  const minNights = useMemo(
    () => minNightsForCheckIn(checkIn, seasons),
    [checkIn, seasons]
  );

  const apartmentCheck = useMemo(() => {
    if (!checkIn || !checkOut) {
      return { available: true, blockingSeason: null as string | null };
    }
    return isApartmentAllowedForRange(checkIn, checkOut, seasons);
  }, [checkIn, checkOut, seasons]);

  // If user picks dates that don't allow apartment, snap selection back to house.
  useEffect(() => {
    if (property === "apartment" && !apartmentCheck.available) {
      setProperty("haus");
    }
  }, [property, apartmentCheck.available]);

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

        {/* Saison-Hinweis: Poolwohnung nur in Vor-/Nachsaison separat buchbar */}
        <div className="mt-3 flex items-start gap-2 rounded-card border border-sand-300 bg-warm-50/40 p-3 text-xs text-dark-light">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-terracotta-500" />
          <p>
            {locale === "de"
              ? "Die Poolwohnung kann nur in der Vor- und Nachsaison separat gemietet werden. In der Hochsaison (Juli/August) ist sie ausschließlich Teil des Gesamthauses."
              : "The pool apartment can only be rented separately in the pre- and post-season. During high season (July/August) it is included only as part of the entire house."}
          </p>
        </div>
      </div>

      {/* Interactive Availability Calendar */}
      <AvailabilityCalendar
        locale={locale}
        property={property}
        minNights={minNights}
        extraBlockedDates={property === "apartment" ? apartmentBlocked : []}
        onRangeChange={handleRangeChange}
      />

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-sand-300" />
        <p className="font-accent text-sm font-semibold text-terracotta-500">
          {locale === "de" ? "Anfrage senden" : "Send inquiry"}
        </p>
        <div className="h-px flex-1 bg-sand-300" />
      </div>

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
