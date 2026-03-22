"use client";

import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import type { PriceBreakdown } from "@/lib/pricing";

function formatEuro(cents: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

interface PriceCalculatorProps {
  price: PriceBreakdown | null;
  loading: boolean;
  error: string | null;
}

export function PriceCalculator({
  price,
  loading,
  error,
}: PriceCalculatorProps) {
  const t = useTranslations("booking");

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-terracotta-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-card bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (!price) {
    return (
      <div className="rounded-card bg-sand p-4 text-center text-sm text-dark-light">
        {t("selectDates")}
      </div>
    );
  }

  if (price.minNightsViolation) {
    return (
      <div className="rounded-card bg-yellow-50 p-4 text-sm text-yellow-800">
        {t("minNights", { min: price.minNights })}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-display text-lg font-bold text-dark">
        {t("priceBreakdown")}
      </h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-dark-light">
            {t("nightlyRate")} ({price.nights} {t.raw("nights") || "Nächte"})
          </span>
          <span className="font-semibold text-dark">
            {formatEuro(price.totalAccommodation)}
          </span>
        </div>

        {price.nights > 1 && (
          <div className="flex justify-between text-xs text-dark-light/70">
            <span>
              ∅ {formatEuro(price.averagePricePerNight)} / Nacht
            </span>
            <span />
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-dark-light">{t("cleaningFee")}</span>
          <span className="font-semibold text-dark">
            {formatEuro(price.cleaningFee)}
          </span>
        </div>

        {price.petFee > 0 && (
          <div className="flex justify-between">
            <span className="text-dark-light">{t("petFee")}</span>
            <span className="font-semibold text-dark">
              {formatEuro(price.petFee)}
            </span>
          </div>
        )}

        <div className="border-t border-warm pt-2">
          <div className="flex justify-between text-base">
            <span className="font-bold text-dark">{t("total")}</span>
            <span className="font-display text-xl font-bold text-terracotta-500">
              {formatEuro(price.totalPrice)}
            </span>
          </div>
        </div>

        <div className="rounded-button bg-olive-50 p-3 text-xs">
          <span className="text-olive-700">{t("paymentNote")}</span>
        </div>
      </div>
    </div>
  );
}
