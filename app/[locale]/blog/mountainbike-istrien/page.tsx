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
  Mountain,
  Compass,
  Sun,
  Droplets,
  Shield,
  MapPin,
  Bike,
  Wrench,
  Coffee,
  BadgeEuro,
  Clock,
  Waves,
} from "lucide-react";

const SLUG = "mountainbike-istrien";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.blogMountainbike" });
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

export default async function MountainbikeIstrienPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta.blogMountainbike" });
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
        <p className="text-xl font-bold leading-relaxed">
          Istrien ist ein MTB-Paradies — rote Erde, Singletrails durch
          Olivenhaine, Panorama-Routen mit Meerblick. Kaum Höhenmeter im
          Vergleich zu den Alpen, dafür ganzjährig mildes Klima. Ob
          Einsteiger oder erfahrener Biker: Die Halbinsel im Norden Kroatiens
          bietet für jeden Level die passende Strecke. Und nach der Tour wartet
          der Pool der{" "}
          <Link href="/das-haus" className="text-terracotta-500">
            Villa Gloria
          </Link>{" "}
          auf Sie.
        </p>

        <p>
          Lieber auf der Straße? Lesen Sie unseren{" "}
          <Link href="/blog/rennrad-istrien" className="text-terracotta-500">
            Rennrad-Guide für Istrien
          </Link>
          .
        </p>

        <BlogQuickFacts
          facts={[
            { icon: <Bike className="h-5 w-5" />, label: "Trails", value: "5+" },
            { icon: <MapPin className="h-5 w-5" />, label: "Parenzana", value: "123 km" },
            { icon: <BadgeEuro className="h-5 w-5" />, label: "Verleih/Tag", value: "ab 25 €" },
            { icon: <Clock className="h-5 w-5" />, label: "Saison", value: "Mär–Nov" },
          ]}
        />

        <BlogImageGrid
          images={[
            {
              src: "/images/blog/mountainbike-1.webp",
              alt: "Mountainbiker auf rotem Singletrack in Istrien",
              caption: "Rote Erde, Olivenhaine, Meerblick — Singletrails in Istrien",
            },
            {
              src: "/images/blog/mountainbike-2.webp",
              alt: "Radfahrer vor dem Parenzana-Tunnel",
              caption: "Die Parenzana — historischer Bahntrassenweg durch Istrien",
            },
          ]}
        />

        <BlogTableOfContents
          sections={[
            { id: "parenzana", label: "Die Parenzana" },
            { id: "trails", label: "Top 5 MTB-Trails" },
            { id: "radverleih", label: "Radverleih & Reparatur" },
            { id: "ausruestung", label: "Ausrüstung & Tipps" },
            { id: "trail-etikette", label: "Trail-Etikette & Sicherheit" },
            { id: "jahreszeit", label: "Beste Jahreszeit" },
            { id: "nach-der-tour", label: "Nach der Tour" },
            { id: "villa", label: "Villa Gloria als MTB-Basis" },
            { id: "faq", label: "Häufige Fragen" },
          ]}
        />

        <h2 id="parenzana">Die Parenzana — Istriens legendärer Radweg</h2>
        <p>
          Die Parenzana ist eine ehemalige Schmalspurbahn, die von 1902 bis 1935
          zwischen Triest und Poreč verkehrte. Heute ist die 123 km lange
          Strecke einer der bekanntesten Radwege Europas — und führt direkt
          durch Kaštelir. Die Teilstrecke von Kaštelir nach Poreč ist etwa 15 km
          lang, überwiegend flach und damit perfekt für Einsteiger und
          Familien geeignet.
        </p>
        <p>
          Auf dem Weg passieren Sie alte Eisenbahntunnels, beeindruckende
          Viadukte und endlose Olivenhaine. Die Strecke ist gut ausgeschildert
          und in hervorragendem Zustand. Besonders schön: Im Frühling blühen
          die Wiesen am Wegesrand, im Herbst leuchten die Weinberge in warmen
          Farben.
        </p>

        <BlogInfoBox variant="tip" title="Tipp: E-Bike auf der Parenzana">
          <p>
            Die Parenzana-Strecke bei Kaštelir ist auch für E-Bikes geeignet
            und bietet eine entspannte Tour durch die istrische Landschaft. Viele
            Verleiher in Poreč bieten mittlerweile hochwertige E-Mountainbikes
            an — ideal, wenn Sie die Strecke ohne großen Kraftaufwand genießen
            möchten.
          </p>
        </BlogInfoBox>

        <h2 id="trails">Top 5 MTB-Trails in der Region</h2>
        <p>
          Von leichten Schotterwegen bis zu anspruchsvollen Singletrails — die
          Region rund um Poreč und Kaštelir bietet für jeden Geschmack die
          richtige Route. Hier unsere fünf Favoriten:
        </p>

        <BlogFeatureCard
          columns={2}
          features={[
            {
              icon: <Compass className="h-5 w-5" />,
              title: "Parenzana Trail",
              description:
                "15 km, leicht, Schotterweg. Die ehemalige Bahntrasse ist ideal für Einsteiger. Flaches Profil, schattige Abschnitte durch Olivenhaine und spektakuläre Viadukte. Oberfläche: 80 % verdichteter Schotter, 20 % Asphalt. Wasser-Stopp: Brunnen im Dorf Vižinada (km 8). Keine technischen Passagen — auch mit Kinderanhänger fahrbar.",
            },
            {
              icon: <Mountain className="h-5 w-5" />,
              title: "Red Earth Trail Motovun",
              description:
                "25 km, mittel, Singletrails. Durch die charakteristische rote Erde Istriens rund um das mittelalterliche Bergdorf Motovun. Technisch anspruchsvolle Passagen und tolle Aussichten. Oberfläche: 60 % Singletrail (Terra Rossa), 30 % Waldweg, 10 % Asphalt. Wasser-Stopp: Café am Dorfplatz Motovun (km 12). Technische Sektion: Steile Abfahrt nach Motovun (km 14–16, wurzelig, Gefälle 15 %).",
            },
            {
              icon: <Compass className="h-5 w-5" />,
              title: "Coastal Trail Vrsar–Funtana",
              description:
                "18 km, leicht bis mittel, Meerblick. Entlang der Küste mit ständigen Ausblicken auf das türkisblaue Meer. Mehrere Bademöglichkeiten unterwegs. Oberfläche: 50 % Schotter, 30 % Küstenpfad (felsig), 20 % Asphalt. Wasser/Food: Strandbar Funtana (km 10), Restaurant am Hafen Vrsar (km 18). Technische Sektion: Kurze felsige Passage bei Funtana (km 9, Fahrrad evtl. schieben).",
            },
            {
              icon: <Mountain className="h-5 w-5" />,
              title: "Limski Kanal Loop",
              description:
                "30 km, mittel, Fjord-Panorama. Rund um den beeindruckenden Limski-Fjord. Abwechslungsreiches Terrain mit Waldwegen und freien Abschnitten. Oberfläche: 45 % Waldweg, 35 % Singletrail, 20 % Asphalt. Wasser/Food: Fischrestaurant am Limski-Fjord (km 15) — unbedingt Austern probieren! Technische Sektion: Steiler Anstieg Nordufer (km 20–22, 300 Hm auf 2 km).",
            },
            {
              icon: <Mountain className="h-5 w-5" />,
              title: "Buzet Highlands",
              description:
                "40 km, schwer, Höhenmeterfresser. Für erfahrene Biker: Anspruchsvolle Tour durch die Trüffelregion mit über 1.000 Höhenmeter. Belohnung: atemberaubende Panoramen. Oberfläche: 40 % Singletrail, 35 % Schotterweg, 25 % Asphalt. Wasser/Food: Konoba Kotiga in Roč (km 22) — Trüffel-Pasta als Belohnung. Technische Sektionen: Mehrere steile Abfahrten mit losem Geröll (km 10, 25, 32). Nur bei Trockenheit empfohlen.",
            },
          ]}
        />

        <h2 id="radverleih">Radverleih & Reparatur</h2>
        <p>
          Sie müssen Ihr eigenes Bike nicht mitbringen — in Poreč und Umgebung
          gibt es mehrere professionelle Verleih-Stationen. Mountainbikes
          (Hardtail und Fully) sind ab etwa 25 EUR pro Tag erhältlich,
          E-Mountainbikes ab ca. 45 EUR pro Tag. Die meisten Verleiher bieten
          auch Helme, Handschuhe und Reparatursets an.
        </p>
        <p>
          Wer die besten Trails mit lokaler Expertise erkunden möchte, bucht
          eine geführte Tour. Anbieter wie <strong>Biking Istria</strong> und{" "}
          <strong>Istria Outdoor</strong> bieten halbtägige und ganztägige
          Touren für verschiedene Könnerstufen an — inklusive Bike, Helm und
          Verpflegung.
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <Wrench className="h-5 w-5" />,
              title: "Biking Istria, Poreč",
              description:
                "Größter Verleih in der Region. Hardtail ab 25 €/Tag, Fully ab 35 €/Tag, E-MTB ab 45 €/Tag. Lieferung zur Villa möglich (ab 2 Tagen kostenlos). Reparatur-Service vor Ort. +385 91 789 1234.",
            },
            {
              icon: <Wrench className="h-5 w-5" />,
              title: "Istria Outdoor, Poreč Hafen",
              description:
                "Auch geführte Touren (ab 45 €/Person). Gute Giant- und Scott-Räder. Helme inklusive. Pannen-Service per Telefon. Geöffnet Apr–Okt.",
            },
            {
              icon: <Wrench className="h-5 w-5" />,
              title: "Bike Point Vrsar",
              description:
                "Kleinerer Shop, aber top Reparatur-Werkstatt. Ersatzteile (Schläuche, Bremsbeläge, Ketten) auf Lager. Guter Tipp wenn unterwegs was kaputtgeht. 20 Min. von Kaštelir.",
            },
          ]}
        />

        <BlogInfoBox variant="info" title="Bike-Lieferung zur Villa">
          <p>
            Viele Verleiher liefern das Bike direkt zur Villa Gloria nach
            Kaštelir — und holen es am Ende Ihres Urlaubs wieder ab. So sparen
            Sie sich die Fahrt nach Poreč und können direkt vor der Haustür
            losradeln. Fragen Sie bei der Buchung einfach nach dem
            Lieferservice.
          </p>
        </BlogInfoBox>

        <h2 id="ausruestung">Ausrüstung für istrische Trails</h2>

        <BlogInfoBox variant="tip" title="Terra Rossa — die rote Erde Istriens">
          <p>
            Der istrische Boden besteht aus <em>Terra Rossa</em> — roter Erde, die bei
            Nässe extrem rutschig wird und bei Trockenheit staubt. Empfehlung: Reifen
            mit mittlerem Profil (z. B. Schwalbe Nobby Nic oder Maxxis Ardent). Bei
            Regen: Trail meiden, die rote Erde klebt an allem.
          </p>
        </BlogInfoBox>

        <BlogFeatureCard
          features={[
            {
              icon: <Droplets className="h-5 w-5" />,
              title: "Wasser mitnehmen!",
              description:
                "Im Sommer werden es 35 °C+. Mindestens 2 Liter pro Tour. Auffüllmöglichkeiten gibt es in den Dörfern (Brunnen, Cafés) aber nicht auf den Trails.",
            },
            {
              icon: <Shield className="h-5 w-5" />,
              title: "Helm & Schutz",
              description:
                "Helm ist Pflicht (auch bei Leih-Rädern inklusive). Für technische Trails: Knieschoner empfohlen. Handschuhe schützen bei Stürzen auf Schotter.",
            },
          ]}
        />

        <h2 id="trail-etikette">Trail-Etikette & Sicherheit</h2>

        <BlogInfoBox variant="warning" title="Wildtiere auf den Trails">
          <p>
            In den Wäldern Istriens leben Wildschweine, Rehe und vereinzelt Schlangen
            (Kreuzotter und Sandviper — nicht aggressiv, aber Abstand halten). Auf
            schmalen Trails: laut ankommen (Klingel oder Rufen), damit Tiere
            ausweichen können. Bei Dämmerung besonders aufmerksam sein.
          </p>
        </BlogInfoBox>

        <ul>
          <li><strong>Vorfahrt:</strong> Wanderer haben immer Vorrang. Bremsen und grüßen.</li>
          <li><strong>Müll:</strong> Alles mitnehmen was man mitbringt. Keine Gel-Tüten in den Wald werfen.</li>
          <li><strong>Trails nach Regen:</strong> Nasse Trails meiden — Terra Rossa wird zur Rutschbahn und die Spuren schädigen den Weg.</li>
          <li><strong>Feuer:</strong> Absolutes Rauchverbot im Wald von Mai bis Oktober.</li>
        </ul>

        <h2 id="jahreszeit">Die beste Jahreszeit fürs Mountainbiken</h2>
        <p>
          Istrien bietet dank des mediterranen Klimas eine lange Bikesaison.
          Hier die besten Zeiten:
        </p>
        <ul>
          <li>
            <strong>Frühling (April–Juni):</strong> Die ideale Zeit für
            Mountainbiker. Temperaturen zwischen 18 und 28 Grad, die Natur
            blüht, die Trails sind in bestem Zustand. Nicht zu heiß, nicht zu
            kalt.
          </li>
          <li>
            <strong>Herbst (September–Oktober):</strong> Perfekte Temperaturen
            um die 20 Grad, dazu Weinlese und Trüffelsaison. Die Landschaft
            leuchtet in warmen Farben — besonders schön auf dem Motovun-Trail.
          </li>
          <li>
            <strong>Sommer (Juli–August):</strong> Möglich, aber früh morgens
            oder spät abends planen. Die Mittagshitze (bis 35 Grad) macht
            längere Touren anstrengend. Dafür ist der Pool danach umso
            erfrischender.
          </li>
          <li>
            <strong>Winter (November–März):</strong> Mild genug für moderate
            Touren, selten unter 5 Grad. Regen möglich, aber deutlich weniger
            als in Deutschland. Perfekt für ruhige Ausfahrten ohne Touristen.
          </li>
        </ul>

        <BlogSeasonalTip
          highlights={[
            { months: [4, 5, 9, 10], label: "Beste MTB-Zeit", color: "best" },
            { months: [3, 6, 11], label: "Gut möglich", color: "good" },
            { months: [7, 8], label: "Heiß — nur morgens", color: "ok" },
            { months: [12, 1, 2], label: "Matschig", color: "avoid" },
          ]}
        />

        <h2 id="nach-der-tour">Nach der Tour: Recovery in Istrien</h2>
        <p>
          Das Schönste am Mountainbiken in Istrien? Danach wartet der Pool, ein
          kaltes Bier und die beste Küche der Region.
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <Waves className="h-5 w-5" />,
              title: "Pool der Villa Gloria",
              description:
                "Nach einer staubigen Tour: 12x8 m Pool mit Meerblick. Kaltes Wasser für müde Beine. Sonnenliegen zum Entspannen.",
            },
            {
              icon: <Coffee className="h-5 w-5" />,
              title: "Konoba Morgan, Kaštelir",
              description:
                "5 Minuten von der Villa. Fuži mit Trüffel (18 €) und ein Glas lokaler Malvazija — perfekte Post-Ride-Mahlzeit. Große Terrasse.",
            },
          ]}
        />

        <p>
          Mehr zu den lokalen Restaurants:{" "}
          <Link href="/blog/geheimtipp-kastelir" className="text-terracotta-500">
            Geheimtipp Kaštelir
          </Link>
          . Für Weinliebhaber nach der Tour:{" "}
          <Link href="/blog/weinurlaub-istrien" className="text-terracotta-500">
            Weinurlaub in Istrien
          </Link>
          .
        </p>

        <h2 id="villa">Villa Gloria als MTB-Basis</h2>
        <p>
          Die{" "}
          <Link href="/das-haus" className="text-terracotta-500">
            Villa Gloria al Padre
          </Link>{" "}
          in Kaštelir ist der ideale Ausgangspunkt für Ihre Mountainbike-Touren
          in Istrien. Direkt an der Parenzana gelegen, mit allem, was Biker nach
          einer Tour brauchen:
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <Shield className="h-5 w-5" />,
              title: "Sichere Fahrradaufbewahrung",
              description:
                "Im großen Garten der Villa können Sie Ihre Bikes sicher abstellen. Das eingezäunte Grundstück bietet Schutz und Überblick.",
            },
            {
              icon: <Droplets className="h-5 w-5" />,
              title: "Waschstation",
              description:
                "Nach einer Tour auf roter Erde muss das Bike gereinigt werden. Der Gartenschlauch steht Ihnen jederzeit zur Verfügung.",
            },
            {
              icon: <Sun className="h-5 w-5" />,
              title: "Pool zur Erholung",
              description:
                "Der 12x8 m große Pool ist nach einer anstrengenden Tour genau das Richtige. Abkühlung und Entspannung auf den Sonnenliegen.",
            },
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Lage direkt an der Parenzana",
              description:
                "Die legendäre Parenzana-Route startet praktisch vor der Haustür. Kein Auto nötig, um auf den Trail zu kommen.",
            },
          ]}
        />

        <BlogImageGrid
          images={[
            {
              src: "/images/pool/pool-sonnenliegen.jpg",
              alt: "Pool-Terrasse der Villa Gloria",
              caption: "Erholung am Pool nach der Tour",
            },
            {
              src: "/images/exterior/villa-pool-wide.jpg",
              alt: "Villa Gloria mit Pool",
              caption: "Villa Gloria — Ihre MTB-Basis in Kaštelir",
            },
          ]}
        />

        <BlogQuote>
          Istrien ist das Mallorca für Mountainbiker — nur ohne die Massen.
          Rote Erde, Singletrails durch Olivenhaine und nach der Tour ein
          Sprung in den Pool: So sieht der perfekte Bike-Urlaub aus.
        </BlogQuote>

        <BlogFAQ
          schemaId="mountainbike"
          faqs={[
            {
              question: "Kann ich ein E-Mountainbike vor Ort leihen?",
              answer:
                "Ja, bei Biking Istria in Poreč gibt es E-MTBs ab 45 €/Tag. Lieferung zur Villa Gloria ist ab 2 Tagen kostenlos. Reservieren Sie in der Hochsaison mindestens 1 Woche vorher, da E-Bikes schnell vergriffen sind.",
            },
            {
              question: "Sind die Trails auch für Anfänger geeignet?",
              answer:
                "Ja, besonders der Parenzana-Trail (flach, breit, keine technischen Passagen) und der Coastal Trail Vrsar-Funtana (leicht, schöne Küstenaussicht) sind perfekt für Einsteiger. Für Kinder ab 10 Jahren geeignet.",
            },
            {
              question: "Wo kann ich mein Rad in Poreč reparieren lassen?",
              answer:
                "Biking Istria und Istria Outdoor in Poreč bieten Reparatur-Service an. Bike Point Vrsar hat eine gute Werkstatt mit Ersatzteilen auf Lager. Im Notfall: Pannen-Service per Telefon bei den Verleihern.",
            },
            {
              question: "Gibt es geführte MTB-Touren in Istrien?",
              answer:
                "Ja, mehrere Anbieter bieten geführte Touren an: Istria Outdoor (ab 45 €/Person, halbtags), Biking Istria (ab 55 €/Person, ganztags mit Mittagessen). Die Guides kennen versteckte Trails, die nicht auf Karten stehen. Gruppen von 2-8 Personen.",
            },
          ]}
        />

        <p>
          Planen Sie Ihren Mountainbike-Urlaub in Istrien und prüfen Sie die{" "}
          <Link href="/buchen" className="text-terracotta-500">
            Verfügbarkeit der Villa Gloria
          </Link>
          . Bei Fragen zu Radverleih, Touren oder der{" "}
          <Link href="/umgebung" className="text-terracotta-500">
            Umgebung
          </Link>{" "}
          helfen wir Ihnen gerne weiter.
        </p>
      </BlogArticle>
    </>
  );
}
