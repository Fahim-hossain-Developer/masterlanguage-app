"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import type { ExamType } from "@/types";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
    targetExam: z.string().optional(),
    phone: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

const EXAM_OPTIONS: { value: ExamType; label: string }[] = [
  { value: "IELTS_ACADEMIC", label: "IELTS Academic" },
  { value: "IELTS_GENERAL", label: "IELTS General Training" },
  { value: "JLPT_N5", label: "JLPT N5 (Beginner)" },
  { value: "JLPT_N4", label: "JLPT N4 (Elementary)" },
  { value: "JLPT_N3", label: "JLPT N3 (Intermediate)" },
  { value: "JLPT_N2", label: "JLPT N2 (Upper Intermediate)" },
  { value: "JLPT_N1", label: "JLPT N1 (Advanced)" },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, isRegistering } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      targetExam: "",
      phone: "",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      targetExam: data.targetExam as ExamType | undefined,
      phone: data.phone,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-card p-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create your account
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Start your AI-powered language learning journey
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name" required>
            Full name
          </Label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Tanaka Yuki"
            error={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-danger-600 dark:text-danger-400">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" required>
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            error={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-danger-600 dark:text-danger-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Target exam */}
        <div className="space-y-1.5">
          <Label htmlFor="targetExam">Target exam</Label>
          <div className="relative">
            <select
              id="targetExam"
              className="flex h-10 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-8 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              {...register("targetExam")}
            >
              <option value="">Select your target exam (optional)</option>
              {EXAM_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="password" required>
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Min. 8 chars, 1 uppercase, 1 number"
              error={!!errors.password}
              className="pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-danger-600 dark:text-danger-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm password */}
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword" required>
            Confirm password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              error={!!errors.confirmPassword}
              className="pr-10"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-danger-600 dark:text-danger-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Phone (optional) */}
        <div className="space-y-1.5">
          <Label htmlFor="phone">
            Phone number{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+880 1XXX XXXXXX"
            {...register("phone")}
          />
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="text-primary-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full"
          size="lg"
          loading={isRegistering}
        >
          {isRegistering ? "Creating account…" : "Create account"}
        </Button>
      </form>

      {/* Sign in link */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
