import { useTranslations } from "next-intl";
import { Users, BedDouble, Bath, Waves, Eye } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const facts = [
  { icon: Users, value: "9", translationKey: "guests" },
  { icon: BedDouble, value: "4", translationKey: "bedrooms" },
  { icon: Bath, value: "3", translationKey: "bathrooms" },
  { icon: Waves, value: "12m", translationKey: "pool" },
  { icon: Eye, value: "", translationKey: "seaView" },
] as const;

export function QuickFacts() {
  const t = useTranslations("common");
  const tHome = useTranslations("home.quickFacts");

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold text-dark md:text-4xl">
            {tHome("title")}
          </h2>
        </ScrollReveal>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {facts.map((fact, index) => (
            <ScrollReveal key={fact.translationKey} delay={index * 0.1}>
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-terracotta-50">
                  <fact.icon className="h-7 w-7 text-terracotta-500" />
                </div>
                {fact.value && (
                  <span className="font-display text-2xl font-bold text-dark">
                    {fact.value}
                  </span>
                )}
                <span className="font-accent text-sm font-semibold uppercase tracking-wider text-dark-light">
                  {t(fact.translationKey)}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
