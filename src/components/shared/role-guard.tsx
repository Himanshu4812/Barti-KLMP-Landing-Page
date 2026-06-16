"use client";

import { useAuthStore } from "@/lib/stores/auth-store";
import type { Role } from "@/lib/types";

interface RoleGuardProps {
  allowedRoles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children, fallback }: RoleGuardProps) {
  const user = useAuthStore((s) => s.user);

  if (!user) return null;

  const userRole = user.role as Role;

  if (allowedRoles.includes(userRole)) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
      <p className="text-sm text-gray-500">You do not have permission to access this area.</p>
    </div>
  );
}
