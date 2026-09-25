"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bookmark,
  Filter,
} from "lucide-react";
import {
  getResultByAttemptId,
  toggleBookmarkItem,
  isItemBookmarked,
  type TestResultRecord,
} from "@/lib/test-engine";

export default function DetailedResultAndMistakeReviewPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = use(params);
  const [result, setResult] = useState<TestResultRecord | null>(null);
  const [filterMode, setFilterMode] = useState<
    "all" | "wrong" | "unanswered" | "correct"
  >("wrong");
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const r = getResultByAttemptId(attemptId);
    setResult(r);
    if (r) {
      // If user got everything right, default to "all"
      if (r.incorrectCount === 0) {
        setFilterMode("all");
      }
      const bm: Record<string, boolean> = {};
      r.reviews.forEach((item) => {
        bm[item.question.question_id] = isItemBookmarked(
          item.question.question_id
        );
      });
      setBookmarks(bm);
    }
  }, [attemptId]);

  if (!result) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <p className="text-sm font-semibold text-slate-600">
          Loading Result & Mistake Review...
        </p>
      </div>
    );
  }

  const filteredReviews = result.reviews.filter((item) => {
    if (filterMode === "wrong") return !item.isCorrect && !item.isUnanswered;
    if (filterMode === "unanswered") return item.isUnanswered;
    if (filterMode === "correct") return item.isCorrect;
    return true;
  });

  const handleBookmark = (qId: string, qText: string, qType: string) => {
    const saved = toggleBookmarkItem({
      id: qId,
      type: "Question",
      title: qText,
      subtitle: `${result.module} · ${qType}`,
      href: `/dashboard/results/${result.attemptId}`,
    });
    setBookmarks((prev) => ({ ...prev, [qId]: saved }));
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <Link
        href="/dashboard/results"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to All Test Results
      </Link>

      {/* ============================================================
          SCORE SUMMARY CARD
      ============================================================ */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
              {result.module} · {result.mode.toUpperCase()}
            </span>
            <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
              {result.title}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Completed on {new Date(result.submittedAt).toLocaleString()}
            </p>
          </div>

          {result.bandScore !== null && (
            <div className="rounded-2xl bg-blue-700 px-6 py-4 text-center text-white shrink-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-blue-200">
                Estimated Band Score
              </span>
              <span className="text-3xl font-extrabold">
                {result.bandScore.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="rounded-xl bg-slate-50 p-3.5">
            <span className="block text-[11px] font-bold uppercase text-slate-400">
              Total Questions
            </span>
            <span className="mt-1 block text-xl font-extrabold text-slate-900">
              {result.totalQuestions}
            </span>
          </div>
          <div className="rounded-xl bg-emerald-50 p-3.5">
            <span className="block text-[11px] font-bold uppercase text-emerald-700">
              Correct
            </span>
            <span className="mt-1 block text-xl font-extrabold text-emerald-700">
              {result.correctCount}
            </span>
          </div>
          <div className="rounded-xl bg-rose-50 p-3.5">
            <span className="block text-[11px] font-bold uppercase text-rose-700">
              Wrong Answers
            </span>
            <span className="mt-1 block text-xl font-extrabold text-rose-700">
              {result.incorrectCount}
            </span>
          </div>
          <div className="rounded-xl bg-amber-50 p-3.5">
            <span className="block text-[11px] font-bold uppercase text-amber-700">
              Unanswered
            </span>
            <span className="mt-1 block text-xl font-extrabold text-amber-700">
              {result.unansweredCount}
            </span>
          </div>
          <div className="rounded-xl bg-blue-50 p-3.5 col-span-2 sm:col-span-1">
            <span className="block text-[11px] font-bold uppercase text-blue-700">
              Accuracy
            </span>
            <span className="mt-1 block text-xl font-extrabold text-blue-700">
              {result.accuracyPct}%
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================
          WRONG ANSWER REVIEW ("REVIEW MISTAKES") FILTER BAR
      ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
          <Filter className="h-4 w-4 text-blue-700" />
          <span>Review Mistakes & Explanations</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[
            {
              key: "wrong" as const,
              label: `Review Mistakes (${result.incorrectCount})`,
            },
            {
              key: "unanswered" as const,
              label: `Unanswered (${result.unansweredCount})`,
            },
            {
              key: "correct" as const,
              label: `Correct (${result.correctCount})`,
            },
            {
              key: "all" as const,
              label: `All Questions (${result.totalQuestions})`,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilterMode(tab.key)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold cursor-pointer transition-colors ${
                filterMode === tab.key
                  ? "bg-blue-700 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================
          QUESTION-BY-QUESTION MISTAKE ANALYSIS LIST
      ============================================================ */}
      {filteredReviews.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm font-bold text-slate-800">
            No questions match this filter.
          </p>
          <button
            type="button"
            onClick={() => setFilterMode("all")}
            className="mt-3 rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white cursor-pointer"
          >
            Show All Questions
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((item) => {
            const q = item.question;
            const saved = Boolean(bookmarks[q.question_id]);

            return (
              <div
                key={q.question_id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white">
                      Q{item.questionNum}
                    </span>

                    {item.isCorrect ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Correct
                      </span>
                    ) : item.isUnanswered ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                        <HelpCircle className="h-3.5 w-3.5" /> Unanswered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700">
                        <XCircle className="h-3.5 w-3.5" /> Wrong Answer
                      </span>
                    )}

                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                      {q.question_type} · {q.difficulty}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleBookmark(
                        q.question_id,
                        q.question_text,
                        q.question_type
                      )
                    }
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-bold cursor-pointer ${
                      saved
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Bookmark className="h-3.5 w-3.5" />
                    <span>{saved ? "Bookmarked" : "Save Question"}</span>
                  </button>
                </div>

                <p className="text-sm font-bold text-slate-900 leading-relaxed">
                  {q.question_text}
                </p>

                {/* Student Answer vs Correct Answer Comparison */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    className={`rounded-xl border p-3.5 text-xs ${
                      item.isCorrect
                        ? "border-emerald-200 bg-emerald-50/60 text-emerald-900"
                        : "border-rose-200 bg-rose-50/60 text-rose-900"
                    }`}
                  >
                    <span className="block text-[10px] font-bold uppercase opacity-75">
                      Your Answer
                    </span>
                    <span className="mt-1 block text-sm font-extrabold">
                      {item.userAnswer || "(No Answer Provided)"}
                    </span>
                  </div>

                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 text-xs text-emerald-900">
                    <span className="block text-[10px] font-bold uppercase opacity-75">
                      Correct Answer
                    </span>
                    <span className="mt-1 block text-sm font-extrabold">
                      {q.correct_answer}
                    </span>
                  </div>
                </div>

                {/* Detailed Explanation (English + Bangla) */}
                <div className="mt-4 rounded-xl bg-slate-50 p-4 border border-slate-200/80 space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                    Explanation
                  </div>
                  <p className="text-xs leading-relaxed text-slate-700">
                    {q.explanation}
                  </p>
                  {q.explanation_bn && (
                    <p className="text-xs leading-relaxed text-slate-800 font-medium pt-1 border-t border-slate-200/60">
                      <strong>বাংলা ব্যাখ্যা:</strong> {q.explanation_bn}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
