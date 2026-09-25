"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Headphones, Play, Clock, Layers } from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import { startStandardTestAttempt } from "@/lib/test-engine";

export default function IELTSListeningPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"timed" | "practice">("timed");

  const handleStartListening = () => {
    const attempt = startStandardTestAttempt("test-listening-01", mode);
    router.push(`/test-engine/${attempt.attemptId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />

      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              <Headphones className="h-3.5 w-3.5" />
              IELTS Listening Module
            </span>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
              IELTS Listening Practice & Audio Tests
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Stream audio efficiently (no heavy preloading) and practice Form, Note, Table Completion, and Multiple Choice.
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
              Timed (30m)
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

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs mb-8">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
              Section 1 & 2 · Original Audio Set
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="h-3.5 w-3.5" /> 30 minutes · Auto-Marked
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            IELTS Listening Practice Test #1: University Accommodation & Orientation
          </h2>
          <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
            Includes Form Completion (names, spellings, rent figures with distractor corrections) and Multiple Choice questions. Powered by the unified Test Engine with full Mistake Review.
          </p>

          <button
            type="button"
            onClick={handleStartListening}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 px-5 py-3 text-xs font-bold text-white cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Start Listening Test ({mode === "timed" ? "Timed" : "Practice"})</span>
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 mb-3">
            <Layers className="h-4 w-4 text-blue-700" />
            Listening Question Types
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Form Completion",
              "Multiple Choice",
              "Note Completion",
              "Table Completion",
              "Sentence Completion",
              "Map Labeling",
              "Short Answer",
            ].map((qt) => (
              <Link
                key={qt}
                href={`/ielts/question-types?category=Listening&type=${encodeURIComponent(
                  qt
                )}`}
                className="rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-500 hover:bg-blue-50 px-3 py-2 text-xs font-semibold text-slate-700"
              >
                {qt}
              </Link>
            ))}
          </div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
