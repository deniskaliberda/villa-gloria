import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

const SLUG = "weinurlaub-istrien";

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

export default async function WeinurlaubPage({ params }: Props) {
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
          Istrien ist nicht nur für seine Küste bekannt — die Halbinsel hat sich
          in den letzten zwei Jahrzehnten zu einer der spannendsten Weinregionen
          Europas entwickelt. Zwischen Olivenhainen und mittelalterlichen
          Bergdörfern produzieren leidenschaftliche Winzer Weine von
          Weltklasse-Niveau. Ein Weinurlaub in Istrien verbindet Genuss, Kultur
          und Erholung auf einzigartige Weise.
        </p>

        <h2>Istrien: Kroatiens Weinregion Nr. 1</h2>
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

        <h2>Malvazija &amp; Teran — die Stars der istrischen Weinszene</h2>
        <p>
          Zwei Rebsorten dominieren die istrische Weinlandschaft und sollten
          bei keinem Weinurlaub fehlen:
        </p>
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

        <h2>Top 5 Weingüter in der Nähe von Kaštelir/Poreč</h2>
        <p>
          Von der{" "}
          <Link href="/das-haus" className="text-terracotta-500">
            Villa Gloria
          </Link>{" "}
          aus erreichen Sie diese erstklassigen Weingüter in wenigen
          Autominuten:
        </p>

        <h3>1. Kozlović (Momjan) — ca. 30 Min.</h3>
        <p>
          Eines der renommiertesten Weingüter Kroatiens. Die Familie Kozlović
          produziert seit Generationen preisgekrönte Weine. Ihre Malvazija
          „Santa Lucia" gehört zu den besten Weißweinen des Landes. Moderne
          Architektur trifft auf Tradition — die Verkostung mit Blick über die
          Weinberge ist ein Erlebnis. Reservierung empfohlen.
        </p>

        <h3>2. Matošević (Krunčići) — ca. 20 Min.</h3>
        <p>
          Ivica Matošević gilt als Pionier der istrischen Weinrevolution. Sein
          „Alba" Malvazija ist international mehrfach ausgezeichnet. Das
          Weingut liegt malerisch im Hinterland und bietet intime Verkostungen
          mit persönlicher Beratung. Hier spürt man die Leidenschaft in jedem
          Schluck.
        </p>

        <h3>3. Degrassi (Savudrija) — ca. 35 Min.</h3>
        <p>
          Das Weingut Degrassi liegt an der Nordwestküste Istriens und
          verbindet Weinbau mit einem atemberaubenden Blick auf die Adria.
          Bekannt für elegante Malvazija und samtige Merlots. Die Verkostung
          findet direkt am Meer statt — Weingenuss mit Sonnenuntergang
          inklusive.
        </p>

        <h3>4. Trapan (Šišan bei Pula) — ca. 50 Min.</h3>
        <p>
          Bruno Trapan hat innerhalb weniger Jahre eines der modernsten
          Weingüter Istriens aufgebaut. Seine „Ponente" Malvazija und der
          „Syrah" gehören zu den Geheimtipps unter Kennern. Das architektonisch
          beeindruckende Weingut bietet auch kulinarische Erlebnisse mit
          regionaler Küche.
        </p>

        <h3>5. Kabola (Momjan) — ca. 30 Min.</h3>
        <p>
          Kabola setzt auf biodynamischen Weinbau und gehört zu den
          Vorreitern des Naturweins in Kroatien. Ihr „Amphora" Malvazija —
          in Tonamphoren vergoren — ist einzigartig. Das Weingut bietet
          ausgezeichnete Verkostungen mit Käse und Olivenöl aus eigener
          Produktion.
        </p>

        <h2>Istrische Weinstraßen — Routen für Genießer</h2>
        <p>
          Istrien hat mehrere offizielle Weinstraßen eingerichtet, die durch
          die schönsten Weingebiete führen:
        </p>
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
        <p>
          <strong>Tipp:</strong> Planen Sie einen Fahrer ein oder buchen Sie
          eine geführte Weintour. Die Straßen sind kurvig und die Verkostungen
          großzügig.
        </p>

        <h2>
          Olivenöl &amp; Trüffel — Istriens kulinarische Dreifaltigkeit
        </h2>
        <p>
          Ein Weinurlaub in Istrien wäre unvollständig ohne die anderen beiden
          kulinarischen Stars der Region:
        </p>
        <ul>
          <li>
            <strong>Olivenöl</strong> — Istrisches Olivenöl gehört zur
            Weltspitze. Die Region produziert einige der am höchsten bewerteten
            Öle weltweit. Verkostungen werden auf vielen Weingütern und in
            spezialisierten Ölmühlen angeboten. Besonders empfehlenswert:
            Chiavalon, Belic und Ipša.
          </li>
          <li>
            <strong>Trüffel</strong> — Das Mirna-Tal bei Motovun ist das
            Trüffelzentrum Istriens. Sowohl weiße als auch schwarze Trüffel
            werden hier gefunden. Von Oktober bis Dezember ist Hochsaison für
            den begehrten weißen Trüffel. Geführte Trüffeljagden mit Hunden
            sind ein unvergessliches Erlebnis.
          </li>
        </ul>
        <p>
          Die Kombination aus erstklassigem Wein, Olivenöl und Trüffel macht
          Istrien zu einem kulinarischen Paradies, das sich mit der Toskana
          messen kann — nur ohne die Massen und zu deutlich günstigeren Preisen.
        </p>

        <h2>Villa Gloria als Ausgangspunkt für Weintouren</h2>
        <p>
          Die{" "}
          <Link href="/das-haus" className="text-terracotta-500">
            Villa Gloria al Padre
          </Link>{" "}
          in Kaštelir liegt ideal für Weintouren durch Istrien:
        </p>
        <ul>
          <li>
            <strong>Zentrale Lage</strong> — Von Kaštelir erreichen Sie alle
            wichtigen Weingebiete in 20-50 Minuten. Die{" "}
            <Link href="/umgebung" className="text-terracotta-500">
              Umgebung
            </Link>{" "}
            bietet perfekte Anbindung.
          </li>
          <li>
            <strong>Großer Esstisch innen &amp; außen</strong> — Bringen Sie
            Ihre Weinschätze mit und genießen Sie sie beim Abendessen auf der
            Terrasse mit Meerblick.
          </li>
          <li>
            <strong>Grill &amp; Outdoor-Küche</strong> — Der überdachte
            Grillplatz lädt dazu ein, istrische Spezialitäten selbst
            zuzubereiten — mit einem Glas Malvazija in der Hand.
          </li>
          <li>
            <strong>Pool zur Erholung</strong> — Nach einem Tag voller
            Verkostungen entspannen Sie am 12×8 m großen Pool.
          </li>
          <li>
            <strong>Platz für Gruppen</strong> — Mit bis zu 9 Gästen eignet
            sich die Villa perfekt für einen Weinurlaub mit Freunden.
          </li>
        </ul>
        <p>
          Planen Sie Ihren Weinurlaub in Istrien und erleben Sie die
          Gastfreundschaft, die diese Region so besonders macht. Prüfen Sie
          die{" "}
          <Link href="/buchen" className="text-terracotta-500">
            Verfügbarkeit der Villa Gloria
          </Link>{" "}
          und sichern Sie sich Ihren Termin.
        </p>
      </BlogArticle>
    </>
  );
}
