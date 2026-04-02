import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.villa-gloria-istrien.de";

// Individual lastmod dates per page (update when content changes)
const pageConfig: {
  path: string;
  lastModified: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}[] = [
  { path: "", lastModified: "2026-03-26", changeFrequency: "weekly", priority: 1.0 },
  { path: "/das-haus", lastModified: "2026-03-15", changeFrequency: "monthly", priority: 0.8 },
  { path: "/galerie", lastModified: "2026-03-15", changeFrequency: "monthly", priority: 0.7 },
  { path: "/buchen", lastModified: "2026-03-26", changeFrequency: "weekly", priority: 0.9 },
  { path: "/umgebung", lastModified: "2026-03-10", changeFrequency: "monthly", priority: 0.7 },
  { path: "/bewertungen", lastModified: "2026-03-20", changeFrequency: "monthly", priority: 0.7 },
  { path: "/kontakt", lastModified: "2026-03-10", changeFrequency: "monthly", priority: 0.6 },
  { path: "/blog", lastModified: "2026-03-20", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog/hundeurlaub-istrien", lastModified: "2026-03-18", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog/weinurlaub-istrien", lastModified: "2026-03-18", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog/familienurlaub-istrien", lastModified: "2026-03-18", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog/geheimtipp-kastelir", lastModified: "2026-03-18", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog/mountainbike-istrien", lastModified: "2026-03-20", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog/rennrad-istrien", lastModified: "2026-03-20", changeFrequency: "monthly", priority: 0.7 },
  { path: "/impressum", lastModified: "2026-02-01", changeFrequency: "yearly", priority: 0.3 },
  { path: "/datenschutz", lastModified: "2026-02-01", changeFrequency: "yearly", priority: 0.3 },
  { path: "/agb", lastModified: "2026-02-01", changeFrequency: "yearly", priority: 0.3 },
];

const locales = ["de", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pageConfig) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(page.lastModified),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            "x-default": `${BASE_URL}/de${page.path}`,
            ...Object.fromEntries(
              locales.map((l) => [l, `${BASE_URL}/${l}${page.path}`])
            ),
          },
        },
      });
    }
  }

  return entries;
}
