import { create } from "zustand";
import type { Profile } from "@/lib/types";

const DEMO_USER: Profile = {
  id: "demo-001",
  email: "admin@barti.in",
  full_name: "Demo Admin",
  avatar_url: null,
  role_id: "role-super-admin",
  role: "super_admin",
  phone: "+91-9876543210",
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

interface AuthState {
  user: Profile | null;
  isLoading: boolean;
  isDemoMode: boolean;
  setUser: (user: Profile | null) => void;
  setDemoUser: () => void;
  clear: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isDemoMode: false,
  setUser: (user) => set({ user, isLoading: false, isDemoMode: false }),
  setDemoUser: () => set({ user: DEMO_USER, isLoading: false, isDemoMode: true }),
  clear: () => set({ user: null, isLoading: false, isDemoMode: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
