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
import { BlogSeasonalTip } from "@/components/blog/BlogSeasonalTip";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import {
  Wine,
  MapPin,
  UtensilsCrossed,
  Waves,
  Users,
  Calendar,
  Plane,
  GlassWater,
  Grape,
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
  const t = await getTranslations({ locale, namespace: "meta.blogWeinurlaub" });
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

export default async function WeinurlaubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta.blogWeinurlaub" });
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
          Istrien ist nicht nur für seine Küste bekannt — die Halbinsel hat sich
          in den letzten zwei Jahrzehnten zu einer der spannendsten Weinregionen
          Europas entwickelt. Zwischen Olivenhainen und mittelalterlichen
          Bergdörfern produzieren leidenschaftliche Winzer Weine von
          Weltklasse-Niveau. Ein Weinurlaub in Istrien verbindet Genuss, Kultur
          und Erholung auf einzigartige Weise.
        </p>

        <BlogQuickFacts
          facts={[
            { icon: <Wine className="h-5 w-5" />, label: "Weingüter", value: "400+" },
            { icon: <Grape className="h-5 w-5" />, label: "Hauptsorte", value: "Malvazija" },
            { icon: <GlassWater className="h-5 w-5" />, label: "Verkostung ab", value: "15 €" },
            { icon: <MapPin className="h-5 w-5" />, label: "Weinstraße", value: "~30 km" },
          ]}
        />

        <BlogTableOfContents
          sections={[
            { id: "weinregion", label: "Istriens Weinregion Nr. 1" },
            { id: "rebsorten", label: "Malvazija & Teran" },
            { id: "terroir", label: "Terroir — warum Istrien besonders ist" },
            { id: "weingueter", label: "Top 5 Weingüter" },
            { id: "pairing", label: "Food Pairing Guide" },
            { id: "weinstrassen", label: "Istrische Weinstraßen" },
            { id: "festivals", label: "Weinfeste & Events 2026" },
            { id: "olivenoel", label: "Olivenöl & Trüffel" },
            { id: "transport", label: "Wein nach Hause bringen" },
            { id: "villa", label: "Villa Gloria als Weinreise-Basis" },
            { id: "faq", label: "Häufige Fragen" },
          ]}
        />

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

        <h2 id="weinregion">Istrien: Kroatiens Weinregion Nr. 1</h2>
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

        <h2 id="rebsorten">Malvazija &amp; Teran — die Stars der istrischen Weinszene</h2>
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

        <h2 id="terroir">Terroir — warum istrischer Wein besonders ist</h2>
        <p>
          Istrien wird oft mit der Toskana verglichen — und die Parallelen sind
          real: mediterranes Klima, kalkhaltige Böden und eine Weinbautradition,
          die bis in die Römerzeit zurückreicht.
        </p>
        <p>
          Der Schlüssel ist die <em>Terra Rossa</em> — die eisenhaltige rote Erde,
          die dem Teran seine intensive Farbe und dem Malvazija seine mineralische
          Note verleiht. Dazu kommt die Nähe zum Meer (nie mehr als 30 km): die
          salzige Brise und die Temperaturunterschiede zwischen Tag und Nacht
          schaffen ein einzigartiges Aromaprofil.
        </p>
        <p>
          Im Gegensatz zur Toskana ist Istrien noch nicht überlaufen: Weingüter
          haben Zeit für persönliche Führungen, die Preise sind fair, und die
          Atmosphäre ist entspannt statt touristisch.
        </p>

        <h2 id="pairing">Food Pairing — welcher Wein zu welchem Gericht?</h2>
        <p>
          Die istrische Küche und die lokalen Weine sind perfekt aufeinander
          abgestimmt. Hier unsere Empfehlungen:
        </p>

        <BlogComparisonTable
          headers={["Gericht", "Empfohlener Wein", "Warum es passt"]}
          rows={[
            ["Fuži mit Trüffel", "Malvazija (Kozlović)", "Mineralisch-cremig, hebt den Trüffel hervor"],
            ["Pršut (Schinken) & Käse", "Teran (Trapan)", "Kräftig-erdig, schneidet durch das Fett"],
            ["Gegrillter Fisch", "Malvazija (Matošević Alba)", "Frisch-zitrisch, ohne den Fisch zu überdecken"],
            ["Boškarin (Istrisches Rind)", "Teran Riserva", "Vollmundig-tanninreich, hält dem Fleisch stand"],
            ["Maneštra (Eintopf)", "Junger Teran", "Leicht-fruchtig, ergänzt die Gemüsearomen"],
            ["Fritule (Krapfen)", "Muškat Momjanski", "Süß-blumig, klassisches Dessert-Pairing"],
          ]}
          caption="Klassische istrische Pairings — so essen und trinken die Einheimischen"
        />

        <h2 id="weingueter">Top 5 Weingüter in der Nähe von Kaštelir/Poreč</h2>
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
                "Eines der renommiertesten Weingüter Kroatiens. Die Malvazija \u201ESanta Lucia\u201C gehört zu den besten Weißweinen des Landes. Moderne Architektur trifft auf Tradition — Verkostung mit Blick über die Weinberge. Verkostung: 25 € (4 Weine + Kellerführung), Premium 35 € (6 Weine). Reservierung per E-Mail empfohlen. Probieren: Santa Lucia Malvazija, Valle Teran. Geöffnet: Apr–Okt Mo–Sa 10–18 Uhr.",
            },
            {
              icon: <Wine className="h-5 w-5" />,
              title: "Matošević (Krunčići) — ca. 20 Min.",
              description:
                "Ivica Matošević gilt als Pionier der istrischen Weinrevolution. Sein \u201EAlba\u201C Malvazija ist international mehrfach ausgezeichnet. Intime Verkostungen mit persönlicher Beratung. Verkostung: 20 € (3 Weine), Reservierung per Telefon nötig. Probieren: Alba Malvazija, Grimalda Red. Geöffnet: ganzjährig nach Voranmeldung.",
            },
            {
              icon: <Wine className="h-5 w-5" />,
              title: "Degrassi (Savudrija) — ca. 35 Min.",
              description:
                "Weinbau mit atemberaubendem Blick auf die Adria. Bekannt für elegante Malvazija und samtige Merlots. Verkostung direkt am Meer — Sonnenuntergang inklusive. Verkostung: 15 € (3 Weine), ohne Reservierung möglich (Hochsaison: Anruf empfohlen). Probieren: Terre Bianche Malvazija, Merlot Riserva. Geöffnet: Mai–Sep täglich 10–19 Uhr.",
            },
            {
              icon: <Wine className="h-5 w-5" />,
              title: "Trapan (Šišan bei Pula) — ca. 50 Min.",
              description:
                "Eines der modernsten Weingüter Istriens. \u201EPonente\u201C Malvazija und \u201ESyrah\u201C sind Geheimtipps unter Kennern. Architektonisch beeindruckend, mit regionaler Küche. Verkostung: 20 € (4 Weine + Snacks), Reservierung per E-Mail oder Website. Probieren: Ponente Malvazija, Syrah. Geöffnet: Apr–Okt Di–So 11–18 Uhr.",
            },
            {
              icon: <Wine className="h-5 w-5" />,
              title: "Kabola (Momjan) — ca. 30 Min.",
              description:
                "Vorreiter des Naturweins in Kroatien. \u201EAmphora\u201C Malvazija — in Tonamphoren vergoren — ist einzigartig. Ausgezeichnete Verkostungen mit Käse und Olivenöl. Verkostung: 25 € (5 Weine + Käse/Olivenöl), Reservierung per Telefon. Probieren: Amphora Malvazija, Teran. Geöffnet: ganzjährig nach Voranmeldung, Sommer täglich.",
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

        <h2 id="weinstrassen">Istrische Weinstraßen — Routen für Genießer</h2>
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

        <h2 id="festivals">Weinfeste & Events 2026</h2>

        <BlogFeatureCard
          features={[
            {
              icon: <Calendar className="h-5 w-5" />,
              title: "Vinistra — Mai 2026",
              description:
                "Kroatiens größte Weinmesse in Poreč (15 Min. Fahrt). Über 700 Weine zum Probieren. Tickets ab 15 €. Tipp: Freitag-Session ist weniger voll als Samstag.",
            },
            {
              icon: <Calendar className="h-5 w-5" />,
              title: "Malvazija-Tage — Juni 2026",
              description:
                "Feier der Hauptrebsorte Istriens. Mehrere Weingüter bieten spezielle Verkostungen an. Oft mit Live-Musik und lokaler Küche. Termine variieren — bei Weingütern anfragen.",
            },
            {
              icon: <Calendar className="h-5 w-5" />,
              title: "Erntedankfest — September/Oktober 2026",
              description:
                "Die Weinlese (berba) wird in vielen Dörfern gefeiert. In Momjan, Motovun und Grožnjan gibt es Feste mit Weinprobe, Essen und Tanz. Oft kostenloser Eintritt.",
            },
            {
              icon: <Calendar className="h-5 w-5" />,
              title: "Trüffel-Tage Livade — Oktober/November 2026",
              description:
                "Das berühmteste Food-Event Istriens. Trüffelmarkt, Kochshows und natürlich passende Weine. In Livade (45 Min. von Kaštelir). Ein Muss für Feinschmecker.",
            },
          ]}
        />

        <h2 id="olivenoel">
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

        <h2 id="transport">Wein nach Hause transportieren</h2>

        <BlogInfoBox variant="tip" title="So kommt der Wein sicher nach Hause">
          <p>
            <strong>Mit dem Auto:</strong> Unbegrenzt, solange für den Eigenbedarf.
            Innerhalb der EU keine Zollprobleme. Flaschen liegend und gepolstert
            transportieren — Kofferraum wird im Sommer sehr heiß!
          </p>
          <p className="mt-2">
            <strong>Im Flugzeug:</strong> Im Koffer erlaubt (max. 5 Liter pro Person
            im Aufgabegepäck). Spezielle Wein-Transporttaschen (WineSkin) verhindern
            Bruch. Nicht ins Handgepäck — Flüssigkeitsregel.
          </p>
          <p className="mt-2">
            <strong>Per Versand:</strong> Einige Weingüter (Kozlović, Matošević)
            versenden direkt nach Deutschland/Österreich. Fragen Sie beim Besuch
            nach Versandoptionen — oft günstiger als erwartet (ab 8 € pro Flasche).
          </p>
        </BlogInfoBox>

        <BlogSeasonalTip
          highlights={[
            { months: [5, 6, 9, 10], label: "Beste Weinreise-Zeit", color: "best" },
            { months: [4, 7, 8, 11], label: "Gut möglich", color: "good" },
            { months: [3], label: "Nebensaison", color: "ok" },
            { months: [12, 1, 2], label: "Viele Weingüter geschlossen", color: "avoid" },
          ]}
        />

        <h2 id="villa">Villa Gloria als Ausgangspunkt für Weintouren</h2>
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
          Mehr über die lokale Küche erfahren Sie in unserem{" "}
          <Link href="/blog/geheimtipp-kastelir" className="text-terracotta-500">
            Kaštelir-Guide
          </Link>
          . Für den aktiven Ausgleich nach der Weinprobe:{" "}
          <Link href="/blog/familienurlaub-istrien" className="text-terracotta-500">
            Familienurlaub in Istrien
          </Link>
          .
        </p>

        <p>
          Planen Sie Ihren Weinurlaub in Istrien und erleben Sie die
          Gastfreundschaft, die diese Region so besonders macht. Prüfen Sie
          die{" "}
          <Link href="/buchen" className="text-terracotta-500">
            Verfügbarkeit der Villa Gloria
          </Link>{" "}
          und sichern Sie sich Ihren Termin.
        </p>

        <h2 id="faq">Häufige Fragen zum Weinurlaub in Istrien</h2>

        <BlogFAQ
          schemaId="weinurlaub"
          faqs={[
            {
              question: "Kann man Wein direkt beim Winzer kaufen?",
              answer:
                "Ja, und das ist sogar der beste Weg! Die Preise ab Hof sind 20-40% günstiger als im Handel. Eine Flasche Premium-Malvazija kostet beim Winzer 8-15 €, ein Top-Teran 12-20 €. Die meisten Weingüter akzeptieren Kartenzahlung.",
            },
            {
              question: "Was kostet eine Weinprobe in Istrien?",
              answer:
                "Standard-Verkostungen (3-4 Weine) kosten 15-25 € pro Person. Premium-Verkostungen mit Käse/Prosciutto-Begleitung 30-45 €. Bei Kozlović gibt es auch eine Kellerführung mit 6 Weinen für 35 €. Manche kleinere Weingüter bieten kostenlose Verkostung an, wenn man danach kauft.",
            },
            {
              question: "Welcher Wein passt zu Trüffel?",
              answer:
                "Weißer Trüffel (Herbst): Malvazija Superiore oder ein gereifter Malvazija mit Holzausbau — die cremige Textur harmoniert perfekt. Schwarzer Trüffel (ganzjährig): Teran oder Merlot. Die Einheimischen trinken fast immer Malvazija zum Trüffel.",
            },
            {
              question: "Gibt es Weingüter mit Übernachtung?",
              answer:
                "Einige Weingüter bieten Ferienwohnungen an (z.B. Kabola in Momjan). Allerdings ist die Villa Gloria als Basis besser: Sie sind unabhängig, können verschiedene Weingüter besuchen, und der Pool wartet nach der Weinprobe. Fahrtzeit zu den Top-Weingütern: 20-50 Minuten.",
            },
          ]}
        />
      </BlogArticle>
    </>
  );
}
