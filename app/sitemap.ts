import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://villa-gloria.com";

const pages = [
  "",
  "/das-haus",
  "/galerie",
  "/buchen",
  "/umgebung",
  "/bewertungen",
  "/kontakt",
  "/blog",
  "/blog/hundeurlaub-istrien",
  "/blog/weinurlaub-istrien",
  "/blog/familienurlaub-istrien",
  "/blog/geheimtipp-kastelir",
  "/blog/mountainbike-istrien",
  "/blog/rennrad-istrien",
  "/impressum",
  "/datenschutz",
  "/agb",
];

const locales = ["de", "en", "hr"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : page === "/buchen" ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${page}`])
          ),
        },
      });
    }
  }

  return entries;
}
