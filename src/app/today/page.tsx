"use client";

import { useState } from "react";
import Loading from "@/components/Loading";
import TotalProgress from "@/components/TotalProgress";
import { useHydrated } from "@/hooks/useHydrated";
import { formatDayDate, todayDay } from "@/lib/dates";
import { dayPercent, streak } from "@/lib/stats";
import { useRamadanStore } from "@/store/useRamadanStore";

export default function TodayPage() {
  const hydrated = useHydrated();
  const { settings, habits, checks, toggle } = useRamadanStore();
  const [picked, setPicked] = useState<number | null>(null);
  if (!hydrated) return <Loading />;

  const today = todayDay(settings);
  const day = Math.min(settings.totalDays, Math.max(1, picked ?? today ?? 1));
  const done = habits.filter((h) => checks[h.id]?.[day - 1]).length;

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4">
      <section className="flex items-center justify-between rounded-2xl bg-hero p-5 text-on-hero">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Ramadhan {settings.year}</p>
          <h1 className="mt-1 text-3xl font-bold">Day {day}</h1>
          <p className="text-sm opacity-80">{formatDayDate(settings, day, "EEEE, d MMMM yyyy")}</p>
          <p className="mt-2 text-sm">
            {done}/{habits.length} habit selesai
          </p>
        </div>
        <div className="rounded-full bg-surface p-1.5 text-foreground">
          <TotalProgress value={dayPercent(habits, checks, day)} size={104} label="Hari ini" />
        </div>
      </section>

      <div className="flex items-center justify-between gap-2">
        <button
          className="rounded-lg border border-border bg-surface px-4 py-2 text-sm disabled:opacity-40"
          onClick={() => setPicked(day - 1)}
          disabled={day <= 1}
        >
          ←<span className="hidden sm:inline"> Sebelumnya</span>
        </button>
        {today && day !== today ? (
          <button className="text-sm font-medium text-primary underline" onClick={() => setPicked(today)}>
            Ke hari ini
          </button>
        ) : (
          <span className="text-center text-xs text-muted">{today ? "Hari ini" : "Di luar periode Ramadan"}</span>
        )}
        <button
          className="rounded-lg border border-border bg-surface px-4 py-2 text-sm disabled:opacity-40"
          onClick={() => setPicked(day + 1)}
          disabled={day >= settings.totalDays}
        >
          <span className="hidden sm:inline">Berikutnya </span>→
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {habits.map((h) => {
          const checked = checks[h.id]?.[day - 1] === true;
          const s = streak(checks, h.id, day);
          return (
            <li key={h.id}>
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition ${
                  checked ? "border-primary bg-primary-soft" : "border-border bg-surface hover:border-primary"
                }`}
              >
                <input type="checkbox" className="habit-check" checked={checked} onChange={() => toggle(h.id, day)} />
                <span className={`flex-1 font-medium ${checked ? "text-primary" : ""}`}>{h.name}</span>
                {s > 1 && <span className="text-xs text-accent">🔥 {s} hari</span>}
              </label>
            </li>
          );
        })}
      </ul>
      {habits.length === 0 && <p className="text-sm text-muted">Belum ada habit. Tambahkan di Pengaturan.</p>}
    </div>
  );
}
