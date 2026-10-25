"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { languages, translations, type Dict, type Lang } from "./translations";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const LanguageContext = createContext<Ctx>({
  lang: "en",
  setLang: () => { },
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start with English so the server and the browser render the same text
  const [lang, setLangState] = useState<Lang>("en");

  // After the page loads, restore the language the user picked last time
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gf-lang");
      const match = languages.find((l) => l.code === saved);
      if (match) setLangState(match.code);
    } catch {
      /* storage not available, stay on English */
    }
  }, []);

  // Keep the <html lang="..."> attribute in sync
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("gf-lang", l);
    } catch {
      /* ignore */
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] ?? translations.en }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);