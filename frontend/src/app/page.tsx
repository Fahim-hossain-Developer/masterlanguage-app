import Link from "next/link";
import {
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Trophy,
  Layers,
  GraduationCap,
  CalendarCheck,
  Library,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Search,
} from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import {
  ENGLISH_LEVELS,
  BOOKS_DB,
  TIPS_DB,
  DAILY_PRACTICE_DB,
  TESTS_DB,
} from "@/lib/question-bank";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />

      <main className="flex-1">
        {/* ============================================================
            HERO SECTION
        ============================================================ */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700 mb-5">
                <GraduationCap className="h-4 w-4" />
                <span>Built for Students in Bangladesh · Basic English to IELTS</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Improve Your English.{" "}
                <span className="text-blue-700">Prepare Smarter for IELTS.</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                A structured, fast, and practical learning platform offering step-by-step
                English lessons (Basic to Advanced), targeted IELTS question type practice,
                daily drills, and realistic mock tests with detailed mistake review.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link
                  href="/english"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 px-6 py-3.5 text-sm font-bold text-white shadow-xs transition-colors"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/ielts/full-mock"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-6 py-3.5 text-sm font-bold text-slate-800 transition-colors"
                >
                  <Trophy className="h-4 w-4 text-blue-700" />
                  <span>Take IELTS Mock Test</span>
                </Link>
              </div>

              {/* Learning Path Strip */}
              <div className="mt-10 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-500">
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700">1. Basic English</span>
                <span>→</span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700">2. English Learning</span>
                <span>→</span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700">3. Question Types</span>
                <span>→</span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700">4. Module Practice</span>
                <span>→</span>
                <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-blue-700 font-bold">5. Full Mock & Mistake Review</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 1: IELTS PREPARATION (4 MODULES)
        ============================================================ */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                1. IELTS Preparation
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                Practice by Individual IELTS Module
              </h2>
            </div>
            <Link
              href="/ielts"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
            >
              View All IELTS Modules <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "IELTS Reading",
                desc: "Academic passages, timed & untimed modes, auto-marking, and bilingual explanations.",
                href: "/ielts/reading",
                icon: BookOpen,
                meta: "Passages · 13 Question Types",
              },
              {
                title: "IELTS Listening",
                desc: "Audio practice for Sections 1–4 with form, note, table completion, and MCQs.",
                href: "/ielts/listening",
                icon: Headphones,
                meta: "Audio Player · Auto-Marking",
              },
              {
                title: "IELTS Writing",
                desc: "Task 1 & Task 2 prompts, word-counter, timed editor, draft saving, and submission history.",
                href: "/ielts/writing",
                icon: PenTool,
                meta: "Task 1 & Task 2 Workspace",
              },
              {
                title: "IELTS Speaking",
                desc: "Part 1, 2 & 3 topics with preparation timers, speaking timers, and browser voice recorder.",
                href: "/ielts/speaking",
                icon: Mic,
                meta: "Parts 1–3 · Audio Recorder",
              },
            ].map((mod) => {
              const Icon = mod.icon;
              return (
                <Link
                  key={mod.title}
                  href={mod.href}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-blue-400 transition-all"
                >
                  <div>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700">
                      {mod.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                      {mod.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                    <span>{mod.meta}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            SECTION 2: FULL MOCK TEST
        ============================================================ */}
        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-900 to-slate-900 p-6 sm:p-10 text-white shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-800/80 border border-blue-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-200">
                  <Trophy className="h-3.5 w-3.5" />
                  2. Full IELTS Mock Test Engine
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Simulate the Complete IELTS Exam with Auto-Save & Mistake Review
                </h2>
                <p className="mt-2 text-sm text-blue-100/90 max-w-2xl leading-relaxed">
                  Powered by our reusable Test Engine. If your browser refreshes or internet disconnects, your answers and remaining time are safely preserved. Review every wrong answer with clear explanations right after submission.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-blue-200">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Auto-Save & Resume
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Configurable Band Scoring
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Mobile & Desktop Ready
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/ielts/full-mock"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-blue-50 px-5 py-3.5 text-sm font-bold text-slate-900 shadow-xs transition-colors"
                >
                  <span>Explore Full Mock Tests ({TESTS_DB.length})</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/dashboard/results"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-700 bg-blue-950/50 hover:bg-blue-900/60 px-5 py-3 text-xs font-bold text-blue-100 transition-colors"
                >
                  <span>View Sample Result & Mistake Review</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 3: ENGLISH LEARNING (BASIC -> ADVANCED)
        ============================================================ */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                3. Structured English Learning
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                Step-by-Step Levels from Basic to Advanced
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Grammar, Vocabulary, Reading, Listening, Speaking, and Writing with simple Bangla support where useful.
              </p>
            </div>
            <Link
              href="/english"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
            >
              Open English Learning Hub <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ENGLISH_LEVELS.map((lvl) => (
              <Link
                key={lvl.slug}
                href={`/english/${lvl.slug}`}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-400 transition-all"
              >
                <div>
                  <span className="inline-block rounded-md bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
                    {lvl.badge}
                  </span>
                  <h3 className="mt-2.5 text-base font-bold text-slate-900">
                    {lvl.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {lvl.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                  <span>Start Level</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ============================================================
            SECTION 4 & 5: QUESTION TYPE PRACTICE + DAILY PRACTICE
        ============================================================ */}
        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 4. Question Type Practice */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                  <Layers className="h-4 w-4" />
                  4. Question Type Practice
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  Easy · Medium · Hard
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Target Weak Question Types Specifically
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Struggling with Matching Headings, True/False/Not Given, or Note Completion? Filter our Question Bank by type, difficulty, and mode to practice only what you need.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "True / False / Not Given",
                  "Matching Headings",
                  "Note Completion",
                  "Multiple Choice",
                  "Sentence Completion",
                  "Form Completion",
                ].map((qt) => (
                  <Link
                    key={qt}
                    href={`/ielts/question-types?type=${encodeURIComponent(qt)}`}
                    className="rounded-lg border border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors"
                  >
                    {qt}
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/ielts/question-types"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 px-4 py-2.5 text-xs font-bold text-white"
                >
                  <span>Configure Custom Question Set</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 5. Daily Practice */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                  <CalendarCheck className="h-4 w-4" />
                  5. Modular Daily Practice
                </span>
                <Link
                  href="/daily-practice"
                  className="text-xs font-bold text-blue-700 hover:underline"
                >
                  All Sets →
                </Link>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Short 5–12 Minute Daily Drills
              </h3>
              <p className="mt-1.5 text-xs text-slate-600">
                Consistent daily practice across Grammar, Vocabulary, Reading, and Listening powered by the Test Engine.
              </p>

              <div className="mt-4 space-y-2.5">
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
                        <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-700">
                          {set.difficulty}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">
                        {set.category} · {set.durationMinutes} min · {set.questionIds.length} questions
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-blue-700 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 6 & 7: ENGLISH BOOKS + IELTS TIPS & TRICKS
        ============================================================ */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 6. English Books Library */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                    <Library className="h-4 w-4" />
                    6. Digital English Books
                  </span>
                  <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                    Read Handbooks with Built-in Reader
                  </h2>
                </div>
                <Link
                  href="/books"
                  className="text-xs font-bold text-blue-700 hover:underline"
                >
                  Browse Library →
                </Link>
              </div>

              <div className="space-y-3">
                {BOOKS_DB.map((book) => (
                  <Link
                    key={book.id}
                    href={`/books/${book.slug}`}
                    className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 hover:border-blue-400 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                          {book.category}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Level: {book.level}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {book.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                        {book.description}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-blue-700">
                      Read
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 7. IELTS Tips & Tricks */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                    <Lightbulb className="h-4 w-4" />
                    7. IELTS Tips & Tricks
                  </span>
                  <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                    Practical Exam Strategies & Guides
                  </h2>
                </div>
                <Link
                  href="/tips"
                  className="text-xs font-bold text-blue-700 hover:underline"
                >
                  All Articles →
                </Link>
              </div>

              <div className="space-y-3">
                {TIPS_DB.map((tip) => (
                  <Link
                    key={tip.id}
                    href={`/tips/${tip.slug}`}
                    className="block rounded-2xl border border-slate-200 bg-white p-4 hover:border-blue-400 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                        {tip.category}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {tip.readTime}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {tip.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                      {tip.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
}
