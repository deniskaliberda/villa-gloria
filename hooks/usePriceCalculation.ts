"use client";

import { useState, useEffect, useRef } from "react";
import type { PropertyType, PriceBreakdown } from "@/lib/pricing";

export function usePriceCalculation(
  checkIn: string | null,
  checkOut: string | null,
  propertyType: PropertyType,
  hasPet: boolean
) {
  const [price, setPrice] = useState<PriceBreakdown | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!checkIn || !checkOut) {
      setPrice(null);
      setError(null);
      return;
    }

    // Debounce 300ms
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          checkIn,
          checkOut,
          propertyType,
          hasPet: String(hasPet),
        });
        const res = await fetch(`/api/price?${params}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Preisberechnung fehlgeschlagen");
          setPrice(null);
        } else {
          setPrice(data);
          setError(null);
        }
      } catch {
        setError("Preisberechnung fehlgeschlagen");
        setPrice(null);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [checkIn, checkOut, propertyType, hasPet]);

  return { price, loading, error };
}
