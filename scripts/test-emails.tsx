/**
 * Test script to send all 3 email types to Wieland Oswald
 * Run with: npx tsx scripts/test-emails.tsx
 */
import { Resend } from "resend";
import { BookingConfirmation } from "../emails/BookingConfirmation";
import { LandlordNotification } from "../emails/LandlordNotification";
import { CleaningNotification } from "../emails/CleaningNotification";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local manually
const envFile = readFileSync(resolve(__dirname, "../.env.local"), "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^([^#=]+)="?([^"]*)"?$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
// Use Resend test domain until villa-gloria.com is verified
const FROM_EMAIL = "Villa Gloria <onboarding@resend.dev>";
// Resend requires verified domain to send to external recipients
// Sending to Denis first, then forward to Wieland
const TO_EMAIL = "denis.kaliberda@gmail.com";

if (!RESEND_API_KEY || RESEND_API_KEY === "re_placeholder") {
  console.error("ERROR: RESEND_API_KEY not set or still placeholder.");
  console.error("Set it in .env.local or run: vercel env pull");
  process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);

// Fake booking data
const fakeBooking = {
  bookingNumber: "VG-2026-001",
  guestName: "Familie Müller",
  guestEmail: "mueller@example.com",
  guestPhone: "+49 170 1234567",
  guestCountry: "Deutschland",
  checkIn: "12. Juli 2026",
  checkOut: "19. Juli 2026",
  nights: 7,
  propertyType: "house" as const,
  guestsAdults: 4,
  guestsChildren: 2,
  hasPet: false,
  totalPrice: 315000, // 3.150€ in cents
  depositAmount: 78750, // 25% = 787,50€
  remainingAmount: 236250, // 75% = 2.362,50€
  guestMessage: "Wir freuen uns sehr auf den Urlaub in Ihrer Villa! Können wir die Poolheizung dazu buchen?",
};

async function sendTestEmails() {
  console.log(`\nSending 3 test emails to: ${TO_EMAIL}`);
  console.log(`From: ${FROM_EMAIL}\n`);

  // 1. Booking Confirmation (for the guest)
  console.log("1/3 — Buchungsbestätigung (Gast)...");
  const r1 = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject: `[TEST] Buchungsbestätigung – ${fakeBooking.bookingNumber}`,
    react: BookingConfirmation({
      bookingNumber: fakeBooking.bookingNumber,
      guestName: fakeBooking.guestName,
      checkIn: fakeBooking.checkIn,
      checkOut: fakeBooking.checkOut,
      nights: fakeBooking.nights,
      propertyType: fakeBooking.propertyType,
      totalPrice: fakeBooking.totalPrice,
      depositAmount: fakeBooking.depositAmount,
      remainingAmount: fakeBooking.remainingAmount,
    }),
  });
  console.log(r1.error ? `   FAILED: ${r1.error.message}` : "   OK");

  // 2. Landlord Notification (for the owner / Wielands Vater)
  console.log("2/3 — Eigentümer-Benachrichtigung...");
  const r2 = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject: `[TEST] Neue Buchung – ${fakeBooking.bookingNumber}`,
    react: LandlordNotification({
      bookingNumber: fakeBooking.bookingNumber,
      guestName: fakeBooking.guestName,
      guestEmail: fakeBooking.guestEmail,
      guestPhone: fakeBooking.guestPhone,
      guestCountry: fakeBooking.guestCountry,
      checkIn: fakeBooking.checkIn,
      checkOut: fakeBooking.checkOut,
      nights: fakeBooking.nights,
      propertyType: fakeBooking.propertyType,
      guestsAdults: fakeBooking.guestsAdults,
      guestsChildren: fakeBooking.guestsChildren,
      hasPet: fakeBooking.hasPet,
      totalPrice: fakeBooking.totalPrice,
      depositAmount: fakeBooking.depositAmount,
      guestMessage: fakeBooking.guestMessage,
    }),
  });
  console.log(r2.error ? `   FAILED: ${r2.error.message}` : "   OK");

  // 3. Cleaning Notification (for the cleaning team)
  console.log("3/3 — Reinigungsteam-Benachrichtigung...");
  const r3 = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject: `[TEST] Reinigung morgen – ${fakeBooking.bookingNumber}`,
    react: CleaningNotification({
      bookingNumber: fakeBooking.bookingNumber,
      checkOut: fakeBooking.checkOut,
      guestsAdults: fakeBooking.guestsAdults,
      guestsChildren: fakeBooking.guestsChildren,
      hasPet: fakeBooking.hasPet,
      propertyType: fakeBooking.propertyType,
    }),
  });
  console.log(r3.error ? `   FAILED: ${r3.error.message}` : "   OK");

  console.log("\nDone! Check Wieland's inbox.");
}

sendTestEmails().catch(console.error);
