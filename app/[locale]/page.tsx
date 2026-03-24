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
    identifier: "villa-gloria-al-padre-kastelir",
    description:
      "Exklusive Ferienvilla mit privatem Pool, Meerblick und 4 Schlafzimmern in Kaštelir, Istrien. 180 m², bis zu 9 Gäste, eingezäuntes Grundstück, BBQ, Sportplatz.",
    url: `https://www.villa-gloria-istrien.de/${locale}`,
    image: [
      "https://www.villa-gloria-istrien.de/images/hero/villa-pool-seaview.jpg",
      "https://www.villa-gloria-istrien.de/images/hero/villa-pool-garden.jpg",
      "https://www.villa-gloria-istrien.de/images/exterior/villa-pool-wide.jpg",
      "https://www.villa-gloria-istrien.de/images/exterior/villa-pool-palmen.jpg",
      "https://www.villa-gloria-istrien.de/images/pool/pool-panorama.jpg",
      "https://www.villa-gloria-istrien.de/images/pool/pool-sonnenliegen.jpg",
      "https://www.villa-gloria-istrien.de/images/garden/garten-volleyball.jpg",
      "https://www.villa-gloria-istrien.de/images/garden/grillplatz.jpg",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kaštelir bb",
      addressLocality: "Kaštelir",
      addressRegion: "Istrien",
      postalCode: "52464",
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
    containsPlace: {
      "@type": "Accommodation",
      name: "Villa Gloria al Padre — Haupthaus + Poolwohnung",
      numberOfBedrooms: 4,
      numberOfBathroomsTotal: 3,
      occupancy: { "@type": "QuantitativeValue", value: 9, maxValue: 9 },
      bed: [
        { "@type": "BedDetails", numberOfBeds: 2, typeOfBed: "Doppelbett" },
        { "@type": "BedDetails", numberOfBeds: 2, typeOfBed: "Einzelbett" },
        { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "Schlafsofa" },
      ],
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
        { "@type": "LocationFeatureSpecification", name: "Kitchen", value: true },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 5,
      bestRating: 5,
    },
    review: [
      { "@type": "Review", author: { "@type": "Person", name: "Familie M." }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, name: "Traumhafter Urlaub in Istrien", datePublished: "2025-08-15" },
      { "@type": "Review", author: { "@type": "Person", name: "Thomas K." }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, name: "Perfekte Villa für Familienurlaub", datePublished: "2025-07-22" },
      { "@type": "Review", author: { "@type": "Person", name: "Sandra W." }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, name: "Wunderschön gelegen", datePublished: "2025-09-03" },
      { "@type": "Review", author: { "@type": "Person", name: "Michael R." }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, name: "Ruheoase in Istrien", datePublished: "2025-06-10" },
      { "@type": "Review", author: { "@type": "Person", name: "Julia H." }, reviewRating: { "@type": "Rating", ratingValue: "4", bestRating: "5" }, name: "Top-Ferienhaus", datePublished: "2025-10-01" },
    ],
    checkinTime: "17:00",
    checkoutTime: "10:00",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Sea View", value: true },
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Fenced Property", value: true },
      { "@type": "LocationFeatureSpecification", name: "Pool Heating", value: true },
      { "@type": "LocationFeatureSpecification", name: "BBQ", value: true },
      { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
    ],
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
