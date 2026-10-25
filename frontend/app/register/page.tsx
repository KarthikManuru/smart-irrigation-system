"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import AuthShell, { authInput } from "@/components/AuthShell";
import { useT } from "@/components/dashboard/useT";
import { register } from "@/lib/auth";

export default function RegisterPage() {
  const t = useT();
  const router = useRouter();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (password.length < 6) return setError(t("passwordShort"));
    if (password !== confirm) return setError(t("passwordMismatch"));
    register(name.trim(), contact.trim()); // MOCK register. Connect the real sign-up API here later.
    router.push("/dashboard");
  }

  return (
    <AuthShell title={t("createAccount")} subtitle={t("registerSub")}>
      <form onSubmit={submit} className="space-y-4">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={t("fullName")} autoComplete="name" className={authInput} />
        <input required value={contact} onChange={(e) => setContact(e.target.value)} placeholder={t("phoneOrEmail")} autoComplete="username" className={authInput} />
        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("password")} autoComplete="new-password" className={authInput} />
        <input required type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder={t("confirmPassword")} autoComplete="new-password" className={authInput} />
        {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
        <button type="submit" className="w-full rounded-lg bg-gf-500 px-6 py-3 font-semibold transition hover:bg-gf-400">
          {t("createAccount")}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-white/70">
        {t("haveAccount")}{" "}
        <Link href="/login" className="font-semibold text-gf-300 hover:underline">{t("loginBtn")}</Link>
      </p>
    </AuthShell>
  );
}
