"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const { forgotPassword, isSendingReset } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotForm) => {
    await forgotPassword(data.email);
    setSubmittedEmail(data.email);
    setSubmitted(true);
  };

  // Success state
  if (submitted) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-card p-8 text-center space-y-5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-100 dark:bg-green-900/30">
          <MailCheck className="h-8 w-8 text-success-600 dark:text-green-400" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Check your email
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            We&apos;ve sent a password reset link to{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {submittedEmail}
            </span>
          </p>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 text-left space-y-2">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            Didn&apos;t receive the email?
          </p>
          <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 list-disc list-inside">
            <li>Check your spam / junk folder</li>
            <li>Wait up to 5 minutes for delivery</li>
            <li>Make sure you entered the correct email</li>
          </ul>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setSubmitted(false)}
        >
          Try a different email
        </Button>
        <Link
          href="/login"
          className="block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-card p-8 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <Link
          href="/login"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Forgot password?
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No worries. Enter your email and we&apos;ll send you reset instructions.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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

        <Button
          type="submit"
          className="w-full"
          size="lg"
          loading={isSendingReset}
        >
          {isSendingReset ? "Sending…" : "Send reset link"}
        </Button>
      </form>
    </div>
  );
}
