import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return {
    title: t("title"),
    description: t("description"),
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

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
