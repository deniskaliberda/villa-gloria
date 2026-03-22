import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.gallery" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/galerie`,
      languages: {
        "x-default": "/de/galerie",
        de: "/de/galerie",
        en: "/en/galerie",
      },
    },
  };
}

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return children;
}
