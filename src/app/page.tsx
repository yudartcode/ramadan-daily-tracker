"use client";

import DailyChart from "@/components/DailyChart";
import HabitGrid from "@/components/HabitGrid";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import PhaseSummary from "@/components/PhaseSummary";
import { useHydrated } from "@/hooks/useHydrated";
import { todayDay } from "@/lib/dates";
import { dayPercent, totalProgress } from "@/lib/stats";
import { useRamadanStore } from "@/store/useRamadanStore";

export default function DashboardPage() {
  const hydrated = useHydrated();
  const { settings, habits, checks, toggle } = useRamadanStore();
  if (!hydrated) return <Loading />;

  const today = todayDay(settings);
  const chartData = Array.from({ length: settings.totalDays }, (_, i) => ({
    day: i + 1,
    value: dayPercent(habits, checks, i + 1) * 100,
  }));

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <Header
        year={settings.year}
        total={totalProgress(habits, checks, settings.totalDays)}
        today={today}
        totalDays={settings.totalDays}
      />
      <PhaseSummary habits={habits} checks={checks} totalDays={settings.totalDays} />
      <DailyChart data={chartData} today={today} />
      <HabitGrid habits={habits} checks={checks} totalDays={settings.totalDays} today={today} onToggle={toggle} />
    </div>
  );
}
