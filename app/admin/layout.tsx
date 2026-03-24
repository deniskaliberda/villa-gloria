import type { ReactNode } from "react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin – Villa Gloria al Padre",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-[#FAF7F2] font-sans antialiased">{children}</body>
    </html>
  );
}
