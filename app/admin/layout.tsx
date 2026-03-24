import type { ReactNode } from "react";
import type { Metadata } from "next";
import "../globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin – Villa Gloria al Padre",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-sand font-body antialiased">{children}</body>
    </html>
  );
}
