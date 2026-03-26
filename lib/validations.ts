import { z } from "zod/v4";

export const bookingInquirySchema = z.object({
  checkIn: z.iso.date(),
  checkOut: z.iso.date(),
  guestsAdults: z.number().int().min(1).max(9),
  guestsChildren: z.number().int().min(0).max(9),
  hasPet: z.boolean(),
  guestName: z.string().min(2).max(100),
  guestEmail: z.email(),
  guestPhone: z.string().max(30).optional().or(z.literal("")),
  guestMessage: z.string().max(1000).optional().or(z.literal("")),
});

export type BookingInquiryData = z.infer<typeof bookingInquirySchema>;
