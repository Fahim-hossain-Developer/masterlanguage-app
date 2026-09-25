"use client";

import Link from "next/link";
import { BookOpen, ArrowRight, Clock, FileText, Sparkles } from "lucide-react";

const READING_SETS = [
  { id: "cambridge-21-test-1", book: "Cambridge 21", title: "Cambridge 21 — Test 1", passages: "Roman Shipbuilding, Ice Age, Future of Work", difficulty: "Academic" },
  { id: "cambridge-21-test-2", book: "Cambridge 21", title: "Cambridge 21 — Test 2", passages: "Stonehenge, AI in Medicine, Urban Architecture", difficulty: "Academic" },
  { id: "cambridge-21-test-3", book: "Cambridge 21", title: "Cambridge 21 — Test 3", passages: "Deep Sea Exploration, Linguistics, Renewable Grids", difficulty: "Academic" },
  { id: "cambridge-21-test-4", book: "Cambridge 21", title: "Cambridge 21 — Test 4", passages: "Ancient Trade Routes, Cognitive Psychology, Climate Policy", difficulty: "Academic" },
  { id: "cambridge-20-test-1", book: "Cambridge 20", title: "Cambridge 20 — Test 1", passages: "The History of Glass, Biodiversity, Space Debris", difficulty: "Academic" },
  { id: "cambridge-20-test-2", book: "Cambridge 20", title: "Cambridge 20 — Test 2", passages: "Vertical Farming, Sleep Science, Classical Music", difficulty: "Academic" },
];

export default function ReadingHubPage() {
  return (
    <div className="min-h-full bg-[#F8FAFC] dark:bg-gray-950 px-5 py-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 mb-2">
              <BookOpen className="h-3.5 w-3.5" />
              IELTS READING MODULE
            </div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
              Reading Practice Tests
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Computer-delivered split-screen interface · 3 passages · 40 questions · 60 minutes
            </p>
          </div>

          <Link
            href="/dashboard/reading/cambridge-21-test-1"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Quick Start: Cambridge 21 Test 1
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {READING_SETS.map((set) => (
            <div
              key={set.id}
              className="flex flex-col justify-between rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs hover:border-blue-300 transition-all dark:border-gray-800 dark:bg-gray-900"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    {set.book}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-400">
                    <Clock className="h-3 w-3" /> 60 min · 40 Qs
                  </span>
                </div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  {set.title}
                </h2>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                  {set.passages}
                </p>
              </div>

              <Link
                href={`/dashboard/reading/${set.id}`}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 py-2.5 text-xs font-bold text-white transition-all"
              >
                Start Reading Test
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
