import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Layers,
} from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import {
  ENGLISH_LEVELS,
  ENGLISH_LESSONS_DB,
  VOCABULARY_DB,
} from "@/lib/question-bank";

const GRAMMAR_SYLLABUS = [
  "Parts of Speech",
  "Articles",
  "Pronouns",
  "Prepositions",
  "Tenses",
  "Subject-Verb Agreement",
  "Modals",
  "Voice (Active/Passive)",
  "Narration",
  "Conditionals",
  "Clauses",
  "Sentence Structure",
  "Connectors",
  "Common Errors",
];

export default function EnglishLearningHubPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <GraduationCap className="h-3.5 w-3.5" />
            Structured English Learning (Basic to Advanced)
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Master English Step by Step
          </h1>
          <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
            Progress through 5 structured levels covering Grammar, Vocabulary, Reading, Listening, Speaking, and Writing—with clear English and Bangla explanations and built-in practice.
          </p>
        </div>

        {/* 5 Levels Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ENGLISH_LEVELS.map((lvl) => (
            <Link
              key={lvl.slug}
              href={`/english/${lvl.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-blue-500 transition-all"
            >
              <div>
                <span className="inline-block rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                  {lvl.badge}
                </span>
                <h2 className="mt-3 text-lg font-extrabold text-slate-900 group-hover:text-blue-700">
                  {lvl.name}
                </h2>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  {lvl.description}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                <span>Open {lvl.name}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Grammar Core Topics & Vocabulary Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Core Grammar Topics */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4 text-blue-700" />
              Complete Grammar Curriculum
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Every grammar lesson includes rules, Bangla explanations, examples, and interactive practice questions.
            </p>
            <div className="flex flex-wrap gap-2">
              {GRAMMAR_SYLLABUS.map((topic) => (
                <Link
                  key={topic}
                  href="/english/basic"
                  className="rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50 px-3 py-1.5 text-xs font-semibold text-slate-800 transition-colors"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>

          {/* Vocabulary Builder Preview */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-700" />
                Vocabulary Builder
              </h3>
              <Link
                href="/ielts/question-types?category=Vocabulary"
                className="text-xs font-bold text-blue-700 hover:underline"
              >
                Practice Quiz →
              </Link>
            </div>
            <div className="space-y-2.5">
              {VOCABULARY_DB.slice(0, 3).map((v) => (
                <div
                  key={v.id}
                  className="rounded-xl border border-slate-200 p-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">
                      {v.word}{" "}
                      <span className="text-[11px] font-normal text-slate-500">
                        ({v.partOfSpeech})
                      </span>
                    </span>
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                      {v.difficulty}
                    </span>
                  </div>
                  <div className="mt-1 text-slate-700">
                    {v.meaningEn} — <strong>{v.meaningBn}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
