"use client";

import { useEffect, useState, useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";

interface CalendarEntry {
  id: string;
  type: "booking" | "blocked";
  start: string;
  end: string;
  label: string;
  color: string;
}

const MONTHS = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

export default function CalendarPage() {
  const [entries, setEntries] = useState<CalendarEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showBlockForm, setShowBlockForm] = useState(false);
  const [blockStart, setBlockStart] = useState("");
  const [blockEnd, setBlockEnd] = useState("");
  const [blockReason, setBlockReason] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function loadData() {
    setLoading(true);
    const startOfMonth = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-01`;
    const endDate = new Date(currentYear, currentMonth + 1, 0);
    const endOfMonth = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;

    const { data: bookings } = await supabase
      .from("bookings")
      .select("id, booking_number, check_in, check_out, guest_name, status")
      .in("status", ["pending", "deposit_paid", "fully_paid", "confirmed"])
      .lte("check_in", endOfMonth)
      .gte("check_out", startOfMonth);

    const { data: blocked } = await supabase
      .from("blocked_dates")
      .select("id, start_date, end_date, reason")
      .lte("start_date", endOfMonth)
      .gte("end_date", startOfMonth);

    const items: CalendarEntry[] = [];

    for (const b of bookings || []) {
      items.push({
        id: b.id,
        type: "booking",
        start: b.check_in,
        end: b.check_out,
        label: `${b.booking_number} – ${b.guest_name}`,
        color:
          b.status === "pending"
            ? "bg-yellow-200 text-yellow-800"
            : "bg-blue-200 text-blue-800",
      });
    }

    for (const b of blocked || []) {
      items.push({
        id: b.id,
        type: "blocked",
        start: b.start_date,
        end: b.end_date,
        label: b.reason || "Blockiert",
        color: "bg-red-200 text-red-800",
      });
    }

    setEntries(items);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, currentYear]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7; // Monday = 0

  const days = useMemo(() => {
    const result: (number | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) result.push(null);
    for (let d = 1; d <= daysInMonth; d++) result.push(d);
    return result;
  }, [daysInMonth, firstDayOfWeek]);

  function getEntriesForDay(day: number): CalendarEntry[] {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return entries.filter((e) => dateStr >= e.start && dateStr < e.end);
  }

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }

  async function addBlock() {
    if (!blockStart || !blockEnd) return;

    await supabase.from("blocked_dates").insert({
      start_date: blockStart,
      end_date: blockEnd,
      reason: blockReason || "Manuell blockiert",
      property_type: "house",
    });

    setShowBlockForm(false);
    setBlockStart("");
    setBlockEnd("");
    setBlockReason("");
    loadData();
  }

  async function removeBlock(id: string) {
    await supabase.from("blocked_dates").delete().eq("id", id);
    loadData();
  }

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Kalender</h1>
        <button
          onClick={() => setShowBlockForm(true)}
          className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
        >
          <Plus className="h-4 w-4" />
          Sperre hinzufügen
        </button>
      </div>

      {/* Block Form */}
      {showBlockForm && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              Neue Sperre
            </h3>
            <button onClick={() => setShowBlockForm(false)}>
              <X className="h-4 w-4 text-gray-400" />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-xs text-gray-500">Von</label>
              <input
                type="date"
                value={blockStart}
                onChange={(e) => setBlockStart(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Bis</label>
              <input
                type="date"
                value={blockEnd}
                onChange={(e) => setBlockEnd(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500">Grund</label>
              <input
                type="text"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="z.B. Wartung, Eigennutzung"
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
              />
            </div>
            <button
              onClick={addBlock}
              className="rounded-lg bg-red-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              Sperren
            </button>
          </div>
        </div>
      )}

      {/* Calendar Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          {MONTHS[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={nextMonth}
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      {loading ? (
        <div className="mt-8 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />
        </div>
      ) : (
        <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="grid grid-cols-7 bg-gray-50">
            {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
              <div
                key={d}
                className="px-2 py-2 text-center text-xs font-medium uppercase text-gray-500"
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day, i) => {
              const dayEntries = day ? getEntriesForDay(day) : [];
              return (
                <div
                  key={i}
                  className={`min-h-[80px] border-b border-r border-gray-100 p-1 ${
                    day ? "" : "bg-gray-50"
                  }`}
                >
                  {day && (
                    <>
                      <span className="text-xs font-medium text-gray-600">
                        {day}
                      </span>
                      <div className="mt-0.5 space-y-0.5">
                        {dayEntries.map((e) => (
                          <div
                            key={e.id}
                            className={`truncate rounded px-1 py-0.5 text-[10px] font-medium ${e.color}`}
                            title={e.label}
                          >
                            {e.label}
                            {e.type === "blocked" && (
                              <button
                                onClick={() => removeBlock(e.id)}
                                className="ml-1 opacity-60 hover:opacity-100"
                                title="Sperre entfernen"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </AdminShell>
  );
}
