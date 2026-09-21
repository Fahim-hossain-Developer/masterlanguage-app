"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import type {
  LoginPayload,
  RegisterPayload,
  User,
  AuthResponse,
  ApiResponse,
} from "@/types";

const AUTH_KEYS = {
  me: ["auth", "me"] as const,
};

// ─── useAuth hook ─────────────────────────────────────────────────────────────
export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, setAuth, logout: storeLogout } = useAuthStore();

  // ── Get Current User ──────────────────────────────────────────────────────
  const { data: meData, isLoading: isMeLoading } = useQuery({
    queryKey: AUTH_KEYS.me,
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<User>>("/auth/me");
      return data.data;
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });

  // ── Login ─────────────────────────────────────────────────────────────────
  const loginMutation = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post<ApiResponse<AuthResponse>>(
        "/auth/login",
        payload
      );
      return data.data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.tokens.accessToken);
      queryClient.setQueryData(AUTH_KEYS.me, data.user);
      toast.success(`Welcome back, ${data.user.profile.name}!`);
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Login failed. Please try again.");
    },
  });

  // ── Register ──────────────────────────────────────────────────────────────
  const registerMutation = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await api.post<ApiResponse<{ user: User }>>(
        "/auth/register",
        payload
      );
      return data.data;
    },
    onSuccess: () => {
      toast.success("Account created! Please log in.");
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Registration failed. Please try again.");
    },
  });

  // ── Forgot Password ───────────────────────────────────────────────────────
  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data } = await api.post("/auth/forgot-password", { email });
      return data;
    },
    onSuccess: () => {
      toast.success("Password reset email sent. Check your inbox.");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to send reset email.");
    },
  });

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // proceed with local logout even if server call fails
    } finally {
      queryClient.clear();
      storeLogout();
      toast.success("You have been logged out.");
      router.push("/login");
    }
  }, [queryClient, storeLogout, router]);

  return {
    user: meData ?? user,
    isAuthenticated,
    isMeLoading,
    // Mutations
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    forgotPassword: forgotPasswordMutation.mutateAsync,
    isSendingReset: forgotPasswordMutation.isPending,
    logout,
  };
}
