"use client";

import type { ReactNode } from "react";

interface BlogQuoteProps {
  children: ReactNode;
  author?: string;
}

export function BlogQuote({ children, author }: BlogQuoteProps) {
  return (
    <blockquote className="not-prose my-10 border-l-4 border-l-terracotta-500 bg-sand p-6 md:p-8">
      <p className="font-display text-xl leading-relaxed text-dark italic md:text-2xl">
        {children}
      </p>
      {author && (
        <cite className="mt-4 block text-sm font-semibold not-italic text-dark-light">
          — {author}
        </cite>
      )}
    </blockquote>
  );
}
