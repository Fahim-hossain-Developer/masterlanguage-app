"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Layers, Play, Filter } from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import {
  type DifficultyLevel,
  type IELTSQuestionType,
} from "@/lib/question-bank";
import {
  filterQuestionBank,
  startCustomQuestionSetAttempt,
} from "@/lib/test-engine";

const QUESTION_TYPES_LIST: IELTSQuestionType[] = [
  "True / False / Not Given",
  "Matching Headings",
  "Note Completion",
  "Multiple Choice",
  "Sentence Completion",
  "Form Completion",
  "Fill in the Blank",
  "Meaning Selection",
];

function QuestionTypesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") || "All";
  const initialType =
    (searchParams.get("type") as IELTSQuestionType) || "All";

  const [category, setCategory] = useState<string>(initialCategory);
  const [questionType, setQuestionType] = useState<IELTSQuestionType | "All">(
    initialType
  );
  const [difficulty, setDifficulty] = useState<DifficultyLevel | "All">("All");
  const [mode, setMode] = useState<"timed" | "practice">("practice");

  const matchingQuestions = filterQuestionBank({
    category,
    questionType,
    difficulty,
  });

  const handleStartFilteredPractice = () => {
    if (matchingQuestions.length === 0) return;
    const attempt = startCustomQuestionSetAttempt({
      title: `Question Type Practice: ${
        questionType === "All" ? category : questionType
      } (${difficulty})`,
      module: category === "All" ? "Question Types" : category,
      questionIds: matchingQuestions.map((q) => q.question_id),
      mode,
      durationMinutes: Math.max(5, matchingQuestions.length * 2),
      isBandScored: category === "Reading" || category === "Listening",
    });
    router.push(`/test-engine/${attempt.attemptId}`);
  };

  return (
    <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
          <Layers className="h-3.5 w-3.5" />
          Dedicated Question Types Generator
        </span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
          Practice by IELTS Question Type & Difficulty
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Choose a module, specific question type (e.g., Matching Headings, True/False/Not Given), and difficulty level (Easy / Medium / Hard) to launch a custom practice session.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs mb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
          <Filter className="h-3.5 w-3.5 text-blue-700" />
          Filter Question Bank
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Module / Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-900"
            >
              <option value="All">All Categories</option>
              <option value="Reading">IELTS Reading</option>
              <option value="Listening">IELTS Listening</option>
              <option value="Grammar">English Grammar</option>
              <option value="Vocabulary">Academic Vocabulary</option>
            </select>
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Specific Question Type
            </label>
            <select
              value={questionType}
              onChange={(e) =>
                setQuestionType(e.target.value as IELTSQuestionType | "All")
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-900"
            >
              <option value="All">All Question Types</option>
              {QUESTION_TYPES_LIST.map((qt) => (
                <option key={qt} value={qt}>
                  {qt}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Difficulty Level
            </label>
            <div className="grid grid-cols-4 gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
              {(["All", "Easy", "Medium", "Hard"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`rounded-lg py-1.5 text-xs font-bold cursor-pointer ${
                    difficulty === d
                      ? "bg-blue-700 text-white"
                      : "text-slate-600 hover:bg-slate-200/60"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Mode */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Session Mode
            </label>
            <div className="grid grid-cols-2 gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setMode("practice")}
                className={`rounded-lg py-1.5 text-xs font-bold cursor-pointer ${
                  mode === "practice"
                    ? "bg-blue-700 text-white"
                    : "text-slate-600"
                }`}
              >
                Untimed
              </button>
              <button
                type="button"
                onClick={() => setMode("timed")}
                className={`rounded-lg py-1.5 text-xs font-bold cursor-pointer ${
                  mode === "timed" ? "bg-blue-700 text-white" : "text-slate-600"
                }`}
              >
                Timed
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold text-slate-600">
            Matching Questions Found:{" "}
            <strong className="text-blue-700">{matchingQuestions.length}</strong>
          </span>

          <button
            type="button"
            disabled={matchingQuestions.length === 0}
            onClick={handleStartFilteredPractice}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-40 px-5 py-2.5 text-xs font-bold text-white cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>
              Launch Practice Set ({matchingQuestions.length} Questions)
            </span>
          </button>
        </div>
      </div>

      {/* Matching Question Preview List */}
      <div className="space-y-3">
        {matchingQuestions.map((q, idx) => (
          <div
            key={q.question_id}
            className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-extrabold text-blue-700">
                  #{idx + 1}
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                  {q.category} · {q.question_type}
                </span>
                <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                  {q.difficulty}
                </span>
                <span className="text-[11px] text-slate-400">
                  Topic: {q.topic} · Source: {q.source}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-900">
                {q.question_text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function QuestionTypesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />
      <Suspense fallback={<div className="p-10 text-center text-sm">Loading Question Types...</div>}>
        <QuestionTypesContent />
      </Suspense>
      <MainFooter />
    </div>
  );
}
