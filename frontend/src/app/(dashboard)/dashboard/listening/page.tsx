"use client";

import { useState } from "react";
import { Headphones, Play, Pause, Volume2, Clock, CheckCircle2 } from "lucide-react";

const LISTENING_QUESTIONS = [
  { id: 1, prompt: "Customer Name: Sarah", answer: "Jennings" },
  { id: 2, prompt: "Preferred Check-in Date: 14th", answer: "October" },
  { id: 3, prompt: "Room Type Requested: Ocean", answer: "Suite" },
  { id: 4, prompt: "Special Dietary Requirement: Gluten", answer: "Free" },
  { id: 5, prompt: "Airport Shuttle Pickup Time:", answer: "4:30 PM" },
];

export default function ListeningPracticePage() {
  const [playing, setPlaying] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  return (
    <div className="min-h-full bg-[#F8FAFC] dark:bg-gray-950 px-5 py-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
            <Headphones className="h-3.5 w-3.5" />
            IELTS LISTENING MODULE
          </span>
          <h1 className="mt-2 text-2xl font-black text-gray-900 dark:text-white">
            Cambridge 21 Test 1 — Listening Part 1
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            4 parts · 40 questions · 30 minutes audio + 2 minutes review
          </p>
        </div>

        {/* Audio Player Bar */}
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-orange-200/80 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={() => setPlaying(!playing)}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-xs cursor-pointer"
            >
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
            </button>
            <div>
              <span className="block text-sm font-bold text-gray-900 dark:text-white">
                Section 1: Hotel Booking Inquiry
              </span>
              <span className="text-xs text-gray-400">
                {playing ? "Playing audio track (01:24 / 07:45)..." : "Click Play to start listening"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <Volume2 className="h-4 w-4 text-orange-500" />
            <span className="flex items-center gap-1 font-mono font-bold">
              <Clock className="h-3.5 w-3.5" /> 30:00
            </span>
          </div>
        </div>

        {/* Form Completion Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
            Questions 1–5: Form Completion
          </h2>
          <p className="text-xs text-gray-500 mb-5">
            Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.
          </p>

          <div className="space-y-4">
            {LISTENING_QUESTIONS.map((q) => (
              <div key={q.id} className="flex flex-wrap items-center gap-3 text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500 text-xs font-bold text-white">
                  {q.id}
                </span>
                <span className="font-medium text-gray-700 dark:text-gray-300 w-64">
                  {q.prompt}
                </span>
                <input
                  type="text"
                  value={answers[q.id] || ""}
                  onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                  placeholder={`Answer ${q.id}`}
                  className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-900 focus:border-orange-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
