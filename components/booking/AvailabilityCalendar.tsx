"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { DayPicker } from "react-day-picker";
import { de, enUS, hr } from "date-fns/locale";
import { useAvailability } from "@/hooks/useAvailability";
import type { PropertyType } from "@/lib/pricing";
import type { DateRange } from "react-day-picker";

interface AvailabilityCalendarProps {
  propertyType: PropertyType;
  selected: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
  locale?: string;
}

const localeMap: Record<string, typeof de> = {
  de,
  en: enUS,
  hr,
};

export function AvailabilityCalendar({
  propertyType,
  selected,
  onSelect,
  locale = "de",
}: AvailabilityCalendarProps) {
  const t = useTranslations("booking");
  const { isDateBlocked, loading } = useAvailability(propertyType);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const disabledDays = useMemo(() => {
    return (date: Date) => {
      // Past dates
      if (date < today) return true;
      // Blocked dates
      return isDateBlocked(date);
    };
  }, [today, isDateBlocked]);

  return (
    <div className="space-y-3">
      <h3 className="font-display text-lg font-bold text-dark">
        {t("selectDates")}
      </h3>

      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="text-dark-light">{t("checkIn")}:</span>
          <span className="font-semibold text-dark">
            {selected?.from
              ? selected.from.toLocaleDateString(
                  locale === "hr" ? "hr-HR" : locale === "en" ? "en-GB" : "de-DE"
                )
              : "–"}
          </span>
        </div>
        <span className="text-dark-light">→</span>
        <div className="flex items-center gap-1.5">
          <span className="text-dark-light">{t("checkOut")}:</span>
          <span className="font-semibold text-dark">
            {selected?.to
              ? selected.to.toLocaleDateString(
                  locale === "hr" ? "hr-HR" : locale === "en" ? "en-GB" : "de-DE"
                )
              : "–"}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex h-[320px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-terracotta-200 border-t-terracotta-500" />
        </div>
      ) : (
        <DayPicker
          mode="range"
          selected={selected}
          onSelect={onSelect}
          locale={localeMap[locale] || de}
          disabled={disabledDays}
          numberOfMonths={2}
          showOutsideDays={false}
          fromDate={today}
          classNames={{
            months: "flex flex-col sm:flex-row gap-4",
            month_caption: "font-display text-base font-bold text-dark mb-2",
            table: "w-full border-collapse",
            head_row: "flex",
            head_cell:
              "text-dark-light font-accent text-xs w-10 text-center",
            row: "flex",
            cell: "text-center w-10 h-10 p-0",
            day: "w-10 h-10 rounded-full text-sm font-body hover:bg-terracotta-50 transition-colors",
            day_button: "w-10 h-10 rounded-full text-sm",
            selected:
              "bg-terracotta-500 text-white hover:bg-terracotta-600",
            range_start:
              "bg-terracotta-500 text-white rounded-l-full",
            range_end:
              "bg-terracotta-500 text-white rounded-r-full",
            range_middle: "bg-terracotta-100 text-terracotta-800",
            today: "font-bold text-terracotta-500",
            disabled: "text-gray-300 cursor-not-allowed hover:bg-transparent",
            outside: "text-gray-300",
            hidden: "invisible",
          }}
        />
      )}
    </div>
  );
}
