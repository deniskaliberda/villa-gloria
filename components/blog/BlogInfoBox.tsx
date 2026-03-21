"use client";

import { Lightbulb, AlertTriangle, Info } from "lucide-react";
import type { ReactNode } from "react";

interface BlogInfoBoxProps {
  variant: "tip" | "warning" | "info";
  title: string;
  children: ReactNode;
}

const variants = {
  tip: {
    bg: "bg-[#f0f4ec]",
    border: "border-l-olive-500",
    titleColor: "text-olive-700",
    textColor: "text-olive-800",
    iconBg: "bg-olive-200",
    iconColor: "text-olive-700",
    Icon: Lightbulb,
  },
  warning: {
    bg: "bg-[#fef3c7]",
    border: "border-l-amber-500",
    titleColor: "text-amber-800",
    textColor: "text-amber-900",
    iconBg: "bg-amber-200",
    iconColor: "text-amber-700",
    Icon: AlertTriangle,
  },
  info: {
    bg: "bg-adriatic-50",
    border: "border-l-adriatic-500",
    titleColor: "text-adriatic-700",
    textColor: "text-adriatic-800",
    iconBg: "bg-adriatic-200",
    iconColor: "text-adriatic-700",
    Icon: Info,
  },
};

export function BlogInfoBox({ variant, title, children }: BlogInfoBoxProps) {
  const v = variants[variant];

  return (
    <div
      className={`not-prose my-8 rounded-card border-l-4 ${v.border} ${v.bg} p-6`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${v.iconBg}`}
        >
          <v.Icon className={`h-5 w-5 ${v.iconColor}`} />
        </div>
        <div>
          <h4 className={`font-display text-lg font-bold ${v.titleColor}`}>
            {title}
          </h4>
          <div className={`mt-2 text-base leading-relaxed ${v.textColor}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
