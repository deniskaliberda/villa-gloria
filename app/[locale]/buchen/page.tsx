import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card, CardContent } from "@/components/ui/Card";
import { BookingSection } from "@/components/booking/BookingSection";
import { ContactBypass } from "@/components/booking/ContactBypass";
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
  const t = await getTranslations({ locale, namespace: "meta.booking" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      images: [{ url: "/images/hero/villa-pool-seaview.jpg", width: 1200, height: 800, alt: "Villa Gloria al Padre – Jetzt buchen" }],
    },
    alternates: {
      canonical: `https://www.villa-gloria-istrien.de/${locale}/buchen`,
      languages: {
        "x-default": "https://www.villa-gloria-istrien.de/de/buchen",
        de: "https://www.villa-gloria-istrien.de/de/buchen",
        en: "https://www.villa-gloria-istrien.de/en/buchen",
      },
    },
  };
}

export default async function BookingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "booking" });

  const baseUrl = "https://www.villa-gloria-istrien.de";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        "@id": `${baseUrl}/${locale}/buchen#lodging`,
        name: "Villa Gloria al Padre",
        url: `${baseUrl}/${locale}`,
        image: `${baseUrl}/images/hero/villa-pool-seaview.jpg`,
        description:
          locale === "de"
            ? "Direktbuchung der Luxusvilla Gloria al Padre in Kaštelir, Istrien — privater Pool, Meerblick, 9 Personen."
            : "Direct booking of luxury Villa Gloria al Padre in Kaštelir, Istria — private pool, sea view, 9 guests.",
        priceRange: "EUR 250-650 / night",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kaštelir",
          addressRegion: "Istrien",
          addressCountry: "HR",
        },
        starRating: { "@type": "Rating", ratingValue: "4.9", bestRating: "5" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "5",
          bestRating: "5",
        },
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Privater Pool", value: true },
          { "@type": "LocationFeatureSpecification", name: "WLAN", value: true },
          { "@type": "LocationFeatureSpecification", name: "Klimaanlage", value: true },
          { "@type": "LocationFeatureSpecification", name: "BBQ", value: true },
          { "@type": "LocationFeatureSpecification", name: "Haustiere erlaubt", value: true },
        ],
        potentialAction: {
          "@type": "ReserveAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/${locale}/buchen`,
            inLanguage: locale,
            actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
          },
          result: { "@type": "LodgingReservation", name: "Villa Gloria Direktbuchung" },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "de" ? "Buchen" : "Book", item: `${baseUrl}/${locale}/buchen` },
        ],
      },
    ],
  };

  return (
    <main className="pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-4">
        <ScrollReveal>
          <h1 className="font-display text-4xl font-bold text-dark md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-dark-light">
            {t("description")}
          </p>
        </ScrollReveal>

        {/* Quick contact bypass at top — for visitors who prefer direct contact */}
        <ScrollReveal delay={0.05}>
          <div className="mt-6">
            <ContactBypass locale={locale} variant="compact" source="buchen-top" />
          </div>
        </ScrollReveal>

        {/* Booking Section: Property Toggle + Calendar + Form */}
        <ScrollReveal delay={0.1}>
          <div className="mt-10">
            <Card>
              <CardContent className="p-6 md:p-8">
                <BookingSection locale={locale} />
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>

        {/* Bypass-CTA after the form — last-chance fallback for hesitant visitors */}
        <ScrollReveal delay={0.15}>
          <div className="mt-8">
            <ContactBypass locale={locale} variant="full" source="buchen-bottom" />
          </div>
        </ScrollReveal>

        {/* Trust Signals */}
        <ScrollReveal delay={0.2}>
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
