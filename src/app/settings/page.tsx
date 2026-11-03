"use client";

import { useRef, useState } from "react";
import HabitEditor from "@/components/HabitEditor";
import Loading from "@/components/Loading";
import ThemeSelector from "@/components/ThemeSelector";
import { useHydrated } from "@/hooks/useHydrated";
import { isRamadanData, useRamadanStore } from "@/store/useRamadanStore";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="mb-4 font-semibold">{title}</h2>
      {children}
    </section>
  );
}

const inputCls = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none";

export default function SettingsPage() {
  const hydrated = useHydrated();
  const { settings, habits, checks, updateSettings, importData, reset } = useRamadanStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);
  if (!hydrated) return <Loading />;

  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ settings, habits, checks }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ramadan-daily-${settings.year}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const data: unknown = JSON.parse(await file.text());
      if (!isRamadanData(data)) throw new Error("format tidak valid");
      if (!confirm("Import akan menimpa semua data saat ini. Lanjutkan?")) return;
      importData(data);
      setMsg("Data berhasil di-import.");
    } catch (err) {
      setMsg(`Gagal import: ${(err as Error).message}`);
    }
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <h1 className="text-2xl font-bold">Pengaturan</h1>

      <Card title="Tampilan">
        <p className="mb-3 text-sm text-muted">Pilih tema terang, gelap, atau ikuti pengaturan sistem perangkat.</p>
        <ThemeSelector />
      </Card>

      <Card title="Periode Ramadan">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Tahun (label)</span>
            <input
              type="number"
              className={inputCls}
              value={settings.year}
              onChange={(e) => updateSettings({ year: Number(e.target.value) || settings.year })}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Tanggal 1 Ramadan</span>
            <input
              type="date"
              className={inputCls}
              value={settings.startDate}
              onChange={(e) => e.target.value && updateSettings({ startDate: e.target.value })}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Jumlah hari</span>
            <select
              className={inputCls}
              value={settings.totalDays}
              onChange={(e) => updateSettings({ totalDays: Number(e.target.value) as 29 | 30 })}
            >
              <option value={29}>29 hari</option>
              <option value={30}>30 hari</option>
            </select>
          </label>
        </div>
      </Card>

      <Card title={`Daftar Habit (${habits.length})`}>
        <HabitEditor />
      </Card>

      <Card title="Data">
        <p className="mb-3 text-sm text-muted">Data tersimpan di browser ini saja. Export untuk backup atau pindah device.</p>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-surface" onClick={exportJson}>
            Export JSON
          </button>
          <button className="rounded-lg border border-border px-4 py-2 text-sm" onClick={() => fileRef.current?.click()}>
            Import JSON
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={onImport} />
          <button
            className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600"
            onClick={() => confirm("Reset semua data ke default? Tindakan ini tidak bisa dibatalkan.") && reset()}
          >
            Reset data
          </button>
        </div>
        {msg && <p className="mt-3 text-sm">{msg}</p>}
      </Card>
    </div>
  );
}
