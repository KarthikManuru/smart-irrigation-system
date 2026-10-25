"use client";

import { useState } from "react";
import { Plus, Minus, Layers } from "lucide-react";
import { useT } from "./useT";

export default function FieldMap() {
  const t = useT();
  const [zoom, setZoom] = useState(1);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#081f14]">
      {/* Aerial agricultural satellite illustration background */}
      <svg
        viewBox="0 0 700 350"
        className="h-full w-full select-none transition-transform duration-300"
        style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
        role="img"
        aria-label={t("fieldOverview")}
      >
        <defs>
          {/* Satellite terrain textures */}
          <linearGradient id="satBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#143924" />
            <stop offset="35%" stopColor="#1d4d31" />
            <stop offset="70%" stopColor="#173e27" />
            <stop offset="100%" stopColor="#0f2b1b" />
          </linearGradient>

          <pattern id="cropRows" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#2a6642" strokeWidth="1.2" opacity="0.6" />
          </pattern>

          <pattern id="cropRowsDense" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-40)">
            <line x1="0" y1="0" x2="0" y2="5" stroke="#33784f" strokeWidth="0.9" opacity="0.5" />
          </pattern>

          <pattern id="soilTexture" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
            <line x1="0" y1="0" x2="0" y2="12" stroke="#5a4225" strokeWidth="1.5" opacity="0.4" />
          </pattern>

          <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#22c55e" floodOpacity="0.6" />
          </filter>
          <filter id="glowYellow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#eab308" floodOpacity="0.6" />
          </filter>
          <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ef4444" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Base satellite terrain */}
        <rect width="700" height="350" fill="url(#satBg)" />

        {/* Patchwork agricultural field parcels */}
        <polygon points="10,10 210,0 240,110 30,120" fill="#1b462c" />
        <polygon points="10,10 210,0 240,110 30,120" fill="url(#cropRows)" />

        <polygon points="250,5 420,15 400,100 245,90" fill="#205336" />
        <polygon points="250,5 420,15 400,100 245,90" fill="url(#cropRowsDense)" />

        <polygon points="430,10 680,5 690,140 450,110" fill="#1c472d" />
        <polygon points="430,10 680,5 690,140 450,110" fill="url(#cropRows)" />

        <polygon points="460,120 690,150 670,330 480,310" fill="#2d3d24" />
        <polygon points="460,120 690,150 670,330 480,310" fill="url(#soilTexture)" />

        <polygon points="20,135 250,125 240,320 10,310" fill="#1d4a30" />
        <polygon points="20,135 250,125 240,320 10,310" fill="url(#cropRowsDense)" />

        {/* Farm access roads / canals */}
        <path d="M0,125 Q260,115 450,110 T700,145" fill="none" stroke="#3d2c18" strokeWidth="5" opacity="0.6" />
        <path d="M0,125 Q260,115 450,110 T700,145" fill="none" stroke="#6b5336" strokeWidth="2" opacity="0.8" />
        <path d="M245,0 L245,350" fill="none" stroke="#523f27" strokeWidth="2.5" opacity="0.7" />
        <path d="M450,0 Q460,180 475,350" fill="none" stroke="#25506a" strokeWidth="3" opacity="0.75" />

        {/* Field 1: Green glowing polygon (Healthy) */}
        <polygon
          points="60,65 220,50 210,210 50,225"
          fill="#22c55e"
          fillOpacity="0.28"
          stroke="#22c55e"
          strokeWidth="2.5"
          filter="url(#glowGreen)"
        />

        {/* Field 2: Yellow glowing polygon (Needs Attention) */}
        <polygon
          points="255,45 435,55 425,200 255,190"
          fill="#eab308"
          fillOpacity="0.25"
          stroke="#eab308"
          strokeWidth="2.5"
          filter="url(#glowYellow)"
        />

        {/* Field 3: Red glowing polygon (High Priority) */}
        <polygon
          points="265,205 440,215 430,335 260,325"
          fill="#ef4444"
          fillOpacity="0.28"
          stroke="#ef4444"
          strokeWidth="2.5"
          filter="url(#glowRed)"
        />

        {/* Tag for Field 1 */}
        <g transform="translate(68, 115)">
          <rect width="155" height="54" rx="8" fill="#04180f" fillOpacity="0.94" stroke="#22c55e" strokeWidth="1.5" />
          <text x="14" y="19" fontSize="12" fontWeight="700" fill="#ffffff">{t("Field 1")}</text>
          <text x="14" y="33" fontSize="10" fill="#cbd5e1" fontWeight="500">{t("Soil Moisture")}: 68%</text>
          <circle cx="18" cy="44" r="3.5" fill="#22c55e" />
          <text x="26" y="47" fontSize="10" fill="#86efac" fontWeight="600">{t("healthy")}</text>
        </g>

        {/* Tag for Field 2 */}
        <g transform="translate(262, 100)">
          <rect width="165" height="54" rx="8" fill="#04180f" fillOpacity="0.94" stroke="#eab308" strokeWidth="1.5" />
          <text x="14" y="19" fontSize="12" fontWeight="700" fill="#ffffff">{t("Field 2")}</text>
          <text x="14" y="33" fontSize="10" fill="#cbd5e1" fontWeight="500">{t("Soil Moisture")}: 42%</text>
          <circle cx="18" cy="44" r="3.5" fill="#eab308" />
          <text x="26" y="47" fontSize="10" fill="#fde047" fontWeight="600">{t("attention")}</text>
        </g>

        {/* Tag for Field 3 */}
        <g transform="translate(270, 245)">
          <rect width="165" height="54" rx="8" fill="#04180f" fillOpacity="0.94" stroke="#ef4444" strokeWidth="1.5" />
          <text x="14" y="19" fontSize="12" fontWeight="700" fill="#ffffff">{t("Field 3")}</text>
          <text x="14" y="33" fontSize="10" fill="#cbd5e1" fontWeight="500">{t("Soil Moisture")}: 28%</text>
          <circle cx="18" cy="44" r="3.5" fill="#ef4444" />
          <text x="26" y="47" fontSize="10" fill="#fca5a5" fontWeight="600">{t("highPriority")}</text>
        </g>
      </svg>

      {/* Map Zoom & Layer controls (Top-Right overlay) */}
      <div className="absolute right-3 top-3 flex flex-col gap-1.5 rounded-lg bg-black/60 p-1 backdrop-blur-md">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.15, 1.45))}
          aria-label="Zoom in"
          className="flex h-7 w-7 items-center justify-center rounded text-white/90 hover:bg-white/20"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.15, 0.9))}
          aria-label="Zoom out"
          className="flex h-7 w-7 items-center justify-center rounded text-white/90 hover:bg-white/20"
        >
          <Minus className="h-4 w-4" />
        </button>
        <div className="my-0.5 h-px bg-white/20" />
        <button
          onClick={() => setZoom(1)}
          aria-label="Reset layers"
          className="flex h-7 w-7 items-center justify-center rounded text-white/90 hover:bg-white/20"
        >
          <Layers className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
