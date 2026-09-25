"use client";

import Link from "next/link";
import { FileCheck2, ArrowRight, Trophy } from "lucide-react";

const RESULTS = [
  { id: "1", title: "Cambridge 21 Test 1 — Reading", date: "Today", band: "7.5", score: "33/40", module: "Reading" },
  { id: "2", title: "Cambridge 21 Test 1 — Listening", date: "Yesterday", band: "7.5", score: "32/40", module: "Listening" },
  { id: "3", title: "Writing Task 2 — University Education", date: "3 days ago", band: "6.5", score: "AI Evaluated", module: "Writing" },
];

export default function TestResultsPage() {
  return (
    <div className="min-h-full bg-[#F8FAFC] dark:bg-gray-950 px-5 py-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-600">
              <FileCheck2 className="h-3.5 w-3.5" />
              PERFORMANCE HISTORY
            </span>
            <h1 className="mt-1.5 text-2xl font-black text-gray-900 dark:text-white">
              My Test Results & Band Analytics
            </h1>
          </div>
          <Link
            href="/dashboard/full-mock"
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-bold text-white"
          >
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            Take Full Mock
          </Link>
        </div>

        <div className="space-y-3">
          {RESULTS.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-gray-900"
            >
              <div>
                <span className="text-xs font-bold text-blue-600">{r.module}</span>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{r.title}</h3>
                <span className="text-xs text-gray-400">{r.date} · {r.score}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="block text-[10px] uppercase font-bold text-gray-400">Band</span>
                  <span className="text-lg font-black text-blue-600">{r.band}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
