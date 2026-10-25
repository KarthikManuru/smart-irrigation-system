"use client";

import { useState } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, CloudRain, Wifi } from "lucide-react";
import { Card, PageHeader, btnGhost } from "@/components/dashboard/ui";
import { useT } from "@/components/dashboard/useT";
import { useLocale } from "@/components/dashboard/locale";
import { alertsSeed } from "@/lib/mock";

const look = {
  critical: { icon: AlertCircle, cls: "bg-red-50 text-red-600" },
  warning: { icon: AlertTriangle, cls: "bg-amber-50 text-amber-600" },
  info: { icon: CloudRain, cls: "bg-sky-50 text-sky-600" },
  success: { icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-600" },
  neutral: { icon: Wifi, cls: "bg-slate-100 text-slate-600" },
} as const;

export default function AlertsPage() {
  const t = useT();
  const [items, setItems] = useState(alertsSeed);
  const unread = items.filter((a) => !a.read).length;

  return (
    <div className="max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {/* Window header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <span className="text-base">🔔</span>
            </div>
            <h1 className="font-bold text-slate-900 text-base">{t("Alerts & Notifications")}</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setItems((l) => l.map((a) => ({ ...a, read: true })))}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition"
            >
              {t("View All >")}
            </button>
            <button
              onClick={() => window.history.back()}
              className="text-slate-400 hover:text-slate-600 transition"
              aria-label={t("Close")}
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-5">
          <p className="mb-4 text-xs font-semibold text-slate-500">
            {unread} {t("new alerts")}
          </p>

          <div className="space-y-3">
            {items.map((a) => {
              const { icon: Icon, cls } = look[a.severity];
              return (
                <div
                  key={a.id}
                  onClick={() => setItems((l) => l.map((x) => (x.id === a.id ? { ...x, read: true } : x)))}
                  className={`flex cursor-pointer items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 transition hover:bg-slate-50 hover:border-slate-200 ${
                    a.read ? "opacity-75" : ""
                  }`}
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${cls} shadow-inner`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm">{t(a.title)}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{t(a.text)}</p>
                  </div>
                  {!a.read && (
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-red-500 shrink-0" aria-label={t("Unread")} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
