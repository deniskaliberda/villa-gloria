/**
 * Minimal iCal parser for Smoobu calendar feeds.
 * Parses VEVENT blocks and extracts DTSTART/DTEND/SUMMARY/UID.
 */

export interface ICalEvent {
  uid: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  summary: string;
}

export function parseICal(icalString: string): ICalEvent[] {
  const events: ICalEvent[] = [];
  const lines = icalString.replace(/\r\n /g, "").split(/\r?\n/);

  let inEvent = false;
  let currentEvent: Partial<ICalEvent> = {};

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      currentEvent = {};
      continue;
    }

    if (line === "END:VEVENT") {
      inEvent = false;
      if (currentEvent.uid && currentEvent.startDate && currentEvent.endDate) {
        events.push({
          uid: currentEvent.uid,
          startDate: currentEvent.startDate,
          endDate: currentEvent.endDate,
          summary: currentEvent.summary || "Blocked",
        });
      }
      continue;
    }

    if (!inEvent) continue;

    if (line.startsWith("UID:")) {
      currentEvent.uid = line.slice(4);
    } else if (line.startsWith("DTSTART")) {
      currentEvent.startDate = parseDateValue(line);
    } else if (line.startsWith("DTEND")) {
      currentEvent.endDate = parseDateValue(line);
    } else if (line.startsWith("SUMMARY:")) {
      currentEvent.summary = line.slice(8);
    }
  }

  return events;
}

function parseDateValue(line: string): string {
  // Handles: DTSTART;VALUE=DATE:20260615 or DTSTART:20260615T150000Z
  const value = line.split(":").pop() || "";
  const dateStr = value.replace(/T.*$/, "");
  if (dateStr.length === 8) {
    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
  }
  return value;
}

export async function fetchAndParseICal(url: string): Promise<ICalEvent[]> {
  const response = await fetch(url, {
    headers: { "User-Agent": "VillaGloria-iCalSync/1.0" },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch iCal: ${response.status} ${response.statusText}`
    );
  }

  const text = await response.text();
  return parseICal(text);
}
