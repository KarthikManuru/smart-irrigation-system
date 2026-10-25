"use client";

import { CloudRain, CloudSun, Sun, Cloud, CloudDrizzle } from "lucide-react";
import { HourlyForecast } from "@/components/dashboard/charts";
import { Card, MockNote, PageHeader } from "@/components/dashboard/ui";
import { useT } from "@/components/dashboard/useT";
import { useLocale } from "@/components/dashboard/locale";
import { forecast5, hourlyRain, hourlyTemp } from "@/lib/mock";

const icon = (text: string) =>
  text === "Sunny" ? Sun : text === "Rain" ? CloudRain : text === "Showers" ? CloudDrizzle : text === "Cloudy" ? Cloud : CloudSun;

export default function WeatherPage() {
  const t = useT();
  const { n, pct } = useLocale();
  return (
    <div className="space-y-5">
      <PageHeader title={t("weather")} />
      <MockNote>{t("Sample forecast. Connect the weather service (weather/ folder in the repo) here later.")}</MockNote>

      <Card className="flex flex-wrap items-center gap-6">
        <CloudSun className="h-16 w-16 text-amber-400" />
        <div><p className="text-4xl font-bold text-slate-900">{n(28, 0)}{t("°C")}</p><p className="text-slate-500">{t("Partly Cloudy")} · {t("Bengaluru")}</p></div>
        <div className="ml-auto grid grid-cols-3 gap-6 text-center text-sm">
          <div><p className="text-slate-500">{t("Humidity")}</p><p className="font-semibold">{pct(72)}</p></div>
          <div><p className="text-slate-500">{t("Wind")}</p><p className="font-semibold">{n(9, 0)} {t("km/h")}</p></div>
          <div><p className="text-slate-500">{t("Rain today")}</p><p className="font-semibold">{pct(10)}</p></div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {forecast5.map((d) => {
          const Icon = icon(d.text);
          return (
            <Card key={d.day} className="text-center">
              <p className="text-sm font-medium text-slate-700">{t(d.day)}</p>
              <Icon className="mx-auto my-2 h-8 w-8 text-sky-500" />
              <p className="text-lg font-bold">{n(d.temp, 0)}{t("°C")}</p>
              <p className="text-xs text-slate-500">{t(d.text)}</p>
              <p className="mt-1 text-xs text-sky-600">{pct(d.rainPct)} · {n(d.mm, 0)} {t("mm")}</p>
            </Card>
          );
        })}
      </div>

      <Card>
        <h2 className="mb-1 font-semibold text-slate-800">{t("Next 24 hours")}</h2>
        <p className="mb-2 text-xs text-slate-500"><span className="text-amber-500">━</span> {t("Temperature")} <span className="ml-3 text-sky-400">▮</span> {t("Rain chance")}</p>
        <HourlyForecast temps={hourlyTemp} rain={hourlyRain} />
      </Card>
    </div>
  );
}
