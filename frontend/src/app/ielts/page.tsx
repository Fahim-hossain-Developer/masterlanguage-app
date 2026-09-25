"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Trophy,
  Layers,
  ArrowRight,
  Play,
  Library,
} from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import { CAMBRIDGE_BOOKS } from "@/lib/cambridge-data";
import { startCambridgeTestAttempt } from "@/lib/test-engine";

function IELTSHubContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookParam = Number(searchParams.get("book"));

  const [selectedBookNum, setSelectedBookNum] = useState<number>(
    bookParam >= 9 && bookParam <= 19 ? bookParam : 19
  );
  const [mode, setMode] = useState<"timed" | "practice">("timed");

  useEffect(() => {
    if (bookParam >= 9 && bookParam <= 19) {
      setSelectedBookNum(bookParam);
    }
  }, [bookParam]);

  const currentBook =
    CAMBRIDGE_BOOKS.find((b) => b.bookNumber === selectedBookNum) ||
    CAMBRIDGE_BOOKS[0];

  const handleStartEngine = (
    camTestId: string,
    moduleType: "Reading" | "Listening" | "Full Mock"
  ) => {
    const attempt = startCambridgeTestAttempt(camTestId, moduleType, mode);
    router.push(`/test-engine/${attempt.attemptId}`);
  };

  const modules = [
    {
      title: "Full IELTS Mock Test (Cam 9–19)",
      href: "/ielts/full-mock",
      icon: Trophy,
      badge: "44 Full Tests",
      desc: "Complete 4-module exam simulation for Cambridge IELTS 9 through 19 (Test 1 to Test 4).",
    },
    {
      title: "IELTS Reading (Cam 9–19)",
      href: "/ielts/reading",
      icon: BookOpen,
      badge: "Passages 1, 2 & 3",
      desc: "All Cambridge 9–19 Academic Reading passages with split-screen reader, timer, and Bangla/English explanations.",
    },
    {
      title: "IELTS Listening (Cam 9–19)",
      href: "/ielts/listening",
      icon: Headphones,
      badge: "Parts 1, 2, 3 & 4",
      desc: "All Cambridge 9–19 Listening sections (Form/Note Completion, Multiple Choice, Map Labeling).",
    },
    {
      title: "IELTS Writing (Cam 9–19)",
      href: "/ielts/writing",
      icon: PenTool,
      badge: "Task 1 & Task 2",
      desc: "Official Cambridge 9–19 Task 1 (Graphs, Charts, Maps, Processes) and Task 2 Essay prompts with word counter & timer.",
    },
    {
      title: "IELTS Speaking (Cam 9–19)",
      href: "/ielts/speaking",
      icon: Mic,
      badge: "Part 1, Cue Card & Part 3",
      desc: "Cambridge 9–19 Speaking Part 1 Interview, Part 2 Cue Cards (1m prep + 2m talk), and Part 3 Discussion with audio recorder.",
    },
    {
      title: "Question Types Practice",
      href: "/ielts/question-types",
      icon: Layers,
      badge: "Filter by Difficulty",
      desc: "Target Matching Headings, True/False/Not Given, or Note Completion filtered by Easy, Medium, or Hard.",
    },
  ];

  return (
    <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <Library className="h-3.5 w-3.5" />
            Official Cambridge IELTS 9 – 19 Series
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Cambridge IELTS 9 to 19 — Complete Practice Hub
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Select any book from Cambridge IELTS 9 to Cambridge IELTS 19 below to practice Test 1, Test 2, Test 3, and Test 4 across Listening, Reading, Writing, and Speaking.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1.5 self-start">
          <button
            type="button"
            onClick={() => setMode("timed")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold cursor-pointer ${
              mode === "timed"
                ? "bg-blue-700 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Timed Exam Mode
          </button>
          <button
            type="button"
            onClick={() => setMode("practice")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold cursor-pointer ${
              mode === "practice"
                ? "bg-blue-700 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Untimed Practice
          </button>
        </div>
      </div>

      {/* Cambridge Book Selector Bar (Book 19 down to Book 9) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Select Cambridge IELTS Book (Cambridge 9 → Cambridge 19)
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-11 gap-2">
          {CAMBRIDGE_BOOKS.map((b) => {
            const active = b.bookNumber === selectedBookNum;
            return (
              <button
                key={b.bookNumber}
                type="button"
                onClick={() => setSelectedBookNum(b.bookNumber)}
                className={`flex flex-col items-center justify-center rounded-xl border py-2.5 px-2 transition-all cursor-pointer ${
                  active
                    ? "border-blue-700 bg-blue-700 text-white shadow-xs"
                    : "border-slate-200 bg-slate-50 text-slate-800 hover:border-blue-400 hover:bg-white"
                }`}
              >
                <span className="text-[10px] font-bold uppercase opacity-80">
                  Cambridge
                </span>
                <span className="text-base font-extrabold leading-tight">
                  IELTS {b.bookNumber}
                </span>
                <span className="text-[10px] opacity-75">4 Tests</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Book Header + 4 Tests Grid (Test 1, Test 2, Test 3, Test 4) */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {currentBook.title} ({currentBook.editionLabel})
            </h2>
            <p className="text-xs text-slate-500">
              Includes Test 1, Test 2, Test 3, and Test 4 — All 4 Modules (Listening, Reading, Writing, Speaking)
            </p>
          </div>
          <span className="rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
             Edition Year: {currentBook.year} · 4 Complete Tests
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentBook.tests.map((test) => (
            <div
              key={test.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col justify-between space-y-5"
            >
              {/* Card Top Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="rounded-md bg-blue-700 px-2.5 py-1 text-[11px] font-extrabold text-white">
                    TEST {test.testNumber}
                  </span>
                  <h3 className="mt-2 text-lg font-extrabold text-slate-900">
                    {test.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => handleStartEngine(test.id, "Full Mock")}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-blue-700 px-4 py-2.5 text-xs font-bold text-white cursor-pointer transition-colors"
                >
                  <Trophy className="h-3.5 w-3.5 text-amber-400" />
                  <span>Take Full Test {test.testNumber}</span>
                </button>
              </div>

              {/* 4 Modules Breakdown Inside This Test */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1. Listening */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-blue-700 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Headphones className="h-3.5 w-3.5" /> Listening
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Parts 1–4 · 30m
                      </span>
                    </div>
                    <ul className="space-y-1 text-[11px] text-slate-600">
                      {test.listeningParts.map((lp) => (
                        <li key={lp.partNumber} className="truncate">
                          <strong>P{lp.partNumber}:</strong> {lp.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleStartEngine(test.id, "Listening")}
                    className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 py-2 text-xs font-bold text-white cursor-pointer"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>Start Listening</span>
                  </button>
                </div>

                {/* 2. Reading */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-blue-700 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5" /> Reading
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Passages 1–3 · 60m
                      </span>
                    </div>
                    <ul className="space-y-1 text-[11px] text-slate-600">
                      {test.readingPassages.map((rp) => (
                        <li key={rp.passageNumber} className="truncate">
                          <strong>P{rp.passageNumber}:</strong> {rp.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleStartEngine(test.id, "Reading")}
                    className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 py-2 text-xs font-bold text-white cursor-pointer"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>Start Reading</span>
                  </button>
                </div>

                {/* 3. Writing */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-blue-700 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <PenTool className="h-3.5 w-3.5" /> Writing
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Task 1 & 2 · 60m
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2">
                      <strong>T1:</strong> {test.writingTasks[0].visualDataSummary}
                    </p>
                    <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
                      <strong>T2:</strong> {test.writingTasks[1].prompt}
                    </p>
                  </div>
                  <Link
                    href={`/ielts/writing?book=${currentBook.bookNumber}&test=${test.testNumber}`}
                    className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-blue-700 bg-white hover:bg-blue-50 py-2 text-xs font-bold text-blue-700"
                  >
                    <span>Practice Writing</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                {/* 4. Speaking */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-blue-700 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Mic className="h-3.5 w-3.5" /> Speaking
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Parts 1–3 · 14m
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 truncate">
                      <strong>Part 1:</strong> {test.speakingParts[0].topic}
                    </p>
                    <p className="text-[11px] text-slate-600 truncate mt-0.5">
                      <strong>Cue Card:</strong> {test.speakingParts[1].topic}
                    </p>
                    <p className="text-[11px] text-slate-600 truncate mt-0.5">
                      <strong>Part 3:</strong> {test.speakingParts[2].topic}
                    </p>
                  </div>
                  <Link
                    href={`/ielts/speaking?book=${currentBook.bookNumber}&test=${test.testNumber}`}
                    className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-blue-700 bg-white hover:bg-blue-50 py-2 text-xs font-bold text-blue-700"
                  >
                    <span>Practice Speaking</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browse by Individual Module */}
      <div className="pt-6 border-t border-slate-200">
        <h2 className="text-xl font-extrabold text-slate-900 mb-4">
          Browse All Cambridge 9–19 Tests by Skill Module
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.href}
                href={m.href}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs hover:border-blue-500 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                      {m.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-700">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                  <span>Open Module</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default function IELTSOverviewPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />
      <Suspense fallback={<div className="p-10 text-center text-sm">Loading Cambridge IELTS 9–19 Hub...</div>}>
        <IELTSHubContent />
      </Suspense>
      <MainFooter />
    </div>
  );
}
