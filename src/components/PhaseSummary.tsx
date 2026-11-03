import { PHASES } from "@/lib/types";
import { pct, rangePercent } from "@/lib/stats";
import type { Checks, Habit } from "@/lib/types";

type Props = { habits: Habit[]; checks: Checks; totalDays: number };

export default function PhaseSummary({ habits, checks, totalDays }: Props) {
  return (
    <section className="grid grid-cols-3 gap-2 sm:gap-4">
      {PHASES.map((p) => {
        const to = Math.min(p.to, totalDays);
        const v = rangePercent(habits, checks, p.from, to);
        return (
          <div key={p.label} className="rounded-xl border border-border bg-surface p-3 sm:p-4">
            <p className="text-[11px] text-muted sm:text-xs">{p.label}</p>
            <p className="mt-1 text-lg font-semibold tabular-nums sm:text-2xl">{pct(v)}</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary-soft">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${v * 100}%` }} />
            </div>
            <p className="mt-1 text-[10px] text-muted">Day {p.from}–{to}</p>
          </div>
        );
      })}
    </section>
  );
}
