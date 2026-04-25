import { NextResponse } from "next/server";
import { Resend } from "resend";
import { verifyBookingToken } from "@/lib/booking-token";
import { formatDate, getNights } from "@/lib/utils";
import { getSupabaseAdmin } from "@/lib/supabase";

type Props = {
  params: Promise<{ action: string }>;
};

export async function GET(request: Request, { params }: Props) {
  const { action } = await params;
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return new NextResponse(errorPage("Ungültiger Link", "Der Link enthält kein Token."), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (action !== "approve" && action !== "reject") {
    return new NextResponse(errorPage("Ungültige Aktion", "Nur 'approve' oder 'reject' sind erlaubt."), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const data = verifyBookingToken(token);
  if (!data) {
    return new NextResponse(errorPage("Ungültiger Token", "Der Link ist abgelaufen oder ungültig."), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const nights = getNights(data.checkIn, data.checkOut);

  // Update booking status — fail-safe (email path is the existing fallback)
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const updates: Record<string, unknown> = {
        status: action === "approve" ? "approved" : "rejected",
      };
      if (action === "approve") updates.approved_at = new Date().toISOString();
      else updates.rejected_at = new Date().toISOString();
      await supabase.from("bookings").update(updates).eq("booking_number", data.bookingNumber);
    } catch (e) {
      console.error("[booking/" + action + "] status update failed:", e);
    }
  }

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Villa Gloria <buchung@villa-gloria-istrien.de>";

    if (action === "approve") {
      await resend.emails.send({
        from: fromEmail,
        to: data.guestEmail,
        subject: `Buchungsbestätigung — Villa Gloria al Padre (${formatDate(data.checkIn)} - ${formatDate(data.checkOut)})`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #22c55e; color: white; padding: 24px; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">Buchung bestätigt!</h1>
              <p style="margin: 8px 0 0; opacity: 0.9;">${data.bookingNumber}</p>
            </div>
            <div style="background: #f9f5f0; padding: 24px; border: 1px solid #e5ddd3; border-radius: 0 0 12px 12px;">
              <p>Liebe/r ${data.guestName},</p>
              <p>Ihre Buchung für die <strong>Villa Gloria al Padre</strong> ist bestätigt!</p>
              <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                <tr><td style="padding: 6px 0; color: #666;">Buchungsnr.:</td><td style="padding: 6px 0; font-weight: 600;">${data.bookingNumber}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Anreise:</td><td style="padding: 6px 0; font-weight: 600;">${formatDate(data.checkIn)} (Check-in ab 17:00)</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Abreise:</td><td style="padding: 6px 0; font-weight: 600;">${formatDate(data.checkOut)} (Check-out bis 10:00)</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Nächte:</td><td style="padding: 6px 0;">${nights}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Gäste:</td><td style="padding: 6px 0;">${data.guestsAdults} Erw. + ${data.guestsChildren} Kinder</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Haustier:</td><td style="padding: 6px 0;">${data.hasPet ? "Ja (+50 €)" : "Nein"}</td></tr>
              </table>
              <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e5ddd3;">
                <p style="margin: 0; font-weight: 600;">Nächste Schritte:</p>
                <ol style="margin: 8px 0 0; padding-left: 20px; color: #666;">
                  <li>Sie erhalten in Kürze einen Mietvertrag per E-Mail.</li>
                  <li>Nach Unterzeichnung überweisen Sie die Anzahlung (30%).</li>
                  <li>Vor Ort werden Sie von unserer Ansprechpartnerin Caroline empfangen.</li>
                </ol>
              </div>
              <p style="margin-top: 24px; color: #666; font-size: 14px;">Bei Fragen antworten Sie einfach auf diese E-Mail.<br><br>Herzliche Grüße,<br>Ihr Villa Gloria Team</p>
            </div>
          </div>
        `,
      });
    } else {
      await resend.emails.send({
        from: fromEmail,
        to: data.guestEmail,
        subject: `Ihre Anfrage für Villa Gloria al Padre — Leider nicht verfügbar`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #C2703E; color: white; padding: 24px; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">Leider nicht verfügbar</h1>
            </div>
            <div style="background: #f9f5f0; padding: 24px; border: 1px solid #e5ddd3; border-radius: 0 0 12px 12px;">
              <p>Liebe/r ${data.guestName},</p>
              <p>vielen Dank für Ihr Interesse an der Villa Gloria al Padre.</p>
              <p>Leider ist die Villa im gewünschten Zeitraum (<strong>${formatDate(data.checkIn)} - ${formatDate(data.checkOut)}</strong>) bereits belegt.</p>
              <p>Gerne können Sie auf unserer <a href="https://www.villa-gloria-istrien.de/de/buchen" style="color: #C2703E;">Buchungsseite</a> alternative Termine prüfen oder uns über das <a href="https://www.villa-gloria-istrien.de/de/kontakt" style="color: #C2703E;">Kontaktformular</a> erreichen.</p>
              <p style="margin-top: 24px; color: #666; font-size: 14px;">Herzliche Grüße,<br>Ihr Villa Gloria Team</p>
            </div>
          </div>
        `,
      });
    }
  }

  const html = action === "approve"
    ? successPage("Buchung bestätigt", `Die Buchung ${data.bookingNumber} für ${data.guestName} (${formatDate(data.checkIn)} - ${formatDate(data.checkOut)}) wurde bestätigt. Der Gast wurde per E-Mail benachrichtigt.`, "#22c55e")
    : successPage("Buchung abgelehnt", `Die Anfrage von ${data.guestName} (${formatDate(data.checkIn)} - ${formatDate(data.checkOut)}) wurde abgelehnt. Der Gast wurde per E-Mail benachrichtigt.`, "#C2703E");

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function successPage(title: string, message: string, color: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${title}</title></head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f9f5f0;">
    <div style="max-width: 480px; text-align: center; padding: 40px;">
      <div style="width: 64px; height: 64px; border-radius: 50%; background: ${color}; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
        <span style="color: white; font-size: 32px;">${title.includes("bestätigt") ? "✓" : "✗"}</span>
      </div>
      <h1 style="font-size: 28px; margin: 0 0 16px; color: #1a1a1a;">${title}</h1>
      <p style="color: #666; line-height: 1.6;">${message}</p>
      <a href="https://www.villa-gloria-istrien.de" style="display: inline-block; margin-top: 24px; padding: 12px 24px; background: #C2703E; color: white; text-decoration: none; border-radius: 8px;">Zur Website</a>
    </div>
  </body></html>`;
}

function errorPage(title: string, message: string): string {
  return successPage(title, message, "#ef4444");
}
