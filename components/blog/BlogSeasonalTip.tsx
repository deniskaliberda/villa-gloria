"use client";

import { Sun } from "lucide-react";

interface SeasonHighlight {
  months: number[];
  label: string;
  color: "best" | "good" | "ok" | "avoid";
}

interface BlogSeasonalTipProps {
  highlights: SeasonHighlight[];
  title?: string;
}

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mär",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dez",
];

const colorMap = {
  best: {
    bg: "bg-olive-500",
    text: "text-white",
    legend: "bg-olive-500",
    label: "Beste Zeit",
  },
  good: {
    bg: "bg-olive-200",
    text: "text-olive-800",
    legend: "bg-olive-200",
    label: "Gute Zeit",
  },
  ok: {
    bg: "bg-sand-200",
    text: "text-dark-light",
    legend: "bg-sand-200",
    label: "Möglich",
  },
  avoid: {
    bg: "bg-terracotta-100",
    text: "text-terracotta-700",
    legend: "bg-terracotta-100",
    label: "Nicht ideal",
  },
};

export function BlogSeasonalTip({
  highlights,
  title = "Beste Reisezeit",
}: BlogSeasonalTipProps) {
  const monthColors = new Array(12).fill("default");

  for (const highlight of highlights) {
    for (const month of highlight.months) {
      monthColors[month - 1] = highlight.color;
    }
  }

  const usedColors = [...new Set(highlights.map((h) => h.color))];

  return (
    <div className="not-prose my-8 rounded-card border border-sand-300 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-olive-100">
          <Sun className="h-5 w-5 text-olive-600" />
        </div>
        <h3 className="font-display text-lg font-bold text-dark">{title}</h3>
      </div>

      <div className="grid grid-cols-6 gap-1.5 md:grid-cols-12">
        {MONTH_LABELS.map((label, index) => {
          const color = monthColors[index];
          const style = color !== "default" ? colorMap[color as keyof typeof colorMap] : null;

          return (
            <div
              key={label}
              className={`flex flex-col items-center rounded-lg py-2 ${
                style ? style.bg : "bg-sand-100"
              }`}
            >
              <span
                className={`text-xs font-semibold ${
                  style ? style.text : "text-dark-light"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        {usedColors.map((color) => {
          const style = colorMap[color as keyof typeof colorMap];
          return (
            <div key={color} className="flex items-center gap-2 text-xs text-dark-light">
              <span className={`inline-block h-3 w-3 rounded-full ${style.legend}`} />
              {style.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
