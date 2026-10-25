"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { sections } from "./sections";

export default function Footer() {
  const { lang, t } = useLanguage();
  const s = sections[lang];

  const links = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.features, href: "#features" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="border-t border-white/10 bg-gf-950 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-3">
          <Leaf className="h-8 w-8 text-gf-400" />
          <div className="leading-tight">
            <p className="text-lg font-bold">{t.brand}</p>
            <p className="text-xs text-white/60">{t.brandSub}</p>
          </div>
        </div>

        <ul className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-gf-300">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <Link href="/login" className="transition hover:text-gf-300">
              {t.nav.login}
            </Link>
          </li>
        </ul>
      </div>
      <p className="mt-8 text-center text-xs text-white/50">{s.footer}</p>
    </footer>
  );
}
