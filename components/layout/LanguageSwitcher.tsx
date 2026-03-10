"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  de: "DE",
  en: "EN",
  hr: "HR",
};

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

export function LanguageSwitcher({ isScrolled = true }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale as "de" | "en" | "hr" });
  }

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`rounded px-2 py-1 font-accent text-xs font-semibold transition-colors ${
            locale === loc
              ? "bg-terracotta-500 text-white"
              : isScrolled
                ? "text-dark-light hover:text-terracotta-500"
                : "text-white/70 hover:text-white"
          }`}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}
