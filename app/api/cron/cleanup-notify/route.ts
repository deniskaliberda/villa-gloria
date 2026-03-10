import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { notifyAdmin } from "@/lib/resend";
import { CleaningNotification } from "@/emails/CleaningNotification";

const CRON_SECRET = process.env.CRON_SECRET;

/**
 * Daily cron job (06:00 UTC) — Cleaning team notification:
 * - 1 day before check-out → Notify cleaning team
 */
export async function GET(request: Request) {
  // Verify cron secret (Vercel cron)
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

  // Find bookings with check-out tomorrow
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .in("status", ["deposit_paid", "fully_paid"])
    .eq("check_out", tomorrowDate);

  for (const booking of bookings || []) {
    await notifyAdmin(
      `Reinigung morgen: ${booking.booking_number} (${tomorrowDate})`,
      CleaningNotification({
        bookingNumber: booking.booking_number,
        checkOut: booking.check_out,
        guestsAdults: booking.guests_adults,
        guestsChildren: booking.guests_children || 0,
        hasPet: booking.has_pet || false,
        propertyType: booking.property_type,
      }),
      booking.id,
      "cleaning_notification"
    );
    results.push(`Cleaning notification: ${booking.booking_number}`);
  }

  return NextResponse.json({
    success: true,
    processed: results.length,
    details: results,
  });
}
