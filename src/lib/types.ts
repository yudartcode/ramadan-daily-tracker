export type Habit = {
  id: string;
  name: string;
};

export type Settings = {
  year: number;
  /** ISO date (yyyy-mm-dd) of 1 Ramadan */
  startDate: string;
  totalDays: 29 | 30;
};

/** habitId -> array of booleans, index = day - 1 */
export type Checks = Record<string, boolean[]>;

export type RamadanData = {
  settings: Settings;
  habits: Habit[];
  checks: Checks;
};

export const PHASES = [
  { label: "10 Hari Pertama", from: 1, to: 10 },
  { label: "10 Hari Kedua", from: 11, to: 20 },
  { label: "10 Hari Terakhir", from: 21, to: 30 },
] as const;
