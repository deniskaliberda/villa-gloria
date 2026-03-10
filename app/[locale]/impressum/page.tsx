import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ImprintPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ImprintContent />;
}

function ImprintContent() {
  const t = useTranslations("legal");

  return (
    <main className="mx-auto max-w-3xl px-4 pt-28 pb-20">
      <h1 className="font-display text-4xl font-bold text-dark">
        {t("imprint")}
      </h1>
      <div className="prose prose-lg mt-8 text-dark-light">
        <p>
          <strong>Villa Gloria al Padre</strong>
          <br />
          [Angaben werden vor Go-Live ergänzt]
        </p>
      </div>
    </main>
  );
}
