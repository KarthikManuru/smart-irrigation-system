"use client";

import { useEffect } from "react";

// Registers the service worker only in the production build,
// so it never causes stale pages while you develop with `npm run dev`.
export default function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}
