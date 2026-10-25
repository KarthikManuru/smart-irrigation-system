"use client";

import { useLanguage } from "@/components/LanguageContext";

const LOCALES: Record<string, string> = {
  en: "en-IN", hi: "hi-IN", kn: "kn-IN", ta: "ta-IN", te: "te-IN",
  ml: "ml-IN", mr: "mr-IN", bn: "bn-IN", gu: "gu-IN", pa: "pa-IN", or: "or-IN",
};

export function localeFor(lang: string) {
  return LOCALES[lang] ?? "en-IN";
}

export function formatNumber(value: number, lang: string, maximumFractionDigits = 2) {
  return new Intl.NumberFormat(localeFor(lang), { maximumFractionDigits }).format(value);
}

export function formatPercent(value: number, lang: string, maximumFractionDigits = 0) {
  return `${formatNumber(value, lang, maximumFractionDigits)}%`;
}

export function formatLitres(value: number, lang: string, litreLabel = "L") {
  return `${formatNumber(value, lang, 0)} ${litreLabel}`;
}

export function formatDate(date: Date, lang: string) {
  return date.toLocaleDateString(localeFor(lang), { day: "numeric", month: "short", year: "numeric" });
}

export function useLocale() {
  const { lang } = useLanguage();
  return {
    lang,
    locale: localeFor(lang),
    n: (value: number, digits = 2) => formatNumber(value, lang, digits),
    pct: (value: number, digits = 0) => formatPercent(value, lang, digits),
    litres: (value: number, label = "L") => formatLitres(value, lang, label),
  };
}
