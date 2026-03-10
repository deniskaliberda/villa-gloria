import { NextRequest, NextResponse } from "next/server";
import { generateICalFeed } from "@/lib/ical";
import type { PropertyType } from "@/lib/pricing";

/**
 * GET /api/ical?property=house|apartment
 * Export bookings and blocked dates as iCal feed.
 */
export async function GET(request: NextRequest) {
  const property = request.nextUrl.searchParams.get("property") || "house";

  if (property !== "house" && property !== "apartment") {
    return NextResponse.json(
      { error: "Invalid property type" },
      { status: 400 }
    );
  }

  try {
    const feed = await generateICalFeed(property as PropertyType);

    return new NextResponse(feed, {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="villa-gloria-${property}.ics"`,
        "Cache-Control": "public, max-age=300", // 5 min cache
      },
    });
  } catch (error) {
    console.error("iCal generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate iCal feed" },
      { status: 500 }
    );
  }
}
