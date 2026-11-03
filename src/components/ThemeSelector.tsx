"use client";

import { setTheme, useTheme, type ThemePref } from "@/lib/theme";

const OPTIONS: { value: ThemePref; label: string; icon: string }[] = [
  { value: "system", label: "Sistem", icon: "◐" },
  { value: "light", label: "Terang", icon: "☀" },
  { value: "dark", label: "Gelap", icon: "☾" },
];

export default function ThemeSelector() {
  const theme = useTheme();
  return (
    <div role="radiogroup" aria-label="Tema" className="grid grid-cols-3 gap-1 rounded-xl bg-background p-1">
      {OPTIONS.map((o) => {
        const active = theme === o.value;
        return (
          <button
            key={o.value}
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(o.value)}
            className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
              active ? "bg-primary font-medium text-surface shadow-sm" : "text-muted hover:text-foreground"
            }`}
          >
            <span aria-hidden>{o.icon}</span>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
