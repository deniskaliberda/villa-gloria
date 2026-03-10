import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail, notifyAdmin } from "@/lib/resend";
import { BookingConfirmation } from "@/emails/BookingConfirmation";
import { LandlordNotification } from "@/emails/LandlordNotification";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 500 }
    );
  }

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.booking_id;
      const paymentType = session.metadata?.type;

      if (!bookingId) break;

      if (paymentType === "deposit") {
        // Deposit payment completed
        await supabase
          .from("bookings")
          .update({
            status: "deposit_paid",
            deposit_paid: true,
            stripe_payment_intent_id:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : session.payment_intent?.id,
            confirmed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", bookingId);

        // Send confirmation emails
        const { data: booking } = await supabase
          .from("bookings")
          .select("*")
          .eq("id", bookingId)
          .single();

        if (booking) {
          const lang = (booking.guest_language as "de" | "en") || "de";

          // Guest confirmation
          await sendEmail({
            to: booking.guest_email,
            subject:
              lang === "en"
                ? `Booking confirmed – ${booking.booking_number}`
                : `Buchung bestätigt – ${booking.booking_number}`,
            react: BookingConfirmation({
              bookingNumber: booking.booking_number,
              guestName: booking.guest_name,
              checkIn: booking.check_in,
              checkOut: booking.check_out,
              nights: booking.nights,
              propertyType: booking.property_type,
              totalPrice: booking.total_price,
              depositAmount: booking.deposit_amount,
              remainingAmount: booking.remaining_amount,
              lang,
            }),
            bookingId: booking.id,
            emailType: "booking_confirmation",
          });

          // Landlord notification
          await notifyAdmin(
            `Neue Buchung: ${booking.booking_number}`,
            LandlordNotification({
              bookingNumber: booking.booking_number,
              guestName: booking.guest_name,
              guestEmail: booking.guest_email,
              guestPhone: booking.guest_phone || undefined,
              guestCountry: booking.guest_country,
              checkIn: booking.check_in,
              checkOut: booking.check_out,
              nights: booking.nights,
              propertyType: booking.property_type,
              guestsAdults: booking.guests_adults,
              guestsChildren: booking.guests_children || 0,
              hasPet: booking.has_pet || false,
              totalPrice: booking.total_price,
              depositAmount: booking.deposit_amount,
              guestMessage: booking.guest_message || undefined,
            }),
            booking.id,
            "landlord_notification"
          );
        }

        console.log(`Deposit paid for booking ${bookingId}`);
      } else if (paymentType === "remaining") {
        // Remaining payment completed
        await supabase
          .from("bookings")
          .update({
            status: "fully_paid",
            remaining_paid: true,
            updated_at: new Date().toISOString(),
          })
          .eq("id", bookingId);

        console.log(`Fully paid for booking ${bookingId}`);
      }
      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.booking_id;

      if (bookingId) {
        // Only cancel if still pending (deposit not yet paid)
        await supabase
          .from("bookings")
          .update({
            status: "cancelled",
            cancelled_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", bookingId)
          .eq("status", "pending");
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
