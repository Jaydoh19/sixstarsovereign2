"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="border border-white/20 px-5 py-3 text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
    >
      Logout
    </button>
  );
}