"use client";

import {
  Droplets,
  CloudSun,
  CalendarClock,
  Mic,
  Bell,
  FileBarChart,
  Radio,
  BrainCircuit,
  CalendarCheck,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { sections } from "./sections";

const featureIcons = [Droplets, CloudSun, CalendarClock, Mic, Bell, FileBarChart];
const stepIcons = [Radio, BrainCircuit, CalendarCheck];

export default function Features() {
  const { lang } = useLanguage();
  const s = sections[lang];

  return (
    <>
      <section id="features" className="bg-gf-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{s.featuresTitle}</h2>
            <p className="mt-4 text-white/70">{s.featuresSub}</p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {s.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-gf-900/60 p-6 transition hover:border-gf-400/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gf-500/15">
                    <Icon className="h-6 w-6 text-gf-400" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gf-900 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">
            {s.howTitle}
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {s.steps.map((st, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gf-400/40 bg-gf-800">
                      <Icon className="h-9 w-9 text-gf-300" />
                    </div>
                    <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-gf-500 text-sm font-bold">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{st.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/70">
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
