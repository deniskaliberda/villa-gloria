import { Section, Text, Button } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";

interface PaymentReminderProps {
  bookingNumber: string;
  guestName: string;
  checkIn: string;
  remainingAmount: number;
  paymentLink: string;
  lang?: "de" | "en";
}

function formatEuro(cents: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

const t = {
  de: {
    preview: "Erinnerung: Restzahlung für Ihre Buchung",
    greeting: "Liebe/r",
    title: "Erinnerung an die Restzahlung",
    body: "In 6 Wochen ist es soweit – Ihr Urlaub in der Villa Gloria steht bevor! Bitte begleichen Sie die ausstehende Restzahlung.",
    booking: "Buchungsnummer",
    checkIn: "Check-in",
    amount: "Offener Betrag",
    payNow: "Jetzt bezahlen",
    note: "Nach erfolgreicher Zahlung erhalten Sie 3 Tage vor Anreise alle Check-in-Informationen.",
    questions: "Bei Fragen antworten Sie einfach auf diese E-Mail.",
    team: "Ihr Villa Gloria Team",
  },
  en: {
    preview: "Reminder: Remaining payment for your booking",
    greeting: "Dear",
    title: "Payment reminder",
    body: "In 6 weeks, your holiday at Villa Gloria begins! Please settle the outstanding balance.",
    booking: "Booking number",
    checkIn: "Check-in",
    amount: "Outstanding amount",
    payNow: "Pay now",
    note: "After successful payment, you will receive all check-in information 3 days before arrival.",
    questions: "If you have any questions, simply reply to this email.",
    team: "Your Villa Gloria Team",
  },
};

export function PaymentReminder({
  bookingNumber,
  guestName,
  checkIn,
  remainingAmount,
  paymentLink,
  lang = "de",
}: PaymentReminderProps) {
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
          margin: "0 0 16px",
        }}
      >
        {l.title}
      </Text>
      <Text style={{ fontSize: "14px", color: "#2D2A26", margin: "0 0 24px" }}>
        {l.body}
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
                {l.booking}
              </td>
              <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {bookingNumber}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "4px 0", color: "#8a8175" }}>
                {l.checkIn}
              </td>
              <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {checkIn}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "4px 0", fontWeight: "700" }}>
                {l.amount}
              </td>
              <td
                style={{
                  padding: "4px 0",
                  textAlign: "right" as const,
                  fontWeight: "700",
                  fontSize: "20px",
                  color: "#C2703E",
                }}
              >
                {formatEuro(remainingAmount)}
              </td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section style={{ textAlign: "center" as const, marginBottom: "24px" }}>
        <Button
          href={paymentLink}
          style={{
            backgroundColor: "#C2703E",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "600",
            padding: "14px 32px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          {l.payNow}
        </Button>
      </Section>

      <Text
        style={{ fontSize: "13px", color: "#8a8175", margin: "0 0 24px" }}
      >
        {l.note}
      </Text>

      <Text style={{ fontSize: "14px", color: "#2D2A26", margin: "0 0 4px" }}>
        {l.questions}
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
