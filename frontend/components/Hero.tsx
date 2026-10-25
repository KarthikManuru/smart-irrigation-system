"use client";

import {
  Activity,
  CloudSun,
  BrainCircuit,
  Languages,
  Smartphone,
  ArrowRight,
  Play,
  Droplet,
  Sprout,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";

const featureIcons = [Activity, CloudSun, BrainCircuit, Languages, Smartphone];
const statIcons = [Droplet, Sprout, Globe];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gf-900"
    >
      {/* Full-width background photo */}
      <div className="pointer-events-none absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.jpg"
          alt="Farmer checking irrigation data on his phone, overlooking green fields at sunrise"
          className="h-full w-full object-cover"
          style={{ objectPosition: "70% 80%" }}
        />
        {/* Dark green fade on the left so the text stays easy to read */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(4,24,15,0.92) 0%, rgba(4,24,15,0.78) 30%, rgba(4,24,15,0.25) 62%, rgba(4,24,15,0) 100%)",
          }}
        />
        {/* Extra darkening on small screens */}
        <div className="absolute inset-0 bg-gf-950/50 md:hidden" />
        {/* Soft fade at the bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "linear-gradient(0deg, rgba(4,24,15,0.8) 0%, rgba(4,24,15,0) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-10 pt-32">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          {t.hero.line1}
          <br />
          {t.hero.line2}
          <br />
          <span className="text-gf-400">{t.hero.line3}</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-white/85">
          {t.hero.description}
        </p>

        <div className="mt-8 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-5">
          {t.hero.features.map((f, i) => {
            const Icon = featureIcons[i];
            return (
              <div key={i} className="flex flex-col items-start gap-2">
                <Icon className="h-8 w-8 text-gf-300" />
                <p className="text-xs leading-tight text-white/90">
                  {f.title}
                  <br />
                  {f.sub}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/register"
            className="flex items-center gap-2 rounded-lg bg-gf-500 px-6 py-3 font-semibold transition hover:bg-gf-400"
          >
            {t.hero.getStarted} <ArrowRight className="h-4 w-4" />
          </Link>
          <button className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-medium backdrop-blur transition hover:bg-white/20">
            <Play className="h-4 w-4" /> {t.hero.watchDemo}
          </button>
        </div>

        <div className="mt-10 grid max-w-3xl gap-6 rounded-2xl border border-white/10 bg-gf-950/60 p-5 backdrop-blur sm:grid-cols-3">
          {t.hero.stats.map((s, i) => {
            const Icon = statIcons[i];
            return (
              <div key={i} className="flex items-center gap-3">
                <Icon className="h-7 w-7 text-gf-400" />
                <p className="text-sm leading-tight">
                  <span className="font-semibold">{s.title}</span>
                  <br />
                  <span className="text-white/70">{s.sub}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating cards (desktop only) */}
      <div className="absolute right-12 top-40 z-10 hidden flex-col gap-4 lg:flex">
        <div className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md">
          <CloudSun className="h-10 w-10 text-yellow-300" />
          <div>
            <p className="text-2xl font-bold">28°C</p>
            <p className="text-xs text-white/80">{t.cards.weather}</p>
            <p className="text-xs text-white/60">{t.cards.city}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-gf-400/40 bg-gf-800/70 px-6 py-4 backdrop-blur-md">
          <Droplet className="h-9 w-9 text-gf-300" />
          <div>
            <p className="text-xs text-white/80">{t.cards.soil}</p>
            <p className="text-2xl font-bold">68%</p>
            <p className="text-xs text-gf-300">{t.cards.optimal}</p>
          </div>
        </div>
      </div>

      {/* Tagline: changes with the selected language */}
      <p className="absolute bottom-10 right-12 z-10 hidden text-right text-xl font-bold leading-snug md:block">
        {t.tagline[0]}
        <br />
        {t.tagline[1]}
      </p>
    </section>
  );
}
