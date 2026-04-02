import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import {
  MapPin,
  Waves,
  ShoppingCart,
  UtensilsCrossed,
  Plane,
  Bike,
  Fish,
  Mountain,
  Sailboat,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card, CardContent } from "@/components/ui/Card";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.surroundings" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      images: [{ url: "/images/hero/villa-pool-garden.jpg", width: 1200, height: 800, alt: "Villa Gloria al Padre – Umgebung Istrien" }],
    },
    alternates: {
      canonical: `/${locale}/umgebung`,
      languages: {
        "x-default": "/de/umgebung",
        de: "/de/umgebung",
        en: "/en/umgebung",
      },
    },
  };
}

export default async function SurroundingsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SurroundingsContent />;
}

const distances = [
  { icon: Waves, label: "Strand", distance: "8 km" },
  { icon: ShoppingCart, label: "Einkaufen", distance: "0,7 km" },
  { icon: UtensilsCrossed, label: "Restaurant", distance: "0,8 km" },
  { icon: MapPin, label: "Kaštelir Ortsmitte", distance: "0,7 km" },
  { icon: MapPin, label: "Poreč Zentrum", distance: "~10 km" },
  { icon: MapPin, label: "Autobahnabfahrt", distance: "5 km" },
  { icon: Plane, label: "Flughafen Pula", distance: "55 km" },
];

const activities = [
  { icon: Bike, title: "Radfahren & Mountainbike", desc: "Zahlreiche Rad- und MTB-Strecken durch das hügelige Hinterland Istriens mit Olivenhainen und Weinbergen." },
  { icon: Fish, title: "Tauchen & Schnorcheln", desc: "Kristallklares Wasser entlang der istrischen Küste – Tauchschulen in Poreč und Rovinj." },
  { icon: Mountain, title: "Wandern", desc: "Vom Küstenwanderweg bis zu den Hügeln im Landesinneren – Istrien bietet Routen für jedes Level." },
  { icon: Sailboat, title: "Wassersport", desc: "SUP, Kajak, Wasserski und Bootstouren entlang der malerischen Küste." },
];

const sights = [
  { name: "Poreč", desc: "UNESCO-Welterbe Euphrasius-Basilika, malerische Altstadt und Promenade.", distance: "10 km" },
  { name: "Rovinj", desc: "Die Perle Istriens – romantische Altstadt auf einer Halbinsel mit der Kirche der Hl. Euphemia.", distance: "35 km" },
  { name: "Motovun", desc: "Mittelalterliche Bergstadt über dem Mirna-Tal, berühmt für Trüffel und das Filmfestival.", distance: "25 km" },
  { name: "Grožnjan", desc: "Künstlerdorf mit Galerien, Ateliers und Sommerfestivals hoch über dem istrischen Hinterland.", distance: "20 km" },
];

function SurroundingsContent() {
  const t = useTranslations("surroundings");

  return (
    <main className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal>
          <h1 className="font-display text-4xl font-bold text-dark md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-dark-light">{t("description")}</p>
        </ScrollReveal>

        {/* Distances */}
        <section className="mt-16">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-dark">
              {t("distances")}
            </h2>
          </ScrollReveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {distances.map((item, index) => (
              <ScrollReveal key={item.label} delay={index * 0.05}>
                <div className="flex items-center gap-4 rounded-card bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta-50">
                    <item.icon className="h-5 w-5 text-terracotta-500" />
                  </div>
                  <div>
                    <p className="font-accent text-sm font-semibold text-dark">
                      {item.label}
                    </p>
                    <p className="text-lg font-bold text-terracotta-500">
                      {item.distance}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Activities */}
        <section className="mt-20">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-dark">
              {t("activities")}
            </h2>
          </ScrollReveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {activities.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <Card>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-olive-50">
                        <item.icon className="h-6 w-6 text-olive-500" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-dark">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-dark-light">{item.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Sights */}
        <section className="mt-20">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-dark">
              {t("sights")}
            </h2>
          </ScrollReveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {sights.map((item, index) => (
              <ScrollReveal key={item.name} delay={index * 0.1}>
                <Card variant="outlined">
                  <CardContent>
                    <div className="flex items-start justify-between">
                      <h3 className="font-display text-xl font-bold text-dark">
                        {item.name}
                      </h3>
                      <span className="shrink-0 rounded-full bg-adriatic-50 px-3 py-1 font-accent text-xs font-semibold text-adriatic-600">
                        {item.distance}
                      </span>
                    </div>
                    <p className="mt-2 text-dark-light">{item.desc}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Google Map */}
        <section className="mt-20">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-dark">
              Kaštelir, Istrien
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mt-8 aspect-[16/9] overflow-hidden rounded-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11218.5!2d13.68!3d45.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477c8e0e0e0e0e0e%3A0x0!2sKa%C5%A1telir!5e0!3m2!1sde!2shr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Villa Gloria al Padre - Kaštelir, Istrien"
              />
            </div>
          </ScrollReveal>
        </section>
      </div>
    </main>
  );
}
