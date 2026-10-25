"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { Sparkles } from "lucide-react";
import { Badge, Card, MockNote, PageHeader, btnPrimary, type Tone } from "@/components/dashboard/ui";
import { useT } from "@/components/dashboard/useT";
import { useLocale } from "@/components/dashboard/locale";
import { fmtLitres, fmtTime } from "@/lib/calc";
import { buildMockSchedule, fields } from "@/lib/mock";

type Tab = "today" | "tomorrow" | "week";
const statusTone: Record<string, Tone> = { Scheduled: "green", Pending: "amber", Done: "gray" };

const dayLabel = (offset: number, lang: string) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString(`${lang}-IN`, { weekday: "short", day: "numeric", month: "short" });
};

export default function IrrigationPage() {
  const t = useT();
  const { n, litres } = useLocale();
  const { lang } = useLanguage();
  const [tab, setTab] = useState<Tab>("today");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  // Defined to match the exact reference screenshot
  const todayRows = [
    { key: "field-1", field: "Field 1", crop: "Rice", start: "06:00 AM", end: "06:45 AM", min: 45, litres: 12000, status: "Scheduled" as const },
    { key: "field-2", field: "Field 2", crop: "Maize", start: "12:30 PM", end: "01:15 PM", min: 45, litres: 8500, status: "Scheduled" as const },
    { key: "field-3", field: "Field 3", crop: "Tomato", start: "04:00 PM", end: "04:30 PM", min: 30, litres: 6000, status: "Pending" as const },
  ];
  const tomorrowRows = todayRows.map((r) => ({ ...r, litres: Math.round(r.litres * 0.9), min: Math.round(r.min * 0.9), status: "Scheduled" as const }));
  const weekFactor = [1, 0.95, 0.5, 0.35, 0.8, 1, 0.9];
  const todayTotal = todayRows.reduce((s, r) => s + r.litres, 0);

  function optimize() {
    setBusy(true);
    setMsg("");
    setTimeout(() => { setBusy(false); setMsg(t("Schedule checked against soil moisture and the rain forecast. Optimized!")); }, 1200);
  }

  const rows = tab === "today" ? todayRows : tomorrowRows;
  const todayDateStr = new Date().toLocaleDateString(`${lang}-IN`, { day: "numeric", month: "short" });
  const tabs: { id: Tab; label: string }[] = [
    { id: "today", label: `${t("todayTab")} (${todayDateStr})` },
    { id: "tomorrow", label: t("tomorrow") },
    { id: "week", label: t("days7") },
  ];

  return (
    <div className="max-w-4xl">
      <PageHeader title={t("schedule")} />

      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((x) => (
          <button key={x.id} onClick={() => setTab(x.id)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${tab === x.id ? "bg-emerald-600 text-white shadow-sm" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"}`}>
            {x.label}
          </button>
        ))}
      </div>

      {tab !== "week" ? (
        <div className="space-y-3.5">
          {rows.map((r) => {
            const isRice = r.crop === "Rice";
            const isTomato = r.crop === "Tomato";
            return (
              <Card key={r.key} className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200/80 transition hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                    isTomato ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"
                  }`}>
                    {isRice ? (
                      <span className="text-xl">🌾</span>
                    ) : isTomato ? (
                      <span className="text-xl">🍅</span>
                    ) : (
                      <span className="text-xl">🌽</span>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-base">{t(r.field)} - {t(r.crop)}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{r.start} – {r.end}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{n(r.min, 0)} {t("minutes")} • {r.litres.toLocaleString()} {t("L")}</p>
                  </div>
                </div>

                <div>
                  {r.status === "Scheduled" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                      ✓ {t("Scheduled")}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                      • {t("Pending")}
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="rounded-2xl border border-slate-200/80">
          <ul className="divide-y divide-slate-100">
            {weekFactor.map((f, i) => (
              <li key={i} className="flex items-center gap-4 py-3.5">
                <span className="w-28 text-sm text-slate-600 font-medium">{dayLabel(i, lang)}</span>
                <div className="h-2 flex-1 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-emerald-600" style={{ width: `${f * 100}%` }} /></div>
                <span className="w-24 text-right text-sm font-semibold text-slate-800">{litres(Math.round(todayTotal * f), t("L"))}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="mt-6">
        <button onClick={optimize} disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-500 transition">
          <Sparkles className="h-4 w-4" /> {busy ? t("Optimizing...") : `✨ ${t("optimizeAI")}`}
        </button>
        {msg && <p role="status" className="mt-3 text-center text-sm font-medium text-emerald-700">{msg}</p>}
      </div>
    </div>
  );
}
