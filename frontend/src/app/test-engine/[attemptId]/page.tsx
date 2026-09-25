"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  CheckCircle2,
  Bookmark,
  Flag,
  ChevronLeft,
  ChevronRight,
  Send,
  Volume2,
  Play,
  Pause,
  BookOpen,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getActiveAttemptById,
  startStandardTestAttempt,
  autoSaveAttemptState,
  submitTestAttempt,
  getQuestionById,
  getPassageById,
  toggleBookmarkItem,
  isItemBookmarked,
  type ActiveTestAttempt,
} from "@/lib/test-engine";

export default function UnifiedTestEnginePage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = use(params);
  const router = useRouter();

  const [attempt, setAttempt] = useState<ActiveTestAttempt | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [mobileTab, setMobileTab] = useState<"passage" | "questions">("questions");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});
  const [lastSavedText, setLastSavedText] = useState("Auto-saved");

  // Load or initialize attempt on mount (Resume support)
  useEffect(() => {
    let loaded = getActiveAttemptById(attemptId);
    if (!loaded) {
      // If user navigated with a testId/slug directly, start or resume it
      loaded = startStandardTestAttempt(attemptId, "timed");
    }
    setAttempt(loaded);

    // Initialize bookmark states
    const bm: Record<string, boolean> = {};
    loaded.sections.forEach((sec) =>
      sec.questionIds.forEach((qId) => {
        bm[qId] = isItemBookmarked(qId);
      })
    );
    setBookmarkedMap(bm);
  }, [attemptId]);

  // Timestamp-safe countdown timer & auto-submit when expired
  useEffect(() => {
    if (!attempt || !attempt.expiresAt) {
      setSecondsLeft(null);
      return;
    }

    const updateClock = () => {
      const diffSec = Math.max(
        0,
        Math.floor((attempt.expiresAt! - Date.now()) / 1000)
      );
      setSecondsLeft(diffSec);
      if (diffSec === 0) {
        const res = submitTestAttempt(attempt.attemptId);
        if (res) {
          router.push(`/dashboard/results/${res.attemptId}`);
        }
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [attempt, router]);

  if (!attempt) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-blue-700 border-t-transparent" />
          <p className="mt-3 text-sm font-semibold text-slate-700">
            Loading Test Engine & Restoring Saved State...
          </p>
        </div>
      </div>
    );
  }

  const currentSection =
    attempt.sections[attempt.currentSectionIdx] || attempt.sections[0];
  const passage = getPassageById(currentSection.passageId);
  const sectionQuestions = currentSection.questionIds
    .map((id) => getQuestionById(id))
    .filter((q): q is NonNullable<typeof q> => Boolean(q));

  const allQuestionIds = attempt.sections.flatMap((s) => s.questionIds);
  const totalQuestions = allQuestionIds.length;
  const answeredCount = allQuestionIds.filter(
    (qId) => (attempt.answers[qId] || "").trim().length > 0
  ).length;
  const unansweredCount = totalQuestions - answeredCount;

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(rem).padStart(2, "0")}`;
  };

  const handleAnswerChange = (questionId: string, val: string) => {
    const nextAnswers = { ...attempt.answers, [questionId]: val };
    const updated = autoSaveAttemptState(attempt.attemptId, {
      answers: nextAnswers,
    });
    if (updated) {
      setAttempt(updated);
      setLastSavedText("Saved just now");
    }
  };

  const handleToggleReviewFlag = (questionId: string) => {
    const exists = attempt.markedForReview.includes(questionId);
    const nextFlags = exists
      ? attempt.markedForReview.filter((id) => id !== questionId)
      : [...attempt.markedForReview, questionId];
    const updated = autoSaveAttemptState(attempt.attemptId, {
      markedForReview: nextFlags,
    });
    if (updated) setAttempt(updated);
  };

  const handleToggleBookmarkQuestion = (qId: string, qText: string, qType: string) => {
    const nowSaved = toggleBookmarkItem({
      id: qId,
      type: "Question",
      title: qText,
      subtitle: `${attempt.module} · ${qType}`,
      href: `/ielts/question-types`,
    });
    setBookmarkedMap((prev) => ({ ...prev, [qId]: nowSaved }));
  };

  const handleSelectSection = (secIdx: number) => {
    const updated = autoSaveAttemptState(attempt.attemptId, {
      currentSectionIdx: secIdx,
      currentQuestionIdx: 0,
    });
    if (updated) setAttempt(updated);
  };

  const handleFinalSubmit = () => {
    const res = submitTestAttempt(attempt.attemptId);
    if (res) {
      router.push(`/dashboard/results/${res.attemptId}`);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-slate-50 text-slate-900 overflow-hidden">
      {/* ============================================================
          TOP EXAM HEADER BAR (TIMER + AUTO-SAVE + SUBMIT)
      ============================================================ */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 sm:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/dashboard"
            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 shrink-0"
          >
            ← Save & Exit
          </Link>
          <div className="truncate">
            <h1 className="truncate text-xs sm:text-sm font-extrabold text-slate-900">
              {attempt.title}
            </h1>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="h-3 w-3" /> {lastSavedText}
              </span>
              <span>·</span>
              <span>
                Answered: <strong>{answeredCount}/{totalQuestions}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Center Timer */}
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5">
          <Clock
            className={cn(
              "h-4 w-4",
              secondsLeft !== null && secondsLeft < 300
                ? "text-rose-600 animate-pulse"
                : "text-blue-700"
            )}
          />
          {secondsLeft !== null ? (
            <span
              className={cn(
                "font-mono text-xs sm:text-sm font-extrabold",
                secondsLeft < 300 ? "text-rose-600" : "text-slate-900"
              )}
            >
              {formatTimer(secondsLeft)}
            </span>
          ) : (
            <span className="text-xs font-bold text-emerald-700">
              Untimed Practice
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={() => setConfirmSubmitOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 px-3.5 sm:px-4 py-2 text-xs font-bold text-white shadow-2xs cursor-pointer shrink-0"
        >
          <Send className="h-3.5 w-3.5" />
          <span>Submit Test</span>
        </button>
      </header>

      {/* ============================================================
          SECTION SWITCHER + MOBILE TAB BAR
      ============================================================ */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-100/80 px-3 py-2 sm:px-6">
        {/* Section Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {attempt.sections.map((sec, idx) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => handleSelectSection(idx)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer shrink-0",
                attempt.currentSectionIdx === idx
                  ? "bg-blue-700 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200"
              )}
            >
              {sec.title}
            </button>
          ))}
        </div>

        {/* Mobile Segmented Switcher (Only needed when section has a passage) */}
        {passage && (
          <div className="flex lg:hidden rounded-lg border border-slate-300 bg-white p-0.5">
            <button
              type="button"
              onClick={() => setMobileTab("passage")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-bold",
                mobileTab === "passage"
                  ? "bg-blue-700 text-white"
                  : "text-slate-600"
              )}
            >
              📖 Passage
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("questions")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-bold",
                mobileTab === "questions"
                  ? "bg-blue-700 text-white"
                  : "text-slate-600"
              )}
            >
              ✍️ Questions ({sectionQuestions.length})
            </button>
          </div>
        )}
      </div>

      {/* ============================================================
          AUDIO BAR (IF LISTENING SECTION)
      ============================================================ */}
      {currentSection.audioUrl && (
        <div className="flex shrink-0 items-center justify-between border-b border-blue-200 bg-blue-50/70 px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setAudioPlaying(!audioPlaying)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700 text-white hover:bg-blue-800 cursor-pointer"
            >
              {audioPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 fill-current" />
              )}
            </button>
            <div>
              <div className="text-xs font-bold text-slate-900">
                {currentSection.audioTitle || "IELTS Listening Audio Track"}
              </div>
              <div className="text-[11px] text-slate-600">
                {audioPlaying
                  ? "Playing audio stream (01:18 / 06:40)..."
                  : "Click Play to listen and answer questions below"}
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-blue-700">
            <Volume2 className="h-4 w-4" /> Audio Ready
          </div>
        </div>
      )}

      {/* ============================================================
          MAIN CONTENT AREA (SPLIT-PANE ON DESKTOP, TABBED ON MOBILE)
      ============================================================ */}
      <div
        className={cn(
          "flex-1 overflow-hidden",
          passage ? "grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-slate-200" : "block"
        )}
      >
        {/* LEFT PANE: READING PASSAGE (IF PRESENT) */}
        {passage && (
          <div
            className={cn(
              "h-full overflow-y-auto bg-white p-5 sm:p-8",
              mobileTab === "questions" ? "hidden lg:block" : "block"
            )}
          >
            <div className="mx-auto max-w-2xl">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
                  <BookOpen className="h-3.5 w-3.5" />
                  READING PASSAGE · {passage.difficulty.toUpperCase()}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  Source: {passage.source}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {passage.title}
              </h2>
              {passage.subtitle && (
                <p className="mt-1.5 text-xs sm:text-sm italic text-slate-600">
                  {passage.subtitle}
                </p>
              )}

              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-800">
                {passage.paragraphs.map((para, idx) => (
                  <p key={idx}>
                    {para.label && (
                      <strong className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded bg-slate-100 text-xs font-extrabold text-blue-700">
                        {para.label}
                      </strong>
                    )}
                    {para.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RIGHT PANE (OR FULL WIDTH): QUESTIONS LIST */}
        <div
          className={cn(
            "h-full overflow-y-auto bg-slate-50 p-4 sm:p-8",
            passage && mobileTab === "passage" ? "hidden lg:block" : "block"
          )}
        >
          <div className="mx-auto max-w-2xl space-y-4">
            {sectionQuestions.map((q, idx) => {
              const globalNum =
                attempt.sections
                  .slice(0, attempt.currentSectionIdx)
                  .reduce((acc, s) => acc + s.questionIds.length, 0) +
                idx +
                1;
              const userVal = attempt.answers[q.question_id] || "";
              const isFlagged = attempt.markedForReview.includes(q.question_id);
              const isSaved = Boolean(bookmarkedMap[q.question_id]);

              return (
                <div
                  key={q.question_id}
                  id={`q-card-${q.question_id}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
                >
                  {/* Question Meta Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-700 text-xs font-extrabold text-white">
                        {globalNum}
                      </span>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                        {q.question_type}
                      </span>
                      <span
                        className={cn(
                          "rounded-md px-2 py-0.5 text-[10px] font-bold",
                          q.difficulty === "Easy"
                            ? "bg-emerald-50 text-emerald-700"
                            : q.difficulty === "Medium"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-rose-50 text-rose-700"
                        )}
                      >
                        {q.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggleReviewFlag(q.question_id)}
                        title="Mark question for review"
                        className={cn(
                          "inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-semibold cursor-pointer",
                          isFlagged
                            ? "border-amber-400 bg-amber-50 text-amber-700"
                            : "border-slate-200 text-slate-500 hover:bg-slate-50"
                        )}
                      >
                        <Flag className="h-3 w-3" />
                        <span>{isFlagged ? "Flagged" : "Review"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleToggleBookmarkQuestion(
                            q.question_id,
                            q.question_text,
                            q.question_type
                          )
                        }
                        title="Bookmark question for later"
                        className={cn(
                          "inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-semibold cursor-pointer",
                          isSaved
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-slate-200 text-slate-500 hover:bg-slate-50"
                        )}
                      >
                        <Bookmark className="h-3 w-3" />
                        <span>{isSaved ? "Saved" : "Save"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Optional Instruction */}
                  {q.instruction && (
                    <p className="mb-2.5 text-xs font-medium text-slate-500">
                      {q.instruction}
                    </p>
                  )}

                  {/* Question Prompt */}
                  <p className="text-sm font-bold text-slate-900 leading-relaxed">
                    {q.question_text}
                  </p>

                  {/* Answer Input: Options vs Text Input */}
                  {q.options && q.options.length > 0 ? (
                    <div className="mt-4 space-y-2">
                      {q.options.map((opt) => {
                        const selected = userVal === opt.label;
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() =>
                              handleAnswerChange(q.question_id, opt.label)
                            }
                            className={cn(
                              "w-full flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                              selected
                                ? "border-blue-700 bg-blue-50/80 text-blue-900"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold",
                                selected
                                  ? "bg-blue-700 text-white"
                                  : "bg-slate-100 text-slate-600"
                              )}
                            >
                              {opt.label}
                            </span>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-4">
                      <input
                        type="text"
                        value={userVal}
                        onChange={(e) =>
                          handleAnswerChange(q.question_id, e.target.value)
                        }
                        placeholder="Type your answer here..."
                        className="w-full sm:w-80 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:bg-white focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================
          BOTTOM QUESTION NAVIGATOR PALETTE & PREV/NEXT
      ============================================================ */}
      <footer className="flex h-14 shrink-0 items-center justify-between border-t border-slate-200 bg-white px-3 sm:px-6 overflow-x-auto gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {allQuestionIds.map((qId, idx) => {
            const qNum = idx + 1;
            const hasAns = Boolean((attempt.answers[qId] || "").trim());
            const isFlag = attempt.markedForReview.includes(qId);
            return (
              <a
                key={qId}
                href={`#q-card-${qId}`}
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors",
                  isFlag
                    ? "bg-amber-500 text-white"
                    : hasAns
                    ? "bg-blue-700 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                {qNum}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {attempt.currentSectionIdx > 0 && (
            <button
              type="button"
              onClick={() => handleSelectSection(attempt.currentSectionIdx - 1)}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Prev Section
            </button>
          )}
          {attempt.currentSectionIdx < attempt.sections.length - 1 ? (
            <button
              type="button"
              onClick={() => handleSelectSection(attempt.currentSectionIdx + 1)}
              className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 cursor-pointer"
            >
              Next Section <ChevronRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmSubmitOpen(true)}
              className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 cursor-pointer"
            >
              <CheckCircle2 className="h-3.5 w-3.5" /> Finish & Review
            </button>
          )}
        </div>
      </footer>

      {/* ============================================================
          SUBMIT CONFIRMATION MODAL (REVIEW UNANSWERED QUESTIONS)
      ============================================================ */}
      {confirmSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-extrabold text-slate-900">
              Submit Your Test?
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Check your progress before generating your score and mistake review.
            </p>

            <div className="my-5 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-slate-50 p-3">
                <span className="block text-[10px] font-bold uppercase text-slate-400">
                  Total
                </span>
                <span className="text-lg font-extrabold text-slate-900">
                  {totalQuestions}
                </span>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3">
                <span className="block text-[10px] font-bold uppercase text-emerald-700">
                  Answered
                </span>
                <span className="text-lg font-extrabold text-emerald-700">
                  {answeredCount}
                </span>
              </div>
              <div className="rounded-xl bg-amber-50 p-3">
                <span className="block text-[10px] font-bold uppercase text-amber-700">
                  Unanswered
                </span>
                <span className="text-lg font-extrabold text-amber-700">
                  {unansweredCount}
                </span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <div className="mb-5 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-800">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                <span>
                  You still have <strong>{unansweredCount} unanswered</strong>{" "}
                  question(s). There is no negative marking in IELTS—consider
                  answering all questions before submitting.
                </span>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmSubmitOpen(false)}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Keep Working
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="flex-1 rounded-xl bg-blue-700 py-2.5 text-xs font-bold text-white hover:bg-blue-800 cursor-pointer"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
