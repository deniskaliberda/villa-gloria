import ical from "ical-generator";
import { createAdminClient } from "@/lib/supabase/admin";
import type { PropertyType } from "@/lib/pricing";

/**
 * Generate an iCal feed from confirmed bookings + blocked dates.
 */
export async function generateICalFeed(
  propertyType: PropertyType
): Promise<string> {
  const supabase = createAdminClient();
  const calendar = ical({
    name: `Villa Gloria – ${propertyType === "house" ? "Haus" : "Apartment"}`,
    prodId: "//Villa Gloria//Booking//DE",
    timezone: "Europe/Zagreb",
  });

  // Get confirmed bookings
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .in("status", ["deposit_paid", "fully_paid", "confirmed"])
    .order("check_in");

  for (const booking of bookings || []) {
    if (propertyType === "house" || booking.property_type === propertyType) {
      const ev = calendar.createEvent({
        start: new Date(booking.check_in),
        end: new Date(booking.check_out),
        summary: `Gebucht: ${booking.booking_number}`,
        description: `Gast: ${booking.guest_name}\nGäste: ${booking.guests_adults} Erw.${booking.guests_children ? ` + ${booking.guests_children} Kinder` : ""}`,
        allDay: true,
      });
      ev.uid(`booking-${booking.id}@villa-gloria.com`);
    }
  }

  // Get manual blocks
  const { data: blocked } = await supabase
    .from("blocked_dates")
    .select("*")
    .is("ical_uid", null)
    .order("start_date");

  for (const block of blocked || []) {
    if (
      propertyType === "house" ||
      block.property_type === propertyType ||
      block.property_type === "house"
    ) {
      const ev = calendar.createEvent({
        start: new Date(block.start_date),
        end: new Date(block.end_date),
        summary: block.reason || "Blockiert",
        allDay: true,
      });
      ev.uid(`block-${block.id}@villa-gloria.com`);
    }
  }

  return calendar.toString();
}

/**
 * Parse an external iCal feed and sync blocked dates.
 * Uses dynamic import for node-ical to avoid Turbopack BigInt issue.
 */
export async function syncICalSource(sourceId: string): Promise<{
  added: number;
  removed: number;
  errors: string[];
}> {
  const supabase = createAdminClient();
  const errors: string[] = [];

  const { data: source, error: sourceError } = await supabase
    .from("ical_sources")
    .select("*")
    .eq("id", sourceId)
    .single();

  if (sourceError || !source) {
    return { added: 0, removed: 0, errors: ["Source not found"] };
  }

  // Dynamic import to avoid Turbopack BigInt issue at module evaluation
  const icalParser = await import("node-ical");

  let events: Awaited<ReturnType<typeof icalParser.async.fromURL>>;

  try {
    events = await icalParser.async.fromURL(source.url);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Fetch failed";
    await supabase
      .from("ical_sources")
      .update({
        sync_errors: message,
        last_synced_at: new Date().toISOString(),
      })
      .eq("id", sourceId);
    return { added: 0, removed: 0, errors: [message] };
  }

  const { data: existingBlocks } = await supabase
    .from("blocked_dates")
    .select("id, ical_uid")
    .eq("source", sourceId);

  const existingUids = new Set(
    (existingBlocks || []).map((b) => b.ical_uid).filter(Boolean)
  );
  const currentUids = new Set<string>();

  let added = 0;

  for (const key of Object.keys(events)) {
    const event = events[key];
    if (!event || event.type !== "VEVENT") continue;

    const uid = event.uid;
    if (!uid) continue;

    currentUids.add(uid);

    const startDate =
      event.start instanceof Date
        ? event.start.toISOString().split("T")[0]
        : String(event.start);
    const endDate =
      event.end instanceof Date
        ? event.end.toISOString().split("T")[0]
        : String(event.end);

    if (!existingUids.has(uid)) {
      const { error: insertError } = await supabase
        .from("blocked_dates")
        .insert({
          start_date: startDate,
          end_date: endDate,
          reason: event.summary || "Portal-Buchung",
          source: sourceId,
          ical_uid: uid,
          property_type: source.property_type,
        });

      if (insertError) {
        errors.push(`Insert failed for ${uid}: ${insertError.message}`);
      } else {
        added++;
      }
    }
  }

  let removed = 0;
  for (const block of existingBlocks || []) {
    if (block.ical_uid && !currentUids.has(block.ical_uid)) {
      await supabase.from("blocked_dates").delete().eq("id", block.id);
      removed++;
    }
  }

  await supabase
    .from("ical_sources")
    .update({
      last_synced_at: new Date().toISOString(),
      sync_errors: errors.length > 0 ? errors.join("; ") : null,
    })
    .eq("id", sourceId);

  return { added, removed, errors };
}
