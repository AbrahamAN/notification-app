import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  signIn: (token: string, user: User) => void;
  signOut: () => void;
  setHasHydrated: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hasHydrated: false,
      signIn: (token, user) => set({ token, user, isAuthenticated: true }),
      signOut: () => set({ token: null, user: null, isAuthenticated: false }),
      setHasHydrated: (val) => set({ hasHydrated: val })
    }),
    {
      name: "auth"
    }
  )
);
