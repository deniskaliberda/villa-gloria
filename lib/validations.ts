import { z } from "zod/v4";

export const bookingInquirySchema = z
  .object({
    checkIn: z.iso.date(),
    checkOut: z.iso.date(),
    property: z.enum(["haus", "apartment"]).default("haus"),
    guestsAdults: z.number().int().min(1).max(9),
    guestsChildren: z.number().int().min(0).max(9),
    hasPet: z.boolean(),
    guestName: z.string().min(2).max(100),
    guestEmail: z.email(),
    guestPhone: z.string().max(30).optional().or(z.literal("")),
    guestMessage: z.string().max(1000).optional().or(z.literal("")),
    utmSource: z.string().max(100).optional().or(z.literal("")),
    utmMedium: z.string().max(100).optional().or(z.literal("")),
    utmCampaign: z.string().max(100).optional().or(z.literal("")),
    referrer: z.string().max(500).optional().or(z.literal("")),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

export type BookingInquiryData = z.infer<typeof bookingInquirySchema>;
