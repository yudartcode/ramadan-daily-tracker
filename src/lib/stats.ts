import type { Checks, Habit } from "./types";

const isChecked = (checks: Checks, habitId: string, day: number) =>
  checks[habitId]?.[day - 1] === true;

/** Fraction (0-1) of habits completed on a given day. */
export function dayPercent(habits: Habit[], checks: Checks, day: number): number {
  if (habits.length === 0) return 0;
  const done = habits.filter((h) => isChecked(checks, h.id, day)).length;
  return done / habits.length;
}

/** Fraction (0-1) of days a habit was completed, out of totalDays. */
export function habitPercent(checks: Checks, habitId: string, totalDays: number): number {
  if (totalDays <= 0) return 0;
  let done = 0;
  for (let d = 1; d <= totalDays; d++) if (isChecked(checks, habitId, d)) done++;
  return done / totalDays;
}

/** Fraction (0-1) of all habit-days completed within [from, to]. */
export function rangePercent(habits: Habit[], checks: Checks, from: number, to: number): number {
  const days = to - from + 1;
  if (habits.length === 0 || days <= 0) return 0;
  let done = 0;
  for (const h of habits) for (let d = from; d <= to; d++) if (isChecked(checks, h.id, d)) done++;
  return done / (habits.length * days);
}

export function totalProgress(habits: Habit[], checks: Checks, totalDays: number): number {
  return rangePercent(habits, checks, 1, totalDays);
}

/** Consecutive completed days ending at `uptoDay` (inclusive). */
export function streak(checks: Checks, habitId: string, uptoDay: number): number {
  let n = 0;
  for (let d = uptoDay; d >= 1 && isChecked(checks, habitId, d); d--) n++;
  return n;
}

export function pct(fraction: number, digits = 1): string {
  return `${(fraction * 100).toFixed(digits)}%`;
}
