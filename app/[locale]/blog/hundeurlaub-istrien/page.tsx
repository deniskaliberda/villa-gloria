import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

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

        <h2>Einreisebestimmungen für Hunde nach Kroatien</h2>
        <p>
          Kroatien ist EU-Mitglied, was die Einreise mit Hund deutlich
          vereinfacht. Folgende Dokumente und Voraussetzungen benötigen Sie:
        </p>
        <ul>
          <li>
            <strong>EU-Heimtierausweis</strong> — Das blaue Dokument ist
            Pflicht. Es enthält alle Impfungen und die Chipnummer Ihres Hundes.
            Den Ausweis stellt Ihr Tierarzt aus.
          </li>
          <li>
            <strong>Mikrochip</strong> — Ihr Hund muss mit einem
            ISO-Mikrochip (15-stellig) gekennzeichnet sein. Ohne Chip keine
            Einreise.
          </li>
          <li>
            <strong>Tollwutimpfung</strong> — Die Impfung muss mindestens 21
            Tage vor der Einreise erfolgt sein. Eine jährliche Auffrischung wird
            empfohlen.
          </li>
          <li>
            <strong>Keine Quarantäne</strong> — Mit gültigen Dokumenten
            gibt es keine Wartezeit an der Grenze. Die Einreise über Slowenien
            ist unkompliziert.
          </li>
        </ul>
        <p>
          <strong>Tipp:</strong> Lassen Sie die Dokumente 4-6 Wochen vor der
          Reise vom Tierarzt prüfen. So bleibt genug Zeit, falls eine Impfung
          aufgefrischt werden muss.
        </p>

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
        <ul>
          <li>
            <strong>Eigener Garten</strong> — Ihr Hund kann frei laufen, spielen
            und sich entspannen, ohne andere Gäste zu stören.
          </li>
          <li>
            <strong>Keine Leinenpflicht auf dem Grundstück</strong> — Im
            eingezäunten Garten darf Ihr Hund ohne Leine toben.
          </li>
          <li>
            <strong>Eigene Tagesstruktur</strong> — Fütterungszeiten,
            Spaziergänge und Ruhephasen bestimmen Sie selbst.
          </li>
          <li>
            <strong>Platz für Ausrüstung</strong> — Hundebett, Napf, Spielzeug —
            im Ferienhaus ist genug Raum für alles.
          </li>
        </ul>

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
        <ul>
          <li>
            <strong>1.000 m² komplett eingezäuntes Grundstück</strong> — Ihr
            Hund kann sich frei bewegen, ohne dass Sie sich Sorgen machen
            müssen. Der Zaun ist blickdicht und ausreichend hoch.
          </li>
          <li>
            <strong>Großer Garten mit Rasenfläche</strong> — Perfekt zum
            Spielen, Rennen und Entspannen. Mit Volleyball- und Badmintonfeld
            haben auch die Zweibeiner ihren Spaß.
          </li>
          <li>
            <strong>Überdachter Grillplatz</strong> — Abendessen im Freien,
            während der Hund im Garten liegt — was gibt es Schöneres?
          </li>
          <li>
            <strong>Pool (12×8 m)</strong> — Viele Hunde lieben Wasser. Der
            große Pool bietet Abkühlung für die ganze Familie.
          </li>
          <li>
            <strong>Ruhige Lage</strong> — Kaštelir ist kein Touristenhotspot.
            Spaziergänge durch Olivenhaine und Weinberge beginnen direkt vor der
            Haustür.
          </li>
          <li>
            <strong>Haustiergebühr: nur 50 €</strong> — Keine versteckten Kosten.
            Pauschal für den gesamten Aufenthalt.
          </li>
        </ul>

        <h2>Tierärzte in der Nähe</h2>
        <p>
          Für den Notfall oder eine Routineuntersuchung finden Sie in der Nähe
          kompetente Tierärzte:
        </p>
        <ul>
          <li>
            <strong>Veterinarska ambulanta Poreč</strong> — In Poreč, ca.
            10 km von der Villa entfernt. Modernes Equipment und
            englischsprachiges Personal.
          </li>
          <li>
            <strong>Veterinarska stanica Pazin</strong> — Etwas weiter
            (ca. 25 km), dafür mit 24-Stunden-Notdienst und chirurgischer
            Abteilung.
          </li>
          <li>
            <strong>Apotheken</strong> — Grundlegende Tiermedikamente
            (Zeckenschutz, Durchfallmittel) sind in Apotheken in Poreč und
            Kaštelir erhältlich.
          </li>
        </ul>
        <p>
          <strong>Tipp:</strong> Packen Sie die Telefonnummer des lokalen
          Tierarztes ins Handy, bevor Sie ankommen. Wir senden Ihnen auf
          Anfrage gerne eine Liste mit allen wichtigen Nummern.
        </p>

        <h2>Packliste für den Hundeurlaub</h2>
        <p>
          Damit Sie nichts vergessen, hier unsere bewährte Packliste für den
          Urlaub mit Hund in Kroatien:
        </p>
        <ul>
          <li>EU-Heimtierausweis mit gültiger Tollwutimpfung</li>
          <li>Leine und Halsband/Geschirr (Maulkorb für öffentliche Verkehrsmittel)</li>
          <li>Futter für die gesamte Reisedauer (gewohntes Futter!)</li>
          <li>Wassernapf und Trinkflasche für unterwegs</li>
          <li>Hundebett oder Decke (vertrauter Geruch beruhigt)</li>
          <li>Zeckenschutz und Sonnenschutz für empfindliche Nasen</li>
          <li>Kotbeutel</li>
          <li>Erste-Hilfe-Set für Hunde</li>
          <li>Lieblingsspielzeug</li>
          <li>Handtuch zum Abtrocknen nach dem Schwimmen</li>
        </ul>
        <p>
          Istrien ist ein Paradies für Hundebesitzer — und die Villa Gloria al
          Padre der ideale Ausgangspunkt. Eingezäuntes Grundstück, ruhige Lage
          und Strände in der Nähe: Ihr Hund wird den Urlaub genauso genießen
          wie Sie. Schauen Sie sich die{" "}
          <Link href="/buchen" className="text-terracotta-500">
            Verfügbarkeit
          </Link>{" "}
          an und planen Sie Ihren Hundeurlaub in Istrien.
        </p>
      </BlogArticle>
    </>
  );
}
