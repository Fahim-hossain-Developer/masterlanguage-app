"use client";

import { useState } from "react";
import { PenTool, Sparkles, Clock, Send, CheckCircle2 } from "lucide-react";

export default function WritingPracticePage() {
  const [essay, setEssay] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-full bg-[#F8FAFC] dark:bg-gray-950 px-5 py-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
              <PenTool className="h-3.5 w-3.5" />
              IELTS WRITING TASK 2 · AI EVALUATOR
            </span>
            <h1 className="mt-1.5 text-2xl font-black text-gray-900 dark:text-white">
              Cambridge 21 Test 1 — Writing Task 2
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
              Words: <strong className={wordCount >= 250 ? "text-emerald-600" : "text-rose-600"}>{wordCount}</strong> / 250 min
            </span>
            <button
              type="button"
              onClick={() => setEvaluated(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 px-4 py-2 text-xs font-bold text-white shadow-xs cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Get Instant AI Band Score
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Task Prompt */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
              <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600">
                WRITING TASK 2 (40 MINUTES)
              </span>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-gray-900 dark:text-white">
                Some people believe that universities should focus solely on academic subjects that prepare students for future careers, while others argue that universities should offer a wide range of subjects including arts, music, and philosophy.
              </p>
              <p className="mt-3 text-xs font-medium text-gray-600 dark:text-gray-400">
                Discuss both these views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.
              </p>
            </div>

            {evaluated && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" /> AI Band Evaluation
                  </span>
                  <span className="rounded-lg bg-emerald-600 px-2.5 py-1 text-sm font-black text-white">
                    Band 7.0
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-white p-2.5 dark:bg-gray-900">
                    <span className="text-gray-400 block text-[10px]">Task Response</span>
                    <strong className="text-gray-900 dark:text-white">7.0</strong>
                  </div>
                  <div className="rounded-lg bg-white p-2.5 dark:bg-gray-900">
                    <span className="text-gray-400 block text-[10px]">Coherence & Cohesion</span>
                    <strong className="text-gray-900 dark:text-white">7.5</strong>
                  </div>
                  <div className="rounded-lg bg-white p-2.5 dark:bg-gray-900">
                    <span className="text-gray-400 block text-[10px]">Lexical Resource</span>
                    <strong className="text-gray-900 dark:text-white">7.0</strong>
                  </div>
                  <div className="rounded-lg bg-white p-2.5 dark:bg-gray-900">
                    <span className="text-gray-400 block text-[10px]">Grammar Accuracy</span>
                    <strong className="text-gray-900 dark:text-white">6.5</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Essay Editor */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-gray-900">
              <textarea
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                rows={16}
                placeholder="Start typing your IELTS Task 2 essay here (minimum 250 words)..."
                className="w-full resize-none bg-transparent p-2 text-sm leading-7 text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-gray-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
