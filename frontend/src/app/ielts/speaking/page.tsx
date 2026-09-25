"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mic, Square, Play, Clock, RotateCcw } from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import { CAMBRIDGE_BOOKS } from "@/lib/cambridge-data";

function SpeakingContent() {
  const searchParams = useSearchParams();
  const bookParam = Number(searchParams.get("book"));
  const testParam = Number(searchParams.get("test"));

  const [selectedBookNum, setSelectedBookNum] = useState<number>(
    bookParam >= 9 && bookParam <= 19 ? bookParam : 19
  );
  const [selectedTestNum, setSelectedTestNum] = useState<1 | 2 | 3 | 4>(
    testParam >= 1 && testParam <= 4 ? (testParam as 1 | 2 | 3 | 4) : 1
  );
  const [selectedPartIdx, setSelectedPartIdx] = useState(1); // Part 2 Cue Card default

  const currentBook =
    CAMBRIDGE_BOOKS.find((b) => b.bookNumber === selectedBookNum) ||
    CAMBRIDGE_BOOKS[0];
  const currentTest =
    currentBook.tests.find((t) => t.testNumber === selectedTestNum) ||
    currentBook.tests[0];
  const currentPart = currentTest.speakingParts[selectedPartIdx];

  const [timerMode, setTimerMode] = useState<"idle" | "prep" | "speak">("idle");
  const [secondsLeft, setSecondsLeft] = useState(currentPart.speakSeconds);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [recordError, setRecordError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    setTimerMode("idle");
    setSecondsLeft(
      currentPart.prepSeconds > 0
        ? currentPart.prepSeconds
        : currentPart.speakSeconds
    );
  }, [selectedPartIdx, selectedBookNum, selectedTestNum, currentPart]);

  useEffect(() => {
    if (timerMode === "idle") return;
    const t = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [timerMode]);

  const startPrepTimer = () => {
    setTimerMode("prep");
    setSecondsLeft(currentPart.prepSeconds || 60);
  };

  const startSpeakingRecording = async () => {
    setRecordError(null);
    setTimerMode("speak");
    setSecondsLeft(currentPart.speakSeconds);

    if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        chunksRef.current = [];
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };
        recorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          setAudioBlobUrl(URL.createObjectURL(blob));
          stream.getTracks().forEach((tr) => tr.stop());
        };
        recorder.start();
        mediaRecorderRef.current = recorder;
        setIsRecording(true);
      } catch {
        setRecordError(
          "Microphone permission was not granted. Speaking timer is running in practice mode."
        );
      }
    }
  };

  const stopSpeakingRecording = () => {
    setTimerMode("idle");
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const formatSec = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  return (
    <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-6">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
          <Mic className="h-3.5 w-3.5" />
          Cambridge IELTS 9 – 19 Speaking Practice (Parts 1, 2 & 3)
        </span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
          Cambridge IELTS Speaking Topics, Cue Cards & Voice Recorder
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Select any Cambridge IELTS book (9 to 19) and Test (1 to 4) to practice Part 1, Part 2 Cue Cards, and Part 3 Discussion.
        </p>
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

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-1">
              Cambridge {selectedBookNum}:
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

          {/* Part 1 / Part 2 / Part 3 Tabs */}
          <div className="flex gap-1.5">
            {currentTest.speakingParts.map((p, idx) => (
              <button
                key={p.partNumber}
                type="button"
                onClick={() => setSelectedPartIdx(idx)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold cursor-pointer ${
                  selectedPartIdx === idx
                    ? "bg-blue-700 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                Part {p.partNumber}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Topic & Cue Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Cambridge {selectedBookNum} · Test {selectedTestNum} ·{" "}
              {currentPart.title}
            </span>
            <h2 className="mt-1 text-xl font-extrabold text-slate-900">
              {currentPart.topic}
            </h2>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2 text-sm font-extrabold text-slate-900 font-mono">
            <Clock className="h-4 w-4 text-blue-700" />
            <span>{formatSec(secondsLeft)}</span>
          </div>
        </div>

        <ul className="space-y-2.5 text-sm font-medium text-slate-800 mb-8">
          {currentPart.questions.map((q, i) => (
            <li
              key={i}
              className="rounded-xl bg-slate-50 px-4 py-3 border border-slate-200/70"
            >
              {q}
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {currentPart.prepSeconds > 0 && (
            <button
              type="button"
              onClick={startPrepTimer}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-800 cursor-pointer"
            >
              <Clock className="h-3.5 w-3.5 text-blue-700" />
              <span>Start 1-Min Prep Timer</span>
            </button>
          )}

          {!isRecording && timerMode !== "speak" ? (
            <button
              type="button"
              onClick={startSpeakingRecording}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 px-5 py-2.5 text-xs font-bold text-white cursor-pointer"
            >
              <Mic className="h-3.5 w-3.5" />
              <span>Start Speaking & Record Audio</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stopSpeakingRecording}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 px-5 py-2.5 text-xs font-bold text-white cursor-pointer"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
              <span>Stop Recording</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setTimerMode("idle");
              setSecondsLeft(currentPart.speakSeconds);
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset Timer
          </button>
        </div>

        {recordError && (
          <p className="mt-3 text-xs text-amber-700">{recordError}</p>
        )}

        {/* Recorded Audio Playback */}
        {audioBlobUrl && (
          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/50 p-4">
            <div className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Play className="h-3.5 w-3.5 text-blue-700" />
              Replay Your Recorded Speaking Response
            </div>
            <audio controls src={audioBlobUrl} className="w-full h-10" />
          </div>
        )}
      </div>
    </main>
  );
}

export default function IELTSSpeakingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />
      <Suspense fallback={<div className="p-10 text-center text-sm">Loading Cambridge Speaking...</div>}>
        <SpeakingContent />
      </Suspense>
      <MainFooter />
    </div>
  );
}
