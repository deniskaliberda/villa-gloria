"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { AvailabilityCalendar } from "@/components/booking/AvailabilityCalendar";
import { PropertySelector } from "@/components/booking/PropertySelector";
import { PriceCalculator } from "@/components/booking/PriceCalculator";
import { BookingForm } from "@/components/booking/BookingForm";
import { Card, CardContent } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { usePriceCalculation } from "@/hooks/usePriceCalculation";
import type { PropertyType } from "@/lib/pricing";
import type { DateRange } from "react-day-picker";

export default function BookingPage() {
  const t = useTranslations("booking");
  const locale = useLocale();

  const [propertyType, setPropertyType] = useState<PropertyType>("house");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [hasPet, setHasPet] = useState(false);

  const checkIn = dateRange?.from
    ? dateRange.from.toISOString().split("T")[0]
    : null;
  const checkOut = dateRange?.to
    ? dateRange.to.toISOString().split("T")[0]
    : null;

  const { price, loading: priceLoading, error: priceError } =
    usePriceCalculation(checkIn, checkOut, propertyType, hasPet);

  // Apartment is only available Oct-Apr
  const isApartmentAvailable = (() => {
    if (!dateRange?.from || !dateRange?.to) return true;
    const month = dateRange.from.getMonth(); // 0-indexed
    // Available: Oct(9), Nov(10), Dec(11), Jan(0), Feb(1), Mar(2), Apr(3)
    return month >= 9 || month <= 3;
  })();

  return (
    <main className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal>
          <h1 className="font-display text-4xl font-bold text-dark md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-dark-light">{t("description")}</p>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Left column: Calendar + Property Selector */}
          <div className="space-y-8 lg:col-span-2">
            <ScrollReveal delay={0.1}>
              <Card>
                <CardContent className="p-6">
                  <PropertySelector
                    value={propertyType}
                    onChange={setPropertyType}
                    apartmentDisabled={!isApartmentAvailable}
                  />
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card>
                <CardContent className="p-6">
                  <AvailabilityCalendar
                    propertyType={propertyType}
                    selected={dateRange}
                    onSelect={setDateRange}
                    locale={locale}
                  />
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Card>
                <CardContent className="p-6">
                  <BookingForm
                    checkIn={checkIn}
                    checkOut={checkOut}
                    propertyType={propertyType}
                    hasPet={hasPet}
                    onPetChange={setHasPet}
                    price={price}
                  />
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Right column: Price Calculator (sticky) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <ScrollReveal delay={0.2}>
                <Card>
                  <CardContent className="p-6">
                    <PriceCalculator
                      price={price}
                      loading={priceLoading}
                      error={priceError}
                    />
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
