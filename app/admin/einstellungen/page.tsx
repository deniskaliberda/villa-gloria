"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { RefreshCw, Plus, Trash2, ExternalLink, Mail } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";

interface ICalSource {
  id: string;
  name: string;
  url: string;
  property_type: string;
  last_synced_at: string | null;
  sync_errors: string | null;
  active: boolean;
}

interface EmailLogEntry {
  id: string;
  email_type: string;
  recipient: string;
  subject: string;
  sent_at: string;
  status: string;
}

export default function SettingsPage() {
  const [sources, setSources] = useState<ICalSource[]>([]);
  const [emails, setEmails] = useState<EmailLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newProperty, setNewProperty] = useState("house");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function loadData() {
    const { data: sourcesData } = await supabase
      .from("ical_sources")
      .select("*")
      .order("created_at");

    const { data: emailsData } = await supabase
      .from("email_log")
      .select("id, email_type, recipient, subject, sent_at, status")
      .order("sent_at", { ascending: false })
      .limit(20);

    setSources(sourcesData || []);
    setEmails(emailsData || []);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addSource() {
    if (!newName || !newUrl) return;

    await supabase.from("ical_sources").insert({
      name: newName,
      url: newUrl,
      property_type: newProperty,
    });

    setNewName("");
    setNewUrl("");
    loadData();
  }

  async function deleteSource(id: string) {
    await supabase.from("ical_sources").delete().eq("id", id);
    // Also delete imported blocks from this source
    await supabase.from("blocked_dates").delete().eq("source", id);
    loadData();
  }

  async function triggerSync() {
    setSyncing(true);
    try {
      await fetch("/api/cron/ical-sync");
    } catch {
      // ignore
    }
    setSyncing(false);
    loadData();
  }

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-gray-900">Einstellungen</h1>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-terracotta-500" />
        </div>
      ) : (
        <>
          {/* iCal Sources */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                iCal-Quellen
              </h2>
              <button
                onClick={triggerSync}
                disabled={syncing}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`}
                />
                Jetzt synchronisieren
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {sources.map((source) => (
                <div
                  key={source.id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">
                        {source.name}
                      </p>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        {source.property_type === "house"
                          ? "Haus"
                          : "Apartment"}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          source.active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {source.active ? "Aktiv" : "Inaktiv"}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-gray-500">
                      {source.url}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Letzte Sync:{" "}
                      {source.last_synced_at
                        ? new Date(source.last_synced_at).toLocaleString(
                            "de-DE"
                          )
                        : "Noch nie"}
                      {source.sync_errors && (
                        <span className="ml-2 text-red-500">
                          Fehler: {source.sync_errors}
                        </span>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteSource(source.id)}
                    className="ml-4 rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {/* Add new source */}
              <div className="rounded-xl border-2 border-dashed border-gray-200 p-4">
                <p className="mb-3 text-sm font-medium text-gray-700">
                  Neue iCal-Quelle hinzufügen
                </p>
                <div className="flex flex-wrap items-end gap-3">
                  <div>
                    <label className="block text-xs text-gray-500">Name</label>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="z.B. Airbnb"
                      className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500">
                      iCal-URL
                    </label>
                    <input
                      type="url"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">
                      Objekt
                    </label>
                    <select
                      value={newProperty}
                      onChange={(e) => setNewProperty(e.target.value)}
                      className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                    >
                      <option value="house">Haus</option>
                      <option value="apartment">Apartment</option>
                    </select>
                  </div>
                  <button
                    onClick={addSource}
                    className="flex items-center gap-1 rounded-lg bg-terracotta-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-terracotta-700"
                  >
                    <Plus className="h-4 w-4" />
                    Hinzufügen
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* iCal Export Links */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">
              iCal-Export
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Diese URLs in Portal-Einstellungen eintragen
            </p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
                <ExternalLink className="h-4 w-4 text-gray-500" />
                <code className="flex-1 text-xs text-gray-700">
                  {typeof window !== "undefined"
                    ? `${window.location.origin}/api/ical?property=house`
                    : "/api/ical?property=house"}
                </code>
                <span className="text-xs text-gray-500">Haus</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
                <ExternalLink className="h-4 w-4 text-gray-500" />
                <code className="flex-1 text-xs text-gray-700">
                  {typeof window !== "undefined"
                    ? `${window.location.origin}/api/ical?property=apartment`
                    : "/api/ical?property=apartment"}
                </code>
                <span className="text-xs text-gray-500">Apartment</span>
              </div>
            </div>
          </div>

          {/* Email Log */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">
              <Mail className="mr-2 inline h-5 w-5" />
              E-Mail-Log
            </h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                      Typ
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                      Empfänger
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                      Betreff
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                      Gesendet
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {emails.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-6 text-center text-sm text-gray-500"
                      >
                        Noch keine E-Mails versendet.
                      </td>
                    </tr>
                  ) : (
                    emails.map((e) => (
                      <tr key={e.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-xs font-medium text-gray-900">
                          {e.email_type}
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-600">
                          {e.recipient}
                        </td>
                        <td className="max-w-[200px] truncate px-4 py-2 text-xs text-gray-600">
                          {e.subject}
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-500">
                          {new Date(e.sent_at).toLocaleString("de-DE")}
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              e.status === "sent"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {e.status}
                          </span>
                        </td>
                      </tr>
                    ))
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
