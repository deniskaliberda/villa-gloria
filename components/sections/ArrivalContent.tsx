import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Download, FileText, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

type FileKey =
  | "checklistDe"
  | "checklistEn"
  | "passport"
  | "hausordnung"
  | "safe"
  | "utilities";

type LanguageTag = "de" | "en" | "deEn";

type FileItem = {
  key: FileKey;
  lang: LanguageTag;
  sizeKb: number;
};

const beforeArrival: FileItem[] = [
  { key: "passport", lang: "en", sizeKb: 205 },
];

const onSite: FileItem[] = [
  { key: "hausordnung", lang: "de", sizeKb: 256 },
  { key: "safe", lang: "deEn", sizeKb: 62 },
  { key: "utilities", lang: "de", sizeKb: 47 },
];

const beforeDeparture: FileItem[] = [
  { key: "checklistDe", lang: "de", sizeKb: 79 },
  { key: "checklistEn", lang: "en", sizeKb: 143 },
];

export async function ArrivalContent({ locale }: { locale: string }) {
  const t = await getTranslations("arrival");

  return (
    <main className="pt-20 pb-16 md:pt-24 md:pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <header className="max-w-3xl">
          <h1 className="font-display text-3xl font-bold leading-tight text-dark sm:text-4xl md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-base text-dark-light sm:mt-4 sm:text-lg">
            {t("intro")}
          </p>
        </header>

        {/* Groups */}
        <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
          <FileGroup
            groupKey="beforeArrival"
            items={beforeArrival}
            locale={locale}
          />
          <FileGroup groupKey="onSite" items={onSite} locale={locale} />
          <FileGroup
            groupKey="beforeDeparture"
            items={beforeDeparture}
            locale={locale}
          />
        </div>

        {/* Questions block */}
        <aside className="mt-12 rounded-2xl bg-warm/40 p-6 md:mt-16 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="shrink-0 rounded-full bg-terracotta-100 p-2.5 text-terracotta-600 md:p-3">
                <HelpCircle className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-dark md:text-2xl">
                  {t("questionsBlock.title")}
                </h2>
                <p className="mt-1.5 max-w-xl text-sm text-dark-light md:mt-2 md:text-base">
                  {t("questionsBlock.description")}
                </p>
              </div>
            </div>
            <Link href="/kontakt" className="shrink-0 md:self-center">
              <Button size="md" fullWidth>
                {t("questionsBlock.cta")}
              </Button>
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}

async function FileGroup({
  groupKey,
  items,
  locale,
}: {
  groupKey: "beforeArrival" | "onSite" | "beforeDeparture";
  items: FileItem[];
  locale: string;
}) {
  const t = await getTranslations("arrival");

  return (
    <section>
      <div className="border-l-4 border-terracotta-500 pl-3 md:pl-4">
        <h2 className="font-display text-xl font-bold text-dark sm:text-2xl md:text-3xl">
          {t(`groups.${groupKey}.title`)}
        </h2>
        <p className="mt-0.5 text-sm text-dark-light md:mt-1 md:text-base">
          {t(`groups.${groupKey}.description`)}
        </p>
      </div>

      <ul className="mt-4 grid gap-3 sm:mt-5 sm:gap-4 md:grid-cols-2">
        {items.map((item) => (
          <FileCard key={item.key} item={item} locale={locale} />
        ))}
      </ul>
    </section>
  );
}

async function FileCard({
  item,
  locale,
}: {
  item: FileItem;
  locale: string;
}) {
  const t = await getTranslations("arrival");
  const title = t(`files.${item.key}.title`);
  const description = t(`files.${item.key}.description`);
  const filename = t(`files.${item.key}.filename`);
  const languageLabel = t(`languageLabels.${item.lang}`);
  const separator = t("fileMetaSeparator");
  const downloadCta = t("downloadCta");

  return (
    <li className="flex flex-col rounded-xl border border-warm-dark/30 bg-white p-4 transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-start gap-3">
        <div className="shrink-0 rounded-lg bg-olive-50 p-2 text-olive-600">
          <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-bold leading-snug text-dark sm:text-lg">
            {title}
          </h3>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-dark-light/70 sm:text-xs">
            PDF{separator}
            {languageLabel}
            {separator}
            {item.sizeKb} KB
          </p>
        </div>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-dark-light">
        {description}
      </p>

      <a
        href={`/downloads/${filename}`}
        download
        aria-label={`${downloadCta}: ${title}`}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-terracotta-500 px-4 py-2.5 font-accent text-sm font-semibold text-white transition-colors hover:bg-terracotta-600 sm:w-auto sm:self-start sm:py-2"
      >
        <Download className="h-4 w-4" />
        {downloadCta}
      </a>

      <span className="sr-only" lang={item.lang === "deEn" ? locale : item.lang}>
        {languageLabel}
      </span>
    </li>
  );
}
