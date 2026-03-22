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
      canonical: `/${locale}/buchen`,
      languages: {
        "x-default": "/de/buchen",
        de: "/de/buchen",
        en: "/en/buchen",
      },
    },
  };
}

export default function BookingLayout({ children }: { children: ReactNode }) {
  return children;
}
