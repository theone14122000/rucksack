import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { ToastProvider } from "@/components/admin/ui";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const authenticated = await verifyAdminSession();
  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <AdminShell>
      <ToastProvider>{children}</ToastProvider>
    </AdminShell>
  );
}
