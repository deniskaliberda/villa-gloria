/**
 * Saison-Logik fuer Villa Gloria — Quelle der Wahrheit ist die Supabase-Tabelle `seasons`.
 *
 * Geschaeftsregel (Maren, 2026-04-24):
 * - Hochsaison (Juli/August): nur das gesamte Haus buchbar, Poolwohnung nicht separat.
 * - Andere Saisons: Poolwohnung kann separat gebucht werden (z.B. fuer Einzelpaare).
 *
 * Min_nights variiert ebenfalls pro Saison (Hochsaison 7, Vor/Nach 5, Zwischen/Neben 6).
 */

export type Season = {
  name: string;
  start_date: string;
  end_date: string;
  apt_available: boolean;
  min_nights: number;
};

export type ApartmentAvailability = {
  available: boolean;
  blockingSeason: string | null;
};

const FALLBACK_MIN_NIGHTS = 3;

function inSeason(dateIso: string, season: Season): boolean {
  return dateIso >= season.start_date && dateIso <= season.end_date;
}

/**
 * For a given check-in/check-out range (check-out exclusive), iterate every
 * night and return the seasons that overlap. A booking can span multiple seasons.
 */
export function seasonsForRange(
  checkIn: string,
  checkOut: string,
  seasons: Season[]
): Season[] {
  const matched = new Set<string>();
  const result: Season[] = [];
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  for (let d = new Date(start); d < end; d.setUTCDate(d.getUTCDate() + 1)) {
    const iso = d.toISOString().slice(0, 10);
    for (const season of seasons) {
      if (!matched.has(season.name) && inSeason(iso, season)) {
        matched.add(season.name);
        result.push(season);
      }
    }
  }
  return result;
}

/**
 * Apartment is only allowed if EVERY night of the requested range falls in a
 * season where apt_available=true. If no season covers a date, fall back to
 * "allowed" (forward-compatible for years not yet seeded).
 */
export function isApartmentAllowedForRange(
  checkIn: string,
  checkOut: string,
  seasons: Season[]
): ApartmentAvailability {
  const overlapping = seasonsForRange(checkIn, checkOut, seasons);
  for (const season of overlapping) {
    if (!season.apt_available) {
      return { available: false, blockingSeason: season.name };
    }
  }
  return { available: true, blockingSeason: null };
}

/**
 * Min nights for a check-in date = the season that contains the check-in.
 * Falls back to FALLBACK_MIN_NIGHTS (3) when no season covers the date.
 */
export function minNightsForCheckIn(
  checkIn: string | null,
  seasons: Season[]
): number {
  if (!checkIn) return FALLBACK_MIN_NIGHTS;
  for (const season of seasons) {
    if (inSeason(checkIn, season)) return season.min_nights;
  }
  return FALLBACK_MIN_NIGHTS;
}

/**
 * All ISO dates within seasons that block the apartment. Used by the calendar
 * to grey out apartment-incompatible nights when property=apartment is selected.
 */
export function apartmentBlockedDates(seasons: Season[]): string[] {
  const dates: string[] = [];
  for (const season of seasons) {
    if (season.apt_available) continue;
    const start = new Date(season.start_date);
    const end = new Date(season.end_date);
    for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
      dates.push(d.toISOString().slice(0, 10));
    }
  }
  return dates;
}
