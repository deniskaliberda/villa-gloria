"use client";

import { useEffect, useRef } from "react";

interface SmoobuWidgetProps {
  locale: string;
}

const SMOOBU_ACCOUNT_ID = "1466756";
const SMOOBU_APARTMENT_ID = "2972646";

export function SmoobuWidget({ locale }: SmoobuWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const lang = locale === "de" ? "de" : "en";
    const url = `https://login.smoobu.com/${lang}/booking-tool/iframe/${SMOOBU_ACCOUNT_ID}/${SMOOBU_APARTMENT_ID}`;

    const script = document.createElement("script");
    script.src =
      "https://login.smoobu.com/js/Settings/BookingToolIframe.js";
    script.onload = () => {
      if (
        typeof window !== "undefined" &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).BookingToolIframe
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).BookingToolIframe.initialize({
          url,
          baseUrl: "https://login.smoobu.com",
          target: `#smoobu-widget`,
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [locale]);

  return (
    <div
      ref={containerRef}
      id="smoobu-widget"
      className="min-h-[400px] rounded-card overflow-hidden"
    />
  );
}
