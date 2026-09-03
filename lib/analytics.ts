// Shared client-side event helper (MyHiwi event vocabulary).
// Every event goes to Vercel Web Analytics AND to the GTM dataLayer (if present),
// so the existing gtag / Google Ads setup keeps working unchanged.
//
// Vocabulary:
//   lead          { type, topic, source, page }   -> server-side only (see API routes)
//   contact_click { channel: 'tel'|'whatsapp'|'mail', placement: 'header'|'footer'|'content', page }
//
// Rules: values are string | number | boolean | null, no nesting, max 8 keys,
// NEVER personal data (names, mails, phone numbers, free text).

import { track as vercelTrack } from "@vercel/analytics";

export type EventProps = Record<string, string | number | boolean | null>;
export type ContactChannel = "tel" | "whatsapp" | "mail";
export type ContactPlacement = "header" | "footer" | "content";

function currentPage() {
  return typeof window !== "undefined" ? window.location.pathname : "";
}

/** Client-side event: Vercel + dataLayer. Never throws, never blocks the UI. */
export function track(name: string, props: EventProps = {}) {
  const data: EventProps = { page: currentPage(), ...props };
  try {
    vercelTrack(name, data);
  } catch {
    /* analytics must never break the page */
  }
  // window.dataLayer is declared globally elsewhere (CookieBanner) as unknown[]; keep a local view.
  const dl = typeof window !== "undefined" ? (window as { dataLayer?: unknown[] }).dataLayer : undefined;
  if (Array.isArray(dl)) {
    dl.push({ event: name, ...data });
  }
}

/** Convenience wrappers so call sites stay uniform. */
export const analytics = {
  contactClick: (channel: ContactChannel, placement: ContactPlacement) =>
    track("contact_click", { channel, placement }),
};
