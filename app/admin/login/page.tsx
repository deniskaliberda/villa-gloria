"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Ungültige Anmeldedaten");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <h1 className="text-center text-2xl font-bold text-dark">
            Villa Gloria Admin
          </h1>
          <p className="mt-2 text-center text-sm text-gray-500">
            Melden Sie sich an, um das Dashboard zu nutzen.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-Mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-terracotta-500 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-terracotta-500 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-terracotta-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-terracotta-700 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Anmelden..." : "Anmelden"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
