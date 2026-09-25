"use client";

import { useState } from "react";
import { Mic, MicOff, Sparkles, Volume2 } from "lucide-react";

export default function SpeakingPracticePage() {
  const [recording, setRecording] = useState(false);

  return (
    <div className="min-h-full bg-[#F8FAFC] dark:bg-gray-950 px-5 py-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:bg-teal-950/60 dark:text-teal-400">
          <Mic className="h-3.5 w-3.5" />
          LIVE AI SPEAKING EXAMINER
        </span>
        <h1 className="mt-2 text-2xl font-black text-gray-900 dark:text-white">
          IELTS Speaking Mock Test (Part 1, 2 & 3)
        </h1>
        <p className="mt-1 text-xs text-gray-500">
          Real-time pronunciation, fluency, lexical resource & grammar scoring
        </p>

        <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-xs dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
            <Volume2 className="h-8 w-8" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600">
            PART 2 CUE CARD
          </span>
          <h2 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
            Describe a skill that you learned recently which helped you in your studies or work.
          </h2>
          <p className="mt-2 text-xs text-gray-500 max-w-md mx-auto">
            You should say: what the skill is, how you learned it, why you needed it, and explain how it has helped you.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setRecording(!recording)}
              className={`inline-flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all cursor-pointer ${
                recording ? "bg-rose-600 hover:bg-rose-700 animate-pulse" : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              {recording ? (
                <>
                  <MicOff className="h-4 w-4" />
                  Stop Recording & Evaluate
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  Start Speaking Response
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
