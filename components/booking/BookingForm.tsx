"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { format, parseISO } from "date-fns";
import { de as deLocale, enUS as enLocale } from "date-fns/locale";
import {
  Calendar,
  Users,
  Dog,
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface BookingFormData {
  checkIn: string;
  checkOut: string;
  property: "haus" | "apartment";
  guestsAdults: number;
  guestsChildren: number;
  hasPet: boolean;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestMessage: string;
  acceptTerms: boolean;
}

interface BookingFormProps {
  locale: string;
  property: "haus" | "apartment";
  checkIn: string | null;
  checkOut: string | null;
}

export function BookingForm({
  locale,
  property,
  checkIn,
  checkOut,
}: BookingFormProps) {
  const t = useTranslations("booking");
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [utm, setUtm] = useState<{ source?: string; medium?: string; campaign?: string; referrer?: string }>({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<BookingFormData>({
    defaultValues: {
      guestsAdults: 2,
      guestsChildren: 0,
      hasPet: false,
      property: property,
    },
  });

  // Sync calendar dates into form
  useEffect(() => {
    setValue("checkIn", checkIn ?? "");
    setValue("checkOut", checkOut ?? "");
  }, [checkIn, checkOut, setValue]);

  useEffect(() => {
    setValue("property", property);
  }, [property, setValue]);

  // Capture UTM + referrer once on mount — persists across the funnel
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const captured = {
        source: params.get("utm_source") || undefined,
        medium: params.get("utm_medium") || undefined,
        campaign: params.get("utm_campaign") || undefined,
        referrer: document.referrer || undefined,
      };
      // Persist + restore from sessionStorage so re-entries still attribute
      const stored = sessionStorage.getItem("vg_attribution");
      if (stored && !captured.source) {
        try { setUtm(JSON.parse(stored)); } catch { setUtm(captured); }
      } else {
        setUtm(captured);
        if (captured.source || captured.referrer) {
          sessionStorage.setItem("vg_attribution", JSON.stringify(captured));
        }
      }
    } catch {
      // ignore — attribution is best-effort
    }
  }, []);

  const watchCheckIn = watch("checkIn");
  const watchCheckOut = watch("checkOut");

  function formatDisplayDate(dateStr: string): string {
    const dateLocale = locale === "de" ? deLocale : enLocale;
    return format(parseISO(dateStr), "d. MMMM yyyy", { locale: dateLocale });
  }

  async function onSubmit(data: BookingFormData) {
    setIsLoading(true);
    setSubmitError(null);

    // Track form_submit_attempt — fires for every submit click, even if validation fails server-side
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "form_submit_attempt", {
        form_name: "booking_inquiry",
        property: data.property,
      });
    }

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          property,
          guestsAdults: Number(data.guestsAdults),
          guestsChildren: Number(data.guestsChildren),
          utmSource: utm.source || "",
          utmMedium: utm.medium || "",
          utmCampaign: utm.campaign || "",
          referrer: utm.referrer || "",
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "generate_lead", {
            currency: "EUR",
            value: 1,
            booking_number: result.bookingNumber,
            property: data.property,
            source: utm.source || "direct",
          });
        }
        window.location.href = `/${locale}/buchen/bestaetigung?booking=${result.bookingNumber}`;
        return;
      }

      // Server-side validation failure — show user-visible error
      const reason =
        result?.details?.[0]?.message ||
        result?.error ||
        (locale === "de"
          ? "Bitte pruefe deine Eingaben — etwas hat nicht geklappt."
          : "Please check your input — something didn't work.");
      setSubmitError(String(reason));

      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "form_submit_error", {
          form_name: "booking_inquiry",
          error: String(reason).slice(0, 100),
          status: response.status,
        });
      }
    } catch (err) {
      setSubmitError(
        locale === "de"
          ? "Netzwerkfehler. Bitte versuche es erneut oder kontaktiere uns direkt."
          : "Network error. Please retry or contact us directly."
      );
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "form_submit_error", {
          form_name: "booking_inquiry",
          error: "network",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const hasDates = watchCheckIn && watchCheckOut;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Hidden date + property fields */}
      <input type="hidden" {...register("checkIn", { required: true })} />
      <input type="hidden" {...register("checkOut", { required: true })} />
      <input type="hidden" {...register("property")} />

      {/* Selected Dates Display */}
      <div className="rounded-card border border-sand-300 bg-sand p-4">
        <p className="mb-1 flex items-center gap-2 font-accent text-sm font-semibold text-dark">
          <Calendar className="h-4 w-4 text-terracotta-500" />
          {locale === "de" ? "Gewählte Reisedaten" : "Selected travel dates"}
        </p>
        {hasDates ? (
          <p className="text-lg font-semibold text-dark">
            {formatDisplayDate(watchCheckIn)} –{" "}
            {formatDisplayDate(watchCheckOut)}
          </p>
        ) : (
          <p className="text-sm text-dark-light">
            {locale === "de"
              ? "Bitte wählen Sie Ihre Daten im Kalender oben"
              : "Please select your dates in the calendar above"}
          </p>
        )}
        {errors.checkIn && !hasDates && (
          <p className="mt-1 text-sm text-red-600">
            {locale === "de"
              ? "Bitte Reisedaten im Kalender auswählen"
              : "Please select travel dates in the calendar"}
          </p>
        )}
      </div>

      {/* Guests */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1">
          <label className="flex items-center gap-2 font-accent text-sm font-semibold text-dark">
            <Users className="h-4 w-4 text-terracotta-500" />
            {t("adults")}
          </label>
          <select
            {...register("guestsAdults", { required: true })}
            className="w-full rounded-button border border-warm bg-white px-4 py-3 font-body text-dark transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400/20"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="flex items-center gap-2 font-accent text-sm font-semibold text-dark">
            <Users className="h-4 w-4 text-terracotta-500" />
            {t("children")}
          </label>
          <select
            {...register("guestsChildren")}
            className="w-full rounded-button border border-warm bg-white px-4 py-3 font-body text-dark transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400/20"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="flex items-center gap-2 font-accent text-sm font-semibold text-dark">
            <Dog className="h-4 w-4 text-terracotta-500" />
            {t("pets")}
          </label>
          <select
            {...register("hasPet")}
            className="w-full rounded-button border border-warm bg-white px-4 py-3 font-body text-dark transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400/20"
          >
            <option value="false">{locale === "de" ? "Nein" : "No"}</option>
            <option value="true">
              {locale === "de" ? "Ja (+50 €)" : "Yes (+€50)"}
            </option>
          </select>
        </div>
      </div>

      {/* Contact */}
      <div className="border-t border-sand-300 pt-6">
        <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-dark">
          <User className="h-5 w-5 text-terracotta-500" />
          {t("guestDetails")}
        </h3>

        <div className="space-y-4">
          <Input
            label={t("name")}
            {...register("guestName", { required: true, minLength: 2 })}
            error={
              errors.guestName
                ? locale === "de"
                  ? "Bitte geben Sie Ihren Namen ein"
                  : "Please enter your name"
                : undefined
            }
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="flex items-center gap-2 font-accent text-sm font-semibold text-dark">
                <Mail className="h-4 w-4 text-terracotta-500" />
                {t("email")}
              </label>
              <input
                type="email"
                {...register("guestEmail", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                className="w-full rounded-button border border-warm bg-white px-4 py-3 font-body text-dark transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400/20"
              />
              {errors.guestEmail && (
                <p className="text-sm text-red-600">
                  {locale === "de"
                    ? "Gültige E-Mail erforderlich"
                    : "Valid email required"}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="flex items-center gap-2 font-accent text-sm font-semibold text-dark">
                <Phone className="h-4 w-4 text-terracotta-500" />
                {t("phone")}
              </label>
              <input
                type="tel"
                {...register("guestPhone")}
                className="w-full rounded-button border border-warm bg-white px-4 py-3 font-body text-dark transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400/20"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="flex items-center gap-2 font-accent text-sm font-semibold text-dark">
              <MessageSquare className="h-4 w-4 text-terracotta-500" />
              {t("message")}
            </label>
            <textarea
              {...register("guestMessage")}
              rows={3}
              placeholder={
                locale === "de"
                  ? "Besondere Wünsche, Fragen zur Villa..."
                  : "Special requests, questions about the villa..."
              }
              className="w-full rounded-button border border-warm bg-white px-4 py-3 font-body text-dark placeholder:text-dark-light/50 transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400/20"
            />
          </div>
        </div>
      </div>

      <div className="rounded-card bg-sand-50 p-4 text-sm text-dark-light">
        <p>
          <strong>{locale === "de" ? "Hinweis:" : "Note:"}</strong>{" "}
          {locale === "de"
            ? "Dies ist eine unverbindliche Anfrage. Wir prüfen die Verfügbarkeit und kontaktieren Sie innerhalb von 24 Stunden per E-Mail."
            : "This is a non-binding inquiry. We will check availability and contact you within 24 hours by email."}
        </p>
      </div>

      <div className="space-y-1">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("acceptTerms", { required: true })}
            className="mt-1 h-4 w-4 shrink-0 rounded border-warm text-terracotta-500 focus:ring-terracotta-400/20"
          />
          <span className="text-sm text-dark-light">
            {locale === "de" ? (
              <>
                Ich habe die{" "}
                <a
                  href="/agb"
                  target="_blank"
                  className="text-terracotta-500 underline hover:text-terracotta-600"
                >
                  AGB
                </a>{" "}
                und{" "}
                <a
                  href="/datenschutz"
                  target="_blank"
                  className="text-terracotta-500 underline hover:text-terracotta-600"
                >
                  Datenschutzerklärung
                </a>{" "}
                gelesen und akzeptiere diese.
              </>
            ) : (
              <>
                I have read and accept the{" "}
                <a
                  href="/agb"
                  target="_blank"
                  className="text-terracotta-500 underline hover:text-terracotta-600"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="/datenschutz"
                  target="_blank"
                  className="text-terracotta-500 underline hover:text-terracotta-600"
                >
                  Privacy Policy
                </a>
                .
              </>
            )}
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="text-sm text-red-600">
            {locale === "de"
              ? "Bitte bestätigen Sie die AGB und Datenschutzerklärung"
              : "Please accept the terms and privacy policy"}
          </p>
        )}
      </div>

      {/* Server-side error banner — visible feedback when submit fails */}
      {submitError && (
        <div
          role="alert"
          className="rounded-card border border-red-300 bg-red-50 p-4 text-sm text-red-800"
        >
          <strong>
            {locale === "de" ? "Anfrage konnte nicht gesendet werden:" : "Request could not be sent:"}
          </strong>{" "}
          {submitError}
          <div className="mt-2 text-xs text-red-700">
            {locale === "de"
              ? "Du kannst uns jederzeit auch direkt per WhatsApp oder E-Mail erreichen — Buttons unten."
              : "You can also reach us directly by WhatsApp or email — buttons below."}
          </div>
        </div>
      )}

      <Button type="submit" fullWidth loading={isLoading || isSubmitting} disabled={!hasDates}>
        <Send className="mr-2 h-4 w-4" />
        {t("sendInquiry")}
      </Button>

      {/* Helpful hint when dates are not yet selected — explains why button is disabled */}
      {!hasDates && (
        <p className="text-center text-sm text-stone-600">
          {locale === "de"
            ? "Bitte waehle zuerst An- und Abreise im Kalender oben."
            : "Please pick check-in and check-out dates in the calendar above first."}
        </p>
      )}
    </form>
  );
}
