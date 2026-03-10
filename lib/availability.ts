import { createAdminClient } from "@/lib/supabase/admin";
import type { PropertyType } from "@/lib/pricing";

export interface AvailabilityResult {
  available: boolean;
  conflictingBookings: string[];
  conflictingBlocked: string[];
}

/**
 * Check if a property is available for the given date range.
 * Cross-property blocking: house booked → apartment blocked, apartment booked → house blocked.
 */
export async function checkAvailability(
  checkIn: string,
  checkOut: string,
  _propertyType: PropertyType
): Promise<AvailabilityResult> {
  const supabase = createAdminClient();

  // Check bookings that overlap with the requested dates
  // A booking overlaps if its check_in < our check_out AND its check_out > our check_in
  const { data: bookings, error: bookingError } = await supabase
    .from("bookings")
    .select("id, booking_number, check_in, check_out, property_type")
    .in("status", ["pending", "deposit_paid", "fully_paid", "confirmed"])
    .lt("check_in", checkOut)
    .gt("check_out", checkIn);

  if (bookingError)
    throw new Error(`Failed to check bookings: ${bookingError.message}`);

  // For house bookings: any booking (house or apartment) blocks it
  // For apartment bookings: any booking (house or apartment) blocks it
  // Because they share the same physical space
  // All bookings conflict regardless of property type since they share physical space
  const conflictingBookings = (bookings || []).map((b) => b.booking_number);

  // Check blocked dates (manual blocks + iCal imports)
  const { data: blocked, error: blockedError } = await supabase
    .from("blocked_dates")
    .select("id, start_date, end_date, reason, property_type")
    .lt("start_date", checkOut)
    .gt("end_date", checkIn);

  if (blockedError)
    throw new Error(`Failed to check blocked dates: ${blockedError.message}`);

  const conflictingBlocked = (blocked || [])
    .filter((b) => {
      // A house block affects both property types
      if (b.property_type === "house") return true;
      // An apartment block only affects apartment bookings directly,
      // but also affects house since house includes the apartment
      return true;
    })
    .map((b) => b.reason || "Blockiert");

  return {
    available:
      conflictingBookings.length === 0 && conflictingBlocked.length === 0,
    conflictingBookings,
    conflictingBlocked,
  };
}

/**
 * Get all blocked date ranges for a property type for the calendar display.
 * Returns dates that should be shown as unavailable.
 */
export async function getBlockedDates(
  propertyType: PropertyType,
  fromDate: string,
  toDate: string
): Promise<{ start: string; end: string; reason: string }[]> {
  const supabase = createAdminClient();

  // Get bookings
  const { data: bookings } = await supabase
    .from("bookings")
    .select("check_in, check_out, property_type")
    .in("status", ["pending", "deposit_paid", "fully_paid", "confirmed"])
    .lt("check_in", toDate)
    .gt("check_out", fromDate);

  // Get blocked dates
  const { data: blocked } = await supabase
    .from("blocked_dates")
    .select("start_date, end_date, reason, property_type")
    .lt("start_date", toDate)
    .gt("end_date", fromDate);

  const result: { start: string; end: string; reason: string }[] = [];

  // Add booking blocks
  for (const b of bookings || []) {
    result.push({
      start: b.check_in,
      end: b.check_out,
      reason: "Gebucht",
    });
  }

  // Add manual/iCal blocks
  for (const b of blocked || []) {
    result.push({
      start: b.start_date,
      end: b.end_date,
      reason: b.reason || "Blockiert",
    });
  }

  return result;
}
