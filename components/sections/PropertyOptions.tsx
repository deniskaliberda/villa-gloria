import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Home, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function PropertyOptions() {
  const t = useTranslations("home.rentalOptions");
  const tCommon = useTranslations("common");

  return (
    <section className="bg-sand py-20">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold text-dark md:text-4xl">
            {t("title")}
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Whole House */}
          <ScrollReveal delay={0.1}>
            <Card className="h-full">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/hero/villa-pool-seaview.jpg"
                  alt={t("wholeHouse.title")}
                  width={665}
                  height={443}
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-terracotta-500 px-4 py-1.5 font-accent text-sm font-semibold text-white">
                    {tCommon("from")} 250 €/{tCommon("perNight")}
                  </span>
                </div>
              </div>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive-50">
                    <Home className="h-5 w-5 text-olive-500" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-dark">
                    {t("wholeHouse.title")}
                  </h3>
                </div>
                <p className="mt-3 text-dark-light">
                  {t("wholeHouse.description")}
                </p>
                <p className="mt-2 font-accent text-sm text-dark-light/70">
                  {t("wholeHouse.details")}
                </p>
                <div className="mt-6">
                  <Link href="/buchen">
                    <Button fullWidth>{tCommon("bookNow")}</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Apartment */}
          <ScrollReveal delay={0.2}>
            <Card className="h-full">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/apartment/apartment-living.jpg"
                  alt={t("apartment.title")}
                  width={665}
                  height={443}
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-adriatic-500 px-4 py-1.5 font-accent text-sm font-semibold text-white">
                    {tCommon("from")} 90 €/{tCommon("perNight")}
                  </span>
                </div>
              </div>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-adriatic-50">
                    <Building2 className="h-5 w-5 text-adriatic-500" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-dark">
                    {t("apartment.title")}
                  </h3>
                </div>
                <p className="mt-3 text-dark-light">
                  {t("apartment.description")}
                </p>
                <p className="mt-2 font-accent text-sm text-dark-light/70">
                  {t("apartment.details")}
                </p>
                <div className="mt-6">
                  <Link href="/buchen">
                    <Button variant="accent" fullWidth>
                      {tCommon("bookNow")}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
