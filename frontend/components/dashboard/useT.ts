"use client";

import { useLanguage } from "@/components/LanguageContext";
import { dashDict, en, type DashKey, translateContent } from "@/lib/dash-i18n";

/** Translates both dashboard keys and visible English page text. */
export function useT() {
  const { lang } = useLanguage();
  return (key: DashKey | string) => {
    if (key in en) return dashDict[lang]?.[key as DashKey] ?? translateContent(lang, en[key as DashKey]) ?? en[key as DashKey];
    return translateContent(lang, key);
  };
}
