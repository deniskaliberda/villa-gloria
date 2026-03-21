import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { notifyOwner } from "@/lib/resend";
import { ApprovalRequest } from "@/emails/ApprovalRequest";

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
        // Deposit payment completed — set to awaiting_approval (owner must confirm)
        await supabase
          .from("bookings")
          .update({
            status: "awaiting_approval",
            deposit_paid: true,
            stripe_payment_intent_id:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : session.payment_intent?.id,
            updated_at: new Date().toISOString(),
          })
          .eq("id", bookingId);

        // Send approval request to owner (NOT confirmation to guest yet)
        const { data: booking } = await supabase
          .from("bookings")
          .select("*")
          .eq("id", bookingId)
          .single();

        if (booking) {
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://villa-gloria.com";
          const approveUrl = `${baseUrl}/api/admin/booking/${booking.id}/approve?token=${booking.approval_token}`;
          const rejectUrl = `${baseUrl}/api/admin/booking/${booking.id}/reject?token=${booking.approval_token}`;

          const checkInDate = new Date(booking.check_in).toLocaleDateString("de-DE", {
            day: "numeric", month: "long", year: "numeric",
          });
          const checkOutDate = new Date(booking.check_out).toLocaleDateString("de-DE", {
            day: "numeric", month: "long", year: "numeric",
          });

          await notifyOwner(
            `Neue Buchungsanfrage: ${booking.booking_number} – Bitte bestätigen`,
            ApprovalRequest({
              bookingNumber: booking.booking_number,
              guestName: booking.guest_name,
              guestEmail: booking.guest_email,
              guestPhone: booking.guest_phone || undefined,
              guestCountry: booking.guest_country,
              checkIn: checkInDate,
              checkOut: checkOutDate,
              nights: booking.nights,
              propertyType: booking.property_type,
              guestsAdults: booking.guests_adults,
              guestsChildren: booking.guests_children || 0,
              hasPet: booking.has_pet || false,
              totalPrice: booking.total_price,
              depositAmount: booking.deposit_amount,
              guestMessage: booking.guest_message || undefined,
              approveUrl,
              rejectUrl,
            }),
            booking.id,
            "approval_request"
          );
        }

        console.log(`Deposit paid, awaiting approval for booking ${bookingId}`);
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
