"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Droplets, MapPinned, Sprout, Radio, CloudSun, CalendarClock, Bell,
  FileText, BarChart3, Mic, Gauge, Settings, Leaf, LogOut, Code2, X,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { logout, type User } from "@/lib/auth";
import type { DashKey } from "@/lib/dash-i18n";
import { useT } from "./useT";

const items: { key: DashKey; href: string; icon: typeof Leaf; badge?: number }[] = [
  { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "fields", href: "/dashboard/fields", icon: MapPinned },
  { key: "crops", href: "/dashboard/crops", icon: Sprout },
  { key: "sensors", href: "/dashboard/sensors", icon: Radio },
  { key: "weather", href: "/dashboard/weather", icon: CloudSun },
  { key: "schedule", href: "/dashboard/irrigation", icon: CalendarClock },
  { key: "alerts", href: "/dashboard/alerts", icon: Bell, badge: 3 },
  { key: "reports", href: "/dashboard/reports", icon: FileText },
  { key: "analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { key: "voice", href: "/dashboard/voice", icon: Mic },
  { key: "settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({ open, onClose, user }: { open: boolean; onClose: () => void; user: User }) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useT();
  const { t: land } = useLanguage();

  const isActive = (href: string) => (href === "/dashboard" ? pathname === href : pathname.startsWith(href));

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={onClose} aria-hidden />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col text-white transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "linear-gradient(180deg,#0a2e1e 0%,#03170e 100%)" }}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">{land.brand}</span>
          </Link>
          <button onClick={onClose} className="lg:hidden" aria-label="Close menu"><X className="h-5 w-5" /></button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {items.map(({ key, href, icon: Icon, badge }) => (
            <Link key={href} href={href}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                isActive(href) ? "bg-[#16a34a] text-white shadow-sm" : "text-emerald-100/75 hover:bg-white/10 hover:text-white"
              }`}>
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 truncate">{t(key)}</span>
              {badge && <span className="rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">{badge}</span>}
            </Link>
          ))}
        </nav>

        <div className="space-y-3 p-3">
          <Link href="/dashboard/swagger"
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold shadow-sm transition ${
              pathname.startsWith("/dashboard/swagger") ? "bg-[#4338ca] text-white ring-2 ring-indigo-300" : "bg-[#4f46e5] text-white hover:bg-[#4338ca]"
            }`}>
            <Code2 className="h-4 w-4" /> {t("swagger")}
          </Link>
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-inner">
              SR
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-semibold text-white">{user.name}</p>
              <p className="text-xs text-emerald-200/60">{t("role")}</p>
            </div>
            <button onClick={() => { logout(); router.replace("/login"); }} aria-label={t("logout")} title={t("logout")}>
              <LogOut className="h-4 w-4 text-white/70 hover:text-white" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
