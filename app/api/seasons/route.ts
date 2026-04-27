import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { Season } from "@/lib/seasons";

export const revalidate = 86400;

export async function GET() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ seasons: [] satisfies Season[] });
  }

  const { data, error } = await supabase
    .from("seasons")
    .select("name, start_date, end_date, apt_available, min_nights")
    .order("start_date", { ascending: true });

  if (error || !data) {
    return NextResponse.json({ seasons: [] satisfies Season[] });
  }

  const seasons: Season[] = data.map((row) => ({
    name: row.name as string,
    start_date: row.start_date as string,
    end_date: row.end_date as string,
    apt_available: Boolean(row.apt_available),
    min_nights: (row.min_nights as number) ?? 3,
  }));

  return NextResponse.json({ seasons });
}
