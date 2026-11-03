"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultData, newId } from "@/lib/defaults";
import type { RamadanData, Settings } from "@/lib/types";

type Actions = {
  toggle: (habitId: string, day: number) => void;
  setCheck: (habitId: string, day: number, value: boolean) => void;
  addHabit: (name: string) => void;
  renameHabit: (habitId: string, name: string) => void;
  removeHabit: (habitId: string) => void;
  moveHabit: (habitId: string, dir: -1 | 1) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  importData: (data: RamadanData) => void;
  reset: () => void;
};

export type RamadanStore = RamadanData & Actions;

export const useRamadanStore = create<RamadanStore>()(
  persist(
    (set) => ({
      ...defaultData(),

      setCheck: (habitId, day, value) =>
        set((s) => {
          const row = [...(s.checks[habitId] ?? [])];
          for (let i = row.length; i < day; i++) row[i] = false;
          row[day - 1] = value;
          return { checks: { ...s.checks, [habitId]: row } };
        }),

      toggle: (habitId, day) =>
        set((s) => {
          const row = [...(s.checks[habitId] ?? [])];
          for (let i = row.length; i < day; i++) row[i] = false;
          row[day - 1] = !row[day - 1];
          return { checks: { ...s.checks, [habitId]: row } };
        }),

      addHabit: (name) =>
        set((s) => ({ habits: [...s.habits, { id: newId(), name: name.trim() }] })),

      renameHabit: (habitId, name) =>
        set((s) => ({
          habits: s.habits.map((h) => (h.id === habitId ? { ...h, name } : h)),
        })),

      removeHabit: (habitId) =>
        set((s) => {
          const checks = { ...s.checks };
          delete checks[habitId];
          return { habits: s.habits.filter((h) => h.id !== habitId), checks };
        }),

      moveHabit: (habitId, dir) =>
        set((s) => {
          const i = s.habits.findIndex((h) => h.id === habitId);
          const j = i + dir;
          if (i < 0 || j < 0 || j >= s.habits.length) return {};
          const habits = [...s.habits];
          [habits[i], habits[j]] = [habits[j], habits[i]];
          return { habits };
        }),

      updateSettings: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),

      importData: (data) =>
        set({ settings: data.settings, habits: data.habits, checks: data.checks ?? {} }),

      reset: () => set(defaultData()),
    }),
    {
      name: "ramadan-daily:v1",
      version: 1,
      partialize: (s) => ({ settings: s.settings, habits: s.habits, checks: s.checks }),
    },
  ),
);

export function isRamadanData(x: unknown): x is RamadanData {
  if (!x || typeof x !== "object") return false;
  const d = x as RamadanData;
  return (
    !!d.settings &&
    typeof d.settings.startDate === "string" &&
    typeof d.settings.year === "number" &&
    (d.settings.totalDays === 29 || d.settings.totalDays === 30) &&
    Array.isArray(d.habits) &&
    d.habits.every((h) => typeof h.id === "string" && typeof h.name === "string") &&
    (d.checks === undefined || typeof d.checks === "object")
  );
}
