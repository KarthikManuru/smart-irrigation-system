"use client";

import Link from "next/link";
import { Bell, Menu, Search, Settings } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { languages, type Lang } from "@/components/translations";
import type { User } from "@/lib/auth";
import { useT } from "./useT";

export default function Topbar({ onMenu, user }: { onMenu: () => void; user: User }) {
  const t = useT();
  const { lang, setLang } = useLanguage();

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
      <button onClick={onMenu} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden max-w-xl flex-1 sm:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input placeholder={t("search")}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-800 outline-none focus:border-gf-500" />
      </div>
      <div className="flex-1 sm:hidden" />

      <Link href="/dashboard/alerts" className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100" aria-label={t("alerts")}>
        <Bell className="h-5 w-5" />
        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">3</span>
      </Link>

      <Link href="/dashboard/settings" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100" aria-label={t("settings")}>
        <Settings className="h-5 w-5" />
      </Link>

      <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} aria-label="Language"
        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none">
        {languages.map((l) => <option key={l.code} value={l.code}>{l.code.toUpperCase()}</option>)}
      </select>

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-sm" title={user.name}>
        SR
      </div>
    </header>
  );
}
