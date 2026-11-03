import type { Habit, RamadanData } from "./types";

export const DEFAULT_HABIT_NAMES = [
  "Sahur",
  "Puasa",
  "Sholat Qobliyah Subuh",
  "Sholat Subuh",
  "Dzikir Pagi",
  "Sholat Dhuha",
  "Sholat Dzuhur",
  "Sholat Ashar",
  "Dzikir Petang",
  "Sholat Maghrib",
  "Sholat Isya",
  "Tarawih",
  "Witir",
  "Tilawah Al-Qur'an",
  "Sedekah",
  "Tahajud",
  "Kajian / Belajar",
];

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function defaultHabits(): Habit[] {
  return DEFAULT_HABIT_NAMES.map((name, i) => ({ id: `default-${i + 1}`, name }));
}

/** Approximate 1 Ramadan dates (may differ by a day from official announcements). */
const RAMADAN_STARTS = ["2025-03-01", "2026-02-18", "2027-02-08", "2028-01-28", "2029-01-16", "2030-01-06"];

/** Current Ramadan if ongoing, otherwise the next upcoming one. */
export function defaultStartDate(now: Date = new Date()): string {
  const today = now.toISOString().slice(0, 10);
  const ongoingOrNext = RAMADAN_STARTS.find((d) => {
    const end = new Date(d);
    end.setDate(end.getDate() + 30);
    return end.toISOString().slice(0, 10) > today;
  });
  return ongoingOrNext ?? `${now.getFullYear()}-03-01`;
}

export function defaultData(): RamadanData {
  const startDate = defaultStartDate();
  return {
    settings: { year: Number(startDate.slice(0, 4)), startDate, totalDays: 30 },
    habits: defaultHabits(),
    checks: {},
  };
}
