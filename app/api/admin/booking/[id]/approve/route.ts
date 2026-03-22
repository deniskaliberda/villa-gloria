import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail, notifyCaretaker } from "@/lib/resend";
import { BookingConfirmation } from "@/emails/BookingConfirmation";
import { CaretakerNotification } from "@/emails/CaretakerNotification";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return new Response(htmlPage("Fehler", "Kein Bestätigungstoken angegeben."), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const supabase = createAdminClient();

  // Verify token
  const { data: booking, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .eq("approval_token", token)
    .single();

  if (error || !booking) {
    return new Response(
      htmlPage("Fehler", "Ungültiger Link oder Buchung nicht gefunden."),
      { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  if (booking.status === "confirmed") {
    return new Response(
      htmlPage("Bereits bestätigt", `Die Buchung ${booking.booking_number} wurde bereits bestätigt.`),
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  if (booking.status === "rejected") {
    return new Response(
      htmlPage("Bereits abgelehnt", `Die Buchung ${booking.booking_number} wurde bereits abgelehnt.`),
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  // Update booking status to confirmed
  const { error: updateError } = await supabase
    .from("bookings")
    .update({
      status: "confirmed",
      approved_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (updateError) {
    return new Response(
      htmlPage("Fehler", "Buchung konnte nicht aktualisiert werden. Bitte versuchen Sie es erneut."),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  const locale = booking.guest_language === "en" ? "en" : "de";
  const checkInDate = new Date(booking.check_in).toLocaleDateString(
    locale === "en" ? "en-GB" : "de-DE",
    { day: "numeric", month: "long", year: "numeric" }
  );
  const checkOutDate = new Date(booking.check_out).toLocaleDateString(
    locale === "en" ? "en-GB" : "de-DE",
    { day: "numeric", month: "long", year: "numeric" }
  );

  // Send booking confirmation to guest
  await sendEmail({
    to: booking.guest_email,
    subject:
      locale === "en"
        ? `Booking Confirmation – ${booking.booking_number}`
        : `Buchungsbestätigung – ${booking.booking_number}`,
    react: BookingConfirmation({
      bookingNumber: booking.booking_number,
      guestName: booking.guest_name,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights: booking.nights,
      propertyType: booking.property_type,
      totalPrice: booking.total_price,
      lang: locale,
    }),
    bookingId: id,
    emailType: "booking_confirmation",
  });

  // Send notification to caretaker
  await notifyCaretaker(
    `Buchung bestätigt: ${checkInDate} – ${checkOutDate}`,
    CaretakerNotification({
      bookingNumber: booking.booking_number,
      guestName: booking.guest_name,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights: booking.nights,
      propertyType: booking.property_type,
      guestsAdults: booking.guests_adults,
      guestsChildren: booking.guests_children || 0,
      hasPet: booking.has_pet || false,
    }),
    id,
    "caretaker_notification"
  );

  return new Response(
    htmlPage(
      "Buchung bestätigt ✓",
      `Die Anfrage <strong>${booking.booking_number}</strong> von <strong>${booking.guest_name}</strong> (${checkInDate} – ${checkOutDate}) wurde bestätigt.<br><br>Der Gast erhält jetzt eine Bestätigungs-E-Mail mit dem Hinweis auf Zahlung per Überweisung/bar.${process.env.CARETAKER_EMAIL ? "<br>Die Betreuerin wurde ebenfalls informiert." : ""}`
    ),
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

function htmlPage(title: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} – Villa Gloria</title>
  <style>
    body { font-family: 'DM Sans', -apple-system, sans-serif; background: #FAF7F2; margin: 0; padding: 40px 20px; }
    .card { max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; padding: 48px 40px; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    h1 { color: #2D2A26; font-size: 24px; margin-bottom: 16px; }
    p { color: #4A4640; font-size: 16px; line-height: 1.6; }
    .brand { color: #C2703E; font-size: 14px; margin-top: 32px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${message}</p>
    <p class="brand">Villa Gloria al Padre</p>
  </div>
</body>
</html>`;
}
