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
  Sun,
  Mountain,
  Map,
  Heart,
  MapPin,
  Shield,
  Droplets,
  Star,
} from "lucide-react";

const SLUG = "rennrad-istrien";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.blogRennrad" });
  const post = getPostBySlug(SLUG)!;
  return {
    title: t("title"),
    description: t("description"),
    keywords: post.keywords,
    openGraph: {
      title: t("title"),
      description: t("description"),
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
      },
    },
  };
}

export default async function RennradIstrienPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta.blogRennrad" });
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
      <BlogArticle post={post} relatedPosts={relatedPosts} localizedTitle={t("title")}>
        <p className="text-xl font-bold leading-relaxed">
          Istrien ist Europas Geheimtipp für Rennradfahrer. Milde Winter, kaum
          Verkehr auf Nebenstraßen, abwechslungsreiche Topografie von der Küste
          bis ins hügelige Hinterland — und das alles ohne die
          Touristenmassen von Mallorca. Ob Frühjahrs-Trainingslager oder
          entspannte Genusstour mit Konoba-Stopps: Die Halbinsel im Norden
          Kroatiens bietet alles, was das Rennradfahrer-Herz begehrt.
        </p>

        <BlogImageGrid
          images={[
            {
              src: "/images/blog/rennrad-1.webp",
              alt: "Rennradfahrer an der Küstenstraße in Istrien",
              caption: "Küstenstraßen mit Adriablick — Rennrad-Paradies Istrien",
            },
            {
              src: "/images/blog/rennrad-2.webp",
              alt: "Rennradgruppe durch ein istrisches Dorf",
              caption: "Durch mittelalterliche Dörfer im istrischen Hinterland",
            },
          ]}
        />

        <h2>Warum Rennradfahrer Istrien lieben</h2>
        <p>
          Immer mehr Rennradfahrer entdecken Istrien als Alternative zu den
          überlaufenen Klassikern. Die Gründe liegen auf der Hand:
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <Sun className="h-5 w-5" />,
              title: "Klima",
              description:
                "Über 240 Sonnentage im Jahr und milde Winter machen Istrien zum Ganzjahres-Revier. Die Saison läuft von März bis November — deutlich länger als in den Alpen.",
            },
            {
              icon: <Mountain className="h-5 w-5" />,
              title: "Straßen",
              description:
                "Gut asphaltierte Nebenstraßen mit wenig Verkehr. Keine LKW-Kolonnen, keine Staus — nur Sie und die Straße. Die Straßenqualität ist überraschend gut.",
            },
            {
              icon: <Map className="h-5 w-5" />,
              title: "Topografie",
              description:
                "Flache Küstenstraßen und hügelige Hinterlandrouten (300 bis 1.000 Höhenmeter pro Tour). Für jeden Trainingsstand die passende Herausforderung.",
            },
            {
              icon: <Heart className="h-5 w-5" />,
              title: "Kulinarik",
              description:
                "Konobas (lokale Gasthäuser) als Verpflegungsstopps mit Trüffelpasta, istrischem Olivenöl und einem Glas Malvazija. Radfahren und Genuss gehören hier zusammen.",
            },
          ]}
        />

        <h2>Top 4 Rennrad-Routen ab Kaštelir</h2>
        <p>
          Kaštelir liegt strategisch perfekt im Herzen Istriens. Von hier aus
          erreichen Sie sowohl die Küste als auch das Hinterland in wenigen
          Kilometern. Hier sind unsere vier Lieblingsrouten:
        </p>

        <BlogFeatureCard
          columns={2}
          features={[
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Kaštelir – Poreč – Vrsar Küstenrunde",
              description:
                "50 km, 400 Hm, leicht. Die perfekte Einrollrunde: Über Nebenstraßen nach Poreč, entlang der Küste nach Vrsar und zurück über das Hinterland. Flaches Profil mit einzelnen kurzen Anstiegen. Ideal für den ersten Tag.",
            },
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Kaštelir – Motovun – Groznjan Hügelrunde",
              description:
                "75 km, 900 Hm, mittel. Die Königsroute für ambitionierte Fahrer: Durch das Mirna-Tal hinauf nach Motovun (herrlicher Anstieg!), weiter nach Groznjan und zurück. Spektakuläre Aussichten auf die Bergdörfer.",
            },
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Kaštelir – Rovinj – Limski Kanal",
              description:
                "65 km, 600 Hm, leicht bis mittel. Küstenklassiker mit Kulturprogramm: Über Landstraßen nach Rovinj (Kaffeepause an der Hafenpromenade), zurück über den beeindruckenden Limski-Fjord. Abwechslungsreich und fotogen.",
            },
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Gran Fondo Istrien-Runde",
              description:
                "120 km, 1.500 Hm, anspruchsvoll. Die große Runde für trainierte Fahrer: Kaštelir – Pazin – Buzet – Groznjan – Motovun – zurück. Ein ganzer Tag im Sattel mit allen Highlights des istrischen Hinterlands.",
            },
          ]}
        />

        <h2>Rennrad-Events in Istrien</h2>
        <p>
          Istrien hat sich in den letzten Jahren als Austragungsort für
          hochwertige Radsport-Events etabliert. Wer den Wettkampf sucht oder
          einfach die besondere Atmosphäre eines organisierten Events genießen
          möchte, hat mehrere Optionen:
        </p>
        <ul>
          <li>
            <strong>Istria Granfondo (April):</strong> Rund 1.500 Teilnehmer aus
            ganz Europa. Mehrere Distanzen (80 km bis 130 km), professionelle
            Organisation, fantastische Strecke durch das Hinterland. Das
            Highlight der istrischen Radsport-Saison.
          </li>
          <li>
            <strong>Tour of Croatia (Mai):</strong> Das Profi-Etappenrennen
            führt regelmäßig durch Istrien. Selbst wenn Sie nicht mitfahren —
            die Strecken der Profis nachzufahren ist ein besonderes Erlebnis.
          </li>
          <li>
            <strong>Parenzana Cycling Marathon:</strong> Entlang der historischen
            Bahnstrecke, sowohl als MTB- als auch als Rennrad-Variante. Eine
            einzigartige Strecke durch Tunnels und über Viadukte.
          </li>
        </ul>

        <BlogInfoBox variant="tip" title="Tipp: Istria Granfondo im April">
          <p>
            Wer im April kommt, kann den Istria Granfondo mitfahren — eines der
            schönsten Jedermann-Rennen Europas. Die Anmeldung öffnet meist im
            Januar. Kombinieren Sie das Event mit einer Woche Training in der{" "}
            <Link href="/das-haus" className="text-terracotta-500">
              Villa Gloria
            </Link>{" "}
            und genießen Sie die perfekte Vorbereitung.
          </p>
        </BlogInfoBox>

        <h2>Praktische Tipps für Rennradfahrer</h2>
        <p>
          Damit Ihr Rennrad-Urlaub in Istrien reibungslos verläuft, hier unsere
          gesammelten Praxistipps:
        </p>
        <ul>
          <li>
            <strong>Radtransport:</strong> Die bequemste Option ist das Auto mit
            Heckträger oder Dachträger. Alternativ: Radkoffer im Flieger zum
            Flughafen Pula (30 Minuten von Kaštelir). Die meisten Airlines
            transportieren Räder als Sportgepäck.
          </li>
          <li>
            <strong>Verleih:</strong> Hochwertige Rennräder (Carbon, Shimano
            105 oder Ultegra) ab etwa 40 EUR pro Tag in Poreč. Einige Verleiher
            bieten auch Lieferung zur Villa an. Reservieren Sie in der
            Hochsaison mindestens eine Woche im Voraus.
          </li>
          <li>
            <strong>Wasser:</strong> Immer mindestens 2 Flaschen mitnehmen, im
            Sommer 3. In den Dörfern gibt es Brunnen und kleine Geschäfte zum
            Auffüllen. Auf längeren Strecken im Hinterland sind
            Versorgungspunkte seltener.
          </li>
          <li>
            <strong>Werkzeug:</strong> Grundwerkzeug, Ersatzschlauch und
            CO2-Patronen mitnehmen. Der nächste Fahrrad-Shop ist in Poreč (ca.
            15 km von Kaštelir). Im Notfall helfen die Einheimischen gerne —
            Gastfreundschaft wird in Istrien großgeschrieben.
          </li>
        </ul>

        <BlogInfoBox variant="warning" title="Achtung: Sommerhitze">
          <p>
            In der Mittagshitze (Juli/August) können die Temperaturen über
            35 Grad Celsius steigen. Planen Sie Ihre Touren früh morgens (Start
            vor 8 Uhr) oder am späten Nachmittag. Sonnencreme mit hohem LSF
            und eine gut gefüllte Trinkflasche sind Pflicht. Die{" "}
            <Link href="/umgebung" className="text-terracotta-500">
              Umgebung
            </Link>{" "}
            bietet glücklicherweise viele schattige Streckenabschnitte.
          </p>
        </BlogInfoBox>

        <h2>Villa Gloria — Ihr Radsport-Quartier in Istrien</h2>
        <p>
          Die{" "}
          <Link href="/das-haus" className="text-terracotta-500">
            Villa Gloria al Padre
          </Link>{" "}
          in Kaštelir ist der perfekte Stützpunkt für Ihren Rennrad-Urlaub.
          Direkt im Hinterland gelegen, mit sofortigem Zugang zu den besten
          Hügelrouten — und nur 15 Minuten von der Küste entfernt.
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <Droplets className="h-5 w-5" />,
              title: "Pool-Erholung nach langen Touren",
              description:
                "Der 12x8 m große Pool ist die beste Regeneration nach 100 km im Sattel. Abkühlung, Stretching am Beckenrand und Entspannung auf den Sonnenliegen.",
            },
            {
              icon: <Shield className="h-5 w-5" />,
              title: "Sichere Aufbewahrung",
              description:
                "Ihr Carbon-Renner ist auf dem eingezäunten Grundstück der Villa sicher aufgehoben. Geschützt vor Wetter und neugierigen Blicken.",
            },
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Lage am Hinterland",
              description:
                "Kaštelir liegt auf 200 m Höhe — direkt starten Sie in hügelige Straßen ohne langweiliges Flachstück zum Aufwärmen. Die besten Routen beginnen vor der Tür.",
            },
            {
              icon: <Star className="h-5 w-5" />,
              title: "Grillabend nach der Tour",
              description:
                "Der überdachte Grillplatz mit Steinofen lädt nach einem langen Tag im Sattel zum gemeinsamen Abendessen ein. Dazu ein Glas istrischer Malvazija.",
            },
          ]}
        />

        <BlogImageGrid
          columns={1}
          images={[
            {
              src: "/images/exterior/villa-pool-palmen.jpg",
              alt: "Villa Gloria mit Pool und Palmen",
              caption:
                "Regeneration am Pool — der perfekte Abschluss nach einer Rennradtour",
            },
          ]}
        />

        <BlogQuote>
          Istrien ist für Rennradfahrer, was die Toskana vor 20 Jahren war —
          noch ein echter Geheimtipp. Leere Straßen, perfekter Asphalt,
          grandiose Aussichten und am Ende des Tages eine Konoba mit
          Trüffelpasta. Besser geht es nicht.
        </BlogQuote>

        <p>
          Planen Sie Ihren Rennrad-Urlaub in Istrien und prüfen Sie die{" "}
          <Link href="/buchen" className="text-terracotta-500">
            Verfügbarkeit der Villa Gloria
          </Link>
          . Ob Solo-Trainingslager oder Gruppenreise mit Freunden — die Villa
          bietet Platz für bis zu 10 Personen und die perfekte Infrastruktur
          für Radsportler.
        </p>
      </BlogArticle>
    </>
  );
}
