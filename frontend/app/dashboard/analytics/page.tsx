"use client";

import { useState } from "react";
import { Sprout } from "lucide-react";
import { BarChart, Donut, LineChart } from "@/components/dashboard/charts";
import { Card, MockNote, PageHeader } from "@/components/dashboard/ui";
import { useT } from "@/components/dashboard/useT";
import { useLocale } from "@/components/dashboard/locale";
import { analytics, type Range } from "@/lib/mock";

export default function AnalyticsPage() {
  const t = useT();
  const { n, pct } = useLocale();
  const [range, setRange] = useState<Range>("7");
  const d = analytics[range];
  const total = range === "7" ? 2850 : d.water.reduce((s, v) => s + v, 0);
  const changeText =
    range === "7"
      ? `-18% ${t("vs last week")}`
      : range === "30"
      ? `+6% ${t("vs last month")}`
      : `+9% ${t("vs last quarter")}`;

  const tabs: { id: Range; label: string }[] = [
    { id: "7", label: t("7 Days") },
    { id: "30", label: t("30 Days") },
    { id: "90", label: t("3 Months") },
  ];

  return (
    <div className="max-w-5xl">
      <PageHeader title={t("analyticsTitle")} />

      <div className="mb-5 flex gap-2">
        {tabs.map((x) => (
          <button
            key={x.id}
            onClick={() => setRange(x.id)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              range === x.id
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Card className="rounded-2xl border border-slate-200/80 p-5">
          <h2 className="font-bold text-slate-800 text-base">{t("Water Usage")}</h2>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">
            {total.toLocaleString()} {t("L")}
          </p>
          <p className="mb-4 text-xs font-semibold text-emerald-600 mt-0.5">
            ↓ {changeText}
          </p>
          <BarChart values={[...d.water]} labels={d.labels.map((x) => t(x))} />
        </Card>

        <Card className="flex flex-col items-center justify-between gap-4 sm:flex-row p-5 rounded-2xl border border-slate-200/80">
          <div className="w-full sm:w-auto">
            <h2 className="font-bold text-slate-800 text-base mb-2">{t("Crop Health")}</h2>
          </div>
          <Donut
            parts={[
              { value: 72, color: "#16a34a" },
              { value: 18, color: "#f59e0b" },
              { value: 10, color: "#ef4444" },
            ]}
            centerTop={t("Good")}
            centerBottom="72%"
          />
          <ul className="space-y-2 text-xs font-semibold">
            <li className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> {t("Healthy")}: 72%
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> {t("Attention")}: 18%
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> {t("Critical")}: 10%
            </li>
          </ul>
        </Card>

        <Card className="rounded-2xl border border-slate-200/80 p-5">
          <h2 className="mb-3 font-bold text-slate-800 text-base">{t("Soil Moisture Trend")}</h2>
          <LineChart values={[...d.moisture]} color="#0ea5e9" />
        </Card>

        <Card className="flex items-center justify-between gap-5 p-6 rounded-2xl border border-slate-200/80">
          <div>
            <h2 className="font-bold text-slate-800 text-base">{t("Yield Prediction")}</h2>
            <p className="mt-2 text-3xl font-extrabold text-emerald-600">+24%</p>
            <p className="text-xs text-slate-500 font-medium mt-1">{t("Expected increase")}</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-inner">
            <Sprout className="h-8 w-8" />
          </div>
        </Card>
      </div>
    </div>
  );
}
