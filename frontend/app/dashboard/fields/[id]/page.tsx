"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AlertTriangle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { DayTimeline, HourlyForecast } from "@/components/dashboard/charts";
import { Badge, Card, MockNote } from "@/components/dashboard/ui";
import { useT } from "@/components/dashboard/useT";
import { useLocale } from "@/components/dashboard/locale";
import { fmtLitres, fmtTime } from "@/lib/calc";
import { useApi } from "@/lib/api";
import { buildMockSchedule, fields, hourlyRain, hourlyTemp, type ScheduleResponse } from "@/lib/mock";
import { statusInfo } from "@/components/dashboard/status";

export default function FieldDetails() {
  const t = useT();
  const { n, litres } = useLocale();
  const { id } = useParams<{ id: string }>();
  const field = fields.find((f) => f.id === id);
  // Contract: GET /api/v1/ml/schedule/{field_id}
  const { data, source } = useApi<ScheduleResponse>(`/api/v1/ml/schedule/${id}`, buildMockSchedule(field ?? fields[0]));

  if (!field) {
    return <p className="text-slate-600">{t("Field not found.")} <Link href="/dashboard/fields" className="text-gf-500 underline">{t("back")}</Link></p>;
  }
  const s = statusInfo(field.status, t);
  const total = data.windows.reduce((sum, w) => sum + w.volume_litres, 0);

  return (
    <div className="space-y-5">
      <Link href="/dashboard/fields" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-gf-500">
        <ArrowLeft className="h-4 w-4" /> {t("back")}
      </Link>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-gf-900">{t(field.name)}</h1>
        <Badge tone={s.tone}>{s.label}</Badge>
        <span className="text-sm text-slate-500">{t(field.crop)} · {n(field.acres, 1)} {t("acres")} · {t(field.soil)}</span>
      </div>
      {source === "mock" && <MockNote>{t("Showing sample data. The real values will come from GET /api/v1/ml/schedule/{field_id}.")}</MockNote>}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card><p className="text-xs text-slate-500">{t("Soil moisture")}</p><p className="text-2xl font-bold">{n(field.moisture, 0)}%</p></Card>
        <Card><p className="text-xs text-slate-500">{t("Predicted demand")}</p><p className="text-2xl font-bold">{n(data.predicted_demand_mm, 1)} {t("mm")}</p></Card>
        <Card><p className="text-xs text-slate-500">{t("Water planned today")}</p><p className="text-2xl font-bold">{litres(total, t("L"))}</p></Card>
        <Card><p className="text-xs text-slate-500">{t("Watering sessions")}</p><p className="text-2xl font-bold">{n(data.windows.length, 0)}</p></Card>
      </div>

      <Card>
        <h2 className="mb-3 font-semibold text-slate-800">{t("24-hour irrigation timeline")}</h2>
        <DayTimeline windows={data.windows} />
        <ul className="mt-4 space-y-1 text-sm text-slate-600">
          {data.windows.map((w, i) => (
            <li key={i}>{t("Session")} {n(i + 1, 0)}: {fmtTime(w.start)} – {fmtTime(w.end)} · {n(w.duration_min, 0)} {t("minutes")} · {litres(w.volume_litres, t("L"))}</li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="mb-1 font-semibold text-slate-800">{t("Forecast weather (24 h)")}</h2>
          <p className="mb-2 text-xs text-slate-500"><span className="text-amber-500">━</span> {t("Temperature")} <span className="ml-3 text-sky-400">▮</span> {t("Rain chance")}</p>
          <HourlyForecast temps={hourlyTemp} rain={hourlyRain} />
        </Card>
        <Card>
          <h2 className="mb-3 font-semibold text-slate-800">{t("Safety warnings")}</h2>
          {data.warnings.length === 0 ? (
            <p className="flex items-center gap-2 text-sm text-emerald-700"><CheckCircle2 className="h-4 w-4" /> {t("No warnings for this field.")}</p>
          ) : (
            <ul className="space-y-2">
              {data.warnings.map((w, i) => (
                <li key={i} className="flex gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> {t(w)}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
