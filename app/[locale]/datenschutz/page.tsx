import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations("legal");

  return (
    <main className="mx-auto max-w-3xl px-4 pt-28 pb-20">
      <h1 className="font-display text-4xl font-bold text-dark">
        {t("privacy")}
      </h1>
      <div className="prose prose-lg mt-8 text-dark-light">
        <p>[Datenschutzerklärung wird vor Go-Live ergänzt]</p>
      </div>
    </main>
  );
}
