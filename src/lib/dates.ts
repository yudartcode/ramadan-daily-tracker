import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";
import { id as localeId } from "date-fns/locale";
import type { Settings } from "./types";

/** Returns Ramadan day number (1-based) for `now`, or null when outside Ramadan. */
export function todayDay(settings: Settings, now: Date = new Date()): number | null {
  const start = parseISO(settings.startDate);
  if (Number.isNaN(start.getTime())) return null;
  const diff = differenceInCalendarDays(now, start);
  if (diff < 0 || diff >= settings.totalDays) return null;
  return diff + 1;
}

export function dateForDay(settings: Settings, day: number): Date {
  return addDays(parseISO(settings.startDate), day - 1);
}

export function formatDayDate(settings: Settings, day: number, pattern = "EEE, d MMM"): string {
  const d = dateForDay(settings, day);
  if (Number.isNaN(d.getTime())) return "";
  return format(d, pattern, { locale: localeId });
}
