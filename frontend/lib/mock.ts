import { grossLitres, minutesFor } from "./calc";

// ALL VALUES BELOW ARE SAMPLE DATA. Replace with API calls when the backend is ready.

export type FieldStatus = "healthy" | "attention" | "priority";

export interface Field {
  id: string;
  name: string;
  acres: number;
  crop: string;
  soil: string;
  moisture: number;
  status: FieldStatus;
  efficiency: number; // application efficiency (0-1)
  flowLpm: number; // valve flow rate, litres per minute
  demandMm: number; // predicted net demand in mm (sample)
  start: string; // preferred start time HH:MM
  pulses: number; // number of pulses the volume is split into
  warnings: string[];
}

export const fields: Field[] = [
  {
    id: "field-1", name: "Field 1", acres: 2.5, crop: "Rice", soil: "Black soil",
    moisture: 68, status: "healthy", efficiency: 0.9, flowLpm: 750, demandMm: 3.0,
    start: "06:00", pulses: 1, warnings: [],
  },
  {
    id: "field-2", name: "Field 2", acres: 1.8, crop: "Maize", soil: "Red soil",
    moisture: 42, status: "attention", efficiency: 0.9, flowLpm: 800, demandMm: 4.5,
    start: "17:30", pulses: 1,
    warnings: ["Rain expected in 2 days (12 mm). The next irrigation may be reduced by the rain guard."],
  },
  {
    id: "field-3", name: "Field 3", acres: 3.2, crop: "Tomato", soil: "Sandy loam",
    moisture: 28, status: "priority", efficiency: 0.9, flowLpm: 1200, demandMm: 5.5,
    start: "06:30", pulses: 2,
    warnings: [
      "Soil moisture is very low (28%). Irrigation is split into 2 pulses to avoid runoff.",
      "The last sensor reading is 8 minutes old.",
    ],
  },
];

export const cropLook: Record<string, string> = {
  Rice: "repeating-linear-gradient(90deg,#3f8f3a 0 8px,#58a84b 8px 16px)",
  Maize: "repeating-linear-gradient(100deg,#2f7a2f 0 10px,#6aa84f 10px 20px)",
  Tomato: "repeating-linear-gradient(100deg,#2d6a2f 0 9px,#b83a2e 9px 14px,#2d6a2f 14px 24px)",
  Wheat: "repeating-linear-gradient(90deg,#c9a94a 0 8px,#d9bf6a 8px 16px)",
};
export const defaultLook = "repeating-linear-gradient(90deg,#2f7d3b 0 10px,#3d9449 10px 20px)";

// ---- API contract shapes (agree these with the backend / optimizer members) ----
export interface ScheduleWindow {
  start: string;
  end: string;
  volume_litres: number;
  duration_min: number;
}
export interface ScheduleResponse {
  field_id: string;
  predicted_demand_mm: number;
  windows: ScheduleWindow[];
  warnings: string[];
  model_version: string;
}
export interface ModelRow {
  name: string;
  version: string;
  mae: number;
  rmse: number;
  r2: number;
  latency_ms: number;
  status: "active" | "candidate";
}
export interface MetricsResponse {
  active_version: string;
  models: ModelRow[];
  feature_importance: { feature: string; importance: number }[];
}

const pad = (n: number) => String(n).padStart(2, "0");
export function addMinutes(hhmm: string, mins: number) {
  const [h, m] = hhmm.split(":").map(Number);
  const t = (h * 60 + m + mins) % 1440;
  return `${pad(Math.floor(t / 60))}:${pad(t % 60)}`;
}

export function buildMockSchedule(f: Field): ScheduleResponse {
  const total = grossLitres(f.demandMm, f.acres, f.efficiency);
  const perPulse = Math.round(total / f.pulses);
  const dur = minutesFor(perPulse, f.flowLpm);
  const windows = Array.from({ length: f.pulses }, (_, i) => {
    const start = addMinutes(f.start, i * 12 * 60);
    return { start, end: addMinutes(start, dur), volume_litres: perPulse, duration_min: dur };
  });
  return {
    field_id: f.id,
    predicted_demand_mm: f.demandMm,
    windows,
    warnings: f.warnings,
    model_version: "sample-v0 (mock)",
  };
}

export const mockMetrics: MetricsResponse = {
  active_version: "sample-v0",
  models: [
    { name: "Random Forest (baseline)", version: "sample-v0", mae: 0.62, rmse: 0.91, r2: 0.84, latency_ms: 12, status: "active" },
    { name: "XGBoost", version: "sample-v1", mae: 0.55, rmse: 0.83, r2: 0.87, latency_ms: 9, status: "candidate" },
    { name: "LSTM", version: "sample-v1", mae: 0.58, rmse: 0.88, r2: 0.85, latency_ms: 31, status: "candidate" },
  ],
  feature_importance: [
    { feature: "Current soil moisture", importance: 0.31 },
    { feature: "Reference evapotranspiration (ET0)", importance: 0.22 },
    { feature: "Rain forecast (24 h)", importance: 0.15 },
    { feature: "Crop coefficient (Kc)", importance: 0.10 },
    { feature: "Days since planting", importance: 0.08 },
    { feature: "Hours since last irrigation", importance: 0.07 },
    { feature: "Temperature", importance: 0.04 },
    { feature: "Humidity", importance: 0.03 },
  ],
};

export const sensors = [
  { id: "SENSOR_001", field: "Field 1", type: "Soil Moisture", value: "68%", battery: 86, mins: 2, tone: "green" },
  { id: "SENSOR_002", field: "Field 2", type: "Soil Moisture", value: "42%", battery: 74, mins: 5, tone: "amber" },
  { id: "SENSOR_003", field: "Field 3", type: "Soil Moisture", value: "28%", battery: 61, mins: 8, tone: "red" },
  { id: "SENSOR_004", field: "Field 2", type: "Temperature", value: "28°C", battery: 90, mins: 12, tone: "blue" },
  { id: "SENSOR_005", field: "Field 2", type: "Humidity", value: "72%", battery: 79, mins: 15, tone: "blue" },
] as const;

export const crops = [
  { name: "Rice", season: "Rabi Season", place: "Field 1 · 2.5 acres", status: "Healthy", kind: "active" },
  { name: "Maize", season: "Kharif Season", place: "Field 2 · 1.8 acres", status: "Growing", kind: "active" },
  { name: "Tomato", season: "Rabi Season", place: "Field 3 · 3.2 acres", status: "Needs Attention", kind: "active" },
  { name: "Wheat", season: "Rabi Season", place: "Field 1 · 1.2 acres", status: "Planned", kind: "seasonal" },
] as const;

export const forecast5 = [
  { day: "Today", temp: 28, text: "Partly Cloudy", rainPct: 10, mm: 0 },
  { day: "Tomorrow", temp: 29, text: "Sunny", rainPct: 5, mm: 0 },
  { day: "In 2 days", temp: 26, text: "Rain", rainPct: 80, mm: 12 },
  { day: "In 3 days", temp: 25, text: "Showers", rainPct: 60, mm: 5 },
  { day: "In 4 days", temp: 27, text: "Cloudy", rainPct: 20, mm: 0 },
];

export const hourlyTemp = Array.from({ length: 24 }, (_, h) =>
  Math.round(24 + 6 * Math.sin(((h - 9) / 24) * 2 * Math.PI)),
);
export const hourlyRain = Array.from({ length: 24 }, (_, h) => (h >= 14 && h <= 17 ? 20 : 5));

export interface AlertItem {
  id: number;
  title: string;
  text: string;
  severity: "critical" | "warning" | "info" | "success" | "neutral";
  read: boolean;
}
export const alertsSeed: AlertItem[] = [
  { id: 1, title: "Field 3 - Soil Moisture Low", text: "Soil moisture is 28%. Immediate irrigation required.", severity: "critical", read: false },
  { id: 2, title: "Field 2 - High Temperature", text: "Temperature is 34°C. Check crop stress level.", severity: "warning", read: false },
  { id: 3, title: "Weather Update", text: "Rain expected in 2 days (12 mm).", severity: "info", read: false },
  { id: 4, title: "Irrigation Completed", text: "Field 1 irrigation completed successfully.", severity: "success", read: true },
  { id: 5, title: "New Sensor Data", text: "SENSOR_004 is online.", severity: "neutral", read: true },
];

export const analytics = {
  "7": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    water: [350, 420, 380, 450, 410, 480, 360],
    moisture: [58, 55, 62, 60, 57, 64, 61],
    change: "+18% vs last week",
  },
  "30": {
    labels: ["W1", "W2", "W3", "W4"],
    water: [2650, 2850, 3010, 2790],
    moisture: [55, 58, 52, 60, 63, 57, 61, 59, 64, 62],
    change: "+6% vs last month",
  },
  "90": {
    labels: ["Month 1", "Month 2", "Month 3"],
    water: [11200, 12050, 11500],
    moisture: [52, 55, 58, 54, 60, 63, 59, 62, 65, 61, 64, 66],
    change: "+9% vs last quarter",
  },
} as const;
export type Range = keyof typeof analytics;

export function reportRows(id: string): (string | number)[][] {
  switch (id) {
    case "irrigation":
      return [
        ["Field", "Crop", "Start", "End", "Volume (L)", "Duration (min)"],
        ...fields.flatMap((f) =>
          buildMockSchedule(f).windows.map((w) => [f.name, f.crop, w.start, w.end, w.volume_litres, w.duration_min]),
        ),
      ];
    case "crop":
      return [["Crop", "Season", "Location", "Status"], ...crops.map((c) => [c.name, c.season, c.place, c.status])];
    case "water":
      return [["Day", "Water used (L)"], ...analytics["7"].labels.map((d, i) => [d, analytics["7"].water[i]])];
    default:
      return [
        ["Field", "Crop", "Area (acres)", "Soil", "Moisture (%)"],
        ...fields.map((f) => [f.name, f.crop, f.acres, f.soil, f.moisture]),
      ];
  }
}
