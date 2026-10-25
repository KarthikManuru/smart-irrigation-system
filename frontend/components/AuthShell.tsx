"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Leaf } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { languages, type Lang } from "./translations";
import { useT } from "./dashboard/useT";

export default function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  const { lang, setLang, t } = useLanguage();
  const tt = useT();

  return (
    <main className="grid min-h-screen md:grid-cols-2">
      <div className="relative hidden md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "70% 80%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(4,24,15,0.55),rgba(4,24,15,0.85))" }} />
        <div className="relative z-10 flex h-full flex-col justify-between p-10">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-gf-400" />
            <span className="text-2xl font-bold">{t.brand}</span>
          </Link>
          <p className="max-w-sm text-3xl font-bold leading-snug">
            {t.tagline[0]} <span className="text-gf-400">{t.tagline[1]}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-gf-950 px-6 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1 text-sm text-white/70 hover:text-gf-300">
              <ArrowLeft className="h-4 w-4" /> {tt("backHome")}
            </Link>
            <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} aria-label="Language"
              className="rounded-lg border border-white/20 bg-gf-900 px-2 py-1.5 text-sm text-white">
              {languages.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-white/70">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </main>
  );
}

export const authInput =
  "w-full rounded-lg border border-white/15 bg-gf-900/70 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-gf-400";
