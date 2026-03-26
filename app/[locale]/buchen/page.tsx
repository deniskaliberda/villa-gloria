import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { routing } from "@/i18n/routing";

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

const SMOOBU_URLS: Record<string, string> = {
  de: "https://login.smoobu.com/de/booking-tool/iframe/1466756/2972646",
  en: "https://login.smoobu.com/en/booking-tool/iframe/1466756/2972646",
};

export default async function BookingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "booking" });
  const smoobuUrl = SMOOBU_URLS[locale] || SMOOBU_URLS.de;

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

        <ScrollReveal delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-card border border-sand-300 bg-white shadow-lg">
            <iframe
              src={smoobuUrl}
              width="100%"
              style={{ minHeight: "800px", border: "none" }}
              title="Villa Gloria — Buchung & Verfügbarkeit"
              allow="payment"
              loading="lazy"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 rounded-card bg-warm p-6 text-center">
            <p className="text-dark-light">
              {locale === "de"
                ? "Fragen zur Buchung? Schreiben Sie uns über das "
                : "Questions about booking? Contact us via the "}
              <a
                href={`/${locale}/kontakt`}
                className="font-semibold text-terracotta-500 hover:underline"
              >
                {locale === "de" ? "Kontaktformular" : "contact form"}
              </a>
              .
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
