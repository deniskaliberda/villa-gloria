import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { notifyCaretaker } from "@/lib/resend";
import { CaretakerNotification } from "@/emails/CaretakerNotification";

const CRON_SECRET = process.env.CRON_SECRET;

/**
 * Daily cron job (06:00 UTC) — Caretaker reminder:
 * - 1 day before check-out → Notify on-site caretaker (Betreuerin)
 */
export async function GET(request: Request) {
  if (CRON_SECRET) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const supabase = createAdminClient();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split("T")[0];

  const results: string[] = [];

  // Find confirmed bookings with check-out tomorrow
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .in("status", ["confirmed", "fully_paid"])
    .eq("check_out", tomorrowDate);

  for (const booking of bookings || []) {
    const checkInDate = new Date(booking.check_in).toLocaleDateString("de-DE", {
      day: "numeric", month: "long", year: "numeric",
    });
    const checkOutDate = new Date(booking.check_out).toLocaleDateString("de-DE", {
      day: "numeric", month: "long", year: "numeric",
    });

    await notifyCaretaker(
      `Check-out morgen: ${booking.booking_number}`,
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
      booking.id,
      "caretaker_checkout_reminder"
    );
    results.push(`Caretaker notification: ${booking.booking_number}`);
  }

  return NextResponse.json({
    success: true,
    processed: results.length,
    details: results,
  });
}
