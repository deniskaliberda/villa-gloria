import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { ContactContent } from "@/components/sections/ContactContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      images: [{ url: "/images/exterior/villa-front.jpg", width: 1200, height: 800, alt: "Villa Gloria al Padre – Kontakt" }],
    },
    alternates: {
      canonical: `https://www.villa-gloria-istrien.de/${locale}/kontakt`,
      languages: {
        "x-default": "https://www.villa-gloria-istrien.de/de/kontakt",
        de: "https://www.villa-gloria-istrien.de/de/kontakt",
        en: "https://www.villa-gloria-istrien.de/en/kontakt",
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactContent />;
}
