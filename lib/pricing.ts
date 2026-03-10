import { createAdminClient } from "@/lib/supabase/admin";

export type PropertyType = "house" | "apartment";

export interface Season {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  price_per_night_house: number;
  price_per_night_apt: number | null;
  min_nights: number;
  apt_available: boolean;
}

export interface PriceBreakdown {
  nights: number;
  nightlyRates: { date: string; price: number; season: string }[];
  totalAccommodation: number;
  cleaningFee: number;
  petFee: number;
  totalPrice: number;
  depositAmount: number;
  remainingAmount: number;
  averagePricePerNight: number;
  minNights: number;
  minNightsViolation: boolean;
}

const CLEANING_FEE_HOUSE = 15000; // 150€
const CLEANING_FEE_APT = 6000; // 60€
const PET_FEE = 5000; // 50€

/**
 * Get all seasons from Supabase.
 */
export async function getSeasons(): Promise<Season[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("seasons")
    .select("*")
    .order("start_date");

  if (error) throw new Error(`Failed to fetch seasons: ${error.message}`);
  return data || [];
}

/**
 * Find the season for a specific date.
 */
function findSeasonForDate(date: Date, seasons: Season[]): Season | null {
  const dateStr = date.toISOString().split("T")[0];
  return (
    seasons.find((s) => dateStr >= s.start_date && dateStr <= s.end_date) ||
    null
  );
}

/**
 * Calculate the total price for a stay.
 * Prices are night-by-night based on the season of each night.
 * All amounts in cents (integer).
 */
export async function calculatePrice(
  checkIn: string,
  checkOut: string,
  propertyType: PropertyType,
  hasPet: boolean,
  seasons?: Season[]
): Promise<PriceBreakdown> {
  const allSeasons = seasons || (await getSeasons());

  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  const nights = Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (nights <= 0) {
    throw new Error("Check-out must be after check-in");
  }

  const nightlyRates: { date: string; price: number; season: string }[] = [];
  let maxMinNights = 0;

  for (let i = 0; i < nights; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);

    const season = findSeasonForDate(currentDate, allSeasons);

    if (!season) {
      throw new Error(
        `No season defined for date ${currentDate.toISOString().split("T")[0]}`
      );
    }

    if (propertyType === "apartment" && !season.apt_available) {
      throw new Error(
        `Apartment is not available during ${season.name} (${currentDate.toISOString().split("T")[0]})`
      );
    }

    const price =
      propertyType === "apartment"
        ? season.price_per_night_apt!
        : season.price_per_night_house;

    nightlyRates.push({
      date: currentDate.toISOString().split("T")[0],
      price,
      season: season.name,
    });

    if (season.min_nights > maxMinNights) {
      maxMinNights = season.min_nights;
    }
  }

  const totalAccommodation = nightlyRates.reduce((sum, r) => sum + r.price, 0);
  const cleaningFee =
    propertyType === "apartment" ? CLEANING_FEE_APT : CLEANING_FEE_HOUSE;
  const petFee = hasPet ? PET_FEE : 0;
  const totalPrice = totalAccommodation + cleaningFee + petFee;
  const depositAmount = Math.round(totalPrice * 0.25);
  const remainingAmount = totalPrice - depositAmount;
  const averagePricePerNight = Math.round(totalAccommodation / nights);

  return {
    nights,
    nightlyRates,
    totalAccommodation,
    cleaningFee,
    petFee,
    totalPrice,
    depositAmount,
    remainingAmount,
    averagePricePerNight,
    minNights: maxMinNights,
    minNightsViolation: nights < maxMinNights,
  };
}
