import { Section, Text, Hr, Button } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";

interface ApprovalRequestProps {
  bookingNumber: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  guestCountry: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  propertyType: "house" | "apartment";
  guestsAdults: number;
  guestsChildren: number;
  hasPet: boolean;
  totalPrice: number;
  depositAmount: number;
  guestMessage?: string;
  approveUrl: string;
  rejectUrl: string;
}

function formatEuro(cents: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export function ApprovalRequest({
  bookingNumber,
  guestName,
  guestEmail,
  guestPhone,
  guestCountry,
  checkIn,
  checkOut,
  nights,
  propertyType,
  guestsAdults,
  guestsChildren,
  hasPet,
  totalPrice,
  depositAmount,
  guestMessage,
  approveUrl,
  rejectUrl,
}: ApprovalRequestProps) {
  return (
    <EmailLayout preview={`Neue Buchungsanfrage: ${bookingNumber} – Bitte bestätigen`} lang="de">
      <Text
        style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "#C2703E",
          margin: "0 0 8px",
        }}
      >
        Neue Buchungsanfrage eingegangen
      </Text>
      <Text
        style={{ fontSize: "14px", color: "#2D2A26", margin: "0 0 24px" }}
      >
        Ein Gast möchte die Villa Gloria buchen. Die Anzahlung wurde bereits
        geleistet. Bitte bestätigen oder ablehnen Sie die Buchung.
      </Text>

      {/* Booking Number */}
      <Section
        style={{
          backgroundColor: "#FAF7F2",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "24px",
        }}
      >
        <Text
          style={{
            fontSize: "12px",
            color: "#8a8175",
            margin: "0 0 4px",
            textTransform: "uppercase" as const,
            letterSpacing: "1px",
          }}
        >
          Buchungsnummer
        </Text>
        <Text
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#C2703E",
            margin: 0,
          }}
        >
          {bookingNumber}
        </Text>
      </Section>

      {/* Booking Details */}
      <Text
        style={{
          fontSize: "15px",
          fontWeight: "700",
          color: "#2D2A26",
          margin: "0 0 8px",
        }}
      >
        Buchungsdetails
      </Text>

      <table style={{ width: "100%", fontSize: "14px", color: "#2D2A26" }}>
        <tbody>
          <tr>
            <td style={{ padding: "4px 0", color: "#8a8175" }}>Unterkunft</td>
            <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
              {propertyType === "house" ? "Gesamtes Haus" : "Souterrainwohnung"}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "4px 0", color: "#8a8175" }}>Check-in</td>
            <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
              {checkIn}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "4px 0", color: "#8a8175" }}>Check-out</td>
            <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
              {checkOut}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "4px 0", color: "#8a8175" }}>Nächte</td>
            <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
              {nights}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "4px 0", color: "#8a8175" }}>Gäste</td>
            <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
              {guestsAdults} Erw.{guestsChildren > 0 ? ` + ${guestsChildren} Kinder` : ""}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "4px 0", color: "#8a8175" }}>Haustier</td>
            <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
              {hasPet ? "Ja" : "Nein"}
            </td>
          </tr>
        </tbody>
      </table>

      <Hr style={{ borderColor: "#e8e0d5", margin: "16px 0" }} />

      {/* Pricing */}
      <table style={{ width: "100%", fontSize: "14px", color: "#2D2A26" }}>
        <tbody>
          <tr>
            <td style={{ padding: "4px 0", fontWeight: "700" }}>Gesamtpreis</td>
            <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "700", color: "#C2703E" }}>
              {formatEuro(totalPrice)}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "4px 0", color: "#4A5D3A" }}>Anzahlung (bezahlt)</td>
            <td style={{ padding: "4px 0", textAlign: "right" as const, color: "#4A5D3A" }}>
              {formatEuro(depositAmount)}
            </td>
          </tr>
        </tbody>
      </table>

      <Hr style={{ borderColor: "#e8e0d5", margin: "16px 0" }} />

      {/* Guest Info */}
      <Text
        style={{
          fontSize: "15px",
          fontWeight: "700",
          color: "#2D2A26",
          margin: "0 0 8px",
        }}
      >
        Gast
      </Text>

      <table style={{ width: "100%", fontSize: "14px", color: "#2D2A26" }}>
        <tbody>
          <tr>
            <td style={{ padding: "4px 0", color: "#8a8175" }}>Name</td>
            <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
              {guestName}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "4px 0", color: "#8a8175" }}>E-Mail</td>
            <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
              {guestEmail}
            </td>
          </tr>
          {guestPhone && (
            <tr>
              <td style={{ padding: "4px 0", color: "#8a8175" }}>Telefon</td>
              <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {guestPhone}
              </td>
            </tr>
          )}
          <tr>
            <td style={{ padding: "4px 0", color: "#8a8175" }}>Land</td>
            <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
              {guestCountry}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Guest Message */}
      {guestMessage && (
        <>
          <Hr style={{ borderColor: "#e8e0d5", margin: "16px 0" }} />
          <Text
            style={{ fontSize: "15px", fontWeight: "700", color: "#2D2A26", margin: "0 0 8px" }}
          >
            Nachricht des Gastes
          </Text>
          <Section
            style={{
              backgroundColor: "#FAF7F2",
              borderRadius: "8px",
              padding: "12px 16px",
            }}
          >
            <Text
              style={{ fontSize: "14px", color: "#2D2A26", fontStyle: "italic", margin: 0, lineHeight: "22px" }}
            >
              &ldquo;{guestMessage}&rdquo;
            </Text>
          </Section>
        </>
      )}

      {/* Action Buttons */}
      <Section style={{ margin: "32px 0 16px", textAlign: "center" as const }}>
        <Button
          href={approveUrl}
          style={{
            backgroundColor: "#4A5D3A",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "700",
            padding: "14px 32px",
            borderRadius: "8px",
            textDecoration: "none",
            display: "inline-block",
            marginRight: "12px",
          }}
        >
          Buchung bestätigen
        </Button>
        <Button
          href={rejectUrl}
          style={{
            backgroundColor: "#dc2626",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "700",
            padding: "14px 32px",
            borderRadius: "8px",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Ablehnen
        </Button>
      </Section>

      <Text
        style={{ fontSize: "12px", color: "#8a8175", textAlign: "center" as const, margin: 0 }}
      >
        Klicken Sie auf einen Button, um die Buchung zu bestätigen oder abzulehnen.
      </Text>
    </EmailLayout>
  );
}
