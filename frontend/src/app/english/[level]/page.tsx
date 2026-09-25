"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Bookmark,
  Play,
  Plus,
} from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import {
  ENGLISH_LEVELS,
  VOCABULARY_DB,
  type EnglishLessonItem,
} from "@/lib/question-bank";
import { useCMSContent } from "@/lib/cms-store";
import {
  saveContinueLearningState,
  getCompletedLessonIds,
  toggleLessonCompleted,
  toggleBookmarkItem,
  isItemBookmarked,
  startCustomQuestionSetAttempt,
} from "@/lib/test-engine";

const SKILL_TABS = [
  "All",
  "Grammar",
  "Vocabulary",
  "Reading",
  "Listening",
  "Speaking",
  "Writing",
] as const;

export default function EnglishLevelDetailPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const router = useRouter();
  const { data } = useCMSContent();

  const levelMeta =
    ENGLISH_LEVELS.find((l) => l.slug === level) || ENGLISH_LEVELS[0];

  const [selectedSkill, setSelectedSkill] = useState<string>("All");
  const levelLessons = data.englishLessons.filter(
    (l) => l.level === levelMeta.slug
  );
  const displayedLessons =
    levelLessons.length > 0 ? levelLessons : data.englishLessons;

  const [activeLessonId, setActiveLessonId] = useState<string>("");
  const activeLesson: EnglishLessonItem | undefined =
    displayedLessons.find((l) => l.id === activeLessonId) || displayedLessons[0];

  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  // Sync "Continue Learning" state whenever activeLesson changes
  useEffect(() => {
    if (!activeLesson) return;
    setCompletedIds(getCompletedLessonIds());
    setIsSaved(isItemBookmarked(activeLesson.id));
    saveContinueLearningState({
      levelSlug: levelMeta.slug,
      levelLabel: levelMeta.name,
      skill: activeLesson.skill,
      topic: activeLesson.topic,
      lessonTitle: activeLesson.title,
      lessonHref: `/english/${levelMeta.slug}`,
      progressPct: 75,
      updatedAt: "Just now",
    });
  }, [activeLesson, levelMeta]);

  const handleToggleComplete = () => {
    if (!activeLesson) return;
    const next = toggleLessonCompleted(activeLesson.id);
    setCompletedIds(next);
  };

  const handleBookmarkLesson = () => {
    if (!activeLesson) return;
    const saved = toggleBookmarkItem({
      id: activeLesson.id,
      type: "Lesson",
      title: activeLesson.title,
      subtitle: `${levelMeta.name} · ${activeLesson.skill} · ${activeLesson.topic}`,
      href: `/english/${levelMeta.slug}`,
    });
    setIsSaved(saved);
  };

  const handlePracticeLessonQuestions = () => {
    if (!activeLesson) return;
    const qIds =
      activeLesson.questionIds.length > 0
        ? activeLesson.questionIds
        : ["qb-gram-001", "qb-gram-002"];
    const attempt = startCustomQuestionSetAttempt({
      title: `Lesson Practice: ${activeLesson.title}`,
      module: `${levelMeta.name} ${activeLesson.skill}`,
      questionIds: qIds,
      mode: "practice",
      durationMinutes: 10,
      isBandScored: false,
    });
    router.push(`/test-engine/${attempt.attemptId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb & Level Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <Link
              href="/english"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All English Levels
            </Link>
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
              {levelMeta.name} Level ({levelMeta.badge})
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              {levelMeta.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <Link
              href="/admin"
              className="rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 flex items-center gap-1 mr-2"
            >
              <Plus className="h-3.5 w-3.5" /> Add Lesson (Admin)
            </Link>

            {ENGLISH_LEVELS.map((l) => (
              <Link
                key={l.slug}
                href={`/english/${l.slug}`}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold ${
                  l.slug === levelMeta.slug
                    ? "bg-blue-700 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Skill Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 border-b border-slate-200">
          {SKILL_TABS.map((sk) => (
            <button
              key={sk}
              type="button"
              onClick={() => setSelectedSkill(sk)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold cursor-pointer shrink-0 ${
                selectedSkill === sk
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {sk}
            </button>
          ))}
        </div>

        {/* Main 2-Column Lesson & Practice View */}
        {!activeLesson ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm font-bold text-slate-700">
              No English lessons found. Add your own lessons from the Admin Panel!
            </p>
            <Link
              href="/admin"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-bold text-white"
            >
              <Plus className="h-3.5 w-3.5" /> Add Lesson in Admin Panel
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Lesson List + Vocabulary */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Topics & Lessons ({displayedLessons.length})
                </div>
                <div className="space-y-2">
                  {displayedLessons
                    .filter(
                      (item) =>
                        selectedSkill === "All" || item.skill === selectedSkill
                    )
                    .map((item) => {
                      const isCurrent = item.id === activeLesson.id;
                      const isDone = completedIds.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveLessonId(item.id)}
                          className={`w-full flex items-start justify-between gap-2 rounded-xl border p-3 text-left transition-all cursor-pointer ${
                            isCurrent
                              ? "border-blue-700 bg-blue-50/70"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div>
                            <span className="text-[10px] font-bold uppercase text-blue-700">
                              {item.levelLabel} · {item.skill} · {item.topic}
                            </span>
                            <div className="text-xs font-bold text-slate-900 mt-0.5">
                              {item.title}
                            </div>
                          </div>
                          {isDone && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-1" />
                          )}
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Level Vocabulary List */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Key Vocabulary with Synonyms & Antonyms
                </div>
                <div className="space-y-2.5">
                  {VOCABULARY_DB.map((v) => (
                    <div
                      key={v.id}
                      className="rounded-xl bg-slate-50 p-3 border border-slate-200/70 text-xs"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>
                          {v.word} ({v.partOfSpeech})
                        </span>
                        <span className="text-[10px] text-blue-700">
                          {v.difficulty}
                        </span>
                      </div>
                      <div className="mt-1 text-slate-700">
                        {v.meaningEn} · <strong>{v.meaningBn}</strong>
                      </div>
                      <div className="mt-1 text-[11px] text-slate-500 italic">
                        &ldquo;{v.example}&rdquo;
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-2 text-[10px] text-slate-600">
                        <span>
                          <strong>Synonyms:</strong> {v.synonyms.join(", ")}
                        </span>
                        <span>·</span>
                        <span>
                          <strong>Antonyms:</strong> {v.antonyms.join(", ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Active Lesson Reader + Practice */}
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                      {activeLesson.levelLabel} → {activeLesson.skill} →{" "}
                      {activeLesson.topic}
                    </span>
                    <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                      {activeLesson.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleBookmarkLesson}
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold cursor-pointer ${
                        isSaved
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      <span>{isSaved ? "Saved" : "Save Lesson"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleToggleComplete}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold cursor-pointer ${
                        completedIds.includes(activeLesson.id)
                          ? "bg-emerald-600 text-white"
                          : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>
                        {completedIds.includes(activeLesson.id)
                          ? "Completed"
                          : "Mark Complete"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Explanation in English & Bangla */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Concept & Rule Explanation
                    </h3>
                    <p className="text-sm leading-7 text-slate-800 whitespace-pre-line">
                      {activeLesson.explanationEn}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4">
                    <div className="text-xs font-bold text-blue-800 mb-1">
                      সহজ বাংলা ব্যাখ্যা (Bangla Explanation)
                    </div>
                    <p className="text-sm leading-7 text-slate-800 whitespace-pre-line">
                      {activeLesson.explanationBn}
                    </p>
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Structured Examples
                  </h3>
                  <div className="space-y-2.5">
                    {activeLesson.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <div className="text-sm font-bold text-slate-900">
                          {ex.en}
                        </div>
                        <div className="text-xs text-slate-700 mt-1">
                          {ex.bn}
                        </div>
                        {ex.note && (
                          <div className="mt-1.5 text-[11px] font-semibold text-blue-700">
                            Note: {ex.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Launch Lesson Practice in Test Engine */}
                <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-extrabold">
                      Test Your Understanding of {activeLesson.topic}
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Practice questions with instant marking and mistake explanations in our Test Engine.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handlePracticeLessonQuestions}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-bold text-white shrink-0 cursor-pointer"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Start Lesson Practice</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <MainFooter />
    </div>
  );
}
