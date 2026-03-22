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

        <h2>Die Parenzana — Istriens legendärer Radweg</h2>
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

        <h2>Top 5 MTB-Trails in der Region</h2>
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
                "15 km, leicht, Schotterweg. Die ehemalige Bahntrasse ist ideal für Einsteiger. Flaches Profil, schattige Abschnitte durch Olivenhaine und spektakuläre Viadukte.",
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
                "18 km, leicht bis mittel, Meerblick. Entlang der Küste mit ständigen Ausblicken auf das türkisblaue Meer. Mehrere Bademöglichkeiten unterwegs.",
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
                "40 km, schwer, Höhenmeterfresser. Für erfahrene Biker: Anspruchsvolle Tour durch die Trüffelregion mit über 1.000 Höhenmeter. Belohnung: atemberaubende Panoramen.",
            },
          ]}
        />

        <h2>Radverleih und geführte Touren</h2>
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

        <BlogInfoBox variant="info" title="Bike-Lieferung zur Villa">
          <p>
            Viele Verleiher liefern das Bike direkt zur Villa Gloria nach
            Kaštelir — und holen es am Ende Ihres Urlaubs wieder ab. So sparen
            Sie sich die Fahrt nach Poreč und können direkt vor der Haustür
            losradeln. Fragen Sie bei der Buchung einfach nach dem
            Lieferservice.
          </p>
        </BlogInfoBox>

        <h2>Die beste Jahreszeit fürs Mountainbiken</h2>
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

        <h2>Villa Gloria als MTB-Basis</h2>
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
