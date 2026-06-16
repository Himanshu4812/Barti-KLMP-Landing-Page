"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/lib/stores/sidebar-store";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ArrowLeftRight,
  CalendarCheck,
  DoorOpen,
  BarChart4,
  Archive,
  Settings,
  Shield,
  X,
  BookMarked,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["super_admin", "library_manager", "librarian"] },
  { href: "/dashboard/books", label: "Books", icon: BookOpen, roles: ["super_admin", "library_manager", "librarian"] },
  { href: "/dashboard/members", label: "Members", icon: Users, roles: ["super_admin", "library_manager", "librarian"] },
  { href: "/dashboard/issues", label: "Issue & Return", icon: ArrowLeftRight, roles: ["super_admin", "library_manager", "librarian"] },
  { href: "/dashboard/reservations", label: "Reservations", icon: CalendarCheck, roles: ["super_admin", "library_manager", "librarian"] },
  { href: "/dashboard/visitors", label: "Visitors", icon: DoorOpen, roles: ["super_admin", "library_manager", "librarian"] },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart4, roles: ["super_admin", "library_manager"] },
  { href: "/dashboard/repository", label: "Repository", icon: Archive, roles: ["super_admin", "library_manager", "librarian"] },
  { href: "/dashboard/ai", label: "AI Knowledge", icon: BookMarked, roles: ["super_admin", "library_manager", "librarian"] },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, roles: ["super_admin"] },
  { href: "/dashboard/users", label: "Users", icon: Shield, roles: ["super_admin"] },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, isMobileOpen, setMobileOpen, setActiveItem } = useSidebarStore();

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-navy text-white z-50 flex flex-col transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className={cn("flex items-center h-16 px-4 border-b border-white/10", isCollapsed && "justify-center")}>
          {!isCollapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-gold" />
              </div>
              <span className="font-heading font-bold text-sm">KLMP</span>
            </Link>
          )}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden ml-auto text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setActiveItem(item.label)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                      isActive
                        ? "bg-gold/15 text-gold font-medium"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={cn("p-4 border-t border-white/10", isCollapsed && "text-center")}>
          {!isCollapsed && (
            <p className="text-xs text-white/40">BARTI KLMP v1.0</p>
          )}
        </div>
      </aside>
    </>
  );
}
