"use client";

import { useState, useEffect, useCallback } from "react";
import type { PropertyType } from "@/lib/pricing";

interface BlockedRange {
  start: string;
  end: string;
  reason: string;
}

export function useAvailability(propertyType: PropertyType) {
  const [blockedDates, setBlockedDates] = useState<BlockedRange[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlocked = useCallback(
    async (from: string, to: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          propertyType,
          from,
          to,
        });
        const res = await fetch(`/api/availability?${params}`);
        if (res.ok) {
          const data = await res.json();
          setBlockedDates(data.blockedDates || []);
        }
      } catch {
        // silently fail, calendar will show all dates as available
      } finally {
        setLoading(false);
      }
    },
    [propertyType]
  );

  // Load blocked dates for the next 12 months on mount
  useEffect(() => {
    const today = new Date();
    const from = today.toISOString().split("T")[0];
    const future = new Date(today);
    future.setMonth(future.getMonth() + 12);
    const to = future.toISOString().split("T")[0];
    fetchBlocked(from, to);
  }, [fetchBlocked]);

  /**
   * Check if a specific date falls within any blocked range.
   */
  function isDateBlocked(date: Date): boolean {
    const dateStr = date.toISOString().split("T")[0];
    return blockedDates.some((b) => dateStr >= b.start && dateStr < b.end);
  }

  return { blockedDates, isDateBlocked, loading, refetch: fetchBlocked };
}
