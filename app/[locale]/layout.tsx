import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Playfair_Display, DM_Sans, Josefin_Sans } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBookButton } from "@/components/layout/MobileBookButton";
import { CookieBanner } from "@/components/ui/CookieBanner";
import "../globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  display: "swap",
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });

  return {
    title: {
      default: t("title"),
      template: "%s | Villa Gloria al Padre",
    },
    description: t("description"),
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://villa-gloria.com"
    ),
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : locale === "hr" ? "hr_HR" : "en_US",
      siteName: "Villa Gloria al Padre",
    },
    alternates: {
      languages: {
        de: "/de",
        en: "/en",
        hr: "/hr",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={`${playfairDisplay.variable} ${dmSans.variable} ${josefinSans.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
          <MobileBookButton />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
