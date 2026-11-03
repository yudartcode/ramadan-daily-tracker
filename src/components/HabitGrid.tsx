"use client";

import { PHASES } from "@/lib/types";
import { dayPercent, habitPercent, pct } from "@/lib/stats";
import type { Checks, Habit } from "@/lib/types";

type Props = {
  habits: Habit[];
  checks: Checks;
  totalDays: number;
  today: number | null;
  onToggle: (habitId: string, day: number) => void;
};

export default function HabitGrid({ habits, checks, totalDays, today, onToggle }: Props) {
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const phaseOf = (d: number) => PHASES.findIndex((p) => d >= p.from && d <= p.to);
  const cellBg = (d: number) =>
    d === today ? "bg-accent-soft" : phaseOf(d) === 1 ? "bg-primary-soft/40" : "";
  const phaseBorder = (d: number) => (d > 1 && phaseOf(d) !== phaseOf(d - 1) ? "border-l-2 border-l-border" : "");

  return (
    <section className="min-w-0 rounded-2xl border border-border bg-surface">
      <div className="flex items-baseline justify-between px-4 pt-4 pb-2">
        <h2 className="font-semibold">Daily Habits</h2>
        <span className="text-xs text-muted">Klik kotak untuk menandai</span>
      </div>
      <div className="overflow-x-auto pb-2">
        <table className="w-max min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wide text-muted">
              <th className="sticky left-0 z-10 bg-surface" />
              {PHASES.map((p) => {
                const span = Math.max(0, Math.min(p.to, totalDays) - p.from + 1);
                return span ? (
                  <th key={p.label} colSpan={span} className="border-b border-border px-1 py-1.5 font-medium normal-case">
                    {p.label}
                  </th>
                ) : null;
              })}
              <th className="sticky right-0 z-10 bg-surface" />
            </tr>
            <tr className="text-[11px] text-muted">
              <th className="sticky left-0 z-10 border-b border-border bg-surface px-4 py-1.5 text-left font-medium">Habit</th>
              {days.map((d) => (
                <th key={d} className={`border-b border-border px-1 py-1.5 font-medium tabular-nums ${cellBg(d)} ${phaseBorder(d)} ${d === today ? "text-accent font-bold" : ""}`}>
                  {d}
                </th>
              ))}
              <th className="sticky right-0 z-10 border-b border-l border-border bg-surface px-2 py-1.5 font-medium">%</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((h) => {
              const p = habitPercent(checks, h.id, totalDays);
              return (
                <tr key={h.id} className="group">
                  <td className="sticky left-0 z-10 max-w-[8.5rem] truncate border-b border-border bg-surface px-4 py-1.5 font-medium group-hover:bg-primary-soft sm:max-w-none">
                    {h.name}
                  </td>
                  {days.map((d) => (
                    <td key={d} className={`border-b border-border px-1 py-1 text-center ${cellBg(d)} ${phaseBorder(d)} ${today && d > today ? "opacity-50" : ""}`}>
                      <input
                        type="checkbox"
                        className="habit-check align-middle"
                        aria-label={`${h.name} day ${d}`}
                        checked={checks[h.id]?.[d - 1] === true}
                        onChange={() => onToggle(h.id, d)}
                      />
                    </td>
                  ))}
                  <td className="sticky right-0 z-10 border-b border-l border-border bg-surface px-2 py-1.5">
                    <div className="flex items-center gap-2">
                      <div className="hidden h-1.5 w-12 overflow-hidden rounded-full bg-primary-soft sm:block">
                        <div className="h-full bg-primary" style={{ width: `${p * 100}%` }} />
                      </div>
                      <span className="w-10 text-right text-xs tabular-nums">{pct(p)}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
            <tr className="text-xs font-semibold">
              <td className="sticky left-0 z-10 bg-surface px-4 py-2 text-muted">Harian</td>
              {days.map((d) => (
                <td key={d} className={`px-0.5 py-2 text-center tabular-nums text-[10px] ${cellBg(d)} ${phaseBorder(d)}`}>
                  {Math.round(dayPercent(habits, checks, d) * 100)}
                </td>
              ))}
              <td className="sticky right-0 z-10 border-l border-border bg-surface" />
            </tr>
          </tbody>
        </table>
      </div>
      {habits.length === 0 && (
        <p className="px-4 pb-4 text-sm text-muted">Belum ada habit. Tambahkan di halaman Pengaturan.</p>
      )}
    </section>
  );
}
