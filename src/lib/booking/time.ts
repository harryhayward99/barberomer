import { business } from "@/lib/config/business";
import { dayNames, openingHours, type DayHours } from "@/lib/config/hours";

export const TIMEZONE = business.timezone;

type DateParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  weekdayIndex: number;
  dateStr: string;
  timeStr: string;
};

const weekdayMap: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function getTimeZoneOffsetMs(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const parts = Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );

  return asUtc - date.getTime();
}

export function fromLondonLocal(dateStr: string, timeStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0);
  let date = new Date(utcGuess);
  const offset = getTimeZoneOffsetMs(date, TIMEZONE);
  date = new Date(utcGuess - offset);
  const offsetAgain = getTimeZoneOffsetMs(date, TIMEZONE);
  if (offsetAgain !== offset) {
    date = new Date(utcGuess - offsetAgain);
  }
  return date;
}

export function londonParts(date = new Date()): DateParts {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  });

  const raw = Object.fromEntries(
    formatter.formatToParts(date).map((part) => [part.type, part.value]),
  );

  const year = Number(raw.year);
  const month = Number(raw.month);
  const day = Number(raw.day);
  const hour = Number(raw.hour);
  const minute = Number(raw.minute);

  return {
    year,
    month,
    day,
    hour,
    minute,
    weekdayIndex: weekdayMap[raw.weekday] ?? 0,
    dateStr: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    timeStr: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
  };
}

export function addDays(dateStr: string, days: number) {
  const date = fromLondonLocal(dateStr, "12:00");
  date.setUTCDate(date.getUTCDate() + days);
  return londonParts(date).dateStr;
}

export function minutesFromTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function timeFromMinutes(total: number) {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function hoursForDate(dateStr: string): DayHours {
  const weekday = londonParts(fromLondonLocal(dateStr, "12:00")).weekdayIndex;
  return openingHours[weekday];
}

export function formatFriendlyDate(dateStr: string) {
  const date = fromLondonLocal(dateStr, "12:00");
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

export function formatFriendlyDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(iso));
}

export function formatClock(time: string) {
  return time;
}

export function formatCloseLabel(close: string) {
  const [hours, minutes] = close.split(":").map(Number);
  const suffix = hours >= 12 ? "pm" : "am";
  const hour12 = hours % 12 || 12;
  if (minutes === 0) return `${hour12}${suffix}`;
  return `${hour12}:${String(minutes).padStart(2, "0")}${suffix}`;
}

export function getOpenStatus(now = new Date()) {
  const parts = londonParts(now);
  const hours = openingHours[parts.weekdayIndex];
  const current = parts.hour * 60 + parts.minute;

  if (!hours) {
    return findNextOpen(parts.dateStr, parts.weekdayIndex);
  }

  const open = minutesFromTime(hours.open);
  const close = minutesFromTime(hours.close);

  if (current >= open && current < close) {
    return {
      isOpen: true,
      label: `Open today until ${formatCloseLabel(hours.close)}`,
      detail: `${dayNames[parts.weekdayIndex]} ${hours.open} – ${hours.close}`,
    };
  }

  if (current < open) {
    return {
      isOpen: false,
      label: `Opens today at ${formatCloseLabel(hours.open)}`,
      detail: `${dayNames[parts.weekdayIndex]} ${hours.open} – ${hours.close}`,
    };
  }

  return findNextOpen(parts.dateStr, parts.weekdayIndex);
}

function findNextOpen(fromDate: string, fromWeekday: number) {
  for (let offset = 1; offset <= 7; offset += 1) {
    const weekday = (fromWeekday + offset) % 7;
    const hours = openingHours[weekday];
    if (!hours) continue;
    const when = offset === 1 ? "tomorrow" : dayNames[weekday];
    return {
      isOpen: false,
      label: `Closed · Opens ${when} at ${formatCloseLabel(hours.open)}`,
      detail: `${dayNames[weekday]} ${hours.open} – ${hours.close}`,
    };
  }

  return {
    isOpen: false,
    label: "Currently closed",
    detail: "",
  };
}

export function todayHoursLabel(now = new Date()) {
  const parts = londonParts(now);
  const hours = openingHours[parts.weekdayIndex];
  if (!hours) return "Closed today";
  return `Today ${hours.open} – ${hours.close}`;
}
