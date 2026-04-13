import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.booking" });
  return {
    title: t("title"),
    description: t("description"),
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

export default function BookingLayout({ children }: { children: ReactNode }) {
  return children;
}
