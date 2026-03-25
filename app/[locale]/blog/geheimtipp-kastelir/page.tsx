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
import { BlogComparisonTable } from "@/components/blog/BlogComparisonTable";
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
  Landmark,
  Users,
  Calendar,
  Bus,
  Snowflake,
  Camera,
  Route as RouteIcon,
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
  const t = await getTranslations({ locale, namespace: "meta.blogKastelir" });
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

export default async function GeheimtippPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta.blogKastelir" });
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

        <BlogQuickFacts
          facts={[
            { icon: <Users className="h-5 w-5" />, label: "Einwohner", value: "~1.500" },
            { icon: <MapPin className="h-5 w-5" />, label: "nach Poreč", value: "10 Min." },
            { icon: <MapPin className="h-5 w-5" />, label: "nach Rovinj", value: "15 Min." },
            { icon: <MapPin className="h-5 w-5" />, label: "zur Autobahn", value: "5 Min." },
          ]}
        />

        <BlogTableOfContents
          sections={[
            { id: "authentisch", label: "Authentisches Istrien" },
            { id: "geschichte", label: "Geschichte von Kaštelir" },
            { id: "konobas", label: "Restaurants & Konobas" },
            { id: "olivenoel", label: "Olivenöl vom Erzeuger" },
            { id: "lage", label: "Perfekte Lage" },
            { id: "vergleich", label: "Kaštelir vs. Rovinj vs. Poreč" },
            { id: "hidden-spots", label: "Hidden Spots & Foto-Tipps" },
            { id: "spazierwege", label: "Spazierwege" },
            { id: "events", label: "Lokale Events & Märkte" },
            { id: "villa", label: "Villa Gloria in Kaštelir" },
            { id: "faq", label: "Häufige Fragen" },
          ]}
        />

        <p>
          Für Radfahrer ist Kaštelir ein perfekter Ausgangspunkt — lesen Sie unsere Guides zum{" "}
          <Link href="/blog/mountainbike-istrien" className="text-terracotta-500">
            Mountainbiken in Istrien
          </Link>
          {" "}und{" "}
          <Link href="/blog/rennrad-istrien" className="text-terracotta-500">
            Rennradfahren in Istrien
          </Link>
          . Weinliebhaber finden alles Wissenswerte im{" "}
          <Link href="/blog/weinurlaub-istrien" className="text-terracotta-500">
            Weinurlaub-Guide
          </Link>
          .
        </p>

        <h2 id="authentisch">Kaštelir: Das authentische Istrien abseits der Touristenmassen</h2>
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

        <h2 id="geschichte">Die Geschichte von Kaštelir</h2>
        <p>
          Der Name Kaštelir leitet sich vom lateinischen <em>castellum</em> ab —
          eine befestigte Siedlung auf einem Hügel. Und genau das war Kaštelir:
          eine vorgeschichtliche Höhensiedlung, die seit der Bronzezeit (ca. 1500
          v. Chr.) bewohnt ist.
        </p>
        <p>
          Die strategische Lage auf 200 m Höhe bot Schutz und Überblick über die
          Küste — noch heute sieht man an klaren Tagen bis nach Venedig. Im
          Mittelalter gehörte Kaštelir zur Patriarchat von Aquileia, später zur
          Republik Venedig. Die typisch istrischen Steinhäuser, die das Dorfbild
          prägen, stammen aus dem 16.–18. Jahrhundert.
        </p>

        <BlogInfoBox variant="info" title="Wussten Sie?">
          <p>
            In der Umgebung von Kaštelir wurden archäologische Funde aus der
            Römerzeit ausgegraben — darunter Reste einer Villa Rustica (römisches
            Landgut). Einige Fundstücke sind im Archäologischen Museum in Pula
            ausgestellt.
          </p>
        </BlogInfoBox>

        <h2 id="konobas">Lokale Restaurants &amp; Konobas</h2>
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
                "Direkt in Kaštelir. Fuži mit Trüffel (18 €), gegrilltes Lamm (15 €). Große Steinterrasse. Reservierung im Sommer nötig. Mo geschlossen.",
            },
            {
              icon: <UtensilsCrossed className="h-5 w-5" />,
              title: "Konoba Astarea",
              description:
                "Berühmt für Maneštra (istrischer Eintopf, 10 €) und Pršut-Platte (12 €). Weinkarte mit über 50 istrischen Weinen. Mi geschlossen.",
            },
            {
              icon: <UtensilsCrossed className="h-5 w-5" />,
              title: "Taverna Danijela",
              description:
                "Frischer Fisch täglich — je nach Fang 14-22 €. Hausgemachte Gnocchi (11 €). Romantische Innenhof-Terrasse. Kein Ruhetag in der Saison.",
            },
            {
              icon: <UtensilsCrossed className="h-5 w-5" />,
              title: "Konoba Daniela, Labinci",
              description:
                "Rustikales Ambiente zwischen Olivenbäumen. Grillspezialitäten (12-16 €). Lokaler Malvazija vom Fass (3 €/Glas). Do geschlossen.",
            },
          ]}
        />

        <p>
          <strong>Tipp:</strong> Reservieren Sie in der Hochsaison (Juli/August)
          immer einen Tag vorher. Die besten Konobas haben oft nur 20-30
          Sitzplätze.
        </p>

        <h2 id="olivenoel">Olivenöl direkt vom Erzeuger</h2>
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

        <h2 id="lage">Perfekte Lage: 10 Min. Poreč, 15 Min. Rovinj, 5 Min. Autobahn</h2>
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

        <h2 id="vergleich">Kaštelir vs. Rovinj vs. Poreč — ehrlicher Vergleich</h2>
        <p>
          Warum Kaštelir und nicht die bekannteren Küstenstädte? Hier ein direkter
          Vergleich:
        </p>

        <BlogComparisonTable
          headers={["Kriterium", "Kaštelir", "Rovinj", "Poreč"]}
          highlightColumn={1}
          rows={[
            ["Touristenmassen", "Kaum Touristen", "Sehr voll (Sommer)", "Voll (Sommer)"],
            ["Parkplatzsuche", "Kein Problem", "30+ Min. im Sommer", "15-20 Min."],
            ["Restaurantpreise", "10-18 € (Hauptgericht)", "15-30 €", "12-25 €"],
            ["Authentizität", "Echtes Dorfleben", "Touristisch geprägt", "Mix aus beidem"],
            ["Strand-Entfernung", "8 km (10 Min.)", "Direkt am Wasser", "Direkt am Wasser"],
            ["Nachtleben", "Ruhig (Konobas)", "Bars & Clubs", "Bars & Promenade"],
            ["Für Familien", "Sehr gut (Ruhe)", "Gut (aber laut)", "Gut (Infrastruktur)"],
            ["Für Ruhesuchende", "Perfekt", "Nur in Nebensaison", "Bedingt"],
          ]}
        />

        <p>
          <strong>Fazit:</strong> Kaštelir ist ideal für alle, die Ruhe, Authentizität
          und günstige Preise suchen — und trotzdem in 10-15 Minuten an der Küste
          sein wollen. Es ist das Beste aus beiden Welten.
        </p>

        <h2 id="hidden-spots">Hidden Spots &amp; Foto-Tipps</h2>
        <p>
          Die schönsten Ecken von Kaštelir und Umgebung, die kaum ein Tourist kennt:
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <Camera className="h-5 w-5" />,
              title: "Sonnenuntergang am Dorfrand",
              description:
                "Am westlichen Ortsrand von Kaštelir (Richtung Labinci) gibt es eine kleine Anhöhe mit Bank. Von hier sieht man den Sonnenuntergang über dem Meer. Bestes Licht: 30 Min. vor Sonnenuntergang.",
            },
            {
              icon: <Camera className="h-5 w-5" />,
              title: "Alte Steinkirche Sv. Duh",
              description:
                "Die mittelalterliche Kapelle Sv. Duh (Heiliger Geist) liegt 1 km außerhalb des Dorfes zwischen Olivenhainen. Perfektes Fotomotiv, besonders im Morgenlicht.",
            },
            {
              icon: <Camera className="h-5 w-5" />,
              title: "Parenzana-Tunnel",
              description:
                "Der alte Eisenbahntunnel der Parenzana (1902-1935) bei Kaštelir ist ein atmosphärischer Spot. Taschenlampe mitnehmen! Ca. 2 km vom Dorfzentrum auf dem Parenzana-Wanderweg.",
            },
            {
              icon: <Camera className="h-5 w-5" />,
              title: "Olivenhain-Panorama",
              description:
                "Der Weg Richtung Labinci führt durch uralte Olivenhaine mit Bäumen, die bis zu 500 Jahre alt sind. An klaren Tagen sieht man die slowenischen Alpen im Hintergrund.",
            },
          ]}
        />

        <h2 id="spazierwege">Spazierwege rund um Kaštelir</h2>

        <BlogFeatureCard
          features={[
            {
              icon: <RouteIcon className="h-5 w-5" />,
              title: "Dorf-Rundgang (20 Min.)",
              description:
                "Durch die Steingassen des Dorfkerns, vorbei an der Kirche Sv. Stjepan und den alten Zisternen. Flach, auch für Kinderwagen geeignet.",
            },
            {
              icon: <RouteIcon className="h-5 w-5" />,
              title: "Olivenhain-Wanderung (45 Min.)",
              description:
                "Ab Dorfrand Richtung Westen durch die Olivenhaine. Teilweise unbefestigt. Herrliche Ausblicke auf die Küste. Wasser mitnehmen.",
            },
            {
              icon: <RouteIcon className="h-5 w-5" />,
              title: "Parenzana-Abschnitt (60-90 Min.)",
              description:
                "Auf der ehemaligen Bahntrasse Richtung Poreč. Flach und breit — ideal für Familien und Radfahrer. Geht durch Tunnel und über historische Brücken.",
            },
          ]}
        />

        <h2 id="events">Lokale Events &amp; Wochenmärkte</h2>

        <BlogFeatureCard
          features={[
            {
              icon: <Calendar className="h-5 w-5" />,
              title: "Wochenmarkt Poreč",
              description:
                "Jeden Dienstag und Samstag. Frisches Gemüse, Käse, Honig, Olivenöl und Lavendel direkt vom Erzeuger. In der Markthalle und auf dem Vorplatz. 7-13 Uhr.",
            },
            {
              icon: <Calendar className="h-5 w-5" />,
              title: "Olivenöl-Festival (November)",
              description:
                "Das 'Festa dell'Olio' in Kaštelir feiert die neue Olivenöl-Ernte. Verkostungen, Musik und lokale Spezialitäten. Termin variiert — meist erstes November-Wochenende.",
            },
            {
              icon: <Calendar className="h-5 w-5" />,
              title: "Weinfest Vinistra (Mai)",
              description:
                "Die größte Weinmesse Kroatiens in Poreč (15 Min. entfernt). Über 700 Weine aus ganz Kroatien. Tickets ab 15 €. Tipp: Am Freitag ist es weniger voll.",
            },
            {
              icon: <Calendar className="h-5 w-5" />,
              title: "Fischerfest Vrsar (August)",
              description:
                "Das traditionelle Fischerfest im nahen Vrsar (20 Min.) mit frisch gegrilltem Fisch, Live-Musik und Feuerwerk. Kostenloser Eintritt.",
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

        <h2 id="villa">Villa Gloria: Ihr Zuhause in Kaštelir</h2>
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

        <BlogFAQ
          schemaId="kastelir"
          faqs={[
            {
              question: "Gibt es in Kaštelir einen Supermarkt?",
              answer:
                "Ja, es gibt einen Konzum Mini-Markt (700 m vom Dorfzentrum). Für einen größeren Einkauf fahren Sie zum Plodine in Poreč (15 Min.). Der Konzum hat Mo-Sa 7-20 Uhr und So 8-13 Uhr geöffnet.",
            },
            {
              question: "Wie kommt man ohne Auto nach Poreč?",
              answer:
                "Es gibt eine Buslinie Pazin–Poreč, die durch Kaštelir fährt (ca. 3-4 Mal täglich). Die Fahrt dauert 20 Minuten und kostet ca. 3 €. Allerdings ist ein Mietwagen in Istrien sehr empfehlenswert — die öffentlichen Verbindungen sind begrenzt.",
            },
            {
              question: "Ist Kaštelir auch im Winter interessant?",
              answer:
                "Ja, besonders für Ruhesuchende und Feinschmecker. Die Trüffelsaison ist von Oktober bis Dezember. Die Olivenöl-Ernte findet im November statt. Im Winter sind kaum Touristen da, die Konobas haben aber geöffnet. Temperaturen: 5-12 °C, selten Frost.",
            },
            {
              question: "Woher kommt der Name Kaštelir?",
              answer:
                "Der Name leitet sich vom lateinischen 'castellum' ab, was 'kleine Festung' oder 'befestigte Siedlung' bedeutet. Kaštelir war seit der Bronzezeit (ca. 1500 v. Chr.) eine Höhensiedlung — die strategische Lage auf 200 m Höhe bot Schutz und Überblick über die Küste.",
            },
          ]}
        />
      </BlogArticle>
    </>
  );
}
