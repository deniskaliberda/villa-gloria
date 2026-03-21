"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Search, Filter } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";

interface Booking {
  id: string;
  booking_number: string;
  status: string;
  property_type: string;
  check_in: string;
  check_out: string;
  nights: number;
  guest_name: string;
  guest_email: string;
  guest_phone: string | null;
  guest_country: string;
  guests_adults: number;
  guests_children: number;
  has_pet: boolean;
  total_price: number;
  deposit_amount: number;
  deposit_paid: boolean;
  remaining_amount: number;
  remaining_paid: boolean;
  created_at: string;
}

function formatEuro(cents: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "Ausstehend", color: "bg-yellow-100 text-yellow-700" },
  awaiting_approval: {
    label: "Wartet auf Bestätigung",
    color: "bg-orange-100 text-orange-700",
  },
  deposit_paid: {
    label: "Anzahlung bezahlt",
    color: "bg-blue-100 text-blue-700",
  },
  confirmed: { label: "Bestätigt", color: "bg-green-100 text-green-700" },
  fully_paid: { label: "Voll bezahlt", color: "bg-green-100 text-green-700" },
  rejected: { label: "Abgelehnt", color: "bg-red-100 text-red-700" },
  cancelled: { label: "Storniert", color: "bg-red-100 text-red-700" },
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Booking | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function load() {
      let query = supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (filter !== "all") {
        query = query.eq("status", filter);
      }

      const { data } = await query;
      setBookings(data || []);
      setLoading(false);
    }
    load();
  }, [filter, supabase]);

  const filtered = bookings.filter(
    (b) =>
      b.booking_number.toLowerCase().includes(search.toLowerCase()) ||
      b.guest_name.toLowerCase().includes(search.toLowerCase()) ||
      b.guest_email.toLowerCase().includes(search.toLowerCase())
  );

  async function approveBooking(id: string) {
    const booking = bookings.find((b) => b.id === id);
    if (!booking) return;
    const token = (booking as unknown as Record<string, unknown>).approval_token;
    if (token) {
      window.open(`/api/admin/booking/${id}/approve?token=${token}`, "_blank");
    }
  }

  async function rejectBooking(id: string) {
    const booking = bookings.find((b) => b.id === id);
    if (!booking) return;
    const token = (booking as unknown as Record<string, unknown>).approval_token;
    if (token) {
      window.open(`/api/admin/booking/${id}/reject?token=${token}`, "_blank");
    }
  }

  async function updateStatus(id: string, newStatus: string) {
    await supabase
      .from("bookings")
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
        ...(newStatus === "cancelled"
          ? { cancelled_at: new Date().toISOString() }
          : {}),
        ...(newStatus === "confirmed"
          ? { approved_at: new Date().toISOString(), confirmed_at: new Date().toISOString() }
          : {}),
        ...(newStatus === "rejected"
          ? { rejected_at: new Date().toISOString() }
          : {}),
      })
      .eq("id", id);

    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    if (selected?.id === id) {
      setSelected((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  }

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-gray-900">Buchungen</h1>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Suche nach Name, Nr. oder E-Mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="all">Alle Status</option>
            <option value="pending">Ausstehend</option>
            <option value="deposit_paid">Anzahlung bezahlt</option>
            <option value="fully_paid">Voll bezahlt</option>
            <option value="confirmed">Bestätigt</option>
            <option value="cancelled">Storniert</option>
          </select>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Nr.
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Gast
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Objekt
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Zeitraum
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">
                  Preis
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-sm text-gray-500"
                  >
                    Keine Buchungen gefunden.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => {
                  const st = statusLabels[b.status] || {
                    label: b.status,
                    color: "bg-gray-100 text-gray-700",
                  };
                  return (
                    <tr
                      key={b.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelected(b)}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {b.booking_number}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {b.guest_name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {b.property_type === "house" ? "Haus" : "Apartment"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {b.check_in} → {b.check_out}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${st.color}`}
                        >
                          {st.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                        {formatEuro(b.total_price)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/30">
          <div className="h-full w-full max-w-lg overflow-y-auto bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                {selected.booking_number}
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Gast</p>
                  <p className="font-medium text-gray-900">
                    {selected.guest_name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">E-Mail</p>
                  <p className="font-medium text-gray-900">
                    {selected.guest_email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Telefon</p>
                  <p className="font-medium text-gray-900">
                    {selected.guest_phone || "–"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Land</p>
                  <p className="font-medium text-gray-900">
                    {selected.guest_country}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Check-in</p>
                  <p className="font-medium text-gray-900">
                    {selected.check_in}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Check-out</p>
                  <p className="font-medium text-gray-900">
                    {selected.check_out}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Nächte</p>
                  <p className="font-medium text-gray-900">
                    {selected.nights}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Gäste</p>
                  <p className="font-medium text-gray-900">
                    {selected.guests_adults} Erw.
                    {selected.guests_children > 0
                      ? ` + ${selected.guests_children} Kinder`
                      : ""}
                    {selected.has_pet ? " + Haustier" : ""}
                  </p>
                </div>
              </div>

              <hr className="border-gray-200" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Gesamtpreis</p>
                  <p className="text-lg font-bold text-orange-600">
                    {formatEuro(selected.total_price)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Anzahlung</p>
                  <p className="font-medium text-gray-900">
                    {formatEuro(selected.deposit_amount)}{" "}
                    {selected.deposit_paid ? "✓" : "✗"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Restzahlung</p>
                  <p className="font-medium text-gray-900">
                    {formatEuro(selected.remaining_amount)}{" "}
                    {selected.remaining_paid ? "✓" : "✗"}
                  </p>
                </div>
              </div>

              <hr className="border-gray-200" />

              <div>
                {selected.status === "awaiting_approval" && (
                  <div className="mb-4">
                    <p className="mb-2 font-medium text-orange-700">Buchung wartet auf Bestätigung</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => approveBooking(selected.id)}
                        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                      >
                        Buchung bestätigen
                      </button>
                      <button
                        onClick={() => rejectBooking(selected.id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                      >
                        Ablehnen
                      </button>
                    </div>
                  </div>
                )}

                <p className="mb-2 text-gray-500">Status ändern</p>
                <div className="flex flex-wrap gap-2">
                  {["confirmed", "fully_paid", "rejected", "cancelled"].map(
                    (s) => {
                      const st = statusLabels[s];
                      return (
                        <button
                          key={s}
                          onClick={() => updateStatus(selected.id, s)}
                          disabled={selected.status === s}
                          className={`rounded-full px-3 py-1 text-xs font-medium transition-opacity ${st.color} ${
                            selected.status === s
                              ? "opacity-50"
                              : "hover:opacity-80"
                          }`}
                        >
                          {st.label}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
