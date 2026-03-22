"use client";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Mail, Clock, CalendarCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[60vh] items-center justify-center pt-24 pb-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-terracotta-200 border-t-terracotta-500" />
        </main>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}

function ConfirmationContent() {
  const t = useTranslations("booking.confirmation");
  const tNav = useTranslations("nav");
  const searchParams = useSearchParams();
  const bookingNumber = searchParams.get("booking");

  return (
    <main className="pt-24 pb-20">
      <div className="mx-auto max-w-2xl px-4">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-olive-50">
              <CheckCircle className="h-10 w-10 text-olive-500" />
            </div>

            <h1 className="font-display text-3xl font-bold text-dark md:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-3 text-lg text-dark-light">{t("thankYou")}</p>

            {bookingNumber && (
              <div className="mt-6 rounded-card bg-sand p-4">
                <p className="font-accent text-sm text-dark-light">
                  {t("bookingNumber")}
                </p>
                <p className="font-display text-2xl font-bold text-terracotta-500">
                  {bookingNumber}
                </p>
              </div>
            )}

            <div className="mt-8 space-y-4 text-left">
              <h2 className="font-display text-xl font-bold text-dark">
                {t("nextSteps")}
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-500" />
                  <p className="text-sm text-dark-light">{t("emailSent")}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-500" />
                  <p className="text-sm text-dark-light">
                    {t("reviewTime")}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-500" />
                  <p className="text-sm text-dark-light">
                    Check-in: 17:00 · Check-out: 10:00
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/">
                <Button variant="secondary">{tNav("home")}</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
