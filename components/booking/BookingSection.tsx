"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Home, Building2, CalendarSearch } from "lucide-react";
import { SmoobuWidget } from "./SmoobuWidget";
import { BookingForm } from "./BookingForm";

interface BookingSectionProps {
  locale: string;
}

export function BookingSection({ locale }: BookingSectionProps) {
  const t = useTranslations("booking");
  const [property, setProperty] = useState<"haus" | "apartment">("haus");

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

      {/* Smoobu Availability Widget */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <CalendarSearch className="h-5 w-5 text-terracotta-500" />
          <p className="font-accent text-sm font-semibold text-dark">
            {locale === "de"
              ? "Verfügbarkeit prüfen"
              : "Check availability"}
          </p>
        </div>
        <div className="rounded-card border border-sand-300 bg-white p-4">
          <SmoobuWidget locale={locale} />
          <p className="mt-3 text-center text-xs text-dark-light">
            {locale === "de"
              ? "Prüfen Sie die Verfügbarkeit im Kalender und tragen Sie Ihre Wunschdaten unten ein."
              : "Check availability in the calendar and enter your preferred dates below."}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-sand-300" />
        <p className="font-accent text-sm font-semibold text-terracotta-500">
          {locale === "de" ? "Anfrage senden" : "Send inquiry"}
        </p>
        <div className="h-px flex-1 bg-sand-300" />
      </div>

      {/* Form */}
      <BookingForm locale={locale} property={property} />
    </div>
  );
}
