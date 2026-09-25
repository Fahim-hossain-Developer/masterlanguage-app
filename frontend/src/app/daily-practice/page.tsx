"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarCheck, Play, Clock, Plus } from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import { useCMSContent } from "@/lib/cms-store";
import { startDailyPracticeAttempt } from "@/lib/test-engine";

const DAILY_CATEGORIES = [
  "All",
  "Grammar",
  "Vocabulary",
  "Reading",
  "Listening",
  "Writing",
  "Speaking",
  "IELTS",
];

function DailyPracticeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const autoStartId = searchParams.get("start");
  const { data } = useCMSContent();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mode, setMode] = useState<"timed" | "practice">("timed");

  useEffect(() => {
    if (autoStartId) {
      const attempt = startDailyPracticeAttempt(autoStartId, "timed");
      router.push(`/test-engine/${attempt.attemptId}`);
    }
  }, [autoStartId, router]);

  const filtered = data.dailySets.filter(
    (s) => selectedCategory === "All" || s.category === selectedCategory
  );

  const handleStartSet = (setId: string) => {
    const attempt = startDailyPracticeAttempt(setId, mode);
    router.push(`/test-engine/${attempt.attemptId}`);
  };

  return (
    <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <CalendarCheck className="h-3.5 w-3.5" />
            Modular Daily Practice System
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Daily Practice Sets
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Short, focused daily question sets across Grammar, Vocabulary, Reading, Listening, and IELTS—powered by our Test Engine with full Mistake Review.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2.5 text-xs font-bold text-emerald-700"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Create Daily Set (Admin)</span>
          </Link>

          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setMode("timed")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer ${
                mode === "timed" ? "bg-blue-700 text-white" : "text-slate-600"
              }`}
            >
              Timed
            </button>
            <button
              type="button"
              onClick={() => setMode("practice")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer ${
                mode === "practice" ? "bg-blue-700 text-white" : "text-slate-600"
              }`}
            >
              Untimed
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {DAILY_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold cursor-pointer ${
              selectedCategory === cat
                ? "bg-blue-700 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Daily Practice Cards */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-sm font-bold text-slate-700">
            No Daily Practice sets found in this category.
          </p>
          <Link
            href="/admin"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-bold text-white"
          >
            <Plus className="h-3.5 w-3.5" /> Create Daily Practice Set in Admin Panel
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((set) => (
            <div
              key={set.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                      {set.category}
                    </span>
                    <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                      {set.difficulty}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5" /> {set.durationMinutes} min ·{" "}
                    {set.questionIds.length} Qs
                  </span>
                </div>

                <h2 className="text-lg font-extrabold text-slate-900">
                  {set.title}
                </h2>
                <p className="mt-1.5 text-xs text-slate-600">{set.description}</p>
              </div>

              <button
                type="button"
                onClick={() => handleStartSet(set.id)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 py-3 text-xs font-bold text-white cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>
                  Start Daily Practice ({mode === "timed" ? "Timed" : "Untimed"})
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default function DailyPracticePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />
      <Suspense fallback={<div className="p-10 text-center text-sm">Loading Daily Practice...</div>}>
        <DailyPracticeContent />
      </Suspense>
      <MainFooter />
    </div>
  );
}
