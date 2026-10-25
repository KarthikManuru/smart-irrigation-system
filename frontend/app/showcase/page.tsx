"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Leaf,
  Globe,
  ChevronDown,
  CloudSun,
  Droplet,
  ArrowRight,
  Play,
  Activity,
  BrainCircuit,
  Languages,
  Smartphone,
  Sprout,
  LayoutGrid,
  Radio,
  Plus,
  Search,
  Check,
  Calendar,
  Sparkles,
  Lock,
  ChevronRight,
  Mic,
  Maximize2,
  ExternalLink,
} from "lucide-react";
import FieldMap from "@/components/dashboard/FieldMap";
import { BarChart, Donut, LineChart } from "@/components/dashboard/charts";

export default function ShowcasePage() {
  const [activeTab, setActiveTab] = useState<"today" | "tomorrow" | "7days">("today");
  const [cropTab, setCropTab] = useState<"all" | "active" | "seasonal">("all");

  return (
    <div className="min-h-screen bg-[#04140c] text-white p-3 sm:p-6 lg:p-8 font-sans">
      {/* Top Banner Navigation */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-emerald-900/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-black shadow-lg shadow-emerald-500/20">
            <Leaf className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              GreenFlow <span className="text-xs font-normal text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">Complete Design System</span>
            </h1>
            <p className="text-xs text-emerald-200/70">
              Interactive layout matching every frontend screen pixel-perfectly
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-xl border border-emerald-700/50 bg-emerald-950/60 px-4 py-2 text-xs font-semibold text-emerald-200 hover:bg-emerald-900/60 transition"
          >
            Landing Page <ExternalLink className="h-3 w-3" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-500 transition"
          >
            Live Dashboard <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Grid container mirroring the exact reference collage */}
      <div className="space-y-6 max-w-[1720px] mx-auto">
        {/* ROW 1: Landing Page (Left) + Dashboard Overview (Right) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* PANEL 1: Landing Page (Hero) */}
          <div className="xl:col-span-6 rounded-3xl overflow-hidden border border-emerald-800/40 bg-gradient-to-br from-[#072417] to-[#04150d] relative shadow-2xl min-h-[580px] flex flex-col justify-between">
            {/* Background image overlay with gradient */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero.jpg"
                alt="GreenFlow Agriculture"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#04180f] via-[#04180f]/80 to-transparent" />
            </div>

            {/* Hero Navbar */}
            <div className="relative z-10 flex items-center justify-between p-5 border-b border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <Leaf className="h-6 w-6 text-emerald-400" />
                <div>
                  <p className="font-bold text-sm tracking-tight text-white leading-none">GreenFlow</p>
                  <p className="text-[9px] text-white/60">Smart Irrigation for a Sustainable Tomorrow</p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-5 text-xs text-white/80">
                <span className="text-emerald-400 font-semibold border-b-2 border-emerald-400 pb-0.5">Home</span>
                <span className="hover:text-white cursor-pointer">Features</span>
                <span className="hover:text-white cursor-pointer">About</span>
                <span className="hover:text-white cursor-pointer">Contact</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-white/90 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10">
                  <Globe className="h-3.5 w-3.5" />
                  <span>English</span>
                  <ChevronDown className="h-3 w-3" />
                </div>
                <Link
                  href="/dashboard"
                  className="rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-emerald-500 transition"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 p-6 sm:p-8 flex-1 flex flex-col justify-center max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white">
                Smarter Irrigation.
                <br />
                Healthier Crops.
                <br />
                <span className="text-emerald-400">A Greener Future.</span>
              </h2>

              <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed max-w-md">
                AI-powered irrigation system that uses real-time sensor data, weather forecasts and machine learning to give you the right amount of water, at the right time.
              </p>

              {/* 5 Feature Chips */}
              <div className="mt-5 grid grid-cols-3 sm:grid-cols-5 gap-2 text-[10px] text-white/90">
                {[
                  { icon: Activity, title: "Real-time", sub: "Sensor Data" },
                  { icon: CloudSun, title: "Weather", sub: "Forecasts" },
                  { icon: BrainCircuit, title: "AI-Powered", sub: "Recommendations" },
                  { icon: Languages, title: "Multi-Language", sub: "Support" },
                  { icon: Smartphone, title: "Mobile-First", sub: "PWA" },
                ].map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div key={i} className="flex flex-col items-start gap-1 p-1">
                      <Icon className="h-4 w-4 text-emerald-400" />
                      <p className="leading-tight">
                        {f.title}
                        <br />
                        {f.sub}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg hover:bg-emerald-400 transition"
                >
                  Get Started <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <button className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-medium text-white backdrop-blur hover:bg-white/20 transition">
                  <Play className="h-3.5 w-3.5 fill-current" /> Watch Demo
                </button>
              </div>

              {/* 3 Stat Cards in glass container */}
              <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-black/40 p-3.5 backdrop-blur-md">
                {[
                  { icon: Droplet, title: "Save Water", sub: "Up to 40%" },
                  { icon: Sprout, title: "Increase Yield", sub: "Up to 30%" },
                  { icon: Globe, title: "Sustainable Farming", sub: "For Future Generations" },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-emerald-400 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold text-white leading-tight">{s.title}</p>
                        <p className="text-[9px] text-white/60">{s.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Floating Hero Badges (Desktop) */}
            <div className="absolute right-6 top-24 z-10 hidden md:flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md shadow-xl">
                <CloudSun className="h-8 w-8 text-amber-300" />
                <div>
                  <p className="text-lg font-bold leading-none text-white">28°C</p>
                  <p className="text-[10px] text-white/80 mt-0.5">Partly Cloudy</p>
                  <p className="text-[9px] text-white/60">Bengaluru</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/40 bg-emerald-950/80 px-4 py-3 backdrop-blur-md shadow-xl">
                <Droplet className="h-7 w-7 text-emerald-400" />
                <div>
                  <p className="text-[10px] text-white/80">Soil Moisture</p>
                  <p className="text-lg font-bold leading-none text-white">68%</p>
                  <p className="text-[10px] text-emerald-300 font-semibold">Optimal</p>
                </div>
              </div>
            </div>

            {/* Kannada Watermark Text */}
            <p className="absolute bottom-4 right-6 z-10 hidden sm:block text-right text-sm font-bold text-white/85 leading-snug">
              ಸ್ಮಾರ್ಟ್ ರೈತ,
              <br />
              ಸಮೃದ್ಧ ಭವಿಷ್ಯ
            </p>
          </div>

          {/* PANEL 2: Dashboard Overview (Live Farm) */}
          <div className="xl:col-span-6 rounded-3xl overflow-hidden border border-slate-200/80 bg-[#f3f7f4] text-slate-800 shadow-2xl flex flex-col">
            {/* Dashboard Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3.5">
              <div className="flex items-center gap-3 flex-1 max-w-sm">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    readOnly
                    value="Search fields, crops, or anything..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-700 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 cursor-pointer">
                  <span className="text-sm">🔔</span>
                  <span className="absolute right-1 top-1 h-3.5 w-3.5 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">
                    3
                  </span>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-700">
                  EN ▾
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-sm">
                  SR
                </div>
              </div>
            </div>

            {/* Dashboard Content Layout with Mini Sidebar + Main View */}
            <div className="flex-1 flex overflow-hidden">
              {/* Mini Sidebar */}
              <div className="w-48 bg-[#0a2e1e] text-white p-3 hidden sm:flex flex-col justify-between shrink-0">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2 px-3 py-2 text-emerald-400 font-bold border-b border-emerald-900 pb-2 mb-2">
                    <Leaf className="h-4 w-4" /> GreenFlow
                  </div>
                  <div className="flex items-center gap-2.5 rounded-lg bg-[#16a34a] px-3 py-2 text-white font-semibold">
                    <LayoutGrid className="h-3.5 w-3.5" /> Dashboard
                  </div>
                  <Link href="/dashboard/fields" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-emerald-100/70 hover:bg-white/10">
                    Fields
                  </Link>
                  <Link href="/dashboard/crops" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-emerald-100/70 hover:bg-white/10">
                    Crops
                  </Link>
                  <Link href="/dashboard/sensors" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-emerald-100/70 hover:bg-white/10">
                    Sensors
                  </Link>
                  <Link href="/dashboard/weather" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-emerald-100/70 hover:bg-white/10">
                    Weather
                  </Link>
                  <Link href="/dashboard/irrigation" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-emerald-100/70 hover:bg-white/10">
                    Irrigation Schedule
                  </Link>
                  <Link href="/dashboard/alerts" className="flex items-center justify-between rounded-lg px-3 py-2 text-emerald-100/70 hover:bg-white/10">
                    <span>Alerts</span>
                    <span className="rounded-full bg-red-500 px-1.5 py-0.2 text-[10px] font-bold text-white">3</span>
                  </Link>
                  <Link href="/dashboard/reports" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-emerald-100/70 hover:bg-white/10">
                    Reports
                  </Link>
                  <Link href="/dashboard/analytics" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-emerald-100/70 hover:bg-white/10">
                    Analytics
                  </Link>
                  <Link href="/dashboard/settings" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-emerald-100/70 hover:bg-white/10">
                    Settings
                  </Link>
                </div>

                <div className="space-y-2 pt-2 border-t border-emerald-900/60">
                  <Link href="/dashboard/swagger" className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-3 py-1.5 text-xs font-semibold text-white">
                    Swagger UI
                  </Link>
                  <div className="flex items-center gap-2 px-1">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700 text-[10px] font-bold text-white">
                      SR
                    </div>
                    <div className="leading-none">
                      <p className="text-xs font-semibold text-white">Shilpashree R G</p>
                      <p className="text-[9px] text-emerald-300/70">Farmer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Dashboard Panel */}
              <div className="flex-1 p-4 sm:p-5 space-y-4 overflow-y-auto">
                {/* Greeting banner */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Good Morning, Shilpashree! 🌿</h3>
                    <p className="text-xs text-slate-500">Here&apos;s what&apos;s happening with your farm today.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right text-xs">
                      <p className="font-bold text-slate-800">15 Oct 2026</p>
                      <p className="text-slate-500 text-[10px]">Bengaluru, Karnataka</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 shadow-sm">
                      <CloudSun className="h-6 w-6 text-amber-500" />
                      <div>
                        <p className="text-xs font-bold leading-none text-slate-900">28°C</p>
                        <p className="text-[10px] text-slate-500">Partly Cloudy</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <LayoutGrid className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Total Fields</p>
                      <p className="text-lg font-bold text-slate-900">3</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <Sprout className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Total Crops</p>
                      <p className="text-lg font-bold text-slate-900">4</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                      <Radio className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Active Sensors</p>
                      <p className="text-lg font-bold text-slate-900">5</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Droplet className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Water Saved</p>
                      <p className="text-lg font-bold text-slate-900">1,250 L <span className="text-[10px] font-normal text-emerald-600">+12%</span></p>
                    </div>
                  </div>
                </div>

                {/* Map + Sensors row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                  <div className="lg:col-span-7 rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm">
                    <p className="text-xs font-bold text-slate-800 mb-2">Field Overview</p>
                    <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
                      <FieldMap />
                    </div>
                  </div>

                  <div className="lg:col-span-5 rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-slate-800">Recent Sensor Data</p>
                      <span className="text-[10px] font-semibold text-emerald-600 cursor-pointer">View All &gt;</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      {[
                        { id: "SENSOR_001", field: "Field 1", type: "Soil Moisture", val: "68%", time: "2 mins ago", color: "text-emerald-600 bg-emerald-50" },
                        { id: "SENSOR_002", field: "Field 1", type: "Soil Moisture", val: "42%", time: "5 mins ago", color: "text-amber-600 bg-amber-50" },
                        { id: "SENSOR_003", field: "Field 3", type: "Soil Moisture", val: "28%", time: "8 mins ago", color: "text-rose-600 bg-rose-50" },
                        { id: "SENSOR_004", field: "Field 2", type: "Temperature", val: "28°C", time: "12 mins ago", color: "text-blue-600 bg-blue-50" },
                        { id: "SENSOR_005", field: "Field 2", type: "Humidity", val: "72%", time: "15 mins ago", color: "text-blue-600 bg-blue-50" },
                      ].map((s) => (
                        <div key={s.id} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-none">
                          <div className="flex items-center gap-2">
                            <span className={`p-1.5 rounded-full ${s.color}`}>
                              <Droplet className="h-3 w-3" />
                            </span>
                            <div>
                              <p className="font-semibold text-slate-900 leading-none">{s.id} <span className="text-slate-400 font-normal">({s.field})</span></p>
                              <p className="text-[10px] text-slate-500">{s.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-900">{s.val}</p>
                            <p className="text-[9px] text-slate-400">{s.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: Fields Management (Col 1-3) | Irrigation Schedule (Col 4-6) | Crop Management (Col 7-9) | Analytics & Insights (Col 10-12) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* PANEL 3: Fields Management */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 text-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-sm">Fields Management</h3>
                <Link href="/dashboard/fields" className="flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500">
                  <Plus className="h-3 w-3" /> Add Field
                </Link>
              </div>

              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input readOnly placeholder="Search fields..." className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1 pl-8 pr-2 text-xs" />
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600">
                  All Fields ▾
                </div>
              </div>

              {/* 3 Field Cards */}
              <div className="space-y-3">
                {[
                  { id: "field-1", name: "Field 1", acres: "2.5 acres", crop: "Rice", img: "/images/field-1.jpg", status: "Healthy", moisture: "68%", badge: "bg-emerald-50 text-emerald-700 ring-emerald-200", dot: "bg-emerald-500" },
                  { id: "field-2", name: "Field 2", acres: "1.8 acres", crop: "Maize", img: "/images/field-2.jpg", status: "Needs Attention", moisture: "42%", badge: "bg-amber-50 text-amber-700 ring-amber-200", dot: "bg-amber-500" },
                  { id: "field-3", name: "Field 3", acres: "3.2 acres", crop: "Tomato", img: "/images/field-3.jpg", status: "High Priority", moisture: "28%", badge: "bg-rose-50 text-rose-700 ring-rose-200", dot: "bg-rose-500" },
                ].map((f) => (
                  <div key={f.id} className="rounded-xl border border-slate-200/80 overflow-hidden bg-white shadow-sm">
                    <div className="h-24 w-full bg-emerald-950 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={f.img} alt={f.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-slate-900 text-sm">{f.name}</p>
                        <span className="text-[11px] text-slate-500">{f.acres} · {f.crop}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${f.badge}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${f.dot}`} />
                          {f.status}
                        </span>
                        <span className="text-slate-500 font-medium text-[11px]">{f.moisture} moisture</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PANEL 4: Irrigation Schedule */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 text-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-sm">&lt; Irrigation Schedule</h3>
                <span className="text-xs text-slate-400">Automated</span>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-4">
                {[
                  { id: "today", label: "Today (15 Oct)" },
                  { id: "tomorrow", label: "Tomorrow" },
                  { id: "7days", label: "7 Days" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                      activeTab === t.id ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* 3 Schedule items */}
              <div className="space-y-3">
                {[
                  { crop: "Field 1 - Rice", time: "06:00 AM - 06:45 AM", details: "45 minutes • 12,000 L", icon: "🌾", status: "✓ Scheduled", badge: "bg-emerald-50 text-emerald-700 ring-emerald-200", iconBg: "bg-emerald-100 text-emerald-600" },
                  { crop: "Field 2 - Maize", time: "12:30 PM - 01:15 PM", details: "45 minutes • 8,500 L", icon: "🌽", status: "✓ Scheduled", badge: "bg-emerald-50 text-emerald-700 ring-emerald-200", iconBg: "bg-emerald-100 text-emerald-600" },
                  { crop: "Field 3 - Tomato", time: "04:00 PM - 04:30 PM", details: "30 minutes • 6,000 L", icon: "🍅", status: "• Pending", badge: "bg-amber-50 text-amber-700 ring-amber-200", iconBg: "bg-amber-100 text-amber-600" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base ${s.iconBg}`}>
                        {s.icon}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs">{s.crop}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{s.time}</p>
                        <p className="text-[10px] text-slate-400">{s.details}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ring-1 ${s.badge}`}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-500 transition">
              <Sparkles className="h-3.5 w-3.5" /> Optimize Schedule with AI
            </button>
          </div>

          {/* PANEL 5: Crop Management */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 text-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-sm">Crop Management</h3>
                <Link href="/dashboard/crops" className="flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500">
                  <Plus className="h-3 w-3" /> Add Crop
                </Link>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-4">
                {[
                  { id: "all", label: "All Crops" },
                  { id: "active", label: "Active" },
                  { id: "seasonal", label: "Seasonal" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setCropTab(t.id as any)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                      cropTab === t.id ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* 4 Crop Items */}
              <div className="space-y-3">
                {[
                  { name: "Rice", season: "Rabi Season", place: "Field 1 • 2.5 acres", icon: "🌾", bg: "bg-emerald-50 text-emerald-700", status: "✓ Healthy", badge: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
                  { name: "Maize", season: "Kharif Season", place: "Field 2 • 1.8 acres", icon: "🌽", bg: "bg-amber-50 text-amber-700", status: "✓ Growing", badge: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
                  { name: "Tomato", season: "Rabi Season", place: "Field 3 • 3.2 acres", icon: "🍅", bg: "bg-rose-50 text-rose-700", status: "• Needs Attention", badge: "bg-amber-50 text-amber-700 ring-amber-200" },
                  { name: "Wheat", season: "Rabi Season", place: "Field 1 • 1.2 acres", icon: "🌾", bg: "bg-amber-50 text-amber-700", status: "+ Planned", badge: "bg-sky-50 text-sky-700 ring-sky-200" },
                ].map((c) => (
                  <div key={c.name} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${c.bg}`}>
                        {c.icon}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs">{c.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{c.season}</p>
                        <p className="text-[10px] text-slate-400">{c.place}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ring-1 ${c.badge}`}>
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PANEL 6: Analytics & Insights */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 text-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900 text-sm">&lt; Analytics &amp; Insights</h3>
                <div className="flex gap-1">
                  <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[9px] font-bold text-white">7 Days</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] text-slate-600">30 Days</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] text-slate-600">3 Months</span>
                </div>
              </div>

              {/* 4 Mini Cards inside Analytics */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                {/* Water Usage */}
                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-2.5">
                  <p className="text-[10px] text-slate-500 font-medium">Water Usage</p>
                  <p className="text-base font-extrabold text-slate-900 mt-0.5">2,850 L</p>
                  <p className="text-[9px] text-emerald-600 font-semibold mb-2">↓ -18% vs last week</p>
                  <div className="h-16">
                    <BarChart values={[350, 420, 380, 450, 410, 480, 360]} labels={["M", "T", "W", "T", "F", "S", "S"]} height={40} />
                  </div>
                </div>

                {/* Crop Health */}
                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-2.5 flex flex-col justify-between">
                  <p className="text-[10px] text-slate-500 font-medium">Crop Health</p>
                  <div className="flex items-center justify-center my-1">
                    <Donut
                      parts={[
                        { value: 72, color: "#16a34a" },
                        { value: 18, color: "#f59e0b" },
                        { value: 10, color: "#ef4444" },
                      ]}
                      centerTop="Good"
                      centerBottom="72%"
                    />
                  </div>
                  <div className="text-[9px] space-y-0.5 text-slate-600 font-medium">
                    <p className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Healthy: 72%</p>
                    <p className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Attention: 18%</p>
                    <p className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Critical: 10%</p>
                  </div>
                </div>

                {/* Soil Moisture Trend */}
                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-2.5">
                  <p className="text-[10px] text-slate-500 font-medium mb-1">Soil Moisture Trend</p>
                  <div className="h-16">
                    <LineChart values={[58, 55, 62, 60, 57, 64, 61]} color="#0ea5e9" height={40} />
                  </div>
                </div>

                {/* Yield Prediction */}
                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-2.5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium">Yield Prediction</p>
                    <p className="text-lg font-extrabold text-emerald-600 mt-0.5">+24%</p>
                    <p className="text-[9px] text-slate-400">Expected increase</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <Sprout className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: Alerts (Col 1) | Voice Assistant (Col 2) | Reports (Col 3) | Swagger UI (Col 4) | Mobile PWA View (Col 5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* PANEL 7: Alerts & Notifications */}
          <div className="rounded-3xl border border-slate-200/80 bg-white overflow-hidden text-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 text-sm">🔔</span>
                  <p className="font-bold text-xs text-slate-900">Alerts &amp; Notifications</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href="/dashboard/alerts" className="text-[10px] font-semibold text-emerald-600">View All &gt;</Link>
                  <span className="text-slate-400 text-xs">✕</span>
                </div>
              </div>

              <div className="p-3.5 space-y-2.5">
                <p className="text-[10px] font-semibold text-slate-500">3 new alerts</p>
                {[
                  { title: "Field 3 - Soil Moisture Low", text: "Soil moisture is 28%. Immediate irrigation required.", icon: "!", cls: "bg-red-50 text-red-600" },
                  { title: "Field 2 - High Temperature", text: "Temperature is 34°C. Check crop stress level.", icon: "!", cls: "bg-amber-50 text-amber-600" },
                  { title: "Weather Update", text: "Rain expected in 2 days (12 mm).", icon: "🌧", cls: "bg-sky-50 text-sky-600" },
                  { title: "Irrigation Completed", text: "Field 1 irrigation completed successfully.", icon: "✓", cls: "bg-emerald-50 text-emerald-600" },
                  { title: "New Sensor Data", text: "SENSOR_004 is online.", icon: "📶", cls: "bg-slate-100 text-slate-600" },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-slate-50/60 p-2">
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${a.cls}`}>
                      {a.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-[11px] text-slate-900 truncate">{a.title}</p>
                      <p className="text-[9px] text-slate-500 leading-tight">{a.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PANEL 8: Multi-Language & Voice Assistant */}
          <div className="rounded-3xl border border-slate-200/80 bg-white overflow-hidden text-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 text-sm">🎙</span>
                  <p className="font-bold text-xs text-slate-900 truncate">Multi-Language &amp; Voice</p>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                  <span>─</span><span>◻</span><span>✕</span>
                </div>
              </div>

              <div className="p-3.5 space-y-3">
                {/* Pills */}
                <div className="flex justify-center">
                  <div className="inline-flex rounded-full bg-slate-100 p-0.5 text-[10px]">
                    <span className="px-3 py-1 text-slate-600 cursor-pointer">Text</span>
                    <span className="px-3 py-1 bg-emerald-700 text-white font-bold rounded-full">Voice</span>
                    <span className="px-3 py-1 text-slate-600 cursor-pointer">Language</span>
                  </div>
                </div>

                {/* Language row */}
                <div className="flex justify-center gap-2 text-[10px]">
                  <span className="rounded-full border border-slate-200 px-2.5 py-0.5 text-slate-600">English</span>
                  <span className="rounded-full border-2 border-emerald-600 bg-emerald-50 px-2.5 py-0.5 font-bold text-emerald-700">हिंदी</span>
                  <span className="rounded-full border border-slate-200 px-2.5 py-0.5 text-slate-600">ಕನ್ನಡ</span>
                </div>

                {/* Voice Visualizer */}
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5">
                      <span className="h-2 w-0.5 bg-emerald-400 animate-pulse" />
                      <span className="h-4 w-0.5 bg-emerald-500 animate-pulse delay-75" />
                      <span className="h-6 w-0.5 bg-emerald-600 animate-pulse delay-150" />
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-white shadow-md">
                      <Mic className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-0.5">
                      <span className="h-6 w-0.5 bg-emerald-600 animate-pulse delay-150" />
                      <span className="h-4 w-0.5 bg-emerald-500 animate-pulse delay-75" />
                      <span className="h-2 w-0.5 bg-emerald-400 animate-pulse" />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium mt-1">Listening...</p>
                </div>

                {/* Chat Dialog */}
                <div className="space-y-2 text-[10px]">
                  <div className="flex justify-end">
                    <div className="rounded-xl rounded-tr-none bg-slate-100 p-2 text-slate-800 max-w-[85%] font-medium">
                      आज खेत 2 में कितनी सिंचाई करनी है?
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs">👨‍🌾</span>
                    <div className="rounded-xl rounded-tl-none bg-sky-50 p-2 text-slate-800 leading-tight border border-sky-100">
                      खेत 2 में आज 45 मिनट के लिए 12,000 लीटर पानी की आवश्यकता है।
                    </div>
                  </div>
                </div>

                <p className="text-center text-[9px] text-slate-400 pt-1">
                  Powered by <span className="font-semibold text-slate-600">Sarvam AI</span>
                </p>
              </div>
            </div>
          </div>

          {/* PANEL 9: Reports & Downloads */}
          <div className="rounded-3xl border border-slate-200/80 bg-white overflow-hidden text-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 text-sm">📄</span>
                  <p className="font-bold text-xs text-slate-900">Reports &amp; Downloads</p>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                  <span>─</span><span>◻</span><span>✕</span>
                </div>
              </div>

              <div className="p-3.5 space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] text-slate-700">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="h-3 w-3 text-slate-400" />
                    01 Oct 2026 - 15 Oct 2026
                  </span>
                  <span>▾</span>
                </div>

                <div className="space-y-2">
                  {[
                    { title: "Irrigation Report", color: "bg-sky-50 text-sky-600" },
                    { title: "Crop Health Report", color: "bg-emerald-50 text-emerald-600" },
                    { title: "Water Usage Report", color: "bg-cyan-50 text-cyan-600" },
                    { title: "Field Summary", color: "bg-amber-50 text-amber-600" },
                  ].map((r, i) => (
                    <Link
                      key={i}
                      href="/dashboard/reports"
                      className="flex items-center justify-between rounded-lg border border-slate-100 bg-white p-2.5 shadow-sm hover:border-emerald-200 hover:bg-emerald-50/20 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs ${r.color}`}>
                          📄
                        </div>
                        <div>
                          <p className="font-bold text-[11px] text-slate-900 leading-none">{r.title}</p>
                          <p className="text-[9px] font-semibold text-slate-400 mt-0.5">Download PDF &gt;</p>
                        </div>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 10: Swagger UI (API Documentation) */}
          <div className="rounded-3xl border border-slate-200/80 bg-white overflow-hidden text-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-mono text-xs font-bold">&lt;/&gt;</span>
                  <p className="font-bold text-xs text-slate-900 truncate">Swagger UI (API Docs)</p>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                  <span>─</span><span>◻</span><span>✕</span>
                </div>
              </div>

              {/* Swagger Green Top Bar */}
              <div className="bg-[#143924] px-3 py-1.5 text-white flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-emerald-300">&#123;&#125; Swagger</span>
                <span className="text-[9px] text-emerald-200/80">API Documentation</span>
              </div>

              <div className="p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-extrabold text-xs text-slate-900 leading-tight">Smart Irrigation API <span className="text-[9px] font-normal text-slate-500">1.0.0</span></p>
                    <p className="font-mono text-[9px] text-slate-400">Base URL: /api/v1</p>
                  </div>
                  <span className="flex items-center gap-1 rounded bg-emerald-600 px-2 py-0.5 text-[9px] font-bold text-white shadow-sm">
                    <Lock className="h-2.5 w-2.5" /> Authorize
                  </span>
                </div>

                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-center">
                  <p className="text-[10px] font-bold text-slate-700">No Endpoints Registered</p>
                  <p className="text-[8px] text-slate-400 mt-0.5">Left open for team backend integration</p>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 11: Mobile-First PWA View & Language Selection */}
          <div className="rounded-3xl border border-emerald-800/40 bg-gradient-to-b from-[#072417] to-[#04150d] p-4 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Background farmer photo preview */}
            <div className="absolute right-0 bottom-0 w-32 h-44 opacity-25 pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/farmer.jpg" alt="Farmer with mobile" className="w-full h-full object-cover object-top" />
            </div>

            <div>
              <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2">Mobile PWA</p>
              
              {/* Smartphone Frame */}
              <div className="mx-auto w-48 rounded-2xl border-2 border-slate-700 bg-slate-900 p-2 shadow-2xl relative">
                {/* Status Bar */}
                <div className="flex justify-between items-center text-[8px] text-slate-400 mb-1 px-1">
                  <span>9:41</span>
                  <span>📶 100%</span>
                </div>

                {/* App Screen Header */}
                <div className="bg-emerald-800 rounded-lg p-2 text-white text-[10px] mb-2">
                  <p className="font-bold flex items-center gap-1"><Leaf className="h-3 w-3" /> GreenFlow</p>
                  <p className="text-[9px] mt-1 font-semibold text-emerald-100">ನಮಸ್ಕಾರ, ಶಿಲ್ಪಾಶ್ರೀ! 🌾</p>
                  <div className="mt-1 flex justify-between text-[8px] text-emerald-200">
                    <span>28°C Bengaluru</span>
                    <span>2,850 L Saved</span>
                  </div>
                </div>

                {/* 2x2 Kannada Action Tiles */}
                <div className="grid grid-cols-2 gap-1.5 text-[8px] font-medium text-slate-200 mb-2">
                  <div className="rounded bg-emerald-950/80 border border-emerald-800/80 p-1.5 text-center">
                    <span className="block text-xs">🗺</span> ನನ್ನ ಹೊಲ
                  </div>
                  <div className="rounded bg-emerald-950/80 border border-emerald-800/80 p-1.5 text-center">
                    <span className="block text-xs">💧</span> ವೇಳಾಪಟ್ಟಿ
                  </div>
                  <div className="rounded bg-emerald-950/80 border border-emerald-800/80 p-1.5 text-center">
                    <span className="block text-xs">☀️</span> ಹವಾಮಾನ
                  </div>
                  <div className="rounded bg-emerald-950/80 border border-emerald-800/80 p-1.5 text-center">
                    <span className="block text-xs">📊</span> ವರದಿ
                  </div>
                </div>

                {/* Language Popover Overlay inside phone */}
                <div className="rounded-lg bg-white text-slate-900 p-2 text-[8px] shadow-lg border border-slate-200">
                  <p className="font-bold text-[9px] mb-1">Select Language</p>
                  <p className="text-slate-600 py-0.5">English</p>
                  <p className="text-emerald-700 font-bold bg-emerald-50 rounded px-1 py-0.5 flex justify-between">
                    <span>हिंदी</span> <span>✓</span>
                  </p>
                  <p className="text-slate-600 py-0.5">ಕನ್ನಡ</p>
                </div>
              </div>
            </div>

            <div className="mt-3 text-center">
              <p className="text-[10px] font-bold text-emerald-300">ದೊಡ್ಡ ಬದಲಾವಣೆ, ಹಸಿರು ಭವಿಷ್ಯ</p>
              <p className="text-[9px] text-emerald-400/70">Empowering Farmers with AI</p>
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER SHOWCASE BAR */}
        <div className="rounded-2xl border border-emerald-900/60 bg-[#072417] px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <Leaf className="h-5 w-5 text-emerald-400" />
            <span className="font-bold text-white text-sm">GreenFlow</span>
          </div>

          <div className="flex items-center gap-6 text-emerald-200/80 font-medium">
            <span>Smart Irrigation</span>
            <span className="text-emerald-700">•</span>
            <span>Healthy Crops</span>
            <span className="text-emerald-700">•</span>
            <span>Sustainable Future</span>
          </div>

          <div className="text-emerald-400 font-semibold">
            Empowering Farmers with AI
          </div>
        </div>
      </div>
    </div>
  );
}
