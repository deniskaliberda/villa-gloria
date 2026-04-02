"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("cookie");

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Defer banner display to avoid blocking LCP paint
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => setVisible(true));
      } else {
        setTimeout(() => setVisible(true), 100);
      }
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
    });
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-warm bg-white p-4 shadow-lg md:p-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 md:flex-row">
        <p className="flex-1 text-sm text-dark-light">
          {t("text")}{" "}
          <Link
            href="/datenschutz"
            className="underline hover:text-terracotta-500"
          >
            {t("privacyLink")}
          </Link>
        </p>
        <div className="flex gap-3">
          <button
            onClick={decline}
            className="rounded-button border border-warm px-4 py-2 text-sm font-medium text-dark-light transition-colors hover:bg-sand"
          >
            {t("decline")}
          </button>
          <button
            onClick={accept}
            className="rounded-button bg-terracotta-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-terracotta-700"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
