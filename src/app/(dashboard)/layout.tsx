import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNavbar } from "@/components/dashboard/top-navbar";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";
import { DemoModeGuard } from "@/components/dashboard/demo-mode-guard";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DemoModeGuard />
      <Sidebar />
      <div className="lg:pl-64 transition-all duration-300">
        <TopNavbar />
        <main className="p-4 lg:p-8">
          <Breadcrumbs />
          {children}
        </main>
      </div>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
