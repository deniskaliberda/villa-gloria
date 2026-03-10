import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTABanner() {
  const t = useTranslations("home.cta");
  const tNav = useTranslations("nav");

  return (
    <section className="relative overflow-hidden bg-terracotta-500 py-20">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-terracotta-400/30" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-terracotta-600/30" />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-white/80">{t("subtitle")}</p>
          <div className="mt-8">
            <Link href="/buchen">
              <Button
                variant="secondary"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-terracotta-500"
              >
                {tNav("bookNow")}
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
