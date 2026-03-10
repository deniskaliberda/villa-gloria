import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Star } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const testimonials = [
  {
    name: "Familie Schmidt",
    textDe:
      "Die Villa hat unsere Erwartungen übertroffen. Der Pool ist riesig, die Ausstattung erstklassig und der Meerblick atemberaubend.",
    textEn:
      "The villa exceeded our expectations. The pool is huge, the amenities are first-class, and the sea view is breathtaking.",
    textHr:
      "Vila je nadmašila naša očekivanja. Bazen je ogroman, oprema prvoklasna, a pogled na more oduzima dah.",
    rating: 5.0,
  },
  {
    name: "Thomas R.",
    textDe:
      "Wir haben 10 Tage in der Villa verbracht und es waren die besten Ferien seit langem. Der Pool, der Garten, die Ruhe – einfach perfekt.",
    textEn:
      "We spent 10 days at the villa and it was the best holiday in a long time. The pool, the garden, the tranquility – simply perfect.",
    textHr:
      "Proveli smo 10 dana u vili i bio je to najbolji odmor u dugo vremena. Bazen, vrt, mir – jednostavno savršeno.",
    rating: 4.9,
  },
];

type LocaleKey = "de" | "en" | "hr";
const textKey: Record<LocaleKey, keyof (typeof testimonials)[0]> = {
  de: "textDe",
  en: "textEn",
  hr: "textHr",
};

export function ReviewSnippet({ locale }: { locale: string }) {
  const t = useTranslations("home.reviewSnippet");
  const loc = (locale as LocaleKey) || "de";

  return (
    <section className="bg-olive-500 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
            {t("title")}
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="font-accent text-lg font-semibold">
              {t("rating")}
            </span>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {testimonials.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <blockquote className="rounded-card bg-white/10 p-8 backdrop-blur-sm">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(item.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-white/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-lg italic text-white/90">
                  &ldquo;{item[textKey[loc]] as string}&rdquo;
                </p>
                <footer className="mt-4 font-accent text-sm font-semibold text-white/70">
                  — {item.name}
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/bewertungen"
              className="font-accent text-sm font-semibold text-white/80 underline underline-offset-4 transition-colors hover:text-white"
            >
              {t("allReviews")} →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
