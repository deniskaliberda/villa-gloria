import { NextResponse } from "next/server";
import { Resend } from "resend";
import { bookingInquirySchema } from "@/lib/validations";
import { createBookingToken } from "@/lib/booking-token";
import { formatDate, getNights } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = bookingInquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Ungültige Daten", details: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;
    const bookingNumber = `VG-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase()}`;
    const nights = getNights(data.checkIn, data.checkOut);
    const totalGuests = data.guestsAdults + data.guestsChildren;

    const token = createBookingToken({
      bookingNumber,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guestsAdults: data.guestsAdults,
      guestsChildren: data.guestsChildren,
      hasPet: data.hasPet,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone || "",
      guestMessage: data.guestMessage || "",
    });

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.villa-gloria-istrien.de";
    const approveUrl = `${baseUrl}/api/booking/approve?token=${token}`;
    const rejectUrl = `${baseUrl}/api/booking/reject?token=${token}`;

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const contactEmail = process.env.CONTACT_EMAIL || "info@urlaubsbleibe.de";
      const fromEmail = process.env.RESEND_FROM_EMAIL || "Villa Gloria <buchung@villa-gloria-istrien.de>";

      // Email 1: Anfrage an Micha
      await resend.emails.send({
        from: fromEmail,
        to: contactEmail,
        replyTo: data.guestEmail,
        subject: `Neue Buchungsanfrage: ${data.guestName} (${formatDate(data.checkIn)} - ${formatDate(data.checkOut)})`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #C2703E; color: white; padding: 24px; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">Neue Buchungsanfrage</h1>
              <p style="margin: 8px 0 0; opacity: 0.9;">${bookingNumber}</p>
            </div>
            <div style="background: #f9f5f0; padding: 24px; border: 1px solid #e5ddd3;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #666; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${data.guestName}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">E-Mail</td><td style="padding: 8px 0;"><a href="mailto:${data.guestEmail}">${data.guestEmail}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Telefon</td><td style="padding: 8px 0;">${data.guestPhone || "–"}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Anreise</td><td style="padding: 8px 0; font-weight: 600;">${formatDate(data.checkIn)}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Abreise</td><td style="padding: 8px 0; font-weight: 600;">${formatDate(data.checkOut)}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Nächte</td><td style="padding: 8px 0;">${nights}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Gäste</td><td style="padding: 8px 0;">${data.guestsAdults} Erw. + ${data.guestsChildren} Kinder = ${totalGuests} Pers.</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Haustier</td><td style="padding: 8px 0;">${data.hasPet ? "Ja" : "Nein"}</td></tr>
              </table>
              ${data.guestMessage ? `<div style="margin-top: 16px; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e5ddd3;"><p style="margin: 0; color: #666; font-size: 13px;">Nachricht:</p><p style="margin: 8px 0 0;">${data.guestMessage.replace(/\n/g, "<br>")}</p></div>` : ""}
            </div>
            <div style="padding: 24px; text-align: center; background: #f9f5f0; border: 1px solid #e5ddd3; border-top: none; border-radius: 0 0 12px 12px;">
              <a href="${approveUrl}" style="display: inline-block; padding: 14px 32px; background: #22c55e; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin-right: 12px;">✓ Bestätigen</a>
              <a href="${rejectUrl}" style="display: inline-block; padding: 14px 32px; background: #ef4444; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">✗ Ablehnen</a>
            </div>
          </div>
        `,
      });

      // Email 2: Bestätigung an Gast
      await resend.emails.send({
        from: fromEmail,
        to: data.guestEmail,
        subject: `Ihre Anfrage für Villa Gloria al Padre (${formatDate(data.checkIn)} - ${formatDate(data.checkOut)})`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #C2703E; color: white; padding: 24px; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">Vielen Dank für Ihre Anfrage!</h1>
            </div>
            <div style="background: #f9f5f0; padding: 24px; border: 1px solid #e5ddd3; border-radius: 0 0 12px 12px;">
              <p>Liebe/r ${data.guestName},</p>
              <p>wir haben Ihre Buchungsanfrage für die <strong>Villa Gloria al Padre</strong> erhalten:</p>
              <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                <tr><td style="padding: 6px 0; color: #666;">Anreise:</td><td style="padding: 6px 0; font-weight: 600;">${formatDate(data.checkIn)}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Abreise:</td><td style="padding: 6px 0; font-weight: 600;">${formatDate(data.checkOut)}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Nächte:</td><td style="padding: 6px 0;">${nights}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Gäste:</td><td style="padding: 6px 0;">${totalGuests} Personen</td></tr>
              </table>
              <p>Wir prüfen die Verfügbarkeit und melden uns <strong>innerhalb von 24 Stunden</strong> bei Ihnen.</p>
              <p style="margin-top: 24px; color: #666; font-size: 14px;">Herzliche Grüße,<br>Ihr Villa Gloria Team</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, bookingNumber });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Interner Fehler" },
      { status: 500 }
    );
  }
}
