import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.reviews" });
  return { title: t("title"), description: t("description") };
}

const reviewSchemaData = {
  "@context": "https://schema.org",
  "@type": "VacationRental",
  "name": "Villa Gloria al Padre",
  "url": "https://villa-gloria-istrien.de",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "5",
    "bestRating": "5",
  },
  "review": [
    { "@type": "Review", "author": { "@type": "Person", "name": "Familie M." }, "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "name": "Traumhafter Urlaub in Istrien" },
    { "@type": "Review", "author": { "@type": "Person", "name": "Thomas K." }, "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "name": "Perfekte Villa für Familienurlaub" },
    { "@type": "Review", "author": { "@type": "Person", "name": "Sandra W." }, "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "name": "Wunderschön gelegen" },
    { "@type": "Review", "author": { "@type": "Person", "name": "Michael R." }, "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "name": "Ruheoase in Istrien" },
    { "@type": "Review", "author": { "@type": "Person", "name": "Julia H." }, "reviewRating": { "@type": "Rating", "ratingValue": "4", "bestRating": "5" }, "name": "Top-Ferienhaus" },
  ],
};

export default async function ReviewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchemaData) }}
      />
      <ReviewsContent />
    </>
  );
}

const overallRating = 4.9;
const categoryRatings = [
  { key: "equipment", rating: 5.0 },
  { key: "value", rating: 4.8 },
  { key: "service", rating: 5.0 },
  { key: "location", rating: 4.6 },
  { key: "cleanliness", rating: 4.8 },
];

const reviews = [
  {
    name: "Familie Schmidt",
    location: "Deutschland",
    date: "August 2024",
    rating: 5.0,
    title: "Traumhafter Urlaub in Istrien",
    text: "Die Villa hat unsere Erwartungen übertroffen. Der Pool ist riesig, die Ausstattung erstklassig und der Meerblick atemberaubend. Die Kinder haben den Volleyballplatz geliebt. Wir kommen definitiv wieder!",
    tags: ["Familien", "Gruppen"],
  },
  {
    name: "Markus W.",
    location: "Österreich",
    date: "Juli 2024",
    rating: 5.0,
    title: "Perfekte Villa für Familienurlaub",
    text: "Wunderschöne Villa mit allem was man braucht. Die Poolwohnung ist ideal für Großeltern oder Teenager die etwas Privatsphäre möchten. Sehr sauber und gepflegt.",
    tags: ["Familien", "Paare"],
  },
  {
    name: "Andrea K.",
    location: "Deutschland",
    date: "Juni 2024",
    rating: 4.8,
    title: "Wunderschön gelegen",
    text: "Traumhafte Lage mit Blick aufs Meer. Die Villa ist geschmackvoll eingerichtet und der Garten wunderschön. Der Vermieter war sehr freundlich und hilfsbereit. Poreč und Rovinj sind schnell erreichbar.",
    tags: ["Paare", "Familien"],
  },
  {
    name: "Thomas R.",
    location: "Schweiz",
    date: "September 2024",
    rating: 4.9,
    title: "Ruheoase in Istrien",
    text: "Wir haben 10 Tage in der Villa verbracht und es waren die besten Ferien seit langem. Der Pool, der Garten, die Ruhe – einfach perfekt zum Entspannen. Die Küche ist toll ausgestattet.",
    tags: ["Paare", "Familien"],
  },
  {
    name: "Julia & Peter",
    location: "Deutschland",
    date: "Mai 2024",
    rating: 4.7,
    title: "Top-Ferienhaus",
    text: "Alles bestens! Schöne Villa, toller Pool, nette Vermieter. Istrien ist sowieso eine Reise wert und die Villa macht den Urlaub perfekt. Gerne wieder!",
    tags: ["Paare", "Gruppen"],
  },
];

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

function ReviewsContent() {
  const t = useTranslations("reviews");
  const tCommon = useTranslations("common");

  return (
    <main className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal>
          <h1 className="font-display text-4xl font-bold text-dark md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-dark-light">{t("description")}</p>
        </ScrollReveal>

        {/* Overall Rating */}
        <ScrollReveal delay={0.1}>
          <Card className="mt-12">
            <CardContent className="p-8">
              <div className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
                <div className="text-center">
                  <span className="font-display text-6xl font-bold text-terracotta-500">
                    {overallRating}
                  </span>
                  <p className="mt-1 font-accent text-sm text-dark-light">
                    {t("outOf")}
                  </p>
                  <StarRating rating={overallRating} size={24} />
                  <p className="mt-2 text-sm text-dark-light">
                    {t("basedOn", { count: reviews.length })}
                  </p>
                </div>

                <div className="flex-1 space-y-3">
                  {categoryRatings.map((cat) => (
                    <div key={cat.key} className="flex items-center gap-4">
                      <span className="w-20 shrink-0 font-accent text-xs text-dark-light sm:w-28 sm:text-sm">
                        {t(`categories.${cat.key}`)}
                      </span>
                      <div className="flex-1">
                        <div className="h-2.5 rounded-full bg-warm">
                          <div
                            className="h-2.5 rounded-full bg-terracotta-500 transition-all"
                            style={{ width: `${(cat.rating / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="w-8 text-right font-accent text-sm font-semibold text-dark">
                        {cat.rating}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Individual Reviews */}
        <div className="mt-12 space-y-6">
          {reviews.map((review, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <Card variant="outlined">
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-dark">
                        {review.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-3">
                        <StarRating rating={review.rating} />
                        <span className="text-sm text-dark-light">
                          {review.rating}
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 text-sm text-dark-light">
                      {review.date}
                    </span>
                  </div>
                  <p className="mt-4 text-dark-light">{review.text}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="font-accent text-sm font-semibold text-dark">
                      {review.name}
                    </span>
                    <span className="text-sm text-dark-light">
                      {review.location}
                    </span>
                    <div className="flex gap-2">
                      {review.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-olive-50 px-2.5 py-0.5 text-xs text-olive-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16 text-center">
            <p className="font-display text-2xl font-bold text-dark">
              {t("convinced")}
            </p>
            <div className="mt-6">
              <Link href="/buchen">
                <Button size="lg">{tCommon("bookNow")}</Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
