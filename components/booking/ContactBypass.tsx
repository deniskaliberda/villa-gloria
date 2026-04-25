"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

import { Mail, MessageCircle, Phone } from "lucide-react";

interface ContactBypassProps {
  locale: string;
  property?: "haus" | "apartment";
  variant?: "full" | "compact";
  source?: string; // tag the event for funnel analysis (e.g. "buchen-form-fallback")
}

/**
 * Direct-contact CTA strip — bypasses the booking form for visitors who
 * prefer email/WhatsApp/phone. Each visible button only renders if the
 * corresponding env var is set, so no broken links if Denis hasn't filled
 * in numbers yet.
 *
 * Env vars (NEXT_PUBLIC_*):
 *   NEXT_PUBLIC_CONTACT_EMAIL          e.g. info@villa-gloria-istrien.de
 *   NEXT_PUBLIC_CONTACT_WHATSAPP       international format, no '+', e.g. 4915112345678
 *   NEXT_PUBLIC_CONTACT_PHONE          full international, e.g. +49 151 12345678
 *
 * Tracks each click as a GA4 event so we see which channel converts.
 */
export function ContactBypass({ locale, property, variant = "full", source = "booking-bypass" }: ContactBypassProps) {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const whatsapp = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP;
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE;

  if (!email && !whatsapp && !phone) return null;

  const trackClick = (channel: string) => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "contact_bypass_click", {
        channel,
        property: property || "haus",
        source,
      });
    }
  };

  const waText =
    locale === "de"
      ? "Hallo, ich interessiere mich für eine Buchung der Villa Gloria al Padre."
      : "Hello, I'm interested in booking Villa Gloria al Padre.";
  const waHref = whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(waText)}` : "";

  const subject = locale === "de" ? "Anfrage Villa Gloria al Padre" : "Inquiry Villa Gloria al Padre";
  const emailHref = email ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : "";

  const heading =
    locale === "de"
      ? "Lieber direkt Kontakt aufnehmen?"
      : "Prefer to reach out directly?";
  const sub =
    locale === "de"
      ? "Wir antworten meist innerhalb weniger Stunden."
      : "We usually reply within a few hours.";

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
        {whatsapp && (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick("whatsapp")}
            className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        )}
        {email && (
          <a
            href={emailHref}
            onClick={() => trackClick("email")}
            className="inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-4 py-2 font-medium text-white hover:bg-terracotta-600"
          >
            <Mail className="h-4 w-4" /> Email
          </a>
        )}
        {phone && (
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            onClick={() => trackClick("phone")}
            className="inline-flex items-center gap-2 rounded-full bg-stone-600 px-4 py-2 font-medium text-white hover:bg-stone-700"
          >
            <Phone className="h-4 w-4" /> {phone}
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-card border border-sand-300 bg-sand p-5">
      <div className="mb-3 text-center">
        <h3 className="font-accent text-lg font-semibold text-dark">{heading}</h3>
        <p className="text-sm text-stone-600">{sub}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {whatsapp && (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick("whatsapp")}
            className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 font-medium text-white shadow-sm hover:bg-green-700"
          >
            <MessageCircle className="h-5 w-5" />
            <span>WhatsApp</span>
          </a>
        )}
        {email && (
          <a
            href={emailHref}
            onClick={() => trackClick("email")}
            className="inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-5 py-2.5 font-medium text-white shadow-sm hover:bg-terracotta-600"
          >
            <Mail className="h-5 w-5" />
            <span>Email</span>
          </a>
        )}
        {phone && (
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            onClick={() => trackClick("phone")}
            className="inline-flex items-center gap-2 rounded-full bg-stone-600 px-5 py-2.5 font-medium text-white shadow-sm hover:bg-stone-700"
          >
            <Phone className="h-5 w-5" />
            <span>{phone}</span>
          </a>
        )}
      </div>
    </div>
  );
}
