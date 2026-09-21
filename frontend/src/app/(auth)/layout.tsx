import Link from "next/link";
import { GraduationCap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | MasterLanguage",
    default: "Sign In",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-200/30 dark:bg-primary-900/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary-200/30 dark:bg-secondary-900/20 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex h-16 items-center justify-center border-b border-gray-100 dark:border-gray-800 bg-white/60 dark:bg-gray-950/60 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="MasterLanguage home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 shadow-glow group-hover:bg-primary-700 transition-colors">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Master<span className="text-primary-600">Language</span>
          </span>
        </Link>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-gray-400 dark:text-gray-600">
        <p>
          © {new Date().getFullYear()} MasterLanguage. All rights reserved.{" "}
          <Link href="/privacy" className="underline hover:text-gray-600 dark:hover:text-gray-400">
            Privacy
          </Link>{" "}
          ·{" "}
          <Link href="/terms" className="underline hover:text-gray-600 dark:hover:text-gray-400">
            Terms
          </Link>
        </p>
      </footer>
    </div>
  );
}
