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
    <EmailLayout preview={`Confirmed booking: ${checkIn} – ${checkOut}`} lang="en">
      <Text
        style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "#4A5D3A",
          margin: "0 0 16px",
        }}
      >
        New Booking Confirmed
      </Text>

      <Text
        style={{ fontSize: "14px", color: "#2D2A26", margin: "0 0 24px" }}
      >
        The following booking has been confirmed. Please prepare the villa
        accordingly (cleaning, key handover, etc.).
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
                Booking number
              </td>
              <td style={{ padding: "6px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {bookingNumber}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", color: "#8a8175" }}>Guest</td>
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
              <td style={{ padding: "6px 0", color: "#8a8175" }}>Nights</td>
              <td style={{ padding: "6px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {nights}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", color: "#8a8175" }}>Property</td>
              <td style={{ padding: "6px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {propertyType === "house" ? "Entire House" : "Pool Apartment"}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", color: "#8a8175" }}>Guests</td>
              <td style={{ padding: "6px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {guestsAdults} adults{guestsChildren > 0 ? ` + ${guestsChildren} children` : ""}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "6px 0", color: "#8a8175" }}>Pet</td>
              <td style={{ padding: "6px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {hasPet ? "Yes" : "No"}
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
            Note: Guests are bringing a pet. Please take this into account for
            cleaning.
          </Text>
        </Section>
      )}

      <Text
        style={{ fontSize: "13px", color: "#8a8175", margin: "16px 0 0" }}
      >
        Check-in: from 5:00 PM · Check-out: by 10:00 AM
      </Text>
    </EmailLayout>
  );
}
