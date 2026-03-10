"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function MobileBookButton() {
  const t = useTranslations("nav");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-warm bg-white p-3 shadow-lg lg:hidden">
      <Link
        href="/buchen"
        className="block w-full rounded-button bg-terracotta-500 py-3 text-center font-accent text-lg font-semibold text-white transition-colors hover:bg-terracotta-600"
      >
        {t("bookNow")}
      </Link>
    </div>
  );
}
