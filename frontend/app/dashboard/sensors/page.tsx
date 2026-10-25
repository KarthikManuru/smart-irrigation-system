"use client";

import { BatteryMedium } from "lucide-react";
import { Badge, Card, MockNote, PageHeader } from "@/components/dashboard/ui";
import { useT } from "@/components/dashboard/useT";
import { useLocale } from "@/components/dashboard/locale";
import { sensors } from "@/lib/mock";

export default function SensorsPage() {
  const t = useT();
  const { n } = useLocale();
  return (
    <div>
      <PageHeader title={t("sensors")} />
      <MockNote>{t("Sample readings. Connect GET /api/v1/sensors (or your sensor-ingestion API) here later.")}</MockNote>
      <Card className="overflow-x-auto !p-0">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr><th className="px-5 py-3">{t("Sensor")}</th><th className="px-5 py-3">{t("Field")}</th><th className="px-5 py-3">{t("Type")}</th><th className="px-5 py-3">{t("Reading")}</th><th className="px-5 py-3">{t("Battery")}</th><th className="px-5 py-3">{t("Last seen")}</th><th className="px-5 py-3">{t("Status")}</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sensors.map((s) => (
              <tr key={s.id}>
                <td className="px-5 py-3 font-medium text-slate-900">{s.id}</td>
                <td className="px-5 py-3">{t(s.field)}</td>
                <td className="px-5 py-3">{t(s.type)}</td>
                <td className="px-5 py-3 font-semibold">{s.value}</td>
                <td className="px-5 py-3"><span className="inline-flex items-center gap-1"><BatteryMedium className="h-4 w-4 text-slate-400" />{n(s.battery, 0)}%</span></td>
                <td className="px-5 py-3 text-slate-500">{n(s.mins, 0)} {t("mins ago")}</td>
                <td className="px-5 py-3"><Badge tone="green">{t("Online")}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
