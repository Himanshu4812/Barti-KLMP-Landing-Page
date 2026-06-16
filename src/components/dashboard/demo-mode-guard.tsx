"use client";

import { useEffect } from "react";
import { useAuthStore, isSupabaseConfigured } from "@/lib/stores/auth-store";

export function DemoModeGuard() {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);
  const setDemoUser = useAuthStore((s) => s.setDemoUser);

  useEffect(() => {
    if (isLoading && !isSupabaseConfigured() && !user) {
      setDemoUser();
    }
  }, [isLoading, user, setDemoUser]);

  return null;
}
