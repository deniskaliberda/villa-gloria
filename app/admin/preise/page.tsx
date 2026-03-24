"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Save, Check } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";

interface Season {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  price_per_night_house: number;
  price_per_night_apt: number | null;
  min_nights: number;
  apt_available: boolean;
}

export default function PricingPage() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("seasons")
        .select("*")
        .order("start_date");
      setSeasons(data || []);
      setLoading(false);
    }
    load();
  }, [supabase]);

  function updateSeason(id: string, field: string, value: string | number | boolean) {
    setSeasons((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  }

  async function saveSeason(season: Season) {
    setSaving(season.id);
    await supabase
      .from("seasons")
      .update({
        name: season.name,
        start_date: season.start_date,
        end_date: season.end_date,
        price_per_night_house: season.price_per_night_house,
        price_per_night_apt: season.price_per_night_apt,
        min_nights: season.min_nights,
        apt_available: season.apt_available,
      })
      .eq("id", season.id);

    setSaving(null);
    setSaved(season.id);
    setTimeout(() => setSaved(null), 2000);
  }

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-gray-900">Preise</h1>
      <p className="mt-1 text-sm text-gray-500">
        Saisonpreise und Mindestaufenthalt bearbeiten
      </p>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#C2703E]" />
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {seasons.map((season) => (
            <div
              key={season.id}
              className="rounded-xl border border-gray-200 bg-white p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <input
                    value={season.name}
                    onChange={(e) =>
                      updateSeason(season.id, "name", e.target.value)
                    }
                    className="text-lg font-bold text-gray-900 border-none bg-transparent p-0 focus:outline-none focus:ring-0"
                  />
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                    <input
                      type="date"
                      value={season.start_date}
                      onChange={(e) =>
                        updateSeason(season.id, "start_date", e.target.value)
                      }
                      className="rounded border border-gray-300 px-2 py-1 text-xs"
                    />
                    <span>–</span>
                    <input
                      type="date"
                      value={season.end_date}
                      onChange={(e) =>
                        updateSeason(season.id, "end_date", e.target.value)
                      }
                      className="rounded border border-gray-300 px-2 py-1 text-xs"
                    />
                  </div>
                </div>
                <button
                  onClick={() => saveSeason(season)}
                  disabled={saving === season.id}
                  className="flex items-center gap-1 rounded-lg bg-[#C2703E] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#A85D33] disabled:opacity-50"
                >
                  {saved === season.id ? (
                    <>
                      <Check className="h-4 w-4" /> Gespeichert
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" /> Speichern
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500">
                    Haus (€/Nacht)
                  </label>
                  <input
                    type="number"
                    value={season.price_per_night_house / 100}
                    onChange={(e) =>
                      updateSeason(
                        season.id,
                        "price_per_night_house",
                        Math.round(parseFloat(e.target.value) * 100)
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">
                    Apartment (€/Nacht)
                  </label>
                  <input
                    type="number"
                    value={(season.price_per_night_apt || 0) / 100}
                    onChange={(e) =>
                      updateSeason(
                        season.id,
                        "price_per_night_apt",
                        Math.round(parseFloat(e.target.value) * 100)
                      )
                    }
                    disabled={!season.apt_available}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">
                    Min. Nächte
                  </label>
                  <input
                    type="number"
                    value={season.min_nights}
                    onChange={(e) =>
                      updateSeason(
                        season.id,
                        "min_nights",
                        parseInt(e.target.value)
                      )
                    }
                    min={1}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={season.apt_available}
                      onChange={(e) =>
                        updateSeason(
                          season.id,
                          "apt_available",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    Apartment verfügbar
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
