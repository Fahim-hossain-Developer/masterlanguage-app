"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Play,
  Layers,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import { TESTS_DB, PASSAGES_DB } from "@/lib/question-bank";
import { startStandardTestAttempt } from "@/lib/test-engine";

export default function IELTSReadingPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"timed" | "practice">("timed");

  const readingTests = TESTS_DB.filter(
    (t) => t.module === "Reading" || t.module === "Full Mock"
  );

  const handleLaunchReading = (testId: string) => {
    const attempt = startStandardTestAttempt(testId, mode);
    router.push(`/test-engine/${attempt.attemptId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              <BookOpen className="h-3.5 w-3.5" />
              IELTS Reading Module
            </span>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
              IELTS Reading Practice & Timed Tests
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Desktop split-screen passage + mobile-friendly tabbed view with auto-marking and mistake explanations.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5">
            <button
              type="button"
              onClick={() => setMode("timed")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer ${
                mode === "timed"
                  ? "bg-blue-700 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Timed (60m)
            </button>
            <button
              type="button"
              onClick={() => setMode("practice")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer ${
                mode === "practice"
                  ? "bg-blue-700 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Untimed Practice
            </button>
          </div>
        </div>

        {/* Reading Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {readingTests.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                    {t.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                    <Clock className="h-3.5 w-3.5" /> {t.durationMinutes} min · Source:{" "}
                    {t.source}
                  </span>
                </div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  {t.title}
                </h2>
                <p className="mt-1 text-xs text-slate-600">{t.subtitle}</p>
              </div>

              <button
                type="button"
                onClick={() => handleLaunchReading(t.id)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 py-3 text-xs font-bold text-white cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>
                  Start Reading ({mode === "timed" ? "Timed" : "Untimed"})
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Supported Reading Question Types Strip */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-700" />
                Practice Specific Reading Question Types
              </h3>
              <p className="text-xs text-slate-600">
                Click any question type below to generate a focused practice set.
              </p>
            </div>
            <Link
              href="/ielts/question-types"
              className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1"
            >
              Open Question Type Filter <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "Multiple Choice",
              "True / False / Not Given",
              "Yes / No / Not Given",
              "Matching Headings",
              "Matching Information",
              "Matching Features",
              "Sentence Completion",
              "Summary Completion",
              "Note Completion",
              "Table Completion",
              "Diagram Label Completion",
              "Short Answer",
            ].map((type) => (
              <Link
                key={type}
                href={`/ielts/question-types?category=Reading&type=${encodeURIComponent(
                  type
                )}`}
                className="rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-500 hover:bg-blue-50 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors"
              >
                {type}
              </Link>
            ))}
          </div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
