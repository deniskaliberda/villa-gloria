"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type Category =
  | "all"
  | "exterior"
  | "living"
  | "bedrooms"
  | "bathrooms"
  | "apartment"
  | "garden";

interface GalleryImage {
  src: string;
  alt: string;
  category: Category;
}

// Placeholder images - will be replaced with actual villa photos
const images: GalleryImage[] = [
  // Exterior & Pool
  { src: "/images/hero/villa-pool-seaview.jpg", alt: "Luxuriöse Ferienvilla mit Pool, Palmen und Meerblick", category: "exterior" },
  { src: "/images/hero/villa-pool-garden.jpg", alt: "Elegante Villa mit Pool, Palmen und üppigem Garten", category: "exterior" },
  { src: "/images/exterior/villa-pool-palmen.jpg", alt: "Villa mit Pool und Palmen", category: "exterior" },
  { src: "/images/exterior/villa-pool-wide.jpg", alt: "Villa mit Pool – Weitwinkelansicht", category: "exterior" },
  { src: "/images/exterior/villa-front.jpg", alt: "Charmantes Haus mit Backsteinfassade und Palmen", category: "exterior" },
  { src: "/images/exterior/haus-garten-tor.jpg", alt: "Haus mit Garten und Schiebetor für Doppelparkplatz", category: "exterior" },
  { src: "/images/exterior/haus-garten-2.jpg", alt: "Haus mit üppigem Garten", category: "exterior" },
  { src: "/images/exterior/haus-garten-3.jpg", alt: "Haus mit Garten und Einfahrt", category: "exterior" },
  { src: "/images/exterior/haus-fassade.jpg", alt: "Haus mit Garten, Bäumen und Backsteinfassade", category: "exterior" },
  { src: "/images/exterior/bbq-pool-eingang.jpg", alt: "Überdachter BBQ-Bereich am Pool und Poolwohnung-Eingang", category: "exterior" },
  { src: "/images/pool/pool-panorama.jpg", alt: "Villa mit Pool, Sonnenliegen und Meerblick", category: "exterior" },
  { src: "/images/pool/pool-apartment-eingang.jpg", alt: "Pool mit Apartment-Eingang", category: "exterior" },
  { src: "/images/pool/pool-von-terrasse.jpg", alt: "Blick auf den Pool von der Terrasse", category: "exterior" },
  // Living & Kitchen
  { src: "/images/living/wohnzimmer.jpg", alt: "Elegantes Wohnzimmer mit Deckenventilator und gemütlichem Sofa", category: "living" },
  { src: "/images/living/wohnzimmer-2.jpg", alt: "Klassisches Wohnzimmer mit Holzbalken und großen Fenstern", category: "living" },
  { src: "/images/living/wohnzimmer-3.jpg", alt: "Gemütliches Wohnzimmer mit Holzmöbeln und großem Fenster", category: "living" },
  { src: "/images/living/wohnzimmer-tv.jpg", alt: "Wohnzimmer mit Holzschränken, TV und großen Fenstern", category: "living" },
  { src: "/images/living/essbereich.jpg", alt: "Rustikaler Essbereich mit Holzbalken und großem Fenster", category: "living" },
  { src: "/images/living/kueche.jpg", alt: "Moderne Küche mit Holzschränken, Gasherd und großem Fenster", category: "living" },
  { src: "/images/living/kueche-2.jpg", alt: "Küche mit Holzschränken, Pflanzen und Tageslicht", category: "living" },
  { src: "/images/living/kueche-3.jpg", alt: "Küche mit Gasherd und stilvoller Beleuchtung", category: "living" },
  { src: "/images/living/terrasse-kueche-pool.jpg", alt: "Terrasse an der Küche mit Poolzugang", category: "living" },
  { src: "/images/living/eingangsbereich.jpg", alt: "Eingangsbereich mit Treppe und Wohnzimmerzugang", category: "living" },
  // Bedrooms
  { src: "/images/bedrooms/schlafzimmer-1.jpg", alt: "Schlafzimmer 1 – Gemütlich mit Holzbetten und Klimaanlage", category: "bedrooms" },
  { src: "/images/bedrooms/schlafzimmer-1b.jpg", alt: "Schlafzimmer 1 – Detail mit Nachttisch und Lampe", category: "bedrooms" },
  { src: "/images/bedrooms/schlafzimmer-2.jpg", alt: "Schlafzimmer 2 – Hell mit großen Fenstern", category: "bedrooms" },
  { src: "/images/bedrooms/schlafzimmer-2b.jpg", alt: "Schlafzimmer 2 – Tageslicht und stilvolle Möbel", category: "bedrooms" },
  { src: "/images/bedrooms/schlafzimmer-2c.jpg", alt: "Schlafzimmer 2 – Doppelbett", category: "bedrooms" },
  { src: "/images/bedrooms/schlafzimmer-3.jpg", alt: "Gemütlicher Sitzbereich am Erkerfenster", category: "bedrooms" },
  // Bathrooms
  { src: "/images/bathrooms/bad-1.jpg", alt: "Modernes Badezimmer im Erdgeschoss", category: "bathrooms" },
  { src: "/images/bathrooms/bad-1b.jpg", alt: "Badezimmer EG mit Waschmaschine", category: "bathrooms" },
  { src: "/images/bathrooms/bad-1c.jpg", alt: "Badezimmer EG – Detailansicht", category: "bathrooms" },
  { src: "/images/bathrooms/bad-2.jpg", alt: "Modernes Badezimmer im Obergeschoss", category: "bathrooms" },
  { src: "/images/bathrooms/bad-2b.jpg", alt: "Badezimmer OG – Detailansicht", category: "bathrooms" },
  // Apartment
  { src: "/images/apartment/apartment-living.jpg", alt: "Poolwohnung – Wohnbereich mit Küche und Bad", category: "apartment" },
  { src: "/images/apartment/apartment-2.jpg", alt: "Poolwohnung – Übersicht", category: "apartment" },
  { src: "/images/apartment/apartment-kueche.jpg", alt: "Poolwohnung – Küchenzeile", category: "apartment" },
  { src: "/images/apartment/apartment-kueche-2.jpg", alt: "Poolwohnung – Küche mit Bad und Schlafzimmer", category: "apartment" },
  { src: "/images/apartment/apartment-schlafzimmer.jpg", alt: "Poolwohnung – Schlafzimmer 4", category: "apartment" },
  { src: "/images/apartment/apartment-schlafzimmer-2.jpg", alt: "Poolwohnung – Schlafzimmer 4 Detail", category: "apartment" },
  { src: "/images/apartment/apartment-bad.jpg", alt: "Poolwohnung – Modernes Badezimmer", category: "apartment" },
  { src: "/images/apartment/apartment-bad-2.jpg", alt: "Poolwohnung – Bad Detail", category: "apartment" },
  { src: "/images/apartment/apartment-bad-3.jpg", alt: "Poolwohnung – Bad Dusche", category: "apartment" },
  { src: "/images/apartment/apartment-overview.jpg", alt: "Poolwohnung – Gesamtansicht", category: "apartment" },
  // Garden & Sports
  { src: "/images/garden/garten-volleyball.jpg", alt: "Großer Garten mit Rasen, Sportplatz und Basketballkorb", category: "garden" },
  { src: "/images/garden/rosenpavillon.jpg", alt: "Grüner Garten mit Tisch, Stühlen und Pflanzen", category: "garden" },
  { src: "/images/garden/grillplatz.jpg", alt: "Überdachter BBQ-Grillplatz am Pool", category: "garden" },
];

const categoryKeys: Category[] = [
  "all", "exterior", "living", "bedrooms", "bathrooms", "apartment", "garden",
];

const categoryTranslationMap: Record<Category, string> = {
  all: "all",
  exterior: "exterior",
  living: "living",
  bedrooms: "bedrooms",
  bathrooms: "bathrooms",
  apartment: "apartmentCat",
  garden: "garden",
};

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <main className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal>
          <h1 className="font-display text-4xl font-bold text-dark md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-dark-light">{t("description")}</p>
        </ScrollReveal>

        {/* Category Filter */}
        <div className="mt-10 flex flex-wrap gap-2">
          {categoryKeys.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 font-accent text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-terracotta-500 text-white"
                  : "bg-warm text-dark-light hover:bg-terracotta-100 hover:text-terracotta-700"
              }`}
            >
              {t(categoryTranslationMap[cat])}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((image, index) => (
            <ScrollReveal key={image.src} delay={index * 0.03}>
              <button
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-card"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
              </button>
            </ScrollReveal>
          ))}
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={lightboxIndex}
          slides={filtered.map((img) => ({ src: img.src, alt: img.alt }))}
        />
      </div>
    </main>
  );
}
