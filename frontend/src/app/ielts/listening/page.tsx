"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Headphones, Play, Clock, Layers, Volume2 } from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import { CAMBRIDGE_BOOKS } from "@/lib/cambridge-data";
import { startCambridgeTestAttempt } from "@/lib/test-engine";

export default function IELTSListeningPage() {
  const router = useRouter();
  const [selectedBookNum, setSelectedBookNum] = useState<number>(19);
  const [mode, setMode] = useState<"timed" | "practice">("timed");

  const currentBook =
    CAMBRIDGE_BOOKS.find((b) => b.bookNumber === selectedBookNum) ||
    CAMBRIDGE_BOOKS[0];

  const handleStartListening = (camTestId: string) => {
    const attempt = startCambridgeTestAttempt(camTestId, "Listening", mode);
    router.push(`/test-engine/${attempt.attemptId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              <Headphones className="h-3.5 w-3.5" />
              Cambridge IELTS 9 – 19 Listening Module
            </span>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
              Cambridge IELTS Listening Tests (Book 9 to 19)
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Select any Cambridge IELTS book (9 to 19) to practice Test 1, Test 2, Test 3, and Test 4 across Parts 1, 2, 3, and 4.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 self-start">
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

        {/* 4 Listening Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentBook.tests.map((test) => (
            <div
              key={test.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-md bg-blue-700 px-2.5 py-1 text-xs font-extrabold text-white">
                    Cambridge {currentBook.bookNumber} · Test {test.testNumber}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                    <Clock className="h-3.5 w-3.5" /> 30 min · 4 Parts · 40 Qs
                  </span>
                </div>

                <h2 className="text-lg font-extrabold text-slate-900">
                  {test.title} — Listening Audio & Questions
                </h2>

                {/* 4 Listening Parts Breakdown */}
                <div className="mt-4 space-y-2">
                  {test.listeningParts.map((part) => (
                    <div
                      key={part.partNumber}
                      className="rounded-xl border border-slate-200 bg-slate-50/70 p-3"
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold text-blue-700">
                        <span className="flex items-center gap-1">
                          <Volume2 className="h-3 w-3" /> Part {part.partNumber} ({part.format})
                        </span>
                        <span className="text-slate-500">{part.questionRange}</span>
                      </div>
                      <div className="mt-1 text-xs font-bold text-slate-900">
                        {part.title}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {part.questionTypes.map((qt) => (
                          <span
                            key={qt}
                            className="rounded bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-600 border border-slate-200"
                          >
                            {qt}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleStartListening(test.id)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 py-3 text-xs font-bold text-white cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>
                  Start {test.title} Listening ({mode === "timed" ? "Timed 30m" : "Practice"})
                </span>
              </button>
            </div>
          ))}
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
