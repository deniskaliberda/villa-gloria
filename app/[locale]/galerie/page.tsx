"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionProgressIndicator } from "@/components/ui/SectionProgressIndicator";
import { Button } from "@/components/ui/Button";

interface TourSection {
  id: string;
  translationKey: string;
  heroImage: string;
  heroAlt: string;
  images: { src: string; alt: string }[];
  layout: "hero-left" | "hero-right";
}

const tourSections: TourSection[] = [
  {
    id: "arrival",
    translationKey: "arrival",
    heroImage: "/images/exterior/villa-front.jpg",
    heroAlt: "Villa Gloria al Padre – Ankunft",
    layout: "hero-left",
    images: [
      { src: "/images/exterior/haus-fassade.jpg", alt: "Natursteinfassade mit Garten" },
      { src: "/images/exterior/haus-garten-tor.jpg", alt: "Einfahrt und Parkplatz" },
      { src: "/images/exterior/haus-garten-2.jpg", alt: "Üppiger Garten" },
      { src: "/images/exterior/haus-garten-3.jpg", alt: "Gartenansicht" },
    ],
  },
  {
    id: "pool",
    translationKey: "pool",
    heroImage: "/images/hero/villa-pool-seaview.jpg",
    heroAlt: "Pool mit Meerblick",
    layout: "hero-right",
    images: [
      { src: "/images/pool/pool-panorama.jpg", alt: "Pool-Panorama mit Sonnenliegen" },
      { src: "/images/exterior/villa-pool-wide.jpg", alt: "Pool Weitwinkel" },
      { src: "/images/exterior/villa-pool-palmen.jpg", alt: "Pool mit Palmen" },
      { src: "/images/pool/pool-von-terrasse.jpg", alt: "Pool von der Terrasse" },
      { src: "/images/pool/pool-apartment-eingang.jpg", alt: "Pool mit Apartment-Eingang" },
      { src: "/images/pool/pool-sonnenliegen.jpg", alt: "Sonnenliegen am Pool" },
    ],
  },
  {
    id: "living",
    translationKey: "living",
    heroImage: "/images/living/wohnzimmer.jpg",
    heroAlt: "Wohnzimmer mit Meerblick",
    layout: "hero-left",
    images: [
      { src: "/images/living/wohnzimmer-2.jpg", alt: "Wohnzimmer mit Holzbalken" },
      { src: "/images/living/wohnzimmer-3.jpg", alt: "Gemütliche Sitzecke" },
      { src: "/images/living/wohnzimmer-tv.jpg", alt: "TV-Bereich" },
      { src: "/images/living/essbereich.jpg", alt: "Essbereich" },
      { src: "/images/living/eingangsbereich.jpg", alt: "Eingangsbereich" },
    ],
  },
  {
    id: "kitchen",
    translationKey: "kitchen",
    heroImage: "/images/living/kueche.jpg",
    heroAlt: "Voll ausgestattete Küche",
    layout: "hero-right",
    images: [
      { src: "/images/living/kueche-2.jpg", alt: "Küche mit Tageslicht" },
      { src: "/images/living/kueche-3.jpg", alt: "Küche Detail" },
      { src: "/images/living/terrasse-kueche-pool.jpg", alt: "Terrasse mit Poolzugang" },
    ],
  },
  {
    id: "bedrooms",
    translationKey: "bedrooms",
    heroImage: "/images/bedrooms/schlafzimmer-2.jpg",
    heroAlt: "Helles Schlafzimmer",
    layout: "hero-left",
    images: [
      { src: "/images/bedrooms/schlafzimmer-1.jpg", alt: "Schlafzimmer 1" },
      { src: "/images/bedrooms/schlafzimmer-1b.jpg", alt: "Schlafzimmer 1 Detail" },
      { src: "/images/bedrooms/schlafzimmer-2b.jpg", alt: "Schlafzimmer 2 Detail" },
      { src: "/images/bedrooms/schlafzimmer-2c.jpg", alt: "Doppelbett" },
      { src: "/images/bedrooms/schlafzimmer-3.jpg", alt: "Erkerfenster Sitzbereich" },
    ],
  },
  {
    id: "bathrooms",
    translationKey: "bathrooms",
    heroImage: "/images/bathrooms/bad-1.jpg",
    heroAlt: "Modernes Badezimmer",
    layout: "hero-right",
    images: [
      { src: "/images/bathrooms/bad-1b.jpg", alt: "Badezimmer EG" },
      { src: "/images/bathrooms/bad-1c.jpg", alt: "Badezimmer EG Detail" },
      { src: "/images/bathrooms/bad-2.jpg", alt: "Badezimmer OG" },
      { src: "/images/bathrooms/bad-2b.jpg", alt: "Badezimmer OG Detail" },
    ],
  },
  {
    id: "apartment",
    translationKey: "apartment",
    heroImage: "/images/apartment/apartment-living.jpg",
    heroAlt: "Poolwohnung Wohnbereich",
    layout: "hero-left",
    images: [
      { src: "/images/apartment/apartment-schlafzimmer.jpg", alt: "Apartment Schlafzimmer" },
      { src: "/images/apartment/apartment-schlafzimmer-2.jpg", alt: "Apartment Schlafzimmer Detail" },
      { src: "/images/apartment/apartment-kueche.jpg", alt: "Apartment Küchenzeile" },
      { src: "/images/apartment/apartment-kueche-2.jpg", alt: "Apartment Küche & Bad" },
      { src: "/images/apartment/apartment-bad.jpg", alt: "Apartment Badezimmer" },
      { src: "/images/apartment/apartment-bad-2.jpg", alt: "Apartment Bad Detail" },
      { src: "/images/apartment/apartment-overview.jpg", alt: "Apartment Übersicht" },
    ],
  },
  {
    id: "garden",
    translationKey: "garden",
    heroImage: "/images/garden/garten-volleyball.jpg",
    heroAlt: "Garten mit Sportplatz",
    layout: "hero-right",
    images: [
      { src: "/images/garden/rosenpavillon.jpg", alt: "Rosenpavillon" },
      { src: "/images/garden/grillplatz.jpg", alt: "Überdachter Grillplatz" },
      { src: "/images/exterior/bbq-pool-eingang.jpg", alt: "BBQ am Pool" },
      { src: "/images/hero/villa-pool-garden.jpg", alt: "Villa mit Garten" },
    ],
  },
];

// Flatten all images for lightbox
const allImages = tourSections.flatMap((section) => [
  { src: section.heroImage, alt: section.heroAlt },
  ...section.images,
]);

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const tNav = useTranslations("nav");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  function openLightbox(src: string) {
    const idx = allImages.findIndex((img) => img.src === src);
    setLightboxIndex(idx);
  }

  // Build sections for the progress indicator
  const progressSections = tourSections.map((section) => ({
    id: section.id,
    label: t(`sections.${section.translationKey}.title`),
  }));

  return (
    <main className="pt-24 pb-20">
      {/* Scroll Progress Indicator (desktop only) */}
      <SectionProgressIndicator sections={progressSections} />

      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal>
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block font-accent text-sm font-semibold uppercase tracking-[0.2em] text-terracotta-500"
            >
              Villa Gloria al Padre
            </motion.span>
            <h1 className="mt-3 font-display text-4xl font-bold text-dark md:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-dark-light">
              {t("description")}
            </p>
          </div>
        </ScrollReveal>

        {/* Quick navigation pills */}
        <ScrollReveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            {tourSections.map((section, i) => (
              <motion.a
                key={section.id}
                href={`#${section.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.04 }}
                className="group flex items-center gap-2 rounded-full border border-dark/8 bg-white px-4 py-2 font-accent text-sm font-semibold text-dark-light shadow-sm transition-all hover:border-terracotta-200 hover:bg-terracotta-50 hover:text-terracotta-700 hover:shadow-md"
              >
                <span className="text-[10px] text-dark/30 transition-colors group-hover:text-terracotta-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {t(`sections.${section.translationKey}.title`)}
              </motion.a>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Decorative divider */}
      <div className="mx-auto mt-16 max-w-7xl px-4">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-terracotta-200 to-transparent" />
        </div>
      </div>

      {/* Tour Sections */}
      <div className="mt-16 space-y-32">
        {tourSections.map((section, sectionIdx) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            {/* Hero row: large image + text */}
            <div className="mx-auto max-w-7xl px-4">
              <ScrollReveal>
                <div
                  className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 ${
                    section.layout === "hero-right" ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Hero image */}
                  <motion.button
                    onClick={() => openLightbox(section.heroImage)}
                    className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl lg:w-3/5"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={section.heroImage}
                      alt={section.heroAlt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    {/* Expand icon hint */}
                    <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                      <svg
                        className="h-4 w-4 text-dark"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </motion.button>

                  {/* Text content */}
                  <div className="flex flex-col justify-center lg:w-2/5">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-5xl font-bold text-terracotta-200/60">
                        {String(sectionIdx + 1).padStart(2, "0")}
                      </span>
                      <div className="h-px w-8 bg-terracotta-300" />
                    </div>
                    <h2 className="mt-3 font-display text-3xl font-bold text-dark md:text-4xl">
                      {t(`sections.${section.translationKey}.title`)}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-dark-light">
                      {t(`sections.${section.translationKey}.description`)}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm text-dark/40">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <span className="font-accent">
                        {section.images.length + 1} {section.images.length + 1 === 1 ? "Foto" : "Fotos"}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Supporting images grid */}
            <div className="mx-auto mt-8 max-w-7xl px-4">
              <div
                className={`grid gap-3 ${
                  section.images.length <= 3
                    ? "grid-cols-2 sm:grid-cols-3"
                    : section.images.length <= 4
                      ? "grid-cols-2 sm:grid-cols-4"
                      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                }`}
              >
                {section.images.map((img, imgIdx) => (
                  <ScrollReveal key={img.src} delay={imgIdx * 0.05}>
                    <motion.button
                      onClick={() => openLightbox(img.src)}
                      className="group relative aspect-square w-full overflow-hidden rounded-xl shadow-sm"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
                    </motion.button>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Section divider (not on last section) */}
            {sectionIdx < tourSections.length - 1 && (
              <div className="mx-auto mt-16 max-w-xs">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-terracotta-300/40" />
                  <div className="h-1.5 w-1.5 rounded-full bg-terracotta-300/60" />
                  <div className="h-1 w-1 rounded-full bg-terracotta-300/40" />
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* CTA at the end */}
      <div className="mx-auto mt-32 max-w-7xl px-4">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-terracotta-50 via-sand to-terracotta-50 py-20 text-center">
            {/* Decorative elements */}
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-terracotta-100/30 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-terracotta-200/20 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-dark md:text-4xl">
                {t("cta")}
              </h2>
              <div className="mt-8">
                <Link href="/buchen">
                  <Button size="lg">{tNav("bookNow")}</Button>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={allImages.map((img) => ({ src: img.src, alt: img.alt }))}
      />
    </main>
  );
}
