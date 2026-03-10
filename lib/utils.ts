/**
 * Format amount from cents to display string with currency symbol.
 */
export function formatCurrency(
  amountInCents: number,
  locale: string = "de"
): string {
  const amount = amountInCents / 100;
  return new Intl.NumberFormat(locale === "hr" ? "hr-HR" : locale === "en" ? "en-US" : "de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a date for display.
 */
export function formatDate(date: Date | string, locale: string = "de"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(
    locale === "hr" ? "hr-HR" : locale === "en" ? "en-GB" : "de-DE",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  ).format(d);
}

/**
 * Get the number of nights between two dates.
 */
export function getNights(checkIn: Date | string, checkOut: Date | string): number {
  const start = typeof checkIn === "string" ? new Date(checkIn) : checkIn;
  const end = typeof checkOut === "string" ? new Date(checkOut) : checkOut;
  const diff = end.getTime() - start.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

/**
 * Generate a booking number in format VG-YYYY-NNN.
 */
export function generateBookingNumber(year: number, sequence: number): string {
  return `VG-${year}-${String(sequence).padStart(3, "0")}`;
}
