"use client";

import { useEffect, useState } from "react";

// Set these in frontend/.env.local (see .env.local.example)
export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const USE_API = process.env.NEXT_PUBLIC_USE_API === "true";

/**
 * Returns mock data first. When NEXT_PUBLIC_USE_API=true it also tries the real
 * endpoint and switches to the real data if the call works.
 */
export function useApi<T>(path: string, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [source, setSource] = useState<"mock" | "api">("mock");

  useEffect(() => {
    if (!USE_API) return;
    let cancelled = false;
    fetch(`${API_BASE}${path}`)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((json: T) => {
        if (!cancelled) {
          setData(json);
          setSource("api");
        }
      })
      .catch(() => {
        /* keep the mock data */
      });
    return () => {
      cancelled = true;
    };
  }, [path]);

  return { data, source };
}
