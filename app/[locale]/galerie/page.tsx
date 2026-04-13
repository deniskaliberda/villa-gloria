import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { GalleryContent } from "@/components/sections/GalleryContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.gallery" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      images: [{ url: "/images/pool/pool-panorama.jpg", width: 1200, height: 800, alt: "Villa Gloria al Padre – Galerie" }],
    },
    alternates: {
      canonical: `https://www.villa-gloria-istrien.de/${locale}/galerie`,
      languages: {
        "x-default": "https://www.villa-gloria-istrien.de/de/galerie",
        de: "https://www.villa-gloria-istrien.de/de/galerie",
        en: "https://www.villa-gloria-istrien.de/en/galerie",
      },
    },
  };
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GalleryContent />;
}
