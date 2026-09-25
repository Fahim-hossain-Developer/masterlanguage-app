"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Trophy,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  GraduationCap,
  Briefcase,
  Play,
  ArrowRight,
  Clock,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PREVIOUS_SESSIONS = [
  {
    id: "session-prev-1",
    title: "Cambridge 21 — Full Mock #1",
    type: "Academic",
    date: "2 days ago",
    status: "Completed",
    overallBand: "7.0",
    scores: { R: "7.5", L: "7.5", W: "6.5", S: "6.5" },
  },
  {
    id: "session-prev-2",
    title: "Cambridge 20 — Full Mock #3",
    type: "Academic",
    date: "1 week ago",
    status: "In Progress (2/4)",
    overallBand: "—",
    scores: { R: "7.0", L: "6.5", W: "—", S: "—" },
  },
];

export default function FullMockLandingPage() {
  const router = useRouter();
  const [examType, setExamType] = useState<"academic" | "general">("academic");

  const handleStartFullMock = () => {
    const newSessionId = `mock-${examType}-1`;
    router.push(`/dashboard/full-mock/${newSessionId}?type=${examType}`);
  };

  return (
    <div className="min-h-full bg-[#F8FAFC] dark:bg-gray-950 px-4 py-6 lg:px-8">
      {/* Top Back Bar */}
      <div className="mx-auto max-w-4xl mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          DASHBOARD
        </Link>
      </div>

      {/* Hero Header */}
      <div className="mx-auto max-w-2xl text-center mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/50 dark:text-amber-400 mb-4">
          <Trophy className="h-3.5 w-3.5 text-amber-500" />
          FULL MOCK TEST
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white">
          <span className="font-serif italic font-normal text-gray-700 dark:text-gray-300 mr-2">
            Complete
          </span>
          IELTS MOCK TEST
        </h1>
        <p className="mt-2.5 text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
          All four modules in one sitting. Get your predicted overall band score
          at the end.
        </p>
      </div>

      {/* Center Action Card (Matching Screenshot 2) */}
      <div className="mx-auto max-w-xl rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {/* 4 Floating Module Icon Tiles */}
        <div className="flex items-center justify-center gap-4 sm:gap-5 mb-7">
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100 dark:bg-blue-950/60 dark:border-blue-900 dark:text-blue-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-semibold text-gray-500">Reading</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 shadow-sm border border-orange-100 dark:bg-orange-950/60 dark:border-orange-900 dark:text-orange-400">
              <Headphones className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-semibold text-gray-500">Listening</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 shadow-sm border border-rose-100 dark:bg-rose-950/60 dark:border-rose-900 dark:text-rose-400">
              <PenTool className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-semibold text-gray-500">Writing</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 shadow-sm border border-teal-100 dark:bg-teal-950/60 dark:border-teal-900 dark:text-teal-400">
              <Mic className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-semibold text-gray-500">Speaking</span>
          </div>
        </div>

        {/* Academic vs General Selector */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setExamType("academic")}
            className={cn(
              "flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all",
              examType === "academic"
                ? "border-amber-400 bg-amber-50/40 ring-2 ring-amber-400/20 dark:border-amber-500/80 dark:bg-amber-950/25"
                : "border-gray-200 bg-gray-50/50 hover:bg-gray-100/70 dark:border-gray-800 dark:bg-gray-800/40"
            )}
          >
            <GraduationCap
              className={cn(
                "h-5 w-5 mb-1.5",
                examType === "academic"
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-gray-400"
              )}
            />
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              Academic
            </span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">
              University / Study
            </span>
          </button>

          <button
            type="button"
            onClick={() => setExamType("general")}
            className={cn(
              "flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all",
              examType === "general"
                ? "border-amber-400 bg-amber-50/40 ring-2 ring-amber-400/20 dark:border-amber-500/80 dark:bg-amber-950/25"
                : "border-gray-200 bg-gray-50/50 hover:bg-gray-100/70 dark:border-gray-800 dark:bg-gray-800/40"
            )}
          >
            <Briefcase
              className={cn(
                "h-5 w-5 mb-1.5",
                examType === "general"
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-gray-400"
              )}
            />
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              General
            </span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">
              Work / Immigration
            </span>
          </button>
        </div>

        {/* Specs Pill */}
        <div className="text-center mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            4 MODULES &nbsp;·&nbsp; ~3h DURATION &nbsp;·&nbsp; 1 BAND SCORE
          </span>
        </div>

        {/* Start Full Mock Button */}
        <button
          type="button"
          onClick={handleStartFullMock}
          className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-[#111827] hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 py-3.5 px-6 text-sm font-bold text-white dark:text-gray-900 shadow-md transition-all cursor-pointer"
        >
          <Play className="h-4 w-4 fill-current" />
          <span>Start Full Mock</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Previous Sessions Section */}
      <div className="mx-auto max-w-xl mt-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            PREVIOUS SESSIONS
          </h2>
          <span className="text-[11px] text-gray-400">
            {PREVIOUS_SESSIONS.length} sessions
          </span>
        </div>

        <div className="space-y-2.5">
          {PREVIOUS_SESSIONS.map((session) => (
            <Link
              key={session.id}
              href={`/dashboard/full-mock/${session.id}?type=${session.type.toLowerCase()}`}
              className="flex items-center justify-between rounded-2xl border border-gray-200/80 bg-white p-4 hover:border-gray-300 transition-all dark:border-gray-800 dark:bg-gray-900"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {session.title}
                  </span>
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                    {session.type}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {session.date}
                  </span>
                  <span className="flex items-center gap-1">
                    {session.status === "Completed" ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Clock className="h-3 w-3 text-amber-500" />
                    )}
                    {session.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="block text-[10px] uppercase font-bold text-gray-400">
                    Band
                  </span>
                  <span className="text-base font-black text-blue-600 dark:text-blue-400">
                    {session.overallBand}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
