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
  Wine,
  MapPin,
  UtensilsCrossed,
  Waves,
  Users,
} from "lucide-react";

const SLUG = "weinurlaub-istrien";

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

export default async function WeinurlaubPage({ params }: Props) {
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
          Istrien ist nicht nur für seine Küste bekannt — die Halbinsel hat sich
          in den letzten zwei Jahrzehnten zu einer der spannendsten Weinregionen
          Europas entwickelt. Zwischen Olivenhainen und mittelalterlichen
          Bergdörfern produzieren leidenschaftliche Winzer Weine von
          Weltklasse-Niveau. Ein Weinurlaub in Istrien verbindet Genuss, Kultur
          und Erholung auf einzigartige Weise.
        </p>

        <BlogImageGrid
          images={[
            {
              src: "/images/blog/weinurlaub-1.webp",
              alt: "Weinberge in Istrien mit Blick auf die Adria",
              caption: "Istrische Weinlandschaft — rote Erde, grüne Reben, blaue Adria",
            },
            {
              src: "/images/blog/weinurlaub-2.webp",
              alt: "Weinverkostung in einer istrischen Konoba",
              caption: "Malvazija und Teran — Verkostung in einer traditionellen Konoba",
            },
          ]}
        />

        <h2>Istrien: Kroatiens Weinregion Nr. 1</h2>
        <p>
          Die istrische Halbinsel profitiert von einem mediterranen Klima mit
          warmen Sommern, milden Wintern und der berühmten Bora — einem kalten
          Nordwind, der die Trauben gesund hält. Die kalksteinhaltigen Böden,
          die sogenannte „Terra Rossa" (rote Erde), verleihen den Weinen ihren
          unverwechselbaren Charakter.
        </p>
        <p>
          Über 400 Weingüter sind in Istrien registriert — von
          Familienbetrieben mit wenigen tausend Flaschen bis zu modernen
          Kellereien mit internationaler Ausrichtung. Die Region hat in den
          letzten Jahren zahlreiche internationale Preise gewonnen und zieht
          zunehmend Weinkenner aus ganz Europa an.
        </p>

        <h2>Malvazija &amp; Teran — die Stars der istrischen Weinszene</h2>
        <p>
          Zwei Rebsorten dominieren die istrische Weinlandschaft und sollten
          bei keinem Weinurlaub fehlen:
        </p>

        <BlogQuote>
          Malvazija Istarska und Teran — zwei autochthone Rebsorten, die
          nirgendwo auf der Welt so gut gedeihen wie auf der roten Erde
          Istriens. Sie sind das flüssige Terroir der Halbinsel.
        </BlogQuote>

        <ul>
          <li>
            <strong>Malvazija Istarska</strong> — Der Star unter den
            Weißweinen. Diese autochthone Rebsorte bringt Weine mit Aromen von
            Akazienblüten, grünem Apfel und einem Hauch Mandel hervor. Von
            frisch und leicht bis im Holzfass gereift — Malvazija überrascht
            mit ihrer Vielseitigkeit. Sie macht rund 60 % der istrischen
            Weinproduktion aus.
          </li>
          <li>
            <strong>Teran</strong> — Der kräftige Rotwein Istriens. Auf der
            roten Terra-Rossa-Erde gewachsen, besticht er durch dunkle
            Fruchtaromen, präsente Säure und erdige Noten. Teran ist der
            perfekte Begleiter zu istrischem Pršut (Schinken) und gereiftem
            Käse.
          </li>
        </ul>
        <p>
          Daneben lohnen sich auch <strong>Muškat Momjanski</strong> (ein
          aromatischer Muskateller), <strong>Refošk</strong> (ein leichterer
          Rotwein) und zunehmend internationale Sorten wie Merlot und
          Chardonnay, die in Istrien hervorragend gedeihen.
        </p>

        <h2>Top 5 Weingüter in der Nähe von Kaštelir/Poreč</h2>
        <p>
          Von der{" "}
          <Link href="/das-haus" className="text-terracotta-500">
            Villa Gloria
          </Link>{" "}
          aus erreichen Sie diese erstklassigen Weingüter in wenigen
          Autominuten:
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <Wine className="h-5 w-5" />,
              title: "Kozlović (Momjan) — ca. 30 Min.",
              description:
                "Eines der renommiertesten Weingüter Kroatiens. Die Malvazija \u201ESanta Lucia\u201C gehört zu den besten Weißweinen des Landes. Moderne Architektur trifft auf Tradition — Verkostung mit Blick über die Weinberge.",
            },
            {
              icon: <Wine className="h-5 w-5" />,
              title: "Matošević (Krunčići) — ca. 20 Min.",
              description:
                "Ivica Matošević gilt als Pionier der istrischen Weinrevolution. Sein \u201EAlba\u201C Malvazija ist international mehrfach ausgezeichnet. Intime Verkostungen mit persönlicher Beratung.",
            },
            {
              icon: <Wine className="h-5 w-5" />,
              title: "Degrassi (Savudrija) — ca. 35 Min.",
              description:
                "Weinbau mit atemberaubendem Blick auf die Adria. Bekannt für elegante Malvazija und samtige Merlots. Verkostung direkt am Meer — Sonnenuntergang inklusive.",
            },
            {
              icon: <Wine className="h-5 w-5" />,
              title: "Trapan (Šišan bei Pula) — ca. 50 Min.",
              description:
                "Eines der modernsten Weingüter Istriens. \u201EPonente\u201C Malvazija und \u201ESyrah\u201C sind Geheimtipps unter Kennern. Architektonisch beeindruckend, mit regionaler Küche.",
            },
            {
              icon: <Wine className="h-5 w-5" />,
              title: "Kabola (Momjan) — ca. 30 Min.",
              description:
                "Vorreiter des Naturweins in Kroatien. \u201EAmphora\u201C Malvazija — in Tonamphoren vergoren — ist einzigartig. Ausgezeichnete Verkostungen mit Käse und Olivenöl.",
            },
          ]}
        />

        <BlogInfoBox variant="tip" title="Tipp: Vorab reservieren">
          <p>
            Planen Sie einen Fahrer ein oder buchen Sie eine geführte Weintour.
            Die Straßen sind kurvig und die Verkostungen großzügig. Reservieren
            Sie die Verkostungen mindestens einige Tage im Voraus — besonders
            in der Hochsaison.
          </p>
        </BlogInfoBox>

        <h2>Istrische Weinstraßen — Routen für Genießer</h2>
        <p>
          Istrien hat mehrere offizielle Weinstraßen eingerichtet, die durch
          die schönsten Weingebiete führen:
        </p>

        <BlogImageGrid
          columns={1}
          images={[
            {
              src: "/images/blog/weinurlaub-1.webp",
              alt: "Weinstraße durch die istrischen Hügel",
              caption:
                "Die istrischen Weinstraßen führen durch sanfte Hügellandschaften",
            },
          ]}
        />

        <ul>
          <li>
            <strong>Weinstraße Buje — Momjan — Grožnjan</strong> — Die
            bekannteste Route durch das nördliche Istrien. Zahlreiche Weingüter,
            Olivenöl-Produzenten und Konobas (traditionelle Gasthäuser) am
            Wegesrand.
          </li>
          <li>
            <strong>Weinstraße Poreč — Višnjan — Motovun</strong> — Von der
            Küste ins bergige Hinterland. Unterwegs passieren Sie Weinberge,
            Trüffelwälder und mittelalterliche Dörfer.
          </li>
          <li>
            <strong>Weinstraße Vodnjan — Dignano</strong> — Im Süden Istriens
            gelegen. Hier dominieren Rotweine und exzellentes Olivenöl.
          </li>
        </ul>

        <h2>
          Olivenöl &amp; Trüffel — Istriens kulinarische Dreifaltigkeit
        </h2>
        <p>
          Ein Weinurlaub in Istrien wäre unvollständig ohne die anderen beiden
          kulinarischen Stars der Region:
        </p>

        <BlogInfoBox variant="info" title="Kulinarisches Dreieck Istriens">
          <p>
            <strong>Olivenöl:</strong> Istrisches Olivenöl gehört zur
            Weltspitze. Verkostungen auf Weingütern und in spezialisierten
            Ölmühlen. Empfehlenswert: Chiavalon, Belic und Ipša.
          </p>
          <p className="mt-2">
            <strong>Trüffel:</strong> Das Mirna-Tal bei Motovun ist das
            Trüffelzentrum Istriens. Von Oktober bis Dezember ist Hochsaison
            für den begehrten weißen Trüffel. Geführte Trüffeljagden mit Hunden
            sind ein unvergessliches Erlebnis.
          </p>
          <p className="mt-2">
            Die Kombination macht Istrien zu einem kulinarischen Paradies, das
            sich mit der Toskana messen kann — nur ohne die Massen und zu
            deutlich günstigeren Preisen.
          </p>
        </BlogInfoBox>

        <h2>Villa Gloria als Ausgangspunkt für Weintouren</h2>
        <p>
          Die{" "}
          <Link href="/das-haus" className="text-terracotta-500">
            Villa Gloria al Padre
          </Link>{" "}
          in Kaštelir liegt ideal für Weintouren durch Istrien:
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Zentrale Lage",
              description:
                "Von Kaštelir erreichen Sie alle wichtigen Weingebiete in 20-50 Minuten. Perfekte Anbindung.",
            },
            {
              icon: <UtensilsCrossed className="h-5 w-5" />,
              title: "Großer Esstisch innen & außen",
              description:
                "Bringen Sie Ihre Weinschätze mit und genießen Sie sie beim Abendessen auf der Terrasse mit Meerblick.",
            },
            {
              icon: <UtensilsCrossed className="h-5 w-5" />,
              title: "Grill & Outdoor-Küche",
              description:
                "Der überdachte Grillplatz lädt ein, istrische Spezialitäten selbst zuzubereiten — mit Malvazija in der Hand.",
            },
            {
              icon: <Waves className="h-5 w-5" />,
              title: "Pool zur Erholung",
              description:
                "Nach einem Tag voller Verkostungen entspannen Sie am 12x8 m großen Pool.",
            },
            {
              icon: <Users className="h-5 w-5" />,
              title: "Platz für Gruppen",
              description:
                "Mit bis zu 9 Gästen eignet sich die Villa perfekt für einen Weinurlaub mit Freunden.",
            },
          ]}
        />

        <p>
          Planen Sie Ihren Weinurlaub in Istrien und erleben Sie die
          Gastfreundschaft, die diese Region so besonders macht. Prüfen Sie
          die{" "}
          <Link href="/buchen" className="text-terracotta-500">
            Verfügbarkeit der Villa Gloria
          </Link>{" "}
          und sichern Sie sich Ihren Termin.
        </p>
      </BlogArticle>
    </>
  );
}
