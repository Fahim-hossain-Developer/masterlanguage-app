"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle2,
  Highlighter,
  Send,
  Timer,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TFNG_QUESTIONS = [
  {
    id: 1,
    statement:
      "The Romans' shipbuilding skills were passed on to the Greeks and the Egyptians.",
    correct: "FALSE",
  },
  {
    id: 2,
    statement:
      "Skilled craftsmen were needed for the mortise and tenon method of fixing planks.",
    correct: "NOT GIVEN",
  },
  {
    id: 3,
    statement:
      "The later practice used by Mediterranean shipbuilders involved building the hull before the frame.",
    correct: "FALSE",
  },
  {
    id: 4,
    statement:
      "The Romans called the Mediterranean Sea Mare Nostrum because they dominated its use.",
    correct: "TRUE",
  },
  {
    id: 5,
    statement:
      "Most rowers on Roman warships were people from the Roman army.",
    correct: "TRUE",
  },
];

const GAP_FILL_QUESTIONS = [
  {
    id: 6,
    prefix: "Warships were designed so that they were ",
    suffix: " and moved quickly.",
    correct: "lightweight",
  },
  {
    id: 7,
    prefix: "A battering ram made of ",
    suffix: " was included in the design for attacking.",
    correct: "bronze",
  },
  {
    id: 8,
    prefix: "Rowers were positioned on three different ",
    suffix: " inside the trireme.",
    correct: "levels",
  },
  {
    id: 9,
    prefix: "Merchant ships had a ",
    suffix: " hull shape that kept them stable in rough seas.",
    correct: "broad",
  },
  {
    id: 10,
    prefix: "Both square and ",
    suffix: " sails were used on merchant vessels.",
    correct: "triangular",
  },
  {
    id: 11,
    prefix: "Agricultural products such as ",
    suffix: " from Egypt were the primary cargo.",
    correct: "grain",
  },
  {
    id: 12,
    prefix: "Sailors relied on ",
    suffix: " landmarks and stars when visibility was clear.",
    correct: "coastal",
  },
  {
    id: 13,
    prefix: "In foggy conditions, mariners checked the ",
    suffix: " of the water to estimate distance from land.",
    correct: "depth",
  },
];

export default function ReadingExamPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const { testId } = use(params);
  const formattedTitle = testId
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const [modeModalOpen, setModeModalOpen] = useState(true);
  const [selectedMode, setSelectedMode] = useState<"strict" | "practice">("strict");
  const [activePart, setActivePart] = useState<1 | 2 | 3>(1);
  const [secondsLeft, setSecondsLeft] = useState(60 * 60);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (modeModalOpen || submitted || selectedMode === "practice") return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [modeModalOpen, submitted, selectedMode]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(rem).padStart(2, "0")}`;
  };

  const handleAnswerChange = (qNum: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [qNum]: value }));
  };

  const answeredCount = Object.values(answers).filter(
    (v) => v && v.trim().length > 0
  ).length;

  const calculateScore = () => {
    let score = 0;
    TFNG_QUESTIONS.forEach((q) => {
      if ((answers[q.id] || "").toUpperCase() === q.correct) score++;
    });
    GAP_FILL_QUESTIONS.forEach((q) => {
      if ((answers[q.id] || "").trim().toLowerCase() === q.correct.toLowerCase()) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="relative flex h-[calc(100vh-36px)] flex-col bg-white dark:bg-gray-950 overflow-hidden">
      {/* Top Computer-Delivered Exam Bar */}
      <header className="flex h-13 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/reading"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Exit
          </Link>
          <div className="h-4 w-px bg-gray-200 dark:bg-gray-700" />
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {formattedTitle}
            </span>
            <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Part {activePart}
            </span>
          </div>
        </div>

        {/* Center Timer */}
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-1.5 dark:border-gray-800 dark:bg-gray-800/70">
          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          {selectedMode === "strict" ? (
            <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">
              {formatTime(secondsLeft)}
            </span>
          ) : (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Practice Mode (Untimed)
            </span>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          <span className="hidden sm:inline-block text-xs font-medium text-gray-500">
            Answered: <strong className="text-gray-900 dark:text-white">{answeredCount}/13</strong>
          </span>
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition-all cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            Submit Test
          </button>
        </div>
      </header>

      {/* Part Instruction Sub-Banner */}
      <div className="shrink-0 border-b border-gray-200 bg-[#F8FAFC] px-6 py-2 text-xs text-gray-600 dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-400 flex items-center justify-between">
        <span>
          <strong>Part {activePart}</strong> — Read the text below and answer questions 1–13. You should spend about 20 minutes on Questions 1–13.
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
          <Highlighter className="h-3 w-3" /> Select text to highlight
        </span>
      </div>

      {/* Main Split-Screen Area (Left: Passage, Right: Questions) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-800 overflow-hidden">
        {/* LEFT PANE: Reading Passage */}
        <div className="overflow-y-auto p-6 lg:p-8 bg-white dark:bg-gray-950 select-text">
          <div className="max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              READING PASSAGE 1
            </span>
            <h1 className="mt-1 text-2xl font-black text-gray-900 dark:text-white">
              Roman shipbuilding and navigation
            </h1>
            <p className="mt-2 text-xs italic text-gray-500 dark:text-gray-400">
              Shipbuilding today is based on science and ships are built using computers and sophisticated tools. Shipbuilding in ancient Rome, however, was more of an art relying on estimation, inherited techniques and personal experience.
            </p>

            <div className="mt-6 space-y-4 text-sm leading-7 text-gray-800 dark:text-gray-200">
              <p>
                <strong>A.</strong> The Romans were not traditionally sailors but mostly land-based people, who learned to build ships from the people that they conquered, namely the Greeks and the Egyptians. Among the surviving written documents that give us descriptions and representations of ancient Roman ships, including the sails and rigging, are some mosaic Floor designs and coins.
              </p>
              <p>
                <strong>B.</strong> Outer hull construction was the first step in ancient Mediterranean shipbuilding. Planks used to build the outer hull were initially sewn together. Starting from the 6th century BCE, they were fixed using a method called mortise and tenon, whereby one plank locked into another without the need for stitching. Then in the first centuries of the current era, Mediterranean shipbuilders shifted to another shipbuilding method, still in use today, which consisted of building the frame first and then proceeding with the hull and the other components of the ship. This method was more systematic and dramatically shortened ship construction times. The ancient Romans built large merchant ships and warships whose size and technology were unequalled until the 16th century CE.
              </p>
              <p>
                <strong>C.</strong> Warships were built to be lightweight and very speedy. They had to be able to sail near the coast, which is why they had no ballast or excess load and were built with a long, narrow hull. They did not sink when damaged and often would lie crippled on the sea&apos;s surface following naval battles. They had a bronze battering ram, which was used to pierce the timber hulls or break the oars of enemy vessels. Warships used both wind (sails) and human power (oarsmen) and were therefore very fast. Eventually, Rome&apos;s navy became the largest and most powerful in the Mediterranean, and the Romans had control over what they therefore called <em>Mare Nostrum</em> meaning &lsquo;our sea&rsquo;.
              </p>
              <p>
                <strong>D.</strong> There were many kinds of warship. The &lsquo;trireme&rsquo; was the dominant warship from the 7th to 4th century BCE. It had rowers in the top, middle and lower levels, and approximately 50 rowers in each bank. The rowers at the bottom had the most uncomfortable position as they were under the other rowers and were exposed to the water entering through the oar-holes. It is worth noting that contrary to popular perception, rowers were not slaves but mostly Roman citizens enrolled in the military. The trireme was superseded by larger ships with even more rowers.
              </p>
              <p>
                <strong>E.</strong> Merchant ships were built to transport lots of cargo over long distances and at a reasonable cost. They had a wider, broad hull, double planking and a solid interior for added stability. Unlike warships, their V-shaped hull was deep underwater, meaning that they could not sail too close to the coast. They usually had two huge side rudders located off the stern and controlled by a small tiller bar connected to a system of cables. They had from one to three masts with large square sails and a small triangular sail at the bow. Just like warships, merchant ships used oarsmen, but coordinating the hundreds of rowers in both types of ship was not an easy task. In order to assist them, music would be played on an instrument, and chants would be sung by the oarsmen.
              </p>
              <p>
                <strong>F.</strong> The cargo on merchant ships included raw materials (e.g. iron bars, copper, marble and granite), and agricultural products (e.g. grain from Egypt&apos;s Nile valley). During the Empire, Rome was a huge city by ancient standards of about one million inhabitants. Goods from all over the world would come to the city through the port of Pozzuoli situated west of the bay of Naples in Italy and through the gigantic port of Ostia situated at the mouth of the Tiber River. Large merchant ships would approach the destination port and, just like today, be intercepted by a number of towboats that would drag them to the quay.
              </p>
              <p>
                <strong>G.</strong> The time of travel along the many sailing routes could vary widely. Navigation in ancient Rome did not rely on sophisticated instruments such as compasses, Invalid or radar, which did not exist. Instead, sailors relied on visual observation of coastal landmarks and the position of stars. When weather conditions were foggy or cloudy, mariners checked the depth of the water and the nature of the seabed using a sounding lead to estimate how far they were from land.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Interactive Questions */}
        <div className="overflow-y-auto p-6 lg:p-8 bg-[#F8FAFC] dark:bg-gray-900/50">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Questions 1-5: TRUE / FALSE / NOT GIVEN */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-4 border-b border-gray-100 pb-3 dark:border-gray-800">
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                  Questions 1–5
                </h2>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Do the following statements agree with the information given in Reading Passage 1? Choose <strong>TRUE</strong>, <strong>FALSE</strong> or <strong>NOT GIVEN</strong>.
                </p>
              </div>

              <div className="space-y-4">
                {TFNG_QUESTIONS.map((q) => (
                  <div
                    key={q.id}
                    className="rounded-xl border border-gray-100 bg-gray-50/60 p-3.5 dark:border-gray-800 dark:bg-gray-800/40"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
                        {q.id}
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                        {q.statement}
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2 pl-8">
                      {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => {
                        const selected = answers[q.id] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleAnswerChange(q.id, opt)}
                            className={cn(
                              "rounded-lg border px-3 py-1.5 text-xs font-bold transition-all cursor-pointer",
                              selected
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                            )}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Questions 6-13: Notes Completion Gap-Fill */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-4 border-b border-gray-100 pb-3 dark:border-gray-800">
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                  Questions 6–13
                </h2>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Complete the notes below. Choose{" "}
                  <strong className="text-rose-600 dark:text-rose-400">
                    ONE WORD ONLY
                  </strong>{" "}
                  from the passage for each answer.
                </p>
              </div>

              <div className="space-y-3.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Roman Warships & Merchant Vessels
                </h3>

                {GAP_FILL_QUESTIONS.map((q) => (
                  <div
                    key={q.id}
                    className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-7"
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-gray-200 text-[11px] font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300 mr-1">
                      {q.id}
                    </span>
                    <span>{q.prefix}</span>
                    <input
                      type="text"
                      value={answers[q.id] || ""}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      placeholder={`Q${q.id}`}
                      className="inline-block w-36 rounded-lg border border-blue-300 bg-blue-50/40 px-2.5 py-1 text-xs font-bold text-blue-900 placeholder:text-gray-400 focus:border-blue-600 focus:bg-white focus:outline-none dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-200"
                    />
                    <span>{q.suffix}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Question Palette Footer (Part 1, Part 2, Part 3) */}
      <footer className="flex h-14 shrink-0 items-center justify-between border-t border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900 overflow-x-auto">
        <div className="flex items-center gap-3">
          {[
            { part: 1 as const, label: "Part 1", range: [1, 13] },
            { part: 2 as const, label: "Part 2", range: [14, 26] },
            { part: 3 as const, label: "Part 3", range: [27, 40] },
          ].map((p) => (
            <button
              key={p.part}
              type="button"
              onClick={() => setActivePart(p.part)}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all cursor-pointer",
                activePart === p.part
                  ? "border-blue-600 bg-blue-50/80 text-blue-700 dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400"
              )}
            >
              <span>{p.label}</span>
              <span className="text-[10px] text-gray-400">
                ({p.range[0]}–{p.range[1]})
              </span>
            </button>
          ))}
        </div>

        {/* Question Number Pills for Part 1 */}
        <div className="hidden md:flex items-center gap-1">
          {Array.from({ length: 13 }, (_, idx) => idx + 1).map((qNum) => {
            const isAnswered = Boolean(answers[qNum]?.trim());
            return (
              <div
                key={qNum}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold transition-colors",
                  isAnswered
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                )}
              >
                {qNum}
              </div>
            );
          })}
        </div>
      </footer>

      {/* INITIAL OVERLAY MODAL: Strict Mode vs Practice Mode (Matching Screenshot 5) */}
      {modeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 sm:p-7 shadow-2xl dark:border-gray-800 dark:bg-gray-900 animate-in fade-in zoom-in-95 duration-150">
            <h2 className="text-xl font-black text-gray-900 dark:text-white">
              {formattedTitle}
            </h2>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Choose how you&apos;d like to take this test
            </p>

            <div className="mt-5 space-y-3">
              {/* Strict Mode Option */}
              <button
                type="button"
                onClick={() => setSelectedMode("strict")}
                className={cn(
                  "w-full flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all cursor-pointer",
                  selectedMode === "strict"
                    ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 dark:border-blue-500 dark:bg-blue-950/40"
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-800"
                )}
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <Timer className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-gray-900 dark:text-white">
                    Strict mode
                  </span>
                  <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    60-minute countdown timer. Auto-submits when time runs out, just like the real exam.
                  </span>
                </div>
              </button>

              {/* Practice Mode Option */}
              <button
                type="button"
                onClick={() => setSelectedMode("practice")}
                className={cn(
                  "w-full flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all cursor-pointer",
                  selectedMode === "practice"
                    ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 dark:border-blue-500 dark:bg-blue-950/40"
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-800"
                )}
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-gray-900 dark:text-white">
                    Practice mode
                  </span>
                  <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    No time limit. Work at your own pace and submit whenever you&apos;re ready.
                  </span>
                </div>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setModeModalOpen(false)}
              className="mt-6 w-full rounded-xl bg-[#2563EB] hover:bg-blue-700 py-3.5 text-sm font-bold text-white shadow-md transition-all cursor-pointer"
            >
              Start Test
            </button>
          </div>
        </div>
      )}

      {/* SCORE SUMMARY MODAL ON SUBMIT */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-2xl dark:border-gray-800 dark:bg-gray-900">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">
              Reading Part 1 Submitted!
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              {formattedTitle} · Instant Evaluation
            </p>

            <div className="my-5 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/60">
              <span className="block text-xs uppercase font-bold text-gray-400">
                Your Score (Part 1)
              </span>
              <span className="mt-1 block text-3xl font-black text-blue-600 dark:text-blue-400">
                {calculateScore()} / 13
              </span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Review Answers
              </button>
              <Link
                href="/dashboard"
                className="flex-1 inline-flex items-center justify-center rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-700"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
