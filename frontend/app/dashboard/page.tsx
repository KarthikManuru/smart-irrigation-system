"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutGrid, Sprout, Radio, Droplet, CloudSun, MapPinned, CalendarClock, FileText, Thermometer, Waves,
} from "lucide-react";
import { Card, StatCard } from "@/components/dashboard/ui";
import FieldMap from "@/components/dashboard/FieldMap";
import { useT } from "@/components/dashboard/useT";
import { useLanguage } from "@/components/LanguageContext";
import { useLocale } from "@/components/dashboard/locale";
import { getUser } from "@/lib/auth";
import { crops, fields, sensors } from "@/lib/mock";

const toneColor = { green: "#16a34a", amber: "#f59e0b", red: "#ef4444", blue: "#0ea5e9" } as const;

export default function DashboardHome() {
  const t = useT();
  const { lang } = useLanguage();
  const { n, pct, litres } = useLocale();
  const [name] = useState(() => getUser()?.name ?? "");
  const hour = new Date().getHours();
  const greeting = hour < 12 ? t("goodMorning") : hour < 17 ? t("goodAfternoon") : t("goodEvening");
  const date = new Date().toLocaleDateString(`${lang}-IN`, { day: "numeric", month: "short", year: "numeric" });

  const displayName = !name || name === "Farmer" ? "Shilpashree" : name;
  const tiles = [
    { href: "/dashboard/fields", icon: MapPinned, label: t("fields") },
    { href: "/dashboard/irrigation", icon: CalendarClock, label: t("schedule") },
    { href: "/dashboard/weather", icon: CloudSun, label: t("weather") },
    { href: "/dashboard/reports", icon: FileText, label: t("reports") },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {greeting}, {displayName}! 🌿
          </h1>
          <p className="mt-1 text-sm text-slate-500">{t("subtitle")}</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="text-right text-slate-500">
            <p className="font-semibold text-slate-800">{date}</p>
            <p className="text-xs">{t("Bengaluru, Karnataka")}</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3 py-2 shadow-sm">
            <CloudSun className="h-8 w-8 text-amber-500" />
            <div>
              <p className="text-lg font-bold leading-none text-slate-800">{n(28, 0)}{t("°C")}</p>
              <p className="mt-0.5 text-xs text-slate-500">{t("Partly Cloudy")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={LayoutGrid} label={t("totalFields")} value={n(fields.length, 0)} color="#16a34a" />
        <StatCard icon={Sprout} label={t("totalCrops")} value={n(crops.length, 0)} color="#22a05a" />
        <StatCard icon={Radio} label={t("activeSensors")} value={n(sensors.length, 0)} color="#0ea5e9" />
        <StatCard icon={Droplet} label={t("waterSaved")} value={`${litres(1250, t("L"))}`} extra={`+${pct(12)}`} color="#0284c7" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
        {tiles.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} className="flex items-center gap-3 rounded-2xl bg-gf-800 p-4 text-white">
            <Icon className="h-6 w-6 text-gf-300" /> <span className="font-medium">{label}</span>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="mb-3 font-semibold text-slate-800">{t("fieldOverview")}</h2>
          <div className="aspect-[2/1] w-full overflow-hidden rounded-xl"><FieldMap /></div>
        </Card>

        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">{t("recentSensor")}</h2>
            <Link href="/dashboard/sensors" className="text-xs font-medium text-gf-500 hover:underline">{t("viewAll")}</Link>
          </div>
          <ul className="space-y-3">
            {sensors.map((s) => {
              const Icon = s.type === "Temperature" ? Thermometer : s.type === "Humidity" ? Waves : Droplet;
              return (
                <li key={s.id} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                    <Icon className="h-4 w-4" style={{ color: toneColor[s.tone] }} />
                  </div>
                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="truncate text-sm font-medium text-slate-800">{s.id} <span className="text-slate-400">({t(s.field)})</span></p>
                    <p className="text-xs text-slate-500">{t(s.type)}</p>
                  </div>
                  <div className="text-right leading-tight">
                    <p className="text-sm font-semibold" style={{ color: toneColor[s.tone] }}>{s.value}</p>
                    <p className="text-[11px] text-slate-400">{n(s.mins, 0)} {t("mins ago")}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </div>
  );
}
