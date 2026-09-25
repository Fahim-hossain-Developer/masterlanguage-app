"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Trophy,
  Clock,
  Play,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import { TESTS_DB } from "@/lib/question-bank";
import {
  startStandardTestAttempt,
  getLatestActiveAttempt,
  type ActiveTestAttempt,
} from "@/lib/test-engine";

export default function FullMockTestsPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"timed" | "practice">("timed");
  const [activeAttempt, setActiveAttempt] = useState<ActiveTestAttempt | null>(
    null
  );

  useEffect(() => {
    setActiveAttempt(getLatestActiveAttempt());
  }, []);

  const handleStartTest = (testId: string) => {
    const attempt = startStandardTestAttempt(testId, mode);
    router.push(`/test-engine/${attempt.attemptId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />

      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <Trophy className="h-3.5 w-3.5" />
            Full IELTS Mock Test System
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Complete IELTS Mock Tests
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Experience the exam flow (Instructions → Listening → Reading → Final Result & Mistake Review) powered by our auto-saving Test Engine.
          </p>
        </div>

        {/* Resume Active Test Banner (If exists) */}
        {activeAttempt && (
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-amber-300 bg-amber-50/90 p-5">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
                <RotateCcw className="h-3.5 w-3.5" /> Unfinished Test Found (Auto-Saved)
              </span>
              <h2 className="mt-1 text-base font-extrabold text-slate-900">
                {activeAttempt.title}
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Your answers and remaining timer were automatically preserved.
              </p>
            </div>
            <Link
              href={`/test-engine/${activeAttempt.attemptId}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 px-5 py-2.5 text-xs font-bold text-white shrink-0"
            >
              <span>Resume Test Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Mode Selector */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Select Test Mode Before Starting
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode("timed")}
              className={`flex items-start gap-3 rounded-xl border p-4 text-left cursor-pointer transition-all ${
                mode === "timed"
                  ? "border-blue-700 bg-blue-50/60"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <Clock className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-slate-900">
                  Timed Exam Mode (Recommended)
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Server-safe countdown timer with automatic submission when time expires.
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode("practice")}
              className={`flex items-start gap-3 rounded-xl border p-4 text-left cursor-pointer transition-all ${
                mode === "practice"
                  ? "border-blue-700 bg-blue-50/60"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-slate-900">
                  Untimed Practice Mode
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  No countdown pressure. Work carefully through each section at your own pace.
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Available Mock & Module Tests */}
        <div className="space-y-4">
          {TESTS_DB.map((test) => (
            <div
              key={test.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                    {test.module}
                  </span>
                  <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                    Difficulty: {test.difficulty}
                  </span>
                  <span className="text-xs text-slate-400">
                    Source: {test.source}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-600">
                  {test.durationMinutes} mins · {test.totalQuestions} questions
                </span>
              </div>

              <h2 className="text-lg font-extrabold text-slate-900">
                {test.title}
              </h2>
              <p className="mt-1 text-xs text-slate-600">{test.subtitle}</p>

              <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                {test.instructions.map((inst, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Sections:{" "}
                  <strong className="text-slate-800">
                    {test.sections.map((s) => s.title).join(" → ")}
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={() => handleStartTest(test.id)}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 px-5 py-2.5 text-xs font-bold text-white shadow-2xs cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>
                    Start in {mode === "timed" ? "Timed Mode" : "Practice Mode"}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
