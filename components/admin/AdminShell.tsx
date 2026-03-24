"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  Euro,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/buchungen", label: "Buchungen", icon: BookOpen },
  { href: "/admin/kalender", label: "Kalender", icon: CalendarDays },
  { href: "/admin/preise", label: "Preise", icon: Euro },
  { href: "/admin/einstellungen", label: "Einstellungen", icon: Settings },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/admin/login");
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
    });
  }, [router, supabase.auth]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-terracotta-500" />
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-dark">
        <div className="border-b border-white/10 px-6 py-4">
          <h1 className="text-lg font-bold text-white">Villa Gloria</h1>
          <p className="text-xs text-gray-400">Admin Dashboard</p>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/15 text-white border-l-2 border-terracotta-500"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
            Abmelden
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 bg-sand p-8">{children}</main>
    </div>
  );
}
