"use client";

import Link from "next/link";
import { useState } from "react";
import { Leaf, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { languages } from "./translations";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.features, href: "#features" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
    { label: "UI Showcase", href: "/showcase" },
  ];

  const current = languages.find((l) => l.code === lang)?.label ?? "English";

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Leaf className="h-9 w-9 text-gf-400" />
          <div className="leading-tight">
            <p className="text-xl font-bold">{t.brand}</p>
            <p className="text-[10px] text-white/70">{t.brandSub}</p>
          </div>
        </Link>

        <ul className="hidden items-center gap-8 text-sm md:flex">
          {links.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`pb-1 transition hover:text-gf-300 ${
                  i === 0 ? "border-b-2 border-gf-400 text-gf-300" : ""
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 text-sm text-white/90"
            >
              <Globe className="h-4 w-4" />
              {current}
              <ChevronDown className="h-4 w-4" />
            </button>
            {open && (
              <ul className="absolute right-0 mt-2 max-h-72 w-40 overflow-y-auto rounded-lg bg-gf-800 text-sm shadow-lg">
                {languages.map((l) => (
                  <li key={l.code}>
                    <button
                      onClick={() => {
                        setLang(l.code);
                        setOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-gf-700 ${
                        l.code === lang ? "text-gf-300" : ""
                      }`}
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link
            href="/login"
            className="rounded-lg border border-white/40 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
          >
            {t.nav.login}
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg bg-gf-500 px-4 py-2 text-sm font-semibold transition hover:bg-gf-400"
          >
            {t.nav.dashboard}
          </Link>
        </div>
      </nav>
    </header>
  );
}
