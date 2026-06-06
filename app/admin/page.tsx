import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminDashboardClient from "@/components/admin-dashboard-client";
import AdminLogoutButton from "@/components/admin-logout-button";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <section className="mx-auto w-full max-w-6xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold uppercase md:text-6xl">
            Admin Dashboard
          </h1>
          <p className="mt-4 text-zinc-400">Logged in as {session.email}</p>

          <p className="mt-12 text-nmd text-zinc-500">
            Only fill out one form at a time.
          </p>
        </div>
        <AdminLogoutButton />
        <AdminDashboardClient />
      </section>
    </main>
  );
}