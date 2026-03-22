import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import {
  Wifi,
  Snowflake,
  Flame,
  WashingMachine,
  Lock,
  Tv,
  CookingPot,
  Car,
  Waves,
  TreePine,
  Volleyball,
  Baby,
  BedDouble,
  Home,
  Building2,
  Fence,
  AlertCircle,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card, CardContent } from "@/components/ui/Card";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.house" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/das-haus`,
      languages: {
        "x-default": "/de/das-haus",
        de: "/de/das-haus",
        en: "/en/das-haus",
        hr: "/hr/das-haus",
      },
    },
  };
}

export default async function HousePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HouseContent />;
}

const amenities = [
  { icon: Wifi, label: "WLAN" },
  { icon: Snowflake, label: "Klimaanlage" },
  { icon: Flame, label: "Kamin" },
  { icon: WashingMachine, label: "Waschmaschine" },
  { icon: Lock, label: "Safe" },
  { icon: Tv, label: "Sat-TV" },
  { icon: CookingPot, label: "Voll ausgest. Küche" },
  { icon: Car, label: "2 Parkplätze" },
  { icon: Waves, label: "Pool 12×8m" },
  { icon: TreePine, label: "Garten 1000m²" },
  { icon: Volleyball, label: "Volleyballfeld" },
  { icon: Baby, label: "Kinderbett verfügbar" },
  { icon: Fence, label: "Grundstück eingezäunt" },
  { icon: AlertCircle, label: "Nicht rollstuhlgerecht" },
];

function HouseContent() {
  const t = useTranslations("house");

  return (
    <main className="pt-24 pb-20">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal>
          <h1 className="font-display text-4xl font-bold text-dark md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-dark-light">{t("description")}</p>
        </ScrollReveal>
      </div>

      {/* Ground Floor */}
      <section className="mt-16">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal>
            <div className="flex items-center gap-3">
              <Home className="h-7 w-7 text-terracotta-500" />
              <h2 className="font-display text-3xl font-bold text-dark">
                {t("groundFloor")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <ScrollReveal delay={0.1}>
              <div className="aspect-[4/3] overflow-hidden rounded-card">
                <img
                  src="/images/living/wohnzimmer.jpg"
                  alt="Wohnzimmer mit Meerblick"
                  className="h-full w-full object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col justify-center">
                <p className="text-lg text-dark-light">
                  Das Erdgeschoss besticht durch offenes Wohnen mit direktem
                  Zugang zur Terrasse und Meerblick. Der großzügige
                  Wohn-Essbereich mit Kamin und Klimaanlage schafft eine warme Atmosphäre. Die
                  voll ausgestattete Küche lässt keine Wünsche offen.
                </p>
                <ul className="mt-6 space-y-2 text-dark-light">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500" />
                    Offener Wohn-Essbereich mit Kamin und Klimaanlage
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500" />
                    Voll ausgestattete Küche (Gasherd, Backofen, Kühlschrank)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500" />
                    Badezimmer mit Dusche, WC, Waschbecken, Waschmaschine und Föhn
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500" />
                    Terrasse mit Panorama-Meerblick
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Upper Floor */}
      <section className="mt-20">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal>
            <div className="flex items-center gap-3">
              <BedDouble className="h-7 w-7 text-terracotta-500" />
              <h2 className="font-display text-3xl font-bold text-dark">
                {t("upperFloor")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col justify-center">
                <p className="text-lg text-dark-light">
                  Das Obergeschoss beherbergt drei komfortable Schlafzimmer mit
                  einer zentralen Klimaanlage für alle Schlafzimmer und ein weiteres Badezimmer mit Dusche, WC, Bidet,
                  Waschbecken und Föhn. Alle Fenster sind mit Fliegengittern ausgestattet.
                  Der besondere Clou: ein kleiner Aussichtsturm mit Panoramablick
                  über Istrien und die Adria.
                </p>

                {/* Bedroom table */}
                <div className="mt-6 overflow-x-auto rounded-card border border-warm">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-sand">
                      <tr>
                        <th className="px-4 py-3 font-accent font-semibold text-dark">
                          Schlafzimmer
                        </th>
                        <th className="px-4 py-3 font-accent font-semibold text-dark">
                          Betten
                        </th>
                        <th className="hidden px-4 py-3 font-accent font-semibold text-dark sm:table-cell">
                          Extras
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-warm">
                      <tr>
                        <td className="px-4 py-3">SZ 1</td>
                        <td className="px-4 py-3">Doppelbett 160×200</td>
                        <td className="hidden px-4 py-3 sm:table-cell">
                          Kleiderschrank
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">SZ 2</td>
                        <td className="px-4 py-3">Doppel 140×200 + Einzel</td>
                        <td className="hidden px-4 py-3 sm:table-cell">
                          Kleiderschrank, Kommode
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">SZ 3</td>
                        <td className="px-4 py-3">Doppelbett 140×200</td>
                        <td className="hidden px-4 py-3 sm:table-cell">
                          Kommode
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="aspect-[4/3] overflow-hidden rounded-card">
                <img
                  src="/images/bedrooms/schlafzimmer-1.jpg"
                  alt="Schlafzimmer mit Doppelbett"
                  className="h-full w-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Pool Apartment */}
      <section className="mt-20 bg-adriatic-50/50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal>
            <div className="flex items-center gap-3">
              <Building2 className="h-7 w-7 text-adriatic-500" />
              <h2 className="font-display text-3xl font-bold text-dark">
                {t("apartment")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <ScrollReveal delay={0.1}>
              <div className="aspect-[4/3] overflow-hidden rounded-card">
                <img
                  src="/images/apartment/apartment-living.jpg"
                  alt="Poolwohnung"
                  className="h-full w-full object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col justify-center">
                <p className="text-lg text-dark-light">
                  Die Poolwohnung mit separatem Eingang ist das perfekte
                  Apartment für 2 Gäste plus Aufbettung. Mit einem
                  Schlafzimmer (Doppelbett), Schlafsofa für 2 Personen, Wohnküche, Bad und direktem Poolzugang bietet
                  sie vollständige Unabhängigkeit. Von Mitte März bis Mitte Oktober
                  auch separat buchbar (Mindestaufenthalt 6 Nächte).
                </p>
                <ul className="mt-6 space-y-2 text-dark-light">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-adriatic-500" />
                    Separater Eingang
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-adriatic-500" />
                    Schlafzimmer mit Doppelbett + Schlafsofa für 2 Personen
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-adriatic-500" />
                    Voll ausgestattete Küchenzeile mit Spülmaschine
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-adriatic-500" />
                    Eigene BBQ-Terrasse
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-adriatic-500" />
                    Direkter Poolzugang
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Outdoor Area */}
      <section className="mt-20">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal>
            <div className="flex items-center gap-3">
              <Waves className="h-7 w-7 text-terracotta-500" />
              <h2 className="font-display text-3xl font-bold text-dark">
                {t("outdoor")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ScrollReveal delay={0.1}>
              <div className="aspect-[4/3] overflow-hidden rounded-card">
                <img
                  src="/images/pool/pool-panorama.jpg"
                  alt="Pool mit Meerblick"
                  className="h-full w-full object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="aspect-[4/3] overflow-hidden rounded-card">
                <img
                  src="/images/garden/garten-volleyball.jpg"
                  alt="Garten und Volleyballfeld"
                  className="h-full w-full object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="aspect-[4/3] overflow-hidden rounded-card">
                <img
                  src="/images/garden/rosenpavillon.jpg"
                  alt="Rosenpavillon"
                  className="h-full w-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.25}>
            <p className="mt-8 text-lg text-dark-light">
              Das komplett eingezäunte Grundstück von 1.000 m² bietet reichlich Platz für
              Erholung und Aktivitäten: Ein Pool (12×8 m) mit
              Sonnenliegen, ein Volleyballfeld, ein Basketballkorb, ein
              romantischer Rosenpavillon und ein überdachter Grillplatz.
              Poolheizung auf Anfrage (Tagessatz 58,– €). 2 Reserve-Gasflaschen für den Grill vorrätig.
              Doppelparkplatz direkt am Haus.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="mt-20 bg-sand py-16">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal>
            <h2 className="text-center font-display text-3xl font-bold text-dark">
              {t("amenities")}
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {amenities.map((item, index) => (
              <ScrollReveal key={item.label} delay={index * 0.03}>
                <Card variant="flat" className="text-center">
                  <CardContent className="flex flex-col items-center gap-3 p-4">
                    <item.icon className="h-8 w-8 text-olive-500" />
                    <span className="font-accent text-xs font-semibold text-dark-light">
                      {item.label}
                    </span>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
