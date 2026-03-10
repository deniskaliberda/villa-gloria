import { NextRequest, NextResponse } from "next/server";
import {
  availabilityQuerySchema,
  blockedDatesQuerySchema,
} from "@/lib/validations";
import { checkAvailability, getBlockedDates } from "@/lib/availability";

/**
 * GET /api/availability?checkIn=...&checkOut=...&propertyType=house
 * Check if specific dates are available.
 *
 * GET /api/availability?propertyType=house&from=2026-01-01&to=2026-12-31
 * Get all blocked date ranges for calendar display.
 */
export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams);

    // If "from" and "to" are provided, return blocked dates for calendar
    if (params.from && params.to) {
      const parsed = blockedDatesQuerySchema.safeParse(params);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Invalid parameters", details: parsed.error.issues },
          { status: 400 }
        );
      }

      const blocked = await getBlockedDates(
        parsed.data.propertyType,
        parsed.data.from,
        parsed.data.to
      );
      return NextResponse.json({ blockedDates: blocked });
    }

    // Otherwise, check availability for specific dates
    const parsed = availabilityQuerySchema.safeParse(params);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid parameters", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { checkIn, checkOut, propertyType } = parsed.data;
    const result = await checkAvailability(checkIn, checkOut, propertyType);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
