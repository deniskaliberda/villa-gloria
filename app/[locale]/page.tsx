import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { QuickFacts } from "@/components/sections/QuickFacts";
import { PropertyOptions } from "@/components/sections/PropertyOptions";
import { HighlightsGrid } from "@/components/sections/HighlightsGrid";
import { ReviewSnippet } from "@/components/sections/ReviewSnippet";
import { CTABanner } from "@/components/sections/CTABanner";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    name: "Villa Gloria al Padre",
    description:
      "Exklusive Ferienvilla mit privatem Pool, Meerblick und 4 Schlafzimmern in Kaštelir, Istrien.",
    url: `https://villa-gloria.com/${locale}`,
    image: "https://villa-gloria.com/images/hero/villa-pool-seaview.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kaštelir",
      addressRegion: "Istrien",
      addressCountry: "HR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.27,
      longitude: 13.68,
    },
    numberOfRooms: 4,
    numberOfBathroomsTotal: 3,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: 9,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: 180,
      unitCode: "MTK",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Pool", value: true },
      {
        "@type": "LocationFeatureSpecification",
        name: "Sea View",
        value: true,
      },
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
      {
        "@type": "LocationFeatureSpecification",
        name: "Air Conditioning",
        value: true,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 5,
      bestRating: 5,
    },
    checkinTime: "17:00",
    checkoutTime: "10:00",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <QuickFacts />
      <PropertyOptions />
      <HighlightsGrid locale={locale} />
      <ReviewSnippet locale={locale} />
      <CTABanner />
    </main>
  );
}
