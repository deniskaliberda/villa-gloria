import { Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";

interface CleaningNotificationProps {
  bookingNumber: string;
  checkOut: string;
  guestsAdults: number;
  guestsChildren: number;
  hasPet: boolean;
  propertyType: "house" | "apartment";
}

export function CleaningNotification({
  bookingNumber,
  checkOut,
  guestsAdults,
  guestsChildren,
  hasPet,
  propertyType,
}: CleaningNotificationProps) {
  return (
    <EmailLayout preview={`Reinigung morgen – ${bookingNumber}`} lang="de">
      <Text
        style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "#C2703E",
          margin: "0 0 16px",
        }}
      >
        Reinigung morgen erforderlich
      </Text>

      <Text
        style={{ fontSize: "14px", color: "#2D2A26", margin: "0 0 24px" }}
      >
        Morgen ist Check-out für die folgende Buchung. Bitte die Reinigung
        vorbereiten.
      </Text>

      <Section
        style={{
          backgroundColor: "#FAF7F2",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "24px",
        }}
      >
        <table style={{ width: "100%", fontSize: "14px", color: "#2D2A26" }}>
          <tbody>
            <tr>
              <td style={{ padding: "4px 0", color: "#8a8175" }}>
                Buchungsnummer
              </td>
              <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {bookingNumber}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "4px 0", color: "#8a8175" }}>
                Check-out
              </td>
              <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {checkOut} (bis 10:00 Uhr)
              </td>
            </tr>
            <tr>
              <td style={{ padding: "4px 0", color: "#8a8175" }}>
                Unterkunft
              </td>
              <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {propertyType === "house"
                  ? "Gesamtes Haus"
                  : "Poolwohnung"}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "4px 0", color: "#8a8175" }}>Gäste</td>
              <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {guestsAdults} Erw.
                {guestsChildren > 0 ? ` + ${guestsChildren} Kinder` : ""}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "4px 0", color: "#8a8175" }}>Haustier</td>
              <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {hasPet ? "Ja ⚠️" : "Nein"}
              </td>
            </tr>
          </tbody>
        </table>
      </Section>

      {hasPet && (
        <Section
          style={{
            backgroundColor: "#FFF3CD",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "16px",
          }}
        >
          <Text style={{ fontSize: "13px", color: "#856404", margin: 0 }}>
            Hinweis: Es war ein Haustier im Haus. Bitte zusätzliche
            Tierhaar-Reinigung durchführen.
          </Text>
        </Section>
      )}
    </EmailLayout>
  );
}
