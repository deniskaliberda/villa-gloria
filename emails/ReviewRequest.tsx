import { Section, Text, Button } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";

interface ReviewRequestProps {
  guestName: string;
  checkIn: string;
  checkOut: string;
  lang?: "de" | "en";
}

const t = {
  de: {
    preview: "Wie war Ihr Urlaub in der Villa Gloria?",
    greeting: "Liebe/r",
    title: "Wie war Ihr Urlaub?",
    body: "Wir hoffen, Sie hatten einen wunderschönen Aufenthalt in der Villa Gloria al Padre! Ihre Meinung ist uns sehr wichtig. Wir würden uns freuen, wenn Sie sich einen Moment Zeit nehmen, um Ihre Erfahrung zu teilen.",
    cta: "Bewertung abgeben",
    note: "Ihre ehrliche Bewertung hilft zukünftigen Gästen bei ihrer Entscheidung. Vielen Dank!",
    closing: "Herzliche Grüße",
    team: "Ihr Villa Gloria Team",
    ps: "PS: Wir freuen uns, Sie in der nächsten Saison wieder begrüßen zu dürfen!",
  },
  en: {
    preview: "How was your holiday at Villa Gloria?",
    greeting: "Dear",
    title: "How was your holiday?",
    body: "We hope you had a wonderful stay at Villa Gloria al Padre! Your opinion is very important to us. We would be delighted if you could take a moment to share your experience.",
    cta: "Leave a review",
    note: "Your honest review helps future guests make their decision. Thank you!",
    closing: "Kind regards",
    team: "Your Villa Gloria Team",
    ps: "PS: We look forward to welcoming you back next season!",
  },
};

export function ReviewRequest({
  guestName,
  lang = "de",
}: ReviewRequestProps) {
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
      <Text style={{ fontSize: "14px", color: "#2D2A26", lineHeight: "22px", margin: "0 0 24px" }}>
        {l.body}
      </Text>

      <Section style={{ textAlign: "center" as const, marginBottom: "24px" }}>
        <Button
          href={`${baseUrl}/${lang}/bewertungen`}
          style={{
            backgroundColor: "#4A5D3A",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "600",
            padding: "14px 32px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          {l.cta}
        </Button>
      </Section>

      <Text style={{ fontSize: "13px", color: "#8a8175", margin: "0 0 24px" }}>
        {l.note}
      </Text>

      <Text style={{ fontSize: "14px", color: "#2D2A26", margin: "0 0 4px" }}>
        {l.closing}
      </Text>
      <Text
        style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#C2703E",
          margin: "0 0 16px",
        }}
      >
        {l.team}
      </Text>
      <Text
        style={{
          fontSize: "13px",
          fontStyle: "italic",
          color: "#8a8175",
          margin: 0,
        }}
      >
        {l.ps}
      </Text>
    </EmailLayout>
  );
}
