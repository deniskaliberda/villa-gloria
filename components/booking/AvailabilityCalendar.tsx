"use client";

import { useEffect, useState, useCallback } from "react";
import { DayPicker } from "react-day-picker";
import { de, enUS } from "react-day-picker/locale";
import { addDays, isBefore, startOfDay, format, parseISO } from "date-fns";
import type { DateRange } from "react-day-picker";
import { RotateCcw } from "lucide-react";
import "react-day-picker/style.css";

interface AvailabilityCalendarProps {
  locale: string;
  property: "haus" | "apartment";
  minNights: number;
  onRangeChange: (checkIn: string | null, checkOut: string | null) => void;
}

type SelectionPhase = "check-in" | "check-out" | "complete";

export function AvailabilityCalendar({
  locale,
  property,
  minNights,
  onRangeChange,
}: AvailabilityCalendarProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [phase, setPhase] = useState<SelectionPhase>("check-in");
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setRange(undefined);
    setPhase("check-in");
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

  const handleReset = () => {
    setRange(undefined);
    setPhase("check-in");
    onRangeChange(null, null);
  };

  const handleDayClick = (day: Date) => {
    const clicked = startOfDay(day);

    if (phase === "check-in" || phase === "complete") {
      // Start new selection
      setRange({ from: clicked, to: undefined });
      setPhase("check-out");
      onRangeChange(format(clicked, "yyyy-MM-dd"), null);
      return;
    }

    if (phase === "check-out" && range?.from) {
      // If clicked before check-in, make it the new check-in
      if (isBefore(clicked, range.from)) {
        setRange({ from: clicked, to: undefined });
        setPhase("check-out");
        onRangeChange(format(clicked, "yyyy-MM-dd"), null);
        return;
      }

      // Enforce minimum nights
      const minCheckout = addDays(range.from, minNights);
      const effectiveTo = isBefore(clicked, minCheckout)
        ? minCheckout
        : clicked;

      // Check if any blocked dates fall within the range
      if (isRangeBlocked(range.from, effectiveTo)) {
        // Can't book across blocked dates — restart with this day
        setRange({ from: clicked, to: undefined });
        setPhase("check-out");
        onRangeChange(format(clicked, "yyyy-MM-dd"), null);
        return;
      }

      setRange({ from: range.from, to: effectiveTo });
      setPhase("complete");
      onRangeChange(
        format(range.from, "yyyy-MM-dd"),
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
        onDayClick={handleDayClick}
        locale={locale === "de" ? de : enUS}
        disabled={disabledDays}
        numberOfMonths={2}
        showOutsideDays={false}
        className="villa-calendar mx-auto"
      />

      <div className="mt-3 text-center text-sm text-dark-light">
        {phase === "complete" && nights > 0 && (
          <div className="flex items-center justify-center gap-3">
            <p className="font-semibold text-terracotta-500">
              {nights}{" "}
              {nights === 1
                ? locale === "de"
                  ? "Nacht"
                  : "night"
                : locale === "de"
                  ? "Nächte"
                  : "nights"}{" "}
              {locale === "de" ? "ausgewählt" : "selected"}
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-button border border-sand-300 px-2 py-1 text-xs text-dark-light transition-colors hover:border-terracotta-400 hover:text-terracotta-500"
            >
              <RotateCcw className="h-3 w-3" />
              {locale === "de" ? "Neu wählen" : "Reset"}
            </button>
          </div>
        )}
        {phase === "check-out" && (
          <p>
            {locale === "de"
              ? `Jetzt Abreisedatum wählen (mind. ${minNights} Nächte)`
              : `Now select checkout (min. ${minNights} nights)`}
          </p>
        )}
        {phase === "check-in" && (
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
