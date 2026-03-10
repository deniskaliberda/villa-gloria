import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { syncICalSource } from "@/lib/ical";

const CRON_SECRET = process.env.CRON_SECRET;

/**
 * Cron job (every 15 minutes) — Sync iCal feeds from external portals.
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

  // Get all active iCal sources
  const { data: sources } = await supabase
    .from("ical_sources")
    .select("id, name, url")
    .eq("active", true);

  if (!sources || sources.length === 0) {
    return NextResponse.json({
      success: true,
      message: "No active iCal sources",
    });
  }

  const results = [];

  for (const source of sources) {
    const result = await syncICalSource(source.id);
    results.push({
      source: source.name,
      ...result,
    });
  }

  return NextResponse.json({
    success: true,
    synced: results.length,
    details: results,
  });
}
