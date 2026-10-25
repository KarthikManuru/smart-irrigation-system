"use client";

import { Activity, Cpu, Timer } from "lucide-react";
import { Badge, Card, MockNote, PageHeader } from "@/components/dashboard/ui";
import { useT } from "@/components/dashboard/useT";
import { useLocale } from "@/components/dashboard/locale";
import { useApi } from "@/lib/api";
import { mockMetrics, type MetricsResponse } from "@/lib/mock";

export default function SupervisorPage() {
  const t = useT();
  const { n, pct } = useLocale();
  // Contract: GET /api/v1/ml/models/metrics
  const { data, source } = useApi<MetricsResponse>("/api/v1/ml/models/metrics", mockMetrics);
  const active = data.models.find((m) => m.status === "active") ?? data.models[0];
  const max = Math.max(...data.feature_importance.map((f) => f.importance));

  return (
    <div className="space-y-5">
      <PageHeader title={t("supervisor")} />
      {source === "mock" && <MockNote>{t("SAMPLE VALUES. These are not real results. The real numbers will come from GET /api/v1/ml/models/metrics (MLflow).")}</MockNote>}

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-4"><Cpu className="h-8 w-8 text-gf-500" /><div><p className="text-xs text-slate-500">{t("Active model")}</p><p className="font-bold text-slate-900">{t(active.name)}</p><p className="text-xs text-slate-500">{t("version")} {data.active_version}</p></div></Card>
        <Card className="flex items-center gap-4"><Timer className="h-8 w-8 text-sky-500" /><div><p className="text-xs text-slate-500">{t("Inference latency")}</p><p className="text-2xl font-bold">{n(active.latency_ms, 0)} {t("ms")}</p></div></Card>
        <Card className="flex items-center gap-4"><Activity className="h-8 w-8 text-emerald-500" /><div><p className="text-xs text-slate-500">{t("Model status")}</p><Badge tone="green">{t("Active")}</Badge></div></Card>
      </div>

      <Card className="overflow-x-auto !p-0">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr><th className="px-5 py-3">{t("Model")}</th><th className="px-5 py-3">{t("Version")}</th><th className="px-5 py-3">{t("MAE")}</th><th className="px-5 py-3">{t("RMSE")}</th><th className="px-5 py-3">{t("R²")}</th><th className="px-5 py-3">{t("Latency")}</th><th className="px-5 py-3">{t("Status")}</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.models.map((m) => (
              <tr key={m.name}>
                <td className="px-5 py-3 font-medium text-slate-900">{t(m.name)}</td><td className="px-5 py-3">{m.version}</td>
                <td className="px-5 py-3">{n(m.mae, 2)}</td><td className="px-5 py-3">{n(m.rmse, 2)}</td><td className="px-5 py-3">{n(m.r2, 2)}</td>
                <td className="px-5 py-3">{n(m.latency_ms, 0)} {t("ms")}</td>
                <td className="px-5 py-3"><Badge tone={m.status === "active" ? "green" : "gray"}>{t(m.status)}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <h2 className="mb-4 font-semibold text-slate-800">{t("Feature importance")}</h2>
        <ul className="space-y-3">
          {data.feature_importance.map((f) => (
            <li key={f.feature} className="flex items-center gap-3 text-sm">
              <span className="w-56 shrink-0 text-slate-700">{t(f.feature)}</span>
              <div className="h-2.5 flex-1 rounded-full bg-slate-100"><div className="h-2.5 rounded-full bg-gf-500" style={{ width: `${(f.importance / max) * 100}%` }} /></div>
              <span className="w-12 text-right text-slate-500">{pct(Math.round(f.importance * 100))}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
