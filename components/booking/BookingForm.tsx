"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
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
}

export function BookingForm({ locale, property }: BookingFormProps) {
  const t = useTranslations("booking");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BookingFormData>({
    defaultValues: {
      guestsAdults: 2,
      guestsChildren: 0,
      hasPet: false,
      property: property,
    },
  });

  const watchCheckIn = watch("checkIn");
  const watchCheckOut = watch("checkOut");

  // Get today's date in YYYY-MM-DD for min attribute
  const today = new Date().toISOString().split("T")[0];

  async function onSubmit(data: BookingFormData) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          property,
          guestsAdults: Number(data.guestsAdults),
          guestsChildren: Number(data.guestsChildren),
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "generate_lead", {
            currency: "EUR",
            value: 1,
          });
        }
        window.location.href = `/${locale}/buchen/bestaetigung?booking=${result.bookingNumber}`;
      }
    } catch {
      // Error handling
    } finally {
      setIsLoading(false);
    }
  }

  const hasDates = watchCheckIn && watchCheckOut;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Date Selection */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="flex items-center gap-2 font-accent text-sm font-semibold text-dark">
            <Calendar className="h-4 w-4 text-terracotta-500" />
            {locale === "de" ? "Anreise" : "Check-in"}
          </label>
          <input
            type="date"
            min={today}
            {...register("checkIn", { required: true })}
            className="w-full rounded-button border border-warm bg-white px-4 py-3 font-body text-dark transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400/20"
          />
          {errors.checkIn && (
            <p className="text-sm text-red-600">
              {locale === "de"
                ? "Bitte Anreisedatum wählen"
                : "Please select check-in date"}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="flex items-center gap-2 font-accent text-sm font-semibold text-dark">
            <Calendar className="h-4 w-4 text-terracotta-500" />
            {locale === "de" ? "Abreise" : "Check-out"}
          </label>
          <input
            type="date"
            min={watchCheckIn || today}
            {...register("checkOut", { required: true })}
            className="w-full rounded-button border border-warm bg-white px-4 py-3 font-body text-dark transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400/20"
          />
          {errors.checkOut && (
            <p className="text-sm text-red-600">
              {locale === "de"
                ? "Bitte Abreisedatum wählen"
                : "Please select check-out date"}
            </p>
          )}
        </div>
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

      <Button type="submit" fullWidth loading={isLoading} disabled={!hasDates}>
        <Send className="mr-2 h-4 w-4" />
        {t("sendInquiry")}
      </Button>
    </form>
  );
}
