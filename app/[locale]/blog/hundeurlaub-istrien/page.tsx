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
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import {
  FileText,
  Cpu,
  Shield,
  CheckCircle,
  Trees,
  Unlock,
  Clock,
  Package,
  Fence,
  Flower2,
  UtensilsCrossed,
  Waves,
  MapPin,
  BadgeEuro,
  Dog,
  Thermometer,
  Phone,
  Route,
  Coffee,
} from "lucide-react";

const SLUG = "hundeurlaub-istrien";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.blogHundeurlaub" });
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

export default async function HundeurlaubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta.blogHundeurlaub" });
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
    author: {
      "@type": "Organization",
      name: "Villa Gloria al Padre",
    },
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
        <p className="text-xl leading-relaxed">
          Kroatien ist eines der beliebtesten Reiseziele für Hundebesitzer in
          Europa — und Istrien ganz besonders. Die Halbinsel im Norden Kroatiens
          bietet weitläufige Natur, hundefreundliche Strände und eine entspannte
          Atmosphäre, die den Urlaub mit Vierbeiner zum Genuss macht. In diesem
          Artikel erfahren Sie alles, was Sie für Ihren Hundeurlaub in Istrien
          wissen müssen.
        </p>

        <p>
          Sie reisen als Familie? Lesen Sie auch unseren Artikel zum{" "}
          <Link href="/blog/familienurlaub-istrien" className="text-terracotta-500">
            Familienurlaub in Istrien
          </Link>
          . Und für die perfekte Lage abseits der Massen:{" "}
          <Link href="/blog/geheimtipp-kastelir" className="text-terracotta-500">
            Geheimtipp Kaštelir
          </Link>
          .
        </p>

        <BlogQuickFacts
          facts={[
            { icon: <Dog className="h-5 w-5" />, label: "Hundestrände", value: "4+" },
            { icon: <BadgeEuro className="h-5 w-5" />, label: "Haustiergebühr", value: "50 €" },
            { icon: <FileText className="h-5 w-5" />, label: "Einreise", value: "EU-Pass" },
            { icon: <Fence className="h-5 w-5" />, label: "Garten", value: "1.000 m²" },
          ]}
        />

        <BlogImageGrid
          images={[
            {
              src: "/images/blog/hundeurlaub-1.webp",
              alt: "Hund am Kiesstrand in Kroatien",
              caption: "Kristallklares Wasser und hundefreundliche Strände",
            },
            {
              src: "/images/blog/hundeurlaub-2.webp",
              alt: "Hund im eingezäunten Garten mit Pool",
              caption: "Eingezäuntes Grundstück — sicherer Auslauf für Ihren Vierbeiner",
            },
          ]}
        />

        <BlogTableOfContents
          sections={[
            { id: "einreise", label: "Einreisebestimmungen" },
            { id: "straende", label: "Hundefreundliche Strände" },
            { id: "ferienhaus", label: "Ferienhaus statt Hotel" },
            { id: "villa", label: "Villa Gloria für Vierbeiner" },
            { id: "restaurants", label: "Hundefreundliche Restaurants" },
            { id: "spazierwege", label: "Spazierwege ab Villa Gloria" },
            { id: "tieraerzte", label: "Tierärzte & Notfallnummern" },
            { id: "reisezeit", label: "Beste Reisezeit mit Hund" },
            { id: "packliste", label: "Packliste" },
            { id: "faq", label: "Häufige Fragen" },
          ]}
        />

        <h2 id="einreise">Einreisebestimmungen für Hunde nach Kroatien</h2>
        <p>
          Kroatien ist EU-Mitglied, was die Einreise mit Hund deutlich
          vereinfacht. Folgende Dokumente und Voraussetzungen benötigen Sie:
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <FileText className="h-5 w-5" />,
              title: "EU-Heimtierausweis",
              description:
                "Das blaue Dokument ist Pflicht. Es enthält alle Impfungen und die Chipnummer Ihres Hundes. Den Ausweis stellt Ihr Tierarzt aus.",
            },
            {
              icon: <Cpu className="h-5 w-5" />,
              title: "Mikrochip",
              description:
                "Ihr Hund muss mit einem ISO-Mikrochip (15-stellig) gekennzeichnet sein. Ohne Chip keine Einreise.",
            },
            {
              icon: <Shield className="h-5 w-5" />,
              title: "Tollwutimpfung",
              description:
                "Die Impfung muss mindestens 21 Tage vor der Einreise erfolgt sein. Eine jährliche Auffrischung wird empfohlen.",
            },
            {
              icon: <CheckCircle className="h-5 w-5" />,
              title: "Keine Quarantäne",
              description:
                "Mit gültigen Dokumenten gibt es keine Wartezeit an der Grenze. Die Einreise über Slowenien ist unkompliziert.",
            },
          ]}
        />

        <BlogInfoBox variant="tip" title="Tipp: Rechtzeitig vorbereiten">
          <p>
            Lassen Sie die Dokumente 4-6 Wochen vor der Reise vom Tierarzt
            prüfen. So bleibt genug Zeit, falls eine Impfung aufgefrischt werden
            muss.
          </p>
        </BlogInfoBox>

        <h2 id="straende">Hundefreundliche Strände in Istrien</h2>
        <p>
          Istrien hat in den letzten Jahren zahlreiche offizielle Hundestrände
          eingerichtet. Hier sind die besten in der Nähe der{" "}
          <Link href="/umgebung" className="text-terracotta-500">
            Villa Gloria
          </Link>
          :
        </p>
        <ul>
          <li>
            <strong>Bijeca, Medulin</strong> — Einer der bekanntesten
            Hundestrände Istriens. Flacher Einstieg, Kieselstrand, und genügend
            Platz auch in der Hochsaison. Schattenplätze unter Bäumen
            vorhanden.
          </li>
          <li>
            <strong>Hundestrand Poreč (Lanterna)</strong> — Nur 15 Minuten von
            Kaštelir entfernt. Ein offiziell ausgewiesener Bereich mit
            Kieselgrund und klarem Wasser. Ideal für einen Tagesausflug.
          </li>
        </ul>

        <BlogImageGrid
          columns={1}
          images={[
            {
              src: "/images/blog/hundeurlaub-1.webp",
              alt: "Golden Retriever am kroatischen Strand",
              caption:
                "Die istrische Küste bietet zahlreiche hundefreundliche Strände",
            },
          ]}
        />

        <ul>
          <li>
            <strong>Crveni Otok, Rovinj</strong> — Die Strände auf der Roten
            Insel sind teilweise für Hunde freigegeben. Die Überfahrt mit der
            Fähre (Hunde erlaubt) dauert nur 15 Minuten.
          </li>
          <li>
            <strong>Strand Škaraba, Vrsar</strong> — Ein naturbelassener
            Hundestrand in einer ruhigen Bucht. Weniger besucht und daher
            perfekt für Hunde, die es ruhiger mögen.
          </li>
        </ul>
        <p>
          <strong>Wichtig:</strong> An den meisten regulären Stränden in
          Kroatien sind Hunde von Juni bis September nicht erlaubt. Nutzen Sie
          die ausgewiesenen Hundestrände — dort ist Ihr Vierbeiner jederzeit
          willkommen.
        </p>

        <h2 id="ferienhaus">Ferienhaus statt Hotel — warum es mit Hund besser ist</h2>
        <p>
          Hotels erlauben Hunde oft nur gegen hohe Aufpreise, mit
          Einschränkungen bei Größe und Gewicht. Ein{" "}
          <Link href="/das-haus" className="text-terracotta-500">
            Ferienhaus in Istrien
          </Link>{" "}
          bietet dagegen entscheidende Vorteile:
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <Trees className="h-5 w-5" />,
              title: "Eigener Garten",
              description:
                "Ihr Hund kann frei laufen, spielen und sich entspannen, ohne andere Gäste zu stören.",
            },
            {
              icon: <Unlock className="h-5 w-5" />,
              title: "Keine Leinenpflicht auf dem Grundstück",
              description:
                "Im eingezäunten Garten darf Ihr Hund ohne Leine toben.",
            },
            {
              icon: <Clock className="h-5 w-5" />,
              title: "Eigene Tagesstruktur",
              description:
                "Fütterungszeiten, Spaziergänge und Ruhephasen bestimmen Sie selbst.",
            },
            {
              icon: <Package className="h-5 w-5" />,
              title: "Platz für Ausrüstung",
              description:
                "Hundebett, Napf, Spielzeug — im Ferienhaus ist genug Raum für alles.",
            },
          ]}
        />

        <h2 id="villa">
          Villa Gloria: Eingezäuntes Grundstück, großer Garten, Pool — perfekt
          für Vierbeiner
        </h2>
        <p>
          Die{" "}
          <Link href="/das-haus" className="text-terracotta-500">
            Villa Gloria al Padre
          </Link>{" "}
          in Kaštelir wurde mit Blick auf Hundebesitzer konzipiert. Was die Villa
          besonders hundefreundlich macht:
        </p>

        <BlogImageGrid
          images={[
            {
              src: "/images/garden/garten-volleyball.jpg",
              alt: "Weitläufiger Garten der Villa Gloria",
              caption: "1.000 m² eingezäunter Garten — Platz ohne Ende",
            },
            {
              src: "/images/pool/pool-panorama.jpg",
              alt: "Pool-Terrasse der Villa Gloria",
              caption: "Pool und schattige Terrasse zum Entspannen",
            },
          ]}
        />

        <BlogFeatureCard
          columns={3}
          features={[
            {
              icon: <Fence className="h-5 w-5" />,
              title: "1.000 m² eingezäunt",
              description:
                "Ihr Hund kann sich frei bewegen. Der Zaun ist blickdicht und ausreichend hoch.",
            },
            {
              icon: <Flower2 className="h-5 w-5" />,
              title: "Großer Garten",
              description:
                "Perfekt zum Spielen, Rennen und Entspannen. Mit Volleyball- und Badmintonfeld.",
            },
            {
              icon: <UtensilsCrossed className="h-5 w-5" />,
              title: "Überdachter Grillplatz",
              description:
                "Abendessen im Freien, während der Hund im Garten liegt — was gibt es Schöneres?",
            },
            {
              icon: <Waves className="h-5 w-5" />,
              title: "Pool (12x8 m)",
              description:
                "Viele Hunde lieben Wasser. Der große Pool bietet Abkühlung für die ganze Familie.",
            },
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Ruhige Lage",
              description:
                "Spaziergänge durch Olivenhaine und Weinberge beginnen direkt vor der Haustür.",
            },
            {
              icon: <BadgeEuro className="h-5 w-5" />,
              title: "Haustiergebühr: nur 50 €",
              description:
                "Keine versteckten Kosten. Pauschal für den gesamten Aufenthalt.",
            },
          ]}
        />

        <h2 id="restaurants">Hundefreundliche Restaurants in der Nähe</h2>
        <p>
          In Istrien sind Hunde in den meisten Restaurants mit Außenterrasse
          willkommen. Hier unsere Empfehlungen in der Nähe von Kaštelir:
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <Coffee className="h-5 w-5" />,
              title: "Konoba Morgan, Kaštelir",
              description:
                "Authentische istrische Küche mit großer Terrasse im Grünen. Hunde sind herzlich willkommen. Tipp: Fuži mit Trüffel probieren. Hauptgerichte 12-18 €.",
            },
            {
              icon: <Coffee className="h-5 w-5" />,
              title: "Taverna Danijela, bei Poreč",
              description:
                "Familiengeführtes Restaurant mit schattigem Innenhof. Frischer Fisch und Meeresfrüchte. Hunde bekommen oft einen Napf Wasser serviert. 15 Min. Fahrt.",
            },
            {
              icon: <Coffee className="h-5 w-5" />,
              title: "Konoba Daniela, Labinci",
              description:
                "Rustikale Konoba zwischen Olivenbäumen. Ruhige Umgebung — ideal auch für nervöse Hunde. Gegrilltes Fleisch und hausgemachte Pasta. 10 Min. Fahrt.",
            },
            {
              icon: <Coffee className="h-5 w-5" />,
              title: "Restaurant San Rocco, Brtonigla",
              description:
                "Gehobene Küche mit Weinkeller. Hunde auf der Terrasse erlaubt. Weinbegleitung ab 25 € für 4 Gänge. 25 Min. Fahrt, lohnt sich.",
            },
          ]}
        />

        <h2 id="spazierwege">Spazierwege ab Villa Gloria</h2>
        <p>
          Direkt vor der Haustür der Villa Gloria beginnen herrliche Spazierwege
          durch die istrische Landschaft. Hier drei Routen, die wir empfehlen:
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <Route className="h-5 w-5" />,
              title: "Olivenhain-Runde (30 Min.)",
              description:
                "Leichter Rundweg durch die Olivenhaine rund um Kaštelir. Flach, schattig und kaum Verkehr. Perfekt für die Morgen- oder Abendrunde.",
            },
            {
              icon: <Route className="h-5 w-5" />,
              title: "Weinberg-Panorama (60 Min.)",
              description:
                "Mittlere Route über die Hügel mit Blick auf die Küste. Teilweise unbefestigt — gut für aktive Hunde. Wasser mitnehmen!",
            },
            {
              icon: <Route className="h-5 w-5" />,
              title: "Parenzana-Abschnitt (90 Min.)",
              description:
                "Teil der historischen Bahntrasse. Flach und breit (ideal für Begegnungen mit anderen Hunden). Start in Kaštelir, Richtung Poreč. Rückweg auf gleicher Strecke oder Abholung.",
            },
          ]}
        />

        <BlogInfoBox variant="tip" title="Tipp: Morgens und abends laufen">
          <p>
            Im Sommer kann es tagsüber bis 35 °C heiß werden. Planen Sie Spaziergänge
            für den frühen Morgen (vor 9 Uhr) oder den späten Abend (nach 18 Uhr).
            Asphalt kann Hundepfoten verbrennen — testen Sie mit dem Handrücken.
          </p>
        </BlogInfoBox>

        <h2 id="tieraerzte">Tierärzte & Notfallnummern</h2>
        <p>
          Für den Notfall oder eine Routineuntersuchung finden Sie in der Nähe
          kompetente Tierärzte:
        </p>

        <BlogInfoBox variant="info" title="Tierärzte & Notfallnummern">
          <ul className="mt-2 list-none space-y-3 p-0">
            <li>
              <strong>Veterinarska ambulanta Poreč</strong>
              <br />
              Ca. 10 km entfernt. Modernes Equipment und englischsprachiges Personal.
              <br />
              <span className="text-sm">📞 +385 52 431 482 · Mo–Fr 8–16 Uhr · Notdienst nach Anruf</span>
            </li>
            <li>
              <strong>Veterinarska stanica Pazin</strong>
              <br />
              Ca. 25 km, mit 24-Stunden-Notdienst und chirurgischer Abteilung.
              <br />
              <span className="text-sm">📞 +385 52 624 006 · 24/7 Notdienst</span>
            </li>
            <li>
              <strong>Veterinarska ambulanta Rovinj</strong>
              <br />
              Ca. 20 km, kleinere Praxis aber kompetentes Team.
              <br />
              <span className="text-sm">📞 +385 52 811 248 · Mo–Fr 8–15 Uhr</span>
            </li>
          </ul>
          <p className="mt-3 text-sm">
            <strong>Wichtig:</strong> Speichern Sie die Nummern vorab in Ihrem Handy.
            In Kroatien funktioniert der Notruf unter 112 (auch auf Englisch).
            Tiermedikamente (Zeckenschutz, Durchfallmittel) sind in Apotheken in Poreč erhältlich.
          </p>
        </BlogInfoBox>

        <h2 id="reisezeit">Beste Reisezeit für Hundeurlaub in Istrien</h2>
        <p>
          Nicht jede Jahreszeit ist gleich gut für einen Urlaub mit Hund. Die Hitze
          im Hochsommer kann für viele Hunde problematisch werden:
        </p>

        <BlogSeasonalTip
          highlights={[
            { months: [4, 5, 6, 9, 10], label: "Beste Zeit", color: "best" },
            { months: [3, 11], label: "Gut möglich", color: "good" },
            { months: [7, 8], label: "Zu heiß für viele Hunde", color: "avoid" },
            { months: [12, 1, 2], label: "Kühl aber möglich", color: "ok" },
          ]}
        />

        <BlogInfoBox variant="warning" title="Vorsicht im Hochsommer">
          <p>
            Im Juli und August werden Temperaturen von 35 °C und mehr erreicht. Für
            viele Hunderassen (besonders kurznasige wie Mops oder Bulldogge) kann das
            gefährlich werden. Wenn Sie im Sommer reisen: Spaziergänge nur morgens
            und abends, immer Wasser dabei, und die Klimaanlage in der Villa nutzen.
          </p>
        </BlogInfoBox>

        <h2 id="packliste">Packliste für den Hundeurlaub</h2>
        <p>
          Damit Sie nichts vergessen, hier unsere bewährte Packliste für den
          Urlaub mit Hund in Kroatien:
        </p>
        <div className="not-prose my-8 rounded-card bg-sand p-6 md:p-8">
          <h4 className="mb-4 font-display text-lg font-bold text-dark">
            Packliste Hundeurlaub Istrien
          </h4>
          <ul className="grid gap-2 text-dark-light md:grid-cols-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-olive-500" />
              <span>EU-Heimtierausweis mit gültiger Tollwutimpfung</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-olive-500" />
              <span>
                Leine und Halsband/Geschirr (Maulkorb für öffentliche
                Verkehrsmittel)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-olive-500" />
              <span>
                Futter für die gesamte Reisedauer (gewohntes Futter!)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-olive-500" />
              <span>Wassernapf und Trinkflasche für unterwegs</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-olive-500" />
              <span>
                Hundebett oder Decke (vertrauter Geruch beruhigt)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-olive-500" />
              <span>
                Zeckenschutz und Sonnenschutz für empfindliche Nasen
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-olive-500" />
              <span>Kotbeutel</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-olive-500" />
              <span>Erste-Hilfe-Set für Hunde</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-olive-500" />
              <span>Lieblingsspielzeug</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-olive-500" />
              <span>Handtuch zum Abtrocknen nach dem Schwimmen</span>
            </li>
          </ul>
        </div>

        <BlogFAQ
          schemaId="hundeurlaub"
          faqs={[
            {
              question: "Darf mein Hund in den Pool der Villa Gloria?",
              answer:
                "Ja, Hunde dürfen den Pool nutzen. Der Pool hat einen flachen Einstieg an einer Seite. Bitte duschen Sie Ihren Hund danach ab, um Chlor aus dem Fell zu waschen. Ein Handtuch zum Abtrocknen empfehlen wir mitzubringen.",
            },
            {
              question: "Wie hoch ist der Zaun um das Grundstück?",
              answer:
                "Der Zaun um das 1.000 m² große Grundstück ist ca. 1,50 m hoch und durchgehend blickdicht. Auch größere Hunde können nicht darüber springen. Die Eingangstore schließen sicher.",
            },
            {
              question: "Welche Hunderassen dürfen nach Kroatien einreisen?",
              answer:
                "Kroatien hat keine rassenspezifischen Einreiseverbote für Hunde. Alle Rassen dürfen einreisen, solange die EU-Einreisebestimmungen (Mikrochip, Tollwutimpfung, EU-Heimtierausweis) erfüllt sind. An öffentlichen Plätzen müssen große Hunde an der Leine geführt werden.",
            },
            {
              question: "Brauche ich einen Maulkorb in Kroatien?",
              answer:
                "Ein Maulkorb ist in Kroatien nur in öffentlichen Verkehrsmitteln (Bus, Fähre) Pflicht. An Stränden, in Restaurants und auf der Straße besteht keine generelle Maulkorbpflicht. Wir empfehlen trotzdem, einen dabei zu haben — manche Fährgesellschaften bestehen darauf.",
            },
            {
              question: "Gibt es in Kaštelir einen Tierarzt?",
              answer:
                "Direkt in Kaštelir gibt es keinen Tierarzt. Die nächste Praxis ist die Veterinarska ambulanta in Poreč (10 km, 15 Min. Fahrt). Für Notfälle: Die Veterinarska stanica Pazin hat einen 24-Stunden-Notdienst. Alle Nummern finden Sie im Abschnitt 'Tierärzte & Notfallnummern' oben.",
            },
          ]}
        />

        <BlogQuote>
          Istrien ist ein Paradies für Hundebesitzer — und die Villa Gloria al
          Padre der ideale Ausgangspunkt. Eingezäuntes Grundstück, ruhige Lage
          und Strände in der Nähe: Ihr Hund wird den Urlaub genauso genießen
          wie Sie.
        </BlogQuote>

        <p>
          Schauen Sie sich die{" "}
          <Link href="/buchen" className="text-terracotta-500">
            Verfügbarkeit
          </Link>{" "}
          an und planen Sie Ihren Hundeurlaub in Istrien.
        </p>
      </BlogArticle>
    </>
  );
}
