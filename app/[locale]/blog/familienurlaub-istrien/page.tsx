import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { BlogImageGrid } from "@/components/blog/BlogImageGrid";
import { BlogFeatureCard } from "@/components/blog/BlogFeatureCard";
import { BlogInfoBox } from "@/components/blog/BlogInfoBox";
import { BlogQuote } from "@/components/blog/BlogQuote";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import {
  Waves,
  Droplets,
  Wind,
  Baby,
  UtensilsCrossed,
  Bed,
  Home,
  CookingPot,
  Fence,
  Dumbbell,
  Flame,
  Palmtree,
  TreePine,
  Anchor,
} from "lucide-react";

const SLUG = "familienurlaub-istrien";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const post = getPostBySlug(SLUG)!;
  return {
    title: `${post.title} — Villa Gloria al Padre`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.image }],
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function FamilienurlaubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(SLUG)!;
  const relatedPosts = getRelatedPosts(SLUG);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `https://villa-gloria.com${post.image}`,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Villa Gloria al Padre",
    },
    publisher: {
      "@type": "Organization",
      name: "Villa Gloria al Padre",
      url: "https://villa-gloria.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticle post={post} relatedPosts={relatedPosts}>
        <p className="text-xl leading-relaxed">
          Istrien ist wie gemacht für Familien: kurze Anreise aus Deutschland
          und Österreich, kinderfreundliche Strände, spektakuläre
          Freizeitparks und eine Sicherheit, die Eltern beruhigt. In diesem
          Artikel zeigen wir Ihnen, warum Istrien das perfekte Ziel für Ihren
          nächsten Familienurlaub ist — und was Sie auf keinen Fall verpassen
          sollten.
        </p>

        <BlogImageGrid
          images={[
            {
              src: "/images/blog/familienurlaub-1.webp",
              alt: "Familie am Pool einer Villa in Istrien",
              caption: "Der 12x8 m Pool — Highlight für die ganze Familie",
            },
            {
              src: "/images/blog/familienurlaub-2.webp",
              alt: "Kinder auf Wasserrutschen im Aquapark",
              caption: "Volleyball, Badminton und Basketball im Garten",
            },
          ]}
        />

        <h2>Warum Istrien perfekt für Familienurlaub ist</h2>
        <p>
          Istrien liegt nur 5-7 Autostunden von München, Wien oder Zürich
          entfernt. Keine langen Flüge, kein Jetlag — und trotzdem
          Mittelmeer-Feeling pur. Die Halbinsel bietet eine einzigartige
          Mischung aus Natur, Kultur und Abenteuer:
        </p>
        <ul>
          <li>
            <strong>Kurze Anreise</strong> — Mit dem Auto über Österreich und
            Slowenien in wenigen Stunden. Perfekt auch für Familien mit
            kleinen Kindern.
          </li>
          <li>
            <strong>Sicheres Reiseziel</strong> — Kroatien gehört zu den
            sichersten Ländern Europas. Die Kriminalitätsrate ist niedrig, die
            Menschen gastfreundlich.
          </li>
          <li>
            <strong>Erschwingliche Preise</strong> — Im Vergleich zu Italien
            oder Südfrankreich sind Restaurants, Eintritte und Lebensmittel in
            Istrien deutlich günstiger.
          </li>
          <li>
            <strong>Kristallklares Wasser</strong> — Die istrische Küste hat
            einige der saubersten Badegewässer im Mittelmeer, regelmäßig mit
            der Blauen Flagge ausgezeichnet.
          </li>
          <li>
            <strong>Vielfalt</strong> — Strand am Morgen, Freizeitpark am
            Mittag, Altstadtbummel am Abend. In Istrien wird es nie langweilig.
          </li>
        </ul>

        <h2>Aquapark Istralandia — Europas bester Wasserpark</h2>
        <p>
          Nur 25 Minuten von Kaštelir entfernt liegt Istralandia — einer der
          größten und am besten bewerteten Wasserparks in ganz Europa. Auf
          über 80.000 m² bietet der Park:
        </p>

        <BlogInfoBox variant="info" title="Istralandia auf einen Blick">
          <ul className="mt-1 list-none space-y-1 p-0">
            <li>
              <strong>20+ Wasserrutschen</strong> — Von sanften Kinderrutschen
              bis zu adrenalingeladenen Highspeed-Rutschen.
            </li>
            <li>
              <strong>Wellenbecken</strong> — Riesiges Becken mit künstlichen
              Wellen, Meerfeeling mitten im Park.
            </li>
            <li>
              <strong>400 m Lazy River</strong> — Strömungskanal perfekt zum
              Entspannen.
            </li>
            <li>
              <strong>Kinderbereiche</strong> — Speziell für Kleinkinder mit
              flachem Wasser und Mini-Rutschen.
            </li>
            <li>
              <strong>Gastronomie</strong> — Restaurants und Snackbars im Park.
            </li>
          </ul>
          <p className="mt-2">
            <strong>Entfernung:</strong> 25 Min. von der Villa Gloria.{" "}
            <strong>Tipp:</strong> Unter der Woche und früh kommen. Online-Tickets
            sind günstiger.
          </p>
        </BlogInfoBox>

        <h2>Dino Park Funtana — Jurassic Park auf Istrisch</h2>
        <p>
          Der Dino Park in Funtana (ca. 20 Min. von Kaštelir) ist ein Muss für
          Kinder zwischen 3 und 12 Jahren. In einem natürlichen Waldgebiet
          stehen lebensgroße Dinosaurier-Nachbildungen, die sich bewegen und
          Geräusche machen.
        </p>

        <BlogInfoBox variant="tip" title="Dino Park Highlights">
          <ul className="mt-1 list-none space-y-1 p-0">
            <li>
              <strong>Über 100 Dinosaurier-Modelle</strong> — Vom T-Rex bis zum
              Diplodocus, alle in Originalgröße mit animatronischen Bewegungen.
            </li>
            <li>
              <strong>Ausgrabungsstätte</strong> — Kinder graben wie echte
              Paläontologen Fossilien aus.
            </li>
            <li>
              <strong>Schattiger Waldlehrpfad</strong> — Auch an heißen Tagen
              angenehm.
            </li>
            <li>
              <strong>Spielplatz und Hüpfburgen</strong> — Zusätzlicher Spaß
              nach dem Dino-Abenteuer.
            </li>
          </ul>
          <p className="mt-2">
            Planen Sie 2-3 Stunden ein. Kombikarten mit dem nahegelegenen
            Aquarium sind erhältlich.
          </p>
        </BlogInfoBox>

        <h2>Familienfreundliche Strände</h2>
        <p>
          Istriens Strände sind überwiegend Kieselstrände mit kristallklarem
          Wasser — ideal für Familien, da das Wasser sauber bleibt und die
          Sicht unter Wasser hervorragend ist. Unsere Empfehlungen in der Nähe
          der{" "}
          <Link href="/umgebung" className="text-terracotta-500">
            Villa Gloria
          </Link>
          :
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <Baby className="h-5 w-5" />,
              title: "Zelena Laguna, Poreč",
              description:
                "Flacher Einstieg, schattige Pinienwälder am Rand, Restaurants und Toiletten. Perfekt für kleine Kinder.",
            },
            {
              icon: <Palmtree className="h-5 w-5" />,
              title: "Bijeca, Medulin",
              description:
                "Einer der wenigen Sandstrände Istriens. Extrem flach und ideal für Kleinkinder. Sonnenschirme und Liegen vorhanden.",
            },
            {
              icon: <Anchor className="h-5 w-5" />,
              title: "Špadići, Funtana",
              description:
                "Kieselstrand mit Naturfelsen zum Klettern. Ältere Kinder lieben die Felsen und Höhlen am Rand.",
            },
            {
              icon: <TreePine className="h-5 w-5" />,
              title: "Valkanela, Vrsar",
              description:
                "Ruhig und familienfreundlich. Weniger besucht als Poreč, mit Bäumen beschattet.",
            },
          ]}
        />

        <p>
          <strong>Tipp:</strong> Badeschuhe sind in Istrien Pflicht — die
          Kieselsteine können scharfkantig sein. In Supermärkten und
          Strandshops sind sie günstig erhältlich.
        </p>

        <h2>Aktivitäten für Teenager</h2>
        <p>
          Teenager brauchen Action — und bekommen sie in Istrien reichlich:
        </p>

        <BlogImageGrid
          images={[
            {
              src: "/images/blog/familienurlaub-1.webp",
              alt: "Familienpool der Villa Gloria",
              caption: "Großer Pool — auch Teenager sind begeistert",
            },
            {
              src: "/images/blog/familienurlaub-2.webp",
              alt: "Kinder im Wasserpark an der kroatischen Küste",
              caption: "BBQ-Abende für die ganze Familie",
            },
          ]}
        />

        <ul>
          <li>
            <strong>Volleyball und Basketball an der Villa</strong> — Die{" "}
            <Link href="/das-haus" className="text-terracotta-500">
              Villa Gloria
            </Link>{" "}
            hat ein eigenes Volleyball-/Badmintonfeld und einen Basketballkorb
            im Garten. Perfekt für Nachmittage ohne Programm.
          </li>
          <li>
            <strong>12×8 m Pool</strong> — Groß genug zum Schwimmen,
            Tauchen und Spielen. Kein Kinderbecken — ein richtiger Pool, der
            auch Teenager begeistert.
          </li>
          <li>
            <strong>Radfahren und Mountainbike</strong> — Zahlreiche Wege
            durch Olivenhaine und Weinberge. Fahrräder können in Poreč
            gemietet werden.
          </li>
          <li>
            <strong>Kajak und SUP</strong> — An der Küste bei Poreč und
            Vrsar können Kajaks und Stand-Up-Paddleboards gemietet werden.
          </li>
          <li>
            <strong>Kletterpark Glavani</strong> — Der Abenteuerpark bei
            Barban (ca. 45 Min.) bietet Hochseilgärten und Ziplines für
            verschiedene Schwierigkeitsstufen.
          </li>
        </ul>

        <h2>
          Villa Gloria: Platz für die ganze Familie
        </h2>
        <p>
          Die{" "}
          <Link href="/das-haus" className="text-terracotta-500">
            Villa Gloria al Padre
          </Link>{" "}
          ist wie geschaffen für Familienurlaub. Mit 180 m² Wohnfläche, 4
          Schlafzimmern und Platz für bis zu 9 Gäste bietet sie Raum für
          Familien jeder Größe:
        </p>

        <BlogFeatureCard
          columns={3}
          features={[
            {
              icon: <Bed className="h-5 w-5" />,
              title: "4 Schlafzimmer, 3 Bäder",
              description:
                "Genug Platz, damit jeder seinen Rückzugsort hat. Keine beengten Hotelzimmer.",
            },
            {
              icon: <Home className="h-5 w-5" />,
              title: "Separates Apartment",
              description:
                "Perfekt für Großeltern oder Teenager. Eigenes Bad, Küchenzeile, separater Eingang.",
            },
            {
              icon: <CookingPot className="h-5 w-5" />,
              title: "Voll ausgestattete Küche",
              description:
                "Kochen Sie, was und wann Ihre Familie möchte. Keine teuren Halbpensionen.",
            },
            {
              icon: <Fence className="h-5 w-5" />,
              title: "1.000 m² eingezäunt",
              description:
                "Kinder können frei spielen. Eltern können entspannen, ohne ständig aufzupassen.",
            },
            {
              icon: <Waves className="h-5 w-5" />,
              title: "Pool (12x8 m)",
              description:
                "Der Höhepunkt für jede Familie. Groß genug für alle, mit Sonnenliegen und Schatten.",
            },
            {
              icon: <Dumbbell className="h-5 w-5" />,
              title: "Sportplatz im Garten",
              description:
                "Volleyball, Badminton, Basketball — alles vorhanden. Kein Extra-Eintritt.",
            },
            {
              icon: <Flame className="h-5 w-5" />,
              title: "BBQ-Bereich",
              description:
                "Grillabende gehören zum Familienurlaub. Überdachter Grillplatz — auch bei Regen.",
            },
          ]}
        />

        <BlogQuote>
          Ein Familienurlaub in Istrien kombiniert Abenteuer, Entspannung und
          mediterrane Lebensfreude. Die Villa Gloria gibt Ihnen den Platz und
          die Freiheit, die ein Familienurlaub braucht.
        </BlogQuote>

        <p>
          Prüfen Sie die{" "}
          <Link href="/buchen" className="text-terracotta-500">
            Verfügbarkeit
          </Link>{" "}
          und planen Sie Ihren nächsten Urlaub in Istrien.
        </p>
      </BlogArticle>
    </>
  );
}
