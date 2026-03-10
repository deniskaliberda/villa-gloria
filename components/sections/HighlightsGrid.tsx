import { useTranslations } from "next-intl";
import {
  Waves,
  Volleyball,
  Flame,
  TreePine,
  Eye,
  Car,
  Wifi,
  Snowflake,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const highlights = [
  {
    icon: Waves,
    titleDe: "Privater Pool",
    titleEn: "Private Pool",
    titleHr: "Privatni bazen",
    descDe: "12×8 m beheizter Pool mit Sonnenliegen und Meerblick",
    descEn: "12×8 m heated pool with sun loungers and sea view",
    descHr: "Grijani bazen 12×8 m s ležaljkama i pogledom na more",
  },
  {
    icon: Volleyball,
    titleDe: "Sport & Spaß",
    titleEn: "Sports & Fun",
    titleHr: "Sport i zabava",
    descDe: "Volleyballfeld, Basketballkorb und weitläufiger Garten",
    descEn: "Volleyball court, basketball hoop and spacious garden",
    descHr: "Odbojkaško igralište, košarkaški koš i prostrani vrt",
  },
  {
    icon: Flame,
    titleDe: "BBQ & Terrasse",
    titleEn: "BBQ & Terrace",
    titleHr: "Roštilj i terasa",
    descDe: "Überdachter Grillplatz und Terrasse mit Meerblick",
    descEn: "Covered BBQ area and terrace with sea view",
    descHr: "Natkriveni roštilj i terasa s pogledom na more",
  },
  {
    icon: TreePine,
    titleDe: "Rosenpavillon",
    titleEn: "Rose Pavilion",
    titleHr: "Paviljon s ružama",
    descDe: "Romantischer Gartenpavillon im gepflegten Rosengarten",
    descEn: "Romantic garden pavilion in a well-kept rose garden",
    descHr: "Romantični vrtni paviljon u uređenom ružičnjaku",
  },
  {
    icon: Eye,
    titleDe: "Meerblick",
    titleEn: "Sea View",
    titleHr: "Pogled na more",
    descDe: "Panoramablick auf die Adria von der Terrasse und dem Aussichtsturm",
    descEn: "Panoramic view of the Adriatic from the terrace and lookout tower",
    descHr: "Panoramski pogled na Jadran s terase i vidikovca",
  },
  {
    icon: Car,
    titleDe: "Doppelparkplatz",
    titleEn: "Double Parking",
    titleHr: "Dvostruko parkiralište",
    descDe: "Privater Parkplatz für 2 Fahrzeuge direkt am Haus",
    descEn: "Private parking for 2 vehicles right at the house",
    descHr: "Privatno parkiralište za 2 vozila uz kuću",
  },
  {
    icon: Wifi,
    titleDe: "Highspeed-WLAN",
    titleEn: "High-Speed WiFi",
    titleHr: "Brzi WiFi",
    descDe: "Schnelles WLAN im gesamten Haus und Garten",
    descEn: "Fast WiFi throughout the house and garden",
    descHr: "Brzi WiFi u cijeloj kući i vrtu",
  },
  {
    icon: Snowflake,
    titleDe: "Klimaanlage",
    titleEn: "Air Conditioning",
    titleHr: "Klima uređaj",
    descDe: "Klimaanlage in allen Schlafzimmern für angenehme Nächte",
    descEn: "Air conditioning in all bedrooms for comfortable nights",
    descHr: "Klima uređaj u svim spavaćim sobama za ugodne noći",
  },
];

type LocaleKey = "de" | "en" | "hr";

const titleKey: Record<LocaleKey, keyof (typeof highlights)[0]> = {
  de: "titleDe",
  en: "titleEn",
  hr: "titleHr",
};
const descKey: Record<LocaleKey, keyof (typeof highlights)[0]> = {
  de: "descDe",
  en: "descEn",
  hr: "descHr",
};

export function HighlightsGrid({ locale }: { locale: string }) {
  const t = useTranslations("home.highlights");
  const loc = (locale as LocaleKey) || "de";

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold text-dark md:text-4xl">
            {t("title")}
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="group rounded-card p-6 transition-all hover:bg-sand hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-olive-50 transition-colors group-hover:bg-olive-100">
                  <item.icon className="h-6 w-6 text-olive-500" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-dark">
                  {item[titleKey[loc]] as string}
                </h3>
                <p className="mt-2 text-sm text-dark-light">
                  {item[descKey[loc]] as string}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
