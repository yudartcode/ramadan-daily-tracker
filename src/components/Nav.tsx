"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Dashboard", icon: "▦" },
  { href: "/today", label: "Hari Ini", icon: "✓" },
  { href: "/settings", label: "Pengaturan", icon: "⚙" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <>
      <header className="sticky top-0 z-30 hidden border-b border-border bg-background/90 backdrop-blur sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
            <span aria-hidden className="text-accent text-xl">☾</span> Ramadan Daily
          </Link>
          <nav className="flex gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  pathname === l.href
                    ? "bg-primary text-surface"
                    : "text-muted hover:bg-primary-soft hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-border bg-surface/95 backdrop-blur sm:hidden">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`flex flex-col items-center gap-0.5 py-2.5 text-xs ${
              pathname === l.href ? "text-primary font-semibold" : "text-muted"
            }`}
          >
            <span aria-hidden className="text-lg leading-none">{l.icon}</span>
            {l.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
