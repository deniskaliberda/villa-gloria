import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createHash } from "node:crypto";
import { bookingInquirySchema } from "@/lib/validations";
import { createBookingToken } from "@/lib/booking-token";
import { formatDate, getNights } from "@/lib/utils";
import { getSupabaseAdmin } from "@/lib/supabase";

function deriveSource(utmSource?: string, utmMedium?: string, referrer?: string): string {
  if (utmMedium === "cpc" || utmSource === "google_ads") return "paid_search";
  if (utmMedium === "social" || utmSource === "facebook" || utmSource === "instagram") return "social";
  if (utmMedium === "email") return "email";
  if (utmSource) return utmSource.toLowerCase();
  if (!referrer) return "direct";
  if (/google|bing|duckduckgo/i.test(referrer)) return "organic";
  return "referral";
}

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
    const propertyName = data.property === "apartment" ? "Poolwohnung" : "Gesamtes Haus";

    // ---- Persist inquiry in `bookings` FIRST so we don't lose it if email fails ----
    // bookings already has booking_number, status (default 'pending'), approval_token,
    // approved_at, rejected_at, stripe fields. We only add UTM/attribution columns.
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
      const ipHash = ip ? createHash("sha256").update(ip).digest("hex").slice(0, 32) : null;
      const userAgent = request.headers.get("user-agent")?.slice(0, 500) || null;
      const propertyType = (data.property || "haus") === "apartment" ? "apartment" : "house";

      try {
        const { error } = await supabase.from("bookings").insert({
          booking_number: bookingNumber,
          status: "pending",
          property_type: propertyType,
          check_in: data.checkIn,
          check_out: data.checkOut,
          guests_adults: data.guestsAdults,
          guests_children: data.guestsChildren,
          has_pet: data.hasPet,
          guest_name: data.guestName,
          guest_email: data.guestEmail,
          guest_phone: data.guestPhone || null,
          guest_message: data.guestMessage || null,
          guest_language: "de",
          // Pricing not yet known at inquiry stage — Wieland sets on approve
          price_per_night: 0,
          total_accommodation: 0,
          total_price: 0,
          deposit_amount: 0,
          remaining_amount: 0,
          source: deriveSource(data.utmSource, data.utmMedium, data.referrer),
          utm_source: data.utmSource || null,
          utm_medium: data.utmMedium || null,
          utm_campaign: data.utmCampaign || null,
          referrer: data.referrer || null,
          user_agent: userAgent,
          ip_hash: ipHash,
        });
        if (error) {
          // Log but do not fail — email path is the existing fallback.
          console.error("[booking] inquiry persist failed:", error.message);
        }
      } catch (e) {
        console.error("[booking] inquiry persist exception:", e);
      }
    }

    const token = createBookingToken({
      bookingNumber,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      property: data.property || "haus",
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
      const fromEmail = process.env.RESEND_FROM_EMAIL || "Villa Gloria <buchung@villa-gloria-istrien.de>";

      // Email 1: Anfrage an Vermieter + CC Wieland
      await resend.emails.send({
        from: fromEmail,
        to: "info@urlaubsbleibe.de",
        cc: "wieland.oswald@fahrzeugbau-pfaff.de",
        replyTo: data.guestEmail,
        subject: `Neue Buchungsanfrage: ${data.guestName} – ${propertyName} (${formatDate(data.checkIn)} - ${formatDate(data.checkOut)})`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #C2703E; color: white; padding: 24px; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">Neue Buchungsanfrage</h1>
              <p style="margin: 8px 0 0; opacity: 0.9;">${bookingNumber}</p>
            </div>
            <div style="background: #f9f5f0; padding: 24px; border: 1px solid #e5ddd3;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #666; width: 140px;">Unterkunft</td><td style="padding: 8px 0; font-weight: 600;">${propertyName}</td></tr>
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
