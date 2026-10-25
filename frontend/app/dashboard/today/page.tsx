"use client";

import { useState } from "react";
import { AlertTriangle, Check, Pencil } from "lucide-react";
import { Badge, Card, MockNote, PageHeader, btnGhost, btnPrimary, inputCls } from "@/components/dashboard/ui";
import { useT } from "@/components/dashboard/useT";
import { useLocale } from "@/components/dashboard/locale";
import { fmtLitres, fmtTime } from "@/lib/calc";
import { useApi } from "@/lib/api";
import { buildMockSchedule, fields, type Field, type ScheduleResponse } from "@/lib/mock";

type Mode = "pending" | "confirmed" | "editing" | "overridden";

function DemandCard({ field }: { field: Field }) {
  const t = useT();
  const { n, litres: formatL } = useLocale();
  // Contract: GET /api/v1/ml/schedule/{field_id}
  const { data } = useApi<ScheduleResponse>(`/api/v1/ml/schedule/${field.id}`, buildMockSchedule(field));
  const total = data.windows.reduce((s, w) => s + w.volume_litres, 0);
  const first = data.windows[0];

  const [mode, setMode] = useState<Mode>("pending");
  const [customLitres, setCustomLitres] = useState(total);
  const [start, setStart] = useState(first.start);
  const [draftLitres, setDraftLitres] = useState(total);
  const [draftStart, setDraftStart] = useState(first.start);

  const shownLitres = mode === "overridden" ? customLitres : total;
  const shownStart = mode === "overridden" ? start : first.start;

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{t(field.name)} <span className="text-sm font-normal text-slate-500">· {t(field.crop)}</span></h2>
          <p className="text-sm text-slate-500">{t("Predicted demand:")} <b className="text-slate-800">{n(data.predicted_demand_mm, 1)} {t("mm")}</b></p>
        </div>
        {mode === "confirmed" && <Badge tone="green">{t("Confirmed")}</Badge>}
        {mode === "overridden" && <Badge tone="blue">{t("Overridden by you")}</Badge>}
        {(mode === "pending" || mode === "editing") && <Badge tone="amber">{t("Waiting for you")}</Badge>}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">{t("Start")}</p><p className="font-semibold">{fmtTime(shownStart)}</p></div>
        <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">{t("Volume")}</p><p className="font-semibold">{formatL(shownLitres, t("L"))}</p></div>
        <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">{t("Sessions")}</p><p className="font-semibold">{n(data.windows.length, 0)}</p></div>
      </div>

      {data.warnings.map((w, i) => (
        <p key={i} className="mt-3 flex gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> {t(w)}
        </p>
      ))}

      {mode === "editing" && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm text-slate-600">{t("New volume (litres)")}
            <input type="number" min={0} value={draftLitres} onChange={(e) => setDraftLitres(Number(e.target.value))} className={inputCls} />
          </label>
          <label className="text-sm text-slate-600">{t("New start time")}
            <input type="time" value={draftStart} onChange={(e) => setDraftStart(e.target.value)} className={inputCls} />
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {mode === "editing" ? (
          <>
            <button className={btnPrimary} onClick={() => { setCustomLitres(draftLitres); setStart(draftStart); setMode("overridden"); }}>{t("Save override")}</button>
            <button className={btnGhost} onClick={() => setMode("pending")}>{t("Cancel")}</button>
          </>
        ) : (
          <>
            <button className={btnPrimary} disabled={mode === "confirmed"} onClick={() => setMode("confirmed")}><Check className="h-4 w-4" /> {t("confirm")}</button>
            <button className={btnGhost} onClick={() => setMode("editing")}><Pencil className="h-4 w-4" /> {t("override")}</button>
          </>
        )}
      </div>
    </Card>
  );
}

export default function TodayPage() {
  const t = useT();
  const { litres: formatL } = useLocale();
  const total = fields.reduce((s, f) => s + buildMockSchedule(f).windows.reduce((a, w) => a + w.volume_litres, 0), 0);
  return (
    <div>
      <PageHeader title={t("today")}>
        <span className="text-sm text-slate-600">{t("Total planned:")} <b>{formatL(total, t("L"))}</b></span>
      </PageHeader>
      <MockNote>{t("Sample predictions. Confirm and override only change this screen for now. Connect POST /api/v1/ml/predict/{field_id} and your confirm API later.")}</MockNote>
      <div className="grid gap-5 lg:grid-cols-2">
        {fields.map((f) => <DemandCard key={f.id} field={f} />)}
      </div>
    </div>
  );
}
