import { setRequestLocale } from "next-intl/server";
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

export default async function RennradIstrienPage({ params }: Props) {
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
        <p className="text-xl font-bold leading-relaxed">
          Istrien ist Europas Geheimtipp fuer Rennradfahrer. Milde Winter, kaum
          Verkehr auf Nebenstrassen, abwechslungsreiche Topografie von der Kueste
          bis ins huegelige Hinterland — und das alles ohne die
          Touristenmassen von Mallorca. Ob Fruehjahrs-Trainingslager oder
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
          ueberlaufenen Klassikern. Die Gruende liegen auf der Hand:
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <Sun className="h-5 w-5" />,
              title: "Klima",
              description:
                "Ueber 240 Sonnentage im Jahr und milde Winter machen Istrien zum Ganzjahres-Revier. Die Saison laeuft von Maerz bis November — deutlich laenger als in den Alpen.",
            },
            {
              icon: <Mountain className="h-5 w-5" />,
              title: "Strassen",
              description:
                "Gut asphaltierte Nebenstrassen mit wenig Verkehr. Keine LKW-Kolonnen, keine Staus — nur Sie und die Strasse. Die Strassenqualitaet ist ueberraschend gut.",
            },
            {
              icon: <Map className="h-5 w-5" />,
              title: "Topografie",
              description:
                "Flache Kuestenstrassen und huegelige Hinterlandrouten (300 bis 1.000 Hoehenmeter pro Tour). Fuer jeden Trainingsstand die passende Herausforderung.",
            },
            {
              icon: <Heart className="h-5 w-5" />,
              title: "Kulinarik",
              description:
                "Konobas (lokale Gasthaeuser) als Verpflegungsstopps mit Trueffelpasta, istrischem Olivenoel und einem Glas Malvazija. Radfahren und Genuss gehoeren hier zusammen.",
            },
          ]}
        />

        <h2>Top 4 Rennrad-Routen ab Kastelir</h2>
        <p>
          Kastelir liegt strategisch perfekt im Herzen Istriens. Von hier aus
          erreichen Sie sowohl die Kueste als auch das Hinterland in wenigen
          Kilometern. Hier sind unsere vier Lieblingsrouten:
        </p>

        <BlogFeatureCard
          columns={2}
          features={[
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Kastelir – Porec – Vrsar Kuestenrunde",
              description:
                "50 km, 400 Hm, leicht. Die perfekte Einrollrunde: Ueber Nebenstrassen nach Porec, entlang der Kueste nach Vrsar und zurueck ueber das Hinterland. Flaches Profil mit einzelnen kurzen Anstiegen. Ideal fuer den ersten Tag.",
            },
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Kastelir – Motovun – Groznjan Huegelrunde",
              description:
                "75 km, 900 Hm, mittel. Die Koenigsroute fuer ambitionierte Fahrer: Durch das Mirna-Tal hinauf nach Motovun (herrlicher Anstieg!), weiter nach Groznjan und zurueck. Spektakulaere Aussichten auf die Bergdoerfer.",
            },
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Kastelir – Rovinj – Limski Kanal",
              description:
                "65 km, 600 Hm, leicht bis mittel. Kuestenklassiker mit Kulturprogramm: Ueber Landstrassen nach Rovinj (Kaffeepause an der Hafenpromenade), zurueck ueber den beeindruckenden Limski-Fjord. Abwechslungsreich und fotogen.",
            },
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Gran Fondo Istrien-Runde",
              description:
                "120 km, 1.500 Hm, anspruchsvoll. Die grosse Runde fuer trainierte Fahrer: Kastelir – Pazin – Buzet – Groznjan – Motovun – zurueck. Ein ganzer Tag im Sattel mit allen Highlights des istrischen Hinterlands.",
            },
          ]}
        />

        <h2>Rennrad-Events in Istrien</h2>
        <p>
          Istrien hat sich in den letzten Jahren als Austragungsort fuer
          hochwertige Radsport-Events etabliert. Wer den Wettkampf sucht oder
          einfach die besondere Atmosphaere eines organisierten Events geniessen
          moechte, hat mehrere Optionen:
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
            fuehrt regelmaessig durch Istrien. Selbst wenn Sie nicht mitfahren —
            die Strecken der Profis nachzufahren ist ein besonderes Erlebnis.
          </li>
          <li>
            <strong>Parenzana Cycling Marathon:</strong> Entlang der historischen
            Bahnstrecke, sowohl als MTB- als auch als Rennrad-Variante. Eine
            einzigartige Strecke durch Tunnels und ueber Viadukte.
          </li>
        </ul>

        <BlogInfoBox variant="tip" title="Tipp: Istria Granfondo im April">
          <p>
            Wer im April kommt, kann den Istria Granfondo mitfahren — eines der
            schoensten Jedermann-Rennen Europas. Die Anmeldung oeffnet meist im
            Januar. Kombinieren Sie das Event mit einer Woche Training in der{" "}
            <Link href="/das-haus" className="text-terracotta-500">
              Villa Gloria
            </Link>{" "}
            und geniessen Sie die perfekte Vorbereitung.
          </p>
        </BlogInfoBox>

        <h2>Praktische Tipps fuer Rennradfahrer</h2>
        <p>
          Damit Ihr Rennrad-Urlaub in Istrien reibungslos verlaeuft, hier unsere
          gesammelten Praxistipps:
        </p>
        <ul>
          <li>
            <strong>Radtransport:</strong> Die bequemste Option ist das Auto mit
            Hecktraeger oder Dachtraeger. Alternativ: Radkoffer im Flieger zum
            Flughafen Pula (30 Minuten von Kastelir). Die meisten Airlines
            transportieren Raeder als Sportgepaeck.
          </li>
          <li>
            <strong>Verleih:</strong> Hochwertige Rennraeder (Carbon, Shimano
            105 oder Ultegra) ab etwa 40 EUR pro Tag in Porec. Einige Verleiher
            bieten auch Lieferung zur Villa an. Reservieren Sie in der
            Hochsaison mindestens eine Woche im Voraus.
          </li>
          <li>
            <strong>Wasser:</strong> Immer mindestens 2 Flaschen mitnehmen, im
            Sommer 3. In den Doerfern gibt es Brunnen und kleine Geschaefte zum
            Auffuellen. Auf laengeren Strecken im Hinterland sind
            Versorgungspunkte seltener.
          </li>
          <li>
            <strong>Werkzeug:</strong> Grundwerkzeug, Ersatzschlauch und
            CO2-Patronen mitnehmen. Der naechste Fahrrad-Shop ist in Porec (ca.
            15 km von Kastelir). Im Notfall helfen die Einheimischen gerne —
            Gastfreundschaft wird in Istrien grossgeschrieben.
          </li>
        </ul>

        <BlogInfoBox variant="warning" title="Achtung: Sommerhitze">
          <p>
            In der Mittagshitze (Juli/August) koennen die Temperaturen ueber
            35 Grad Celsius steigen. Planen Sie Ihre Touren frueh morgens (Start
            vor 8 Uhr) oder am spaeten Nachmittag. Sonnencreme mit hohem LSF
            und eine gut gefuellte Trinkflasche sind Pflicht. Die{" "}
            <Link href="/umgebung" className="text-terracotta-500">
              Umgebung
            </Link>{" "}
            bietet gluecklicherweise viele schattige Streckenabschnitte.
          </p>
        </BlogInfoBox>

        <h2>Villa Gloria — Ihr Radsport-Quartier in Istrien</h2>
        <p>
          Die{" "}
          <Link href="/das-haus" className="text-terracotta-500">
            Villa Gloria al Padre
          </Link>{" "}
          in Kastelir ist der perfekte Stuetzpunkt fuer Ihren Rennrad-Urlaub.
          Direkt im Hinterland gelegen, mit sofortigem Zugang zu den besten
          Huegelrouten — und nur 15 Minuten von der Kueste entfernt.
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <Droplets className="h-5 w-5" />,
              title: "Pool-Erholung nach langen Touren",
              description:
                "Der 12x8 m grosse Pool ist die beste Regeneration nach 100 km im Sattel. Abkuehlung, Stretching am Beckenrand und Entspannung auf den Sonnenliegen.",
            },
            {
              icon: <Shield className="h-5 w-5" />,
              title: "Sichere Aufbewahrung",
              description:
                "Ihr Carbon-Renner ist auf dem eingezaeunten Grundstueck der Villa sicher aufgehoben. Geschuetzt vor Wetter und neugierigen Blicken.",
            },
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Lage am Hinterland",
              description:
                "Kastelir liegt auf 200 m Hoehe — direkt starten Sie in huegelige Strassen ohne langweiliges Flachstueck zum Aufwaermen. Die besten Routen beginnen vor der Tuer.",
            },
            {
              icon: <Star className="h-5 w-5" />,
              title: "Grillabend nach der Tour",
              description:
                "Der ueberdachte Grillplatz mit Steinofen laed nach einem langen Tag im Sattel zum gemeinsamen Abendessen ein. Dazu ein Glas istrischer Malvazija.",
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
          Istrien ist fuer Rennradfahrer, was die Toskana vor 20 Jahren war —
          noch ein echter Geheimtipp. Leere Strassen, perfekter Asphalt,
          grandlose Aussichten und am Ende des Tages eine Konoba mit
          Trueffelpasta. Besser geht es nicht.
        </BlogQuote>

        <p>
          Planen Sie Ihren Rennrad-Urlaub in Istrien und pruefen Sie die{" "}
          <Link href="/buchen" className="text-terracotta-500">
            Verfuegbarkeit der Villa Gloria
          </Link>
          . Ob Solo-Trainingslager oder Gruppenreise mit Freunden — die Villa
          bietet Platz fuer bis zu 10 Personen und die perfekte Infrastruktur
          fuer Radsportler.
        </p>
      </BlogArticle>
    </>
  );
}
