"use client";

import { useState } from "react";
import { useRamadanStore } from "@/store/useRamadanStore";

export default function HabitEditor() {
  const { habits, addHabit, renameHabit, removeHabit, moveHabit } = useRamadanStore();
  const [name, setName] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addHabit(name);
    setName("");
  };

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-1.5">
        {habits.map((h, i) => (
          <li key={h.id} className="flex items-center gap-1.5">
            <span className="w-6 text-right text-xs tabular-nums text-muted">{i + 1}</span>
            <input
              className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              value={h.name}
              onChange={(e) => renameHabit(h.id, e.target.value)}
              aria-label={`Nama habit ${i + 1}`}
            />
            <button className="rounded-md px-2 py-1.5 text-muted hover:bg-primary-soft disabled:opacity-30" onClick={() => moveHabit(h.id, -1)} disabled={i === 0} aria-label="Naik">↑</button>
            <button className="rounded-md px-2 py-1.5 text-muted hover:bg-primary-soft disabled:opacity-30" onClick={() => moveHabit(h.id, 1)} disabled={i === habits.length - 1} aria-label="Turun">↓</button>
            <button
              className="rounded-md px-2 py-1.5 text-red-600 hover:bg-red-500/10"
              onClick={() => confirm(`Hapus "${h.name}" beserta datanya?`) && removeHabit(h.id)}
              aria-label="Hapus"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={submit} className="flex gap-2">
        <input
          className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
          placeholder="Nama habit baru, mis. Sholat Rawatib"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-surface disabled:opacity-40" disabled={!name.trim()}>
          Tambah
        </button>
      </form>
    </div>
  );
}
