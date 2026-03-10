import { z } from "zod/v4";

export const bookingSchema = z.object({
  checkIn: z.iso.date(),
  checkOut: z.iso.date(),
  propertyType: z.enum(["house", "apartment"]),
  guestsAdults: z.number().int().min(1).max(9),
  guestsChildren: z.number().int().min(0).max(9),
  hasPet: z.boolean(),
  guestName: z.string().min(2).max(100),
  guestEmail: z.email(),
  guestPhone: z.string().max(30).optional().or(z.literal("")),
  guestCountry: z.string().min(2).max(60),
  guestMessage: z.string().max(1000).optional().or(z.literal("")),
  guestLanguage: z.enum(["de", "en", "hr"]),
  acceptTerms: z.literal(true, {
    error: "Sie müssen die AGB akzeptieren",
  }),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export const priceQuerySchema = z.object({
  checkIn: z.iso.date(),
  checkOut: z.iso.date(),
  propertyType: z.enum(["house", "apartment"]),
  hasPet: z.coerce.boolean().default(false),
});

export const availabilityQuerySchema = z.object({
  checkIn: z.iso.date(),
  checkOut: z.iso.date(),
  propertyType: z.enum(["house", "apartment"]),
});

export const blockedDatesQuerySchema = z.object({
  propertyType: z.enum(["house", "apartment"]),
  from: z.iso.date(),
  to: z.iso.date(),
});
