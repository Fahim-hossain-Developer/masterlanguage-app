"use client";

import { Sparkles, BookOpen, Brain, MessageSquare, CheckCircle2 } from "lucide-react";

const GRAMMAR_TOPICS = [
  { level: "A1", title: "Present Simple & Continuous", bn: "সাধারণ বর্তমান ও ঘটমান বর্তমান কাল", progress: 100 },
  { level: "A2", title: "Past Simple vs Present Perfect", bn: "অতীত কাল বনাম পুরাঘটিত বর্তমান", progress: 75 },
  { level: "B1", title: "Conditionals (Zero, First & Second)", bn: "শর্তবাচক বাক্য গঠন (Conditionals)", progress: 40 },
  { level: "B2", title: "Passive Voice & Academic Nominalization", bn: "IELTS Writing-এর জন্য প্যাসিভ ও একাডেমিক বাক্য", progress: 15 },
  { level: "C1", title: "Inversion & Complex Subordinate Clauses", bn: "Band 8.0+ অ্যাডভান্সড সেন্টেন্স স্ট্রাকচার", progress: 0 },
];

export default function FoundationEnglishPage() {
  return (
    <div className="min-h-full bg-[#F8FAFC] dark:bg-gray-950 px-5 py-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <Sparkles className="h-3.5 w-3.5" />
            CEFR A1 TO C1 · FOUNDATION ENGLISH
          </span>
          <h1 className="mt-2 text-2xl font-black text-gray-900 dark:text-white">
            Foundation English & Grammar Lab
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Step-by-step Grammar with Bangla explanations, Academic Vocabulary SRS & AI Conversation Roleplay
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <BookOpen className="h-5 w-5 text-indigo-600 mb-2" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Grammar Lab (A1–C1)</h3>
            <p className="text-xs text-gray-500 mt-1">Interactive lessons with Bangla rules & common error fixes</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <Brain className="h-5 w-5 text-emerald-600 mb-2" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Academic Vocab SRS</h3>
            <p className="text-xs text-gray-500 mt-1">Spaced Repetition flashcards with collocations & audio</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <MessageSquare className="h-5 w-5 text-blue-600 mb-2" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">AI Roleplay Scenarios</h3>
            <p className="text-xs text-gray-500 mt-1">Job interview, University admission & immigration practice</p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">
            CEFR Grammar Roadmap
          </h2>
          <div className="space-y-3">
            {GRAMMAR_TOPICS.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-gray-800/40"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-xs font-black text-white">
                    {item.level}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.bn}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-indigo-600">{item.progress}%</span>
                  {item.progress === 100 && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
