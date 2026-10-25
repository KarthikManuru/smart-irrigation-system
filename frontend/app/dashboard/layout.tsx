"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { getUser, type User } from "@/lib/auth";

function DashboardLayoutContent({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u) router.replace("/login");
    else setUser(u);
  }, [router]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!user) return <div className="min-h-screen bg-gf-950" />;

  return (
    <div className="min-h-screen bg-[#f3f7f4] text-slate-800 lg:pl-64">
      <Sidebar open={open} onClose={() => setOpen(false)} user={user} />
      <Topbar onMenu={() => setOpen(true)} user={user} />
      <main className="p-4 sm:p-6">{children}</main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f3f7f4]" />}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Suspense>
  );
}
