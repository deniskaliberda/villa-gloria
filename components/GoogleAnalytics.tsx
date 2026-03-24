"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_ID) return;

    // Check consent on mount and update gtag
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "accepted") {
      window.gtag?.("consent", "update", {
        analytics_storage: "granted",
      });
    }

    // Listen for consent changes from CookieBanner
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "cookie-consent") {
        window.gtag?.("consent", "update", {
          analytics_storage: e.newValue === "accepted" ? "granted" : "denied",
        });
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          // Default: consent denied (DSGVO-compliant)
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
          });

          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
