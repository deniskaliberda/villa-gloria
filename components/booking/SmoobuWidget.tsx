"use client";

interface SmoobuWidgetProps {
  locale: string;
}

export function SmoobuWidget({ locale }: SmoobuWidgetProps) {
  const lang = locale === "de" ? "de" : "en";

  return (
    <iframe
      src={`https://booking.smoobu.com/9A1466756?apartmentId=2972646&lang=${lang}`}
      className="w-full rounded-card border-0"
      style={{ minHeight: "520px" }}
      title={
        locale === "de"
          ? "Verfügbarkeitskalender"
          : "Availability Calendar"
      }
      loading="lazy"
      allow="payment"
    />
  );
}
