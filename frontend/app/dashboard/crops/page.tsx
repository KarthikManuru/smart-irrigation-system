"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Card, PageHeader, btnPrimary, btnGhost, inputCls } from "@/components/dashboard/ui";
import { useT } from "@/components/dashboard/useT";
import { useLocale } from "@/components/dashboard/locale";
import { crops as seedCrops } from "@/lib/mock";

type Tab = "all" | "active" | "seasonal";

type Crop = {
  name: string;
  season: string;
  place: string;
  status: string;
  kind: string;
};

export default function CropsPage() {
  const t = useT();
  const { n } = useLocale();
  const [tab, setTab] = useState<Tab>("all");
  const [list, setList] = useState<Crop[]>([...seedCrops]);
  const [open, setOpen] = useState(false);

  const shown = list.filter((c) => tab === "all" || c.kind === tab);
  const tabs: { id: Tab; label: string }[] = [
    { id: "all", label: t("All Crops") },
    { id: "active", label: t("Active") },
    { id: "seasonal", label: t("Seasonal") },
  ];

  const cropIcons: Record<string, { icon: string; bg: string }> = {
    Rice: { icon: "🌾", bg: "bg-emerald-50 text-emerald-700" },
    Maize: { icon: "🌽", bg: "bg-amber-50 text-amber-700" },
    Tomato: { icon: "🍅", bg: "bg-rose-50 text-rose-700" },
    Wheat: { icon: "🌾", bg: "bg-amber-50 text-amber-700" },
  };

  return (
    <div className="max-w-4xl">
      <PageHeader title={t("cropMgmt")}>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition"
        >
          <Plus className="h-4 w-4" /> {t("Add Crop")}
        </button>
      </PageHeader>

      <div className="mb-5 flex gap-2">
        {tabs.map((x) => (
          <button
            key={x.id}
            onClick={() => setTab(x.id)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${tab === x.id
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
              }`}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {shown.map((c) => {
          const [fName, fAcres] = c.place.split(" · ");
          const acresNum = parseFloat(fAcres);
          const placeStr = isNaN(acresNum)
            ? `${t(fName)} · ${fAcres}`
            : `${t(fName)} • ${n(acresNum, 1)} ${t("acres")}`;
          const cropMeta = cropIcons[c.name] || { icon: "🌱", bg: "bg-slate-50 text-slate-700" };

          return (
            <Card
              key={c.name}
              className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200/80 transition hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${cropMeta.bg} text-2xl shadow-inner`}
                >
                  {cropMeta.icon}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-base">{t(c.name)}</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{t(c.season)}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{placeStr}</p>
                </div>
              </div>

              <div>
                {c.status === "Healthy" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                    ✓ {t("Healthy")}
                  </span>
                ) : c.status === "Growing" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                    ✓ {t("Growing")}
                  </span>
                ) : c.status === "Needs Attention" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                    • {t("Needs Attention")}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
                    + {t("Planned")}
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const d = new FormData(e.currentTarget);
              setList((l) => [
                ...l,
                {
                  name: String(d.get("name")),
                  season: String(d.get("season")),
                  place: `${String(d.get("field"))} · ${String(d.get("acres"))} acres`,
                  status: "Healthy",
                  kind: "active",
                },
              ]);
              setOpen(false);
            }}
            className="w-full max-w-md space-y-3.5 rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{t("Add Crop")}</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <input required name="name" placeholder={t("Crop name (e.g., Rice, Sugarcane)")} className={inputCls} />
            <input required name="season" placeholder={t("Season (e.g., Rabi Season, Kharif Season)")} className={inputCls} />
            <select name="field" className={inputCls}>
              <option value="Field 1">{t("Field 1")}</option>
              <option value="Field 2">{t("Field 2")}</option>
              <option value="Field 3">{t("Field 3")}</option>
            </select>
            <input
              required
              name="acres"
              type="number"
              step="0.1"
              min="0.1"
              placeholder={t("Area in acres")}
              className={inputCls}
            />
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className={btnGhost} onClick={() => setOpen(false)}>
                {t("Cancel")}
              </button>
              <button type="submit" className={btnPrimary}>
                {t("Save Crop")}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}