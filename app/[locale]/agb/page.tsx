import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      "Mietbedingungen & AGB – Villa Gloria al Padre | Ferienvilla in Istrien",
    description:
      "Allgemeine Geschäftsbedingungen und Mietbedingungen für die Ferienunterkunft Villa Gloria al Padre in Kaštelir, Istrien, Kroatien.",
    alternates: {
      canonical: `/${locale}/agb`,
      languages: {
        "x-default": "/de/agb",
        de: "/de/agb",
        en: "/en/agb",
        hr: "/hr/agb",
      },
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TermsContent />;
}

function TermsContent() {
  const t = useTranslations("legal");

  return (
    <main className="mx-auto max-w-3xl px-4 pt-28 pb-20">
      <h1 className="font-display text-4xl font-bold text-dark">
        {t("terms")}
      </h1>
      <div className="prose prose-lg mt-8 text-dark-light">
        <h2>§ 1 Geltungsbereich</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen (nachfolgend
          &quot;AGB&quot; oder &quot;Mietbedingungen&quot;) gelten
          für alle Buchungen und Mietverträge über die
          Ferienunterkünfte der Villa Gloria al Padre in Kaštelir,
          Istrien, Kroatien, die über die Website
          www.villa-gloria-istrien.de oder per E-Mail an
          info@villa-gloria-istrien.de abgeschlossen werden.
        </p>
        <p>
          Mit der Buchung erkennt der Mieter diese Mietbedingungen
          vollständig an. Abweichende Bedingungen des Mieters gelten
          nur, wenn der Vermieter diesen ausdrücklich schriftlich
          zugestimmt hat.
        </p>

        <h2>§ 2 Vertragspartner</h2>
        <p>
          Vermieter und Vertragspartner ist:
          <br />
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
        </p>
        <p>
          Der Mieter ist die Person, die die Buchung vornimmt und
          den Mietvertrag abschließt. Der Mieter haftet für alle
          Personen, die er in die Unterkunft mitbringt, als wären
          deren Handlungen seine eigenen.
        </p>

        <h2>§ 3 Buchung und Vertragsschluss</h2>
        <p>
          Die Darstellung der Ferienunterkünfte auf der Website
          stellt kein verbindliches Angebot dar, sondern eine
          Aufforderung an den Mieter, ein Buchungsangebot abzugeben.
        </p>
        <p>
          Der Mieter gibt durch das Absenden des Buchungsformulars
          auf der Website oder per E-Mail ein verbindliches
          Buchungsangebot ab. Der Mietvertrag kommt erst zustande,
          wenn der Vermieter die Buchung per E-Mail bestätigt
          (Buchungsbestätigung). Der Vermieter behält sich vor,
          Buchungsanfragen ohne Angabe von Gründen abzulehnen.
        </p>
        <p>
          Mit der Buchungsbestätigung erhält der Mieter eine
          Zahlungsaufforderung für die Anzahlung. Die Buchung wird
          erst nach Eingang der Anzahlung als endgültig betrachtet.
        </p>

        <h2>§ 4 Preise und Nebenkosten</h2>
        <p>
          Die auf der Website angegebenen Mietpreise verstehen sich
          als Endpreise pro Nacht bzw. pro Woche und variieren je
          nach Saison und Unterkunftstyp. Die
          Mindestaufenthaltsdauer beträgt je nach Saison 5 bis 7
          Nächte für das Ferienhaus und 6 Nächte für das Apartment.
        </p>
        <p>Im Mietpreis enthalten sind:</p>
        <ul>
          <li>Endreinigung</li>
          <li>Bettwäsche und Handtücher</li>
          <li>Wasser, Strom und Gas</li>
          <li>WLAN</li>
          <li>Nutzung des Pools (unbeheizt)</li>
          <li>Nutzung des Grills und der Außenanlagen</li>
        </ul>
        <p>Zusätzliche Kosten, die separat berechnet werden:</p>
        <ul>
          <li>
            Haustiere: 50,00 EUR Pauschale pro Aufenthalt (siehe §
            10)
          </li>
          <li>
            Poolheizung: 30,00 EUR pro Tag (optional, muss bei der
            Buchung oder spätestens 1 Woche vor Anreise angemeldet
            werden)
          </li>
          <li>
            Kurtaxe / Tourismusabgabe: gemäß den aktuellen
            kroatischen Vorschriften, vor Ort zu entrichten
          </li>
        </ul>

        <h2>§ 5 Zahlungsbedingungen</h2>
        <p>Die Zahlung erfolgt in zwei Raten:</p>
        <ol>
          <li>
            <strong>Anzahlung (25 % des Gesamtmietpreises):</strong>{" "}
            Die Anzahlung ist innerhalb von 7 Tagen nach Erhalt der
            Buchungsbestätigung per Online-Zahlung über den
            Zahlungsdienstleister Stripe zu leisten. Die Buchung
            wird erst nach Eingang der Anzahlung als verbindlich
            betrachtet.
          </li>
          <li>
            <strong>
              Restzahlung (75 % des Gesamtmietpreises):
            </strong>{" "}
            Die Restzahlung ist spätestens 6 Wochen vor dem
            vereinbarten Anreisedatum fällig. Der Mieter erhält
            hierzu rechtzeitig eine Zahlungsaufforderung per E-Mail
            mit einem Stripe-Zahlungslink.
          </li>
        </ol>
        <p>
          Bei Buchungen, die weniger als 6 Wochen vor dem
          Anreisedatum erfolgen, ist der gesamte Mietpreis (100 %)
          sofort bei Buchungsbestätigung fällig.
        </p>
        <p>
          Kommt der Mieter mit der Restzahlung in Verzug, ist der
          Vermieter berechtigt, vom Vertrag zurückzutreten und die
          Unterkunft anderweitig zu vermieten. Die Anzahlung wird in
          diesem Fall nicht erstattet.
        </p>

        <h2>§ 6 Kaution</h2>
        <p>
          Der Mieter hinterlegt eine Kaution in Höhe von{" "}
          <strong>400,00 EUR</strong>. Die Kaution wird vor der
          Anreise per Stripe-Zahlungslink eingezogen oder vor Ort in
          bar hinterlegt, je nach Vereinbarung.
        </p>
        <p>
          Die Kaution dient zur Absicherung gegen Schäden an der
          Unterkunft, am Inventar oder an den Außenanlagen, die
          durch den Mieter oder seine Mitreisenden verursacht
          werden. Die Rückerstattung der Kaution erfolgt innerhalb
          von 14 Tagen nach der Abreise, sofern keine Schäden
          festgestellt wurden und die Unterkunft in ordnungsgemäßem
          Zustand hinterlassen wurde.
        </p>
        <p>
          Übersteigen die Schäden den Kautionsbetrag, ist der Mieter
          verpflichtet, die Differenz zu erstatten.
        </p>

        <h2>§ 7 Stornierungsbedingungen</h2>
        <p>
          Stornierungen durch den Mieter sind jederzeit schriftlich
          (per E-Mail an info@villa-gloria-istrien.de) möglich. Es
          gelten folgende Stornogebühren, berechnet auf den
          Gesamtmietpreis:
        </p>
        <ul>
          <li>
            <strong>Mehr als 6 Wochen vor Anreise:</strong> 25 % des
            Gesamtmietpreises (entspricht der Anzahlung)
          </li>
          <li>
            <strong>6 bis 4 Wochen vor Anreise:</strong> 50 % des
            Gesamtmietpreises
          </li>
          <li>
            <strong>4 bis 2 Wochen vor Anreise:</strong> 75 % des
            Gesamtmietpreises
          </li>
          <li>
            <strong>Weniger als 2 Wochen vor Anreise:</strong> 100 %
            des Gesamtmietpreises (keine Erstattung)
          </li>
        </ul>
        <p>
          Maßgeblich für die Fristberechnung ist der Eingang der
          schriftlichen Stornierung beim Vermieter. Dem Mieter wird
          empfohlen, eine Reiserücktrittsversicherung abzuschließen.
        </p>
        <p>
          Der Vermieter ist berechtigt, bei höherer Gewalt,
          unvorhersehbaren Umständen oder behördlichen Anordnungen
          die Buchung zu stornieren. In diesem Fall erhält der
          Mieter den bereits gezahlten Betrag vollständig zurück.
          Weitergehende Ansprüche des Mieters sind ausgeschlossen.
        </p>

        <h2>§ 8 An- und Abreise</h2>
        <p>
          <strong>Check-in:</strong> Der Mieter kann die Unterkunft
          am vereinbarten Anreisetag ab <strong>17:00 Uhr</strong>{" "}
          beziehen. Ein früherer Check-in ist nach vorheriger
          Absprache und Verfügbarkeit möglich, kann jedoch nicht
          garantiert werden.
        </p>
        <p>
          <strong>Check-out:</strong> Am Abreisetag ist die
          Unterkunft bis spätestens <strong>10:00 Uhr</strong>{" "}
          geräumt und in besenreinem Zustand zu hinterlassen. Die
          Endreinigung ist im Mietpreis enthalten, der Mieter ist
          jedoch verpflichtet, die Unterkunft in einem ordentlichen
          Grundzustand zu verlassen (Geschirr gespült, Müll
          entsorgt, persönliche Gegenstände entfernt).
        </p>
        <p>
          Die Schlüsselübergabe erfolgt durch eine örtliche
          Betreuerin vor Ort. Der Mieter erhält die genauen
          Kontaktdaten und Anreiseinformationen rechtzeitig vor dem
          Aufenthalt per E-Mail.
        </p>

        <h2>§ 9 Pflichten des Mieters</h2>
        <p>Der Mieter verpflichtet sich insbesondere:</p>
        <ul>
          <li>
            Die Unterkunft, das Inventar und die Außenanlagen
            sorgfältig und pfleglich zu behandeln.
          </li>
          <li>
            Die bei der Buchung angegebene maximale Personenzahl
            nicht zu überschreiten. Zusätzliche Übernachtungsgäste
            sind nicht gestattet, es sei denn, der Vermieter hat
            dies ausdrücklich genehmigt.
          </li>
          <li>
            Die Nachtruhe von <strong>22:00 bis 08:00 Uhr</strong>{" "}
            einzuhalten und auf die Nachbarschaft Rücksicht zu
            nehmen.
          </li>
          <li>
            Schäden an der Unterkunft oder am Inventar unverzüglich
            dem Vermieter oder der örtlichen Betreuerin zu melden.
          </li>
          <li>
            Auf dem gesamten Grundstück die geltenden kroatischen
            Brandschutzvorschriften zu beachten. Das Entzünden
            offener Feuer außerhalb des dafür vorgesehenen Grills
            ist untersagt.
          </li>
          <li>
            Die Unterkunft ausschließlich zu Wohnzwecken
            (Ferienaufenthalt) zu nutzen. Eine gewerbliche Nutzung,
            Untervermietung oder die Durchführung von
            Veranstaltungen ist ohne vorherige schriftliche
            Zustimmung des Vermieters nicht gestattet.
          </li>
          <li>
            Die Müllentsorgung gemäß den örtlichen Vorschriften
            vorzunehmen (Mülltrennung).
          </li>
        </ul>

        <h2>§ 10 Haustiere</h2>
        <p>
          Haustiere sind in der Villa Gloria al Padre nach
          vorheriger Anmeldung bei der Buchung gestattet. Für die
          Mitnahme von Haustieren wird eine einmalige Pauschale von{" "}
          <strong>50,00 EUR</strong> pro Aufenthalt erhoben,
          unabhängig von der Aufenthaltsdauer.
        </p>
        <p>Der Mieter verpflichtet sich:</p>
        <ul>
          <li>
            Haustiere bei der Buchung anzumelden (Tierart und
            Anzahl).
          </li>
          <li>
            Haustiere nicht unbeaufsichtigt in der Unterkunft zu
            lassen.
          </li>
          <li>
            Haustiere nicht auf Möbeln oder in Betten schlafen zu
            lassen.
          </li>
          <li>
            Verunreinigungen durch Haustiere auf dem Grundstück und
            in der Umgebung unverzüglich zu beseitigen.
          </li>
          <li>
            Für alle durch Haustiere verursachten Schäden an der
            Unterkunft, am Inventar oder an den Außenanlagen
            aufzukommen.
          </li>
        </ul>
        <p>
          Der Vermieter behält sich vor, die Erlaubnis zur Mitnahme
          von Haustieren im Einzelfall zu versagen, insbesondere bei
          bestimmten Tierarten oder -größen.
        </p>

        <h2>§ 11 Pool und Außenbereich</h2>
        <p>
          Die Nutzung des Pools und der Außenanlagen erfolgt auf
          eigene Gefahr des Mieters. Der Vermieter übernimmt keine
          Haftung für Unfälle oder Verletzungen im Pool- und
          Außenbereich.
        </p>
        <p>
          <strong>
            Kinder unter 14 Jahren dürfen den Pool nur unter
            Aufsicht einer erwachsenen Begleitperson nutzen.
          </strong>
        </p>
        <p>Für die Nutzung des Pools gilt:</p>
        <ul>
          <li>
            Duschen vor dem Betreten des Pools ist erwünscht.
          </li>
          <li>Glasgefäße sind im Poolbereich nicht gestattet.</li>
          <li>
            Der Pool ist bei Gewitter nicht zu benutzen.
          </li>
          <li>
            Beschädigungen der Poolanlage sind umgehend zu melden.
          </li>
        </ul>
        <p>
          <strong>Poolheizung (optional):</strong> Der Pool kann auf
          Wunsch des Mieters beheizt werden. Die Kosten betragen{" "}
          <strong>30,00 EUR pro Tag</strong>. Die Poolheizung muss
          bei der Buchung oder spätestens 1 Woche vor der Anreise
          angemeldet werden. Die Kosten für die Poolheizung werden
          zusätzlich zum Mietpreis in Rechnung gestellt.
        </p>

        <h2>§ 12 Haftung des Vermieters</h2>
        <p>
          Der Vermieter haftet nicht für Schäden, die durch höhere
          Gewalt, Naturereignisse, behördliche Maßnahmen, Streiks,
          Krieg, Epidemien oder sonstige unvorhersehbare und vom
          Vermieter nicht zu vertretende Umstände entstehen.
        </p>
        <p>
          Der Vermieter haftet nicht für den Verlust, die
          Beschädigung oder den Diebstahl von persönlichen
          Gegenständen, Wertgegenständen oder Fahrzeugen des Mieters
          während des Aufenthalts.
        </p>
        <p>
          Die Haftung des Vermieters für leicht fahrlässig
          verursachte Schäden ist ausgeschlossen, es sei denn, es
          handelt sich um die Verletzung wesentlicher
          Vertragspflichten (Kardinalpflichten), um Schäden aus der
          Verletzung des Lebens, des Körpers oder der Gesundheit
          oder um Ansprüche nach dem Produkthaftungsgesetz. Bei
          Verletzung wesentlicher Vertragspflichten ist die Haftung
          auf den vertragstypischen, vorhersehbaren Schaden
          begrenzt.
        </p>
        <p>
          Kurzfristige Ausfälle der Strom-, Wasser- oder
          Internetversorgung, die außerhalb des Einflussbereichs des
          Vermieters liegen, begründen keinen Anspruch auf
          Mietminderung.
        </p>

        <h2>§ 13 Mängel und Reklamation</h2>
        <p>
          Der Mieter ist verpflichtet, Mängel an der Unterkunft
          unverzüglich nach Feststellung dem Vermieter oder der
          örtlichen Betreuerin zu melden, damit Abhilfe geschaffen
          werden kann. Die Kontaktdaten werden dem Mieter vor der
          Anreise mitgeteilt.
        </p>
        <p>
          Unterlässt der Mieter die unverzügliche Mängelanzeige,
          stehen ihm keine Ansprüche auf Mietminderung oder
          Schadensersatz zu, soweit der Vermieter bei rechtzeitiger
          Anzeige Abhilfe hätte schaffen können.
        </p>
        <p>
          Reklamationen nach Beendigung des Mietverhältnisses sind
          innerhalb von 14 Tagen nach Abreise schriftlich per E-Mail
          an info@villa-gloria-istrien.de einzureichen.
        </p>

        <h2>§ 14 Datenschutz</h2>
        <p>
          Der Vermieter erhebt und verarbeitet personenbezogene
          Daten des Mieters ausschließlich im Rahmen der geltenden
          datenschutzrechtlichen Bestimmungen (DSGVO, BDSG).
          Ausführliche Informationen zum Umgang mit Ihren Daten
          finden Sie in unserer{" "}
          <a href="/datenschutz">Datenschutzerklärung</a>.
        </p>

        <h2>§ 15 Schlussbestimmungen</h2>
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland unter
          Ausschluss des UN-Kaufrechts. Gerichtsstand für alle
          Streitigkeiten aus diesem Vertragsverhältnis ist, soweit
          gesetzlich zulässig, der Wohnsitz des Vermieters.
        </p>
        <p>
          Sollten einzelne Bestimmungen dieser AGB ganz oder
          teilweise unwirksam sein oder werden, so bleibt die
          Wirksamkeit der übrigen Bestimmungen hiervon unberührt.
          Anstelle der unwirksamen Bestimmung tritt eine wirksame
          Regelung, die dem wirtschaftlichen Zweck der unwirksamen
          Bestimmung am nächsten kommt.
        </p>
        <p>
          Änderungen und Ergänzungen dieser AGB bedürfen der
          Schriftform. Dies gilt auch für die Aufhebung dieses
          Schriftformerfordernisses.
        </p>
        <p>
          <em>Stand: März 2026</em>
        </p>
      </div>
    </main>
  );
}
