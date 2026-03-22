import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations";
import { calculatePrice } from "@/lib/pricing";
import { checkAvailability } from "@/lib/availability";
import { createAdminClient } from "@/lib/supabase/admin";
import { notifyOwner } from "@/lib/resend";
import { ApprovalRequest } from "@/emails/ApprovalRequest";

/**
 * Generate a sequential booking number: VG-YYYY-NNN
 */
async function getNextBookingNumber(): Promise<string> {
  const supabase = createAdminClient();
  const year = new Date().getFullYear();
  const prefix = `VG-${year}-`;

  const { data } = await supabase
    .from("bookings")
    .select("booking_number")
    .like("booking_number", `${prefix}%`)
    .order("booking_number", { ascending: false })
    .limit(1);

  let seq = 1;
  if (data && data.length > 0) {
    const lastNum = parseInt(data[0].booking_number.split("-")[2], 10);
    seq = lastNum + 1;
  }

  return `${prefix}${String(seq).padStart(3, "0")}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 1. Re-check availability (race condition protection)
    const availability = await checkAvailability(
      data.checkIn,
      data.checkOut,
      data.propertyType
    );

    if (!availability.available) {
      return NextResponse.json(
        { error: "Dates are no longer available" },
        { status: 409 }
      );
    }

    // 2. Calculate price server-side (never trust client price)
    const price = await calculatePrice(
      data.checkIn,
      data.checkOut,
      data.propertyType,
      data.hasPet
    );

    if (price.minNightsViolation) {
      return NextResponse.json(
        {
          error: `Minimum stay is ${price.minNights} nights for this period`,
        },
        { status: 400 }
      );
    }

    // 3. Generate booking number
    const bookingNumber = await getNextBookingNumber();

    // 4. Insert booking into Supabase
    const supabase = createAdminClient();
    const { data: booking, error: insertError } = await supabase
      .from("bookings")
      .insert({
        booking_number: bookingNumber,
        status: "inquiry_received",
        property_type: data.propertyType,
        check_in: data.checkIn,
        check_out: data.checkOut,
        guests_adults: data.guestsAdults,
        guests_children: data.guestsChildren,
        has_pet: data.hasPet,
        guest_name: data.guestName,
        guest_email: data.guestEmail,
        guest_phone: data.guestPhone || null,
        guest_country: data.guestCountry,
        guest_message: data.guestMessage || null,
        guest_language: data.guestLanguage,
        price_per_night: price.averagePricePerNight,
        total_accommodation: price.totalAccommodation,
        cleaning_fee: price.cleaningFee,
        pet_fee: price.petFee,
        total_price: price.totalPrice,
        deposit_amount: price.depositAmount,
        remaining_amount: price.remainingAmount,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Booking insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to create booking" },
        { status: 500 }
      );
    }

    // 5. Send approval request email to owner
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://villa-gloria-istrien.de";
    const approveUrl = `${baseUrl}/api/admin/booking/${booking.id}/approve?token=${booking.approval_token}`;
    const rejectUrl = `${baseUrl}/api/admin/booking/${booking.id}/reject?token=${booking.approval_token}`;

    const checkInDate = new Date(data.checkIn).toLocaleDateString("de-DE", {
      day: "numeric", month: "long", year: "numeric",
    });
    const checkOutDate = new Date(data.checkOut).toLocaleDateString("de-DE", {
      day: "numeric", month: "long", year: "numeric",
    });

    await notifyOwner(
      `Neue Anfrage: ${bookingNumber} – Bitte bestätigen`,
      ApprovalRequest({
        bookingNumber,
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestPhone: data.guestPhone || undefined,
        guestCountry: data.guestCountry,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        nights: price.nights,
        propertyType: data.propertyType,
        guestsAdults: data.guestsAdults,
        guestsChildren: data.guestsChildren,
        hasPet: data.hasPet,
        totalPrice: price.totalPrice,
        guestMessage: data.guestMessage || undefined,
        approveUrl,
        rejectUrl,
      }),
      booking.id,
      "approval_request"
    );

    return NextResponse.json({
      success: true,
      bookingNumber,
    });
  } catch (error) {
    console.error("Booking error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
