"use client";

import { useEffect, useState, useCallback } from "react";
import { DayPicker } from "react-day-picker";
import { de, enUS } from "react-day-picker/locale";
import { addDays, isBefore, startOfDay, format, parseISO } from "date-fns";
import type { DateRange } from "react-day-picker";
import "react-day-picker/style.css";

interface AvailabilityCalendarProps {
  locale: string;
  property: "haus" | "apartment";
  minNights: number;
  onRangeChange: (checkIn: string | null, checkOut: string | null) => void;
}

export function AvailabilityCalendar({
  locale,
  property,
  minNights,
  onRangeChange,
}: AvailabilityCalendarProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setRange(undefined);
    onRangeChange(null, null);

    fetch(`/api/availability?property=${property}`)
      .then((res) => res.json())
      .then((data: { blockedDates: string[] }) => {
        setBlockedDates(
          data.blockedDates.map((d: string) => startOfDay(parseISO(d)))
        );
      })
      .catch(() => {
        setBlockedDates([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // onRangeChange is stable from parent via useCallback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property]);

  const today = startOfDay(new Date());

  const disabledDays = [{ before: today }, ...blockedDates];

  const isRangeBlocked = useCallback(
    (from: Date, to: Date): boolean => {
      for (const blocked of blockedDates) {
        if (blocked >= from && blocked < to) {
          return true;
        }
      }
      return false;
    },
    [blockedDates]
  );

  const handleSelect = (newRange: DateRange | undefined) => {
    if (!newRange) {
      setRange(undefined);
      onRangeChange(null, null);
      return;
    }

    if (newRange.from && !newRange.to) {
      setRange(newRange);
      onRangeChange(format(newRange.from, "yyyy-MM-dd"), null);
      return;
    }

    if (newRange.from && newRange.to) {
      // Enforce minimum nights
      const minCheckout = addDays(newRange.from, minNights);
      const effectiveTo = isBefore(newRange.to, minCheckout)
        ? minCheckout
        : newRange.to;

      // Check if any blocked dates fall within the range
      if (isRangeBlocked(newRange.from, effectiveTo)) {
        // Reset — can't book across blocked dates
        setRange({ from: newRange.from, to: undefined });
        onRangeChange(format(newRange.from, "yyyy-MM-dd"), null);
        return;
      }

      setRange({ from: newRange.from, to: effectiveTo });
      onRangeChange(
        format(newRange.from, "yyyy-MM-dd"),
        format(effectiveTo, "yyyy-MM-dd")
      );
    }
  };

  const nights =
    range?.from && range?.to
      ? Math.round(
          (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;

  if (isLoading) {
    return (
      <div className="flex h-[320px] items-center justify-center rounded-card border border-sand-300 bg-white">
        <div className="flex flex-col items-center gap-2 text-dark-light">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-terracotta-400 border-t-transparent" />
          <span className="text-sm">
            {locale === "de"
              ? "Verfügbarkeit wird geladen..."
              : "Loading availability..."}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={handleSelect}
        locale={locale === "de" ? de : enUS}
        disabled={disabledDays}
        numberOfMonths={2}
        showOutsideDays={false}
        className="villa-calendar mx-auto"
      />

      <div className="mt-3 text-center text-sm text-dark-light">
        {nights > 0 && (
          <p className="font-semibold text-terracotta-500">
            {nights} {nights === 1 ? (locale === "de" ? "Nacht" : "night") : (locale === "de" ? "Nächte" : "nights")}{" "}
            {locale === "de" ? "ausgewählt" : "selected"}
          </p>
        )}
        {range?.from && !range?.to && (
          <p>
            {locale === "de"
              ? `Abreise wählen (mind. ${minNights} Nächte)`
              : `Select checkout (min. ${minNights} nights)`}
          </p>
        )}
        {!range?.from && (
          <p>
            {locale === "de"
              ? "Klicken Sie auf Ihr gewünschtes Anreisedatum"
              : "Click your desired check-in date"}
          </p>
        )}
      </div>
    </div>
  );
}
