"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Clock,
  GraduationCap,
  Play,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MODULES = [
  {
    id: "reading",
    number: "MODULE 1",
    title: "Reading",
    meta: "3 passages · 40 questions · 60 min",
    icon: BookOpen,
    iconBg: "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/60 dark:border-blue-900 dark:text-blue-400",
    btnBg: "bg-[#2563EB] hover:bg-blue-700 text-white",
    btnLabel: "Start Reading",
  },
  {
    id: "listening",
    number: "MODULE 2",
    title: "Listening",
    meta: "4 parts · 40 questions · 30 min",
    icon: Headphones,
    iconBg: "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-950/60 dark:border-orange-900 dark:text-orange-400",
    btnBg: "bg-[#D97706] hover:bg-amber-700 text-white",
    btnLabel: "Start Listening",
  },
  {
    id: "writing",
    number: "MODULE 3",
    title: "Writing",
    meta: "2 tasks · 400+ words · 60 min",
    icon: PenTool,
    iconBg: "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/60 dark:border-rose-900 dark:text-rose-400",
    btnBg: "bg-[#E11D48] hover:bg-rose-700 text-white",
    btnLabel: "Start Writing",
  },
  {
    id: "speaking",
    number: "MODULE 4",
    title: "Speaking",
    meta: "3 parts · Live AI examiner · 14 min",
    icon: Mic,
    iconBg: "bg-teal-50 text-teal-600 border-teal-100 dark:bg-teal-950/60 dark:border-teal-900 dark:text-teal-400",
    btnBg: "bg-[#0D9488] hover:bg-teal-700 text-white",
    btnLabel: "Start Speaking",
  },
];

const QUESTION_SETS = [
  { id: "cambridge-21-test-1", title: "Cambridge 21 Test 1", tag: "40q" },
  { id: "cambridge-21-test-2", title: "Cambridge 21 Test 2", tag: "40q" },
  { id: "cambridge-21-test-3", title: "Cambridge 21 Test 3", tag: "40q" },
  { id: "cambridge-21-test-4", title: "Cambridge 21 Test 4", tag: "40q" },
  { id: "cambridge-20-test-1", title: "Cambridge 20 Test 1", tag: "40q" },
  { id: "cambridge-20-test-2", title: "Cambridge 20 Test 2", tag: "40q" },
  { id: "cambridge-20-test-3", title: "Cambridge 20 Test 3", tag: "40q" },
  { id: "cambridge-20-test-4", title: "Cambridge 20 Test 4", tag: "40q" },
  { id: "cambridge-19-test-1", title: "Cambridge 19 Test 1", tag: "40q" },
  { id: "cambridge-19-test-2", title: "Cambridge 19 Test 2", tag: "40q" },
];

export default function FullMockSessionHubPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const examType = (searchParams.get("type") || "academic").toUpperCase();

  const [activeModuleModal, setActiveModuleModal] = useState<string | null>(null);
  const [selectedSet, setSelectedSet] = useState<string>("cambridge-21-test-1");

  const selectedModuleInfo = MODULES.find((m) => m.id === activeModuleModal);

  const handleConfirmSet = () => {
    if (!activeModuleModal) return;
    if (activeModuleModal === "reading") {
      router.push(`/dashboard/reading/${selectedSet}?fullMock=${sessionId}`);
    } else {
      router.push(`/dashboard/${activeModuleModal}?set=${selectedSet}&fullMock=${sessionId}`);
    }
  };

  return (
    <div className="min-h-full bg-[#F8FAFC] dark:bg-gray-950 px-4 py-6 lg:px-8">
      {/* Top Bar */}
      <div className="mx-auto max-w-4xl mb-6">
        <Link
          href="/dashboard/full-mock"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          ALL SESSIONS
        </Link>
      </div>

      {/* Session Header (Matching Screenshot 3) */}
      <div className="mx-auto max-w-2xl text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
            <GraduationCap className="h-3.5 w-3.5 text-gray-500" />
            {examType}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/60 dark:text-amber-400">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            IN PROGRESS
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white">
          <span className="font-serif italic font-normal text-gray-700 dark:text-gray-300 mr-2">
            Begin your
          </span>
          Mock Test
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Complete all 4 modules in any order. Pick a question set for each.
        </p>

        {/* Progress Bar */}
        <div className="mx-auto max-w-md mt-6">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-1.5">
            <span>Progress</span>
            <span className="font-bold text-gray-900 dark:text-white">0 / 4</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
            <div className="h-full w-0 rounded-full bg-blue-600 transition-all" />
          </div>
        </div>
      </div>

      {/* 2x2 Module Grid (Matching Screenshot 3) */}
      <div className="mx-auto max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.id}
              className="flex flex-col justify-between rounded-2xl border border-gray-200/90 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl border",
                      mod.iconBg
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {mod.number}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {mod.title}
                </h2>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {mod.meta}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveModuleModal(mod.id)}
                className={cn(
                  "mt-6 w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold shadow-sm transition-all cursor-pointer",
                  mod.btnBg
                )}
              >
                <span>{mod.btnLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Choose a Question Set Modal (Matching Screenshot 4) */}
      {activeModuleModal && selectedModuleInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Top Nav */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setActiveModuleModal(null)}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                BACK
              </button>
              <button
                type="button"
                onClick={() => setActiveModuleModal(null)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Module Header */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl border",
                  selectedModuleInfo.iconBg
                )}
              >
                <selectedModuleInfo.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Choose a Question Set
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedModuleInfo.title} · {selectedModuleInfo.meta}
                </p>
              </div>
            </div>

            {/* Scrollable Set List */}
            <div className="max-h-64 overflow-y-auto space-y-2 pr-1 mb-5">
              {QUESTION_SETS.map((set) => {
                const isSelected = selectedSet === set.id;
                return (
                  <button
                    key={set.id}
                    type="button"
                    onClick={() => setSelectedSet(set.id)}
                    className={cn(
                      "w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all cursor-pointer",
                      isSelected
                        ? "border-blue-600 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-950/40"
                        : "border-gray-200 hover:border-gray-300 bg-white dark:border-gray-800 dark:bg-gray-900"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-full border",
                          isSelected
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-300 dark:border-gray-600"
                        )}
                      >
                        {isSelected && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          isSelected
                            ? "text-blue-700 dark:text-blue-300"
                            : "text-gray-800 dark:text-gray-200"
                        )}
                      >
                        {set.title}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-400">
                      {set.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Start Set Button */}
            <button
              type="button"
              onClick={handleConfirmSet}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 py-3.5 px-5 text-sm font-bold text-white shadow-md transition-all cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Start this set</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
