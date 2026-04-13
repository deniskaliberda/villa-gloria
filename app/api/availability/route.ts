import { NextRequest, NextResponse } from "next/server";
import { eachDayOfInterval, format, parseISO } from "date-fns";
import { fetchAndParseICal } from "@/lib/ical/parser";

export const revalidate = 3600;

const ICAL_URLS: Record<string, string | undefined> = {
  haus: process.env.ICAL_URL_HAUS,
  apartment: process.env.ICAL_URL_APARTMENT,
};

export async function GET(request: NextRequest) {
  const property = request.nextUrl.searchParams.get("property") ?? "haus";
  const icalUrl = ICAL_URLS[property];

  if (!icalUrl) {
    return NextResponse.json({ blockedDates: [], property });
  }

  try {
    const events = await fetchAndParseICal(icalUrl);

    const blockedDates: string[] = [];
    for (const event of events) {
      const start = parseISO(event.startDate);
      const end = parseISO(event.endDate);

      // iCal DTEND is exclusive — last blocked night is end - 1 day
      // But for display, we block from start to end-1 (checkout day is free)
      if (end > start) {
        const days = eachDayOfInterval({
          start,
          end: new Date(end.getTime() - 86400000), // end - 1 day
        });
        for (const day of days) {
          blockedDates.push(format(day, "yyyy-MM-dd"));
        }
      }
    }

    // Deduplicate
    const unique = [...new Set(blockedDates)].sort();

    return NextResponse.json({ blockedDates: unique, property });
  } catch (error) {
    console.error(`Failed to fetch availability for ${property}:`, error);
    return NextResponse.json({ blockedDates: [], property });
  }
}
