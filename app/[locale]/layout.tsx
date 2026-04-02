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
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "../globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
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
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.villa-gloria-istrien.de"
    ),
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
      siteName: "Villa Gloria al Padre",
      images: [
        {
          url: "/images/hero/villa-pool-seaview.jpg",
          width: 1200,
          height: 800,
          alt: "Villa Gloria al Padre – Luxusvilla mit Pool in Istrien",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/hero/villa-pool-seaview.jpg"],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "x-default": "/de",
        de: "/de",
        en: "/en",
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Villa Gloria al Padre",
    url: "https://www.villa-gloria-istrien.de",
    logo: "https://www.villa-gloria-istrien.de/images/hero/villa-pool-seaview.jpg",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+49-172-5642200",
      contactType: "reservations",
      email: "info@villa-gloria-istrien.de",
      availableLanguage: ["German", "English", "Croatian"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kaštelir bb",
      addressLocality: "Kaštelir",
      addressRegion: "Istrien",
      postalCode: "52464",
      addressCountry: "HR",
    },
    sameAs: [],
  };

  return (
    <html lang={locale}>
      <body
        className={`${playfairDisplay.variable} ${dmSans.variable} ${josefinSans.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
          <MobileBookButton />
          <CookieBanner />
          <GoogleAnalytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
