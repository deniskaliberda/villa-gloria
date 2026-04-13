"use client";

import { useEffect, useRef } from "react";

interface SmoobuWidgetProps {
  locale: string;
  property: "haus" | "apartment";
}

const SMOOBU_CONFIG = {
  haus: {
    apartmentId: "2972646",
    verification:
      "ce59a5f951c778b0781190119deb1494cdca05a8b46c79face9ae3fc49f8ccf1",
  },
  // Poolwohnung ID not yet available — fallback to Haus for now
  apartment: {
    apartmentId: "2972646",
    verification:
      "ce59a5f951c778b0781190119deb1494cdca05a8b46c79face9ae3fc49f8ccf1",
  },
};

export function SmoobuWidget({ locale, property }: SmoobuWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const config = SMOOBU_CONFIG[property];
    const lang = locale === "de" ? "de" : "en";
    const widgetId = `smoobuApartment${config.apartmentId}${lang}`;

    // Clear previous widget
    container.innerHTML = "";

    // Build widget HTML
    const widgetDiv = document.createElement("div");
    widgetDiv.id = widgetId;
    widgetDiv.className = "calendarWidget";

    const contentDiv = document.createElement("div");
    contentDiv.className = "calendarContent";
    contentDiv.setAttribute(
      "data-load-calendar-url",
      `https://login.smoobu.com/${lang}/cockpit/widget/single-calendar/${config.apartmentId}`
    );
    contentDiv.setAttribute("data-verification", config.verification);
    contentDiv.setAttribute("data-baseUrl", "https://login.smoobu.com");
    contentDiv.setAttribute("data-disable-css", "false");

    widgetDiv.appendChild(contentDiv);
    container.appendChild(widgetDiv);

    // Load or reload the Smoobu calendar script
    const script = document.createElement("script");
    script.src =
      "https://login.smoobu.com/js/Apartment/CalendarWidget.js";
    script.async = true;

    if (scriptLoaded.current) {
      // Script was loaded before — re-trigger by re-appending
      container.appendChild(script);
    } else {
      container.appendChild(script);
      scriptLoaded.current = true;
    }

    return () => {
      // Cleanup on property/locale change
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [locale, property]);

  return <div ref={containerRef} className="smoobu-calendar-container" />;
}
