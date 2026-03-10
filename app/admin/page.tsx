"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import {
  CalendarCheck,
  Euro,
  Users,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";

interface Stats {
  upcomingBookings: number;
  totalRevenue: number;
  totalBookings: number;
  nextCheckIn: string | null;
}

interface RecentBooking {
  id: string;
  booking_number: string;
  guest_name: string;
  check_in: string;
  check_out: string;
  status: string;
  total_price: number;
  property_type: string;
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
  deposit_paid: { label: "Anzahlung bezahlt", color: "bg-blue-100 text-blue-700" },
  fully_paid: { label: "Voll bezahlt", color: "bg-green-100 text-green-700" },
  confirmed: { label: "Bestätigt", color: "bg-green-100 text-green-700" },
  cancelled: { label: "Storniert", color: "bg-red-100 text-red-700" },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function loadData() {
      const today = new Date().toISOString().split("T")[0];

      const { count: upcoming } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .in("status", ["deposit_paid", "fully_paid", "confirmed"])
        .gte("check_in", today);

      const { data: revenueData } = await supabase
        .from("bookings")
        .select("total_price")
        .in("status", ["deposit_paid", "fully_paid", "confirmed"]);

      const totalRevenue = (revenueData || []).reduce(
        (sum, b) => sum + b.total_price,
        0
      );

      const { count: totalBookings } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .neq("status", "cancelled");

      const { data: nextData } = await supabase
        .from("bookings")
        .select("check_in")
        .in("status", ["deposit_paid", "fully_paid", "confirmed"])
        .gte("check_in", today)
        .order("check_in")
        .limit(1);

      setStats({
        upcomingBookings: upcoming || 0,
        totalRevenue,
        totalBookings: totalBookings || 0,
        nextCheckIn: nextData?.[0]?.check_in || null,
      });

      const { data: recentData } = await supabase
        .from("bookings")
        .select(
          "id, booking_number, guest_name, check_in, check_out, status, total_price, property_type"
        )
        .order("created_at", { ascending: false })
        .limit(5);

      setRecent(recentData || []);
      setLoading(false);
    }

    loadData();
  }, [supabase]);

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">
        Villa Gloria al Padre Buchungsverwaltung
      </p>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={CalendarCheck}
              label="Anstehende Buchungen"
              value={String(stats?.upcomingBookings || 0)}
            />
            <StatCard
              icon={Euro}
              label="Gesamtumsatz"
              value={formatEuro(stats?.totalRevenue || 0)}
            />
            <StatCard
              icon={Users}
              label="Buchungen gesamt"
              value={String(stats?.totalBookings || 0)}
            />
            <StatCard
              icon={TrendingUp}
              label="Nächster Check-in"
              value={stats?.nextCheckIn || "–"}
            />
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Letzte Buchungen
              </h2>
              <Link
                href="/admin/buchungen"
                className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700"
              >
                Alle anzeigen <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
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
                  {recent.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-sm text-gray-500"
                      >
                        Noch keine Buchungen vorhanden.
                      </td>
                    </tr>
                  ) : (
                    recent.map((b) => {
                      const st = statusLabels[b.status] || {
                        label: b.status,
                        color: "bg-gray-100 text-gray-700",
                      };
                      return (
                        <tr key={b.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {b.booking_number}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {b.guest_name}
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
            </div>
          </div>
        </>
      )}
    </AdminShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarCheck;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
          <Icon className="h-5 w-5 text-orange-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
