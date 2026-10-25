"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Plus, Search, X } from "lucide-react";
import { Badge, Card, PageHeader, btnGhost, btnPrimary, inputCls } from "@/components/dashboard/ui";
import { statusInfo } from "@/components/dashboard/status";
import { useT } from "@/components/dashboard/useT";
import { useLocale } from "@/components/dashboard/locale";
import { cropLook, defaultLook, fields as seed, type Field, type FieldStatus } from "@/lib/mock";

const cropOptions = ["Rice", "Maize", "Tomato", "Wheat", "Sugarcane", "Cotton", "Ragi"];

export default function FieldsPage() {
  const t = useT();
  const { n } = useLocale();
  const [list, setList] = useState<Field[]>(seed);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | FieldStatus>("all");
  const [open, setOpen] = useState(false);

  const shown = list.filter(
    (f) =>
      (filter === "all" || f.status === filter) &&
      `${f.name} ${f.crop}`.toLowerCase().includes(query.toLowerCase()),
  );

  function add(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    // Saved in memory only. Connect POST /api/v1/fields here later.
    setList((l) => [
      ...l,
      {
        id: `field-${Date.now()}`, name: String(d.get("name")), acres: Number(d.get("acres")),
        crop: String(d.get("crop")), soil: String(d.get("soil")), moisture: 50, status: "healthy",
        efficiency: 0.9, flowLpm: 800, demandMm: 3, start: "06:00", pulses: 1, warnings: [],
      },
    ]);
    setOpen(false);
  }

  return (
    <div>
      <PageHeader title={t("fieldsMgmt")}>
        <button className={btnPrimary} onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> {t("addField")}</button>
      </PageHeader>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("Search fields...")} className={`${inputCls} pl-9`} />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value as "all" | FieldStatus)} className={`${inputCls} sm:w-52`}>
          <option value="all">{t("All Fields")}</option>
          <option value="healthy">{t("healthy")}</option>
          <option value="attention">{t("attention")}</option>
          <option value="priority">{t("highPriority")}</option>
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((f) => {
          const s = statusInfo(f.status, t);
          const imgSrc =
            f.id === "field-1"
              ? "/images/field-1.jpg"
              : f.id === "field-2"
              ? "/images/field-2.jpg"
              : f.id === "field-3"
              ? "/images/field-3.jpg"
              : "/images/hero.jpg";
          return (
            <Link key={f.id} href={`/dashboard/fields/${f.id}`}>
              <Card className="overflow-hidden !p-0 transition hover:shadow-lg rounded-2xl border border-slate-200/80">
                <div className="relative h-40 w-full overflow-hidden bg-emerald-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgSrc}
                    alt={f.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes("/api/field-image/")) {
                        target.src = `/api/field-image/${f.id}.jpg`;
                      } else {
                        target.src = "/images/hero.jpg";
                      }
                    }}
                  />
                </div>
                <div className="p-4">
                  <p className="font-bold text-slate-900 text-base">{t(f.name)}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{n(f.acres, 1)} {t("acres")} · {t(f.crop)}</p>
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ${
                      f.status === 'healthy' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' :
                      f.status === 'attention' ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200' :
                      'bg-red-50 text-red-700 ring-1 ring-red-200'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        f.status === 'healthy' ? 'bg-emerald-500' :
                        f.status === 'attention' ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                      {s.label}
                    </span>
                    <span className="text-slate-500 font-medium">{n(f.moisture, 0)}% {t("moisture")}</span>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={add} className="w-full max-w-md space-y-3 rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{t("addField")}</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close"><X className="h-5 w-5 text-slate-500" /></button>
            </div>
            <input required name="name" placeholder={t("Field name")} className={inputCls} />
            <input required name="acres" type="number" step="0.1" min="0.1" placeholder={t("Area (acres)")} className={inputCls} />
            <select name="crop" className={inputCls}>{cropOptions.map((c) => <option key={c} value={c}>{t(c)}</option>)}</select>
            <select name="soil" className={inputCls}>{["Black soil", "Red soil", "Sandy loam", "Clay loam"].map((c) => <option key={c} value={c}>{t(c)}</option>)}</select>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className={btnGhost} onClick={() => setOpen(false)}>{t("Cancel")}</button>
              <button type="submit" className={btnPrimary}>{t("Save")}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
