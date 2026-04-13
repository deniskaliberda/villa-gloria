import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { BlogImageGrid } from "@/components/blog/BlogImageGrid";
import { BlogFeatureCard } from "@/components/blog/BlogFeatureCard";
import { BlogInfoBox } from "@/components/blog/BlogInfoBox";
import { BlogQuote } from "@/components/blog/BlogQuote";
import { BlogTableOfContents } from "@/components/blog/BlogTableOfContents";
import { BlogFAQ } from "@/components/blog/BlogFAQ";
import { BlogQuickFacts } from "@/components/blog/BlogQuickFacts";
import { BlogSeasonalTip } from "@/components/blog/BlogSeasonalTip";
import { BlogComparisonTable } from "@/components/blog/BlogComparisonTable";
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
  Wind,
  Users,
  Wrench,
  Coffee,
  Bike,
  Clock,
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
      canonical: `https://www.villa-gloria-istrien.de/${locale}/blog/${SLUG}`,
      languages: {
        "x-default": `https://www.villa-gloria-istrien.de/de/blog/${SLUG}`,
        de: `https://www.villa-gloria-istrien.de/de/blog/${SLUG}`,
        en: `https://www.villa-gloria-istrien.de/en/blog/${SLUG}`,
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
    image: `https://www.villa-gloria-istrien.de${post.image}`,
    datePublished: post.date,
    dateModified: post.dateModified,
    wordCount: post.wordCount,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.villa-gloria-istrien.de/de/blog/${SLUG}`,
    },
    author: { "@type": "Organization", name: "Villa Gloria al Padre" },
    publisher: {
      "@type": "Organization",
      name: "Villa Gloria al Padre",
      url: "https://www.villa-gloria-istrien.de",
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

        <BlogQuickFacts
          facts={[
            { icon: <Bike className="h-5 w-5" />, label: "Routen", value: "4+" },
            { icon: <MapPin className="h-5 w-5" />, label: "Distanz", value: "50–130 km" },
            { icon: <Sun className="h-5 w-5" />, label: "Sonnentage", value: "240+/Jahr" },
            { icon: <Clock className="h-5 w-5" />, label: "Saison", value: "Feb–Nov" },
          ]}
        />

        <BlogTableOfContents
          sections={[
            { id: "warum-istrien", label: "Warum Rennradfahrer Istrien lieben" },
            { id: "routen", label: "Top 4 Routen ab Kaštelir" },
            { id: "klettern", label: "Anstiege & Kategorien" },
            { id: "wind", label: "Windmuster & beste Tageszeit" },
            { id: "events", label: "Rennrad-Events" },
            { id: "gruppen", label: "Gruppenfahrten & Clubs" },
            { id: "verleih", label: "Rennrad-Verleih" },
            { id: "tipps", label: "Praktische Tipps" },
            { id: "villa", label: "Villa Gloria als Radsport-Quartier" },
            { id: "faq", label: "Häufige Fragen" },
          ]}
        />

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

        <h2 id="warum-istrien">Warum Rennradfahrer Istrien lieben</h2>
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

        <h2 id="routen">Top 4 Rennrad-Routen ab Kaštelir</h2>
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

        <h2 id="klettern">Anstiege & Kategorisierungen</h2>
        <p>
          Die Hügel Istriens sind moderat — keine Alpenpässe, aber genug Herausforderung
          für ein gutes Training. Hier die wichtigsten Anstiege auf unseren Routen:
        </p>

        <BlogComparisonTable
          headers={["Anstieg", "Länge", "Steigung ⌀", "Kat.", "Vergleich"]}
          rows={[
            ["Kaštelir → Motovun", "8,5 km", "5,2%", "Cat 3", "Wie Ventoux-Voralpen"],
            ["Grožnjan Rampe", "3,2 km", "7,8%", "Cat 4", "Kurz aber knackig"],
            ["Limski Kanal Anstieg", "4,1 km", "4,5%", "Cat 4", "Landschaftlich top"],
            ["Gran Fondo Bergwertung", "12 km", "4,8%", "Cat 2", "Einzige Cat 2 in Istrien"],
          ]}
          caption="Die wichtigsten Anstiege auf den Routen ab Kaštelir"
        />

        <h2 id="wind">Windmuster & beste Tageszeit</h2>

        <BlogInfoBox variant="info" title="Bora & Jugo — die Winde Istriens">
          <p>
            <strong>Bora</strong> (Nordost): Kalter, böiger Wind, vor allem im Winter und
            Frühling. Kann an der Küste mit 60-100 km/h blasen. Küstenrouten bei Bora
            vermeiden — im Hinterland ist es geschützter.
          </p>
          <p className="mt-2">
            <strong>Jugo</strong> (Südost): Warmer, feuchter Wind, bringt oft Regen.
            Meistens im Herbst und Frühling. Weniger gefährlich als Bora, aber
            unangenehm bei Gegenwind.
          </p>
          <p className="mt-2">
            <strong>Beste Strategie:</strong> Morgens starten (6-7 Uhr im Sommer) —
            wenig Wind, kühlere Temperaturen, weniger Verkehr. An der Küste: im
            Uhrzeigersinn fahren, dann ist der Wind nachmittags Rückenwind.
          </p>
        </BlogInfoBox>

        <h2 id="events">Rennrad-Events in Istrien</h2>
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

        <h2 id="gruppen">Gruppenfahrten & Radsport-Clubs</h2>

        <BlogFeatureCard
          features={[
            {
              icon: <Users className="h-5 w-5" />,
              title: "Sonntagsrunde Poreč",
              description:
                "Lokale Rennradfahrer treffen sich sonntags um 8 Uhr am Hafen Poreč. Tempo: 28-32 km/h, ca. 80 km. Auch Gäste willkommen — einfach dazugesellen.",
            },
            {
              icon: <Users className="h-5 w-5" />,
              title: "Cycling Club Poreč",
              description:
                "Organisierter Verein mit regelmäßigen Ausfahrten (Mi + Sa). Kontakt über Facebook-Gruppe 'Cycling Poreč'. Auch Trainingslager-Betreuung.",
            },
            {
              icon: <Users className="h-5 w-5" />,
              title: "Pro-Teams in Istrien",
              description:
                "Mehrere World-Tour-Teams nutzen Istrien als Frühjahrs-Trainingslager (Februar–März). Die Straßen um Motovun und Grožnjan sind beliebte Trainingsstrecken.",
            },
          ]}
        />

        <h2 id="verleih">Rennrad-Verleih in der Nähe</h2>

        <BlogFeatureCard
          features={[
            {
              icon: <Wrench className="h-5 w-5" />,
              title: "Biking Istria, Poreč",
              description:
                "Carbon-Rennräder (Cube, Giant) ab 40 €/Tag. Pedal-Adapter für SPD/Look. Sattel-Anpassung inklusive. Lieferung zur Villa möglich. Reservierung empfohlen.",
            },
            {
              icon: <Wrench className="h-5 w-5" />,
              title: "Rad-Transport von zu Hause",
              description:
                "Mit dem Auto: Dachgepäckträger oder Heckträger. Die Anfahrt ab München/Wien ist ca. 5-7 Stunden. Flugzeug: Eurowings, Ryanair erlauben Fahrräder als Sondergepäck (30-60 € pro Strecke). Nächster Flughafen: Pula (45 Min.).",
            },
          ]}
        />

        <h2 id="tipps">Praktische Tipps für Rennradfahrer</h2>
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

        <BlogSeasonalTip
          highlights={[
            { months: [3, 4, 5, 10], label: "Perfekt fürs Rennrad", color: "best" },
            { months: [6, 9, 11], label: "Gut möglich", color: "good" },
            { months: [7, 8], label: "Heiß — nur morgens", color: "ok" },
            { months: [2], label: "Kalt aber machbar", color: "ok" },
            { months: [12, 1], label: "Winterpause", color: "avoid" },
          ]}
        />

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

        <h2 id="villa">Villa Gloria — Ihr Radsport-Quartier in Istrien</h2>
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
          Lieber auf dem Trail? Lesen Sie unseren{" "}
          <Link href="/blog/mountainbike-istrien" className="text-terracotta-500">
            Mountainbike-Guide für Istrien
          </Link>
          . Nach der Tour eine Weinprobe:{" "}
          <Link href="/blog/weinurlaub-istrien" className="text-terracotta-500">
            Weinurlaub in Istrien
          </Link>
          .
        </p>

        <p>
          Planen Sie Ihren Rennrad-Urlaub in Istrien und prüfen Sie die{" "}
          <Link href="/buchen" className="text-terracotta-500">
            Verfügbarkeit der Villa Gloria
          </Link>
          . Ob Solo-Trainingslager oder Gruppenreise mit Freunden — die Villa
          bietet Platz für bis zu 10 Personen und die perfekte Infrastruktur
          für Radsportler.
        </p>

        <h2 id="faq">Häufige Fragen</h2>

        <BlogFAQ
          schemaId="rennrad"
          faqs={[
            {
              question: "Welche Übersetzung brauche ich für Istrien?",
              answer:
                "Eine Kompaktkurbel (50/34) mit einer 11-32er Kassette reicht für alle Anstiege in Istrien. Die steilsten Rampen haben 8-9% — kein Alpenniveau. Wer es sportlicher mag: 52/36 mit 11-28 funktioniert auch, ist aber auf der Motovun-Rampe anspruchsvoll.",
            },
            {
              question: "Gibt es Rennrad-Verleih in Poreč?",
              answer:
                "Ja, Biking Istria in Poreč verleiht Carbon-Rennräder ab 40 €/Tag (Cube, Giant). Pedal-Adapter für SPD und Look verfügbar. Sattel-Anpassung inklusive. Lieferung zur Villa Gloria möglich. In der Hochsaison 1 Woche vorher reservieren.",
            },
            {
              question: "Wann ist die beste Saison für Rennrad in Istrien?",
              answer:
                "März bis Mai und September bis Oktober sind ideal: 18-25 °C, wenig Wind, kaum Touristen-Verkehr. Im Sommer (Juli/August) wird es bis 35 °C heiß — dann nur morgens vor 10 Uhr fahren. Februar ist für Hartgesottene: 8-12 °C, aber die Straßen sind leer.",
            },
            {
              question: "Kann ich mein Rad sicher in der Villa abstellen?",
              answer:
                "Ja, die Villa Gloria hat eine überdachte Terrasse und einen abschließbaren Abstellraum. Ihr Rennrad ist sicher untergebracht. Werkzeug für kleine Reparaturen (Pumpe, Reifenheber, Multitool) können wir auf Anfrage bereitstellen.",
            },
          ]}
        />
      </BlogArticle>
    </>
  );
}
