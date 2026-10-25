"use client";

import { Sprout } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { sections } from "./sections";

export default function About() {
  const { lang } = useLanguage();
  const s = sections[lang];

  return (
    <section id="about" className="bg-gf-950 px-6 py-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <Sprout className="h-12 w-12 text-gf-400" />
        <h2 className="mt-6 text-3xl font-bold sm:text-4xl">{s.aboutTitle}</h2>
        <p className="mt-6 text-lg leading-relaxed text-white/80">
          {s.aboutText}
        </p>
      </div>
    </section>
  );
}
