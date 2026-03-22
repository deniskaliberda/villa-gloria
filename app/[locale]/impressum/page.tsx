import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.impressum" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/impressum`,
      languages: {
        "x-default": "/de/impressum",
        de: "/de/impressum",
        en: "/en/impressum",
        hr: "/hr/impressum",
      },
    },
  };
}

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
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          <strong>Villa Gloria al Padre</strong>
          <br />
          Ferienhaus in Kaštelir, Istrien, Kroatien
        </p>
        <p>
          <strong>Eigentümer und Betreiber:</strong>
          <br />
          [VORNAME NACHNAME]
          <br />
          [STRASSE]
          <br />
          [PLZ ORT, LAND]
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: [+XX XXX XXXXXXX]
          <br />
          E-Mail:{" "}
          <a href="mailto:info@villa-gloria-istrien.de">
            info@villa-gloria-istrien.de
          </a>
          <br />
          Website:{" "}
          <a
            href="https://www.villa-gloria-istrien.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.villa-gloria-istrien.de
          </a>
        </p>

        <h2>Umsatzsteuer-Identifikationsnummer</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a
          Umsatzsteuergesetz bzw. kroatische OIB:
          <br />
          [USt-IdNr. / OIB FALLS VORHANDEN]
        </p>

        <h2>
          Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV
        </h2>
        <p>
          [VORNAME NACHNAME]
          <br />
          [STRASSE]
          <br />
          [PLZ ORT, LAND]
        </p>

        <h2>EU-Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://consumer-redress.ec.europa.eu/dispute-resolution-bodies_en"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://consumer-redress.ec.europa.eu/dispute-resolution-bodies_en
          </a>
          .
        </p>
        <p>
          Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir
          sind nicht bereit oder verpflichtet, an
          Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2>Haftungsausschluss</h2>

        <h3>Haftung für Inhalte</h3>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für
          eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir
          als Diensteanbieter jedoch nicht verpflichtet,
          übermittelte oder gespeicherte fremde Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine
          rechtswidrige Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung
          von Informationen nach den allgemeinen Gesetzen bleiben
          hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
          erst ab dem Zeitpunkt der Kenntnis einer konkreten
          Rechtsverletzung möglich. Bei Bekanntwerden von
          entsprechenden Rechtsverletzungen werden wir diese Inhalte
          umgehend entfernen.
        </p>

        <h3>Haftung für Links</h3>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter,
          auf deren Inhalte wir keinen Einfluss haben. Deshalb
          können wir für diese fremden Inhalte auch keine Gewähr
          übernehmen. Für die Inhalte der verlinkten Seiten ist
          stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt
          der Verlinkung auf mögliche Rechtsverstöße überprüft.
          Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung
          nicht erkennbar.
        </p>
        <p>
          Eine permanente inhaltliche Kontrolle der verlinkten
          Seiten ist jedoch ohne konkrete Anhaltspunkte einer
          Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
          Rechtsverletzungen werden wir derartige Links umgehend
          entfernen.
        </p>

        <h3>Urheberrecht</h3>
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke
          auf diesen Seiten unterliegen dem deutschen Urheberrecht.
          Die Vervielfältigung, Bearbeitung, Verbreitung und jede
          Art der Verwertung außerhalb der Grenzen des
          Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers. Downloads und Kopien
          dieser Seite sind nur für den privaten, nicht
          kommerziellen Gebrauch gestattet.
        </p>
        <p>
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber
          erstellt wurden, werden die Urheberrechte Dritter
          beachtet. Insbesondere werden Inhalte Dritter als solche
          gekennzeichnet. Sollten Sie trotzdem auf eine
          Urheberrechtsverletzung aufmerksam werden, bitten wir um
          einen entsprechenden Hinweis. Bei Bekanntwerden von
          Rechtsverletzungen werden wir derartige Inhalte umgehend
          entfernen.
        </p>

        <h2>Website-Erstellung</h2>
        <p>
          Diese Website wurde erstellt von:
          <br />
          <strong>MyHiwi UG (haftungsbeschränkt)</strong>
          <br />
          E-Mail:{" "}
          <a href="mailto:denis.kaliberda@gmail.com">
            denis.kaliberda@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
