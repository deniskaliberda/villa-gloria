"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, AlertCircle } from "lucide-react";
import { bookingSchema, type BookingFormData } from "@/lib/validations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { PriceBreakdown, PropertyType } from "@/lib/pricing";

interface BookingFormProps {
  checkIn: string | null;
  checkOut: string | null;
  propertyType: PropertyType;
  hasPet: boolean;
  onPetChange: (hasPet: boolean) => void;
  price: PriceBreakdown | null;
}

export function BookingForm({
  checkIn,
  checkOut,
  propertyType,
  hasPet,
  onPetChange,
  price,
}: BookingFormProps) {
  const t = useTranslations("booking");
  const locale = useLocale();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      checkIn: checkIn || "",
      checkOut: checkOut || "",
      propertyType,
      guestsAdults: 2,
      guestsChildren: 0,
      hasPet,
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      guestCountry: "",
      guestMessage: "",
      guestLanguage: locale as "de" | "en" | "hr",
      acceptTerms: false as unknown as true,
    },
  });

  const canSubmit = checkIn && checkOut && price && !price.minNightsViolation;

  async function onSubmit(data: BookingFormData) {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          checkIn,
          checkOut,
          propertyType,
          hasPet,
          guestLanguage: locale,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setSubmitError(result.error || "Buchung fehlgeschlagen");
        return;
      }

      // Redirect to Stripe Checkout or confirmation page
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        window.location.href = `/${locale}/buchen/bestaetigung?booking=${result.bookingNumber}`;
      }
    } catch {
      setSubmitError("Buchung fehlgeschlagen. Bitte versuchen Sie es erneut.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="font-display text-lg font-bold text-dark">
        {t("guestDetails")}
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label={t("name")}
          {...register("guestName")}
          error={errors.guestName?.message}
        />
        <Input
          label={t("email")}
          type="email"
          {...register("guestEmail")}
          error={errors.guestEmail?.message}
        />
        <Input
          label={t("phone")}
          type="tel"
          {...register("guestPhone")}
          error={errors.guestPhone?.message}
        />
        <Input
          label={t("country")}
          {...register("guestCountry")}
          error={errors.guestCountry?.message}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="block font-accent text-sm font-semibold text-dark">
            {t("adults")}
          </label>
          <select
            {...register("guestsAdults", { valueAsNumber: true })}
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
          <label className="block font-accent text-sm font-semibold text-dark">
            {t("children")}
          </label>
          <select
            {...register("guestsChildren", { valueAsNumber: true })}
            className="w-full rounded-button border border-warm bg-white px-4 py-3 font-body text-dark transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400/20"
          >
            {[0, 1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="block font-accent text-sm font-semibold text-dark">
          {t("message")}
        </label>
        <textarea
          {...register("guestMessage")}
          rows={3}
          className="w-full rounded-button border border-warm bg-white px-4 py-3 font-body text-dark placeholder:text-dark-light/50 transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400/20"
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={hasPet}
          onChange={(e) => onPetChange(e.target.checked)}
          className="h-5 w-5 rounded border-warm text-terracotta-500 focus:ring-terracotta-400"
        />
        <span className="text-sm text-dark">
          {t("pets")} <span className="text-dark-light">({t("petFee")})</span>
        </span>
      </label>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          {...register("acceptTerms")}
          className="h-5 w-5 rounded border-warm text-terracotta-500 focus:ring-terracotta-400"
        />
        <span className="text-sm text-dark">{t("acceptTerms")}</span>
      </label>
      {errors.acceptTerms && (
        <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
      )}

      {submitError && (
        <div className="flex items-center gap-2 rounded-card bg-red-50 p-4 text-sm text-red-600">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {submitError}
        </div>
      )}

      <Button
        type="submit"
        fullWidth
        size="lg"
        loading={submitting}
        disabled={!canSubmit}
      >
        <Send className="mr-2 h-4 w-4" />
        {t("bookAndPay")}
      </Button>
    </form>
  );
}
