"use client";

import { useState } from "react";
import { Lock, ChevronDown, ChevronRight, Play, ExternalLink } from "lucide-react";
import { API_BASE } from "@/lib/api";
import { useT } from "@/components/dashboard/useT";

interface Endpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  summary: string;
  desc?: string;
  response?: string;
}

const endpoints: Endpoint[] = [];

const methodStyle = {
  GET: { badge: "bg-[#0ea5e9] text-white", border: "border-sky-200 bg-sky-50/30" },
  POST: { badge: "bg-[#22c55e] text-white", border: "border-emerald-200 bg-emerald-50/30" },
  PUT: { badge: "bg-[#f59e0b] text-white", border: "border-amber-200 bg-amber-50/30" },
  DELETE: { badge: "bg-[#ef4444] text-white", border: "border-rose-200 bg-rose-50/30" },
};

export default function SwaggerPage() {
  const t = useT();
  const [active, setActive] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState(false);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {/* Window header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <span className="font-mono text-sm font-bold">&lt;/&gt;</span>
            </div>
            <h1 className="font-bold text-slate-900 text-base">{t("Swagger UI (API Documentation)")}</h1>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="text-xs cursor-pointer hover:text-slate-600">─</span>
            <span className="text-xs cursor-pointer hover:text-slate-600">◻</span>
            <span className="text-xs cursor-pointer hover:text-slate-600">✕</span>
          </div>
        </div>

        {/* Swagger Green Brand Banner */}
        <div className="flex items-center justify-between bg-[#143924] px-6 py-3.5 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500 font-mono text-xs font-black text-black">
              { }
            </div>
            <span className="font-bold tracking-tight text-sm">swagger</span>
            <span className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-200">
              {t("API Documentation")}
            </span>
          </div>
          <a
            href={`${API_BASE}/docs`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white"
          >
            {t("Live FastAPI Docs")} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="p-6 space-y-6">
          {/* API Header & Authorize */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-extrabold text-slate-900">{t("Smart Irrigation API")}</h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                  1.0.0
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-slate-500">
                {t("Base URL:")} <code className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-700">/api/v1</code>
              </p>
            </div>

            <button
              onClick={() => setAuthorized(!authorized)}
              className={`flex items-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-bold transition shadow-sm ${
                authorized
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-emerald-600 text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              <Lock className="h-3.5 w-3.5" />
              {authorized ? t("Authorized ✓") : t("Authorize")}
            </button>
          </div>

          {/* Endpoints / Integration Section */}
          {endpoints.length > 0 ? (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-800">{t("Endpoints")}</h3>
              </div>
              <div className="space-y-2.5">
                {endpoints.map((ep) => {
                  const isOpen = active === ep.path + ep.method;
                  const m = methodStyle[ep.method];
                  return (
                    <div
                      key={ep.path + ep.method}
                      className={`overflow-hidden rounded-xl border transition ${m.border}`}
                    >
                      <div
                        onClick={() => setActive(isOpen ? null : ep.path + ep.method)}
                        className="flex cursor-pointer items-center justify-between p-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`rounded-md px-2.5 py-1 font-mono text-xs font-bold ${m.badge}`}>
                            {ep.method}
                          </span>
                          <span className="font-mono text-xs font-semibold text-slate-800">{ep.path}</span>
                          <span className="text-xs text-slate-500 hidden sm:inline">• {ep.summary}</span>
                        </div>
                        <div className="text-slate-400">
                          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </div>
                      </div>

                      {isOpen && (
                        <div className="border-t border-slate-200/60 bg-white p-4 space-y-3">
                          <p className="text-xs text-slate-600 leading-relaxed">{ep.desc}</p>
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-xs font-bold text-slate-700">Responses (200 OK)</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                alert(`Simulated 200 OK response from ${ep.path}`);
                              }}
                              className="flex items-center gap-1 rounded bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-200"
                            >
                              <Play className="h-3 w-3" /> Try it out
                            </button>
                          </div>
                          <pre className="max-h-48 overflow-y-auto rounded-lg bg-slate-900 p-3 font-mono text-[11px] text-emerald-400">
                            {ep.response}
                          </pre>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-3">
                <ExternalLink className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">{t("No Endpoints Registered")}</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                {t("Mock fields endpoints have been removed and left open for team members to integrate their backend services.")}
              </p>
              <div className="mt-5">
                <a
                  href={`${API_BASE}/docs`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-500 transition"
                >
                  {t("Open Live FastAPI Docs")} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
