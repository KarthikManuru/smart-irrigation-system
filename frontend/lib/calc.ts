// Display-side helpers. The REAL calculations belong to the optimizer (Member 3).
// Formula from the WBS: Volume (litres) = Depth (mm) x Area (acres) x 4,046.856
export const LITRES_PER_MM_PER_ACRE = 4046.856;

/** Gross volume = net volume / application efficiency */
export function grossLitres(depthMm: number, acres: number, efficiency: number) {
  return Math.round((depthMm * acres * LITRES_PER_MM_PER_ACRE) / efficiency);
}

/** Duration (minutes) = Volume (litres) / Flow rate (litres per minute) */
export function minutesFor(litres: number, flowLpm: number) {
  return Math.round(litres / flowLpm);
}

export const fmtLitres = (n: number) => `${n.toLocaleString("en-IN")} L`;

export function fmtTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ap}`;
}
