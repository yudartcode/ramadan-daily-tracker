"use client";

import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from "recharts";

type Props = { data: { day: number; value: number }[]; today: number | null };

export default function DailyChart({ data, today }: Props) {
  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-border bg-surface p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-semibold">Progress Harian</h2>
        <span className="text-xs text-muted">% habit selesai per hari</span>
      </div>
      <div className="w-full min-w-0">
          <BarChart responsive style={{ width: "100%", height: 192 }} data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={10} stroke="var(--muted)" interval={0} tickFormatter={(d: number) => (d % 5 === 0 || d === 1 ? String(d) : "")} />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} fontSize={10} stroke="var(--muted)" tickFormatter={(v: number) => `${v}%`} />
            <Tooltip
              cursor={{ fill: "var(--primary-soft)" }}
              contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
              labelFormatter={(d) => `Day ${d}`}
              formatter={(v) => [`${Number(v).toFixed(1)}%`, "Selesai"]}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((d) => (
                <Cell key={d.day} fill={d.day === today ? "var(--accent)" : "var(--primary)"} />
              ))}
            </Bar>
          </BarChart>
      </div>
    </section>
  );
}
