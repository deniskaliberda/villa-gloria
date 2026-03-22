import { Section, Text, Hr } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";

interface BookingConfirmationProps {
  bookingNumber: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  propertyType: "house" | "apartment";
  totalPrice: number;
  depositAmount: number;
  remainingAmount: number;
  lang?: "de" | "en";
}

const t = {
  de: {
    preview: "Ihre Buchung wurde bestätigt",
    greeting: "Liebe/r",
    confirmed: "Ihre Buchung wurde erfolgreich bestätigt!",
    bookingNumber: "Buchungsnummer",
    details: "Buchungsdetails",
    property: "Unterkunft",
    house: "Gesamtes Haus (bis 9 Gäste)",
    apartment: "Poolwohnung (2 Gäste + Aufbettung)",
    checkIn: "Check-in",
    checkOut: "Check-out",
    nightsLabel: "Nächte",
    total: "Gesamtpreis",
    deposit: "Anzahlung (bezahlt)",
    remaining: "Restzahlung",
    remainingNote:
      "Die Restzahlung ist 6 Wochen vor Check-in fällig. Sie erhalten rechtzeitig eine Erinnerung.",
    checkInTime: "Check-in: ab 17:00 Uhr",
    checkOutTime: "Check-out: bis 10:00 Uhr",
    questions: "Bei Fragen antworten Sie einfach auf diese E-Mail.",
    closing: "Wir freuen uns auf Sie!",
    team: "Ihr Villa Gloria Team",
  },
  en: {
    preview: "Your booking has been confirmed",
    greeting: "Dear",
    confirmed: "Your booking has been successfully confirmed!",
    bookingNumber: "Booking number",
    details: "Booking details",
    property: "Property",
    house: "Entire house (up to 9 guests)",
    apartment: "Pool apartment (2+2 guests)",
    checkIn: "Check-in",
    checkOut: "Check-out",
    nightsLabel: "Nights",
    total: "Total price",
    deposit: "Deposit (paid)",
    remaining: "Remaining payment",
    remainingNote:
      "The remaining payment is due 6 weeks before check-in. You will receive a reminder in time.",
    checkInTime: "Check-in: from 5:00 PM",
    checkOutTime: "Check-out: by 10:00 AM",
    questions: "If you have any questions, simply reply to this email.",
    closing: "We look forward to welcoming you!",
    team: "Your Villa Gloria Team",
  },
};

function formatEuro(cents: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export function BookingConfirmation({
  bookingNumber,
  guestName,
  checkIn,
  checkOut,
  nights,
  propertyType,
  totalPrice,
  depositAmount,
  remainingAmount,
  lang = "de",
}: BookingConfirmationProps) {
  const l = t[lang];

  return (
    <EmailLayout preview={l.preview} lang={lang}>
      <Text style={{ fontSize: "16px", color: "#2D2A26", margin: "0 0 8px" }}>
        {l.greeting} {guestName},
      </Text>
      <Text
        style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "#C2703E",
          margin: "0 0 24px",
        }}
      >
        {l.confirmed}
      </Text>

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
          {l.bookingNumber}
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

      <Text
        style={{
          fontSize: "16px",
          fontWeight: "700",
          color: "#2D2A26",
          margin: "0 0 12px",
        }}
      >
        {l.details}
      </Text>

      <table style={{ width: "100%", fontSize: "14px", color: "#2D2A26" }}>
        <tbody>
          <tr>
            <td style={{ padding: "6px 0", color: "#8a8175" }}>
              {l.property}
            </td>
            <td style={{ padding: "6px 0", textAlign: "right" as const, fontWeight: "600" }}>
              {propertyType === "house" ? l.house : l.apartment}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "6px 0", color: "#8a8175" }}>
              {l.checkIn}
            </td>
            <td style={{ padding: "6px 0", textAlign: "right" as const, fontWeight: "600" }}>
              {checkIn}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "6px 0", color: "#8a8175" }}>
              {l.checkOut}
            </td>
            <td style={{ padding: "6px 0", textAlign: "right" as const, fontWeight: "600" }}>
              {checkOut}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "6px 0", color: "#8a8175" }}>
              {l.nightsLabel}
            </td>
            <td style={{ padding: "6px 0", textAlign: "right" as const, fontWeight: "600" }}>
              {nights}
            </td>
          </tr>
        </tbody>
      </table>

      <Hr style={{ borderColor: "#e8e0d5", margin: "16px 0" }} />

      <table style={{ width: "100%", fontSize: "14px", color: "#2D2A26" }}>
        <tbody>
          <tr>
            <td style={{ padding: "6px 0", fontWeight: "700" }}>{l.total}</td>
            <td
              style={{
                padding: "6px 0",
                textAlign: "right" as const,
                fontWeight: "700",
                fontSize: "18px",
                color: "#C2703E",
              }}
            >
              {formatEuro(totalPrice)}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "6px 0", color: "#4A5D3A" }}>
              {l.deposit}
            </td>
            <td
              style={{
                padding: "6px 0",
                textAlign: "right" as const,
                color: "#4A5D3A",
                fontWeight: "600",
              }}
            >
              {formatEuro(depositAmount)}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "6px 0", color: "#8a8175" }}>
              {l.remaining}
            </td>
            <td
              style={{
                padding: "6px 0",
                textAlign: "right" as const,
                color: "#8a8175",
              }}
            >
              {formatEuro(remainingAmount)}
            </td>
          </tr>
        </tbody>
      </table>

      <Text
        style={{ fontSize: "13px", color: "#8a8175", margin: "16px 0 24px" }}
      >
        {l.remainingNote}
      </Text>

      <Section
        style={{
          backgroundColor: "#f0f4ec",
          borderRadius: "8px",
          padding: "16px 20px",
          marginBottom: "24px",
        }}
      >
        <Text style={{ fontSize: "14px", color: "#4A5D3A", margin: "0 0 4px" }}>
          {l.checkInTime}
        </Text>
        <Text style={{ fontSize: "14px", color: "#4A5D3A", margin: 0 }}>
          {l.checkOutTime}
        </Text>
      </Section>

      <Text style={{ fontSize: "14px", color: "#2D2A26", margin: "0 0 4px" }}>
        {l.questions}
      </Text>
      <Text style={{ fontSize: "14px", color: "#2D2A26", margin: "0 0 4px" }}>
        {l.closing}
      </Text>
      <Text
        style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#C2703E",
          margin: 0,
        }}
      >
        {l.team}
      </Text>
    </EmailLayout>
  );
}
