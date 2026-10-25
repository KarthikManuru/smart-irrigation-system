"use client";

import { useState } from "react";
import { Calendar, ChevronDown, ChevronRight, FileText } from "lucide-react";
import { downloadCsv } from "@/lib/csv";
import { reportRows } from "@/lib/mock";
import { useLanguage } from "@/components/LanguageContext";
import { useT } from "@/components/dashboard/useT";

const reports = [
  { id: "irrigation", title: "Irrigation Report", color: "bg-sky-50 text-sky-600" },
  { id: "crop", title: "Crop Health Report", color: "bg-emerald-50 text-emerald-600" },
  { id: "water", title: "Water Usage Report", color: "bg-cyan-50 text-cyan-600" },
  { id: "field", title: "Field Summary", color: "bg-amber-50 text-amber-600" },
];

export default function ReportsPage() {
  const t = useT();
  const { lang } = useLanguage();
  const d2 = new Date();
  const d1 = new Date();
  d1.setDate(d2.getDate() - 14);
  const range = `${d1.toLocaleDateString(`${lang}-IN`, { day: "2-digit", month: "short", year: "numeric" })} - ${d2.toLocaleDateString(`${lang}-IN`, { day: "2-digit", month: "short", year: "numeric" })}`;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {/* Window header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <FileText className="h-4 w-4" />
            </div>
            <h1 className="font-bold text-slate-900 text-base">{t("Reports & Downloads")}</h1>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="text-xs cursor-pointer hover:text-slate-600">─</span>
            <span className="text-xs cursor-pointer hover:text-slate-600">◻</span>
            <span className="text-xs cursor-pointer hover:text-slate-600">✕</span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Date range picker selector */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-xs text-slate-700">
            <div className="flex items-center gap-2 font-medium">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>{range}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>

          {/* 4 Report Cards */}
          <div className="space-y-3">
            {reports.map((r) => (
              <div
                key={r.id}
                onClick={() => downloadCsv(`${r.id}-report.csv`, reportRows(r.id))}
                className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/30"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${r.color} shadow-inner`}>
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t(r.title)}</p>
                    <p className="text-[11px] font-semibold text-slate-400 mt-0.5 group-hover:text-emerald-600 transition">
                      {t("Download PDF >")}
                    </p>
                  </div>
                </div>

                <div className="text-slate-300 group-hover:text-emerald-600 transition">
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
