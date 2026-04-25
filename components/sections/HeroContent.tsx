"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { Star, ShieldCheck, Clock } from "lucide-react";

export function HeroContent() {
  const t = useTranslations("home.hero");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const trust = locale === "en"
    ? {
        rating: "4.9 of 5",
        ratingSub: "5 verified reviews",
        direct: "Direct booking",
        directSub: "No portal commission",
        reply: "Reply within hours",
        replySub: "Personal contact",
      }
    : {
        rating: "4.9 von 5",
        ratingSub: "5 verifizierte Bewertungen",
        direct: "Direktbuchung",
        directSub: "Keine Portal-Provision",
        reply: "Antwort binnen Stunden",
        replySub: "Persönlich, kein Bot",
      };

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

        {/* Trust signals — visible above the fold, addresses skepticism in first second */}
        <div
          className="animate-fade-up mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 px-4 sm:grid-cols-3"
          style={{ animationDelay: "1.1s" }}
        >
          <div className="flex items-center justify-center gap-3 rounded-full bg-white/10 px-5 py-3 backdrop-blur-md ring-1 ring-white/20">
            <div className="flex shrink-0 gap-0.5 text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
            <div className="text-left">
              <div className="font-accent text-sm font-semibold text-white">{trust.rating}</div>
              <div className="text-xs text-white/70">{trust.ratingSub}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 rounded-full bg-white/10 px-5 py-3 backdrop-blur-md ring-1 ring-white/20">
            <ShieldCheck className="h-5 w-5 shrink-0 text-olive-300" />
            <div className="text-left">
              <div className="font-accent text-sm font-semibold text-white">{trust.direct}</div>
              <div className="text-xs text-white/70">{trust.directSub}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 rounded-full bg-white/10 px-5 py-3 backdrop-blur-md ring-1 ring-white/20">
            <Clock className="h-5 w-5 shrink-0 text-terracotta-300" />
            <div className="text-left">
              <div className="font-accent text-sm font-semibold text-white">{trust.reply}</div>
              <div className="text-xs text-white/70">{trust.replySub}</div>
            </div>
          </div>
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
