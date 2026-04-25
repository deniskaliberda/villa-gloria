"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

import { useEffect, useState } from "react";
import { MessageCircle, X, Mail, Phone } from "lucide-react";

/**
 * Floating WhatsApp + Email + Phone bubble, bottom-right on every page.
 *
 * Why: 91% of paid-ad clicks never reach /buchen. A site-wide always-visible
 * direct-contact CTA captures hesitant visitors who would otherwise leave.
 *
 * Renders only if at least one of NEXT_PUBLIC_CONTACT_WHATSAPP /
 * NEXT_PUBLIC_CONTACT_EMAIL / NEXT_PUBLIC_CONTACT_PHONE is set.
 *
 * On click: tracks `floating_contact_open` and per-channel `floating_contact_click`.
 */
export function FloatingContactButton() {
  const [open, setOpen] = useState(false);
  const [pulsed, setPulsed] = useState(false);

  const whatsapp = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE;

  // Initial pulse animation to draw attention — fires once after a short delay.
  useEffect(() => {
    const t = setTimeout(() => setPulsed(true), 4000);
    return () => clearTimeout(t);
  }, []);

  if (!whatsapp && !email && !phone) return null;

  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const locale = path.startsWith("/en") ? "en" : "de";

  const waText =
    locale === "de"
      ? `Hallo, ich interessiere mich fuer die Villa Gloria al Padre.`
      : `Hello, I'm interested in Villa Gloria al Padre.`;
  const waHref = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(waText)}`
    : "";

  const subject =
    locale === "de" ? "Anfrage Villa Gloria al Padre" : "Inquiry Villa Gloria al Padre";
  const emailHref = email ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : "";

  const phoneHref = phone ? `tel:${phone.replace(/\s+/g, "")}` : "";

  const track = (event: string, channel?: string) => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", event, { channel: channel || "menu", path });
    }
  };

  const toggle = () => {
    if (!open) track("floating_contact_open");
    setOpen((v) => !v);
    setPulsed(false);
  };

  const labels = {
    whatsapp: "WhatsApp",
    email: "E-Mail",
    phone: locale === "de" ? "Anrufen" : "Call",
    title: locale === "de" ? "Schnell-Kontakt" : "Quick contact",
    subtitle:
      locale === "de" ? "Antwort meist binnen Stunden" : "Reply usually within hours",
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="animate-[fadeIn_0.2s_ease-out] flex w-72 flex-col gap-2 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-stone-200">
          <div className="mb-1 flex items-center justify-between">
            <div>
              <p className="font-accent text-base font-semibold text-dark">
                {labels.title}
              </p>
              <p className="text-xs text-stone-500">{labels.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={toggle}
              aria-label="close"
              className="rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {whatsapp && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("floating_contact_click", "whatsapp")}
              className="flex items-center gap-3 rounded-xl bg-green-600 px-4 py-3 font-medium text-white shadow-sm hover:bg-green-700"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="flex-1">{labels.whatsapp}</span>
              <span className="text-xs opacity-80">→</span>
            </a>
          )}
          {email && (
            <a
              href={emailHref}
              onClick={() => track("floating_contact_click", "email")}
              className="flex items-center gap-3 rounded-xl bg-terracotta-500 px-4 py-3 font-medium text-white shadow-sm hover:bg-terracotta-600"
            >
              <Mail className="h-5 w-5" />
              <span className="flex-1">{labels.email}</span>
              <span className="text-xs opacity-80">→</span>
            </a>
          )}
          {phone && (
            <a
              href={phoneHref}
              onClick={() => track("floating_contact_click", "phone")}
              className="flex items-center gap-3 rounded-xl bg-stone-700 px-4 py-3 font-medium text-white shadow-sm hover:bg-stone-800"
            >
              <Phone className="h-5 w-5" />
              <span className="flex-1 text-sm">{phone}</span>
              <span className="text-xs opacity-80">→</span>
            </a>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "Schliessen" : labels.title}
        className={`group relative flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg ring-4 ring-white transition-all hover:scale-105 hover:bg-green-700 ${
          pulsed ? "animate-[pulse_2s_ease-in-out_3]" : ""
        }`}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
        {!open && pulsed && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
            !
          </span>
        )}
      </button>
    </div>
  );
}
