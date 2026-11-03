import { describe, expect, it } from "vitest";
import { todayDay } from "./dates";
import { dayPercent, habitPercent, rangePercent, streak, totalProgress } from "./stats";
import type { Checks, Habit } from "./types";

const habits: Habit[] = [
  { id: "a", name: "Sahur" },
  { id: "b", name: "Puasa" },
];
const row = (days: number[]) => {
  const r: boolean[] = [];
  for (const d of days) r[d - 1] = true;
  return r;
};
const checks: Checks = { a: row([1, 2, 3, 4, 5]), b: row([1, 2, 3, 4]) };

describe("stats", () => {
  it("dayPercent", () => {
    expect(dayPercent(habits, checks, 1)).toBe(1);
    expect(dayPercent(habits, checks, 5)).toBe(0.5);
    expect(dayPercent(habits, checks, 6)).toBe(0);
    expect(dayPercent([], checks, 1)).toBe(0);
  });
  it("habitPercent out of totalDays", () => {
    expect(habitPercent(checks, "a", 30)).toBeCloseTo(5 / 30);
    expect(habitPercent(checks, "missing", 30)).toBe(0);
  });
  it("total = all checks / (habits * days)", () => {
    expect(totalProgress(habits, checks, 30)).toBeCloseTo(9 / 60);
  });
  it("rangePercent per phase", () => {
    expect(rangePercent(habits, checks, 1, 10)).toBeCloseTo(9 / 20);
    expect(rangePercent(habits, checks, 11, 20)).toBe(0);
  });
  it("ignores checks of removed habits", () => {
    expect(totalProgress([habits[0]], checks, 30)).toBeCloseTo(5 / 30);
  });
  it("streak", () => {
    expect(streak(checks, "a", 5)).toBe(5);
    expect(streak(checks, "b", 5)).toBe(0);
    expect(streak(checks, "b", 4)).toBe(4);
  });
});

describe("todayDay", () => {
  const s = { year: 2026, startDate: "2026-02-18", totalDays: 30 as const };
  it("returns 1 on start date", () => expect(todayDay(s, new Date(2026, 1, 18, 23))).toBe(1));
  it("returns last day", () => expect(todayDay(s, new Date(2026, 2, 19))).toBe(30));
  it("null before / after", () => {
    expect(todayDay(s, new Date(2026, 1, 17))).toBeNull();
    expect(todayDay(s, new Date(2026, 2, 20))).toBeNull();
  });
  it("respects 29 days", () => expect(todayDay({ ...s, totalDays: 29 }, new Date(2026, 2, 19))).toBeNull());
});
