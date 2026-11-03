import TotalProgress from "./TotalProgress";

type Props = { year: number; total: number; today: number | null; totalDays: number };

export default function Header({ year, total, today, totalDays }: Props) {
  return (
    <section className="flex items-center justify-between gap-4 rounded-2xl bg-hero p-5 text-on-hero shadow-sm sm:p-7">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Daily Habits</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-4xl">
          RAMADHAN <span className="text-accent">{year}</span>
        </h1>
        <p className="mt-2 text-sm opacity-80">
          {today ? `Hari ke-${today} dari ${totalDays}` : "Di luar periode Ramadan yang diatur"}
        </p>
      </div>
      <div className="rounded-full bg-surface p-1.5 text-foreground">
        <TotalProgress value={total} size={104} />
      </div>
    </section>
  );
}
