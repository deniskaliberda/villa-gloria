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

export default async function HundeurlaubPage({ params }: Props) {
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
          Kroatien ist eines der beliebtesten Reiseziele für Hundebesitzer in
          Europa — und Istrien ganz besonders. Die Halbinsel im Norden Kroatiens
          bietet weitläufige Natur, hundefreundliche Strände und eine entspannte
          Atmosphäre, die den Urlaub mit Vierbeiner zum Genuss macht. In diesem
          Artikel erfahren Sie alles, was Sie für Ihren Hundeurlaub in Istrien
          wissen müssen.
        </p>

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

        <h2>Einreisebestimmungen für Hunde nach Kroatien</h2>
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

        <h2>Hundefreundliche Strände in Istrien</h2>
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

        <h2>Ferienhaus statt Hotel — warum es mit Hund besser ist</h2>
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

        <h2>
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

        <h2>Tierärzte in der Nähe</h2>
        <p>
          Für den Notfall oder eine Routineuntersuchung finden Sie in der Nähe
          kompetente Tierärzte:
        </p>

        <BlogInfoBox variant="info" title="Tierärztliche Versorgung vor Ort">
          <ul className="mt-2 list-none space-y-2 p-0">
            <li>
              <strong>Veterinarska ambulanta Poreč</strong> — Ca. 10 km
              entfernt. Modernes Equipment und englischsprachiges Personal.
            </li>
            <li>
              <strong>Veterinarska stanica Pazin</strong> — Ca. 25 km, dafür
              mit 24-Stunden-Notdienst und chirurgischer Abteilung.
            </li>
            <li>
              <strong>Apotheken</strong> — Grundlegende Tiermedikamente
              (Zeckenschutz, Durchfallmittel) in Poreč und Kaštelir erhältlich.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Tipp:</strong> Packen Sie die Telefonnummer des lokalen
            Tierarztes ins Handy, bevor Sie ankommen. Wir senden Ihnen auf
            Anfrage gerne eine Liste mit allen wichtigen Nummern.
          </p>
        </BlogInfoBox>

        <h2>Packliste für den Hundeurlaub</h2>
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
