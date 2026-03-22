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
  UtensilsCrossed,
  MapPin,
  Car,
  ShoppingCart,
  Waves as WavesIcon,
  Home,
  Droplets,
  Flower2,
  Flame,
  Navigation,
} from "lucide-react";

const SLUG = "geheimtipp-kastelir";

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
    alternates: {
      canonical: `/${locale}/blog/${SLUG}`,
      languages: {
        "x-default": `/de/blog/${SLUG}`,
        de: `/de/blog/${SLUG}`,
        en: `/en/blog/${SLUG}`,
        hr: `/hr/blog/${SLUG}`,
      },
    },
  };
}

export default async function GeheimtippPage({ params }: Props) {
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
          Während sich die Touristen in Poreč, Rovinj und Pula drängen, liegt
          nur wenige Kilometer im Landesinneren ein Dorf, das die meisten
          Reiseführer noch nicht entdeckt haben: Kaštelir. Hier schlägt das
          Herz des authentischen Istriens — mit Olivenhainen, Konobas und
          einer Ruhe, die man an der Küste vergeblich sucht.
        </p>

        <BlogImageGrid
          columns={1}
          images={[
            {
              src: "/images/blog/kastelir-1.webp",
              alt: "Kopfsteinpflastergasse in Kaštelir mit Steinhäusern",
              caption:
                "Kaštelir — authentisches Istrien abseits der Touristenmassen",
            },
          ]}
        />

        <h2>Kaštelir: Das authentische Istrien abseits der Touristenmassen</h2>
        <p>
          Kaštelir (kroatisch: Kaštelir-Labinci) ist eine kleine Gemeinde mit
          knapp 1.500 Einwohnern im Herzen der istrischen Halbinsel. Das
          Dorf thront auf einem Hügel mit Blick über Olivenhaine, Weinberge
          und — bei klarer Sicht — bis zum Meer. Hier gibt es keine
          Bettenburgen, keine Souvenirshops und keine überfüllten Strände.
        </p>
        <p>
          Stattdessen finden Sie:
        </p>
        <ul>
          <li>
            <strong>Steinerne Gassen</strong> — Das Dorfzentrum besteht aus
            typisch istrischen Steinhäusern, vielen davon Jahrhunderte alt.
            Ein Spaziergang durch die engen Gassen ist wie eine Reise in die
            Vergangenheit.
          </li>
          <li>
            <strong>Lokale Feste</strong> — Im Sommer finden regelmäßig
            Dorffeste statt, bei denen Einheimische und Gäste gemeinsam
            feiern. Live-Musik, gegrilltes Lamm und lokaler Wein —
            authentischer geht es nicht.
          </li>
          <li>
            <strong>Ruhe und Natur</strong> — Kein Nachtleben, kein Lärm.
            Morgens weckt Sie das Zirpen der Grillen, abends begleitet der
            Sonnenuntergang über den Hügeln den Aperitif.
          </li>
        </ul>

        <h2>Lokale Restaurants &amp; Konobas</h2>
        <p>
          Konobas sind traditionelle istrische Gasthäuser — oft
          familiengeführt, immer authentisch. In und um Kaštelir finden Sie
          einige der besten:
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <UtensilsCrossed className="h-5 w-5" />,
              title: "Konoba Morgan",
              description:
                "Direkt in Kaštelir. Rustikales Ambiente, hausgemachte Pasta (Fuži, Pljukanci), gegrilltes Fleisch und fangfrischer Fisch. Faire Preise, großzügige Portionen.",
            },
            {
              icon: <UtensilsCrossed className="h-5 w-5" />,
              title: "Konoba Astarea",
              description:
                "Nähe Brtonigla. Bekannt für Trüffelgerichte und hauseigenen Wein. Im Sommer im schattigen Innenhof unter jahrhundertealtem Feigenbaum.",
            },
            {
              icon: <UtensilsCrossed className="h-5 w-5" />,
              title: "Taverna Danijela",
              description:
                "Zwischen Kaštelir und Poreč. Meeresfrüchte und Fisch in erstklassiger Qualität. Die Fischplatte für zwei ist legendär.",
            },
            {
              icon: <UtensilsCrossed className="h-5 w-5" />,
              title: "Konoba Daniela, Labinci",
              description:
                "Nur wenige Minuten entfernt. Istrische Klassiker: Maneštra, Fritaja (Trüffel-Omelett) und hausgemachtes Brot aus dem Steinofen.",
            },
          ]}
        />

        <p>
          <strong>Tipp:</strong> Reservieren Sie in der Hochsaison (Juli/August)
          immer einen Tag vorher. Die besten Konobas haben oft nur 20-30
          Sitzplätze.
        </p>

        <h2>Olivenöl direkt vom Erzeuger</h2>
        <p>
          Kaštelir liegt mitten in einem der besten Olivenanbaugebiete
          Istriens. Die Terra Rossa (rote Erde) und das mediterrane Klima
          erzeugen Olivenöle von Weltklasse-Qualität:
        </p>

        <BlogInfoBox variant="tip" title="Olivenöl-Tipp">
          <p>
            <strong>OPG Špiranec</strong> — Ein Familienbetrieb direkt bei
            Kaštelir. Besichtigung der Ölmühle, Verkostung und Direktverkauf.
            Die Familie erklärt den gesamten Prozess — von der Ernte bis zur
            Pressung.
          </p>
          <p className="mt-2">
            Achten Sie auf die Bezeichnung „Ekstra Djevičansko" (Extra
            Vergine). Istrisches Olivenöl wurde vom Flos Olei Guide mehrfach
            unter die weltbesten gewählt. Im Frühling finden regelmäßig
            Olivenöl-Festivals in der Region statt.
          </p>
        </BlogInfoBox>

        <h2>Perfekte Lage: 10 Min. Poreč, 15 Min. Rovinj, 5 Min. Autobahn</h2>
        <p>
          Was Kaštelir besonders macht, ist die Kombination aus Ruhe und
          Erreichbarkeit. Von hier aus sind Sie in kürzester Zeit überall:
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Poreč — 10 Minuten",
              description:
                "UNESCO-Stadt mit Euphrasius-Basilika, Altstadt und Strandpromenade. Perfekt für einen halben Tag.",
            },
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Rovinj — 15-20 Minuten",
              description:
                "Die romantischste Stadt Istriens. Enge Gassen, bunte Häuser und die Kirche der Heiligen Euphemia.",
            },
            {
              icon: <Car className="h-5 w-5" />,
              title: "Autobahn (Ipsilon) — 5 Min.",
              description:
                "Auffahrt bei Baderna verbindet Sie schnell mit Pula (Flughafen), Rijeka und dem Rest Kroatiens.",
            },
            {
              icon: <ShoppingCart className="h-5 w-5" />,
              title: "Einkaufen — 700 m",
              description:
                "Supermarkt, Bäckerei und Apotheke in Kaštelir selbst. Größere Einkäufe in Poreč (Konzum, Lidl, Kaufland).",
            },
            {
              icon: <WavesIcon className="h-5 w-5" />,
              title: "Strand — 10 Min.",
              description:
                "Die nächsten Bademöglichkeiten sind 8 km entfernt. In 10 Autominuten sind Sie am Meer.",
            },
          ]}
        />

        <h2>Warum Ruhesuchende hier richtig sind</h2>
        <p>
          Kaštelir ist kein Ort für Partyurlauber oder Massentourismus. Es ist
          ein Ort für Menschen, die:
        </p>
        <ul>
          <li>
            Morgens in Ruhe frühstücken möchten — auf der eigenen Terrasse,
            mit Blick auf den Garten.
          </li>
          <li>
            Nachmittags am Pool liegen und ein Buch lesen wollen, ohne
            Animationsprogramm und Hotelgeräusche.
          </li>
          <li>
            Abends auf dem Grill istrische Ćevapčići und frischen Fisch vom
            Markt in Poreč zubereiten.
          </li>
          <li>
            Die Nacht bei Grillengesang und Sternenblick auf der Terrasse
            ausklingen lassen.
          </li>
        </ul>
        <p>
          Das bedeutet nicht, dass es langweilig wird. Die Küste, die
          Freizeitparks und die historischen Städte sind jederzeit erreichbar.
          Aber Kaštelir gibt Ihnen die Freiheit, selbst zu entscheiden, wann
          Sie Trubel wollen — und wann nicht.
        </p>

        <BlogImageGrid
          images={[
            {
              src: "/images/blog/kastelir-2.webp",
              alt: "Konoba-Terrasse am Abend in Istrien",
              caption: "Abendessen in der Konoba — istrische Gastfreundschaft",
            },
            {
              src: "/images/exterior/villa-pool-wide.jpg",
              alt: "Villa Gloria mit Pool und Garten",
              caption: "Ihr Zuhause in Kaštelir — Villa Gloria mit privatem Pool",
            },
          ]}
        />

        <h2>Villa Gloria: Ihr Zuhause in Kaštelir</h2>
        <p>
          Die{" "}
          <Link href="/das-haus" className="text-terracotta-500">
            Villa Gloria al Padre
          </Link>{" "}
          verkörpert alles, was Kaštelir ausmacht: Ruhe, Großzügigkeit und
          istrischen Charme. Auf 1.000 m² eingezäuntem Grundstück finden Sie:
        </p>

        <BlogFeatureCard
          columns={3}
          features={[
            {
              icon: <Home className="h-5 w-5" />,
              title: "180 m² Wohnfläche",
              description:
                "Vier Schlafzimmer, drei Bäder, offener Wohn-/Essbereich mit voll ausgestatteter Küche.",
            },
            {
              icon: <Droplets className="h-5 w-5" />,
              title: "Privater Pool (12x8 m)",
              description:
                "Mit Panoramablick über die istrische Landschaft bis zum Meer.",
            },
            {
              icon: <Flower2 className="h-5 w-5" />,
              title: "Mediterraner Garten",
              description:
                "Olivenbäume, Lavendel, Rosmarin und Rosenpavillon. Dazu Volleyball und Basketball.",
            },
            {
              icon: <Flame className="h-5 w-5" />,
              title: "Überdachter BBQ-Bereich",
              description:
                "Grillen wie die Einheimischen, mit Steinofen und ausreichend Sitzplätzen.",
            },
            {
              icon: <Navigation className="h-5 w-5" />,
              title: "Ruhig, dennoch zentral",
              description:
                "700 m zum Ortskern, 10 Min. nach Poreč, 5 Min. zur Autobahn.",
            },
          ]}
        />

        <BlogQuote>
          Kaštelir ist der Ort, an den man zurückkehrt. Nicht weil es
          spektakulär ist, sondern weil es sich anfühlt wie zu Hause — nur mit
          besserem Wetter, besserem Essen und einem Pool im Garten.
        </BlogQuote>

        <p>
          Entdecken Sie diesen Geheimtipp selbst und prüfen Sie die{" "}
          <Link href="/buchen" className="text-terracotta-500">
            Verfügbarkeit der Villa Gloria
          </Link>
          .
        </p>
      </BlogArticle>
    </>
  );
}
