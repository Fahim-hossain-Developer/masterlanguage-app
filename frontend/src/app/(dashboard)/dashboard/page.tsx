"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Play,
  Clock,
  Zap,
  Trophy,
  Search,
  Sun,
  Moon,
  Bell,
  Crown,
  UserCircle,
  Target,
  Calendar,
  Flame,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Wand2,
  Swords,
  Pencil,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { format } from "date-fns";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [targetBand, setTargetBand] = useState<string>("7.5");
  const [editingTarget, setEditingTarget] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const fullName = user?.profile?.name || "Fahim Hossain";
  const firstName = fullName.split(" ")[0];
  const initial = firstName.charAt(0).toUpperCase();

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning,";
    if (hour < 17) return "Good afternoon,";
    return "Good evening,";
  };

  const modules = [
    {
      id: "speaking",
      title: "Speaking",
      href: "/dashboard/speaking",
      icon: Mic,
      iconBg: "bg-emerald-500",
      band: "—",
      testsCount: "No tests yet",
    },
    {
      id: "writing",
      title: "Writing",
      href: "/dashboard/writing",
      icon: PenTool,
      iconBg: "bg-rose-500",
      band: "—",
      testsCount: "No tests yet",
    },
    {
      id: "reading",
      title: "Reading",
      href: "/dashboard/reading",
      icon: BookOpen,
      iconBg: "bg-blue-500",
      band: "—",
      testsCount: "No tests yet",
    },
    {
      id: "listening",
      title: "Listening",
      href: "/dashboard/listening",
      icon: Headphones,
      iconBg: "bg-amber-400",
      band: "—",
      testsCount: "No tests yet",
    },
  ];

  return (
    <div className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
      {/* ── Top Greeting & Action Bar ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200/70 dark:border-gray-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-[26px] tracking-tight text-gray-500 dark:text-gray-400 font-normal">
            {getGreeting()}{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              {firstName}
            </span>
          </h1>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {format(currentTime, "EEEE, MMMM d · h:mm a")}
          </p>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* Search Input */}
          <div className="relative hidden sm:flex items-center">
            <Search className="absolute left-3.5 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-52 rounded-full border border-gray-200 bg-white pl-9 pr-12 text-xs text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200"
            />
            <kbd className="absolute right-3 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 dark:border-gray-700 dark:bg-gray-800">
              ⌘K
            </kbd>
          </div>

          {/* Theme Switcher Pill */}
          <div className="flex items-center rounded-full border border-gray-200 bg-white p-0.5 dark:border-gray-800 dark:bg-gray-900">
            <button
              onClick={() => setTheme("light")}
              className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
                theme !== "dark"
                  ? "bg-gray-100 text-gray-900 shadow-2xs"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              title="Light mode"
            >
              <Sun className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
                theme === "dark"
                  ? "bg-gray-800 text-white shadow-2xs"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              title="Dark mode"
            >
              <Moon className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Notification Bell */}
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
            <Bell className="h-4 w-4" />
          </button>

          {/* Upgrade Button */}
          <Link
            href="/dashboard/upgrade"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:opacity-95 transition"
          >
            <Crown className="h-3.5 w-3.5 text-amber-300" />
            Upgrade
          </Link>
        </div>
      </div>

      {/* ── Main 3-Column Content Area ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center 8 Columns */}
        <div className="lg:col-span-8 space-y-7">
          {/* Dark Hero Card: Full IELTS Mock Test */}
          <div className="relative overflow-hidden rounded-3xl bg-[#111318] p-6 sm:p-8 text-white shadow-md">
            {/* Decorative Dot Matrix on Right */}
            <div
              className="pointer-events-none absolute right-0 bottom-0 h-40 w-64 opacity-25"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.6) 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6">
              {/* 2x2 Module Icon Grid */}
              <div className="grid grid-cols-2 gap-2.5 shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/10 text-gray-200">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/10 text-gray-200">
                  <Headphones className="h-5 w-5" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/10 text-gray-200">
                  <PenTool className="h-5 w-5" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/10 text-gray-200">
                  <Mic className="h-5 w-5" />
                </div>
              </div>

              {/* Hero Text & CTA */}
              <div className="space-y-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                    Full IELTS mock test
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                    Reading, Listening, Writing and Speaking back to back.
                  </p>
                </div>

                {/* Meta Pills */}
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-gray-500" /> ~3 hours
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-gray-500" /> Real exam timing
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Trophy className="h-3.5 w-3.5 text-gray-500" /> Official band score
                  </span>
                </div>

                <div className="pt-1">
                  <Link
                    href="/dashboard/full-mock"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-gray-900 shadow-sm hover:bg-gray-100 transition"
                  >
                    <Play className="h-3.5 w-3.5 fill-gray-900" />
                    Start full mock test
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Individual Module Practice (2x2 Grid) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                Individual module practice
              </h2>
              <span className="text-xs text-gray-400">
                Pick a module to start
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {modules.map((mod) => {
                const Icon = mod.icon;
                return (
                  <div
                    key={mod.id}
                    className="group flex flex-col justify-between rounded-3xl border border-gray-200/70 bg-white p-6 shadow-2xs hover:shadow-md hover:border-gray-300/80 dark:border-gray-800 dark:bg-gray-900 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-full ${mod.iconBg} text-white shadow-xs`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] text-gray-400">
                        {mod.testsCount}
                      </span>
                    </div>

                    <div className="mt-5">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {mod.title}
                      </h3>
                    </div>

                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <p className="text-[11px] text-gray-400">Average band</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                          {mod.band}{" "}
                          <span className="text-xs font-normal text-gray-400">
                            / 9
                          </span>
                        </p>
                      </div>

                      <Link
                        href={mod.href}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#111318] px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 transition"
                      >
                        Practice
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Foundation English & AI Power Tools Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <Link
              href="/dashboard/foundation"
              className="flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white p-4 hover:border-blue-400 dark:border-gray-800 dark:bg-gray-900 transition"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                  Foundation (A1–C1)
                </p>
                <p className="text-[11px] text-gray-400 truncate">
                  Grammar Lab & Vocab SRS
                </p>
              </div>
            </Link>

            <Link
              href="/dashboard/paraphraser"
              className="flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white p-4 hover:border-violet-400 dark:border-gray-800 dark:bg-gray-900 transition"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
                <Wand2 className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                  AI Paraphraser
                </p>
                <p className="text-[11px] text-gray-400 truncate">
                  Band 8+ sentence rewrites
                </p>
              </div>
            </Link>

            <Link
              href="/dashboard/band-battle"
              className="flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white p-4 hover:border-amber-400 dark:border-gray-800 dark:bg-gray-900 transition"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                <Swords className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                  Band Battle
                </p>
                <p className="text-[11px] text-gray-400 truncate">
                  Live quiz challenge
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Right 4 Columns: Profile, Streak, Plan, Recent Activity */}
        <div className="lg:col-span-4 space-y-4">
          {/* Profile & Study Plan Card */}
          <div className="rounded-3xl border border-gray-200/70 bg-white p-5 shadow-2xs dark:border-gray-800 dark:bg-gray-900 space-y-5">
            {/* Avatar & Name */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-lg font-bold text-white shadow-xs">
                {initial}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  {fullName}
                </h3>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  FREE PLAN
                </span>
              </div>
            </div>

            {/* View Profile Button */}
            <Link
              href="/dashboard/settings"
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 transition"
            >
              <UserCircle className="h-3.5 w-3.5 text-gray-400" />
              View profile
            </Link>

            {/* TARGET & EXAM Grid */}
            <div className="grid grid-cols-2 border-y border-gray-100 dark:border-gray-800 py-3.5">
              <div className="pr-3 border-r border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  <Target className="h-3 w-3" /> TARGET
                </div>
                <div className="mt-1 flex items-center gap-1.5">
                  {editingTarget ? (
                    <input
                      type="text"
                      value={targetBand}
                      onChange={(e) => setTargetBand(e.target.value)}
                      onBlur={() => setEditingTarget(false)}
                      autoFocus
                      className="w-12 rounded border border-blue-500 px-1 text-xs font-bold text-gray-900 dark:bg-gray-800 dark:text-white"
                    />
                  ) : (
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                      {user?.profile?.targetBand || "—"}
                    </span>
                  )}
                  <button
                    onClick={() => setEditingTarget(true)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="pl-3">
                <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  <Calendar className="h-3 w-3" /> EXAM
                </div>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                    —
                  </span>
                  <Link
                    href="/dashboard/settings"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Pencil className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Streak */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200">
                  <Flame className="h-3.5 w-3.5 text-gray-400" />0 days streak
                </div>
                <span className="text-[11px] text-gray-400">All ▾</span>
              </div>
              <p className="text-[11px] text-gray-400">
                No practice recorded yet.
              </p>
            </div>

            {/* Today's Plan */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-3">
              <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">
                Today&apos;s Plan
              </h4>

              <div className="flex flex-col items-center justify-center py-4 text-center space-y-1.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-400 dark:bg-gray-800">
                  <BookOpen className="h-4 w-4" />
                </div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  No study plan yet
                </p>
                <p className="text-[11px] text-gray-400 max-w-[200px]">
                  Get daily goals across all four modules.
                </p>
              </div>

              <Link
                href="/dashboard/study-plan"
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#111318] py-2.5 text-xs font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 transition"
              >
                Create study plan <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="rounded-3xl border border-gray-200/70 bg-white p-5 shadow-2xs dark:border-gray-800 dark:bg-gray-900 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                RECENT ACTIVITY
              </span>
              <Link
                href="/dashboard/results"
                className="text-[11px] font-bold text-blue-600 hover:underline"
              >
                VIEW ALL
              </Link>
            </div>
            <div className="py-5 text-center">
              <p className="text-xs text-gray-400">No recent activity found.</p>
            </div>
          </div>

          {/* Notifications Card */}
          <div className="rounded-3xl border border-gray-200/70 bg-white p-5 shadow-2xs dark:border-gray-800 dark:bg-gray-900 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              NOTIFICATIONS
            </span>
            <div className="py-3 text-center">
              <p className="text-xs text-gray-400">You&apos;re all caught up!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
