"use client";

import { useTranslations } from "next-intl";
import { Home, Building2 } from "lucide-react";
import type { PropertyType } from "@/lib/pricing";

interface PropertySelectorProps {
  value: PropertyType;
  onChange: (type: PropertyType) => void;
  apartmentDisabled?: boolean;
}

export function PropertySelector({
  value,
  onChange,
  apartmentDisabled,
}: PropertySelectorProps) {
  const t = useTranslations("home.rentalOptions");

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => onChange("house")}
        className={`flex items-center gap-3 rounded-card border-2 p-4 text-left transition-all ${
          value === "house"
            ? "border-terracotta-500 bg-terracotta-50"
            : "border-warm bg-white hover:border-terracotta-300"
        }`}
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            value === "house" ? "bg-terracotta-500 text-white" : "bg-olive-50 text-olive-500"
          }`}
        >
          <Home className="h-5 w-5" />
        </div>
        <div>
          <p className="font-display font-bold text-dark">
            {t("wholeHouse.title")}
          </p>
          <p className="text-sm text-dark-light">{t("wholeHouse.details")}</p>
        </div>
      </button>

      <button
        type="button"
        onClick={() => !apartmentDisabled && onChange("apartment")}
        disabled={apartmentDisabled}
        className={`flex items-center gap-3 rounded-card border-2 p-4 text-left transition-all ${
          apartmentDisabled
            ? "cursor-not-allowed border-warm bg-gray-50 opacity-60"
            : value === "apartment"
              ? "border-adriatic-500 bg-adriatic-50"
              : "border-warm bg-white hover:border-adriatic-300"
        }`}
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            value === "apartment"
              ? "bg-adriatic-500 text-white"
              : "bg-adriatic-50 text-adriatic-500"
          }`}
        >
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <p className="font-display font-bold text-dark">
            {t("apartment.title")}
          </p>
          <p className="text-sm text-dark-light">{t("apartment.details")}</p>
          {apartmentDisabled && (
            <p className="mt-1 text-xs text-terracotta-500">
              Nur Okt–Apr verfügbar
            </p>
          )}
        </div>
      </button>
    </div>
  );
}
