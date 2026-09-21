import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setAuth: (user: User, token: string) => void;
  updateProfile: (profile: Partial<User["profile"]>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setUser: (user: User) =>
        set({ user, isAuthenticated: true }),

      setToken: (token: string) => {
        set({ accessToken: token });
        // Sync with localStorage for axios interceptor
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", token);
        }
      },

      setAuth: (user: User, token: string) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", token);
        }
        set({ user, accessToken: token, isAuthenticated: true });
      },

      updateProfile: (profile: Partial<User["profile"]>) => {
        const currentUser = get().user;
        if (!currentUser) return;
        set({
          user: {
            ...currentUser,
            profile: { ...currentUser.profile, ...profile },
          },
        });
      },

      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
        }
        set({ user: null, accessToken: null, isAuthenticated: false });
      },
    }),
    {
      name: "masterlanguage-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
