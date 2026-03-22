import { Section, Text, Button } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";

interface BookingRejectedProps {
  bookingNumber: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  lang?: "de" | "en";
}

const t = {
  de: {
    preview: "Ihre Buchungsanfrage konnte leider nicht bestätigt werden",
    greeting: "Liebe/r",
    title: "Ihr gewünschter Zeitraum ist leider nicht verfügbar",
    message:
      "Vielen Dank für Ihr Interesse an der Villa Gloria al Padre. Leider können wir Ihre Buchung für den gewünschten Zeitraum nicht bestätigen.",
    bookingNumber: "Buchungsnummer",
    period: "Angefragter Zeitraum",
    noCharge:
      "Da keine Zahlung erfolgt ist, entstehen Ihnen keinerlei Kosten.",
    alternative:
      "Vielleicht finden Sie einen anderen passenden Zeitraum? Wir würden uns freuen, Sie als Gast begrüßen zu dürfen.",
    checkAvailability: "Verfügbarkeit prüfen",
    questions: "Bei Fragen antworten Sie einfach auf diese E-Mail.",
    team: "Ihr Villa Gloria Team",
  },
  en: {
    preview: "Your booking request could not be confirmed",
    greeting: "Dear",
    title: "Unfortunately, your requested period is not available",
    message:
      "Thank you for your interest in Villa Gloria al Padre. Unfortunately, we are unable to confirm your booking for the requested period.",
    bookingNumber: "Booking number",
    period: "Requested period",
    noCharge:
      "Since no payment was made, there are no charges.",
    alternative:
      "Perhaps you can find another suitable period? We would be happy to welcome you as our guest.",
    checkAvailability: "Check availability",
    questions: "If you have any questions, simply reply to this email.",
    team: "Your Villa Gloria Team",
  },
};

export function BookingRejected({
  bookingNumber,
  guestName,
  checkIn,
  checkOut,
  lang = "de",
}: BookingRejectedProps) {
  const l = t[lang];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://villa-gloria.com";

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

      <Text
        style={{ fontSize: "14px", color: "#2D2A26", margin: "0 0 24px", lineHeight: "22px" }}
      >
        {l.message}
      </Text>

      <Section
        style={{
          backgroundColor: "#FAF7F2",
          borderRadius: "8px",
          padding: "16px 20px",
          marginBottom: "24px",
        }}
      >
        <table style={{ width: "100%", fontSize: "14px", color: "#2D2A26" }}>
          <tbody>
            <tr>
              <td style={{ padding: "4px 0", color: "#8a8175" }}>
                {l.bookingNumber}
              </td>
              <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {bookingNumber}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "4px 0", color: "#8a8175" }}>
                {l.period}
              </td>
              <td style={{ padding: "4px 0", textAlign: "right" as const, fontWeight: "600" }}>
                {checkIn} – {checkOut}
              </td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section
        style={{
          backgroundColor: "#f0f4ec",
          borderRadius: "8px",
          padding: "16px 20px",
          marginBottom: "24px",
        }}
      >
        <Text style={{ fontSize: "14px", color: "#4A5D3A", margin: 0, lineHeight: "22px" }}>
          {l.noCharge}
        </Text>
      </Section>

      <Text
        style={{ fontSize: "14px", color: "#2D2A26", margin: "0 0 24px", lineHeight: "22px" }}
      >
        {l.alternative}
      </Text>

      <Section style={{ textAlign: "center" as const, marginBottom: "24px" }}>
        <Button
          href={`${baseUrl}/${lang}/buchen`}
          style={{
            backgroundColor: "#C2703E",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "700",
            padding: "14px 32px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          {l.checkAvailability}
        </Button>
      </Section>

      <Text style={{ fontSize: "14px", color: "#2D2A26", margin: "0 0 4px" }}>
        {l.questions}
      </Text>
      <Text
        style={{ fontSize: "14px", fontWeight: "600", color: "#C2703E", margin: 0 }}
      >
        {l.team}
      </Text>
    </EmailLayout>
  );
}
