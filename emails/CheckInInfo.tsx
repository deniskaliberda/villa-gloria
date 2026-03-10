import { Section, Text, Hr } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";

interface CheckInInfoProps {
  bookingNumber: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  lang?: "de" | "en";
}

const t = {
  de: {
    preview: "Check-in-Informationen für Ihren Aufenthalt",
    greeting: "Liebe/r",
    title: "Ihre Check-in-Informationen",
    intro:
      "In wenigen Tagen beginnt Ihr Urlaub! Hier sind alle wichtigen Informationen für Ihre Anreise.",
    address: "Adresse",
    addressValue: "Villa Gloria al Padre\nKaštelir, Istrien\nKroatien",
    arrival: "Anreise",
    checkInTime: "Check-in ab 17:00 Uhr",
    checkOutTime: "Check-out bis 10:00 Uhr",
    directions:
      "Von der Autobahn A9 (Istarski Ipsilon) nehmen Sie die Ausfahrt Richtung Kaštelir. Die Villa liegt ca. 5 Minuten von der Ausfahrt entfernt.",
    parking: "Parkplatz",
    parkingInfo:
      "Kostenlose Parkplätze stehen direkt auf dem Grundstück zur Verfügung.",
    wifi: "WLAN",
    wifiInfo: "Die Zugangsdaten finden Sie in der Villa auf der Infokarte.",
    rules: "Hausregeln",
    rule1: "Nichtraucherhaus (Rauchen nur im Außenbereich)",
    rule2: "Ruhezeiten: 22:00 – 08:00 Uhr",
    rule3: "Pool-Nutzung auf eigene Gefahr",
    rule4: "Bitte Müll trennen (Behälter im Eingangsbereich)",
    emergency: "Notfallkontakt",
    emergencyInfo:
      "Bei dringenden Fragen erreichen Sie uns unter der Telefonnummer, die Sie in der Villa vorfinden.",
    closing: "Wir wünschen Ihnen einen wunderschönen Urlaub!",
    team: "Ihr Villa Gloria Team",
  },
  en: {
    preview: "Check-in information for your stay",
    greeting: "Dear",
    title: "Your check-in information",
    intro:
      "Your holiday starts in a few days! Here is all the important information for your arrival.",
    address: "Address",
    addressValue: "Villa Gloria al Padre\nKaštelir, Istria\nCroatia",
    arrival: "Arrival",
    checkInTime: "Check-in from 5:00 PM",
    checkOutTime: "Check-out by 10:00 AM",
    directions:
      "From the A9 motorway (Istarski Ipsilon), take the exit towards Kaštelir. The villa is approximately 5 minutes from the exit.",
    parking: "Parking",
    parkingInfo:
      "Free parking is available directly on the property.",
    wifi: "WiFi",
    wifiInfo: "You will find the access details on the info card in the villa.",
    rules: "House rules",
    rule1: "Non-smoking house (smoking only in outdoor areas)",
    rule2: "Quiet hours: 10:00 PM – 8:00 AM",
    rule3: "Pool use at your own risk",
    rule4: "Please separate waste (bins in the entrance area)",
    emergency: "Emergency contact",
    emergencyInfo:
      "For urgent questions, you can reach us at the phone number provided in the villa.",
    closing: "We wish you a wonderful holiday!",
    team: "Your Villa Gloria Team",
  },
};

export function CheckInInfo({
  guestName,
  lang = "de",
}: CheckInInfoProps) {
  const l = t[lang];

  const sectionStyle = {
    backgroundColor: "#FAF7F2",
    borderRadius: "8px",
    padding: "16px 20px",
    marginBottom: "16px",
  };

  const headingStyle = {
    fontSize: "15px",
    fontWeight: "700" as const,
    color: "#C2703E",
    margin: "0 0 8px",
  };

  const textStyle = {
    fontSize: "14px",
    color: "#2D2A26",
    margin: "0",
    lineHeight: "22px",
  };

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
          margin: "0 0 8px",
        }}
      >
        {l.title}
      </Text>
      <Text style={{ fontSize: "14px", color: "#2D2A26", margin: "0 0 24px" }}>
        {l.intro}
      </Text>

      <Section style={sectionStyle}>
        <Text style={headingStyle}>{l.address}</Text>
        <Text style={{ ...textStyle, whiteSpace: "pre-line" as const }}>
          {l.addressValue}
        </Text>
      </Section>

      <Section style={sectionStyle}>
        <Text style={headingStyle}>{l.arrival}</Text>
        <Text style={textStyle}>{l.checkInTime}</Text>
        <Text style={textStyle}>{l.checkOutTime}</Text>
        <Text style={{ ...textStyle, marginTop: "8px", color: "#8a8175" }}>
          {l.directions}
        </Text>
      </Section>

      <Section style={sectionStyle}>
        <Text style={headingStyle}>{l.parking}</Text>
        <Text style={textStyle}>{l.parkingInfo}</Text>
      </Section>

      <Section style={sectionStyle}>
        <Text style={headingStyle}>{l.wifi}</Text>
        <Text style={textStyle}>{l.wifiInfo}</Text>
      </Section>

      <Section style={sectionStyle}>
        <Text style={headingStyle}>{l.rules}</Text>
        <Text style={textStyle}>• {l.rule1}</Text>
        <Text style={textStyle}>• {l.rule2}</Text>
        <Text style={textStyle}>• {l.rule3}</Text>
        <Text style={textStyle}>• {l.rule4}</Text>
      </Section>

      <Section style={sectionStyle}>
        <Text style={headingStyle}>{l.emergency}</Text>
        <Text style={textStyle}>{l.emergencyInfo}</Text>
      </Section>

      <Hr style={{ borderColor: "#e8e0d5", margin: "24px 0 16px" }} />

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
