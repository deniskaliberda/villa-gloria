import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/resend";
import { PaymentReminder } from "@/emails/PaymentReminder";
import { CheckInInfo } from "@/emails/CheckInInfo";
import { ReviewRequest } from "@/emails/ReviewRequest";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const CRON_SECRET = process.env.CRON_SECRET;

/**
 * Daily cron job (07:00 UTC) — Guest reminders:
 * - 6 weeks before check-in → Payment reminder with Stripe link
 * - 3 days before check-in → Check-in info
 * - 3 days after check-out → Review request
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
  const today = new Date();
  const results: string[] = [];

  // --- 6 weeks before check-in → Payment reminder ---
  const sixWeeksFromNow = new Date(today);
  sixWeeksFromNow.setDate(sixWeeksFromNow.getDate() + 42);
  const sixWeeksDate = sixWeeksFromNow.toISOString().split("T")[0];

  const { data: paymentBookings } = await supabase
    .from("bookings")
    .select("*")
    .eq("status", "confirmed")
    .eq("remaining_paid", false)
    .eq("check_in", sixWeeksDate);

  for (const booking of paymentBookings || []) {
    const lang = (booking.guest_language as "de" | "en") || "de";

    // Create Stripe payment link for remaining amount
    let paymentLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/buchen`;

    if (stripe) {
      try {
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          payment_method_types: ["card"],
          customer_email: booking.guest_email,
          metadata: {
            booking_id: booking.id,
            booking_number: booking.booking_number,
            type: "remaining",
          },
          line_items: [
            {
              price_data: {
                currency: "eur",
                product_data: {
                  name: "Villa Gloria – Restzahlung",
                  description: `Buchung ${booking.booking_number}`,
                },
                unit_amount: booking.remaining_amount,
              },
              quantity: 1,
            },
          ],
          success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/buchen/bestaetigung?booking=${booking.booking_number}`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/buchen`,
        });
        paymentLink = session.url || paymentLink;
      } catch (err) {
        console.error("Failed to create payment link:", err);
      }
    }

    await sendEmail({
      to: booking.guest_email,
      subject:
        lang === "en"
          ? `Payment reminder – ${booking.booking_number}`
          : `Erinnerung Restzahlung – ${booking.booking_number}`,
      react: PaymentReminder({
        bookingNumber: booking.booking_number,
        guestName: booking.guest_name,
        checkIn: booking.check_in,
        remainingAmount: booking.remaining_amount,
        paymentLink,
        lang,
      }),
      bookingId: booking.id,
      emailType: "payment_reminder",
    });
    results.push(`Payment reminder: ${booking.booking_number}`);
  }

  // --- 3 days before check-in → Check-in info ---
  const threeDaysFromNow = new Date(today);
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
  const threeDaysDate = threeDaysFromNow.toISOString().split("T")[0];

  const { data: checkinBookings } = await supabase
    .from("bookings")
    .select("*")
    .in("status", ["confirmed", "fully_paid"])
    .eq("check_in", threeDaysDate);

  for (const booking of checkinBookings || []) {
    const lang = (booking.guest_language as "de" | "en") || "de";

    await sendEmail({
      to: booking.guest_email,
      subject:
        lang === "en"
          ? `Check-in information – ${booking.booking_number}`
          : `Check-in-Informationen – ${booking.booking_number}`,
      react: CheckInInfo({
        bookingNumber: booking.booking_number,
        guestName: booking.guest_name,
        checkIn: booking.check_in,
        checkOut: booking.check_out,
        lang,
      }),
      bookingId: booking.id,
      emailType: "checkin_info",
    });
    results.push(`Check-in info: ${booking.booking_number}`);
  }

  // --- 3 days after check-out → Review request ---
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  const threeDaysAgoDate = threeDaysAgo.toISOString().split("T")[0];

  const { data: reviewBookings } = await supabase
    .from("bookings")
    .select("*")
    .in("status", ["confirmed", "fully_paid"])
    .eq("check_out", threeDaysAgoDate);

  for (const booking of reviewBookings || []) {
    const lang = (booking.guest_language as "de" | "en") || "de";

    await sendEmail({
      to: booking.guest_email,
      subject:
        lang === "en"
          ? "How was your stay at Villa Gloria?"
          : "Wie war Ihr Urlaub in der Villa Gloria?",
      react: ReviewRequest({
        guestName: booking.guest_name,
        checkIn: booking.check_in,
        checkOut: booking.check_out,
        lang,
      }),
      bookingId: booking.id,
      emailType: "review_request",
    });
    results.push(`Review request: ${booking.booking_number}`);
  }

  return NextResponse.json({
    success: true,
    processed: results.length,
    details: results,
  });
}
