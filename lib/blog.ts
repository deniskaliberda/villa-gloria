export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  image: string;
  category: string;
  keywords: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "hundeurlaub-istrien",
    title:
      "Hundeurlaub in Istrien — Die besten Tipps für Urlaub mit Hund in Kroatien",
    description:
      "Einreisebestimmungen, hundefreundliche Strände und warum ein Ferienhaus mit eingezäuntem Grundstück die beste Wahl für den Hundeurlaub in Istrien ist.",
    date: "2026-03-15",
    readingTime: "8 min",
    image: "/images/blog/hero-hundeurlaub.webp",
    category: "Reise mit Hund",
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
    readingTime: "7 min",
    image: "/images/blog/hero-weinurlaub.webp",
    category: "Kulinarik",
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
    readingTime: "9 min",
    image: "/images/blog/hero-familienurlaub.webp",
    category: "Familienurlaub",
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
    title:
      "Geheimtipp Kaštelir — Warum dieses Dorf in Istrien noch unentdeckt ist",
    description:
      "Abseits der Touristenmassen: Kaštelir bietet authentisches Istrien mit lokalen Konobas, Olivenöl vom Erzeuger und perfekter Lage zwischen Poreč und Rovinj.",
    date: "2026-02-20",
    readingTime: "6 min",
    image: "/images/blog/hero-kastelir.webp",
    category: "Geheimtipp",
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
    title: "Mountainbiken in Istrien — Die besten Trails rund um Poreč und Kaštelir",
    description:
      "Istriens Hinterland ist ein MTB-Paradies: rote Erde, Singletrails durch Olivenhaine und Panorama-Routen mit Meerblick. Die besten Strecken und Tipps für Mountainbiker.",
    date: "2026-03-20",
    readingTime: "8 min",
    image: "/images/blog/hero-mountainbike.webp",
    category: "Sport & Outdoor",
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
    title: "Rennradfahren in Istrien — Traumrouten zwischen Küste und Hinterland",
    description:
      "Istrien ist Europas Geheimtipp für Rennradfahrer: milde Temperaturen, wenig Verkehr, abwechslungsreiche Topografie. Die schönsten Routen und praktische Tipps.",
    date: "2026-03-18",
    readingTime: "7 min",
    image: "/images/blog/hero-rennrad.webp",
    category: "Sport & Outdoor",
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
  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit);
}
