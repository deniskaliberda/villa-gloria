"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface BlogFAQProps {
  faqs: FAQItem[];
  title?: string;
  schemaId?: string;
}

export function BlogFAQ({
  faqs,
  title = "Häufig gestellte Fragen",
  schemaId,
}: BlogFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="not-prose my-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-adriatic-100">
            <HelpCircle className="h-5 w-5 text-adriatic-600" />
          </div>
          <h2 className="font-display text-2xl font-bold text-dark">
            {title}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-card border border-sand-300 bg-white overflow-hidden shadow-sm"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${schemaId || ""}-${index}`}
              >
                <span className="font-display text-base font-semibold text-dark">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-terracotta-500 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                id={`faq-answer-${schemaId || ""}-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="border-t border-sand-200 px-5 pb-5 pt-4 text-base leading-relaxed text-dark-light">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
