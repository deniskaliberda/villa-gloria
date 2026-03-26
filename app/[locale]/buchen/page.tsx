import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Script from "next/script";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card, CardContent } from "@/components/ui/Card";
import { BookingForm } from "@/components/booking/BookingForm";
import { routing } from "@/i18n/routing";
import { Calendar, Shield, Clock } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.buchen" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/buchen`,
      languages: {
        "x-default": "/de/buchen",
        de: "/de/buchen",
        en: "/en/buchen",
      },
    },
  };
}

const SMOOBU_CALENDAR_URLS: Record<string, string> = {
  de: "https://login.smoobu.com/de/cockpit/widget/single-calendar/2972646",
  en: "https://login.smoobu.com/en/cockpit/widget/single-calendar/2972646",
};

export default async function BookingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "booking" });
  const calendarUrl = SMOOBU_CALENDAR_URLS[locale] || SMOOBU_CALENDAR_URLS.de;

  return (
    <main className="pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4">
        <ScrollReveal>
          <h1 className="font-display text-4xl font-bold text-dark md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-dark-light">
            {t("description")}
          </p>
        </ScrollReveal>

        {/* Availability Calendar (Smoobu Widget) */}
        <ScrollReveal delay={0.1}>
          <div className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 font-display text-2xl font-bold text-dark">
              <Calendar className="h-6 w-6 text-terracotta-500" />
              {locale === "de" ? "Verfügbarkeit prüfen" : "Check Availability"}
            </h2>
            <div className="overflow-hidden rounded-card border border-sand-300 bg-white p-4 shadow-sm">
              <div
                id="smoobuApartment2972646de"
                className="calendarWidget"
              >
                <div
                  className="calendarContent"
                  data-load-calendar-url={calendarUrl}
                  data-verification="ce59a5f951c778b0781190119deb1494cdca05a8b46c79face9ae3fc49f8ccf1"
                  data-baseurl="https://login.smoobu.com"
                  data-disable-css="false"
                />
              </div>
              <Script
                src="https://login.smoobu.com/js/Apartment/CalendarWidget.js"
                strategy="lazyOnload"
              />
            </div>
            <p className="mt-2 text-sm text-dark-light">
              {locale === "de"
                ? "Grün = verfügbar · Rot/Grau = belegt"
                : "Green = available · Red/Gray = booked"}
            </p>
          </div>
        </ScrollReveal>

        {/* Booking Inquiry Form */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12">
            <h2 className="mb-6 font-display text-2xl font-bold text-dark">
              {locale === "de" ? "Unverbindliche Buchungsanfrage" : "Non-binding Booking Inquiry"}
            </h2>
            <Card>
              <CardContent className="p-6 md:p-8">
                <BookingForm />
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>

        {/* Trust Signals */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-card bg-warm p-4">
              <Shield className="h-8 w-8 shrink-0 text-olive-500" />
              <div>
                <p className="font-accent text-sm font-semibold text-dark">
                  {locale === "de" ? "Unverbindlich" : "No obligation"}
                </p>
                <p className="text-xs text-dark-light">
                  {locale === "de" ? "Kostenlose Anfrage ohne Risiko" : "Free inquiry, no risk"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-card bg-warm p-4">
              <Clock className="h-8 w-8 shrink-0 text-olive-500" />
              <div>
                <p className="font-accent text-sm font-semibold text-dark">
                  {locale === "de" ? "Schnelle Antwort" : "Quick response"}
                </p>
                <p className="text-xs text-dark-light">
                  {locale === "de" ? "Innerhalb von 24 Stunden" : "Within 24 hours"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-card bg-warm p-4">
              <Calendar className="h-8 w-8 shrink-0 text-olive-500" />
              <div>
                <p className="font-accent text-sm font-semibold text-dark">
                  {locale === "de" ? "Direktbuchung" : "Direct booking"}
                </p>
                <p className="text-xs text-dark-light">
                  {locale === "de" ? "Kein Portal, keine Provision" : "No portal, no commission"}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
