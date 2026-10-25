// Small SVG charts (no extra libraries needed)

export function BarChart({ values, labels, height = 140 }: { values: number[]; labels: string[]; height?: number }) {
  const W = 320, pad = 16;
  const max = Math.max(...values) * 1.15;
  const bw = (W - pad * 2) / values.length;
  return (
    <svg viewBox={`0 0 ${W} ${height + 24}`} className="w-full" role="img" aria-label="Bar chart">
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <line key={g} x1={pad} x2={W - pad} y1={height - height * g} y2={height - height * g} stroke="#e2e8f0" strokeWidth="1" />
      ))}
      {values.map((v, i) => {
        const h = (v / max) * height;
        const x = pad + i * bw + bw * 0.2;
        return (
          <g key={i}>
            <rect x={x} y={height - h} width={bw * 0.6} height={h} rx="3" fill="#22a05a" />
            <text x={x + bw * 0.3} y={height + 15} textAnchor="middle" fontSize="9" fill="#64748b">{labels[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function Donut({
  parts, centerTop, centerBottom,
}: { parts: { value: number; color: string }[]; centerTop: string; centerBottom: string }) {
  const r = 42, c = 2 * Math.PI * r;
  const total = parts.reduce((s, p) => s + p.value, 0);
  let offset = 0;
  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" role="img" aria-label="Donut chart">
        {parts.map((p, i) => {
          const len = (c * p.value) / total;
          const el = (
            <circle key={i} cx="60" cy="60" r={r} fill="none" stroke={p.color} strokeWidth="14"
              strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-offset} />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-semibold text-slate-600">{centerTop}</span>
        <span className="text-2xl font-extrabold text-slate-900">{centerBottom}</span>
      </div>
    </div>
  );
}

export function LineChart({
  values, labels, color = "#22a05a", height = 120,
}: { values: number[]; labels?: string[]; color?: string; height?: number }) {
  const W = 320, pad = 16;
  const min = Math.min(...values) - 5, max = Math.max(...values) + 5;
  const pts = values.map((v, i) => [pad + (i * (W - pad * 2)) / (values.length - 1), height - ((v - min) / (max - min)) * height]);
  const line = pts.map((p) => p.join(",")).join(" ");
  const step = Math.ceil(values.length / 6);
  return (
    <svg viewBox={`0 0 ${W} ${height + 22}`} className="w-full" role="img" aria-label="Line chart">
      <polygon points={`${pad},${height} ${line} ${W - pad},${height}`} fill={color} opacity="0.12" />
      <polyline points={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2.5" fill={color} />)}
      {labels && pts.map((p, i) => i % step === 0 && (
        <text key={i} x={p[0]} y={height + 16} textAnchor="middle" fontSize="9" fill="#64748b">{labels[i]}</text>
      ))}
    </svg>
  );
}

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** 24-hour bar with the watering windows highlighted */
export function DayTimeline({ windows }: { windows: { start: string; end: string }[] }) {
  return (
    <div>
      <div className="relative h-10 overflow-hidden rounded-lg bg-slate-100">
        {[6, 12, 18].map((h) => (
          <div key={h} className="absolute inset-y-0 w-px bg-slate-300" style={{ left: `${(h / 24) * 100}%` }} />
        ))}
        {windows.map((w, i) => {
          const s = toMin(w.start);
          const e0 = toMin(w.end);
          const e = e0 < s ? 1440 : e0;
          return (
            <div key={i} className="absolute inset-y-1 rounded bg-sky-500"
              style={{ left: `${(s / 1440) * 100}%`, width: `${Math.max(((e - s) / 1440) * 100, 0.8)}%` }}
              title={`${w.start} - ${w.end}`} />
          );
        })}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-slate-500">
        <span>12 AM</span><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>12 AM</span>
      </div>
    </div>
  );
}

/** Temperature line + rain-chance bars for 24 hours */
export function HourlyForecast({ temps, rain }: { temps: number[]; rain: number[] }) {
  const W = 360, H = 120, pad = 14;
  const min = Math.min(...temps) - 3, max = Math.max(...temps) + 3;
  const x = (i: number) => pad + (i * (W - pad * 2)) / 23;
  const y = (t: number) => H - ((t - min) / (max - min)) * H;
  const line = temps.map((t, i) => `${x(i)},${y(t)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H + 22}`} className="w-full" role="img" aria-label="Hourly forecast">
      {rain.map((r, i) => (
        <rect key={i} x={x(i) - 4} y={H - (r / 100) * H} width="8" height={(r / 100) * H} rx="2" fill="#38bdf8" opacity="0.45" />
      ))}
      <polyline points={line} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />
      {[0, 6, 12, 18, 23].map((h) => (
        <text key={h} x={x(h)} y={H + 16} textAnchor="middle" fontSize="9" fill="#64748b">{h}:00</text>
      ))}
    </svg>
  );
}
