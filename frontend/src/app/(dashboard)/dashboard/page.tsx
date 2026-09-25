"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  ArrowRight,
  RotateCcw,
  Bookmark,
  CalendarCheck,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
} from "lucide-react";
import { DAILY_PRACTICE_DB, ENGLISH_LESSONS_DB } from "@/lib/question-bank";
import {
  getContinueLearningState,
  getAllCompletedResults,
  getSavedBookmarks,
  getLatestActiveAttempt,
  getCompletedLessonIds,
  type ContinueLearningState,
  type TestResultRecord,
  type SavedBookmarkItem,
  type ActiveTestAttempt,
} from "@/lib/test-engine";

export default function StudentDashboardPage() {
  const [continueState, setContinueState] =
    useState<ContinueLearningState | null>(null);
  const [recentResults, setRecentResults] = useState<TestResultRecord[]>([]);
  const [bookmarks, setBookmarks] = useState<SavedBookmarkItem[]>([]);
  const [activeAttempt, setActiveAttempt] = useState<ActiveTestAttempt | null>(
    null
  );
  const [completedLessonsCount, setCompletedLessonsCount] = useState(1);

  useEffect(() => {
    setContinueState(getContinueLearningState());
    setRecentResults(getAllCompletedResults());
    setBookmarks(getSavedBookmarks());
    setActiveAttempt(getLatestActiveAttempt());
    setCompletedLessonIdsCount();
  }, []);

  const setCompletedLessonIdsCount = () => {
    setCompletedLessonsCount(getCompletedLessonIds().length);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* ============================================================
          1. WELCOME MESSAGE & BASIC PROGRESS SUMMARY
      ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Student Dashboard
          </span>
          <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
            Welcome back! Ready for today&apos;s practice?
          </h1>
          <p className="mt-1 text-xs text-slate-600">
            Pick up right where you left off in your English lessons or review your recent IELTS test mistakes.
          </p>
        </div>

        {/* Simple Progress Pill */}
        <div className="flex flex-wrap gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-center">
            <span className="block text-[10px] font-bold uppercase text-slate-400">
              Completed Lessons
            </span>
            <span className="text-base font-extrabold text-slate-900">
              {completedLessonsCount} / {ENGLISH_LESSONS_DB.length}
            </span>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-center">
            <span className="block text-[10px] font-bold uppercase text-slate-400">
              Completed Tests
            </span>
            <span className="text-base font-extrabold text-blue-700">
              {recentResults.length}
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================
          OPTIONAL: RESUME AUTO-SAVED TEST BANNER
      ============================================================ */}
      {activeAttempt && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-amber-300 bg-amber-50/90 p-5">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
              <RotateCcw className="h-3.5 w-3.5" /> Resume In-Progress Test
            </span>
            <h2 className="mt-1 text-base font-extrabold text-slate-900">
              {activeAttempt.title}
            </h2>
            <p className="text-xs text-slate-600">
              Auto-saved with {Object.keys(activeAttempt.answers).length} answered question(s).
            </p>
          </div>
          <Link
            href={`/test-engine/${activeAttempt.attemptId}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 px-5 py-2.5 text-xs font-bold text-white shrink-0"
          >
            <span>Continue Test</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* ============================================================
          2. CONTINUE LEARNING + RECENT TEST RESULT (2-COLUMN)
      ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Where You Left Off */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                <GraduationCap className="h-4 w-4" />
                Continue Learning
              </span>
              <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                {continueState?.levelLabel || "Intermediate"} →{" "}
                {continueState?.skill || "Grammar"}
              </span>
            </div>

            <h2 className="text-lg font-extrabold text-slate-900">
              {continueState?.lessonTitle ||
                "English Grammar: Conditionals (Zero, First, Second & Third)"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              You were studying:{" "}
              <strong>
                {continueState?.levelLabel || "Intermediate"} →{" "}
                {continueState?.skill || "Grammar"} →{" "}
                {continueState?.topic || "Conditionals"}
              </strong>
            </p>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
                <span>Lesson Progress</span>
                <span className="font-bold text-blue-700">
                  {continueState?.progressPct ?? 65}%
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-700 transition-all"
                  style={{ width: `${continueState?.progressPct ?? 65}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/english"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900"
            >
              Change Level
            </Link>
            <Link
              href={continueState?.lessonHref || "/english/intermediate"}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 px-4 py-2.5 text-xs font-bold text-white"
            >
              <span>Continue Lesson</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Recent Test & Mistake Review */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                <FileCheck2 className="h-4 w-4" />
                Recent Test Result
              </span>
              <Link
                href="/dashboard/results"
                className="text-xs font-bold text-blue-700 hover:underline"
              >
                All History →
              </Link>
            </div>

            {recentResults[0] ? (
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  {recentResults[0].title}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Module: <strong>{recentResults[0].module}</strong> · Mode:{" "}
                  {recentResults[0].mode}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <span className="block text-[10px] font-bold uppercase text-slate-400">
                      Score
                    </span>
                    <span className="text-base font-extrabold text-slate-900">
                      {recentResults[0].correctCount}/
                      {recentResults[0].totalQuestions}
                    </span>
                  </div>
                  <div className="rounded-xl bg-rose-50 p-3">
                    <span className="block text-[10px] font-bold uppercase text-rose-700">
                      Mistakes
                    </span>
                    <span className="text-base font-extrabold text-rose-700">
                      {recentResults[0].incorrectCount}
                    </span>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-3">
                    <span className="block text-[10px] font-bold uppercase text-blue-700">
                      Band Est.
                    </span>
                    <span className="text-base font-extrabold text-blue-700">
                      {recentResults[0].bandScore ?? "—"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">No tests completed yet.</p>
            )}
          </div>

          {recentResults[0] && (
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Review explanations for wrong answers
              </span>
              <Link
                href={`/dashboard/results/${recentResults[0].attemptId}`}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-2.5 text-xs font-bold text-white"
              >
                <span>Review Mistakes</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================
          3. QUICK PRACTICE SHORTCUTS (4 IELTS MODULES)
      ============================================================ */}
      <div>
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-3">
          Quick IELTS Module Practice
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Reading", href: "/ielts/reading", icon: BookOpen, sub: "Passages & Types" },
            { label: "Listening", href: "/ielts/listening", icon: Headphones, sub: "Audio Sections" },
            { label: "Writing", href: "/ielts/writing", icon: PenTool, sub: "Task 1 & Task 2" },
            { label: "Speaking", href: "/ielts/speaking", icon: Mic, sub: "Parts 1, 2 & 3" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 hover:border-blue-500 transition-all"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-slate-500">{item.sub}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          4. SAVED / BOOKMARKED CONTENT + DAILY PRACTICE
      ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Saved Items */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-blue-700" />
              Saved / Bookmarked Content
            </h3>
            <Link
              href="/dashboard/saved"
              className="text-xs font-bold text-blue-700 hover:underline"
            >
              View All ({bookmarks.length}) →
            </Link>
          </div>

          <div className="space-y-2.5">
            {bookmarks.slice(0, 3).map((bm) => (
              <Link
                key={bm.id}
                href={bm.href}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-3 hover:border-blue-400 transition-colors"
              >
                <div>
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                    {bm.type}
                  </span>
                  <div className="mt-1 text-xs font-bold text-slate-900">
                    {bm.title}
                  </div>
                  <div className="text-[11px] text-slate-500">{bm.subtitle}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Daily Practice */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-blue-700" />
              Today&apos;s Daily Practice Sets
            </h3>
            <Link
              href="/daily-practice"
              className="text-xs font-bold text-blue-700 hover:underline"
            >
              Open Daily Hub →
            </Link>
          </div>

          <div className="space-y-2.5">
            {DAILY_PRACTICE_DB.slice(0, 3).map((set) => (
              <Link
                key={set.id}
                href={`/daily-practice?start=${set.id}`}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-3 hover:border-blue-400 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {set.title}
                    </span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-700">
                      {set.difficulty}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {set.category} · {set.durationMinutes} mins ·{" "}
                    {set.questionIds.length} questions
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-blue-700 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
