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
  Waves,
  Droplets,
  Wind,
  Baby,
  UtensilsCrossed,
  Bed,
  Home,
  CookingPot,
  Fence,
  Dumbbell,
  Flame,
  Palmtree,
  TreePine,
  Anchor,
  CloudRain,
  ShoppingCart,
  Stethoscope,
  Utensils,
  Car,
  Route,
  MapPin,
  Users,
} from "lucide-react";

const SLUG = "familienurlaub-istrien";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.blogFamilienurlaub" });
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

export default async function FamilienurlaubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta.blogFamilienurlaub" });
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
          Istrien ist wie gemacht für Familien: kurze Anreise aus Deutschland
          und Österreich, kinderfreundliche Strände, spektakuläre
          Freizeitparks und eine Sicherheit, die Eltern beruhigt. In diesem
          Artikel zeigen wir Ihnen, warum Istrien das perfekte Ziel für Ihren
          nächsten Familienurlaub ist — und was Sie auf keinen Fall verpassen
          sollten.
        </p>

        <p>
          Reisen Sie mit Hund? Dann lesen Sie auch unseren{" "}
          <Link href="/blog/hundeurlaub-istrien" className="text-terracotta-500">
            Hundeurlaub-Guide für Istrien
          </Link>
          . Für Weinliebhaber:{" "}
          <Link href="/blog/weinurlaub-istrien" className="text-terracotta-500">
            Weinurlaub in Istrien
          </Link>
          .
        </p>

        <BlogQuickFacts
          facts={[
            { icon: <Waves className="h-5 w-5" />, label: "bis Istralandia", value: "20 Min." },
            { icon: <MapPin className="h-5 w-5" />, label: "bis Dino Park", value: "25 Min." },
            { icon: <Users className="h-5 w-5" />, label: "Gäste", value: "bis 9" },
            { icon: <Car className="h-5 w-5" />, label: "ab München", value: "~6 Std." },
          ]}
        />

        <BlogImageGrid
          images={[
            {
              src: "/images/blog/familienurlaub-1.webp",
              alt: "Familie am Pool einer Villa in Kroatien",
              caption: "Privater Pool — das Highlight für die ganze Familie",
            },
            {
              src: "/images/blog/familienurlaub-2.webp",
              alt: "Kinder auf Wasserrutschen im Aquapark",
              caption: "Istralandia — Europas bester Wasserpark, nur 25 Minuten entfernt",
            },
          ]}
        />

        <BlogTableOfContents
          sections={[
            { id: "warum-istrien", label: "Warum Istrien für Familien?" },
            { id: "istralandia", label: "Aquapark Istralandia" },
            { id: "dino-park", label: "Dino Park Funtana" },
            { id: "straende", label: "Familienfreundliche Strände" },
            { id: "teenager", label: "Aktivitäten für Teenager" },
            { id: "regentage", label: "Regentag-Aktivitäten" },
            { id: "budget", label: "Tagesbudget für Familien" },
            { id: "restaurants", label: "Familienrestaurants" },
            { id: "einkaufen", label: "Supermarkt & Apotheke" },
            { id: "villa", label: "Villa Gloria für Familien" },
            { id: "reisezeit", label: "Beste Reisezeit" },
            { id: "faq", label: "Häufige Fragen" },
          ]}
        />

        <h2 id="warum-istrien">Warum Istrien perfekt für Familienurlaub ist</h2>
        <p>
          Istrien liegt nur 5-7 Autostunden von München, Wien oder Zürich
          entfernt. Keine langen Flüge, kein Jetlag — und trotzdem
          Mittelmeer-Feeling pur. Die Halbinsel bietet eine einzigartige
          Mischung aus Natur, Kultur und Abenteuer:
        </p>
        <ul>
          <li>
            <strong>Kurze Anreise</strong> — Mit dem Auto über Österreich und
            Slowenien in wenigen Stunden. Perfekt auch für Familien mit
            kleinen Kindern.
          </li>
          <li>
            <strong>Sicheres Reiseziel</strong> — Kroatien gehört zu den
            sichersten Ländern Europas. Die Kriminalitätsrate ist niedrig, die
            Menschen gastfreundlich.
          </li>
          <li>
            <strong>Erschwingliche Preise</strong> — Im Vergleich zu Italien
            oder Südfrankreich sind Restaurants, Eintritte und Lebensmittel in
            Istrien deutlich günstiger.
          </li>
          <li>
            <strong>Kristallklares Wasser</strong> — Die istrische Küste hat
            einige der saubersten Badegewässer im Mittelmeer, regelmäßig mit
            der Blauen Flagge ausgezeichnet.
          </li>
          <li>
            <strong>Vielfalt</strong> — Strand am Morgen, Freizeitpark am
            Mittag, Altstadtbummel am Abend. In Istrien wird es nie langweilig.
          </li>
        </ul>

        <h2 id="istralandia">Aquapark Istralandia — Europas bester Wasserpark</h2>
        <p>
          Nur 25 Minuten von Kaštelir entfernt liegt Istralandia — einer der
          größten und am besten bewerteten Wasserparks in ganz Europa. Auf
          über 80.000 m² bietet der Park:
        </p>

        <BlogInfoBox variant="info" title="Istralandia auf einen Blick">
          <ul className="mt-1 list-none space-y-1 p-0">
            <li>
              <strong>20+ Wasserrutschen</strong> — Von sanften Kinderrutschen
              bis zu adrenalingeladenen Highspeed-Rutschen.
            </li>
            <li>
              <strong>Wellenbecken</strong> — Riesiges Becken mit künstlichen
              Wellen, Meerfeeling mitten im Park.
            </li>
            <li>
              <strong>400 m Lazy River</strong> — Strömungskanal perfekt zum
              Entspannen.
            </li>
            <li>
              <strong>Kinderbereiche</strong> — Speziell für Kleinkinder mit
              flachem Wasser und Mini-Rutschen.
            </li>
            <li>
              <strong>Gastronomie</strong> — Restaurants und Snackbars im Park.
            </li>
          </ul>
          <p className="mt-2">
            <strong>Entfernung:</strong> 25 Min. von der Villa Gloria.{" "}
            <strong>Tipp:</strong> Unter der Woche und früh kommen. Online-Tickets
            sind günstiger.
          </p>
        </BlogInfoBox>

        <h2 id="dino-park">Dino Park Funtana — Jurassic Park auf Istrisch</h2>
        <p>
          Der Dino Park in Funtana (ca. 20 Min. von Kaštelir) ist ein Muss für
          Kinder zwischen 3 und 12 Jahren. In einem natürlichen Waldgebiet
          stehen lebensgroße Dinosaurier-Nachbildungen, die sich bewegen und
          Geräusche machen.
        </p>

        <BlogInfoBox variant="tip" title="Dino Park Highlights">
          <ul className="mt-1 list-none space-y-1 p-0">
            <li>
              <strong>Über 100 Dinosaurier-Modelle</strong> — Vom T-Rex bis zum
              Diplodocus, alle in Originalgröße mit animatronischen Bewegungen.
            </li>
            <li>
              <strong>Ausgrabungsstätte</strong> — Kinder graben wie echte
              Paläontologen Fossilien aus.
            </li>
            <li>
              <strong>Schattiger Waldlehrpfad</strong> — Auch an heißen Tagen
              angenehm.
            </li>
            <li>
              <strong>Spielplatz und Hüpfburgen</strong> — Zusätzlicher Spaß
              nach dem Dino-Abenteuer.
            </li>
          </ul>
          <p className="mt-2">
            Planen Sie 2-3 Stunden ein. Kombikarten mit dem nahegelegenen
            Aquarium sind erhältlich.
          </p>
        </BlogInfoBox>

        <h2 id="straende">Familienfreundliche Strände</h2>
        <p>
          Istriens Strände sind überwiegend Kieselstrände mit kristallklarem
          Wasser — ideal für Familien, da das Wasser sauber bleibt und die
          Sicht unter Wasser hervorragend ist. Unsere Empfehlungen in der Nähe
          der{" "}
          <Link href="/umgebung" className="text-terracotta-500">
            Villa Gloria
          </Link>
          :
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <Baby className="h-5 w-5" />,
              title: "Zelena Laguna, Poreč",
              description:
                "Flacher Einstieg, schattige Pinienwälder am Rand, Restaurants und Toiletten. Perfekt für kleine Kinder.",
            },
            {
              icon: <Palmtree className="h-5 w-5" />,
              title: "Bijeca, Medulin",
              description:
                "Einer der wenigen Sandstrände Istriens. Extrem flach und ideal für Kleinkinder. Sonnenschirme und Liegen vorhanden.",
            },
            {
              icon: <Anchor className="h-5 w-5" />,
              title: "Špadići, Funtana",
              description:
                "Kieselstrand mit Naturfelsen zum Klettern. Ältere Kinder lieben die Felsen und Höhlen am Rand.",
            },
            {
              icon: <TreePine className="h-5 w-5" />,
              title: "Valkanela, Vrsar",
              description:
                "Ruhig und familienfreundlich. Weniger besucht als Poreč, mit Bäumen beschattet.",
            },
          ]}
        />

        <p>
          <strong>Tipp:</strong> Badeschuhe sind in Istrien Pflicht — die
          Kieselsteine können scharfkantig sein. In Supermärkten und
          Strandshops sind sie günstig erhältlich.
        </p>

        <h2 id="teenager">Aktivitäten für Teenager</h2>
        <p>
          Teenager brauchen Action — und bekommen sie in Istrien reichlich:
        </p>

        <BlogImageGrid
          images={[
            {
              src: "/images/garden/garten-volleyball.jpg",
              alt: "Volleyball- und Basketballfeld im Garten",
              caption: "Volleyball, Basketball und Badminton — auch Teenager sind begeistert",
            },
            {
              src: "/images/garden/grillplatz.jpg",
              alt: "Überdachter Grillplatz der Villa Gloria",
              caption: "BBQ-Abende für die ganze Familie",
            },
          ]}
        />

        <ul>
          <li>
            <strong>Volleyball und Basketball an der Villa</strong> — Die{" "}
            <Link href="/das-haus" className="text-terracotta-500">
              Villa Gloria
            </Link>{" "}
            hat ein eigenes Volleyball-/Badmintonfeld und einen Basketballkorb
            im Garten. Perfekt für Nachmittage ohne Programm.
          </li>
          <li>
            <strong>12×8 m Pool</strong> — Groß genug zum Schwimmen,
            Tauchen und Spielen. Kein Kinderbecken — ein richtiger Pool, der
            auch Teenager begeistert.
          </li>
          <li>
            <strong>Radfahren und Mountainbike</strong> — Zahlreiche Wege
            durch Olivenhaine und Weinberge. Fahrräder können in Poreč
            gemietet werden.
          </li>
          <li>
            <strong>Kajak und SUP</strong> — An der Küste bei Poreč und
            Vrsar können Kajaks und Stand-Up-Paddleboards gemietet werden.
          </li>
          <li>
            <strong>Kletterpark Glavani</strong> — Der Abenteuerpark bei
            Barban (ca. 45 Min.) bietet Hochseilgärten und Ziplines für
            verschiedene Schwierigkeitsstufen.
          </li>
        </ul>

        <h2 id="regentage">Was tun bei Regentagen?</h2>
        <p>
          Auch wenn Istrien über 240 Sonnentage pro Jahr hat — ein Regentag ist
          immer möglich. Kein Problem: Es gibt genug Indoor-Alternativen.
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <CloudRain className="h-5 w-5" />,
              title: "Aquarium Poreč",
              description:
                "Kleines aber feines Aquarium in der Altstadt von Poreč. Perfekt für 1-2 Stunden mit Kindern. Eintritt: ca. 8 € Erwachsene, 5 € Kinder. 15 Min. Fahrt.",
            },
            {
              icon: <CloudRain className="h-5 w-5" />,
              title: "Einkaufsbummel Poreč Altstadt",
              description:
                "Die historische Altstadt mit Euphrasius-Basilika (UNESCO) bietet überdachte Gassen, Eisdielen und kleine Geschäfte. Auch bei Regen stimmungsvoll.",
            },
            {
              icon: <CloudRain className="h-5 w-5" />,
              title: "Kochkurs 'Istrische Küche'",
              description:
                "Mehrere Anbieter rund um Poreč bieten Familien-Kochkurse an: Pasta selber machen, Olivenöl pressen, Trüffel suchen. Ab ca. 40 €/Person. Vorher reservieren.",
            },
            {
              icon: <CloudRain className="h-5 w-5" />,
              title: "Indoor-Spielplatz Poreč",
              description:
                "Fun Park Poreč bietet Trampoline, Kletterwände und Softplay für Kinder bis 12 Jahre. Eltern entspannen im Café nebenan. Ca. 10 € pro Kind.",
            },
          ]}
        />

        <h2 id="budget">Tagesbudget für eine Familie in Istrien</h2>
        <p>
          Kroatien ist deutlich günstiger als Italien oder Österreich. Hier eine
          realistische Kalkulation für eine 4-köpfige Familie pro Tag:
        </p>

        <BlogComparisonTable
          headers={["Posten", "Günstig", "Komfortabel", "Premium"]}
          rows={[
            ["Frühstück (Bäckerei/Supermarkt)", "5–8 €", "10–15 €", "15–25 €"],
            ["Mittagessen (Konoba/Restaurant)", "15–25 €", "30–45 €", "50–70 €"],
            ["Abendessen (Grillen/Restaurant)", "15–20 €", "35–50 €", "60–90 €"],
            ["Eintritt Attraktion", "0 €", "25–40 €", "40–60 €"],
            ["Benzin / Transport", "5–10 €", "10–15 €", "15–25 €"],
            ["Eis & Snacks", "5 €", "8–12 €", "15 €"],
            ["Gesamt pro Tag", "45–68 €", "118–177 €", "195–285 €"],
          ]}
          caption="Geschätzte Tageskosten für eine 4-köpfige Familie (2 Erw. + 2 Kinder)"
        />

        <BlogInfoBox variant="tip" title="Spar-Tipp: Selbst kochen spart enorm">
          <p>
            Die Villa Gloria hat eine voll ausgestattete Küche mit Backofen, Herd und
            Geschirrspüler. Wer abends grillt statt ins Restaurant geht, spart leicht
            30-50 € pro Tag. Auf dem Wochenmarkt in Poreč gibt es frisches Gemüse,
            Käse und Fisch direkt vom Erzeuger.
          </p>
        </BlogInfoBox>

        <h2 id="restaurants">Familienfreundliche Restaurants</h2>
        <p>
          Nicht jedes Restaurant in Istrien ist auf Familien mit kleinen Kindern
          eingestellt. Diese hier schon:
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <Utensils className="h-5 w-5" />,
              title: "Konoba Morgan, Kaštelir",
              description:
                "Große Terrasse mit Platz zum Herumlaufen. Kinderteller ab 6 €. Hochstühle vorhanden. 5 Min. zu Fuß von der Villa. Tipp: Reservieren in der Hochsaison!",
            },
            {
              icon: <Utensils className="h-5 w-5" />,
              title: "Restaurant Nono, Poreč",
              description:
                "Bekannt für Pizza und Pasta. Schneller Service (wichtig mit hungrigen Kindern). Kinderstühle, Malblätter. Große Portionen. Hauptgerichte 8–14 €.",
            },
            {
              icon: <Utensils className="h-5 w-5" />,
              title: "Konoba Astarea, Brtonigla",
              description:
                "Großer Spielplatz im Garten! Kinder spielen, Eltern genießen Trüffel-Pasta und lokalen Wein. Etwas teurer (15–22 €), aber jeden Cent wert.",
            },
            {
              icon: <Utensils className="h-5 w-5" />,
              title: "Pizzeria Niko, Poreč Hafen",
              description:
                "Direkt am Hafen mit Blick aufs Wasser. Kinder schauen den Booten zu. Pizza ab 7 €, Eis nebenan. Ideal für den Nachmittag.",
            },
          ]}
        />

        <h2 id="einkaufen">Supermarkt, Apotheke & Praktisches</h2>

        <BlogInfoBox variant="info" title="Einkaufen in der Nähe">
          <ul className="mt-2 list-none space-y-2 p-0">
            <li>
              <strong>Konzum Mini, Kaštelir</strong> — 700 m von der Villa. Grundlegendes
              Sortiment, frisches Brot, Milch, Wasser. Mo–Sa 7–20 Uhr, So 8–13 Uhr.
            </li>
            <li>
              <strong>Plodine, Poreč</strong> — Großer Supermarkt (wie Lidl/Kaufland) mit
              allem was man braucht. Babynahrung, Windeln, Sonnencreme. 15 Min. Fahrt.
              Mo–Sa 7–21 Uhr.
            </li>
            <li>
              <strong>Apotheke (Ljekarna), Poreč Zentrum</strong> — Kindermedikamente,
              Sonnenschutz, Insektenmittel. Mo–Fr 7–20 Uhr, Sa 7–14 Uhr.
            </li>
            <li>
              <strong>Kinderarzt</strong> — Die nächste Kinderarztpraxis ist in Poreč
              (Dom zdravlja Poreč, +385 52 451 611). Im Notfall: Krankenhaus Pula (60 Min.)
              oder Notruf 112.
            </li>
          </ul>
        </BlogInfoBox>

        <h2 id="villa">
          Villa Gloria: Platz für die ganze Familie
        </h2>
        <p>
          Die{" "}
          <Link href="/das-haus" className="text-terracotta-500">
            Villa Gloria al Padre
          </Link>{" "}
          ist wie geschaffen für Familienurlaub. Mit 180 m² Wohnfläche, 4
          Schlafzimmern und Platz für bis zu 9 Gäste bietet sie Raum für
          Familien jeder Größe:
        </p>

        <BlogFeatureCard
          columns={3}
          features={[
            {
              icon: <Bed className="h-5 w-5" />,
              title: "4 Schlafzimmer, 3 Bäder",
              description:
                "Genug Platz, damit jeder seinen Rückzugsort hat. Keine beengten Hotelzimmer.",
            },
            {
              icon: <Home className="h-5 w-5" />,
              title: "Separates Apartment",
              description:
                "Perfekt für Großeltern oder Teenager. Eigenes Bad, Küchenzeile, separater Eingang.",
            },
            {
              icon: <CookingPot className="h-5 w-5" />,
              title: "Voll ausgestattete Küche",
              description:
                "Kochen Sie, was und wann Ihre Familie möchte. Keine teuren Halbpensionen.",
            },
            {
              icon: <Fence className="h-5 w-5" />,
              title: "1.000 m² eingezäunt",
              description:
                "Kinder können frei spielen. Eltern können entspannen, ohne ständig aufzupassen.",
            },
            {
              icon: <Waves className="h-5 w-5" />,
              title: "Pool (12x8 m)",
              description:
                "Der Höhepunkt für jede Familie. Groß genug für alle, mit Sonnenliegen und Schatten.",
            },
            {
              icon: <Dumbbell className="h-5 w-5" />,
              title: "Sportplatz im Garten",
              description:
                "Volleyball, Badminton, Basketball — alles vorhanden. Kein Extra-Eintritt.",
            },
            {
              icon: <Flame className="h-5 w-5" />,
              title: "BBQ-Bereich",
              description:
                "Grillabende gehören zum Familienurlaub. Überdachter Grillplatz — auch bei Regen.",
            },
          ]}
        />

        <h2 id="reisezeit">Beste Reisezeit für Familienurlaub</h2>

        <BlogSeasonalTip
          highlights={[
            { months: [6, 9], label: "Perfekt für Familien", color: "best" },
            { months: [5, 10], label: "Angenehm warm", color: "good" },
            { months: [7, 8], label: "Heiß & voll", color: "ok" },
            { months: [4, 11], label: "Nebensaison", color: "ok" },
          ]}
        />

        <p>
          <strong>Juni und September</strong> sind ideal: warm genug zum Schwimmen
          (24-27 °C Wasser), aber nicht so heiß wie im Hochsommer. Istralandia und
          Dino Park sind weniger überlaufen, Restaurants haben noch freie Plätze.
          Im <strong>Juli/August</strong> ist Hochsaison — voller, teurer, heißer,
          aber natürlich auch möglich.
        </p>

        <BlogFAQ
          schemaId="familienurlaub"
          faqs={[
            {
              question: "Ab welchem Alter lohnt sich Istralandia?",
              answer:
                "Istralandia hat einen Bereich für Kleinkinder ab 2 Jahren mit flachen Becken und Mini-Rutschen. Richtig Spaß macht der Park aber ab ca. 5-6 Jahren. Die großen Rutschen haben eine Mindestgröße von 120 cm. Für Teenager gibt es Adrenalin-Rutschen und einen FlowRider Surfsimulator.",
            },
            {
              question: "Gibt es einen Kinderarzt in Poreč?",
              answer:
                "Ja, im Dom zdravlja Poreč (Gesundheitszentrum) gibt es eine Kinderarztpraxis. Telefon: +385 52 451 611. Im Notfall ist das Krankenhaus in Pula (ca. 60 Min. Fahrt) die nächste größere Klinik. Europäischer Notruf: 112.",
            },
            {
              question: "Ist der Pool der Villa Gloria kindersicher?",
              answer:
                "Der Pool hat keine Umzäunung, daher müssen kleine Kinder beaufsichtigt werden. Es gibt einen flachen Einstieg über Stufen. Die Pooltiefe beträgt 1,20-1,80 m. Schwimmhilfen können mitgebracht werden. Das Grundstück selbst ist komplett eingezäunt.",
            },
            {
              question: "Was kann man bei Regentagen unternehmen?",
              answer:
                "Aquarium Poreč, Einkaufen in der Altstadt, Kochkurs für Familien, Indoor-Spielplatz Fun Park Poreč oder das Euphrasius-Basilika Museum (UNESCO-Weltkulturerbe). Die Villa selbst bietet Brettspiele und eine überdachte Terrasse.",
            },
            {
              question: "Wie weit ist der nächste Supermarkt?",
              answer:
                "Der Konzum Mini in Kaštelir ist nur 700 m von der Villa entfernt (Mo-Sa 7-20 Uhr, So 8-13 Uhr). Für einen größeren Einkauf fahren Sie zum Plodine Supermarkt in Poreč (15 Min., Mo-Sa 7-21 Uhr). Windeln und Babynahrung sind in beiden erhältlich.",
            },
          ]}
        />

        <BlogQuote>
          Ein Familienurlaub in Istrien kombiniert Abenteuer, Entspannung und
          mediterrane Lebensfreude. Die Villa Gloria gibt Ihnen den Platz und
          die Freiheit, die ein Familienurlaub braucht.
        </BlogQuote>

        <p>
          Prüfen Sie die{" "}
          <Link href="/buchen" className="text-terracotta-500">
            Verfügbarkeit
          </Link>{" "}
          und planen Sie Ihren nächsten Urlaub in Istrien.
        </p>
      </BlogArticle>
    </>
  );
}
