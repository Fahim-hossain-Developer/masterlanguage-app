"use client";

import { useState } from "react";
import Link from "next/link";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import {
  TESTS_DB,
  QUESTION_BANK,
  ENGLISH_LESSONS_DB,
  BOOKS_DB,
  TIPS_DB,
} from "@/lib/question-bank";

export default function GlobalSearchPage() {
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState<
    "All" | "IELTS" | "Questions" | "Lessons" | "Books" | "Tips"
  >("All");

  const qLower = query.trim().toLowerCase();

  const matchedTests = TESTS_DB.filter(
    (t) =>
      !qLower ||
      t.title.toLowerCase().includes(qLower) ||
      t.subtitle.toLowerCase().includes(qLower)
  );
  const matchedQuestions = QUESTION_BANK.filter(
    (q) =>
      !qLower ||
      q.question_text.toLowerCase().includes(qLower) ||
      q.topic.toLowerCase().includes(qLower) ||
      q.question_type.toLowerCase().includes(qLower)
  );
  const matchedLessons = ENGLISH_LESSONS_DB.filter(
    (l) =>
      !qLower ||
      l.title.toLowerCase().includes(qLower) ||
      l.topic.toLowerCase().includes(qLower)
  );
  const matchedBooks = BOOKS_DB.filter(
    (b) =>
      !qLower ||
      b.title.toLowerCase().includes(qLower) ||
      b.description.toLowerCase().includes(qLower)
  );
  const matchedTips = TIPS_DB.filter(
    (t) =>
      !qLower ||
      t.title.toLowerCase().includes(qLower) ||
      t.summary.toLowerCase().includes(qLower)
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />

      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Search Across All Learning Content
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Find IELTS tests, specific Question Bank items, Grammar lessons, Books, and Tips.
          </p>
        </div>

        {/* Search Input & Type Filter */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search e.g. 'Matching Headings', 'Conditionals', 'Micro-forests', 'True False'..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm font-semibold text-slate-900 focus:border-blue-700 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(["All", "IELTS", "Questions", "Lessons", "Books", "Tips"] as const).map(
              (tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilterType(tab)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold cursor-pointer ${
                    filterType === tab
                      ? "bg-blue-700 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {(filterType === "All" || filterType === "IELTS") &&
            matchedTests.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  IELTS Tests ({matchedTests.length})
                </h2>
                <div className="space-y-2">
                  {matchedTests.map((t) => (
                    <Link
                      key={t.id}
                      href="/ielts/full-mock"
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-500"
                    >
                      <div>
                        <span className="text-sm font-bold text-slate-900">
                          {t.title}
                        </span>
                        <p className="text-xs text-slate-500">{t.subtitle}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-blue-700" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

          {(filterType === "All" || filterType === "Lessons") &&
            matchedLessons.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  English Lessons ({matchedLessons.length})
                </h2>
                <div className="space-y-2">
                  {matchedLessons.map((l) => (
                    <Link
                      key={l.id}
                      href={`/english/${l.level}`}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-500"
                    >
                      <div>
                        <span className="text-xs font-bold text-blue-700">
                          {l.levelLabel} · {l.skill}
                        </span>
                        <div className="text-sm font-bold text-slate-900">
                          {l.title}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-blue-700" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

          {(filterType === "All" || filterType === "Questions") &&
            matchedQuestions.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Question Bank Items ({matchedQuestions.length})
                </h2>
                <div className="space-y-2">
                  {matchedQuestions.slice(0, 6).map((q) => (
                    <Link
                      key={q.question_id}
                      href={`/ielts/question-types?type=${encodeURIComponent(
                        q.question_type
                      )}`}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-500"
                    >
                      <div>
                        <span className="text-xs font-bold text-blue-700">
                          {q.category} · {q.question_type} · {q.difficulty}
                        </span>
                        <div className="text-sm font-semibold text-slate-900">
                          {q.question_text}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-blue-700 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

          {(filterType === "All" || filterType === "Books") &&
            matchedBooks.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  English Books ({matchedBooks.length})
                </h2>
                <div className="space-y-2">
                  {matchedBooks.map((b) => (
                    <Link
                      key={b.id}
                      href={`/books/${b.slug}`}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-500"
                    >
                      <div>
                        <span className="text-sm font-bold text-slate-900">
                          {b.title}
                        </span>
                        <p className="text-xs text-slate-500">{b.category}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-blue-700" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

          {(filterType === "All" || filterType === "Tips") &&
            matchedTips.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  IELTS Tips & Tricks ({matchedTips.length})
                </h2>
                <div className="space-y-2">
                  {matchedTips.map((t) => (
                    <Link
                      key={t.id}
                      href={`/tips/${t.slug}`}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-500"
                    >
                      <div>
                        <span className="text-sm font-bold text-slate-900">
                          {t.title}
                        </span>
                        <p className="text-xs text-slate-500">{t.category}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-blue-700" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
