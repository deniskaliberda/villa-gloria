"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  async function onSubmit(data: ContactFormData) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
      }
    } catch {
      // Error handling will be improved later
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal>
          <h1 className="font-display text-4xl font-bold text-dark md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-dark-light">{t("description")}</p>
        </ScrollReveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <ScrollReveal delay={0.1}>
            <Card>
              <CardContent className="p-8">
                {isSubmitted ? (
                  <div className="flex flex-col items-center gap-4 py-12 text-center">
                    <CheckCircle className="h-16 w-16 text-olive-500" />
                    <p className="font-display text-2xl font-bold text-dark">
                      {t("form.success")}
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <Input
                      label={t("form.name")}
                      {...register("name", { required: true })}
                      error={errors.name ? "Pflichtfeld" : undefined}
                    />
                    <Input
                      label={t("form.email")}
                      type="email"
                      {...register("email", {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      })}
                      error={
                        errors.email ? "Gültige E-Mail erforderlich" : undefined
                      }
                    />
                    <Input
                      label={t("form.subject")}
                      {...register("subject", { required: true })}
                      error={errors.subject ? "Pflichtfeld" : undefined}
                    />
                    <div className="space-y-1">
                      <label className="block font-accent text-sm font-semibold text-dark">
                        {t("form.message")}
                      </label>
                      <textarea
                        {...register("message", { required: true })}
                        rows={5}
                        className="w-full rounded-button border border-warm bg-white px-4 py-3 font-body text-dark placeholder:text-dark-light/50 transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400/20"
                      />
                      {errors.message && (
                        <p className="text-sm text-red-600">Pflichtfeld</p>
                      )}
                    </div>
                    <Button type="submit" fullWidth loading={isLoading}>
                      <Send className="mr-2 h-4 w-4" />
                      {t("form.send")}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Contact Info + Map */}
          <div className="space-y-8">
            <ScrollReveal delay={0.2}>
              <h2 className="font-display text-2xl font-bold text-dark">
                {t("info.title")}
              </h2>
              <div className="mt-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta-50">
                    <MapPin className="h-5 w-5 text-terracotta-500" />
                  </div>
                  <div>
                    <p className="font-accent font-semibold text-dark">
                      Villa Gloria al Padre
                    </p>
                    <p className="text-dark-light">Kaštelir, Istrien</p>
                    <p className="text-dark-light">Kroatien</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta-50">
                    <Mail className="h-5 w-5 text-terracotta-500" />
                  </div>
                  <div>
                    <p className="font-accent font-semibold text-dark">
                      E-Mail
                    </p>
                    <p className="text-dark-light">info@villa-gloria-istrien.de</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta-50">
                    <Phone className="h-5 w-5 text-terracotta-500" />
                  </div>
                  <div>
                    <p className="font-accent font-semibold text-dark">
                      Telefon
                    </p>
                    <p className="text-dark-light">
                      +49 172 5642200
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <h2 className="font-display text-2xl font-bold text-dark">
                {t("info.directions")}
              </h2>
              <div className="mt-4 aspect-square overflow-hidden rounded-card lg:aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11218.5!2d13.68!3d45.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477c8e0e0e0e0e0e%3A0x0!2sKa%C5%A1telir!5e0!3m2!1sde!2shr!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Anfahrt Villa Gloria"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
  );
}
