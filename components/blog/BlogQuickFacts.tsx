"use client";

import type { ReactNode } from "react";

interface QuickFact {
  icon: ReactNode;
  label: string;
  value: string;
}

interface BlogQuickFactsProps {
  facts: QuickFact[];
}

export function BlogQuickFacts({ facts }: BlogQuickFactsProps) {
  return (
    <div className="not-prose my-8 rounded-card bg-gradient-to-r from-terracotta-50 to-sand-100 p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
        {facts.map((fact, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-terracotta-500">{fact.icon}</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-sm font-bold text-dark">
                {fact.value}
              </span>
              <span className="text-xs text-dark-light">{fact.label}</span>
            </div>
            {index < facts.length - 1 && (
              <span className="hidden text-sand-400 md:inline">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
