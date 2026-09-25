"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Trophy,
  Clock,
  Play,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
} from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import { CAMBRIDGE_BOOKS } from "@/lib/cambridge-data";
import {
  startCambridgeTestAttempt,
  getLatestActiveAttempt,
  type ActiveTestAttempt,
} from "@/lib/test-engine";

export default function FullMockTestsPage() {
  const router = useRouter();
  const [selectedBookNum, setSelectedBookNum] = useState<number>(19);
  const [mode, setMode] = useState<"timed" | "practice">("timed");
  const [activeAttempt, setActiveAttempt] = useState<ActiveTestAttempt | null>(
    null
  );

  useEffect(() => {
    setActiveAttempt(getLatestActiveAttempt());
  }, []);

  const currentBook =
    CAMBRIDGE_BOOKS.find((b) => b.bookNumber === selectedBookNum) ||
    CAMBRIDGE_BOOKS[0];

  const handleStartFullCambridgeTest = (camTestId: string) => {
    const attempt = startCambridgeTestAttempt(camTestId, "Full Mock", mode);
    router.push(`/test-engine/${attempt.attemptId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <Trophy className="h-3.5 w-3.5" />
            Cambridge IELTS 9 – 19 Full Mock Test System
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Cambridge IELTS Full Mock Tests (Book 9 to 19)
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Experience all 44 full tests across Cambridge IELTS 9 through Cambridge IELTS 19 (Test 1, Test 2, Test 3 & Test 4) with auto-save, band scoring, and wrong answer review.
          </p>
        </div>

        {/* Resume Active Test Banner (If exists) */}
        {activeAttempt && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-amber-300 bg-amber-50/90 p-5">
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
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
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

        {/* Cambridge 9-19 Book Selector */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Select Cambridge IELTS Book (9 → 19)
          </div>
          <div className="flex flex-wrap gap-2">
            {CAMBRIDGE_BOOKS.map((b) => (
              <button
                key={b.bookNumber}
                type="button"
                onClick={() => setSelectedBookNum(b.bookNumber)}
                className={`rounded-xl px-3.5 py-2 text-xs font-extrabold cursor-pointer transition-colors ${
                  selectedBookNum === b.bookNumber
                    ? "bg-blue-700 text-white"
                    : "border border-slate-200 bg-slate-50 text-slate-800 hover:border-blue-400 hover:bg-white"
                }`}
              >
                Cambridge {b.bookNumber}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Full Mock Tests for Selected Book */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentBook.tests.map((test) => (
            <div
              key={test.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-md bg-blue-700 px-2.5 py-1 text-xs font-extrabold text-white">
                    Cambridge {currentBook.bookNumber} · Full Test {test.testNumber}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    All 4 Modules · Band Scored
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-slate-900">
                  {test.title} — Complete Mock Exam
                </h2>

                <div className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/70">
                    <div className="font-bold text-blue-700 flex items-center gap-1.5">
                      <Headphones className="h-3.5 w-3.5" /> Module 1: Listening (Parts 1–4)
                    </div>
                    <p className="mt-1 text-slate-600">
                      {test.listeningParts.map((p) => p.title).join(" · ")}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/70">
                    <div className="font-bold text-blue-700 flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5" /> Module 2: Reading (Passages 1–3)
                    </div>
                    <p className="mt-1 text-slate-600">
                      {test.readingPassages.map((p) => p.title).join(" · ")}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/ielts/writing?book=${currentBook.bookNumber}&test=${test.testNumber}`}
                      className="rounded-xl border border-slate-200 p-2.5 hover:border-blue-500 flex items-center justify-between font-bold text-slate-800"
                    >
                      <span className="flex items-center gap-1.5">
                        <PenTool className="h-3.5 w-3.5 text-blue-700" /> Writing T1 & T2
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                    </Link>

                    <Link
                      href={`/ielts/speaking?book=${currentBook.bookNumber}&test=${test.testNumber}`}
                      className="rounded-xl border border-slate-200 p-2.5 hover:border-blue-500 flex items-center justify-between font-bold text-slate-800"
                    >
                      <span className="flex items-center gap-1.5">
                        <Mic className="h-3.5 w-3.5 text-blue-700" /> Speaking P1–P3
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                    </Link>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleStartFullCambridgeTest(test.id)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 py-3 text-xs font-bold text-white cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>
                  Start {test.title} ({mode === "timed" ? "Timed Exam" : "Practice Mode"})
                </span>
              </button>
            </div>
          ))}
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
