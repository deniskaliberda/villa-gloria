"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Calendar,
  Users,
  Dog,
  Send,
  CheckCircle,
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
  guestsAdults: number;
  guestsChildren: number;
  hasPet: boolean;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestMessage: string;
  acceptTerms: boolean;
}

export function BookingForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingNumber, setBookingNumber] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<BookingFormData>({
    defaultValues: {
      guestsAdults: 2,
      guestsChildren: 0,
      hasPet: false,
    },
  });

  const checkIn = watch("checkIn");

  async function onSubmit(data: BookingFormData) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          guestsAdults: Number(data.guestsAdults),
          guestsChildren: Number(data.guestsChildren),
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setBookingNumber(result.bookingNumber);
        setIsSubmitted(true);
        reset();
      }
    } catch {
      // Error handling
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-card bg-olive-50 p-12 text-center">
        <CheckCircle className="h-16 w-16 text-olive-500" />
        <h3 className="font-display text-2xl font-bold text-dark">
          Anfrage erfolgreich gesendet!
        </h3>
        <p className="text-dark-light">
          Buchungsnummer: <strong>{bookingNumber}</strong>
        </p>
        <p className="text-dark-light">
          Wir prüfen Ihre Anfrage und melden uns innerhalb von 24 Stunden per
          E-Mail bei Ihnen.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-4 text-sm text-terracotta-500 hover:underline"
        >
          Neue Anfrage stellen
        </button>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Dates */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="flex items-center gap-2 font-accent text-sm font-semibold text-dark">
            <Calendar className="h-4 w-4 text-terracotta-500" />
            Anreise
          </label>
          <input
            type="date"
            min={today}
            {...register("checkIn", { required: true })}
            className="w-full rounded-button border border-warm bg-white px-4 py-3 font-body text-dark transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400/20"
          />
          {errors.checkIn && (
            <p className="text-sm text-red-600">Bitte Anreisedatum wählen</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="flex items-center gap-2 font-accent text-sm font-semibold text-dark">
            <Calendar className="h-4 w-4 text-terracotta-500" />
            Abreise
          </label>
          <input
            type="date"
            min={checkIn || today}
            {...register("checkOut", { required: true })}
            className="w-full rounded-button border border-warm bg-white px-4 py-3 font-body text-dark transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400/20"
          />
          {errors.checkOut && (
            <p className="text-sm text-red-600">Bitte Abreisedatum wählen</p>
          )}
        </div>
      </div>

      {/* Guests */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1">
          <label className="flex items-center gap-2 font-accent text-sm font-semibold text-dark">
            <Users className="h-4 w-4 text-terracotta-500" />
            Erwachsene
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
            Kinder
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
            Haustier
          </label>
          <select
            {...register("hasPet")}
            className="w-full rounded-button border border-warm bg-white px-4 py-3 font-body text-dark transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400/20"
          >
            <option value="false">Nein</option>
            <option value="true">Ja (+50 €)</option>
          </select>
        </div>
      </div>

      {/* Contact */}
      <div className="border-t border-sand-300 pt-6">
        <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-dark">
          <User className="h-5 w-5 text-terracotta-500" />
          Ihre Kontaktdaten
        </h3>

        <div className="space-y-4">
          <Input
            label="Name"
            {...register("guestName", { required: true, minLength: 2 })}
            error={errors.guestName ? "Bitte geben Sie Ihren Namen ein" : undefined}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="flex items-center gap-2 font-accent text-sm font-semibold text-dark">
                <Mail className="h-4 w-4 text-terracotta-500" />
                E-Mail
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
                <p className="text-sm text-red-600">Gültige E-Mail erforderlich</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="flex items-center gap-2 font-accent text-sm font-semibold text-dark">
                <Phone className="h-4 w-4 text-terracotta-500" />
                Telefon (optional)
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
              Nachricht (optional)
            </label>
            <textarea
              {...register("guestMessage")}
              rows={3}
              placeholder="Besondere Wünsche, Fragen zur Villa..."
              className="w-full rounded-button border border-warm bg-white px-4 py-3 font-body text-dark placeholder:text-dark-light/50 transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400/20"
            />
          </div>
        </div>
      </div>

      <div className="rounded-card bg-sand-50 p-4 text-sm text-dark-light">
        <p>
          <strong>Hinweis:</strong> Dies ist eine unverbindliche Anfrage. Wir
          prüfen die Verfügbarkeit und kontaktieren Sie innerhalb von 24
          Stunden per E-Mail.
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
            Ich habe die{" "}
            <a href="/agb" target="_blank" className="text-terracotta-500 underline hover:text-terracotta-600">
              AGB
            </a>{" "}
            und{" "}
            <a href="/datenschutz" target="_blank" className="text-terracotta-500 underline hover:text-terracotta-600">
              Datenschutzerklärung
            </a>{" "}
            gelesen und akzeptiere diese.
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="text-sm text-red-600">
            Bitte bestätigen Sie die AGB und Datenschutzerklärung
          </p>
        )}
      </div>

      <Button type="submit" fullWidth loading={isLoading}>
        <Send className="mr-2 h-4 w-4" />
        Unverbindlich anfragen
      </Button>
    </form>
  );
}
