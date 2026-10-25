"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { languages, type Lang } from "@/components/translations";
import { Card, PageHeader, btnGhost, btnPrimary, inputCls } from "@/components/dashboard/ui";
import { useT } from "@/components/dashboard/useT";
import { getUser, logout, updateName } from "@/lib/auth";

export default function SettingsPage() {
  const t = useT();
  const router = useRouter();
  const { lang, setLang } = useLanguage();
  const [name, setName] = useState(() => getUser()?.name ?? "");
  const [saved, setSaved] = useState(false);
  const [notify, setNotify] = useState({ alerts: true, weather: true, reports: false });

  return (
    <div className="max-w-xl space-y-5">
      <PageHeader title={t("settings")} />
      <Card className="space-y-3">
        <h2 className="font-semibold text-slate-800">{t("Profile")}</h2>
        <label className="block text-sm text-slate-600">{t("fullName")}
          <input value={name} onChange={(e) => { setName(e.target.value); setSaved(false); }} className={inputCls} />
        </label>
        <button className={btnPrimary} onClick={() => { updateName(name.trim() || "Farmer"); setSaved(true); }}>{t("Save")}</button>
        {saved && <p role="status" className="text-sm text-emerald-700">{t("Saved. Refresh to see the new name everywhere.")}</p>}
      </Card>

      <Card className="space-y-3">
        <h2 className="font-semibold text-slate-800">{t("Language")}</h2>
        <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} className={inputCls}>
          {languages.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
        </select>
        <p className="text-xs text-slate-500">{t("All dashboard content follows the selected language.")}</p>
      </Card>

      <Card className="space-y-3">
        <h2 className="font-semibold text-slate-800">{t("Notifications")}</h2>
        {(["alerts", "weather", "reports"] as const).map((k) => (
          <label key={k} className="flex items-center justify-between text-sm capitalize text-slate-700">
            {t(k)}
            <input type="checkbox" checked={notify[k]} onChange={(e) => setNotify((n) => ({ ...n, [k]: e.target.checked }))} className="h-4 w-4 accent-[#22a05a]" />
          </label>
        ))}
      </Card>

      <button className={btnGhost} onClick={() => { logout(); router.replace("/login"); }}>{t("logout")}</button>
    </div>
  );
}
