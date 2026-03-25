"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";

export function HeroContent() {
  const t = useTranslations("home.hero");
  const tNav = useTranslations("nav");

  return (
    <>
      <div className="relative z-10 px-4 text-center">
        <h1
          className="animate-fade-up font-display text-4xl font-bold text-white sm:text-5xl md:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.2s" }}
        >
          {t("title")}
        </h1>

        <p
          className="animate-fade-up mt-4 font-accent text-xl text-warm/90 md:text-2xl"
          style={{ animationDelay: "0.5s" }}
        >
          {t("subtitle")}
        </p>

        <p
          className="animate-fade-up mx-auto mt-6 max-w-2xl text-base text-white/80 sm:text-lg"
          style={{ animationDelay: "0.7s" }}
        >
          {t("description")}
        </p>

        <div
          className="animate-fade-up mt-10"
          style={{ animationDelay: "0.9s" }}
        >
          <Link href="/buchen">
            <Button size="lg">{tNav("bookNow")}</Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator — pure CSS animation */}
      <div
        className="animate-fade-in absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="animate-scroll-bounce h-10 w-6 rounded-full border-2 border-white/50">
          <div className="animate-scroll-bounce mx-auto mt-2 h-2 w-1 rounded-full bg-white/70" />
        </div>
      </div>
    </>
  );
}
