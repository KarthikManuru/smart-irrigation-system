"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import AuthShell, { authInput } from "@/components/AuthShell";
import { useT } from "@/components/dashboard/useT";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const t = useT();
  const router = useRouter();
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!contact.trim() || !password) return;
    login(contact.trim()); // MOCK login. Connect the real login API here later.
    router.push("/dashboard");
  }

  return (
    <AuthShell title={t("welcomeBack")} subtitle={t("loginSub")}>
      <form onSubmit={submit} className="space-y-4">
        <input required value={contact} onChange={(e) => setContact(e.target.value)}
          placeholder={t("phoneOrEmail")} autoComplete="username" className={authInput} />
        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder={t("password")} autoComplete="current-password" className={authInput} />
        <button type="submit" className="w-full rounded-lg bg-gf-500 px-6 py-3 font-semibold transition hover:bg-gf-400">
          {t("loginBtn")}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-white/70">
        {t("noAccount")}{" "}
        <Link href="/register" className="font-semibold text-gf-300 hover:underline">{t("createAccount")}</Link>
      </p>
    </AuthShell>
  );
}
