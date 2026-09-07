import { getCalendarBusy } from "@/lib/booking/calendar";
import { listBusyIntervals } from "@/lib/booking/store";
import {
  addDays,
  fromLondonLocal,
  hoursForDate,
  londonParts,
  minutesFromTime,
  timeFromMinutes,
} from "@/lib/booking/time";
import { bookingHorizonDays, slotIntervalMinutes } from "@/lib/config/hours";
import { getService } from "@/lib/config/services";

type Interval = { start: string; end: string };

function overlaps(start: Date, end: Date, busy: Interval[]) {
  const startMs = start.getTime();
  const endMs = end.getTime();
  return busy.some((interval) => {
    const busyStart = new Date(interval.start).getTime();
    const busyEnd = new Date(interval.end).getTime();
    return startMs < busyEnd && endMs > busyStart;
  });
}

export async function getAvailableDays(serviceId: string) {
  const service = getService(serviceId);
  if (!service) return [];

  const today = londonParts();
  const last = addDays(today.dateStr, bookingHorizonDays);
  const rangeStart = fromLondonLocal(today.dateStr, "00:00");
  const rangeEnd = fromLondonLocal(last, "23:59");

  const [calendarBusy, storeBusy] = await Promise.all([
    getCalendarBusy(rangeStart.toISOString(), rangeEnd.toISOString()),
    listBusyIntervals(rangeStart.toISOString(), rangeEnd.toISOString()),
  ]);
  const busy = [...calendarBusy, ...storeBusy];

  const days: { date: string; slots: string[] }[] = [];

  for (let offset = 0; offset < bookingHorizonDays; offset += 1) {
    const date = addDays(today.dateStr, offset);
    const slots = buildSlotsForDay(date, service.durationMinutes, busy, today);
    if (slots.length) {
      days.push({ date, slots });
    }
  }

  return days;
}

export async function getSlotsForDay(serviceId: string, date: string) {
  const days = await getAvailableDays(serviceId);
  return days.find((day) => day.date === date)?.slots ?? [];
}

function buildSlotsForDay(
  date: string,
  durationMinutes: number,
  busy: Interval[],
  nowParts: ReturnType<typeof londonParts>,
) {
  const hours = hoursForDate(date);
  if (!hours) return [];

  const open = minutesFromTime(hours.open);
  const close = minutesFromTime(hours.close);
  const nowMinutes = nowParts.hour * 60 + nowParts.minute;
  const isToday = date === nowParts.dateStr;
  const slots: string[] = [];

  for (let minute = open; minute + durationMinutes <= close; minute += slotIntervalMinutes) {
    if (isToday && minute <= nowMinutes) continue;
    const startTime = timeFromMinutes(minute);
    const endTime = timeFromMinutes(minute + durationMinutes);
    const start = fromLondonLocal(date, startTime);
    const end = fromLondonLocal(date, endTime);
    if (!overlaps(start, end, busy)) {
      slots.push(startTime);
    }
  }

  return slots;
}

export function slotIsAvailable(
  date: string,
  time: string,
  durationMinutes: number,
  busy: Interval[],
) {
  const hours = hoursForDate(date);
  if (!hours) return false;
  const startMinutes = minutesFromTime(time);
  const endMinutes = startMinutes + durationMinutes;
  if (startMinutes < minutesFromTime(hours.open)) return false;
  if (endMinutes > minutesFromTime(hours.close)) return false;
  const start = fromLondonLocal(date, time);
  const end = fromLondonLocal(date, timeFromMinutes(endMinutes));
  if (start.getTime() <= Date.now()) return false;
  return !overlaps(start, end, busy);
}
