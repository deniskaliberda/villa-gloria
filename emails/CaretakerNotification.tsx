import { Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";

interface CaretakerNotificationProps {
  bookingNumber: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  propertyType: "house" | "apartment";
  guestsAdults: number;
  guestsChildren: number;
  hasPet: boolean;
}

export function CaretakerNotification({
  bookingNumber,
  guestName,
  checkIn,
  checkOut,
  nights,
  propertyType,
  guestsAdults,
  guestsChildren,
  hasPet,
}: CaretakerNotificationProps) {
  return (
    <EmailLayout preview={`Bestätigte Buchung: ${checkIn} – ${checkOut}`} lang="de">
      <Text
        style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "#4A5D3A",
          margin: "0 0 16px",
        }}
      >
        Neue Buchung bestätigt
      </Text>

      <Text
        style={{ fontSize: "14px", color: "#2D2A26", margin: "0 0 24px" }}
      >
        Die folgende Buchung wurde bestätigt. Bitte bereiten Sie die Villa
        entsprechend vor (Reinigung, Schlüsselübergabe, etc.).
      </Text>

      <Section
        style={{
          backgroundColor: "#f0f4ec",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "24px",
        }}
      >
        <table style={{ width: "100%", fontSize: "14px", color: "#2D2A26" }}>
          <tbody>
            <tr>
              <td style={{ padding: "6px 0", color: "#8a8175" }}>
                Buchungsnummer
              </td>
              <td style={{ padding: "6px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {bookingNumber}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", color: "#8a8175" }}>Gast</td>
              <td style={{ padding: "6px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {guestName}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", color: "#8a8175" }}>Check-in</td>
              <td style={{ padding: "6px 0", textAlign: "right" as const, fontWeight: "700", color: "#4A5D3A" }}>
                {checkIn}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", color: "#8a8175" }}>Check-out</td>
              <td style={{ padding: "6px 0", textAlign: "right" as const, fontWeight: "700", color: "#4A5D3A" }}>
                {checkOut}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", color: "#8a8175" }}>Nächte</td>
              <td style={{ padding: "6px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {nights}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", color: "#8a8175" }}>Unterkunft</td>
              <td style={{ padding: "6px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {propertyType === "house" ? "Gesamtes Haus" : "Souterrainwohnung"}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", color: "#8a8175" }}>Gäste</td>
              <td style={{ padding: "6px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {guestsAdults} Erw.{guestsChildren > 0 ? ` + ${guestsChildren} Kinder` : ""}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", color: "#8a8175" }}>Haustier</td>
              <td style={{ padding: "6px 0", textAlign: "right" as const, fontWeight: "600" }}>
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
            Hinweis: Es wird ein Haustier mitgebracht. Bitte bei der Reinigung
            berücksichtigen.
          </Text>
        </Section>
      )}

      <Text
        style={{ fontSize: "13px", color: "#8a8175", margin: "16px 0 0" }}
      >
        Check-in: ab 17:00 Uhr · Check-out: bis 10:00 Uhr
      </Text>
    </EmailLayout>
  );
}
