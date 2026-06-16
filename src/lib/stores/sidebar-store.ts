import { create } from "zustand";

interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  activeItem: string;
  toggleCollapsed: () => void;
  setMobileOpen: (open: boolean) => void;
  setActiveItem: (item: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: false,
  isMobileOpen: false,
  activeItem: "dashboard",
  toggleCollapsed: () => set((s) => ({ isCollapsed: !s.isCollapsed })),
  setMobileOpen: (isMobileOpen) => set({ isMobileOpen }),
  setActiveItem: (activeItem) => set({ activeItem, isMobileOpen: false }),
}));
