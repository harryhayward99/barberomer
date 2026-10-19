/**
 * Opening hours — edit this file to change shop hours and booking availability.
 * Times are 24-hour, Europe/London.
 * day: 0 = Sunday … 6 = Saturday
 */
export type DayHours = {
  open: string;
  close: string;
} | null;

export const openingHours: Record<number, DayHours> = {
  1: { open: "09:00", close: "19:00" },
  2: { open: "09:00", close: "19:00" },
  3: { open: "09:00", close: "19:00" },
  4: { open: "09:00", close: "20:00" },
  5: { open: "09:00", close: "20:00" },
  6: { open: "09:00", close: "19:00" },
  0: { open: "10:00", close: "18:00" },
};

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const displayHours = [
  { day: "Monday", hours: "09:00 – 19:00" },
  { day: "Tuesday", hours: "09:00 – 19:00" },
  { day: "Wednesday", hours: "09:00 – 19:00" },
  { day: "Thursday", hours: "09:00 – 20:00" },
  { day: "Friday", hours: "09:00 – 20:00" },
  { day: "Saturday", hours: "09:00 – 19:00" },
  { day: "Sunday", hours: "10:00 – 18:00" },
] as const;

export const slotIntervalMinutes = 15;
export const bookingHorizonDays = 21;
export const pendingHoldMinutes = 12;
