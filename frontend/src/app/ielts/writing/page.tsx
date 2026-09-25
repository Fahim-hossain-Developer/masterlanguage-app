"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PenTool, Clock, Save, Send, FileText } from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import { CAMBRIDGE_BOOKS } from "@/lib/cambridge-data";

interface SavedWritingSubmission {
  id: string;
  taskTitle: string;
  wordCount: number;
  content: string;
  submittedAt: string;
}

function WritingContent() {
  const searchParams = useSearchParams();
  const bookParam = Number(searchParams.get("book"));
  const testParam = Number(searchParams.get("test"));

  const [selectedBookNum, setSelectedBookNum] = useState<number>(
    bookParam >= 9 && bookParam <= 19 ? bookParam : 19
  );
  const [selectedTestNum, setSelectedTestNum] = useState<1 | 2 | 3 | 4>(
    testParam >= 1 && testParam <= 4 ? (testParam as 1 | 2 | 3 | 4) : 1
  );
  const [selectedTaskIdx, setSelectedTaskIdx] = useState<0 | 1>(1); // 0 = Task 1, 1 = Task 2

  const currentBook =
    CAMBRIDGE_BOOKS.find((b) => b.bookNumber === selectedBookNum) ||
    CAMBRIDGE_BOOKS[0];
  const currentTest =
    currentBook.tests.find((t) => t.testNumber === selectedTestNum) ||
    currentBook.tests[0];
  const currentTask = currentTest.writingTasks[selectedTaskIdx];

  const promptKey = `${currentTest.id}-task-${currentTask.taskNumber}`;

  const [text, setText] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(
    currentTask.recommendedMinutes * 60
  );
  const [timerRunning, setTimerRunning] = useState(false);
  const [draftStatus, setDraftStatus] = useState("Draft ready");
  const [history, setHistory] = useState<SavedWritingSubmission[]>([]);

  useEffect(() => {
    const savedDraft = localStorage.getItem(`me_writing_draft_${promptKey}`);
    setText(savedDraft || "");
    setSecondsLeft(currentTask.recommendedMinutes * 60);
    setTimerRunning(false);

    const savedHist = localStorage.getItem("me_writing_submissions_v1");
    if (savedHist) {
      try {
        setHistory(JSON.parse(savedHist));
      } catch {
        // ignore
      }
    }
  }, [promptKey, currentTask.recommendedMinutes]);

  useEffect(() => {
    if (!timerRunning) return;
    const t = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [timerRunning]);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleSaveDraft = () => {
    localStorage.setItem(`me_writing_draft_${promptKey}`, text);
    setDraftStatus("Draft saved to browser");
  };

  const handleSubmitWriting = () => {
    if (!text.trim()) return;
    const entry: SavedWritingSubmission = {
      id: `sub-${Date.now()}`,
      taskTitle: currentTask.title,
      wordCount,
      content: text,
      submittedAt: new Date().toLocaleString(),
    };
    const next = [entry, ...history];
    setHistory(next);
    localStorage.setItem("me_writing_submissions_v1", JSON.stringify(next));
    setDraftStatus("Submitted to Writing History");
  };

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  return (
    <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <PenTool className="h-3.5 w-3.5" />
            Cambridge IELTS 9 – 19 Writing Workspace (Task 1 & Task 2)
          </span>
          <h1 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-slate-900">
            Cambridge IELTS Writing Practice (Book 9 to 19)
          </h1>
        </div>

        {/* Task 1 / Task 2 Switcher */}
        <div className="flex items-center gap-2">
          {currentTest.writingTasks.map((t, idx) => (
            <button
              key={t.taskNumber}
              type="button"
              onClick={() => setSelectedTaskIdx(idx as 0 | 1)}
              className={`rounded-xl px-4 py-2 text-xs font-bold cursor-pointer ${
                selectedTaskIdx === idx
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              Writing Task {t.taskNumber} ({t.minWords}+ words · {t.recommendedMinutes}m)
            </button>
          ))}
        </div>
      </div>

      {/* Cambridge Book 9-19 + Test 1-4 Selector Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 mr-2">Book:</span>
          {CAMBRIDGE_BOOKS.map((b) => (
            <button
              key={b.bookNumber}
              type="button"
              onClick={() => setSelectedBookNum(b.bookNumber)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-extrabold cursor-pointer ${
                selectedBookNum === b.bookNumber
                  ? "bg-blue-700 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Cam {b.bookNumber}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 mr-1">
            Select Test in Cambridge {selectedBookNum}:
          </span>
          {([1, 2, 3, 4] as const).map((tNum) => (
            <button
              key={tNum}
              type="button"
              onClick={() => setSelectedTestNum(tNum)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer ${
                selectedTestNum === tNum
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              Test {tNum}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Prompt + Structure Guide */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                Cambridge {selectedBookNum} · Test {selectedTestNum} · Task{" "}
                {currentTask.taskNumber}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {currentTask.recommendedMinutes} mins · Min {currentTask.minWords} words
              </span>
            </div>
            <h2 className="text-base font-extrabold text-slate-900">
              {currentTask.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {currentTask.prompt}
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
              <div className="text-[11px] font-bold uppercase text-slate-500">
                Recommended Structure Outline
              </div>
              <p className="mt-1 text-xs text-slate-700 leading-relaxed">
                {currentTask.sampleOutline}
              </p>
            </div>
          </div>

          {/* Previous Submissions History */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-blue-700" />
              Saved Submissions ({history.length})
            </h3>
            {history.length === 0 ? (
              <p className="text-xs text-slate-500">
                No writing submissions saved yet. Write your response and click Submit.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-60 overflow-y-auto">
                {history.map((sub) => (
                  <div
                    key={sub.id}
                    className="rounded-xl border border-slate-200 p-3 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{sub.taskTitle}</span>
                      <span className="text-blue-700">{sub.wordCount} words</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {sub.submittedAt}
                    </div>
                    <p className="mt-1.5 text-slate-600 line-clamp-2">
                      {sub.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Editor + Timer + Word Counter */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
            {/* Editor Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5 mb-3.5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-800">
                  <Clock className="h-3.5 w-3.5 text-blue-700" />
                  <span className="font-mono">{formatTime(secondsLeft)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  {timerRunning ? "Pause Timer" : "Start Timer"}
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">{draftStatus}</span>
                <span
                  className={`rounded-lg px-2.5 py-1 font-extrabold ${
                    wordCount >= currentTask.minWords
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {wordCount} / {currentTask.minWords} words
                </span>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={15}
              placeholder={`Write your Cambridge ${selectedBookNum} Test ${selectedTestNum} Task ${currentTask.taskNumber} response here (at least ${currentTask.minWords} words)...`}
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm leading-7 text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:bg-white focus:outline-none"
            />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Draft</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitWriting}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 px-5 py-2.5 text-xs font-bold text-white cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Response</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function IELTSWritingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />
      <Suspense fallback={<div className="p-10 text-center text-sm">Loading Cambridge Writing...</div>}>
        <WritingContent />
      </Suspense>
      <MainFooter />
    </div>
  );
}
