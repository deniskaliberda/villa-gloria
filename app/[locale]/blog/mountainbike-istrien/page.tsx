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
  Mountain,
  Compass,
  Sun,
  Droplets,
  Shield,
  MapPin,
  Bike,
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
    alternates: {
      canonical: `/${locale}/blog/${SLUG}`,
      languages: {
        "x-default": `/de/blog/${SLUG}`,
        de: `/de/blog/${SLUG}`,
        en: `/en/blog/${SLUG}`,
        hr: `/hr/blog/${SLUG}`,
      },
    },
  };
}

export default async function MountainbikeIstrienPage({ params }: Props) {
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
          Istrien ist ein MTB-Paradies — rote Erde, Singletrails durch
          Olivenhaine, Panorama-Routen mit Meerblick. Kaum Hoehenmeter im
          Vergleich zu den Alpen, dafuer ganzjaehrig mildes Klima. Ob
          Einsteiger oder erfahrener Biker: Die Halbinsel im Norden Kroatiens
          bietet fuer jeden Level die passende Strecke. Und nach der Tour wartet
          der Pool der{" "}
          <Link href="/das-haus" className="text-terracotta-500">
            Villa Gloria
          </Link>{" "}
          auf Sie.
        </p>

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

        <h2>Die Parenzana — Istriens legendaerer Radweg</h2>
        <p>
          Die Parenzana ist eine ehemalige Schmalspurbahn, die von 1902 bis 1935
          zwischen Triest und Porec verkehrte. Heute ist die 123 km lange
          Strecke einer der bekanntesten Radwege Europas — und fuehrt direkt
          durch Kastelir. Die Teilstrecke von Kastelir nach Porec ist etwa 15 km
          lang, ueberwiegend flach und damit perfekt fuer Einsteiger und
          Familien geeignet.
        </p>
        <p>
          Auf dem Weg passieren Sie alte Eisenbahntunnels, beeindruckende
          Viadukte und endlose Olivenhaine. Die Strecke ist gut ausgeschildert
          und in hervorragendem Zustand. Besonders schoen: Im Fruehling bluehen
          die Wiesen am Wegesrand, im Herbst leuchten die Weinberge in warmen
          Farben.
        </p>

        <BlogInfoBox variant="tip" title="Tipp: E-Bike auf der Parenzana">
          <p>
            Die Parenzana-Strecke bei Kastelir ist auch fuer E-Bikes geeignet
            und bietet eine entspannte Tour durch die istrische Landschaft. Viele
            Verleiher in Porec bieten mittlerweile hochwertige E-Mountainbikes
            an — ideal, wenn Sie die Strecke ohne grossen Kraftaufwand geniessen
            moechten.
          </p>
        </BlogInfoBox>

        <h2>Top 5 MTB-Trails in der Region</h2>
        <p>
          Von leichten Schotterwegen bis zu anspruchsvollen Singletrails — die
          Region rund um Porec und Kastelir bietet fuer jeden Geschmack die
          richtige Route. Hier unsere fuenf Favoriten:
        </p>

        <BlogFeatureCard
          columns={2}
          features={[
            {
              icon: <Compass className="h-5 w-5" />,
              title: "Parenzana Trail",
              description:
                "15 km, leicht, Schotterweg. Die ehemalige Bahntrasse ist ideal fuer Einsteiger. Flaches Profil, schattige Abschnitte durch Olivenhaine und spektakulaere Viadukte.",
            },
            {
              icon: <Mountain className="h-5 w-5" />,
              title: "Red Earth Trail Motovun",
              description:
                "25 km, mittel, Singletrails. Durch die charakteristische rote Erde Istriens rund um das mittelalterliche Bergdorf Motovun. Technisch anspruchsvolle Passagen und tolle Aussichten.",
            },
            {
              icon: <Compass className="h-5 w-5" />,
              title: "Coastal Trail Vrsar–Funtana",
              description:
                "18 km, leicht bis mittel, Meerblick. Entlang der Kueste mit staendigen Ausblicken auf das tuerkisblaue Meer. Mehrere Bademoeglickeiten unterwegs.",
            },
            {
              icon: <Mountain className="h-5 w-5" />,
              title: "Limski Kanal Loop",
              description:
                "30 km, mittel, Fjord-Panorama. Rund um den beeindruckenden Limski-Fjord. Abwechslungsreiches Terrain mit Waldwegen und freien Abschnitten.",
            },
            {
              icon: <Mountain className="h-5 w-5" />,
              title: "Buzet Highlands",
              description:
                "40 km, schwer, Hoehenmeterfresser. Fuer erfahrene Biker: Anspruchsvolle Tour durch die Trueffelregion mit ueber 1.000 Hoehenmeter. Belohnung: atemberaubende Panoramen.",
            },
          ]}
        />

        <h2>Radverleih und gefuehrte Touren</h2>
        <p>
          Sie muessen Ihr eigenes Bike nicht mitbringen — in Porec und Umgebung
          gibt es mehrere professionelle Verleih-Stationen. Mountainbikes
          (Hardtail und Fully) sind ab etwa 25 EUR pro Tag erhaeltlich,
          E-Mountainbikes ab ca. 45 EUR pro Tag. Die meisten Verleiher bieten
          auch Helme, Handschuhe und Reparatursets an.
        </p>
        <p>
          Wer die besten Trails mit lokaler Expertise erkunden moechte, bucht
          eine gefuehrte Tour. Anbieter wie <strong>Biking Istria</strong> und{" "}
          <strong>Istria Outdoor</strong> bieten halbtaegige und ganztaegige
          Touren fuer verschiedene Koennerstufen an — inklusive Bike, Helm und
          Verpflegung.
        </p>

        <BlogInfoBox variant="info" title="Bike-Lieferung zur Villa">
          <p>
            Viele Verleiher liefern das Bike direkt zur Villa Gloria nach
            Kastelir — und holen es am Ende Ihres Urlaubs wieder ab. So sparen
            Sie sich die Fahrt nach Porec und koennen direkt vor der Haustuer
            losradeln. Fragen Sie bei der Buchung einfach nach dem
            Lieferservice.
          </p>
        </BlogInfoBox>

        <h2>Die beste Jahreszeit fuers Mountainbiken</h2>
        <p>
          Istrien bietet dank des mediterranen Klimas eine lange Bikesaison.
          Hier die besten Zeiten:
        </p>
        <ul>
          <li>
            <strong>Fruehling (April–Juni):</strong> Die ideale Zeit fuer
            Mountainbiker. Temperaturen zwischen 18 und 28 Grad, die Natur
            blueht, die Trails sind in bestem Zustand. Nicht zu heiss, nicht zu
            kalt.
          </li>
          <li>
            <strong>Herbst (September–Oktober):</strong> Perfekte Temperaturen
            um die 20 Grad, dazu Weinlese und Trueffelsaison. Die Landschaft
            leuchtet in warmen Farben — besonders schoen auf dem Motovun-Trail.
          </li>
          <li>
            <strong>Sommer (Juli–August):</strong> Moeglich, aber frueh morgens
            oder spaet abends planen. Die Mittagshitze (bis 35 Grad) macht
            laengere Touren anstrengend. Dafuer ist der Pool danach umso
            erfrischender.
          </li>
          <li>
            <strong>Winter (November–Maerz):</strong> Mild genug fuer moderate
            Touren, selten unter 5 Grad. Regen moeglich, aber deutlich weniger
            als in Deutschland. Perfekt fuer ruhige Ausfahrten ohne Touristen.
          </li>
        </ul>

        <h2>Villa Gloria als MTB-Basis</h2>
        <p>
          Die{" "}
          <Link href="/das-haus" className="text-terracotta-500">
            Villa Gloria al Padre
          </Link>{" "}
          in Kastelir ist der ideale Ausgangspunkt fuer Ihre Mountainbike-Touren
          in Istrien. Direkt an der Parenzana gelegen, mit allem, was Biker nach
          einer Tour brauchen:
        </p>

        <BlogFeatureCard
          features={[
            {
              icon: <Shield className="h-5 w-5" />,
              title: "Sichere Fahrradaufbewahrung",
              description:
                "Im grossen Garten der Villa koennen Sie Ihre Bikes sicher abstellen. Das eingezaeunte Grundstueck bietet Schutz und Ueberblick.",
            },
            {
              icon: <Droplets className="h-5 w-5" />,
              title: "Waschstation",
              description:
                "Nach einer Tour auf roter Erde muss das Bike gereinigt werden. Der Gartenschlauch steht Ihnen jederzeit zur Verfuegung.",
            },
            {
              icon: <Sun className="h-5 w-5" />,
              title: "Pool zur Erholung",
              description:
                "Der 12x8 m grosse Pool ist nach einer anstrengenden Tour genau das Richtige. Abkuehlung und Entspannung auf den Sonnenliegen.",
            },
            {
              icon: <MapPin className="h-5 w-5" />,
              title: "Lage direkt an der Parenzana",
              description:
                "Die legendaere Parenzana-Route startet praktisch vor der Haustuer. Kein Auto noetig, um auf den Trail zu kommen.",
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
          Istrien ist das Mallorca fuer Mountainbiker — nur ohne die Massen.
          Rote Erde, Singletrails durch Olivenhaine und nach der Tour ein
          Sprung in den Pool: So sieht der perfekte Bike-Urlaub aus.
        </BlogQuote>

        <p>
          Planen Sie Ihren Mountainbike-Urlaub in Istrien und pruefen Sie die{" "}
          <Link href="/buchen" className="text-terracotta-500">
            Verfuegbarkeit der Villa Gloria
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
