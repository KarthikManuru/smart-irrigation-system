import type { FieldStatus } from "@/lib/mock";
import type { Tone } from "./ui";
import type { useT } from "./useT";

export function statusInfo(s: FieldStatus, t: ReturnType<typeof useT>): { label: string; tone: Tone } {
  if (s === "healthy") return { label: t("healthy"), tone: "green" };
  if (s === "attention") return { label: t("attention"), tone: "amber" };
  return { label: t("highPriority"), tone: "red" };
}
