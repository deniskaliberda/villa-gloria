export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateModified: string;
  readingTime: string;
  image: string;
  category: string;
  keywords: string[];
  wordCount: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "hundeurlaub-istrien",
    title: "Hundeurlaub Istrien — Tipps für Urlaub mit Hund",
    description:
      "Einreisebestimmungen, hundefreundliche Strände und warum ein Ferienhaus mit eingezäuntem Grundstück die beste Wahl für den Hundeurlaub in Istrien ist.",
    date: "2026-03-15",
    dateModified: "2026-03-25",
    readingTime: "12 min",
    image: "/images/blog/hero-hundeurlaub.webp",
    category: "Reise mit Hund",
    wordCount: 3500,
    keywords: [
      "Hundeurlaub Istrien",
      "Urlaub mit Hund Kroatien",
      "hundefreundliches Ferienhaus Istrien",
      "Einreisebestimmungen Hund Kroatien",
      "Hundestrand Istrien",
    ],
  },
  {
    slug: "weinurlaub-istrien",
    title: "Weinurlaub in Istrien — Die besten Weingüter rund um Poreč",
    description:
      "Entdecken Sie Istriens Weinregion: Malvazija, Teran und die Top-Weingüter zwischen Kaštelir und Poreč. Tipps für Weintouren und kulinarische Erlebnisse.",
    date: "2026-03-08",
    dateModified: "2026-03-25",
    readingTime: "11 min",
    image: "/images/blog/hero-weinurlaub.webp",
    category: "Kulinarik",
    wordCount: 3200,
    keywords: [
      "Weinurlaub Istrien",
      "Weingüter Poreč",
      "Malvazija Wein",
      "Teran Wein Kroatien",
      "Weinstraße Istrien",
    ],
  },
  {
    slug: "familienurlaub-istrien",
    title: "Familienurlaub in Istrien — Was Kinder und Eltern begeistert",
    description:
      "Aquapark Istralandia, Dino Park Funtana und familienfreundliche Strände: Warum Istrien das perfekte Reiseziel für Familien mit Kindern ist.",
    date: "2026-02-28",
    dateModified: "2026-03-25",
    readingTime: "13 min",
    image: "/images/blog/hero-familienurlaub.webp",
    category: "Familienurlaub",
    wordCount: 3800,
    keywords: [
      "Familienurlaub Istrien",
      "Urlaub mit Kindern Kroatien",
      "Istralandia Aquapark",
      "Dino Park Funtana",
      "Ferienhaus Familie Istrien",
    ],
  },
  {
    slug: "geheimtipp-kastelir",
    title: "Geheimtipp Kaštelir — Unentdecktes Istrien",
    description:
      "Abseits der Touristenmassen: Kaštelir bietet authentisches Istrien mit lokalen Konobas, Olivenöl vom Erzeuger und perfekter Lage zwischen Poreč und Rovinj.",
    date: "2026-02-20",
    dateModified: "2026-03-25",
    readingTime: "10 min",
    image: "/images/blog/hero-kastelir.webp",
    category: "Geheimtipp",
    wordCount: 3000,
    keywords: [
      "Kaštelir Istrien",
      "Geheimtipp Kroatien",
      "authentisches Istrien",
      "Konoba Istrien",
      "Olivenöl Istrien",
    ],
  },
  {
    slug: "mountainbike-istrien",
    title: "Mountainbike Istrien — Die besten Trails bei Poreč",
    description:
      "Istriens Hinterland ist ein MTB-Paradies: rote Erde, Singletrails durch Olivenhaine und Panorama-Routen mit Meerblick. Die besten Strecken und Tipps für Mountainbiker.",
    date: "2026-03-20",
    dateModified: "2026-03-25",
    readingTime: "11 min",
    image: "/images/blog/hero-mountainbike.webp",
    category: "Sport & Outdoor",
    wordCount: 3400,
    keywords: [
      "Mountainbike Istrien",
      "MTB Trails Kroatien",
      "Mountainbiken Poreč",
      "Radfahren Istrien",
      "Singletrails Kroatien",
    ],
  },
  {
    slug: "rennrad-istrien",
    title: "Rennrad Istrien — Traumrouten Küste & Hinterland",
    description:
      "Istrien ist Europas Geheimtipp für Rennradfahrer: milde Temperaturen, wenig Verkehr, abwechslungsreiche Topografie. Die schönsten Routen und praktische Tipps.",
    date: "2026-03-18",
    dateModified: "2026-03-25",
    readingTime: "12 min",
    image: "/images/blog/hero-rennrad.webp",
    category: "Sport & Outdoor",
    wordCount: 3500,
    keywords: [
      "Rennrad Istrien",
      "Rennradfahren Kroatien",
      "Radtouren Istrien",
      "Rennrad Poreč",
      "Radsport Kroatien",
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(
  currentSlug: string,
  limit = 2
): BlogPost[] {
  const current = blogPosts.find((p) => p.slug === currentSlug);
  const others = blogPosts.filter((post) => post.slug !== currentSlug);

  if (!current) return others.slice(0, limit);

  // Sort by matching category first, then by date
  return others
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 1 : 0;
      const bMatch = b.category === current.category ? 1 : 0;
      if (bMatch !== aMatch) return bMatch - aMatch;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, limit);
}
