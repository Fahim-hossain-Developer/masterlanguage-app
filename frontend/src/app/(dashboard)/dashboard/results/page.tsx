"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileCheck2, ArrowRight, Trophy } from "lucide-react";
import {
  getAllCompletedResults,
  type TestResultRecord,
} from "@/lib/test-engine";

export default function TestResultsHistoryPage() {
  const [results, setResults] = useState<TestResultRecord[]>([]);

  useEffect(() => {
    setResults(getAllCompletedResults());
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <FileCheck2 className="h-3.5 w-3.5" />
            Test History & Results
          </span>
          <h1 className="mt-1.5 text-2xl font-extrabold text-slate-900">
            My Completed Tests & Mistake Review
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Click any test below to view your score breakdown and review wrong answers with explanations.
          </p>
        </div>

        <Link
          href="/ielts/full-mock"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 px-4 py-2.5 text-xs font-bold text-white shrink-0"
        >
          <Trophy className="h-3.5 w-3.5" />
          <span>Take New Mock Test</span>
        </Link>
      </div>

      <div className="space-y-3.5">
        {results.map((r) => (
          <Link
            key={r.attemptId}
            href={`/dashboard/results/${r.attemptId}`}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-500 transition-all"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="rounded bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700">
                  {r.module}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(r.submittedAt).toLocaleDateString()} · Mode: {r.mode}
                </span>
              </div>
              <h2 className="text-base font-extrabold text-slate-900">
                {r.title}
              </h2>
              <div className="mt-1.5 flex flex-wrap gap-3 text-xs">
                <span className="text-emerald-700 font-semibold">
                  Correct: {r.correctCount}/{r.totalQuestions}
                </span>
                <span className="text-rose-700 font-semibold">
                  Wrong: {r.incorrectCount}
                </span>
                <span className="text-slate-500">
                  Unanswered: {r.unansweredCount}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              {r.bandScore !== null && (
                <div className="rounded-xl bg-blue-50 px-3.5 py-2 text-center">
                  <span className="block text-[10px] font-bold uppercase text-blue-700">
                    Band Score
                  </span>
                  <span className="text-lg font-extrabold text-blue-700">
                    {r.bandScore.toFixed(1)}
                  </span>
                </div>
              )}

              <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white">
                <span>Review Mistakes</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
