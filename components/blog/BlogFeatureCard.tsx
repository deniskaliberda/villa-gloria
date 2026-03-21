"use client";

import type { ReactNode } from "react";

interface BlogFeatureCardProps {
  features: Array<{ icon: ReactNode; title: string; description: string }>;
  columns?: 2 | 3;
}

export function BlogFeatureCard({
  features,
  columns = 2,
}: BlogFeatureCardProps) {
  const colClass =
    columns === 3
      ? "grid-cols-1 md:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2";

  return (
    <div className={`not-prose my-8 grid gap-4 ${colClass}`}>
      {features.map((feature, index) => (
        <div
          key={index}
          className="rounded-card border-l-4 border-l-terracotta-500 bg-white p-5 shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta-50">
              <span className="text-terracotta-500">{feature.icon}</span>
            </div>
            <div>
              <h4 className="font-display text-base font-bold text-dark">
                {feature.title}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-dark-light">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
