import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.datenschutz" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/datenschutz`,
      languages: {
        "x-default": "/de/datenschutz",
        de: "/de/datenschutz",
        en: "/en/datenschutz",
      },
    },
  };
}

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
        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlicher im Sinne der Datenschutz-Grundverordnung
          (DSGVO) und anderer nationaler Datenschutzgesetze der
          Mitgliedsstaaten sowie sonstiger datenschutzrechtlicher
          Bestimmungen ist:
        </p>
        <p>
          [VORNAME NACHNAME]
          <br />
          [STRASSE]
          <br />
          [PLZ ORT, LAND]
          <br />
          E-Mail:{" "}
          <a href="mailto:info@villa-gloria-istrien.de">
            info@villa-gloria-istrien.de
          </a>
          <br />
          Telefon: [+XX XXX XXXXXXX]
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

        <h2>2. Übersicht der Verarbeitungen</h2>
        <p>
          Die nachfolgende Übersicht fasst die Arten der
          verarbeiteten Daten und die Zwecke ihrer Verarbeitung
          zusammen und verweist auf die betroffenen Personen:
        </p>
        <h3>Arten der verarbeiteten Daten</h3>
        <ul>
          <li>Bestandsdaten (z.&nbsp;B. Name, Adresse)</li>
          <li>
            Kontaktdaten (z.&nbsp;B. E-Mail-Adresse,
            Telefonnummer)
          </li>
          <li>
            Inhaltsdaten (z.&nbsp;B. Nachrichten über das
            Kontaktformular)
          </li>
          <li>
            Buchungsdaten (z.&nbsp;B. Reisedaten, Gästeanzahl,
            Haustierinformationen)
          </li>
          <li>
            Zahlungsdaten (verarbeitet durch Stripe, nicht auf
            unseren Servern gespeichert)
          </li>
          <li>
            Nutzungsdaten (z.&nbsp;B. aufgerufene Seiten,
            Zugriffszeiten)
          </li>
          <li>
            Meta-/Kommunikationsdaten (z.&nbsp;B. IP-Adresse,
            Browsertyp)
          </li>
        </ul>
        <h3>Zwecke der Verarbeitung</h3>
        <ul>
          <li>
            Bereitstellung der Website und ihrer Funktionen
          </li>
          <li>Bearbeitung von Kontaktanfragen</li>
          <li>Buchungsabwicklung und Vertragsdurchführung</li>
          <li>Zahlungsabwicklung</li>
          <li>Versand von transaktionalen E-Mails</li>
          <li>
            Sicherheitsmaßnahmen und Schutz vor Missbrauch
          </li>
        </ul>

        <h2>3. Rechtsgrundlagen</h2>
        <p>
          Im Folgenden erhalten Sie eine Übersicht der
          Rechtsgrundlagen der DSGVO, auf deren Basis wir
          personenbezogene Daten verarbeiten:
        </p>
        <ul>
          <li>
            <strong>
              Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):
            </strong>{" "}
            Die betroffene Person hat ihre Einwilligung in die
            Verarbeitung der sie betreffenden personenbezogenen
            Daten für einen oder mehrere bestimmte Zwecke gegeben.
          </li>
          <li>
            <strong>
              Vertragserfüllung und vorvertragliche Anfragen (Art. 6
              Abs. 1 lit. b DSGVO):
            </strong>{" "}
            Die Verarbeitung ist für die Erfüllung eines Vertrags,
            dessen Vertragspartei die betroffene Person ist, oder
            zur Durchführung vorvertraglicher Maßnahmen
            erforderlich, die auf Anfrage der betroffenen Person
            erfolgen.
          </li>
          <li>
            <strong>
              Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO):
            </strong>{" "}
            Die Verarbeitung ist zur Wahrung der berechtigten
            Interessen des Verantwortlichen oder eines Dritten
            erforderlich, sofern nicht die Interessen oder
            Grundrechte und Grundfreiheiten der betroffenen Person
            überwiegen.
          </li>
        </ul>

        <h2>4. Hosting</h2>
        <p>
          Unsere Website wird bei folgendem Anbieter gehostet:
        </p>
        <p>
          <strong>Vercel Inc.</strong>
          <br />
          440 N Barranca Ave #4133
          <br />
          Covina, CA 91723, USA
          <br />
          Website:{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            vercel.com
          </a>
        </p>
        <p>
          Vercel ist ein Cloud-Hosting-Dienst, der unsere Website
          über ein globales Edge-Netzwerk ausliefert. Beim Aufruf
          unserer Website werden automatisch Informationen vom
          Browser des Nutzers an Vercel übermittelt und in
          sogenannten Server-Log-Dateien gespeichert. Dazu gehören:
        </p>
        <ul>
          <li>IP-Adresse des anfragenden Rechners</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>
            Name und URL der abgerufenen Seite
          </li>
          <li>Übertragene Datenmenge</li>
          <li>Browsertyp und -version</li>
          <li>Verwendetes Betriebssystem</li>
          <li>Referrer URL</li>
        </ul>
        <p>
          Die Verarbeitung erfolgt auf Grundlage unseres
          berechtigten Interesses an der sicheren und effizienten
          Bereitstellung unserer Website (Art. 6 Abs. 1 lit. f
          DSGVO).
        </p>
        <p>
          Vercel ist unter dem EU-US Data Privacy Framework
          zertifiziert und hat sich damit verpflichtet, die
          EU-Datenschutzstandards einzuhalten. Weitere Informationen
          finden Sie in der{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzerklärung von Vercel
          </a>
          .
        </p>

        <h2>5. Datenbank</h2>
        <p>
          Für die Speicherung von Buchungs- und Kontaktdaten nutzen
          wir:
        </p>
        <p>
          <strong>Supabase Inc.</strong>
          <br />
          970 Toa Payoh North #07-04
          <br />
          Singapore 318992
          <br />
          Website:{" "}
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            supabase.com
          </a>
        </p>
        <p>
          Die Datenbank (PostgreSQL) wird in einem Rechenzentrum in{" "}
          <strong>Frankfurt am Main, Deutschland (EU)</strong>{" "}
          betrieben. Damit verbleiben alle gespeicherten
          personenbezogenen Daten innerhalb der Europäischen Union.
        </p>
        <p>
          Die Verarbeitung erfolgt auf Grundlage der
          Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO) sowie
          unserer berechtigten Interessen an einer sicheren und
          zuverlässigen Datenspeicherung (Art. 6 Abs. 1 lit. f
          DSGVO).
        </p>

        <h2>6. Kontaktformular</h2>
        <p>
          Wenn Sie uns über das Kontaktformular auf unserer Website
          eine Nachricht senden, werden folgende Daten erhoben:
        </p>
        <ul>
          <li>Name (Pflichtfeld)</li>
          <li>E-Mail-Adresse (Pflichtfeld)</li>
          <li>Telefonnummer (freiwillig)</li>
          <li>Ihre Nachricht (Pflichtfeld)</li>
        </ul>
        <p>
          Diese Daten werden ausschließlich zur Bearbeitung Ihrer
          Anfrage verwendet und in unserer Datenbank (Supabase,
          Frankfurt) gespeichert. Die Rechtsgrundlage für die
          Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO
          (vorvertragliche Maßnahmen bzw. Vertragserfüllung).
        </p>
        <p>
          Die Daten werden gelöscht, sobald sie für die Erreichung
          des Zwecks ihrer Erhebung nicht mehr erforderlich sind.
          Für personenbezogene Daten aus Kontaktanfragen ist dies
          der Fall, wenn die jeweilige Konversation beendet ist und
          keine vertragliche oder gesetzliche Aufbewahrungspflicht
          besteht.
        </p>

        <h2>7. Buchungssystem</h2>
        <p>
          Bei einer Buchung über unsere Website werden folgende
          Daten erhoben:
        </p>
        <ul>
          <li>Vor- und Nachname (Pflichtfeld)</li>
          <li>E-Mail-Adresse (Pflichtfeld)</li>
          <li>Telefonnummer (Pflichtfeld)</li>
          <li>Land / Herkunftsland (Pflichtfeld)</li>
          <li>Anzahl der Gäste (Pflichtfeld)</li>
          <li>
            Gewünschter Reisezeitraum (An- und Abreisedatum,
            Pflichtfeld)
          </li>
          <li>
            Angaben zu Haustieren (optional, falls zutreffend)
          </li>
          <li>Zusätzliche Nachricht (freiwillig)</li>
        </ul>
        <p>
          Diese Daten sind für die Durchführung des Buchungsvorgangs
          und die Erfüllung des Mietvertrags erforderlich. Die
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
          (Vertragserfüllung).
        </p>
        <p>
          Buchungsdaten werden für die Dauer des Vertragsverhältnisses
          sowie darüber hinaus gemäß den gesetzlichen
          Aufbewahrungspflichten (insbesondere steuer- und
          handelsrechtliche Aufbewahrungsfristen von bis zu 10
          Jahren) gespeichert.
        </p>

        <h2>8. Zahlungsabwicklung</h2>
        <p>
          Für die Zahlungsabwicklung nutzen wir den Dienst:
        </p>
        <p>
          <strong>Stripe Inc.</strong>
          <br />
          354 Oyster Point Blvd
          <br />
          South San Francisco, CA 94080, USA
          <br />
          Website:{" "}
          <a
            href="https://stripe.com/de"
            target="_blank"
            rel="noopener noreferrer"
          >
            stripe.com
          </a>
        </p>
        <p>
          Bei einer Zahlung werden Ihre Zahlungsdaten
          (Kreditkartendaten, Bankverbindung o.&nbsp;Ä.) direkt von
          Stripe erhoben und verarbeitet. Wir selbst speichern keine
          vollständigen Zahlungsdaten auf unseren Servern. Stripe
          ist PCI-DSS-zertifiziert und erfüllt damit die höchsten
          Sicherheitsstandards für die Verarbeitung von
          Zahlungsdaten.
        </p>
        <p>
          Stripe ist unter dem EU-US Data Privacy Framework
          zertifiziert. Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
          DSGVO (Vertragserfüllung). Weitere Informationen finden
          Sie in der{" "}
          <a
            href="https://stripe.com/de/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzerklärung von Stripe
          </a>
          .
        </p>

        <h2>9. E-Mail-Versand</h2>
        <p>
          Für den Versand transaktionaler E-Mails (z.&nbsp;B.
          Buchungsbestätigungen, Zahlungserinnerungen,
          Kontaktantworten) nutzen wir:
        </p>
        <p>
          <strong>Resend Inc.</strong>
          <br />
          San Francisco, CA, USA
          <br />
          Website:{" "}
          <a
            href="https://resend.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            resend.com
          </a>
        </p>
        <p>
          Beim Versand von E-Mails werden Ihre E-Mail-Adresse und
          Ihr Name an Resend übermittelt. Es werden ausschließlich
          transaktionale E-Mails versendet, die in direktem
          Zusammenhang mit Ihrer Buchung oder Anfrage stehen. Es
          erfolgt kein Newsletter-Versand und kein E-Mail-Marketing.
        </p>
        <p>
          Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
          (Vertragserfüllung). Weitere Informationen finden Sie in
          der{" "}
          <a
            href="https://resend.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzerklärung von Resend
          </a>
          .
        </p>

        <h2>10. Cookies</h2>
        <p>
          Unsere Website verwendet ausschließlich{" "}
          <strong>technisch notwendige Cookies</strong>. Es werden
          keine Tracking-Cookies, Marketing-Cookies oder Cookies
          von Drittanbietern eingesetzt.
        </p>
        <p>Folgende technisch notwendige Cookies werden gesetzt:</p>
        <table>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Zweck</th>
              <th>Speicherdauer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NEXT_LOCALE</td>
              <td>
                Speicherung der vom Nutzer gewählten
                Spracheinstellung (Deutsch/Englisch/Kroatisch)
              </td>
              <td>1 Jahr</td>
            </tr>
          </tbody>
        </table>
        <p>
          Da ausschließlich technisch notwendige Cookies verwendet
          werden, ist keine Einwilligung gemäß Art. 6 Abs. 1 lit. a
          DSGVO erforderlich. Die Rechtsgrundlage ist Art. 6 Abs. 1
          lit. f DSGVO (berechtigtes Interesse an der
          funktionsfähigen Bereitstellung der Website).
        </p>

        <h2>11. Keine Analyse-Tools</h2>
        <p>
          Wir setzen derzeit <strong>keine Analyse-Tools</strong>{" "}
          ein. Es wird kein Google Analytics, kein Matomo, kein
          Facebook Pixel und kein sonstiges Tracking- oder
          Analysewerkzeug verwendet. Es findet keine
          Nutzerprofilbildung und kein Tracking über mehrere
          Websites hinweg statt.
        </p>
        <p>
          Sollte in Zukunft ein Analyse-Tool eingesetzt werden, wird
          diese Datenschutzerklärung entsprechend aktualisiert und
          — sofern erforderlich — Ihre Einwilligung eingeholt.
        </p>

        <h2>12. Betroffenenrechte</h2>
        <p>
          Als betroffene Person haben Sie gemäß der DSGVO folgende
          Rechte gegenüber dem Verantwortlichen:
        </p>
        <ul>
          <li>
            <strong>Recht auf Auskunft (Art. 15 DSGVO):</strong> Sie
            haben das Recht, Auskunft über Ihre von uns
            verarbeiteten personenbezogenen Daten zu verlangen.
          </li>
          <li>
            <strong>
              Recht auf Berichtigung (Art. 16 DSGVO):
            </strong>{" "}
            Sie haben das Recht, die unverzügliche Berichtigung
            unrichtiger oder die Vervollständigung Ihrer bei uns
            gespeicherten personenbezogenen Daten zu verlangen.
          </li>
          <li>
            <strong>Recht auf Löschung (Art. 17 DSGVO):</strong> Sie
            haben das Recht, die Löschung Ihrer bei uns
            gespeicherten personenbezogenen Daten zu verlangen,
            soweit nicht die Verarbeitung zur Ausübung des Rechts auf
            freie Meinungsäußerung und Information, zur Erfüllung
            einer rechtlichen Verpflichtung, aus Gründen des
            öffentlichen Interesses oder zur Geltendmachung,
            Ausübung oder Verteidigung von Rechtsansprüchen
            erforderlich ist.
          </li>
          <li>
            <strong>
              Recht auf Einschränkung der Verarbeitung (Art. 18
              DSGVO):
            </strong>{" "}
            Sie haben das Recht, die Einschränkung der Verarbeitung
            Ihrer personenbezogenen Daten zu verlangen, wenn die
            Richtigkeit der Daten bestritten wird, die Verarbeitung
            unrechtmäßig ist, wir die Daten nicht mehr benötigen
            oder Sie Widerspruch eingelegt haben.
          </li>
          <li>
            <strong>
              Recht auf Datenübertragbarkeit (Art. 20 DSGVO):
            </strong>{" "}
            Sie haben das Recht, Ihre personenbezogenen Daten, die
            Sie uns bereitgestellt haben, in einem strukturierten,
            gängigen und maschinenlesbaren Format zu erhalten oder
            die Übermittlung an einen anderen Verantwortlichen zu
            verlangen.
          </li>
          <li>
            <strong>
              Widerspruchsrecht (Art. 21 DSGVO):
            </strong>{" "}
            Sie haben das Recht, aus Gründen, die sich aus Ihrer
            besonderen Situation ergeben, jederzeit gegen die
            Verarbeitung Ihrer personenbezogenen Daten Widerspruch
            einzulegen, sofern die Verarbeitung auf Art. 6 Abs. 1
            lit. e oder f DSGVO beruht. Der Verantwortliche
            verarbeitet die personenbezogenen Daten dann nicht mehr,
            es sei denn, er kann zwingende schutzwürdige Gründe
            nachweisen, die die Interessen, Rechte und Freiheiten
            der betroffenen Person überwiegen.
          </li>
          <li>
            <strong>
              Recht auf Widerruf erteilter Einwilligungen (Art. 7
              Abs. 3 DSGVO):
            </strong>{" "}
            Sie haben das Recht, eine einmal erteilte Einwilligung
            jederzeit zu widerrufen. Die Rechtmäßigkeit der
            aufgrund der Einwilligung bis zum Widerruf erfolgten
            Verarbeitung wird durch den Widerruf nicht berührt.
          </li>
        </ul>
        <p>
          Zur Ausübung Ihrer Rechte wenden Sie sich bitte per E-Mail
          an:{" "}
          <a href="mailto:info@villa-gloria-istrien.de">
            info@villa-gloria-istrien.de
          </a>
        </p>

        <h2>13. Beschwerderecht bei einer Aufsichtsbehörde</h2>
        <p>
          Unbeschadet eines anderweitigen verwaltungsrechtlichen oder
          gerichtlichen Rechtsbehelfs steht Ihnen das Recht auf
          Beschwerde bei einer Aufsichtsbehörde zu, wenn Sie der
          Ansicht sind, dass die Verarbeitung Ihrer
          personenbezogenen Daten gegen die DSGVO verstößt.
        </p>
        <p>
          Die zuständige Aufsichtsbehörde richtet sich nach dem
          Bundesland des Wohnsitzes des Verantwortlichen:
          <br />
          [ZUSTÄNDIGE DATENSCHUTZAUFSICHTSBEHÖRDE DES BUNDESLANDES]
        </p>
        <p>
          Eine Liste der Datenschutzaufsichtsbehörden sowie deren
          Kontaktdaten finden Sie unter:{" "}
          <a
            href="https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html
          </a>
        </p>

        <h2>14. Änderungen dieser Datenschutzerklärung</h2>
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung
          anzupassen, damit sie stets den aktuellen rechtlichen
          Anforderungen entspricht oder um Änderungen unserer
          Leistungen in der Datenschutzerklärung umzusetzen,
          z.&nbsp;B. bei der Einführung neuer Dienste. Für Ihren
          erneuten Besuch gilt dann die neue Datenschutzerklärung.
        </p>

        <h2>15. Stand</h2>
        <p>
          Diese Datenschutzerklärung hat den Stand:{" "}
          <strong>März 2026</strong>
        </p>
      </div>
    </main>
  );
}
